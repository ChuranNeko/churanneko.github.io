---
title: Android 的 AVB 与启动校验
published: 2026-04-08
description: AVB、vbmeta、dm-verity、回滚保护、BL 带锁与解锁……把 Android 启动校验机制理一遍
tags: [Android, AVB, vbmeta, Root]
category: Android

lang: zh_CN
---

# Android 的 AVB 与启动校验

## 目录

:::tip
可直接点击文字跳转至对应章节
:::

- [Android 的 AVB 与启动校验](#android-的-avb-与启动校验)
  - [目录](#目录)
  - [简介](#简介)
  - [什么是 AVB](#什么是-avb)
  - [vbmeta 是什么](#vbmeta-是什么)
  - [AVB 的工作流程](#avb-的工作流程)
  - [dm-verity](#dm-verity)
  - [BL 带锁和解锁的区别](#bl-带锁和解锁的区别)
  - [为什么修改了 boot 或 vbmeta 开不了机](#为什么修改了-boot-或-vbmeta-开不了机)
  - [回滚保护](#回滚保护)
  - [参考资料](#参考资料)

## 简介

你有没有遇到过这种情况：明明镜像刷写进去了，fastboot 也没报错，结果重启之后设备就是起不来？或者更奇怪的是，系统是启动了，但 Wi-Fi 怎么都连不上？

很多人第一反应是"镜像有问题"或者"我刷写方法不对"。但其实，问题可能根本不在镜像本身，而是出在一个叫 AVB 的机制上。

AVB 是 Android 8 之后引入的启动校验机制。用原厂系统的时候你完全感觉不到它的存在，但一旦开始解锁 BL、刷写第三方镜像、修补 `boot` 分区，AVB 就会跳出来"拦"你一下。如果不处理好它，轻则功能异常，重则直接开不了机。

那 AVB 到底在干什么？为什么它能"拦"住我们？我们一步步来看。

## 什么是 AVB

AVB 全称是 Android Verified Boot。简单说，它就是一套"检查员"机制：在设备启动之前，Bootloader 会先检查关键分区有没有被动过手脚，签名是不是还在可信链中。

那它要检查哪些分区呢？通常包括：

- `boot` — 内核和 ramdisk 都在这里
- `init_boot` — Android 13+ 设备拆出来的通用 ramdisk
- `vendor_boot` — 厂商相关的启动内容
- `system` — 系统主体文件
- 以及其他被 `vbmeta` 描述到的分区

这就引出了一个新问题：Bootloader 怎么知道要检查哪些分区？检查的标准又是什么？答案就在 `vbmeta` 里。

## vbmeta 是什么

你可以把 `vbmeta` 理解成一份"检查清单"。Bootloader 在校验别的分区之前，会先读取这份清单，看看里面写了什么。

`vbmeta` 里通常包含这些内容：

- **分区描述信息（descriptor）** — 告诉 Bootloader 要检查哪些分区
- **哈希或哈希树** — 每个分区应该对应什么样的校验值
- **公钥和签名** — 用来验证这份清单本身是不是可信的
- **标志位（flags）** — 控制校验的严格程度
- **回滚保护用的版本索引** — 防止你降级到旧版本

如果你在教程里看到这些命令参数，别慌，它们都是在调整 `vbmeta` 的行为：

- `disable-verity` — 关掉运行期的 `dm-verity` 校验
- `disable-verification` — 放宽 AVB 对分区的校验要求

很多教程让你"刷写 `vbmeta.img`"或者"修补 `vbmeta` 分区"，修改的就是这些标志位。

:::info
有些设备不止一个 `vbmeta`，还会拆成 `vbmeta_system`、`vbmeta_vendor` 之类。实现细节不同，但原理是一样的。
:::

## AVB 的工作流程

理解了 `vbmeta` 之后，整个流程就清楚了：

1. **Bootloader 启动** — 设备开机，Bootloader 开始工作
2. **读取 `vbmeta`** — Bootloader 先去读这份"检查清单"，看看里面记录了什么
3. **检查各个分区** — 按照清单里的 descriptor，逐个校验 `boot`、`init_boot`、`system` 等分区的哈希和签名
4. **全部通过** — 校验都过了，继续引导系统
5. **任何一步失败** — 根据当前策略处理（BL 带锁时直接拒绝启动，BL 解锁时可能允许继续但会显示警告）

看起来很简单对吧？但这里藏着一个关键问题：**如果你修改了 `boot` 分区，但 `vbmeta` 里记录的还是原来的哈希值，会发生什么？**

答案是：校验失败。如果 BL 还带锁，设备直接拒绝启动。即使 BL 解锁了，很多设备也会因为校验不通过导致部分功能异常——比如 Wi-Fi 用不了。

这就是为什么很多教程会让你同时处理 `boot` 和 `vbmeta`：你不光要修改 `boot`，还要让 `vbmeta` 不再按原来的标准去校验它。

## dm-verity

前面说的 AVB 是在启动前做检查。那系统启动之后呢？还会继续检查吗？

会的。这就是 `dm-verity` 的作用——它负责**运行期**的完整性校验。

`dm-verity` 主要用在只读分区上，比如 `system` 和 `vendor`。系统每次读取数据块时，都会对照预先计算好的哈希树，检查内容有没有被改动过。如果某个块的哈希对不上，轻则报错，重则直接导致系统无法启动。

这就是为什么很多 Root 或修改系统分区的教程，都会让你处理 `disable-verity` / `disable-verification`，然后刷写一个修改过的 `vbmeta`——目的就是让设备在运行时不再做这些严格的校验。

:::warning
注意一个常见误区：**解锁 BL 不等于 `dm-verity` 自动失效**。很多设备即使解锁了 BL，依然会保留原厂的校验机制，除非你主动修改过相关分区。
:::

那这里又引出一个新问题：如果我解锁了 BL，但没有禁用 AVB 和 `dm-verity`，修改 `boot` 之后会怎样？

## BL 带锁和解锁的区别

这里先把 BL（Bootloader）带锁和解锁的区别说清楚，因为这直接决定了 AVB 会不会"拦"住你。

**BL 带锁时：**

- Bootloader 只信任厂商认可的签名
- 任何关键分区被修改，校验失败后设备通常直接拒绝启动
- 如果没有 9008 授权或官方救砖工具，基本只能去售后或闲鱼买临时授权

**BL 解锁后：**

- 设备允许加载第三方引导程序
- 你才能正常刷写 `boot`、`init_boot`、`vbmeta` 这些关键分区
- 重启时通常会显示"设备已解锁"的警告
- **但 AVB 的校验不会消失**，只是从"严格拒绝"变成"允许继续，但仍会警告或限制部分功能"

这就是很多人踩的坑：以为解锁 BL 之后就可以随便改了，结果发现修改 `boot` 后 Wi-Fi 用不了，或者系统功能异常。原因就是 AVB 还在按原来的标准做校验，只不过不再直接拒绝启动而已。

## 为什么修改了 boot 或 vbmeta 开不了机

现在我们可以回答开头的问题了：为什么明明刷写成功了，设备却起不来？

原因通常有这几种：

1. **你修改了 `boot`，但 `vbmeta` 里记录的还是原始校验值** — Bootloader 一对比，发现哈希对不上，校验失败
2. **你修改了 `vbmeta`，但没有用设备认可的密钥重新签名** — Bootloader 读取 `vbmeta` 时发现签名不对，直接拒绝
3. **你只修改了镜像，但没有处理 `disable-verity` / `disable-verification`** — 设备还在按严格标准做校验
4. **设备还处在带锁状态** — Bootloader 根本不接受修改后的镜像

这就是为什么很多人"刷写了 Magisk 修补的 `boot.img` 后开不了机"——不是 Magisk 有问题，而是 AVB 还在按原来的链做校验。你改了 `boot`，但没有告诉 AVB"别再检查它了"。

:::warning
如果设备还没解锁 BL，千万不要直接刷写修改过的 `boot` 或 `vbmeta`。先解锁，再刷写，最后处理 AVB。
:::

那怎么"告诉"AVB 别检查了呢？通常有两种办法：

1. **刷写一个禁用了校验的 `vbmeta`** — 把标志位改成 `disable-verity` 和 `disable-verification`
2. **用空的 `vbmeta` 覆盖原来的** — 让 Bootloader 读不到校验信息，自然也就不检查了

具体用哪种方法，要看你的设备和你想达到的效果。

## 回滚保护

最后还有一个容易被忽略的机制：**回滚保护**（Rollback Protection）。

你有没有遇到过这种情况：明明镜像版本更旧，但签名是对的，为什么还是刷写不进去？

这就是回滚保护在起作用。它的目的是**防止设备被降级到旧版本**——因为旧版本可能存在已知的安全漏洞。

具体怎么实现的呢？`vbmeta` 里会带一个回滚索引（rollback index），设备本地的安全存储（比如 TrustZone 或 TEE）也会记录一个当前允许的最低版本值。Bootloader 校验时会比较这两个值：

- 如果你刷写进去的镜像版本**更旧**，即使签名没问题，也可能直接被拒绝
- 如果版本**相同或更新**，才允许继续

这就是为什么有些设备"能把旧包刷写进去，fastboot 也没报错，但就是无法正常引导"——不是刷写失败了，而是回滚保护把它拦住了。

所以如果你想降级，光刷写镜像可能不够，还要看设备的回滚保护策略是不是允许。

## 参考资料

- [AOSP - Verified Boot](https://source.android.com/docs/security/features/verifiedboot)
- [AOSP - AVB README](https://android.googlesource.com/platform/external/avb/+/master/README.md)
- [AOSP - dm-verity](https://source.android.com/docs/security/features/verifiedboot/dm-verity)
