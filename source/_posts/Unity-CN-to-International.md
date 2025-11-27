---
title: Unity-CN-to-International
date: 2025-11-26 14:49:09
tags:
  - Tags
---
Unity中国特供转国际版本

<!--more-->

## 目录

- [简介](#简介)
- [判断](#判断)
- [为什么要安装国际版本](#为什么要安装国际版本)
- [解决方法](#解决方法)
  - [方法一](#方法一)
  - [方法二](#方法二)
  - [方法三](#方法三)
- [Unity 列表](#unity-列表)
- [引用](#引用)
- [示例图片](#示例图片)

## 简介

此文章说明如何解决安装Unity时为中国特供版本,如何转换为国际版本的帮助。

## 判断

查看Unity Hub安装的Unity版本后缀是否携带`c1`后缀,如果有则为中国特供版本,否则为国际版本。

## 为什么要安装国际版本

Unity中国特供版存在功能限制，强制用户安装中国特供版本的Unity等。

以下内容引用自[Unity中国想钱想疯了](https://zhuanlan.zhihu.com/p/226163910)。

```text
这次事件再次证明了两点

1. Unity官方无论是对于本文中提及的收入问题，还是这次如何计算下载量问题，都属于拍脑袋定的政策，完全没有明确的量化标准。
2. Unity内部也不统一思想，官网的解释都能互相矛盾。
这次定价不仅对中小开发者和独立开发者不友好，还是要杀死超休闲游戏的节奏。国内情况我不清楚，但海外如voodoo这种超休闲大厂，很多产品就是Unity做的，推广纯靠买量，一个用户买量成本也就几美分，现在即使按照最便宜的档位算，也几乎成本翻倍了，这谁顶得住？
```

## 解决方法

> 如果已经安装了Unity,请先卸载当前版本的Unity,然后再尝试进行以下步骤。

### 方法一

也是最简单的方法
通过官方的Unity Editor官方的发行界面下载Unity Editor,随后将安装好的Unity版本添加至UnityHub(可选)。

[点我跳转至官方的Unity Editor发行界面](https://unity.com/releases/editor/archive)

### 方法二

使用代理软件来进行安装,市面上有很多代理软件可供选择,例如Shadowsocks、V2Ray、Clash等。

> 以下是推荐代理软件的GitHub仓库地址(现依旧在更新的仓库,截至2025.11.26):

- [v2rayN](https://github.com/2dust/v2rayN) - 客户端多平台支持
- [Clash Verge](https://github.com/clash-verge-rev/clash-verge-rev) - Clash 变体客户端，支持 Windows/Mac/Linux，GUI 友好，兼容 Meta 内核。

如果你使用的是Shadowsocks/Clash类的代理软件，只需修改浏览器的HTTP/HTTPS代理或者修改规则即可

以下是在Windows/MacOS系统的解决方式

Windows:

将以下文本使用 `记事本` 或者其他编辑器保存后,右键重命名为 `.bat` 后缀名

[点我跳转至示例截图](#windows显示文件扩展名的示例)

```bat
@echo off

# 此处1080为你的代理端口,如果代理端口不在1080,请修改为你的代理端口
set HTTP_PROXY=http://127.0.0.1:1080
set http_proxy=http://127.0.0.1:1080
set HTTPS_PROXY=http://127.0.0.1:1080
set https_proxy=http://127.0.0.1:1080

# 此处为Unity Hub的默认安装路径,如果你的安装路径不一样请修改为你的安装路径
start "" "C:\Program Files\Unity Hub\Unity Hub.exe"
```

MacOS：
需要在终端中运行下面脚本，然后把生成的`launchUnityHub.command`挪到一个方便的位置（例如桌面）

```bash
echo '#!/bin/bash
# 此处1080为你的代理端口,如果代理端口不在1080,请修改为你的代理端口
export HTTP_PROXY=http://127.0.0.1:1080
export http_proxy=http://127.0.0.1:1080
export HTTPS_PROXY=http://127.0.0.1:1080
export https_proxy=http://127.0.0.1:1080
nohup "/Applications/Unity Hub.app/Contents/MacOS/Unity Hub" &>/dev/null &' > launchUnityHub.command
chmod +x launchUnityHub.command
```

双击运行生成的`launchUnityHub.command`即可启动Unity Hub。

---

## 方法二

如果你的代理软件支持`TUN`模式,可以直接开启`TUN`模式+全局代理。

如果有已安装的Unity Hub版本，先卸载，为以防万一，卸载之后删除~/AppData/Roaming这个目录下的Unity Hub目录。然后再安装。
Windows可以运行以下命令以删除Unity Hub的配置文件夹:

```bat
rd /s /q " %USERPROFILE%\AppData\Roaming\UnityHub"
```

直接开启TUN模式,然后直接下载Unity国际版本。

[点击这里下载Windows版本](https://public-cdn.cloud.unity3d.com/hub/nuo/unityhubSetup.exe)
[点击这里下载MacOS版本](https://public-cdn.cloud.unity3d.com/hub/prod/unityhubSetup.dmg)

这里有一些Unity编辑器的软链接 安装版本列表

[点我跳转至安装版本列表](#unity-列表)

---

## Unity 列表

VRChat官方给出的Unity版本是2022.3.22f1

[点击此处安装VRChat官方推荐的Unity版本](unityhub://2022.3.22f1)

这里是Unity软连接地址(点击对应版本号会自动唤起本地的Unity Hub应用开始安装对应版本的Unity):

> Tips: 如果你下列没有需要版本你可以以`unityhub://`开头然后又添加上 `{版本号}` 的格式来安装其他版本的Unity。

由于版本有点多,我给出了一个版本目录(基于[如何取得Unity Hub内旧版本Unity下载链接](https://zhuanlan.zhihu.com/p/106132063)基础上优化显示)方便你更好的找到他们。

### 版本目录(点击即可跳转)

- [Unity-2021.2](#unity-20212)
- [Unity 2021.1](#unity-20211)
- [Unity 2020.3(LTS)](#unity-20203lts)
- [Unity 2020.2](#unity-20202)
- [Unity 2020.1](#unity-20201)
- [Unity 2019.4(LTS)](#unity-20194lts)
- [Unity 2019.3](#unity-20193)
- [Unity 2019.2](#unity-20192)
- [Unity 2019.1](#unity-20191)
- [Unity 2018.4(LTS)](#unity-20184lts)
- [Unity 2018.3](#unity-20183)
- [Unity 2018.2](#unity-20182)
- [Unity 2018.1](#unity-20181)
- [Unity 2017.4(LTS)](#unity-20174lts)
- [Unity 2017.3](#unity-20173)
- [Unity 2017.2](#unity-20172)
- [Unity 2017.1](#unity-20171)
- [Unity 5](#unity-5)

### Unity 2021.2

[2021.2.0a10/b8c2bb7e8b36](unityhub://2021.2.0a10/b8c2bb7e8b36)

### Unity 2021.1

[2021.1.0f1/61a549675243](unityhub://2021.1.0f1/61a549675243)

### Unity 2020.3(LTS)

[2020.3.2f1/8fd9074bf66c](unityhub://2020.3.2f1/8fd9074bf66c)

[2020.3.1f1/77a89f25062f](unityhub://2020.3.1f1/77a89f25062f)

[2020.3.0f1/c7b5465681fb](unityhub://2020.3.0f1/c7b5465681fb)

### Unity 2020.2

[2020.2.7f1/c53830e277f1](unityhub://2020.2.7f1/c53830e277f1)

[2020.2.6f1/8a2143876886](unityhub://2020.2.6f1/8a2143876886)

[2020.2.5f1/e2c53f129de5](unityhub://2020.2.5f1/e2c53f129de5)

[2020.2.4f1/becced5a802b](unityhub://2020.2.4f1/becced5a802b)

[2020.2.3f1/8ff31bc5bf5b](unityhub://2020.2.3f1/8ff31bc5bf5b)

[2020.2.2f1/068178b99f32](unityhub://2020.2.2f1/068178b99f32)

[2020.2.1f1/270dd8c3da1c](unityhub://2020.2.1f1/270dd8c3da1c)

[2020.2.0f1/3721df5a8b28](unityhub://2020.2.0f1/3721df5a8b28)

### Unity 2020.1

- 2020.1.1xf1

[2020.1.17f1/9957aee8edc2](unityhub://2020.1.17f1/9957aee8edc2)

[2020.1.16f1/f483ad6465d6](unityhub://2020.1.16f1/f483ad6465d6)

[2020.1.15f1/97d0ae02d19d](unityhub://2020.1.15f1/97d0ae02d19d)

[2020.1.14f1/d81f64f5201d](unityhub://2020.1.14f1/d81f64f5201d)

[2020.1.13f1/5e24f28bfbc0](unityhub://2020.1.13f1/5e24f28bfbc0)

[2020.1.12f1/55b56f0a86e3](unityhub://2020.1.12f1/55b56f0a86e3)

[2020.1.11f1/698c1113cef0](unityhub://2020.1.11f1/698c1113cef0)

[2020.1.10f1/974a9d56f159](unityhub://2020.1.10f1/974a9d56f159)

- 2020.1.xf1

[2020.1.9f1/145f5172610f](unityhub://2020.1.9f1/145f5172610f)

[2020.1.8f1/22e8c0b0c3ec](unityhub://2020.1.8f1/22e8c0b0c3ec)

[2020.1.7f1/064ffcdb64ad](unityhub://2020.1.7f1/064ffcdb64ad)

[2020.1.6f1/fc477ca6df10](unityhub://2020.1.6f1/fc477ca6df10)

[2020.1.5f1/e025938fdedc](unityhub://2020.1.5f1/e025938fdedc)

[2020.1.4f1/fa717bb873ec](unityhub://2020.1.4f1/fa717bb873ec)

[2020.1.3f1/cf5c4788e1d8](unityhub://2020.1.3f1/cf5c4788e1d8)

[2020.1.2f1/7b32bc54ba47](unityhub://2020.1.2f1/7b32bc54ba47)

[2020.1.1f1/2285c3239188](unityhub://2020.1.1f1/2285c3239188)

[2020.1.0f1/2ab9c4179772](unityhub://2020.1.0f1/2ab9c4179772)

### Unity 2019.4(LTS)

- 2019.4.2xf1

[2019.4.20f1/6dd1c08eedfa](unityhub://2019.4.20f1/6dd1c08eedfa)

- 2019.4.1xf1

[2019.4.19f1/ca5b14067cec](unityhub://2019.4.19f1/ca5b14067cec)

[2019.4.18f1/3310a4d4f880](unityhub://2019.4.18f1/3310a4d4f880)

[2019.4.17f1/667c8606c536](unityhub://2019.4.17f1/667c8606c536)

[2019.4.16f1/e05b6e02d63e](unityhub://2019.4.16f1/e05b6e02d63e)

[2019.4.15f1/fbf367ac14e9](unityhub://2019.4.15f1/fbf367ac14e9)

[2019.4.14f1/4037e52648cd](unityhub://2019.4.14f1/4037e52648cd)

[2019.4.13f1/518737b1de84](unityhub://2019.4.13f1/518737b1de84)

[2019.4.12f1/225e826a680e](unityhub://2019.4.12f1/225e826a680e)

[2019.4.11f1/2d9804dddde](unityhub://2019.4.11f1/2d9804dddde7)

[2019.4.10f1/5311b3af6f69](unityhub://2019.4.10f1/5311b3af6f69)

- 2019.4.xf1

[2019.4.9f1/50fe8a171dd9](unityhub://2019.4.9f1/50fe8a171dd9)

[2019.4.8f1/60781d942082](unityhub://2019.4.8f1/60781d942082)

[2019.4.7f1/e992b1a16e65](unityhub://2019.4.7f1/e992b1a16e65)

[2019.4.6f1/a7aea80e3716](unityhub://2019.4.6f1/a7aea80e3716)

[2019.4.5f1/81610f64359c](unityhub://2019.4.5f1/81610f64359c)

[2019.4.4f1/1f1dac67805b](unityhub://2019.4.4f1/1f1dac67805b)

[2019.4.3f1/f880dceab6fe](unityhub://2019.4.3f1/f880dceab6fe)

[2019.4.2f1/20b4642a3455](unityhub://2019.4.2f1/20b4642a3455)

[2019.4.1f1/e6c045e14e4e](unityhub://2019.4.1f1/e6c045e14e4e)

[2019.4.0f1/0af376155913](unityhub://2019.4.0f1/0af376155913)

### Unity 2019.3

- 2019.3.1xf1

[2019.3.15f1/59ff3e03856d](unityhub://2019.3.15f1/59ff3e03856d)

[2019.3.14f1/2b330bf6d2d8](unityhub://2019.3.14f1/2b330bf6d2d8)

[2019.3.13f1/d4ddf0d95db9](unityhub://2019.3.13f1/d4ddf0d95db9)

[2019.3.12f1/84b23722532d](unityhub://2019.3.12f1/84b23722532d)

[2019.3.11f1/ceef2d848e70](unityhub://2019.3.11f1/ceef2d848e70)

[2019.3.10f1/5968d7f82152](unityhub://2019.3.10f1/5968d7f82152)

- 2019.3.xf1

[2019.3.9f1/e6e740a1c473](unityhub://2019.3.9f1/e6e740a1c473)

[2019.3.8f1/4ba98e9386ed](unityhub://2019.3.8f1/4ba98e9386ed)

[2019.3.8f1/4ba98e9386ed](unityhub://2019.3.8f1/4ba98e9386ed)

[2019.3.7f1/6437fd74d35d](unityhub://2019.3.7f1/6437fd74d35d)

[2019.3.6f1/5c3fb0a11183](unityhub://2019.3.6f1/5c3fb0a11183)

[2019.3.5f1/d691e07d38ef](unityhub://2019.3.5f1/d691e07d38ef)

[2019.3.4f1/4f139db2fdbd](unityhub://2019.3.4f1/4f139db2fdbd)

[2019.3.3f1/7ceaae5f7503](unityhub://2019.3.3f1/7ceaae5f7503)

[2019.3.2f1/c46a3a38511e](unityhub://2019.3.2f1/c46a3a38511e)

[2019.3.1f1/89d6087839c2](unityhub://2019.3.1f1/89d6087839c2)

[2019.3.0f6/27ab2135bccf](unityhub://2019.3.0f6/27ab2135bccf)

### Unity 2019.2

- 2019.2.1xf1

[2019.2.21f1/9d528d026557](unityhub://2019.2.21f1/9d528d026557)

[2019.2.20f1/c67d00285037](unityhub://2019.2.20f1/c67d00285037)

[2019.2.19f1/929ab4d01772](unityhub://2019.2.19f1/929ab4d01772)

[2019.2.18f1/bbf64de26e34](unityhub://2019.2.18f1/bbf64de26e34)

[2019.2.17f1/8e603399ca02](unityhub://2019.2.17f1/8e603399ca02)

[2019.2.16f1/b9898e2d04a4](unityhub://2019.2.16f1/b9898e2d04a4)

[2019.2.15f1/dcb72c2e9334](unityhub://2019.2.15f1/dcb72c2e9334)

[2019.2.14f1/49dd4e9fa428](unityhub://2019.2.14f1/49dd4e9fa428)

[2019.2.13f1/e20f6c7e5017](unityhub://2019.2.13f1/e20f6c7e5017)

[2019.2.12f1/b1a7e1fb4fa5](unityhub://2019.2.12f1/b1a7e1fb4fa5)

[2019.2.11f1/5f859a4cfee5](unityhub://2019.2.11f1/5f859a4cfee5)

[2019.2.10f1/923acd2d43aa](unityhub://2019.2.10f1/923acd2d43aa)

- 2019.2.xf1

[2019.2.9f1/ebce4d76e6e8](unityhub://2019.2.9f1/ebce4d76e6e8)

[2019.2.8f1/ff5b465c8d13](unityhub://2019.2.8f1/ff5b465c8d13)

[2019.2.7f2/c96f78eb5904](unityhub://2019.2.7f2/c96f78eb5904)

[2019.2.7f2/c96f78eb5904](unityhub://2019.2.7f2/c96f78eb5904)

[2019.2.5f1/9dace1eed4cc](unityhub://2019.2.5f1/9dace1eed4cc)

[2019.2.4f1/c63b2af89a85](unityhub://2019.2.4f1/c63b2af89a85)

[2019.2.3f1/8e55c27a4621](unityhub://2019.2.3f1/8e55c27a4621)

[2019.2.2f1/ab112815d860](unityhub://2019.2.2f1/ab112815d860)

[2019.2.1f1/ca4d5af0be6f](unityhub://2019.2.1f1/ca4d5af0be6f)

[2019.2.0f1/20c1667945cf](unityhub://2019.2.0f1/20c1667945cf)

### Unity 2019.1

- 2019.1.1xf1

[2019.1.14f1/148b5891095a](unityhub://2019.1.14f1/148b5891095a)
[2019.1.13f1/b5956c0a61e7](unityhub://2019.1.13f1/b5956c0a61e7)
[2019.1.12f1/f04f5427219e](unityhub://2019.1.12f1/f04f5427219e)
[2019.1.11f1/9b001d489a54](unityhub://2019.1.11f1/9b001d489a54)
[2019.1.10f1/f007ed779b7a](unityhub://2019.1.10f1/f007ed779b7a)

- 2019.1.xf1

[2019.1.9f1/d5f1b37da199](unityhub://2019.1.9f1/d5f1b37da199)
[2019.1.8f1/7938dd008a75](unityhub://2019.1.8f1/7938dd008a75)
[2019.1.7f1/f3c4928e5742](unityhub://2019.1.7f1/f3c4928e5742)
[2019.1.6f1/f2970305fe1c](unityhub://2019.1.6f1/f2970305fe1c)
[2019.1.5f1/0ca0f5646614](unityhub://2019.1.5f1/0ca0f5646614)
[2019.1.4f1/ffa3a7a2dd7d](unityhub://2019.1.4f1/ffa3a7a2dd7d)
[2019.1.3f1/dc414eb9ed43](unityhub://2019.1.3f1/dc414eb9ed43)
[2019.1.2f1/3e18427e571f](unityhub://2019.1.2f1/3e18427e571f)
[2019.1.1f1/fef62e97e63b](unityhub://2019.1.1f1/fef62e97e63b)
[2019.1.0f2/292b93d75a2c](unityhub://2019.1.0f2/292b93d75a2c)

### Unity 2018.4(LTS)

- 2018.4.32f1

[2018.4.32f1/fba45da84107](unityhub://2018.4.32f1/fba45da84107)

[2018.4.31f1/212ea663d844](unityhub://2018.4.31f1/212ea663d844)

[2018.4.30f1/c698a062d8e6](unityhub://2018.4.30f1/c698a062d8e6)

[2018.4.29f1/50cce2edf27f](unityhub://2018.4.29f1/50cce2edf27f)

[2018.4.28f1/a2d4f71491a4](unityhub://2018.4.28f1/a2d4f71491a4)

[2018.4.27f1/4e283b7d3f88](unityhub://2018.4.27f1/4e283b7d3f88)

[2018.4.26f1/a7ac1c6396db](unityhub://2018.4.26f1/a7ac1c6396db)

[2018.4.25f1/b07bfa0a8827](unityhub://2018.4.25f1/b07bfa0a8827)

[2018.4.24f1/3071911a89e9](unityhub://2018.4.24f1/3071911a89e9)

[2018.4.23f1/c9cf1a90e812](unityhub://2018.4.23f1/c9cf1a90e812)

[2018.4.22f1/3362ffbb7aa1](unityhub://2018.4.22f1/3362ffbb7aa1)

[2018.4.21f1/fd3915227633](unityhub://2018.4.21f1/fd3915227633)

[2018.4.20f1/008688490035](unityhub://2018.4.20f1/008688490035)

- 2018.4.1xf1

[2018.4.19f1/459f70f82ea4](unityhub://2018.4.19f1/459f70f82ea4)

[2018.4.18f1/61fce66342ad](unityhub://2018.4.18f1/61fce66342ad)

[2018.4.17f1/b830f56f42f0](unityhub://2018.4.17f1/b830f56f42f0)

[2018.4.16f1/e6e9ca02b32a](unityhub://2018.4.16f1/e6e9ca02b32a)

[2018.4.15f1/13f5a1bf9ca1](unityhub://2018.4.15f1/13f5a1bf9ca1)

[2018.4.14f1/05119b33d0b7](unityhub://2018.4.14f1/05119b33d0b7)

[2018.4.13f1/497f083a43af](unityhub://2018.4.13f1/497f083a43af)

[2018.4.12f1/59ddc4c59b4f](unityhub://2018.4.12f1/59ddc4c59b4f)

[2018.4.11f1/7098af2f11ea](unityhub://2018.4.11f1/7098af2f11ea)

[2018.4.10f1/a0470569e97b](unityhub://2018.4.10f1/a0470569e97b)

[2018.4.9f1/ca372476eaba](unityhub://2018.4.9f1/ca372476eaba)

[2018.4.8f1/9bc9d983d803](unityhub://2018.4.8f1/9bc9d983d803)

[2018.4.7f1/b9a993fd1334](unityhub://2018.4.7f1/b9a993fd1334)

[2018.4.6f1/cde1bbcc9f0d](unityhub://2018.4.6f1/cde1bbcc9f0d)

[2018.4.5f1/7b38f8ac282e](unityhub://2018.4.5f1/7b38f8ac282e)

[2018.4.4f1/5440768ff61c](unityhub://2018.4.4f1/5440768ff61c)

[2018.4.3f1/8a9509a5aff9](unityhub://2018.4.3f1/8a9509a5aff9)

[2018.4.2f1/d6fb3630ea75](unityhub://2018.4.2f1/d6fb3630ea75)

[2018.4.1f1/b7c424a951c0](unityhub://2018.4.1f1/b7c424a951c0)

[2018.4.0f1/b6ffa8986c8d](unityhub://2018.4.0f1/b6ffa8986c8d)

### Unity 2018.3

- 2018.3.1xf1

[2018.3.14f1/d0e9f15437b1](unityhub://2018.3.14f1/d0e9f15437b1)

[2018.3.13f1/06548a9e9582](unityhub://2018.3.13f1/06548a9e9582)

[2018.3.12f1/8afd630d1f5b](unityhub://2018.3.12f1/8afd630d1f5b)

[2018.3.11f1/5063218e4ab8](unityhub://2018.3.11f1/5063218e4ab8)

[2018.3.10f1/f88de2c96e63](unityhub://2018.3.10f1/f88de2c96e63)

[2018.3.9f1/947e1ea5aa8d](unityhub://2018.3.9f1/947e1ea5aa8d)

[2018.3.8f1/fc0fe30d6d91](unityhub://2018.3.8f1/fc0fe30d6d91)

[2018.3.7f1/9e14d22a41bb](unityhub://2018.3.7f1/9e14d22a41bb)

[2018.3.6f1/a220877bc173](unityhub://2018.3.6f1/a220877bc173)

[2018.3.5f1/76b3e37670a4](unityhub://2018.3.5f1/76b3e37670a4)

[2018.3.4f1/1d952368ca3a](unityhub://2018.3.4f1/1d952368ca3a)

[2018.3.3f1/393bae82dbb8](unityhub://2018.3.3f1/393bae82dbb8)

[2018.3.2f1/b3c100a4b73a](unityhub://2018.3.2f1/b3c100a4b73a)

[2018.3.1f1/bb579dc42f1d](unityhub://2018.3.1f1/bb579dc42f1d)

[2018.3.0f2/6e9a27477296](unityhub://2018.3.0f2/6e9a27477296)

### Unity 2018.2

- 2018.2.2xf1

[2018.2.21f1/a122f5dc316d](unityhub://2018.2.21f1/a122f5dc316d)

[2018.2.20f1/cef3e6c0c622](unityhub://2018.2.20f1/cef3e6c0c622)

- 2018.2.1xf1

[2018.2.19f1/06990f28ba00](unityhub://2018.2.19f1/06990f28ba00)

[2018.2.18f1/4550892b6062](unityhub://2018.2.18f1/4550892b6062)

[2018.2.17f1/88933597c842](unityhub://2018.2.17f1/88933597c842)

[2018.2.16f1/39a4ac3d51f6](unityhub://2018.2.16f1/39a4ac3d51f6)

[2018.2.15f1/65e0713a5949](unityhub://2018.2.15f1/65e0713a5949)

[2018.2.14f1/3262fb3b0716](unityhub://2018.2.14f1/3262fb3b0716)

[2018.2.13f1/83fbdcd35118](unityhub://2018.2.13f1/83fbdcd35118)

[2018.2.12f1/0a46ddfcfad4](unityhub://2018.2.12f1/0a46ddfcfad4)

[2018.2.11f1/38bd7dec5000](unityhub://2018.2.11f1/38bd7dec5000)

[2018.2.10f1/674aa5a67ed5](unityhub://2018.2.10f1/674aa5a67ed5)

- 2018.2.xf1

[2018.2.9f1/2207421190e9](unityhub://2018.2.9f1/2207421190e9)

[2018.2.8f1/ae1180820377](unityhub://2018.2.8f1/ae1180820377)

[2018.2.7f1/4ebd28dd9664](unityhub://2018.2.7f1/4ebd28dd9664)

[2018.2.6f1/c591d9a97a0b](unityhub://2018.2.6f1/c591d9a97a0b)

[2018.2.5f1/3071d1717b71](unityhub://2018.2.5f1/3071d1717b71)

[2018.2.4f1/cb262d9ddeaf](unityhub://2018.2.4f1/cb262d9ddeaf)

[2018.2.3f1/1431a7d2ced7](unityhub://2018.2.3f1/1431a7d2ced7)

[2018.2.2f1/c18cef34cbcd](unityhub://2018.2.2f1/c18cef34cbcd)

[2018.2.1f1/1a9968d9f99c](unityhub://2018.2.1f1/1a9968d9f99c)

[2018.2.0f2/787658998520](unityhub://2018.2.0f2/787658998520)

### Unity 2018.1

- 2018.1.xf2

[2018.1.9f2/a6cc294b73ee](unityhub://2018.1.9f2/a6cc294b73ee)

[2018.1.8f1/26051d4de9e9](unityhub://2018.1.8f1/26051d4de9e9)

[2018.1.7f1/4cb482063d12](unityhub://2018.1.7f1/4cb482063d12)

[2018.1.6f1/57cc34175ccf](unityhub://2018.1.6f1/57cc34175ccf)

[2018.1.5f1/732dbf75922d](unityhub://2018.1.5f1/732dbf75922d)

[2018.1.4f1/1a308f4ebef1](unityhub://2018.1.4f1/1a308f4ebef1)

[2018.1.3f1/a53ad04f7c7f](unityhub://2018.1.3f1/a53ad04f7c7f)

[2018.1.2f1/a46d718d282d](unityhub://2018.1.2f1/a46d718d282d)

[2018.1.1f1/b8cbb5de9840](unityhub://2018.1.1f1/b8cbb5de9840)

[2018.1.0f2/d4d99f31acba](unityhub://2018.1.0f2/d4d99f31acba)

### Unity 2017.4(LTS)

- 2017.4.4xf1

[2017.4.40f1/6e14067f8a9a](unityhub://2017.4.40f1/6e14067f8a9a)

- 2017.4.3xf1

[2017.4.39f1/947131c5be7e](unityhub://2017.4.39f1/947131c5be7e)

[2017.4.38f1/82ac2fb100ce](unityhub://2017.4.38f1/82ac2fb100ce)

[2017.4.37f1/78b69503ebc4](unityhub://2017.4.37f1/78b69503ebc4)

[2017.4.36f1/c663def8414c](unityhub://2017.4.36f1/c663def8414c)

[2017.4.35f1/e57a7bcbbf0b](unityhub://2017.4.35f1/e57a7bcbbf0b)

[2017.4.34f1/121f18246307](unityhub://2017.4.34f1/121f18246307)

[2017.4.33f1/a8557a619e24](unityhub://2017.4.33f1/a8557a619e24)

[2017.4.32f1/4da3ed968770](unityhub://2017.4.32f1/4da3ed968770)

[2017.4.31f1/9c8dbc3421cb](unityhub://2017.4.31f1/9c8dbc3421cb)

[2017.4.30f1/c6fa43736cae](unityhub://2017.4.30f1/c6fa43736cae)

- 2017.4.2xf1

[2017.4.29f1/06508aa14ca1](unityhub://2017.4.29f1/06508aa14ca1)

[2017.4.28f1/e3a0f7dd2097](unityhub://2017.4.28f1/e3a0f7dd2097)

[2017.4.27f1/0c4b856e4c6e](unityhub://2017.4.27f1/0c4b856e4c6e)

[2017.4.26f1/3b349d10f010](unityhub://2017.4.26f1/3b349d10f010)

[2017.4.25f1/9cba1c3a94f1](unityhub://2017.4.25f1/9cba1c3a94f1)

[2017.4.24f1/786769fc3439](unityhub://2017.4.24f1/786769fc3439)

[2017.4.23f1/f80c8a98b1b5](unityhub://2017.4.23f1/f80c8a98b1b5)

[2017.4.22f1/eb4bc6fa7f1d](unityhub://2017.4.22f1/eb4bc6fa7f1d)

[2017.4.21f1/de35fe252486](unityhub://2017.4.21f1/de35fe252486)

[2017.4.20f2/413dbd19b6dc](unityhub://2017.4.20f2/413dbd19b6dc)

- 2017.4.1xf1

[2017.4.19f1/47cd37c28be8](unityhub://2017.4.19f1/47cd37c28be8)

[2017.4.18f1/a9236f402e28](unityhub://2017.4.18f1/a9236f402e28)

[2017.4.17f1/05307cddbb71](unityhub://2017.4.17f1/05307cddbb71)

[2017.4.16f1/7f7bdd1ef02b](unityhub://2017.4.16f1/7f7bdd1ef02b)

[2017.4.15f1/5d485b4897a7](unityhub://2017.4.15f1/5d485b4897a7)

[2017.4.14f1/b28150134d55](unityhub://2017.4.14f1/b28150134d55)

[2017.4.13f1/6902ad48015d](unityhub://2017.4.13f1/6902ad48015d)

[2017.4.12f1/b582b87345b1](unityhub://2017.4.12f1/b582b87345b1)

[2017.4.11f1/8c6b8ef6d111](unityhub://2017.4.11f1/8c6b8ef6d111)

[2017.4.10f1/f2cce2a5991f](unityhub://2017.4.10f1/f2cce2a5991f)

- 2017.4.10f1

[2017.4.9f1/6d84dfc57ccf](unityhub://2017.4.9f1/6d84dfc57ccf)

[2017.4.8f1/5ab7f4878ef1](unityhub://2017.4.8f1/5ab7f4878ef1)

[2017.4.7f1/de9eb5ca33c5](unityhub://2017.4.7f1/de9eb5ca33c5)

[2017.4.6f1/c24f30193bac](unityhub://2017.4.6f1/c24f30193bac)

[2017.4.5f1/89d1db9cb682](unityhub://2017.4.5f1/89d1db9cb682)

[2017.4.4f1/645c9050ba4d](unityhub://2017.4.4f1/645c9050ba4d)

[2017.4.3f1/21ae32b5a9cb](unityhub://2017.4.3f1/21ae32b5a9cb)

[2017.4.2f2/52d9cb89b362](unityhub://2017.4.2f2/52d9cb89b362)

[2017.4.1f1/9231f953d9d3](unityhub://2017.4.1f1/9231f953d9d3)

### Unity 2017.3

[2017.3.1f1/fc1d3344e6ea](unityhub://2017.3.1f1/fc1d3344e6ea)

[2017.3.0f3/a9f86dcd79df](unityhub://2017.3.0f3/a9f86dcd79df)

### Unity 2017.2

[2017.2.5f1/588dc79c95ed](unityhub://2017.2.5f1/588dc79c95ed)

[2017.2.4f1/f1557d1f61fd](unityhub://2017.2.4f1/f1557d1f61fd)

[2017.2.3f1/372229934efd](unityhub://2017.2.3f1/372229934efd)

[2017.2.2f1/1f4e0f9b6a50](unityhub://2017.2.2f1/1f4e0f9b6a50)

[2017.2.1f1/94bf3f9e6b5e](unityhub://2017.2.1f1/94bf3f9e6b5e)

[2017.2.0f3/46dda1414e51](unityhub://2017.2.0f3/46dda1414e51)

### Unity 2017.1

[2017.1.5f1/9758a36cfaa6](unityhub://2017.1.5f1/9758a36cfaa6)

[2017.1.4f1/9fd71167a288](unityhub://2017.1.4f1/9fd71167a288)

[2017.1.3f1/574eeb502d14](unityhub://2017.1.3f1/574eeb502d14)

[2017.1.2f1/cc85bf6a8a04](unityhub://2017.1.2f1/cc85bf6a8a04)

[2017.1.1f1/5d30cf096e79](unityhub://2017.1.1f1/5d30cf096e79)

[2017.1.0f3/472613c02cf7](unityhub://2017.1.0f3/472613c02cf7)

### Unity 5

[5.6.7f1/e80cc3114ac1](unityhub://5.6.7f1/e80cc3114ac1)

[5.6.6f2/6bac21139588](unityhub://5.6.6f2/6bac21139588)

[5.6.5f1/2cac56bf7bb6](unityhub://5.6.5f1/2cac56bf7bb6)

[5.6.4f1/ac7086b8d112](unityhub://5.6.4f1/ac7086b8d112)

[5.6.3f1/d3101c3b8468](unityhub://5.6.3f1/d3101c3b8468)

[5.6.2f1/a2913c821e27](unityhub://5.6.2f1/a2913c821e27)

[5.6.1f1/2860b30f0b54](unityhub://5.6.1f1/2860b30f0b54)

[5.6.0f3/497a0f351392](unityhub://5.6.0f3/497a0f351392)

> Unity5.6以下版本不支持从Unity Hub中部署，故无法提供链接

## 引用

文章引用了大部分文章并总结,原文地址如下:

[如何逃离Unity中国特供版](https://www.logiconsole.com/fuck-unity-cn)

[Unity中国想钱想疯了](https://zhuanlan.zhihu.com/p/226163910)

[如何取得Unity Hub内旧版本Unity下载链接](https://zhuanlan.zhihu.com/p/106132063)

## 示例图片

### Windows显示文件扩展名的示例

![](asset/Unity-CN-to-International/image-1.png)
