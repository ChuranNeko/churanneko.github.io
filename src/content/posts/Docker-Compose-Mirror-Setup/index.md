---
title: Docker-Compose-Mirror-Setup
published: 2025-12-26
description: 配置 Docker Compose镜像源
tags: [Tags, Docker]
category: Docker
image: "background.png"
lang: zh_CN
---

# 配置Docker Compose源

:::tip
可直接点击文字跳转至对应章节
:::

## 目录

- [简介](#简介)
- [安装 Docker](#安装-docker)
  - [使用 LinuxMirror 脚本安装](#使用-linuxmirror-脚本安装)
  - [使用官方脚本安装](#使用官方脚本安装)
  - [指定镜像源安装](#指定镜像源安装)
- [配置 Docker](#配置-docker)
  - [使用脚本修改](#使用脚本修改)
  - [自行修改](#自行修改)
    - [编辑配置文件](#编辑配置文件)
    - [文件示例](#文件示例)
    - [重载服务](#重载服务)
- [Docker 镜像源列表](#docker-镜像源列表)

## 简介

在国内，由于部分运营商可能对国外网站或镜像源进行 `SNI` 拦截 或 `DNS` 污染，直接访问官方 `Docker` 镜像源可能会较慢甚至失败。因此，建议使用 `国内加速源` 来拉取 `Docker` 安装包和镜像，从而提升下载速度和稳定性。

## 安装 Docker

### 使用 LinuxMirror 脚本安装

使用 `LinuxMirror` 提供的脚本进行安装(推荐)

```bash
bash <(curl -sSL https://linuxmirrors.cn/docker.sh)
```

### 使用官方脚本安装

或者使用 `Docker Hub` 官方提供的脚本进行安装

```bash
bash <(curl -fsSL https://get.docker.com)
```

### 指定镜像源安装

再或者使用 `Docker Hub` 官方提供的脚本进行安装 再指定镜像源(--mirror 后的参数为镜像源)

```bash
bash <(curl -fsSL https://get.docker.com) --mirror Aliyun
```

:::tip
如已经安装，只需要修改 Docker 部分请跳转至 [配置docker](#配置-docker)
:::

## 配置 Docker

一般针对于小白,我比较推荐直接使用 `Docker Compose` 来完成部署项目，因为部署只需要写好 `docker-compose.yaml` 文件，随后在 `docker-compose.yaml` 的同级目录运行 `docker compose up -d` 即可完成部署。

好了，我们开始配置 `Docker Registry` 源的配置。

### 使用脚本修改

上方我们有提到使用安装脚本,那么这里也可以使用直接脚本来完成修改。

```bash
bash <(curl -sSL https://linuxmirrors.cn/docker.sh)
```

### 自行修改

自行修改 `Docker` 源,这也是一种备选方式,也是我个人比较推荐的方式。

#### 编辑配置文件

```bash
# 可选备份
cp /etc/docker/daemon.json /etc/docker/daemon.json.bak

# 使用nano 编辑器(推荐)
nano /etc/docker/daemon.json

# 或使用vim编辑器
vim /etc/docker/daemon.json
```

:::tip
如果没有安装 `nano` 编辑器，请自行使用 `apt` 安装。

如果显示没有权限修改，请在命令前加上 `sudo` ，打比方：`sudo nano' /etc/...` 。

`Vim` 退出时需要按下 `ESC` 后,输入 `:wq` 命令后回车来进行写入并退出。
:::

#### 文件示例

这里给个示例,且使用的 `毫秒镜像` 源。你可以直接复制并它。

```json
{
  "registry-mirrors": ["https://docker.1ms.run"]
}
```

#### 重载服务

:::warning
注意重载 'Docker' 服务时,所有的 'Docker' 容器及服务会重启。
:::

修改 daemon.json 后需要重载服务，才能让新配置生效。

重载服务

```bash
systemctl daemon-reexec
systemctl restart docker
```

> 如果无法执行此命令 请在命令前添加 `sudo` 。

## Docker镜像源列表

这里是 `Docker Registry` 列表

```text
# 毫秒镜像
http://docker.1ms.run

# DockerProxy
http://dockerproxy.net

# DaoCloud                  
http://docker.m.daocloud.io

# 阿里云
http://registry.cn-hangzhou.aliyuncs.com     # 阿里云-杭州
http://registry.cn-shanghai.aliyuncs.com    # 阿里云-上海
http://registry.cn-qingdao.aliyuncs.com    # 阿里云-青岛
http://registry.cn-beijing.aliyuncs.com     # 阿里云-北京
http://registry.cn-zhangjiakou.aliyuncs.com # 阿里云-张家口
http://registry.cn-huhehaote.aliyuncs.com   # 阿里云-呼和浩特
http://registry.cn-wulanchabu.aliyuncs.com  # 阿里云-乌兰察布
http://registry.cn-shenzhen.aliyuncs.com   # 阿里云-深圳
http://registry.cn-heyuan.aliyuncs.com      # 阿里云-河源
http://registry.cn-guangzhou.aliyuncs.com   # 阿里云-广州
http://registry.cn-chengdu.aliyuncs.com    # 阿里云-成都
http://registry.cn-hongkong.aliyuncs.com    # 阿里云-香港
http://registry.ap-northeast-1.aliyuncs.com  # 阿里云-日本
http://registry.ap-southeast-1.aliyuncs.com # 阿里云-新加坡
http://registry.ap-southeast-3.aliyuncs.com # 阿里云-马来西亚
http://registry.ap-southeast-5.aliyuncs.com # 阿里云-印尼
http://registry.eu-central-1.aliyuncs.com   # 阿里云-德国
http://registry.eu-west-1.aliyuncs.com      # 阿里云-英国
http://registry.us-west-1.aliyuncs.com      # 阿里云-美国西部
http://registry.us-east-1.aliyuncs.com       # 阿里云-美国东部
http://registry.me-east-1.aliyuncs.com      # 阿里云-中东

# 腾讯云镜像
http://mirror.ccs.tencentyun.com

# Google 镜像
https://gcr.io
https://asia.gcr.io
https://eu.gcr.io

# Docker Hub 官方镜像
https://registry.hub.docker.com
```
