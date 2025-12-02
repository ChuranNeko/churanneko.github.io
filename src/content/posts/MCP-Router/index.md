---
title: MCP-Router
published: 2025-12-03
description: 一个模型上下文协议（MCP）路由/代理系统
tags: [Tags, Python, MCP]
category: Python
image: "background.png"
lg: zh_CH
---

# MCP-Router: 模型上下文协议路由系统
## 项目初衷

在使用多个 MCP（Model Context Protocol）服务器时，我发现了一个常见问题：当不同的 MCP 服务器提供同名工具时，LLM 无法有效区分它们，导致工具调用混乱。此外，管理多个 MCP 服务器的配置和连接也变得复杂。

MCP Router 的诞生就是为了解决这些问题：
- **工具命名冲突**：通过实例名称前缀区分同名工具
- **配置管理复杂性**：提供统一的配置管理和热加载
- **连接管理**：支持多种传输协议，适应不同使用场景
- **动态扩展**：允许运行时添加、删除和管理 MCP 实例

这个项目旨在为 MCP 生态系统提供一个强大而灵活的路由层，让开发者能够更轻松地构建复杂的 AI 应用。


## 简介

MCP Router 是一个模型上下文协议（MCP）路由/代理系统，作为MCP服务端和客户端，支持动态管理MCP工具配置，解决LLM无法区分同名工具的问题。

:::tip
适用于需要管理多个MCP服务器的场景，支持多种传输协议
:::

## 特性

- **动态路由**: 文件系统路由，使用 `mcp_settings.json` 配置
- **快速启动**: 后台加载客户端，启动时间<0.1秒
- **热加载**: 自动检测配置变化并重新加载
- **多传输支持**: Stdio、SSE、HTTP 传输协议
- **实时日志**: WebSocket实时日志流（可选）
- **权限控制**: 可配置的LLM实例管理权限
- **智能端口**: 端口占用时自动查找可用端口
- **安全认证**: Bearer Token认证，输入验证
- **REST API**: 完整的HTTP API用于配置管理

## 安装

### 从 PyPI 安装（推荐）

```bash
pip install mcp-router
```

### 从源码安装

```bash
# 使用 uv (推荐)
uv venv .venv
uv pip install -e ".[dev]"

# 或使用 pip
python -m venv .venv
.venv\Scripts\activate  # Windows
source .venv/bin/activate  # Linux/Mac
pip install -e ".[dev]"
```

## 配置

编辑 `config.json` 文件：

```json
{
  "api": {
    "enabled": false,
    "port": 8001,
    "host": "0.0.0.0"
  },
  "server": {
    "host": "0.0.0.0",
    "http": { "enabled": true, "port": 3000 },
    "sse": { "enabled": true, "port": 3001 }
  },
  "security": {
    "bearer_token": "",
    "enable_validation": true
  },
  "logging": {
    "level": "INFO",
    "directory": "logs"
  }
}
```

## 添加MCP配置

在 `data/{provider}/mcp_settings.json` 中添加MCP服务器配置：

```json
{
  "provider": "example",
  "isActive": true,
  "name": "example_instance",
  "type": "stdio",
  "command": "python",
  "args": ["-m", "example_mcp"],
  "env": {}
}
```

## 运行

```bash
# 直接指定传输模式
python main.py              # Stdio模式（默认）
python main.py stdio        # Stdio模式
python main.py http         # HTTP模式
python main.py sse          # SSE模式
python main.py api          # API服务器模式

# 查看帮助
python main.py help
```

## MCP 工具

MCP Router 提供以下工具给 LLM 使用：

**基础工具** (总是可用):
- `mcp.router.list()` - 列出所有已注册的MCP客户端实例
- `mcp.router.help()` - 返回所有实例的工具列表和使用说明
- `mcp.router.use(instance_name)` - 使用指定的MCP实例
- `mcp.router.call(instance_name, tool_name, **kwargs)` - 调用指定实例的指定工具

