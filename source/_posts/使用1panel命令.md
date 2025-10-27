# 1Panel 命令行工具可用命令

```bash
1pctl status         # 查看 1Panel 服务运行状态  
1pctl start          # 启动 1Panel 服务  
1pctl stop           # 停止 1Panel 服务  
1pctl restart        # 重启 1Panel 服务  
1pctl uninstall      # 卸载 1Panel 服务  
1pctl user-info      # 获取 1Panel 用户信息  
1pctl listen-ip      # 切换 1Panel 监听 IP  
1pctl version        # 查看 1Panel 版本信息  
1pctl update         # 修改 1Panel 系统信息  
1pctl reset          # 重置 1Panel 系统信息  
1pctl restore        # 恢复 1Panel 服务及数据
````

---

## 1pctl reset 的子命令

```bash
1pctl reset domain      # 取消 1Panel 访问域名绑定  
1pctl reset entrance    # 取消 1Panel 安全入口  
1pctl reset https       # 取消 1Panel HTTPS 方式登录  
1pctl reset ips         # 取消 1Panel 授权 IP 限制  
1pctl reset mfa         # 取消 1Panel 两步验证
```

---

## 1pctl listen-ip 的子命令

设置监听 IPv4 地址：

```bash
1pctl listen-ip ipv4
```

设置监听 IPv6 地址：

```bash
1pctl listen-ip ipv6
```

---

## 1pctl update 命令行工具用法

```bash
1pctl update [COMMAND] [ARGS...]
1pctl update --help
```

### 可用命令

| 命令名      | 说明     | 参数示例                            |
| -------- | ------ | ------------------------------- |
| username | 修改面板用户 | `1pctl update username newuser` |
| password | 修改面板密码 | `1pctl update password newpassword` |
| port     | 修改面板端口 | `1pctl update port 8080`        |

---

## 1panel app 命令行工具用法

```bash
1panel app [COMMAND] [ARGS...]
1panel app --help
```

---

### 可用命令 

| 命令名     | 说明     | 参数示例                            |
| ------- | ------ | ------------------------------- |
| init    | 初始化应用  | `1panel app init`               |
| start   | 启动应用   | `1panel app start <app_name>`   |
| stop    | 停止应用   | `1panel app stop <app_name>`    |
| restart | 重启应用   | `1panel app restart <app_name>` |
| status  | 查看应用状态 | `1panel app status <app_name>`  |

---

如果需要查看详细用法和参数，可执行以下命令：

```bash
1pctl update --help
1panel app --help
```
