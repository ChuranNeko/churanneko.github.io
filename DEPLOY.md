# 部署说明

## 本地开发

### 使用 Docker Compose
```bash
# 开发环境
docker-compose up

# 生产环境
docker-compose -f docker-compose.simple.yaml up
```

### 直接使用 Node.js
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

## GitHub Pages 部署

1. 确保仓库已启用 GitHub Pages
2. 设置 Pages 源为 GitHub Actions
3. 推送代码到 main 分支即可自动部署

## 环境变量

- `NODE_ENV`: 环境模式 (development/production)

## 端口

- 开发环境: 4000
- 生产环境: 80