**管理工具** (需启用 `allow_instance_management`):
- `mcp.router.add(provider_name, config)` - 动态添加新的MCP配置
- `mcp.router.remove(instance_name)` - 移除MCP配置
- `mcp.router.enable(instance_name)` - 启用MCP实例
- `mcp.router.disable(instance_name)` - 禁用MCP实例

## 与 LLM 集成

### Stdio 模式（推荐）

适用于单个LLM客户端（如Claude Desktop、Cursor）。

**客户端配置示例** (mcp.json):
```json
{
  "mcpServers": {
    "mcp_router": {
      "command": "uv",
      "args": [
        "--directory",
        "C:/path/to/mcp_router",
        "run",
        "python",
        "main.py"
      ],
      "transport": "stdio"
    }
  }
}
```

### HTTP 模式

适用于多客户端并发连接（端口 3000）。

**客户端配置示例** (mcp.json):
```json
{
  "mcpServers": {
    "mcp_router_http": {
      "url": "http://localhost:3000/mcp",
      "transport": "streamableHttp"
    }
  }
}
```

### SSE 模式

适用于实时推送场景（端口 3001）。

**客户端配置示例** (mcp.json):
```json
{
  "mcpServers": {
    "mcp_router_sse": {
      "url": "http://localhost:3001/sse",
      "transport": "sse"
    }
  }
}
```

## REST API 端点

当 API 模式启用时，可通过以下端点管理 MCP Router：

**实例管理**:
- `GET /api/instances` - 列出所有实例
- `GET /api/instances/{name}` - 获取实例详情
- `POST /api/instances` - 添加新实例
- `PATCH /api/instances/{name}` - 更新实例配置
- `DELETE /api/instances/{name}` - 删除实例
- `POST /api/instances/{name}/enable` - 启用实例
- `POST /api/instances/{name}/disable` - 禁用实例

**工具管理**:
- `GET /api/tools` - 列出所有工具
- `GET /api/tools/{instance_name}` - 获取实例的工具列表
- `POST /api/call` - 调用工具

## 项目结构

```
mcp_router/
├── main.py                 # 项目入口
├── config.json            # 全局配置文件
├── requirements.txt       # 依赖文件
├── pyproject.toml         # uv项目配置
│
├── src/
│   ├── core/              # 核心模块
│   │   ├── logger.py      # 日志系统
│   │   ├── config.py      # 配置管理器
│   │   └── exceptions.py  # 自定义异常
│   │
│   ├── mcp/               # MCP模块
│   │   ├── client.py      # MCP客户端管理
│   │   ├── server.py      # MCP服务端
│   │   ├── router.py      # 路由核心逻辑
│   │   └── transport.py   # 传输层
│   │
│   ├── api/               # API模块
│   │   ├── app.py         # FastAPI应用
│   │   └── routes.py      # API路由处理
│   │
│   └── utils/             # 工具模块
│       ├── validator.py   # 输入验证
│       ├── watcher.py     # 文件监视器
│       └── security.py    # 安全工具
│
├── data/                  # MCP配置目录
│   ├── example/
│   │   └── mcp_settings.json
│   └── ...
│
└── test/                  # 测试文件
    ├── test_router.py
    ├── test_api.py
    └── test_security.py
```

## 开发

### 代码风格

本项目使用 [Ruff](https://github.com/astral-sh/ruff) 进行代码格式化和 linting：

```bash
# 格式化代码
ruff format .

# 检查代码
ruff check .

# 自动修复
ruff check --fix .
```

### 运行测试

```bash
# 运行所有测试
pytest

# 运行特定测试
pytest test/test_router.py

# 带覆盖率
pytest --cov=src --cov-report=html
```

## 安全性

- **输入验证**: 防止SQL注入、XSS攻击、路径遍历
- **Bearer Token**: 可选的API认证
- **CORS配置**: 灵活的跨域请求控制
- **文件大小限制**: 防止DOS攻击
- **HTTP安全头**: X-Frame-Options, CSP, HSTS等

:::github{repo="ChuranNeko/mcp_router"}