# FRP 中启用 TLS 加密

## 方案说明

本文档采用 **frpc 单向校验 frps 身份** 的方案：
- frpc（客户端）需要额外加载 ca 证书
- frps（服务端）需要额外指定 TLS 配置
- frpc 通过 ca 证书单向验证 frps 的身份

这要求 frps 的 server.crt 对 frpc 的 ca 是合法的。

## 证书配置步骤

### 1. 创建目录

确保命令正确，且先创建所需目录：

```bash
sudo mkdir -p /etc/frp
```

### 2. 生成 CA 证书和密钥

```bash
sudo openssl genrsa -out /etc/frp/ca.key 2048
sudo openssl req -x509 -new -nodes -key /etc/frp/ca.key -subj "/CN=example.ca.com" -days 5000 -out /etc/frp/ca.crt
```

### 3. 生成带 SAN 的服务端证书

创建 SAN 配置文件：

```bash
cat > san.cnf << EOF
[req]
distinguished_name = req_distinguished_name
req_extensions = v3_req
prompt = no

[req_distinguished_name]
CN = 108.160.133.182

[v3_req]
subjectAltName = @alt_names

[alt_names]
IP.1 = 108.160.133.182
DNS.1 = scenefrog.com  # 可选，如果需要支持域名
EOF
```

生成私钥和 CSR：

```bash
sudo openssl genrsa -out /etc/frp/server.key 2048
sudo openssl req -new -key /etc/frp/server.key -config san.cnf -out /etc/frp/server.csr
```

使用 CA 签发服务端证书：

```bash
sudo openssl x509 -req -in /etc/frp/server.csr -CA /etc/frp/ca.crt -CAkey /etc/frp/ca.key -CAcreateserial -out /etc/frp/server.crt -days 365 -extfile san.cnf -extensions v3_req
```

### 4. 验证证书

检查生成的 server.crt 是否包含 SAN：

```bash
openssl x509 -in /etc/frp/server.crt -text -noout
```

输出中应看到类似以下内容：
```
Subject: CN = 108.160.133.182
X509v3 extensions:
    X509v3 Subject Alternative Name:
        IP Address:108.160.133.182, DNS:scenefrog.com
```

### 5. 设置文件权限

确保证书文件权限正确：

```bash
sudo chmod 600 /etc/frp/ca.key /etc/frp/server.key
sudo chmod 644 /etc/frp/ca.crt /etc/frp/server.crt
```

## 证书有效期说明

- CA 证书（ca.crt）有效期：5000 天（约 13.7 年）
- 服务端证书（server.crt）有效期：365 天（1 年）

## FRP 配置

### frpc（客户端）配置

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

### frps（服务端）配置

```toml
bindPort = 8800
vhostHTTPPort = 8088

# 认证配置（可选，建议启用以提高安全性）
auth.method = "token"
auth.token = "your-secret-token888"

# 设置frp默认页面
custom404Page = "/var/frp/404.html"

# 限制直接使用frp的8088端口直接访问（因为配置了caddy,可以直接80端口访问）
proxyBindAddr = "127.0.0.1"

# frpc 单向校验 frps 身份
transport.tls.certFile = "/etc/frp/server.crt"
transport.tls.keyFile = "/etc/frp/server.key"