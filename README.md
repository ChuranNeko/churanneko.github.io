# ChuranNeko's Blog

基于 Hexo 和安知鱼主题的个人博客，支持 Docker 部署和 GitHub Pages 自动部署。

## 特性

- 🎨 使用安知鱼主题，界面美观
- 🐳 支持 Docker 容器化部署
- 🚀 GitHub Pages 自动部署
- 📱 响应式设计，支持移动端
- 🌙 支持深色模式
- 🔍 内置搜索功能

## 快速开始

### 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm hexo server

# 生成静态文件
pnpm hexo generate

# 部署到 GitHub Pages
pnpm hexo deploy
```

### Docker 部署

```bash
# 开发环境
docker-compose up

# 生产环境
docker-compose -f docker-compose.simple.yaml up
```

## 项目结构

```
blog/
├── _config.yml              # Hexo 主配置文件
├── _config.anzhiyu.yml      # 安知鱼主题配置文件
├── docker-compose.yaml      # Docker Compose 配置
├── Dockerfile               # Docker 镜像配置
├── .github/workflows/       # GitHub Actions 工作流
├── source/                  # 博客源文件
├── themes/anzhiyu/          # 安知鱼主题
└── public/                  # 生成的静态文件
```

## 部署说明

### GitHub Pages

1. 确保仓库已启用 GitHub Pages
2. 设置 Pages 源为 GitHub Actions
3. 推送代码到 main 分支即可自动部署

访问地址：https://churanneko.github.io

### 自定义配置

编辑 `_config.anzhiyu.yml` 文件来自定义主题配置，包括：

- 个人信息
- 社交链接
- 主题颜色
- 功能开关

## 技术栈

- [Hexo](https://hexo.io/) - 静态博客框架
- [安知鱼主题](https://docs.anheyu.com/) - 美观的主题
- [Docker](https://www.docker.com/) - 容器化部署
- [GitHub Actions](https://github.com/features/actions) - 自动部署

## 许可证

MIT License
