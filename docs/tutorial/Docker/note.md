# Docker 基础笔记

## docker 安装

官网安装教程: https://docs.docker.com/engine/install/

选择自己的系统进行安装

学会常用 `--help` 获取信息

## 常见命令

需要区分`镜像`和`容器`的概念
`镜像`: 一个模具,一个 docker 中不会有 2 个一模一样的镜像
`容器`: 使用镜像这个模具制作的东西,可以有很多功能一样的容器,但每个容器都有自己的属性

![命令总结](/images/docker_1.png)

<!-- <img src="/images/docker_1.png" style="zoom:80%;border:1px solid black;border-radius:10px" /> -->

### 镜像命令

| 命令            | 说明                                    | 示例                                                                            |
| --------------- | --------------------------------------- | ------------------------------------------------------------------------------- |
| `docker search` | 搜索[镜像市场](https://hub.docker.com/) | `OFFICIAL`带`[OK]`的是官方镜像                                                  |
| `docker pull`   | 下载镜像                                | `docker pull nginx`: 默认下载最新版<br>`docker pull nginx:1.26.0`: 下载指定版本 |
| `docker images` | 已下载镜像列表                          | `docker images`或`docker image ls`                                              |
| `docker rmi`    | 删除镜像                                | `docker rmi -f  nginx`强制删除                                                  |

### 容器命令

| 命令             | 说明             | 示例                                                                                                   |
| ---------------- | ---------------- | ------------------------------------------------------------------------------------------------------ |
| `docker run`     | 使用镜像启动容器 | `docker run  nginx` 如果没有这个镜像就会自动下载,而且会阻死控制台                                      |
| `docker ps`      | 正在运行的容器   | `docker ps -a` 运行和停止的容器                                                                        |
| `docker start`   | 启动容器         | 可以使用容器的名字`NAMES`或者 id`CONTAINER ID`(可以只写前 3 位)                                        |
| `docker stop`    | 停止容器         | 使用方法同上                                                                                           |
| `docker restart` | 重启容器         | 使用方法同上                                                                                           |
| `docker stats`   | 容器资源占用     | 可查看实时 cpu,内存,网络,IO,使用方法同上                                                               |
| `docker logs`    | 容器运行日志     | 使用方法同上                                                                                           |
| `docker exec`    | 进入容器文件系统 | 使用方法同上                                                                                           |
| `docker rm`      | 删除容器         | 先停止再删除,也可以`docker rm -f  58e`强制删除<br>删除所有状态的容器: `docker rm -f $(docker ps -aq)`` |

**重点**

`docke run -d -p 88:80 --name mynginx nginx`

- `-d`: 后台启动
- `-p 88:80`: 端口映射,访问主机的 88 端口就是访问容器的 80 端口
- `--name mynginx`: 给容器取名为 mynginx

`docker exec -it mynginx /bin/bash`

- `-it`: 交互模式
- `mynginx`: 使用容器名称进入容器的文件系统,也可以使用 id
- `/bin/bash`: 使用 bash 命令行,可以简写为 `bash`

> 修改 nginx 默认页面内容,可以进入`/usr/share/nginx/html`中修改`index.html`的内容.<br>
> 容器内的系统非常轻量化,很多基本的命令都没有

### 保存镜像

| 命令            | 说明                  |
| --------------- | --------------------- |
| `docker commit` | 提交,将容器制作成镜像 |
| `docker save`   | 保存,将镜像打包为文件 |
| `docker load`   | 加载,加载镜像文件     |

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

**`docker save [OPTIONS] IMAGE [IMAGE...]`: 将镜像打包为文件**
| 参数 | 说明 |
|--|--|
| `-o`, `--output string` | 写入文件，而不是 STDOUT |
| `--platform string` | 仅保存给定的平台变体。格式为 “os[/arch[/variant]]” （例如，“linux/amd64”）|

- 例如: `docker save -o mynginx.tar mynginx:v1.0`
  - `-o mynginx.tar`: 保存为`mynginx.tar`文件
  - `mynginx:v1.0`: 需要被保存的镜像

**`docker load [OPTIONS]`: 加载镜像文件**
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

## 存储

容器运行时有自己的文件系统和环境,在容器里面修改或增加文件并不方便,而且一旦销毁容器,里面的数据也会消失,所以需要将主机的文件和容器的文件进行一种关联,操作主机的文件也就能操作容器的文件

### 目录挂载

`-v ~/app/nghtml:/usr/share/nginx/html`

- 完整用法: `docke run -d -p 88:80 -v ~/app/nghtml:/usr/share/nginx/html --name mynginx nginx`
- 在启动时,增加挂载参数,使主机的`~/app/nghtml`和`/usr/share/nginx/html`形成关联,修改任何一个都会使另一个同步改变
- 如果主机没有`~/app/nghtml`文件夹会自动创建,并且容器中的`/usr/share/nginx/html`文件夹也是空的
- 不适用于需要默认配置启动的容器,因为挂载会清除所有原的数据,以空文件夹开始

### 卷映射

`-v ngconf:/etc/nginx`

- 完整用法: `docker run -d -p 88:80 -v ngconf:/etc/nginx --name mynginx nginx`
- `ngconf` 自定义的卷名,不是文件夹,启动后会与`/etc/nginx`里的初始配置一致,修改任何一个都会使另一个同步改变
- 自定义的卷统一在 `var/lib/docker/volumes/<volume-name>`目录下
- `docker volume ls` 列出所有卷
- `docker volume creat <name>` 创建一个卷
- `docker volume inspect <name>` 查看一个卷的详情

## 网络

### docker ip 访问

- 每个 docker 容器启动都会加入 docker 的默认网络`docker0`,使用 `ip a`查看所有网络
- `docker container inspect <name>` 或者 `docker inspect <name>`可以查看一个容器的细节,其中`IPAddress`就是这个容器的 ip 地址,容器和容器之间可以通过对方的这个 ip+容器端口进行数据互访
- 但是这种方法 ip 可能会变化

### 自定义网络

- `docker0` 不支持主机域名,需要自定义一个网络,容器启动加入这个网络,容器的名称就是稳定的域名
- `docker network <COMMAND>`
  | 命令 | 说明 |
  |--|-- |
  | `connect`| Connect a container(容器) to a network|
  | `create` | Create a network|
  | `disconnect` | Disconnect a container from a network|
  | `inspect` | Display(显示) detailed(详细) information(信息) on one or more networks|
  | `ls` | List networks|
  | `prune`(修剪) | Remove all unused(未使用) networks|
  | `rm` | Remove one or more networks|
- `docker network creat mynet` 创建名为`mynet`的自定义网络
- `docker run -d -p 88:80 --network mynet --name mynginx nginx` 使用自定义网络启动容器,同一个网络中的其他容器应用就可以通过`http://mynginx:80`访问这个容器应用了
