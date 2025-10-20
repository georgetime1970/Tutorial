# Docker 基础笔记

## 常见命令

- `docker search`: [镜像市场](https://hub.docker.com/)检索列表

  - eg: `docker search nginx`: 默认下载最新版
  - eg: `docjer search nginx:1.26.0`: 下载指定版本

- `docker pull`: 下载镜像
- `docker images`: 已下载镜像列表
- `docker rmi`: 删除镜像

  - 可以使用 id(全名或首 3 个字母数字)和名字删除
  - eg: `docker rmi -f  nginx` : 强制删除

- `docker run`: 运行镜像

  - 如果没有这个镜像就会自动下载

- `docker ps`: 查看正在运行的容器
- `docker stop`: 停止镜像
- `docker start`: 启动镜像
- `docker restart`: 重启镜像
- `docker stats`: 状态
- `docker logs`: 运行日志
- `docker exec`: 进入
- `docker rmi`: 删除
