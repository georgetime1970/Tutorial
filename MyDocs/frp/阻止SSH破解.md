# 防止SSH暴力破解方案

## 1. 配置SSH日志

### 安装并启用rsyslog服务
```bash
sudo apt update
sudo apt install rsyslog
sudo systemctl start rsyslog
sudo systemctl enable rsyslog
```

### 修改SSH配置
编辑 `/etc/ssh/sshd_config`：
```bash
sudo nano /etc/ssh/sshd_config
```
确保包含以下配置：
```
SyslogFacility AUTH
LogLevel INFO
```

### 重启服务
```bash
sudo systemctl restart sshd
sudo systemctl restart rsyslog
```

### 之后检查 /var/log/auth.log 是否生成：

```bash
ls -lh /var/log/auth.log
```

### 日志分析方法
#### 查看SSH日志文件，包括成功和失败的登录尝试。

```bash
sudo cat /var/log/auth.log | grep "sshd"
```

#### 筛选暴力破解尝试
```bash
sudo cat /var/log/auth.log | grep "sshd" | grep "Failed password"
```

#### 实时监控登录尝试
```bash
sudo tail -f /var/log/auth.log | grep "sshd"
```

#### 统计攻击者IP，查看哪些 IP 尝试次数最多：
```bash
sudo cat /var/log/auth.log | grep "Failed password" | awk '{print $11}' | sort | uniq -c | sort -nr
```

## 2. 防止 SSH 暴力破解，安装配置Fail2ban

### 安装步骤
```bash
sudo apt update
sudo apt install fail2ban
```

### 编辑配置文件
创建 `/etc/fail2ban/jail.local`：
```bash
sudo nano /etc/fail2ban/jail.local
```
添加内容：
```ini
[sshd]
enabled = true
backend = auto
logpath = /var/log/auth.log
maxretry = 5      # 允许失败次数
bantime = 86400    # 封禁时间（秒）
findtime = 600     # 检测时间窗口（秒）
```

### 服务管理
#### 启动Fail2ban服务
```bash
sudo systemctl start fail2ban
sudo systemctl enable fail2ban
```
#### 查看状态
```bash
sudo fail2ban-client status sshd
```

## 3. 修改SSH端口

### 编辑配置文件
```bash
sudo nano /etc/ssh/sshd_config
```
修改为：
```
Port 2222
```

### 重启SSH服务
```bash
sudo systemctl restart sshd
```

### 连接时指定新端口：
```bash
ssh -p 2222 root@服务器IP
```

