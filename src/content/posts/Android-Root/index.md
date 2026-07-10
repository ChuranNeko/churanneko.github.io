---
title: Android 的 Root 与定制 ROM
published: 2026-04-08
description: Root、su、Magisk、KernelSU、APatch、定制 ROM、GApps、国行与 EU 差异……把这块内容理一遍
tags: [Android, Root, Magisk, KernelSU]
category: Android
lang: zh_CN
---

# Android 的 Root 与定制 ROM

## 目录

:::tip
可直接点击文字跳转至对应章节
:::

- [Android 的 Root 与定制 ROM](#android-的-root-与定制-rom)
  - [目录](#目录)
  - [简介](#简介)
  - [Root 与 su](#root-与-su)
  - [主流 Root 方案](#主流-root-方案)
    - [Magisk](#magisk)
    - [KernelSU](#kernelsu)
    - [KernelSU-Next](#kernelsu-next)
    - [APatch 与 SukiSU-Ultra](#apatch-与-sukisu-ultra)
  - [定制 ROM](#定制-rom)
  - [GApps](#gapps)
  - [国行与 EU 的差异](#国行与-eu-的差异)
  - [参考资料](#参考资料)

## 简介

为什么要 Root？为什么要刷定制 ROM？

很多人并不是为了研究系统本身，而是因为原厂系统的各种限制：广告太多、后台限制太严、停更太快，或者 Google 服务体验不完整。Root 和定制 ROM 就是为了解决这些问题。

但在开始之前，先问自己几个问题：你真的需要 Root 吗？你的设备支持解锁 BL 吗？你能接受可能带来的风险吗？

如果答案是肯定的，那我们就来理一遍 Root 和定制 ROM 这块内容。

## Root 与 su

先说清楚 Root 到底是什么。

Root 就是 Android 的最高权限。因为 Android 底层是 Linux，所以 Root 这个概念也是从 Linux 的 `root` 用户来的。拿到 Root 后，你可以：
- 修改系统文件
- 运行各种需要高权限的模块
- 安装需要深度访问的工具

但这也意味着风险。删错文件、刷写错模块、修改错权限，结果都可能比普通 App 崩掉麻烦得多。

**那 `su` 是什么？**

`su` 是 Linux 里的 `switch user` 命令。Root 之后，很多 App 实际上就是通过调用 `su` 去提权的。

Root 管理器（比如 Magisk）的作用就是控制这个过程：当某个 App 请求 Root 权限时，管理器会弹出授权提示，你可以选择允许、拒绝或者仅本次放行。它还会记录每个 App 的请求历史，方便你随时调整权限策略。

## 主流 Root 方案

现在主流的 Root 方案主要有这几种。它们的实现思路不同，适用场景也不一样。

:::github{repo="topjohnwu/Magisk"}

:::github{repo="tiann/KernelSU"}

:::github{repo="KernelSU-Next/KernelSU-Next"}

:::github{repo="bmax121/APatch"}

:::github{repo="SukiSU-Ultra/SukiSU-Ultra"}

那该选哪个呢？这取决于你的设备、你的需求，以及你能接受的复杂度。我们一个个来看。

### Magisk

如果你是新手，我个人比较推荐从 Magisk 入手。为什么？

- **兼容性最好** — 几乎所有能解锁 BL 的设备都能用
- **资料最多** — 遇到问题基本都能找到解决方案
- **模块生态最大** — 广告拦截、字体主题、系统行为调整，大多数模块都是围着 Magisk 长起来的

Magisk 的核心思路是 `systemless root`：它不直接修改 `/system` 分区，而是修改 `boot.img` 或 `init_boot.img`，让 Root 和模块在系统启动后"挂"上去。由于不修改系统分区，回退、还原、处理 OTA 的时候相对灵活。

**安装方式：**

1. 从官方固件包里提取 `boot.img` 或 `init_boot.img`
2. 放进 Magisk App 做 patch，生成 `patched_*.img`
3. 用 fastboot 刷写回对应分区：

```bash
fastboot flash boot patched_boot.img
```

Magisk 还有一个特色功能叫 `Zygisk`，它在 Zygote（Android 的应用进程孵化器）这层加载代码，让模块更早介入应用进程。很多高级模块都依赖这个功能。

### KernelSU

Magisk 是在用户态做 Root，而 KernelSU 把这件事搬到了内核层。

这带来了什么好处？**更强的隐藏能力**。因为 Root 的实现在内核里，银行 App、游戏、企业管控这类会检测 Root 的应用更难发现它。

但这也带来了门槛：你的设备需要支持 GKI（Generic Kernel Image，通用内核镜像），或者有人为你的设备编译了集成 KernelSU 的内核。

近两年 KernelSU 的热度很高，很多人还会搭配 `SuSFS`（一个文件系统隐藏方案）使用，进一步增强隐藏能力。

但注意，这不代表"无敌隐藏"。检测和对抗一直在变，没有哪种方案能保证永远过检测。

KernelSU 的模块 API 比 Magisk 收敛一些，这是设计选择——为了更可控。生态没有 Magisk 大，但整体质量更稳定。

### KernelSU-Next

这是 KernelSU 的社区 fork，而且这两年明显比主线更活跃。

为什么会出现这个分支？因为原始 KernelSU 主线的开发节奏放慢了，而社区有很多新功能、兼容性改进、隐藏机制的需求。很多新功能和 `SuSFS` 的整合会先在 KernelSU-Next 这边推进。

所以如果你的设备维护者推荐 KernelSU-Next，最好直接跟着这条线走。它的更新频率、bug 修复速度都比主线快。

社区自然会往更活跃的分支集中，这也是开源项目的常态。

### APatch 与 SukiSU-Ultra

APatch 也是内核级 Root，思路是直接 patch 内核。它和 KernelSU 的目标接近，但实现是另一套方案。安装方式、兼容性、模块生态和细节都不一样。

SukiSU-Ultra 比较新，但社区热度上升很快。

这两种方案都值得关注，但由于比较新，最好在动手之前：
- 确认你的设备有人维护
- 看清维护者的说明和已知问题
- 准备好救砖的备用方案

不是说它们不稳定，而是新方案的坑和解决方案还没有像 Magisk 那样被充分验证。如果你追求稳定和省心，Magisk 或 KernelSU 可能更合适；如果你愿意尝试新东西，这两个方案也有自己的优势。

## 定制 ROM

说完 Root，再说定制 ROM。

定制 ROM 不是"装几个模块"那么简单，而是直接替换掉原来的整套系统。它是社区基于 AOSP 编译出来的第三方系统。

:::github{repo="LineageOS/android"}

:::github{repo="crdroidandroid/android_vendor_crdroid"}

`LineageOS` 偏稳定、干净、长期维护。`crDroid` 在 LineageOS 基础上加了更多功能和自定义选项。

**那为什么要刷定制 ROM？**

原因通常有这几种：

- **厂商停更了** — 安全补丁和大版本更新都断了，但硬件其实还够用
- **原厂太臃肿** — 广告、预装应用、后台限制太多
- **想要更干净的系统** — 更接近原生 Android，更多自定义选项
- **想继续用 Google 服务** — 或者别的生态
- **厂商阉割** — 比如 HyperOS 国行只有 5 种语言，很多功能被阉割

老设备上这点尤其明显：硬件还能用，问题只是官方系统没人管了。换个维护得好的定制 ROM，设备的生命周期还能继续往后拉。

但也不是所有设备都适合刷定制 ROM。**有没有靠谱的维护者？驱动和相机适配做得怎么样？**这些都会直接影响体验。刷之前最好先去对应的 ROM 社区看看设备维护状态和已知问题。

## GApps

刷完定制 ROM 之后，你可能会发现：Play Store 呢？Gmail 呢？为什么 Google 的东西都没有？

这是因为 AOSP 本身不带 Google 的应用和服务。大多数定制 ROM 为了保持纯净（或者避免版权问题），也不会默认帮你塞好。

GApps（Google Apps）就是这整套应用和基础服务的打包，包括：
- Play Store
- Play Services（很多应用的推送、账号同步都依赖它）
- Gmail
- Google 地图
- 等等

现在常见的 GApps 方案有：

- **MindTheGapps** — 比较常见，很多 ROM 维护者直接推荐

:::github{repo="MindTheGapps/vendor_gapps"}

- **NikGapps** — 提供更细的包型选择，从精简到完整都有

**刷写时要注意什么？**

一定要看清楚：
- Android 版本是否匹配
- 架构是否正确（通常是 arm64）
- ROM 维护者有没有特别说明

如果包不匹配，轻则装不上，重则卡第二屏或者系统行为异常。

另外，`OpenGApps` 这条线现在基本可以视为过时了，对新 Android 版本的跟进很慢。不建议再用。

## 国行与 EU 的差异

这里以小米 HyperOS 为例，说说国行版和 EU 版的区别。

很多人以为国行和 EU 版只差一个地区码，其实差别大得多。它们面向的服务生态不同，体验也完全不一样。

**国行版：**
- 只有 5 种系统语言
- Google 服务不完整——Play Store 要手动安装，装完之后账号同步、推送、输入法适配经常会比较割裂
- 更贴合国内服务生态

**EU 版：**
- 多语言支持更完整
- Google 服务集成更直接——Play Store、同步、通知、输入法这些环节更接近正常的国际版体验
- 更适合使用 Google 服务的用户

**那该选哪个？**

这取决于你的使用习惯：
- 如果你主要用国内服务，国行反而更贴合
- 如果你的使用习惯偏向 Google、多语言、国际化，最好换 EU 版或者直接刷第三方 ROM

国行和 EU 之间的切换通常需要刷写完整固件包，不是简单改个设置就能搞定的。所以最好在买设备之前就想清楚。

## 参考资料

- [Magisk 官方文档](https://topjohnwu.github.io/Magisk/)
- [KernelSU 官方文档](https://kernelsu.org/)
- [APatch Docs](https://apatch.dev/)
- [LineageOS Wiki](https://wiki.lineageos.org/)
- [NikGapps 官网](https://nikgapps.com/)
- [MindTheGapps (GitLab)](https://gitlab.com/MindTheGapps/vendor_gapps)
