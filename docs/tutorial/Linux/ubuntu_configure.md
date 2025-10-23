# Ubuntu24 系统安装和配置

## 说明

- 进行 ubntu 系统安装需要在 windows 环境下
- ubuntu 相比于 debian,在桌面环境下更加的简单易用,会避免很多的配置问题

## 下载镜像

[ubuntu 桌面版](https://ubuntu.com/download/desktop)

## 烧录镜像到 U 盘

[rufus 烧录工具](https://rufus.ie/zh/#download)

选好镜像文件,点击开始就可以了
烧录时间和 U 盘的速度有关,大概 30 分钟左右

## 安装系统

将 U 盘插入目标电脑,选择 U 盘启动,根据提示一步一步配置

## 系统配置

### 配置 clash-verge

- 登陆腾讯云对象存储下载 deb 版本文件和配置文件
- [clash-verge 版本仓库下载](https://github.com/clash-verge-rev/clash-verge-rev/releases)

### 配置 chrome

1. 使用 ubuntu 自带的浏览器搜索 `chrome下载`
   [chrome 官方下载地址](https://www.google.com/chrome/dr/download)
   登陆 google 账户

2. 命令行下载

   ```Bash
   wget -P ~/downloads https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
   sudo apt install ~/downloads/google-chrome-stable_current_amd64.deb
   ```

### GNOME Shell 集成扩展

#### chrome 安装浏 GNOME Shell 扩展

- [GNOME Shell 官网](https://extensions.gnome.org/): 使用 chrome 访问官网会自动提示安装浏览器扩展
- [GNOME Shell 集成 扩展地址](https://chromewebstore.google.com/detail/gnome-shell-integration/gphhapmejobijbbhgpjhcjognlahblep?pli=1)

#### 安装 GNOME Shell 连接器

- `sudo apt install gnome-brower-connector `

> 安装完成后，系统会多出一个叫**扩展**的应用，这个应用就是管理 GNOME Shell 扩展扩展的，从 GNOME Shell 官网上下载的扩展都会显示在这里
> GNOME Shell 官网上的扩展直接点击安装就可以，要注意是否兼容，是否能正常工作

## GNOME 插件推荐

- [Astra Monitor](https://extensions.gnome.org/extension/6682/astra-monitor/): Astra Monitor 是 GNOME 顶部栏的尖端、完全可定制且以性能为中心的系统监控扩展。对于那些寻求密切关注系统性能指标（如 CPU、GPU、RAM、磁盘使用情况、网络统计数据和传感器读数）的人来说，它是一款一体化解决方案。

- [Clipboard History](https://extensions.gnome.org/extension/4839/clipboard-history/): 剪贴板历史记录是一个剪贴板管理器 GNOME 扩展，可将您复制的项目保存到易于访问、可搜索的历史记录面板中。

## 软件推荐

- [VScode 下载地址](https://code.visualstudio.com/docs/setup/linux)

  - 下载后登陆 github 账号,同步配置
  - 配置 `git` - 安装`git`: `sudo install git` - 配置账户和邮箱:

    ```bash
    git config --global user.name "george"
    git config --global user.email "nihaokexiao@gmali.com"
    ```

- `glate`: 简单的划词翻译软件,快捷键 `ctrl alt space`
  - 应用商店直接搜索 `glate`, 直接安装即可
  - [仓库地址](https://github.com/keshavbhatt/glate)
