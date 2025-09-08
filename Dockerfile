# 使用 Node.js 官方镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install

# 复制源代码
COPY . .

# 生成静态文件
RUN pnpm hexo generate

# 暴露端口
EXPOSE 4000

# 启动命令
CMD ["pnpm", "hexo", "server", "-p", "4000"]
