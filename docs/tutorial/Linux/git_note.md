# Git 基础

git 是一个分布式版本控制工具

## Git 基础命令

| 命令                                    | 说明           |
| --------------------------------------- | -------------- |
| `git -v`                                | 查看版本       |
| `git init`                              | 初始化仓库     |
| `git clone <URL>`                       | 克隆远程仓库   |
| `git config user.name <Name>`           | 配置用户名     |
| `git config user.email <Email>`         | 配置邮箱       |
| `git config --global user.name <Name>`  | 全局配置用户名 |
| `git config --global user.email<Email>` | 全局配置邮箱   |

## 文件操作

| 命令                            | 说明                                                   |
| ------------------------------- | ------------------------------------------------------ |
| `git status`                    | 查看暂存区状态                                         |
| `git log`                       | 查看全部提交记录,详细信息                              |
| `git log --oneline`             | 查看全部提交记录,摘要信息                              |
| `git log <版本号>`              | 查看指定版本提交记录                                   |
| `git add <FileName>`            | 提交到暂存区                                           |
| `git rm --cached <FileName>`    | 从暂存区删除文件（解除跟踪），本地文件不会被删除       |
| `git rm -r --cached <FileName>` | 从暂存区递归删除整个目录                               |
| `git commit -m <Describe>`      | 语义化提交信息（Conventional Commits），提交到本地仓库 |
| `git restore <FileName>`        | 恢复文件(add 操作之前的文件)                           |
| `git reset --hard <版本号>`     | 重置到指定版本,不保存提交记录                          |
| `git revert <版本号>`           | 恢复到指定版本的前一个版本,保存提交记录                |

## 分支操作

| 命令                     | 说明                               |
| ------------------------ | ---------------------------------- |
| `git branch <Name>`      | 创建新分支(必须有提交记录才能创建) |
| `git branch -v`          | 查看分支列表                       |
| `git checkout <Name>`    | 切换分支                           |
| `git checkout -b <Name>` | 创建分支并切换分支                 |
| `git branch -d <Name>`   | 删除分支                           |
| `git merge <Name>`       | 合并分支到当前分支(main)           |

## 标签操作

给指定的版本号取别名,可代替版本号,可以很方便根据标签创建分支

| 命令                         | 说明                   |
| ---------------------------- | ---------------------- |
| `git tag`                    | 提交历史标签列表       |
| `git tag <tagName> <版本号>` | 给指定版本打标签(别名) |
| `git log <tagName>`          | 查看指定标签提交记录   |
| `git tag -d <tagName>`       | 删除指定标签           |

## 远程操作

| 命令              | 说明               |
| ----------------- | ------------------ |
| `git push origin` | 推送到远程仓库     |
| `git pull origin` | 拉取远程仓库到本地 |
