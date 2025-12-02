---
title: AMap-Weather-MCP
published: 2025-12-03
description: 基于高德地图API的MCP天气服务器
tags: [Tags, Python, MCP, Weather]
category: Python
image: "background.png"
lg: zh_CH
---

# AMap-Weather-MCP: 基于高德地图API的MCP天气服务器
## 项目初衷

在开发 AI 应用时，我发现获取准确的天气信息是一个常见需求。虽然有许多天气 API 可用，但它们往往需要复杂的配置和认证流程，而且大多数都没有针对 MCP（Model Context Protocol）生态系统进行优化。

AMap Weather MCP 的诞生是为了解决这些问题：
- **简化集成**：提供开箱即用的 MCP 服务器，无需复杂的配置
- **高精度数据**：利用高德地图的权威天气数据，提供准确的天气信息
- **MCP 原生支持**：完全符合 MCP 协议规范，与 MCP Router 等工具无缝集成
- **灵活配置**：支持多种天气查询方式，包括实时天气、预报和空气质量
- **易于部署**：提供简单的安装和配置流程，支持多种部署方式

这个项目旨在为 MCP 生态系统提供一个可靠、易用的天气数据源，让开发者能够轻松地在 AI 应用中集成天气功能，无论是构建智能助手、自动化系统还是其他需要天气信息的应用。


## 简介

AMap Weather MCP 是一个基于高德地图 API 的 MCP（Model Context Protocol）服务器，提供实时天气查询和城市代码搜索功能。通过 MCP 协议，可以让 AI 助手获取准确的天气信息。

:::tip
需要高德地图 API 密钥才能使用，支持中国所有城市的天气查询
:::

## 功能特性

- 🌤️ **实时天气查询** - 支持按城市名称或城市代码查询天气信息
- 📍 **城市搜索** - 支持精确匹配和模糊搜索中国所有城市
- 📊 **4日天气预报** - 获取详细的天气预报数据
- 🔄 **多种查询方式**：
  - 按城市名称查询（如：杭州市、北京市）
  - 按行政代码（adcode）查询
  - 列出所有可用城市
  - 按 adcode 获取城市信息

## 系统需求

- Python 3.8+
- 高德地图 API 密钥（[申请教程](https://amap.apifox.cn/doc-7445538)）

## 安装

### 1. 克隆或下载项目

```bash
git clone https://github.com/ChuranNeko/amap-weather-mcp.git
cd amap-weather-mcp
```

### 2. 安装依赖

使用 `uv` 包管理器（推荐）：

```bash
uv sync
```

或使用 pip：

```bash
pip install -r requirements.txt
```

## 配置

### 环境变量

需要配置以下环境变量：

| 环境变量 | 说明 | 必需 |
|---------|------|------|
| `AMAP_API_KEY` | 高德地图 API 密钥 | ✅ 必需 |

### 使用 Claude Desktop 集成

将以下配置添加到 Claude Desktop 的 `claude_desktop_config.json`：

```json
{
    "mcpServers": {
        "amap-weather-mcp": {
            "name": "amap-weather-mcp",
            "type": "stdio",
            "isActive": true,
            "command": "uv",
            "args": [
                "--directory",
                "/path/to/amap-weather-mcp",
                "run",
                "main.py"
            ],
            "env": {
                "AMAP_API_KEY": "your-api-key-here"
            }
        }
    }
}
```

## 使用方式

### 可用工具

#### 1. `get_weather_by_city_name`
按城市名称获取天气信息

**参数：**
- `city_name` (string): 城市名称，如 "杭州市"、"北京市"

**返回：** 实时天气和 4 天预报数据

#### 2. `get_weather_by_city_code`
按城市行政代码获取天气信息

**参数：**
- `city_code` (string): 城市行政代码，如 "110100"（北京市朝阳区）

**返回：** 实时天气和 4 天预报数据

#### 3. `search_city`
搜索城市（支持精确和模糊匹配）

**参数：**
- `city_name` (string): 要搜索的城市名称

**返回：** 匹配的城市列表及其代码

#### 4. `get_city_by_adcode`
按 adcode 获取城市信息

**参数：**
- `adcode` (string): 行政代码，如 "110000"（北京市）

**返回：** 城市信息对象

#### 5. `list_all_cities`
列出所有可用城市

**参数：**
- `limit` (integer): 返回结果数量限制，默认 50，最大 200

**返回：** 城市列表，包括总数量

## 项目结构

```
amap-weather-mcp/
├── main.py                 # 主程序文件
├── city_codes.json        # 城市代码数据库
├── requirements.txt       # 项目依赖
├── .gitignore            # Git 忽略规则
└── README.md             # 本文件
```

## 依赖包

- `httpx` - 异步 HTTP 客户端
- `requests` - HTTP 库
- `mcp` - Model Context Protocol 实现

## 开发说明

### 项目特点

- 使用 Python `asyncio` 实现异步操作
- 集成 MCP 标准，支持与 Claude AI 无缝集成
- 高效的城市代码索引，支持快速查询
- 完善的错误处理和日志记录

### 日志

程序使用 Python 的 `logging` 模块记录信息，日志级别为 INFO。

## 使用示例

### 查询天气

```python
# 通过城市名称查询
result = await get_weather_by_city_name("杭州市")

# 通过城市代码查询
result = await get_weather_by_city_code("330100")
```

### 搜索城市

```python
# 搜索包含"杭州"的城市
cities = await search_city("杭州")
```

## 常见问题

**Q: 如何获取高德地图 API 密钥？**
A: 访问 [高德开放平台](https://lbs.amap.com/) 注册账号并创建应用获取 API Key。

**Q: 支持哪些城市？**
A: 支持中国所有地级市和县级市，数据包含在 `city_codes.json` 文件中。

**Q: 天气数据多久更新一次？**
A: 高德地图天气数据通常每小时更新一次，具体频率以高德地图为准。

## 许可证

MIT License

## 支持

如有问题或建议，欢迎提交 Issue 或 Pull Request。

:::github{repo="ChuranNeko/amap-weather-mcp"}