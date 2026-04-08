---
title: Android 的 AVB 与启动校验
published: 2026-04-08
description: AVB、vbmeta、dm-verity、回滚保护、BL 带锁与解锁……把 Android 启动校验机制理一遍
tags: [Android, AVB, vbmeta, Root]
category: Android
image: "background.png"
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
  - [至于为什么改了 boot 或 vbmeta 会开不了机](#至于为什么改了-boot-或-vbmeta-会开不了机)
  - [回滚保护](#回滚保护)
  - [参考资料](#参考资料)

## 简介

`AVB` 是在 `Android 8` 以后引入的启动校验机制。平时用原厂系统几乎无感，但由于一旦你开始解锁 BL、刷第三方镜像、修补 `boot` 分区、禁用校验 `vbmeta`，你就会发现如果不禁用 `AVB` 部分功能(包含Wifi等)是完全用不了的。

很多人碰到的"刷完开不了机"，不是镜像不会刷，是忘了将 `AVB` 给禁用。好了，回到这里，让我们来看 `AVB` 到底是什么。

## 什么是 AVB

`AVB` 全称是 `Android Verified Boot`，负责在启动阶段校验关键分区，确认内容没被改过、签名还在可信链中。

校验的目标通常包括：

- `boot`
- `init_boot`
- `vendor_boot`
- `system`
- 以及其他被 `vbmeta` 描述到的分区

## vbmeta 是什么

`vbmeta` 是 AVB 的元数据镜像。Bootloader 在校验别的分区之前，先看它。`vbmeta` 里通常放这些内容：

- 分区描述信息（descriptor）
- 对应分区的哈希或哈希树
- 公钥和签名
- 标志位（flags）
- 回滚保护用到的版本索引

你会经常在 `AVB` 领域遇到命令教程带这些后缀：

- `disable-verity` — 禁用 `dm-verity` 这类运行期校验
- `disable-verification` — 放宽 AVB 的分区校验

很多教程里提到"刷写 `vbmeta.img`"或者"修补 `vbmeta`分区"，改的基本就是这块。

:::info
有些设备不止一个 `vbmeta`，还会拆成 `vbmeta_system`、`vbmeta_vendor` 之类。实现会分开，但原理一样。
:::

## AVB 的工作流程

其实流程不复杂：

1. Bootloader 先读取并校验 `vbmeta`
2. `vbmeta` 里的 descriptor 告诉 Bootloader 还要校验哪些分区
3. Bootloader 按记录的哈希、签名去验证 `boot`、`init_boot`、`system` 等分区
4. 校验全部通过，继续引导系统
5. 任何一步失败，按当前策略处理

如果 BL 带锁，失败就直接拒绝启动。如果 BL 解锁(允许加载第三方引导程序)，很多设备会允许继续引导，但仍会显示警告。

## dm-verity

`dm-verity` 属于运行期完整性校验。AVB 负责启动前先校验，`dm-verity` 负责初始化后继续校验。

它常见于 `system`、`vendor` 这类只读分区。系统读取数据块时会对照哈希(sha)树检查内容有没有变化，如果块校验对不上，轻则报错，重则无法启动变砖。

所以很多 Root 或改系统分区的教程，都会让你处理 `disable-verity` / `disable-verification`，随后写进 patched `vbmeta` 里来放宽校验。

:::warning
注意，解锁 BL 不等于 `dm-verity` 自动失效。很多机器解锁以后，基本上都是原厂的，除非你自己动过分区，那么当我没说。
:::

## BL 带锁和解锁的区别

**BL 带锁时：**

- Bootloader 只信任厂商认可的签名
- 关键分区只要被改，校验大概率直接失败直接会导致变砖(你如果没 `9008` 授权 要么去售后 要么只能去 闲鱼去买临时授权)
- 失败后设备通常拒绝继续引导

**BL 解锁后：**

- 设备允许引导第三方加载程序
- 你才能正常刷写 `boot`、`init_boot`、`vbmeta` 这些关键分区
- 启动时通常会显示解锁警告

如果已经解锁 BL，AVB 的校验不会消失，只是从"严格拒绝"变成"允许继续，但仍会警告"。

## 至于为什么改了 boot 或 vbmeta 会开不了机

由于你一旦改了 `boot`，原来记录在 `vbmeta` 里的哈希或签名就不匹配了。改了 `vbmeta`，它自己的签名又可能和当前设备信任的公钥对不上。

常见情况：

- `boot.img` 被 Patch 过，但 `vbmeta` 还记录着原始校验值
- `vbmeta.img` 被改过，但没有用设备认可的 key 重新签名
- 你只改了镜像，没有处理 `disable-verity` / `disable-verification`
- 设备还处在带锁状态，Bootloader 不接受修改后的镜像

所以"刷了 Magisk 修补的 `boot.img` 后开不了机"，很多时候不是 Magisk 有问题，而是 AVB 还在按原来的链做校验。

:::warning
如果设备还没解锁 BL，最好不要直接刷改过的 `boot` 或 `vbmeta`。
:::

## 回滚保护

回滚保护用来防止设备降级到旧版本。`vbmeta` 里会带回滚索引，设备本地的安全存储也会记一个当前允许的最低版本值。Bootloader 校验时会比较这两个值，如果你刷进去的镜像版本更旧，哪怕签名没问题，也可能直接被拒绝。

所以有些机器"能刷进去旧包，但就是无法正常引导"，可能是回滚保护卡住了。

## 参考资料

- [AOSP - Verified Boot](https://source.android.com/docs/security/features/verifiedboot)
- [AOSP - AVB README](https://android.googlesource.com/platform/external/avb/+/master/README.md)
- [AOSP - dm-verity](https://source.android.com/docs/security/features/verifiedboot/dm-verity)

## 延伸搜索

- [Android AVB vbmeta 详解](https://www.bing.com/search?q=Android+AVB+vbmeta+详解)
- [Android dm-verity 禁用方法](https://www.bing.com/search?q=Android+dm-verity+disable+禁用)
- [Android vbmeta patch 教程](https://www.bing.com/search?q=Android+vbmeta+patch+刷机)
- [Android 回滚保护 rollback protection](https://www.bing.com/search?q=Android+rollback+protection+回滚保护)
