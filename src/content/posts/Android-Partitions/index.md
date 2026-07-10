---
title: Android 的分区系统
published: 2026-04-08
description: boot、init_boot、vendor_boot、vbmeta、super、userdata、A/B、VAB、动态分区……把 Android 分区系统理一遍
tags: [Android, 分区, 刷机, A/B]
category: Android
lang: zh_CN
---

# Android 的分区系统

## 目录

:::tip
可直接点击文字跳转至对应章节
:::

- [Android 的分区系统](#android-的分区系统)
  - [目录](#目录)
  - [简介](#简介)
  - [几个最常见的分区](#几个最常见的分区)
  - [A-Only 与 A/B](#a-only-与-ab)
  - [Virtual A/B 与动态分区](#virtual-ab-与动态分区)
  - [super 分区](#super-分区)
  - [init_boot](#init_boot)
  - [刷机时最常碰到的几个分区](#刷机时最常碰到的几个分区)
  - [参考资料](#参考资料)

## 简介

你有没有想过：Android 系统是怎么组织的？为什么刷机教程里有时候让你刷 `boot`，有时候让你刷 `init_boot`？为什么有些设备有 `super` 分区，有些没有？

这些都和 Android 的分区系统有关。由于 Android 版本不断迭代，新设备的分区结构已经比以前复杂不少。如果你后面要碰刷写、Root、AVB 这些，分区这块绕不过去。

我们一步步来理清楚。

## 几个最常见的分区

先从最基本的说起：Android 设备上通常有哪些分区？它们各自负责什么？

- **boot** — 保存内核与 ramdisk。很多 Root 方案直接是以启动时侵入来提权的，所以经常要修改这个分区
- **init_boot** — Android 13+ 新设备常见，保存通用 ramdisk。这是 Google 为了实现 GKI（通用内核镜像）拆出来的
- **vendor_boot** — 厂商相关的 ramdisk 和设备树
- **system** — Android 系统主体文件，类似于 Windows 的 C:\Windows
- **vendor** — 厂商驱动与 HAL（硬件抽象层）
- **vbmeta** — AVB 校验元数据（在 [AVB 那篇](/posts/Android-AVB) 已经细说过了）
- **userdata** — 用户数据分区，你的照片、应用数据都在这里。格式化这个分区会清空数据
- **super** — 动态分区容器，里面可以切出多个逻辑分区（后面会详细说）

想知道你的设备上实际有哪些分区？可以用这个命令：

```bash
adb shell ls -la /dev/block/by-name/
```

你可能会发现，有些分区名后面还带着 `_a` 或 `_b` 后缀。这就引出了下一个话题：A/B 分区。

## A-Only 与 A/B

你有没有遇到过这种情况：系统 OTA 更新到一半突然断电，然后设备就开不了机了？

早期的 Android 设备就是这样。它们只有一套分区（A-Only），OTA 更新时直接覆盖原分区。更新过程中如果出问题——断电、网络中断、文件损坏——很容易直接把系统刷坏。

Google 在 Android 7.0 引入了 A/B 分区来解决这个问题。

**A/B 分区的思路是什么？**

准备两套槽位（`slot_a` 和 `slot_b`）：
- 平时从一套启动（比如 `slot_a`）
- 更新的时候写另一套（`slot_b`）
- 写完之后切换槽位，重启时从新的槽位启动
- 如果新槽位有问题，可以回退到旧槽位

这样 OTA 更稳定，更新失败也更容易回退。即使更新过程中断电，旧槽位的系统还是完整的，设备还能正常启动。

现在新设备基本都是 A/B 或者 Virtual A/B（后面会说），A-Only 越来越少见了。

**这对刷机有什么影响？**

如果你的设备是 A/B 分区，刷写的时候要注意当前在哪个槽位。很多刷机工具会自动处理，但如果手动刷写，最好先确认一下：

```bash
fastboot getvar current-slot
```

## Virtual A/B 与动态分区

A/B 分区解决了更新安全性的问题，但带来了新的问题：**存储空间翻倍了**。

因为你需要两套完整的系统分区（`system_a` 和 `system_b`、`vendor_a` 和 `vendor_b` 等等），这对存储空间的占用很大。

Google 在 Android 11 引入了 Virtual A/B 来解决这个问题。它的思路是：**不再准备两套完整的分区，而是只存一套，更新时用快照（snapshot）和差异数据来实现 A/B 的效果**。

这样既保留了 A/B 的安全性，又节省了存储空间。

而在 Android 10，Google 还引入了另一个重要概念：**动态分区**（Dynamic Partition）。

**动态分区是什么意思？**

以前每个分区的大小是固定的——`system` 多大、`vendor` 多大，出厂时就定死了。如果某个分区不够用了，你也没办法从别的分区借空间。

动态分区改变了这一点：很多原来独立的分区被塞进了一个叫 `super` 的容器里，大小可以动态调整。

所以你拿到新设备一看，分区名好像没几个，实际上很多原来独立的分区都被塞进了 `super` 里。

## super 分区

`super` 就是动态分区引入的容器。它不是普通意义上的单一分区，更像一个大的"仓库"。

**这个仓库里装了什么？**

通常包含这些逻辑分区：
- `system` — 系统主体
- `vendor` — 厂商驱动
- `product` — 产品相关的定制
- `system_ext` — 系统扩展
- `odm` — 设备相关的定制

这些逻辑分区的大小可以动态调整。比如某次更新 `system` 需要更多空间，可以从 `vendor` 或 `product` 那边"借"一些，前提是总容量不超过 `super` 的大小。

**这对刷机有什么影响？**

如果你在教程里看到"动态分区"这个词，基本就绕不开 `super`。有些刷机操作需要重新分配 `super` 里的逻辑分区大小，或者直接刷写整个 `super` 镜像。

所以现在很多刷机包会提供 `super.img`，而不是单独的 `system.img`、`vendor.img` 等。

## recovery 分区

`recovery` 分区包含一个轻量级的恢复系统，像是设备的**备用操作系统**，用来在正常系统无法启动时提供帮助。

**recovery 能做什么？**

- 双清（`wipe data` 和 `wipe cache`）
- 刷入 OTA 更新包（官方更新通常通过它安装）
- ADB sideload（通过电脑传入文件并刷写）
- 挂载分区、查看日志（调试用）

**两种 recovery 模式：**
- **Stock Recovery**（原厂 recovery）— 功能有限，通常只能刷官方签名的包
- **Custom Recovery**（第三方 recovery）— 比如 TWRP、OrangeFox，功能更强大，可以刷各种第三方包、备份整机、挂载分区进行修改等

对 LineageOS 这类第三方系统而言，你可能需要先刷一个第三方 recovery，然后通过它来刷入 ROM。

## init_boot

这个分区容易搞混，需要注意一下。

以前刷 Root，教程告诉你修补 `boot.img` 就行。但由于 GKI（Generic Kernel Image）和启动结构调整，部分 Android 13+ 设备把原来 `boot` 里的一部分内容（主要是 ramdisk）拆了出来，单独放到 `init_boot`。

**为什么要拆？**

GKI 的目标是让内核更通用、更新更快。拆分之后：
- `boot` 主要装内核
- `init_boot` 装 ramdisk（包含启动脚本、初始化配置等）

这样厂商可以单独更新内核，而不影响启动流程的其他部分。

**对刷机的影响？**

现在很多教程不是修补 `boot.img`，而是修补 `init_boot.img`。这不是教程写错了，而是设备的分区结构变了。

刷 Root 之前，最好先查清楚你的设备是哪种分区方案。通常：
- 老设备（Android 12 及以下）或不支持 GKI 的设备 → 修补 `boot.img`
- 新设备（部分 Android 13+）且支持 GKI → 修补 `init_boot.img`

可以用下面的命令检查设备是否有 `init_boot`：

```bash
fastboot getvar all | grep init_boot
```

如果有输出，说明你的设备有这个分区。

## 刷机时最常碰到的几个分区

列一下实际操作中经常会遇到的分区：

- **`boot`** — 装内核和 ramdisk（或只有内核，如果设备有 `init_boot`），Root 修补最常涉及的分区
- **`init_boot`** — 新设备上拆出来的 ramdisk，部分设备 Root 需要修补它而不是 `boot`
- **`vendor_boot`** — 厂商相关的启动配置，有些设备刷 Magisk 也需要处理它
- **`vbmeta`** — AVB 校验元数据，刷第三方 ROM 时经常需要禁用它（`--disable-verity --disable-verification`）
- **`userdata`** — 用户数据，格式化它相当于恢复出厂设置（双清的一部分）

**操作场景：**
- 修改 `boot` / `init_boot` → 通常和 Root 有关
- 修改 `vbmeta` → 通常和 AVB 校验有关（刷第三方包时需要禁用）
- 格式化 `userdata` → 通常和双清、解锁 BL、换 ROM 有关

---

分区这块先到这，谢谢阅读。

## 参考资料

- [AOSP 官方文档](https://source.android.com/)
