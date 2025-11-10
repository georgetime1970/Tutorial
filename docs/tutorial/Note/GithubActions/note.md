# Github Actions 基础

## 🧩 一、什么是 GitHub Actions？

**GitHub Actions 是 GitHub 提供的一种自动化工作流（workflow）系统。**

简单来说，它可以让你的 GitHub 仓库在“触发某些事件”时**自动执行任务**，比如：

- 你提交（push）代码；
- 你创建 Pull Request；
- 你打了一个 Tag；
- 你手动触发（workflow_dispatch）。

GitHub 就会自动启动一台虚拟机（运行环境），在上面**执行你配置好的命令**，例如：

- 构建（build）项目；
- 运行测试；
- 自动部署到服务器或 Cloudflare；
- 自动打包发布到 npm、Docker Hub、Pages 等。

## 🚀 二、它能做什么？

举几个最常见的用途 👇

| 场景               | 示例                                                                                         |
| ------------------ | -------------------------------------------------------------------------------------------- |
| **自动部署网站**   | 你推送代码后，GitHub Actions 自动构建并部署到 Cloudflare Pages、Vercel、阿里云 OSS、服务器等 |
| **持续集成（CI）** | 每次提交代码后自动运行测试脚本，确保项目不出错                                               |
| **持续交付（CD）** | 测试通过后自动发布新版到生产环境                                                             |
| **自动生成文档**   | 自动运行脚本生成静态文档并推送到 gh-pages 分支                                               |
| **自动化脚本任务** | 定时执行爬虫、同步仓库、备份数据、发送邮件等                                                 |
| **跨平台构建**     | 比如自动打包成 Windows/macOS/Linux 的可执行文件                                              |

## 📁 三、文件结构与位置

GitHub Actions 的配置文件是 **YAML 文件**（后缀 `.yml` 或 `.yaml`），放在你的仓库目录下：

```
.github/
└── workflows/
    └── deploy.yml
```

每个 `.yml` 文件对应一个工作流（workflow），可以有多个。

## 🧠 四、基本语法结构

下面是一个最典型的结构示例 👇

```yaml
name: Deploy to GitHub Pages # 工作流名称

# 触发条件（on:）,这里的触发条件是当push时就执行工作流
on:
  push:
    branches:
      - main # 当推送到 main 分支时触发,main 或 master，根据你的主分支名来写
  workflow_dispatch: # 允许手动触发

permissions: # 权限
  contents: write

# 任务定义（jobs:）,相当于任务合集
jobs:
  deploy: # jobs的名称
    runs-on: ubuntu-latest # 运行环境：Linux（可选 windows-latest/macOS-latest）
    steps: # 步骤
      - name: Checkout code # 步骤名称
        uses: actions/checkout@v5 # 官方动作：拉取代码到虚拟机

      - name: Install Node.js
        uses: actions/setup-node@v6
        with:
          node-version: 24

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      # 部署到cloudflare
      # - name: Deploy to Cloudflare Pages
      #   run: npx wrangler pages deploy dist --project-name=my-site
      #   env:
      #     CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}

      # 部署到GitHub上
      - name: 🚀 Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          # publish_branch: gh-pages # default: gh-pages 设置要用作 GitHub Pages 分支的分支名称。默认值为 gh-pages。
          publish_dir: ./docs/.vitepress/dist
          cname: tutorial.jiangyahan.com # 如果没有自定义域名去掉这一行
```

## 🧩 五、核心概念解释

| 概念                    | 说明                                                     |
| ----------------------- | -------------------------------------------------------- |
| **workflow（工作流）**  | 一整个自动化流程（比如“部署网站”）                       |
| **job（任务）**         | 工作流中的一个逻辑任务单元（例如“构建”、“测试”、“部署”） |
| **step（步骤）**        | 任务中的每一个具体动作（例如“npm install”）              |
| **runner（运行器）**    | GitHub 提供的虚拟机环境，负责执行任务                    |
| **action（动作）**      | 可重用的命令模块（如 `actions/checkout`）                |
| **secrets（机密变量）** | 存放敏感信息的安全变量（例如 API 密钥）                  |

## 📘 六、常见语法元素

| 元素                                  | 示例                        | 含义                |
| ------------------------------------- | --------------------------- | ------------------- |
| `uses:`                               | `uses: actions/checkout@v4` | 使用现成的动作      |
| `run:`                                | `run: npm run build`        | 直接运行 shell 命令 |
| `env:`                                | `env: NODE_ENV: production` | 设置环境变量        |
| `with:`                               | `with: node-version: 20`    | 给动作传入参数      |
| <span v-pre>`${{secrets.KEY}}`</span> | 引用机密变量                |                     |
| <span v-pre>`${{github.ref}}`</span>  | 内置变量（例如分支名）      |                     |

## 🧰 七、几个优秀的官方 Actions

| 名称                                                                                   | 功能                            |
| -------------------------------------------------------------------------------------- | ------------------------------- |
| [`actions/checkout` ](https://github.com/actions/checkout/tree/v5/)                    | 拉取代码                        |
| [`actions/setup-node`](https://github.com/actions/setup-node/tree/v6/)                 | 安装 Node.js 环境               |
| `actions/upload-artifact`                                                              | 上传构建产物                    |
| `actions/cache`                                                                        | 缓存依赖                        |
| [`peaceiris/actions-gh-pages`](https://github.com/peaceiris/actions-gh-pages/tree/v4/) | 自动部署静态站点到 GitHub Pages |

## 🎯 八、推荐学习路线

如果你要系统学 GitHub Actions，这样安排最合适 👇

1. **官方文档入门**
   🔗 [https://docs.github.com/zh/actions](https://docs.github.com/zh/actions)

2. **看示例项目**
   搜索关键字 `path:.github/workflows` 就能找到别人仓库的配置模板。
