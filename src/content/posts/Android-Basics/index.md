---
title: Android 的基本概念
published: 2026-04-08
description: AOSP、Bootloader、fastboot、Recovery、Root、SU、卡刷、线刷、侧载、定制 ROM……一篇文章理清所有概念
tags: [Android, Root, 刷机, 概念]
category: Android
image: "background.png"
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

这篇整理了刷机、Root、换 ROM 过程中会碰到的常见名词。遇到不认识的词可以回来查。

## Android 与 AOSP

AOSP（Android Open Source Project）是 Google 开源的 Android 基础代码，厂商和社区都在这个基础上改。

- **Pixel** — Google 基于 AOSP
- **HyperOS / One UI / ColorOS** — 厂商定制
- **LineageOS / crDroid** — 社区第三方 ROM

Android 底层是 Linux 内核，后面碰到 Root、SELinux、`su` 等概念，基本上都能绕回 Linux。

## Bootloader（BL）

Bootloader 是引导加载程序，负责初始化硬件并在系统启动前决定是否继续加载后面的镜像。出厂时基本是锁的，只允许加载厂商认可并签名的镜像。解锁之后才允许加载第三方引导程序。

### 解锁前后的区别

锁着的时候，Bootloader 配合 AVB 对关键分区做校验，你只能引导官方系统。解锁之后允许加载第三方引导程序，才能改 `boot`、`vbmeta`、`init_boot` 这些关键分区。

你可以使用以下命令来解锁 BL：

```bash
fastboot flashing unlock
```

:::warning
注意，解锁时大多数设备会自动格式化 `userdata` 分区，也就是清空数据。部分品牌还会熔断 eFuse（如三星 Knox），不可逆。
:::

### 各家解锁政策

差别很大，简单列一下：

- **Google Pixel** — 最简单，直接 `fastboot flashing unlock`
- **小米** — 国内现在基本走不了官方渠道，账号、答题、等待期都加上了
- **一加 / OPPO** — 很多机型要走深度测试或审核流程
- **三星** — 限制更重，不同地区差异很大
- **vivo / 荣耀 / 华为** — 官方一般不开放解锁路径

如果知道自己要刷机，最好买设备之前先查一下能不能解锁 BL。

## fastboot 与 EDL

`fastboot` 是 PC 和 Bootloader 之间通信的协议。手机进 fastboot 模式后，你可以在电脑上直接操作设备：

```bash
# 解锁 BL
fastboot flashing unlock

# 刷入镜像
fastboot flash boot patched_boot.img

# 临时启动镜像（不写入）
fastboot boot recovery.img

# 重启
fastboot reboot
```

这里 `fastboot boot` 只是临时启动，不会写进分区，重启后恢复原样。

EDL（9008 模式）是高通平台更底层的救砖模式，一般用来救已经开不了机的设备。普通情况不用碰。

## ADB

`adb`（Android Debug Bridge）是系统运行起来之后常用的调试工具。它和 `fastboot` 不是一回事——`fastboot` 工作在 Bootloader 阶段，`adb` 工作在系统或 Recovery 阶段。

```bash
# 查看设备
adb devices

# 进入 shell
adb shell

# 推送文件
adb push local_file /sdcard/

# 拉取文件
adb pull /sdcard/remote_file ./

# 安装 APK
adb install app.apk
```

## Recovery

Recovery 是独立于主系统之外的小环境，主要用来做系统维护——刷升级包、清分区、恢复出厂设置、备份和恢复。

出厂自带的 Recovery 功能有限，一般只能刷官方签名的 OTA 包。第三方 Recovery 常见的是 TWRP 和 OrangeFox：

:::github{repo="minimal-manifest-twrp/platform_manifest_twrp"}

:::github{repo="OrangeFox/Recovery"}

注意，Android 13+ 使用 `init_boot` 的设备不一定能长期刷入第三方 Recovery，但你可以使用 `fastboot boot recovery.img` 临时启动。

## AVB（Android Verified Boot）

AVB 是 Android 的启动校验机制，用来校验启动过程中关键分区的内容有没有被改过。

核心流程就是 Bootloader 先读 `vbmeta`，随后根据里面的哈希、签名和标志位去校验 `boot`、`system` 等分区。校验过了继续启动，没过在 BL 带锁状态下就会开不了机。

