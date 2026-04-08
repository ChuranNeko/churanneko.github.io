---
title: Android 的 Root 与定制 ROM
published: 2026-04-08
description: Root、su、Magisk、KernelSU、APatch、定制 ROM、GApps、国行与 EU 差异……把这块内容理一遍
tags: [Android, Root, Magisk, KernelSU]
category: Android
image: "background.png"
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

Android 只要继续往下折腾，Root 和定制 ROM 基本绕不开。很多人也不是为了研究系统本身，而是原厂系统广告多、限制多、停更快，或者 Google 服务体验不完整。

好了，我们开始把这块理一遍。

## Root 与 su

Root 就是 Android 的最高权限，底层是 Linux 的 `root` 用户。拿到 Root 后可以改系统文件、跑模块、装需要高权限的工具。

注意，权限放开之后风险也会跟着上来。删错文件、刷错模块、改错权限，结果都可能比普通 App 崩掉麻烦得多。

`su` 是 Linux 里的 `switch user`。Root 之后很多 App 实际上就是通过调用 `su` 去提权。Root 管理器负责弹授权、记录请求，决定某个 App 是允许、拒绝还是仅本次放行。

## 主流 Root 方案

现在主流方案就这几条：

:::github{repo="topjohnwu/Magisk"}

:::github{repo="tiann/KernelSU"}

:::github{repo="KernelSU-Next/KernelSU-Next"}

:::github{repo="bmax121/APatch"}

:::github{repo="SukiSU-Ultra/SukiSU-Ultra"}

### Magisk

最通用、资料最多、兼容面最广。我个人比较推荐新手先从 Magisk 入手。

核心思路是 `systemless root`，不直接改 `/system`，而是改 `boot.img` 或 `init_boot.img`，让 Root 和模块在系统启动后挂上去。由于不改系统分区，回退、还原、处理 OTA 的时候相对灵活。

安装方式一般是把原厂 `boot.img` 或 `init_boot.img` 放进 Magisk App 做 patch，随后生成 patched image，再用 `fastboot` 刷回对应分区：

```bash
fastboot flash boot patched_boot.img
```

模块生态最大，广告拦截、字体主题、系统行为调整这些，基本都是围着 Magisk 长起来的。另外它还有 `Zygisk`，在 Zygote 这层加载代码，让模块更早介入应用进程。

### KernelSU

内核级 Root，不是在用户态挂载，而是直接在内核层处理 `su` 和权限控制。前提是设备支持 GKI 或者有集成 KernelSU 的内核，门槛比 Magisk 高一些。

近两年热度很高，由于隐藏能力更强，银行 App、游戏、企业管控这类场景过检测比 Magisk 更容易。

很多人还会搭配 `SuSFS` 使用，进一步补隐藏能力。注意这不代表一定"无敌隐藏"，检测和对抗一直在变。

模块 API 比 Magisk 收一些，这是设计选择。生态没有 Magisk 大，但整体更可控。

### KernelSU-Next

KernelSU 的社区 fork，这两年明显比主线更活跃。很多新功能、兼容处理、隐藏相关改动都会先在这边推进，和 `SuSFS` 的整合也更积极。

由于原始 KernelSU 主线开发节奏放慢，社区自然往更活跃的分支集中。如果你的设备维护者推荐 KernelSU-Next，最好直接跟着那条线走。

### APatch 与 SukiSU-Ultra

APatch 也是内核级 Root，思路是直接 patch 内核。和 KernelSU 接近但实现不是同一套，安装方式、兼容性、模块生态和细节都不一样。

SukiSU-Ultra 比较新，社区热度上升很快。

这两种方案都值得关注，但由于比较新，最好确认设备支持、看清维护者说明之后再下手。

## 定制 ROM

定制 ROM 是社区基于 AOSP 编译出来的第三方系统，不是"装几个模块"那么简单，而是直接替换掉原来的整套系统。

:::github{repo="LineageOS/android"}

:::github{repo="crdroidandroid/android_vendor_crdroid"}

`LineageOS` 偏稳定、干净、长期维护。`crDroid` 在 LineageOS 基础上加功能和自定义项。

刷进去是一套完整系统，分区、底包、GApps、数据清理这些问题都会跟着进来。

很多人刷定制 ROM 的原因：

- 厂商停更了，安全补丁和大版本都断了
- 原厂太臃肿，广告、预装和后台限制太多
- 想要更干净的系统、更多自定义选项
- 想继续用 Google 服务或别的生态
- 厂商阉割（比如 HyperOS 国行只有 5 种语言）

老设备上这点尤其明显，硬件其实还够用，问题只是官方系统已经没人管了。换个维护得好的定制 ROM，生命周期还能继续往后拉。

当然也不是所有设备都适合刷。有没有靠谱维护者、驱动和相机适配做得怎么样，会直接影响体验。

## GApps

GApps 是 Google Apps 这整套应用和基础服务，包括 Play Store、Play Services、Gmail、Google 地图等。AOSP 本身不带这些，大多数定制 ROM 也不会默认帮你塞好。

现在常见的方案：

- **MindTheGapps** — 比较常见，很多 ROM 维护者直接推荐

:::github{repo="MindTheGapps/vendor_gapps"}

- **NikGapps** — 提供更细的包型选择，从精简到完整都有

这里注意，刷 GApps 时一定要看 Android 版本、架构和 ROM 维护者说明。如果包不匹配，轻则装不上，重则卡第二屏或者系统行为异常。

`OpenGApps` 这条线现在基本可以视为过时，对新 Android 版本跟进很慢。

## 国行与 EU 的差异

这里以小米 HyperOS 为例。国行版和 EU 版不是只差一个地区码，面向的服务生态不同，体验也差很多。

国行只有 5 种系统语言，Google 服务不完整——Play Store 要手动装，装完之后账号同步、推送、输入法适配经常会比较割裂。

EU 版多语言支持更完整，Google 服务集成更直接，Play Store、同步、通知、输入法这些环节更接近正常的国际版体验。

如果你主要用国内服务，国行反而更贴合。但如果使用习惯偏向 Google、多语言、国际化，最好换 EU 版或者刷第三方 ROM。

## 参考资料

- [Magisk 官方文档](https://topjohnwu.github.io/Magisk/)
- [KernelSU 官方文档](https://kernelsu.org/)
- [APatch Docs](https://apatch.dev/)
- [LineageOS Wiki](https://wiki.lineageos.org/)
- [NikGapps 官网](https://nikgapps.com/)
- [MindTheGapps (GitLab)](https://gitlab.com/MindTheGapps/vendor_gapps)

## 延伸搜索

- [Magisk Zygisk 模块推荐](https://www.bing.com/search?q=Magisk+Zygisk+模块+推荐)
- [KernelSU SuSFS 隐藏 Root](https://www.bing.com/search?q=KernelSU+SuSFS+隐藏+Root)
- [Android GApps 刷入教程](https://www.bing.com/search?q=Android+GApps+MindTheGapps+刷入)
- [小米 HyperOS 国行 EU 区别](https://www.bing.com/search?q=小米+HyperOS+国行+EU+区别)
