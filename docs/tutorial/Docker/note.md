# Docker 基础笔记

## docker 安装

官网安装教程: https://docs.docker.com/engine/install/

选择自己的系统进行安装

学会常用 `--help` 获取信息

## 常见命令

需要区分`镜像`和`容器`的概念
`镜像`: 一个模具,一个 docker 中不会有 2 个一模一样的镜像
`容器`: 使用镜像这个模具制作的东西,可以有很多功能一样的容器,但每个容器都有自己的属性

![命令总结](images/docker_1.png)

### 镜像命令

| 命令            | 说明                                    | 示例                                                                            |
| --------------- | --------------------------------------- | ------------------------------------------------------------------------------- |
| `docker search` | 搜索[镜像市场](https://hub.docker.com/) | `OFFICIAL`带`[OK]`的是官方镜像                                                  |
| `docker pull`   | 下载镜像                                | `docker pull nginx`: 默认下载最新版<br>`docker pull nginx:1.26.0`: 下载指定版本 |
| `docker images` | 已下载镜像列表                          | `docker images`或`docker image ls`                                              |
| `docker rmi`    | 删除镜像                                | `docker rmi -f  nginx`强制删除                                                  |

### 容器命令

| 命令             | 说明             | 示例                                                              |
| ---------------- | ---------------- | ----------------------------------------------------------------- |
| `docker run`     | 运行镜像         | `docker run  nginx` 如果没有这个镜像就会自动下载,而且会阻死控制台 |
| `docker ps`      | 正在运行的容器   | `docker ps -a` 运行和停止的容器                                   |
| `docker start`   | 启动容器         | 可以使用容器的名字`NAMES`或者 id`CONTAINER ID`(可以只写前 3 位)   |
| `docker stop`    | 停止容器         | 使用方法同上                                                      |
| `docker restart` | 重启容器         | 使用方法同上                                                      |
| `docker stats`   | 容器资源占用     | 可查看实时 cpu,内存,网络,IO,使用方法同上                          |
| `docker logs`    | 容器运行日志     | 使用方法同上                                                      |
| `docker exec`    | 进入容器文件系统 | 使用方法同上                                                      |
| `docker rm`      | 删除容器         | 先停止再删除,也可以`docker rm -f  58e`强制删除                    |

**重点**

`docke run -d --name mynginx -p 88:80 nginx`

- `-d`: 后台启动
- `--name mynginx`: 给容器取名为 mynginx
- `-p 88:80`: 端口映射,访问主机的 88 端口就是访问容器的 80 端口

`docker exec -it myynginx /bin/bash`

- `-it`: 交互模式
- `mynginx`: 使用容器名称进入容器的文件系统,也可以使用 id
- `/bin/bash`: 使用 bash 命令行,可以简写为 `bash`

> 修改 nginx 默认页面内容,可以进入`/usr/share/nginx/html`中修改`index.html`的内容<br>
> 容器内的系统非常轻量化,很多基本的命令都没有

### 保存镜像

| 命令            | 说明 |
| --------------- | ---- |
| `docker commit` | 提交 |
| `docker save`   | 保存 |
| `docker load`   | 加载 |

**`docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]`: 将容器制作成镜像**
| 参数 | 说明 |
| ---- | ------------------------------------------------------------------------- |
| `-a` | --author string 作者（例如，“John Hannibal Smith <hannibal@a-team.com>”） |
| `-c` `--change list` |将 Dockerfile 指令应用于创建的镜像 |
| `-m` `--message string` |提交消息 |
| `-p` `--pause` |在提交期间暂停容器（默认为 true） |

- 例如: `docker commit -m 'updata index.html' mynginx mynginx:v1.0`
  - `-m 'updata index.html'`: 提交的消息
  - `mynginx`: 容器名称,也可以使用 id
  - `mynginx:v1.0`: 想要做成的镜像名称

**`docker save [OPTIONS] IMAGE [IMAGE...]`: 将镜像打包为 tar 包**
| 参数 | 说明 |
|--|--|
| `-o`, `--output string` | 写入文件，而不是 STDOUT |
| `--platform string` | 仅保存给定的平台变体。格式为 “os[/arch[/variant]]” （例如，“linux/amd64”）|

- 例如: `docker save -o mynginx.tar mynginx:v1.0`
  - `-o mynginx.tar`: 保存为`mynginx.tar`文件
  - `mynginx:v1.0`: 需要被保存的镜像

**`docker load [OPTIONS]`: 加载 tar 镜像文件**
| 参数 | 说明 |
|--|--|
|`-i`, `--input string` | 从 tar 存档文件读取，而不是 STDIN|
|`--platform string` |仅加载给定的平台变体。格式为 “os[/arch[/variant]]” （例如，“linux/amd64”）|
| `-q`, `--quiet` |抑制负载输出|

- 例如: `docker load -i mynginx.tar`
  - `-i mynginx.tar`: 加载指定的 mynginx.tar 包

### 分享社区

官网:https://www.docker.com/

| 命令           | 说明 | 用法                                           |
| -------------- | ---- | ---------------------------------------------- |
| `docker login` | 登录 | `docker login -u <username>`                   |
| `docker tag`   | 命名 | `docker tag 原镜像名 目标镜像名`(记得加版本号) |
| `docker push`  | 推送 | `docker push [OPTIONS] NAME[:TAG]`             |
