---
title: 给 GL-MT3600BE 适配 OpenWrt：从设备树到开箱即用
published: 2026-07-10
description: 没有官方支持？那就自己动手。从其他发行版移植设备树，更新驱动，预装软件，打造开箱即用的 OpenWrt 固件。
tags: [OpenWrt, 路由器, 设备适配, GL-MT3600BE]
category: 嵌入式
lang: zh_CN
---

# 给 GL-MT3600BE 适配 OpenWrt：从设备树到开箱即用

## 目录

:::tip
可直接点击文字跳转至对应章节
:::

- [为什么要适配](#为什么要适配)
- [移植设备树](#移植设备树)
- [驱动更新](#驱动更新)
- [预装软件包](#预装软件包)
- [默认配置优化](#默认配置优化)
- [技术细节](#技术细节)
- [使用指南](#使用指南)
- [总结](#总结)

---

## 为什么要适配

GL-MT3600BE 是 GL.iNet 的一款 MT7987A 芯片路由器，硬件配置不错：双 2.5G 网口、Wi-Fi 6、USB 3.0。但问题在于：

**OpenWrt 官方 24.10 稳定版没有这个设备的支持。**

原厂固件虽然能用，但有几个问题让人不爽：

1. **内存占用高**：原厂固件预装了一堆软件
   - 原生 WebUI 和 LuCI 同时运行
   - nginx、一堆厂商服务、各种预装插件
   - 闲置状态下内存占用就不低

2. **功能冗余**：很多用不上的功能和服务在后台跑着

3. **可玩性不够**：想折腾的话，还是原生 OpenWrt 更自由

想刷 OpenWrt，要么等官方支持，要么自己动手。我选择了后者。

最初想适配 24.10 稳定版，但屡屡碰壁。后来发现 OpenWrt Snapshot（主线开发版）更新更快，驱动支持更好，干脆直接基于 Snapshot 做适配。

---

## 移植设备树

适配的第一步是设备树（Device Tree）。设备树描述了硬件的结构——有哪些接口、GPIO 怎么连的、哪个 LED 对应哪个引脚，等等。

**我从哪里找到设备树？**

x-wrt 已经有了 GL-MT3600BE 的设备树文件，作者是 Developer X。我直接拿过来，稍作修改，移植到 OpenWrt 主线。

**关键文件位置：**
```
target/linux/mediatek/dts/mt7987a-glinet-gl-mt3600be.dts
```

**主要修改：**

1. **USB 供电控制**
   - GL-MT3600BE 的 USB 口需要通过 GPIO 14 供电
   - 写了个启动脚本 `/etc/init.d/turn_on_usb_power`，开机时拉高 GPIO
   - 否则插 USB 设备没反应

2. **风扇曲线优化**
   - 原厂风扇曲线：0% / 25% / 50% / 75% / 100%
   - 我改成了：0% / 38% / 63% / 88% / 100%
   - 为什么？因为原厂曲线起步太慢，温度上来后风扇才开始转，散热不够及时。新曲线起步风量更大，过渡更平滑，既保证散热又控制噪音。

3. **LED 配置**
   - 蓝色 LED (GPIO 48)：系统状态指示
   - 白色 LED (GPIO 49)：启动指示
   - 绑定到系统事件，开机自动亮

4. **网络映射**
   - eth0 (gmac0) → WAN 口（2.5G）
   - eth1 (gmac1) → LAN 口（2.5G，内部）

---

## 驱动更新

设备树搞定之后，接下来是驱动。

**MT7987A 是联发科的新芯片**，主线的驱动支持还在完善中。Snapshot 版本的驱动更新比 24.10 快得多，这也是我选择 Snapshot 的原因之一。

**主要驱动：**
- **PHY 固件**：`mt7987-2p5g-phy-firmware`（2.5G 网口）
- **无线固件**：`kmod-mt7990-firmware`（Wi-Fi 6，MT7996 芯片）
- **风扇控制**：`kmod-hwmon-pwmfan`（PWM 调速）

这些驱动在 Snapshot 中都是最新版本（截至 2026-03-01），比 24.10 的版本新不少。

---

## 预装软件包

适配完硬件，接下来是软件。我的目标是做一个**开箱即用**的固件，不需要刷完之后再手动装一堆东西。

**预装了什么？**

### 1. LuCI Web 界面
- **Argon 主题 v2.4.3**：现代化美观主题，比默认主题好看太多
- **中文语言包**：base、package-manager、firewall 的中文翻译

### 2. OpenClash v0.47.055
- **完整源码**：放在 `/package/luci-app-openclash/`
- **Meta/Mihomo 内核 v1.19.27**：**预置在固件内**，刷完直接能用，不需要手动下载
- **控制面板**：`http://192.168.3.1:9090`
- **GeoIP/GeoSite 数据库**：由 jsDelivr CDN 自动更新

### 3. AdGuardHome
- 默认运行在 `http://192.168.3.1:3000`
- 提供 DNS 广告拦截功能
- 来自官方 packages feed

### 4. USB 网络共享支持
预装完整的 USB 共享网络驱动和工具：
- **协议支持**：RNDIS、ECM、NCM、MBIM、QMI
- **工具包**：umbim、uqmi、comgt、comgt-ncm、usb-modeswitch
- **效果**：插上 4G/5G USB 调制解调器，即插即用

**镜像定义文件：**
```
target/linux/mediatek/image/filogic.mk (第 2074-2094 行)
```

---

## 默认配置优化

软件装好了，但默认配置也很重要。我做了一些预设，让固件刷完就能直接用。

### 安全性增强
- **root 账户锁定**：首次启动后 root 无法登录
- **admin 用户**：用户名 `admin` / 密码 `admin`（uid=0，等效 root 权限）
- 如果需要 root，可以手动解锁：
  ```bash
  passwd -u root && passwd root
  ```

### 网络配置
- **LAN IP**：`192.168.3.1/24`
- **2.4G SSID**：`GL-MT3600BE-<MAC末4位>`
- **5G SSID**：`GL-MT3600BE-<MAC末4位>-5G`
- **Wi-Fi 密码**：`88888888`
- **访客网络**：预留 `192.168.4.1/24`（默认关闭，可手动启用）
- **wan2 接口**：预配置备用上行（metric=30），可绑定 USB 网卡

### 防火墙规则
WAN 侧预开放端口：
- OpenClash：`7874`, `7890-7893`, `7895`, `9090` (TCP)
- AdGuardHome：`3000` (TCP)

**配置文件位置：**
```
target/linux/mediatek/filogic/base-files/etc/uci-defaults/99-gl-mt3600be-defaults
```

---

## 技术细节

### 构建流程

```bash
git clone https://github.com/ChuranNeko/openwrt-custom-gl-mt3600be
cd openwrt-custom-gl-mt3600be
./scripts/feeds update -a
./scripts/feeds install -a
make defconfig
make -j$(nproc)
```

构建完成后，固件在 `bin/targets/mediatek/filogic/` 目录下：
```
openwrt-mediatek-filogic-glinet_gl-mt3600be-squashfs-sysupgrade.bin
```

### 配置种子文件
```
configs/mt3600be.seed
```
- 选择 mediatek/filogic 平台
- 指定 GL-MT3600BE 设备
- 禁用 Docker 相关组件（固件体积优化）

### CI/CD 系统
GitHub Actions 自动构建：
- `.github/workflows/01-check.yml`：代码检查
- `.github/workflows/02-build.yml`：自动构建
- `.github/workflows/03-release.yml`：发布固件

---

## 使用指南

### 安装固件

**方法 1：通过原厂 Web 界面刷入**
1. 登录原厂固件的管理界面
2. 找到固件升级选项
3. 上传 `.bin` 文件
4. 等待刷写完成，设备自动重启

**方法 2：通过 U-Boot 刷入**
1. 断电，按住 Reset 按钮
2. 上电，等待 LED 闪烁，松开 Reset
3. 浏览器访问 `http://192.168.1.1`
4. 上传固件文件

**方法 3：通过命令行刷入**
```bash
sysupgrade -n openwrt-*.bin
```

### 首次使用

1. 刷写完成后，设备重启
2. 浏览器访问 `http://192.168.3.1`
3. 用户名：`admin` / 密码：`admin`
4. 进入 OpenClash 配置订阅
5. 进入 AdGuardHome 完成初始化

### OpenClash 配置

1. 访问 `http://192.168.3.1:9090`（Meta 控制面板）
2. 或在 LuCI 界面进入 OpenClash 插件
3. 导入订阅链接
4. 等待规则和代理更新
5. 开始使用

---

## 与其他方案的区别

### vs 官方 OpenWrt
- ✅ 开箱即用，无需手动配置
- ✅ 预装 OpenClash + AdGuardHome
- ✅ 完整的中文界面
- ⚠️ 基于 Snapshot（滚动更新，非稳定版）

### vs x-wrt
- 参考了 x-wrt 的设备适配思路
- 设备树文件源自 x-wrt 开发者（Developer X）
- 但基于 OpenWrt 主线而非 x-wrt 分支

### vs 原厂固件
- **内存占用更低**：原厂固件预装了一堆软件（原生 WebUI + LuCI + nginx 等），内存占用高，定制版只保留必要组件
- **更干净**：去除冗余服务，系统更纯粹
- **更强的可定制性**：原生 OpenWrt，想装什么装什么
- **风扇控制更优化**：优化后的风扇曲线，散热与静音兼顾

---

## 已知限制

1. **不支持 iStore**
   - iStore 最高支持 OpenWrt 24.10
   - 本项目基于更新的 Snapshot 版本

2. **包管理兼容性**
   - 第三方插件若强依赖纯 opkg 元数据可能有问题
   - Snapshot 主要使用 apk 包管理器

3. **USB 设备枚举**
   - 需要足功率适配器
   - 注意线材质量

---

## 总结

这次适配从移植设备树开始，更新驱动，预装常用软件，优化默认配置，最终做出了一个开箱即用的 OpenWrt 固件。

**适配过程中学到的：**
- 设备树的结构和修改方法
- OpenWrt 的构建系统和镜像定义
- 如何预置软件包和配置
- USB 供电控制和风扇调速的实现

**这个固件适合谁？**
- 想刷 OpenWrt 但懒得配置的人
- 想用 OpenClash 但不想手动装的人
- 想折腾路由器但不想从零开始的人

**项目地址：**
https://github.com/ChuranNeko/openwrt-custom-gl-mt3600be

如果你也有 GL-MT3600BE，可以试试这个固件。有问题欢迎提 Issue。

---

分区这块先到这，谢谢阅读。

## 参考资料

- [OpenWrt 官方文档](https://openwrt.org/)
- [x-wrt 项目](https://x-wrt.com/)
- [OpenClash 项目](https://github.com/vernesong/OpenClash)