改了 `boot`、`vbmeta`、`system` 之后设备拒绝启动，大概率就是 AVB 这边没过。详细内容请看 [Android 的 AVB 与启动校验](/posts/Android-AVB)。

## 关键分区速览

- **boot** — 保存内核和 ramdisk
- **init_boot** — Android 13+ 新设备常见，保存通用 ramdisk
- **vendor_boot** — 厂商相关启动内容
- **system** — Android 系统主体文件
- **vendor** — 驱动与 HAL
- **vbmeta** — AVB 校验元数据
- **userdata** — 用户数据分区
- **super** — 动态分区容器

```bash
adb shell ls -la /dev/block/by-name/
```

分区详细说明请看 [Android 的分区系统](/posts/Android-Partitions)。

## 卡刷、线刷与侧载

- **卡刷** — 把刷机包放到本地存储，通过 Recovery 安装

> 最早 Android 能直接挂载物理 SDCard 分区，后面这种设计基本没了，但名字保留了下来。现在 `/sdcard` 更多是映射出来的用户存储路径，实际还是挂在 `/data` 下面。

- **线刷** — 手机进 fastboot 或 EDL，通过 USB 在电脑上直接刷分区镜像
- **侧载（ADB Sideload）** — 不先把文件传进手机，直接通过 `adb sideload` 从电脑推送给 Recovery 安装

## 双清

"双清"就是清这两个：

- `data`
- `cache`

"三清"再加一个 Dalvik / ART Cache。

- **同一 ROM 的 OTA 升级**，很多时候可以直接刷
- **换 ROM** 或 **降级**，最好清一下，如果不清的话旧数据和新系统校验不通过，容易开不了机或卡第二屏

再往下的"四清""五清"就比较激进了，尤其清 `system` 和内置存储的时候，操作错了后面会更麻烦。

## 刷机常见问题

**卡第一屏** — 卡在厂商 Logo，常见原因是 `boot`、`vbmeta`、内核或启动校验出了问题。

**卡第二屏** — 过了 Logo 但卡在开机动画，常见原因是 `system` 不完整、没双清、旧数据冲突、GApps 包不匹配。

**软砖** — 进不了系统，但还能进 fastboot、Recovery 或别的维护模式。

**硬砖** — 完全没反应，黑屏，按键也没反应。高通平台如果还能进 EDL，一般还没到完全没救的程度。

另外两个常见概念：

- **底包** — 刷第三方 ROM 前的官方基础固件
- **基带** — 管 4G/5G、Wi-Fi、蓝牙等通信相关固件

这两块一般别乱动，尤其是基带。

## Root 与 SU

Root 就是 Android 的最高权限。`su` 是 Linux 的提权命令，Root 之后很多 App 就是通过调用 `su` 来获取权限。Root 管理器负责控制谁能拿这个权限、能拿多久。

Root 方案和详细对比请看 [Android 的 Root 与定制 ROM](/posts/Android-Root)。

## 定制 ROM 与 GApps

定制 ROM 是社区基于 AOSP 编译的第三方系统。GApps 是 Google 服务组件（Play Store、Play Services、Gmail 等），AOSP 本身不带，大多数定制 ROM 也不会默认塞好。

详细内容请看 [Android 的 Root 与定制 ROM](/posts/Android-Root)。

## 参考资料

- [AOSP 官方文档](https://source.android.com/)
- [Magisk 官方文档](https://topjohnwu.github.io/Magisk/)
- [KernelSU 官方文档](https://kernelsu.org/)
- [LineageOS Wiki](https://wiki.lineageos.org/)
- [OrangeFox 官网](https://orangefox.org/)
- [NikGapps 官网](https://nikgapps.com/)
- [MindTheGapps (GitLab)](https://gitlab.com/MindTheGapps/vendor_gapps)

## 延伸搜索

- [Android Bootloader 解锁方法](https://www.bing.com/search?q=Android+Bootloader+解锁+方法)
- [fastboot 常用命令大全](https://www.bing.com/search?q=fastboot+常用命令+大全)
- [Android 刷机 卡第一屏 卡第二屏 解决](https://www.bing.com/search?q=Android+刷机+卡第一屏+卡第二屏+解决)
- [Android 双清 三清 区别](https://www.bing.com/search?q=Android+双清+三清+区别)
