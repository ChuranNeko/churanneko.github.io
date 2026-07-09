---
title: OpenWrt 安装网易 UU 加速器插件：完整安装与配置指南
published: 2026-07-10
description: 在 OpenWrt 路由器上安装网易 UU 加速器插件的完整教程，包括官方安装脚本和第三方 APK 包两种方式，以及防火墙配置、常见问题排查。
tags: [OpenWrt, UU加速器, 游戏加速, 路由器]
category: 网络
lang: zh_CN
---

# OpenWrt 安装网易 UU 加速器插件：完整安装与配置指南

## 目录

:::tip
可直接点击文字跳转至对应章节
:::

- [什么是 UU 加速器路由器插件](#什么是-uu-加速器路由器插件)
- [支持的系统和架构](#支持的系统和架构)
- [安装方法](#安装方法)
  - [方法一：官方安装脚本（推荐）](#方法一官方安装脚本推荐)
  - [方法二：第三方 APK 包](#方法二第三方-apk-包)
- [防火墙配置](#防火墙配置)
- [绑定与使用](#绑定与使用)
- [常见问题排查](#常见问题排查)
- [总结](#总结)

---

## 什么是 UU 加速器路由器插件

网易 UU 加速器提供了 OpenWrt 路由器插件，可以让连接到路由器的所有设备享受游戏加速服务，无需在每台设备上单独安装客户端。

**适用场景**：
- 主机游戏（PS5、Xbox、Switch）加速
- 多设备同时加速
- 不方便安装客户端的设备

**工作原理**：
- 插件运行在路由器上，通过 VPN 隧道加速网络流量
- 使用手机 APP 远程控制路由器上的加速服务
- 支持按设备、按游戏精细化控制

---

## 支持的系统和架构

### 系统版本支持

✅ **支持**：OpenWrt 19.x ~ 最新版本  
⚠️ **OpenWrt 22.03 及以上**：需要额外安装 `iptables-nft` 兼容层

### 架构支持

官方目前支持以下架构：

| 架构 | 说明 | 常见设备 |
|------|------|----------|
| `aarch64` | ARM 64位 | 树莓派 4、大部分现代 ARM 路由器 |
| `arm` | ARM 32位 | 较老的 ARM 路由器 |
| `mipsel` | MIPS 小端 | 大部分联发科路由器 |
| `x86_64` | x86 64位 | 软路由、虚拟机 |

**如何查看架构**：
```bash
grep '^DISTRIB_ARCH' /etc/openwrt_release
```

---

## 安装方法

### 方法一：官方安装脚本（推荐）

这是网易官方提供的安装方式，自动识别架构并下载对应版本。

#### 1. SSH 连接路由器

**查看路由器 IP**：
- Windows：`Win + R` → 输入 `cmd` → 输入 `ipconfig`
- macOS/Linux：终端输入 `ip route | grep default` 或 `ifconfig`
- 路由器 IP 通常是 `192.168.1.1` 或 `192.168.3.1`

**SSH 连接**（将 IP 替换为你的路由器 IP）：
```bash
ssh root@192.168.1.1
```

输入路由器密码后进入命令行。

#### 2. 下载安装脚本

```bash
cd /tmp
wget https://uurouter.gdl.netease.com/uuplugin-script/openwrt/install/v2/install.sh
```

#### 3. 运行安装脚本

**大部分架构（自动识别）**：
```bash
/bin/sh install.sh openwrt $(uname -m)
```

**MIPS 大端架构**（如果上面命令安装失败且 SN 为空）：
```bash
/bin/sh install.sh openwrt mipseb
```

安装成功后会显示设备 SN 码：
```
sn=94:83:c4:cc:ad:7c
```

**保存这个 SN 码**，后面绑定时需要用到。

#### 4. 检查 TUN 模块

**查看是否已安装 kmod-tun**：
```bash
opkg list-installed kmod-tun
```

**如果没有输出，需要安装**：
```bash
opkg update
opkg install kmod-tun
```

**验证 TUN 设备**：
```bash
ls /dev/net/tun
```

如果显示文件存在（如 `crw------- 1 root root ...`），说明 TUN 模块正常。

#### 5. 启动服务

```bash
/etc/init.d/uuplugin enable    # 开机自启
/etc/init.d/uuplugin start     # 立即启动
```

**检查服务状态**：
```bash
ps w | grep uuplugin | grep -v grep
```

如果看到类似以下输出，说明运行正常：
```
9230 root      5304 S    /tmp/uu/uuplugin /tmp/uu/uu.conf
```

---

### 方法二：第三方 APK 包

这是社区维护的安装包，适用于 OpenWrt 25.12 及以后版本。

#### OpenWrt 25.12+ (APK 包管理器)

```bash
cd /tmp
pkg_name=uuplugin-latest-$(grep '^DISTRIB_ARCH' /etc/openwrt_release | awk -F "'" '{print $2}').apk
wget "https://github.com/ttc0419/uuplugin/releases/download/latest/$pkg_name"
apk add --allow-untrusted $pkg_name || echo "不支持你的路由器架构！"
```

#### OpenWrt 25.12 之前 (OPKG 包管理器)

```bash
cd /tmp
pkg_name=uuplugin_latest-1_$(grep '^DISTRIB_ARCH' /etc/openwrt_release | awk -F "'" '{print $2}').ipk
wget "https://github.com/ttc0419/uuplugin/releases/download/latest/$pkg_name"
opkg install $pkg_name || echo "不支持你的路由器架构！"
```

**项目地址**：[ttc0419/uuplugin](https://github.com/ttc0419/uuplugin)

---

## 防火墙配置

⚠️ **重要**：OpenWrt 高版本（22.03+）需要调整防火墙规则才能正常加速。

### 通过 LuCI 网页配置

1. 打开浏览器，访问路由器管理后台（如 `http://192.168.1.1`）
2. 进入 **网络** → **防火墙**
3. 将以下三项都改为 **接受 (accept)**：
   - 入站数据
   - 出站数据
   - 转发
4. 点击 **保存并应用**

### 通过命令行配置

```bash
uci set firewall.@defaults[0].input='ACCEPT'
uci set firewall.@defaults[0].output='ACCEPT'
uci set firewall.@defaults[0].forward='ACCEPT'
uci commit firewall
/etc/init.d/firewall restart
```

---

## 绑定与使用

### 1. 下载 UU 加速器 APP

- **iOS**：App Store 搜索 "网易UU加速器"
- **Android**：应用商店搜索 "网易UU加速器"

### 2. 在 APP 中绑定路由器

1. 打开 UU 加速器 APP
2. 点击底部 **路由器加速** 标签
3. 点击 **添加路由器** 或 **绑定设备**
4. 输入之前保存的 **设备 SN 码**（如 `94:83:c4:cc:ad:7c`）
5. 绑定成功后，即可在 APP 中控制路由器加速

### 3. 使用加速

- **选择游戏**：在 APP 中选择要加速的游戏
- **选择设备**：可以为特定设备开启加速
- **开启加速**：点击启动，路由器会自动建立加速通道

---

## 常见问题排查

### 1. 安装后无法启动

**检查服务状态**：
```bash
/etc/init.d/uuplugin status
ps w | grep uuplugin | grep -v grep
```

**查看日志**：
```bash
logread | grep -i uu
```

**常见原因**：
- TUN 模块未安装或未加载
- 防火墙规则阻止
- 架构不匹配

### 2. 提示 "Create or open pid file failed"

这通常说明服务已经在运行，检查进程：
```bash
ps w | grep uuplugin | grep -v grep
cat /var/run/uuplugin.pid
```

如果确实没有运行，删除 PID 文件后重启：
```bash
rm -f /var/run/uuplugin.pid
/etc/init.d/uuplugin start
```

### 3. 找不到 SN 码或 SN 为空

**重新运行安装脚本**：
```bash
/bin/sh install.sh openwrt $(uname -m)
```

**手动查看 MAC 地址**（SN 通常是 MAC 地址）：
```bash
ifconfig | grep HWaddr
ip link show
```

### 4. 加速不生效

**检查项**：

1. **防火墙规则**：确保已设置为 ACCEPT
   ```bash
   uci show firewall.@defaults[0]
   ```

2. **路由表**：查看是否有加速路由
   ```bash
   ip route
   ```

3. **TUN 设备**：确认虚拟网卡已创建
   ```bash
   ifconfig | grep tun
   ```

4. **APP 绑定**：确保设备已在 APP 中绑定并开启加速

### 5. 升级 OpenWrt 后插件失效

OpenWrt 升级通常会清空 `/tmp` 目录，需要重新安装：
```bash
cd /tmp
wget https://uurouter.gdl.netease.com/uuplugin-script/openwrt/install/v2/install.sh
/bin/sh install.sh openwrt $(uname -m)
/etc/init.d/uuplugin enable
/etc/init.d/uuplugin start
```

---

## 总结

### 快速安装流程

```bash
# 1. 下载并运行安装脚本
cd /tmp
wget https://uurouter.gdl.netease.com/uuplugin-script/openwrt/install/v2/install.sh
/bin/sh install.sh openwrt $(uname -m)

# 2. 安装 TUN 模块（如果需要）
opkg update
opkg install kmod-tun

# 3. 启动服务
/etc/init.d/uuplugin enable
/etc/init.d/uuplugin start

# 4. 配置防火墙（命令行方式）
uci set firewall.@defaults[0].input='ACCEPT'
uci set firewall.@defaults[0].output='ACCEPT'
uci set firewall.@defaults[0].forward='ACCEPT'
uci commit firewall
/etc/init.d/firewall restart
```

### 关键要点

- ✅ **支持版本**：OpenWrt 19.x ~ 最新版本
- ✅ **需要模块**：`kmod-tun` 必须安装
- ✅ **防火墙**：高版本需要设置为 ACCEPT
- ✅ **绑定方式**：使用手机 APP 扫描 SN 码绑定
- ✅ **适用场景**：主机游戏加速、多设备同时加速

### 参考资源

- [网易 UU 加速器官方教程](https://router.uu.163.com)
- [第三方安装包项目](https://github.com/ttc0419/uuplugin)
- [OpenWrt 官方文档](https://openwrt.org/docs/start)

---

如果遇到其他问题，可以：
- 查看 OpenWrt 系统日志：`logread`
- 检查插件运行日志：`logread | grep -i uu`
- 访问 UU 加速器官方支持页面获取帮助
