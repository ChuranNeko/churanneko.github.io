---
title: Quick_Napcat_Docker_Compose
published: 2025-11-27
description: 使用Docker Compose快速部署NapCat
tags: [Tags, Docker]
category: Docker
image: "background.png"
lg: zh_CH
---

# 使用Docker Compose快速部署NapCat

## 文章目录

- [简介](#简介)
- [什么是NapCat?](#什么是NapCat)
- [开始](#开始)
  - [安装Docker](#安装Docker)
  - [下载NapCat Docker Compose文件](#下载NapCat-Docker-Compose文件)
  - [启动服务](#启动服务)
  - [查看日志](#查看日志)
  - [停止服务](#停止服务)
  - [重启服务](#重启服务)
- [对接](#对接)
- [附加说明](#附加说明)
- [免责声明](#免责声明)
- [数据](#数据)
- [引用](#引用)

## 简介

该文档介绍了如何使用Docker Compose快速部署NapCat。

:::tip
该文章只针对于Linux系统
:::

## 什么是NapCat?

基于 TypeScript 构建的 Bot 框架，通过相应的启动器或者框架，主动调用 QQ Node 模块提供给客户端的接口，实现 Bot 的功能。

## 开始

## 安装Docker

运行以下命令安装Docker(如果已经安装Docker可以跳过此步骤)：

```bash
bash <(curl -sSL https://linuxmirrors.cn/docker.sh)
```

随后根据脚本提示完成Docker的安装。

### 下载NapCat Docker Compose文件

你可以使用以下命令将 `docker-compose.yml` 文件下载到你的项目目录中：

```bash
cd /path/to/your/project
curl -o docker-compose.yml https://raw.githubusercontent.com/ChuranNeko/NapCat-Docker-Template/main/docker-compose.yml
```

或者使用Github代理：

```bash
cd /path/to/your/project
curl -sSL-o docker-compose.yml https://gh-proxy.org/https://raw.githubusercontent.com/ChuranNeko/NapCat-Docker-Template/main/docker-compose.yml
```

> 此处的 `/path/to/your/project` 需要替换为你希望存放 `docker-compose.yml` 文件的实际路径。

- `docker-compose.yml` 只部署NapCat服务，如果你需要其他服务，请替换为相应的模板文件名称。

该项目已经提供了NapCat单服务、AstrBot+Napcat、等多种模板文件，您可以根据需要选择合适的模板文件进行下载。

### 启动服务

只需要在包含该仓库下载的 `docker-compose.yml` 文件的目录下运行以下命令即可启动 NapCat 服务：

```bash
docker compose up -d
```

### 查看日志

你可以使用以下命令查看 NapCat 服务的日志以获取Token登录WebUI：

```bash
docker compose logs napcat
```

### 停止服务

你可以使用以下命令停止 NapCat 服务：

```bash
docker compose down
```

### 重启服务

你可以使用以下命令重启 NapCat 服务：

```bash
docker compose restart napcat
```

## 对接

:::tip
NapCat 支持多种对接方式，您可以参考官方文档进行配置：
:::

- [NapCat 对接文档](https://napneko.github.io/use/integration)

## 附加说明

:::tip
该[仓库](https://github.com/ChuranNeko/NapCat-Docker-Template)已经提供了NapCat单服务、AstrBot+Napcat、多种模板文件，您可以根据需要选择合适的模板文件进行下载。
:::

::github{repo="ChuranNeko/NapCat-Docker-Template"}

## 免责声明

:::warning
为了确保 NapCat 服务的安全性,此处已经将 `调试端口` 只允许本地访问,如果你需要部署到外网调试您的NapCat，
请手动移除 `docker-compose.yml` 文件中 `napcat` 服务的 `post` 中的 `127.0.0.1`移除，
如果手动移除后遭到任何安全问题,本仓库及作者概不负责。
:::

## 数据

:::tip
该仓库的模板文件均存储在 `./data/*` 目录下， `*`为对接框架的名称，您可以根据需要进行修改和定制。
`./data/napcat` 目录存储NapCat服务的数据。
`./data/qq` 目录存储QQ账号的数据。
:::
