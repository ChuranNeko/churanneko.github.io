---
title: Android 的基本概念
published: 2026-04-08
description: AOSP、Bootloader、fastboot、Recovery、Root、SU、卡刷、线刷、侧载、定制 ROM……一篇文章理清所有概念
tags: [Android, Root, 刷机, 概念]
category: Android

lang: zh_CN
---

# Android 的基本概念

## 目录

:::tip
可直接点击文字跳转至对应章节
:::

- [Android 的基本概念](#android-的基本概念)
  - [目录](#目录)
  - [简介](#简介)
  - [Android 与 AOSP](#android-与-aosp)
  - [Bootloader（BL）](#bootloaderbl)
    - [解锁前后的区别](#解锁前后的区别)
    - [各家解锁政策](#各家解锁政策)
  - [fastboot 与 EDL](#fastboot-与-edl)
  - [ADB](#adb)
  - [Recovery](#recovery)
  - [AVB（Android Verified Boot）](#avbandroid-verified-boot)
  - [关键分区速览](#关键分区速览)
  - [卡刷、线刷与侧载](#卡刷线刷与侧载)
  - [双清](#双清)
  - [刷机常见问题](#刷机常见问题)
  - [Root 与 SU](#root-与-su)
  - [定制 ROM 与 GApps](#定制-rom-与-gapps)
  - [参考资料](#参考资料)

## 简介

如果你刚开始接触 Android 刷机、Root 或者换 ROM，多半会被一堆术语搞晕：什么是 Bootloader？fastboot 和 ADB 有什么区别？为什么有人说"卡刷"，有人说"线刷"？AVB 又是什么东西？

这篇文章不会直接告诉你"怎么刷机"，而是把这些概念理一遍。遇到不认识的词，可以回来查。

## Android 与 AOSP

先从最基础的说起：Android 系统是从哪来的？

AOSP（Android Open Source Project）是 Google 开源的 Android 基础代码。所有 Android 设备，不管是 Google 自己的 Pixel，还是小米、三星、OPPO 的定制系统，甚至社区维护的第三方 ROM，都是在 AOSP 的基础上改出来的。

- **Pixel** — Google 基于 AOSP 做的最接近原生的版本
- **HyperOS / One UI / ColorOS** — 各家厂商的定制版本
- **LineageOS / crDroid** — 社区维护的第三方 ROM

那 Android 底层是什么呢？答案是 Linux 内核。所以后面你会看到的 Root、SELinux、`su` 这些概念，其实都能绕回 Linux 的权限体系。

## Bootloader（BL）

你有没有想过：手机开机的时候，谁先跑起来？

答案是 Bootloader（引导加载程序）。它负责在系统启动之前初始化硬件，然后决定是否继续加载后面的镜像。

出厂时，Bootloader 通常是锁着的，只允许加载厂商认可并签名的镜像。这就是为什么你不能随便刷写第三方系统——Bootloader 会拒绝加载它。

**那解锁 BL 之后呢？**

解锁之后，设备允许加载第三方引导程序，你才能修改 `boot`、`vbmeta`、`init_boot` 这些关键分区。但这也带来了新问题：解锁时大多数设备会自动格式化 `userdata` 分区，也就是清空数据。部分品牌（比如三星）还会熔断 eFuse（Knox），不可逆。

### 解锁前后的区别

**BL 带锁时：**
- Bootloader 只信任厂商认可的签名
- 关键分区被修改后，设备通常直接拒绝启动

**BL 解锁后：**
- 允许加载第三方引导程序
- 你可以刷写修改过的镜像
- 重启时会显示"设备已解锁"的警告

解锁命令通常是：

```bash
fastboot flashing unlock
```

:::warning
解锁时大多数设备会自动格式化 `userdata` 分区，也就是清空数据。部分品牌还会熔断 eFuse（如三星 Knox），不可逆。
:::

### 各家解锁政策

不同厂商对解锁的态度差别很大：

- **Google Pixel** — 最简单，直接 `fastboot flashing unlock`
- **小米** — 国内现在基本走不了官方渠道，账号、答题、等待期都加上了
- **一加 / OPPO** — 很多机型要走深度测试或审核流程
- **三星** — 限制更重，不同地区差异很大
- **vivo / 荣耀 / 华为** — 官方一般不开放解锁路径

如果你打算刷机，最好买设备之前先查一下能不能解锁 BL。

## fastboot 与 EDL

解锁了 BL 之后，怎么和设备通信呢？这就要用到 `fastboot`。

`fastboot` 是 PC 和 Bootloader 之间通信的协议。手机进入 fastboot 模式后，你可以在电脑上直接操作设备：

```bash
# 解锁 BL
fastboot flashing unlock

# 刷写镜像到指定分区
fastboot flash boot patched_boot.img

# 临时启动一个镜像（不写入分区）
fastboot boot recovery.img

# 重启设备
fastboot reboot
```

这里特别注意 `fastboot boot` 这个命令——它只是**临时启动**一个镜像，不会写进分区。重启之后设备会恢复原样。这在测试 Recovery 或者修补过的 `boot` 时特别有用：你可以先临时启动看看效果，确认没问题再正式刷写。

**那 EDL 是什么？**

EDL（Emergency Download Mode，也叫 9008 模式）是高通平台更底层的救砖模式。当设备完全开不了机、fastboot 也进不去的时候，EDL 可能是最后的救命稻草。

不过 EDL 一般需要授权文件或者官方工具才能用，普通情况下用不到。

## ADB

你可能听说过 ADB，也可能听说过 fastboot，那它们是一回事吗？

不是。它们工作在不同的阶段：

- **fastboot** — 工作在 Bootloader 阶段，设备还没启动系统
- **ADB**（Android Debug Bridge）— 工作在系统或 Recovery 启动之后

ADB 是日常调试最常用的工具。你可以用它查看设备状态、推送文件、安装应用、进入 shell：

```bash
# 查看连接的设备
adb devices

# 进入设备的 shell
adb shell

# 推送文件到设备
adb push local_file /sdcard/

# 从设备拉取文件
adb pull /sdcard/remote_file ./

# 安装 APK
adb install app.apk
```

所以如果有人让你"在 fastboot 模式下用 ADB"，那肯定是搞混了——fastboot 模式下只能用 `fastboot` 命令，ADB 要等系统启动起来才能用。

## Recovery

你有没有想过：如果系统坏了，连桌面都进不去，怎么修复？

这就是 Recovery 存在的意义。它是独立于主系统之外的一个小环境，主要用来做系统维护——刷写升级包、清分区、恢复出厂设置、备份和恢复。

出厂自带的 Recovery 功能通常比较有限，只能刷写官方签名的 OTA 包。如果你想刷写第三方 ROM 或者 Magisk，就需要第三方 Recovery。

常见的第三方 Recovery 有：

:::github{repo="minimal-manifest-twrp/platform_manifest_twrp"}

:::github{repo="OrangeFox/Recovery"}

**但这里有个问题：**Android 13+ 使用 `init_boot` 分区的设备，不一定能长期刷写第三方 Recovery。因为分区结构变了，Recovery 的安装方式也要跟着变。

不过你可以用 `fastboot boot recovery.img` 临时启动第三方 Recovery，用完之后重启就恢复原样，不影响系统。

## AVB（Android Verified Boot）

现在来说一个很多人踩过的坑：AVB。

你可能遇到过这种情况：明明镜像刷写成功了，重启之后设备却起不来，或者 Wi-Fi 用不了。很多人第一反应是"镜像有问题"，但其实问题可能出在 AVB 上。

AVB 是 Android 的启动校验机制。它的作用是在设备启动前，检查关键分区（比如 `boot`、`system`）有没有被修改过。如果检测到修改，设备可能拒绝启动，或者限制部分功能。

核心流程是这样的：

1. Bootloader 先读取 `vbmeta` 分区（这是一份"检查清单"）
2. 根据清单里的哈希和签名，校验 `boot`、`system` 等分区
3. 校验通过，继续启动；校验失败，按策略处理

**所以如果你修改了 `boot` 分区，但 `vbmeta` 里记录的还是原来的哈希值，会发生什么？**

答案是：校验失败。这就是为什么很多 Root 教程会让你同时处理 `boot` 和 `vbmeta`——你不光要修改 `boot`，还要让 `vbmeta` 不再按原来的标准去校验它。

详细内容请看 [Android 的 AVB 与启动校验](/posts/Android-AVB)。

## 关键分区速览

刷机过程中你会频繁接触这些分区，先大概了解一下它们的作用：

- **boot** — 保存内核和 ramdisk，很多 Root 方案就是修改这个分区
- **init_boot** — Android 13+ 新设备常见，保存通用 ramdisk
- **vendor_boot** — 厂商相关的启动内容
- **system** — Android 系统主体文件
- **vendor** — 驱动与 HAL（硬件抽象层）
- **vbmeta** — AVB 校验元数据，前面刚说过
- **userdata** — 用户数据分区，你的照片、应用数据都在这里
- **super** — 动态分区容器，里面可以切出多个逻辑分区

想知道你的设备上实际有哪些分区？可以用这个命令：

```bash
adb shell ls -la /dev/block/by-name/
```

关于分区的详细说明，请看 [Android 的分区系统](/posts/Android-Partitions)。

## 卡刷、线刷与侧载

刷机教程里经常出现"卡刷"、"线刷"、"侧载"这些词，它们到底有什么区别？

- **卡刷** — 把刷机包放到设备本地存储（`/sdcard`），然后通过 Recovery 安装

> 为什么叫"卡刷"？早期 Android 设备可以直接挂载物理 SD 卡，刷机包就放在卡里，所以叫卡刷。后来虽然物理 SD 卡基本没了，`/sdcard` 变成了映射到 `/data` 下的虚拟路径，但名字保留了下来。

- **线刷** — 手机进入 fastboot 或 EDL 模式，通过 USB 线在电脑上直接刷写分区镜像

- **侧载（ADB Sideload）** — 不先把文件传进手机，而是直接通过 `adb sideload` 从电脑推送给 Recovery 安装

那什么时候用哪种方式呢？

- **卡刷** — 适合刷写 ROM 包、Magisk、GApps 这类 ZIP 格式的包
- **线刷** — 适合刷写单个分区镜像（比如 `boot.img`、`vbmeta.img`），或者救砖
- **侧载** — 适合设备存储空间不够，或者不想先传文件的情况

## 双清

刷机教程里经常会看到"双清"、"三清"这些词，到底清的是什么？

**双清**指的是清理这两个分区：
- `data` — 用户数据
- `cache` — 系统缓存

**三清**再加一个 Dalvik / ART Cache（虚拟机缓存）。

**那什么时候需要清？**

- **同一 ROM 的 OTA 升级** — 很多时候可以直接刷写，不需要清
- **换 ROM** 或 **降级** — 最好清一下，否则旧数据和新系统对不上，容易开不了机或卡第二屏

再往下还有"四清"、"五清"，甚至清 `system` 和内置存储的。但这些操作比较激进，尤其是清内置存储的时候，操作错了后面会更麻烦。一般情况下，双清或三清就够了。

## 刷机常见问题

刷机过程中最常见的几种状况：

**卡第一屏** — 卡在厂商 Logo，过不去。这通常说明启动阶段就出问题了，常见原因是：
- `boot` 分区有问题
- `vbmeta` 校验没通过
- 内核或 Bootloader 出了问题

**卡第二屏** — 过了厂商 Logo，但卡在开机动画。这说明启动阶段过了，但系统初始化有问题，常见原因是：
- `system` 分区不完整
- 没有双清，旧数据和新系统冲突
- GApps 包版本不匹配

**软砖** — 进不了系统，但还能进 fastboot、Recovery 或别的维护模式。这种情况一般还能救。

**硬砖** — 完全没反应，黑屏，按键也没反应。高通平台如果还能进 EDL（9008 模式），一般还没到完全没救的程度。

另外还有两个经常听到的概念：

- **底包** — 刷写第三方 ROM 前需要的官方基础固件
- **基带** — 管 4G/5G、Wi-Fi、蓝牙等通信相关的固件

这两块一般别乱动，尤其是基带。刷写错了可能导致信号异常，甚至通信功能完全失效。

## Root 与 SU

Root 是什么？简单说，就是 Android 的最高权限。

因为 Android 底层是 Linux，所以 Root 这个概念也是从 Linux 来的。在 Linux 里，`root` 用户拥有系统的完全控制权。拿到 Root 后，你可以修改系统文件、安装需要高权限的工具、运行各种模块。

那 `su` 又是什么？它是 Linux 的提权命令（`switch user`）。Root 之后，很多 App 实际上就是通过调用 `su` 来获取权限的。

Root 管理器（比如 Magisk）的作用是什么呢？它负责控制哪些 App 能调用 `su`、能拿多久、什么时候拿。当某个 App 请求 Root 权限时，管理器会弹出授权提示，你可以选择允许、拒绝或者仅本次放行。

关于 Root 方案和详细对比，请看 [Android 的 Root 与定制 ROM](/posts/Android-Root)。

## 定制 ROM 与 GApps

**定制 ROM** 是社区基于 AOSP 编译的第三方系统。注意，这不是"装几个模块"那么简单，而是直接替换掉整套系统。

常见的定制 ROM 有 LineageOS、crDroid 等。很多人刷写定制 ROM 的原因是：
- 厂商停更了
- 原厂系统广告太多、限制太多
- 想要更干净的体验或更多自定义选项

**那 GApps 是什么？**

GApps 是 Google Apps（Google 应用套件）的缩写，包括 Play Store、Play Services、Gmail、Google 地图等。AOSP 本身不带这些，大多数定制 ROM 也不会默认塞好。

所以刷写定制 ROM 之后，如果你想用 Google 服务，还需要单独刷写 GApps 包。常见的有 MindTheGapps 和 NikGapps。

详细内容请看 [Android 的 Root 与定制 ROM](/posts/Android-Root)。

## 参考资料

- [AOSP 官方文档](https://source.android.com/)
- [Magisk 官方文档](https://topjohnwu.github.io/Magisk/)
- [KernelSU 官方文档](https://kernelsu.org/)
- [LineageOS Wiki](https://wiki.lineageos.org/)
- [OrangeFox 官网](https://orangefox.org/)
- [NikGapps 官网](https://nikgapps.com/)
- [MindTheGapps (GitLab)](https://gitlab.com/MindTheGapps/vendor_gapps)
