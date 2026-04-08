---
title: Android 的分区系统
published: 2026-04-08
description: boot、init_boot、vendor_boot、vbmeta、super、userdata、A/B、VAB、动态分区……把 Android 分区系统理一遍
tags: [Android, 分区, 刷机, A/B]
category: Android
image: "background.png"
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

由于 Android 版本迭代，新设备的分区结构已经比以前复杂不少。如果你后面要碰刷机、Root、AVB 这些，分区这块绕不过去。

## 几个最常见的分区

- **boot** — 保存内核与 ramdisk，很多 Root 方案直接是以启动时侵入来提权的
- **init_boot** — Android 13+ 新设备常见，保存通用 ramdisk
- **vendor_boot** — 厂商相关的 ramdisk 和设备树
- **system** — Android 系统主体文件
- **vendor** — 厂商驱动与 HAL
- **vbmeta** — AVB 校验元数据（在 AVB 那篇会细说）
- **userdata** — 用户数据分区，格式化会清空数据
- **super** — 动态分区容器，里面可以切出多个逻辑分区

你可以使用以下命令来查看自己设备上实际有哪些分区：

```bash
adb shell ls -la /dev/block/by-name/
```

## A-Only 与 A/B

早期设备只有一套分区（A-Only），OTA 更新时直接覆盖原分区。由于更新过程中如果出问题，很容易直接把系统刷坏，后面 Google 在 Android 7.0 引入了 A/B 分区。

A/B 分区准备两套槽位（`slot_a` / `slot_b`），平时从一套启动，更新的时候写另一套，随后切换槽位。这样 OTA 更稳，更新失败也更容易回退。

现在新设备基本都已经是 A/B 或者 Virtual A/B 了，A-Only 越来越少见。

## Virtual A/B 与动态分区

Google 在 Android 10 引入了动态分区（Dynamic Partition），随后在 Android 11 引入了 Virtual A/B。配合动态分区之后，很多分区的大小和布局不再固定死了。

所以你拿到新设备一看，分区名好像没几个，实际上很多原来独立的分区都被塞进了 `super` 里。

## super 分区

`super` 就是动态分区引入的容器。它不是普通意义上的单一分区，更像一个大的容器，其中包含了多个逻辑分区：

- `system`
- `vendor`
- `product`
- `system_ext`
- `odm`

如果你在教程里看到"动态分区"这个词，基本就绕不开 `super`。刷机的时候有些操作需要对 `super` 做处理，也是由于这个原因。

## init_boot

这里注意一下，这个分区容易搞混。

以前刷 Root，教程告诉你 修补 `boot.img` 就行。但由于 GKI 和启动结构调整，部分 Android 13+ 设备把原来 `boot` 里的一部分内容拆出去了，单独放到 `init_boot`。

所以现在很多教程已经不是 修补 `boot.img`，而是 修补 `init_boot.img`。这不是教程写错了，而是设备的分区结构变了。最好刷之前先搞清楚自己设备是哪种分区方案。

## 刷机时最常碰到的几个分区

- `boot`
- `init_boot`
- `vendor_boot`
- `vbmeta`
- `userdata`

其中改 `boot` / `init_boot` 大多和 Root 有关，改 `vbmeta` 大多和 AVB 校验有关，格式化 `userdata` 大多和双清、解锁 BL、换 ROM 有关。

分区这块先到这，谢谢阅读。

## 参考资料

- [AOSP 官方文档](https://source.android.com/)

## 延伸搜索

- [Android A/B 分区详解](https://www.bing.com/search?q=Android+A%2FB+分区+详解)
- [Android 动态分区 super](https://www.bing.com/search?q=Android+动态分区+super+partition)
- [Android init_boot 和 boot 区别](https://www.bing.com/search?q=Android+init_boot+boot+区别+GKI)
- [Android Virtual A/B 升级原理](https://www.bing.com/search?q=Android+Virtual+A%2FB+升级+原理)
