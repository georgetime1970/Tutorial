# FRP配置指南

## 一、FRP服务端配置

### 1. 下载安装
```bash
cd /root
wget https://github.com/fatedier/frp/releases/latest/download/frp_0.61.1_linux_amd64.tar.gz
tar -xzf frp_0.61.1_linux_amd64.tar.gz
cd frp_0.61.1_linux_amd64
```

### 2. 编辑 frps.toml
在 `frp_0.61.1_linux_amd64/` 目录下，创建配置文件：
```bash
nano frps.toml
```

配置内容：
```toml
bindPort = 8800                # 7000为常用端口
vhostHTTPPort = 8088           # 用哪个端口访问服务端服务，不使用80端口，caddy要用

# 认证配置（可选，建议启用以提高安全性）
auth.method = "token"
auth.token = "your-secret-token888"

# 设置frp默认页面（都是绝对路径，权限可访问）
# custom404Page = "/var/frp/404.html"

# 限制直接使用frp的8088端口直接访问（因为配置了caddy,可以直接80端口访问）
proxyBindAddr = "127.0.0.1"  

# 启用TLS frpc 单向校验 frps 身份
transport.tls.certFile = "/etc/frp/server.crt"
transport.tls.keyFile = "/etc/frp/server.key"
```

### 3. 防火墙设置
```bash
# 检查端口防火墙状态
ufw status

# 开启8800端口
sudo ufw allow 8800/tcp

# 检查8800端口
sudo netstat -tulnp | grep :8800

# 关闭端口
ufw deny 8800/tcp

# 重载端口
sudo ufw reload
```

### 4. 创建 systemd 服务
让 frps 作为服务后台运行，实现自动启动和管理：

#### 创建服务文件
```bash
sudo nano /etc/systemd/system/frps.service
```

添加以下内容（注意路径需与实际位置匹配）：
```ini
[Unit]
Description=FRP Client
After=network.target

[Service]
Type=simple
User=root
ExecStart=/root/frp_0.61.1_linux_amd64/frps -c /root/frp_0.61.1_linux_amd64/frps.toml
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

保存并退出（`Ctrl + X`，然后按 `Y`，回车）。

#### 启用服务
```bash
# 重载 systemd 配置
sudo systemctl daemon-reload

# 启动 frps 并设置开机自启
sudo systemctl enable frps
sudo systemctl start frps

# 检查 frps 运行状态
sudo systemctl status frps
```

如果看到 `active (running)`，说明 frps 运行正常。

#### 管理命令
```bash
# 重启服务并检查状态
sudo systemctl restart frps
sudo systemctl status frps

# 备选：手动启动 frps
cd frp_0.61.1_linux_amd64
./frps -c frps.toml

# 检查进程
ps aux | grep frps

# 结束进程（替换PID）
kill -9 2317

# 查看监听端口
netstat -tulnp | grep frps
```

## 二、FRP客户端配置

### 1. 安装与配置
下载同版本客户端适配的文件，编辑 `frpc.toml`：

```toml
# 通用配置
serverAddr = "108.160.133.182"
serverPort = 8800             # 7000为常用端口
auth.token = "your-secret-token888"  # 设置验证

# 设置rpc 单向校验 frps 身份
transport.tls.trustedCaFile = "./ca.crt"

# HTTP 代理配置
[[proxies]]
name = "web-http"
type = "http"
localIP = "127.0.0.1"
localPort = 5000              # 本地服务访问端口
customDomains = ["scenefrog.com"]  # 指定访问域名
```

### 2. 一键启动脚本
Windows批处理脚本：
```batch
@echo off
chcp 65001 >nul
title FRP 自动重启
cd /d %~dp0
:loop
echo 启动 frpc...
frpc.exe -c frpc.toml
echo frpc 已退出，5 秒后重新启动...
timeout /t 5
goto loop
```

## 三、服务端配置Caddy，使用HTTPS访问

让 scenefrog.com 自动配置HTTPS，使用 Caddy 自动获取 Let's Encrypt 证书并作为反向代理：

### 1. 安装 Caddy
```bash
sudo apt install -y caddy
```

### 2. 配置 Caddyfile
端口必须和vhostHTTPPort一致，此配置在frp客户端未连接时也能显示网站备份内容，备份地址/var/www/html中的offline.html：

```bash
sudo nano /etc/caddy/Caddyfile
```

配置内容：
```
scenefrog.com {
    # 尝试连接到frp服务，如果连接失败则显示静态页面
    reverse_proxy localhost:8088 {
        # 使用transport指令设置超时
        transport http {
            dial_timeout 5s
        }
        
        # 当后端服务不可用时，显示静态页面
        @unavailable {
            status 404 502 503 504
        }
        handle_response @unavailable {
            root * /var/www/html
            rewrite * /offline.html
            file_server
        }
    }

    # 记录访问日志
    log {
        output file /var/log/caddy/scenefrog.com.access.log
    }
}
```

### 3. 管理Caddy
```bash
# 启动并检查状态
sudo systemctl restart caddy
sudo systemctl status caddy

# 查看证书有效期
sudo openssl x509 -in /var/lib/caddy/.local/share/caddy/certificates/acme-v02.api.letsencrypt.org-directory/scenefrog.com/scenefrog.com.crt -text -noout | grep "Not After"

# 手动续期（备用）
sudo caddy run --config /etc/caddy/Caddyfile
sudo systemctl restart caddy
```