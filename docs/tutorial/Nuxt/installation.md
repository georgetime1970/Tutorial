# Nuxt 安装与首个项目

## 前置条件

| 要求 | 说明 |
| ---- | ---- |
| **Node.js** | **22.x 或更高**（推荐使用当前 Active LTS 版本） |
| **包管理器** | npm（自带）、pnpm、yarn、bun 均可 |
| **终端** | 用于运行 Nuxt CLI 命令 |
| **编辑器** | 无强制要求；推荐 VS Code + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 扩展（原 Volar） |

> Nuxt 4 要求 Node 22+。可用 `node -v` 检查版本；过低请先升级 Node。

## 创建新项目

在终端中执行（将 `<project-name>` 替换为你的项目名）：

```bash
# 使用 npm（官方文档默认示例）
npm create nuxt@latest <project-name>
```

交互式向导会询问：

| 选项 | 常见选择 | 说明 |
| ---- | -------- | ---- |
| Package manager | npm / pnpm / yarn | 项目使用的包管理器 |
| TypeScript | Yes | 强烈推荐，获完整类型提示 |
| Nuxt UI / ESLint 等 | 按需 | 可后续再添加 |

### 其他包管理器（简要）

```bash
# pnpm
pnpm create nuxt@latest <project-name>

# yarn
yarn create nuxt@latest <project-name>
```

创建完成后进入项目目录：

```bash
cd <project-name>
```

## 启动开发服务器

```bash
# npm：-- -o 表示自动在浏览器打开 http://localhost:3000
npm run dev -- -o
```

| 包管理器 | 等价命令 |
| -------- | -------- |
| npm | `npm run dev -- -o` |
| pnpm | `pnpm dev -o` |
| yarn | `yarn dev -o` |

开发服务器默认监听 **http://localhost:3000**，支持 HMR。修改 `app/` 下的文件会即时反映到浏览器。

## 生成项目的首次浏览

脚手架完成后，典型目录结构如下（Nuxt 4 默认 **`app/` 为源码目录**）：

```
my-nuxt-app/
├── app/                  ← Nuxt 4：前端源码根目录（Nuxt 3 时在项目根）
│   ├── app.vue           ← 应用根组件
│   ├── pages/            ← 文件路由（pages/index.vue → /）
│   ├── components/       ← 自动导入的组件
│   └── ...
├── server/               ← 服务端 API（可选，初始可能为空）
├── public/               ← 静态文件（favicon 等）
├── nuxt.config.ts        ← Nuxt 配置
├── package.json
└── .nuxt/                ← 自动生成，勿手动编辑
```

### 关键文件说明

| 文件/目录 | 作用 |
| --------- | ---- |
| `app/app.vue` | 应用入口，通常包含 `<NuxtLayout>` 与 `<NuxtPage />` |
| `app/pages/index.vue` | 首页，路由 `/` |
| `nuxt.config.ts` | 框架配置入口 |
| `.nuxt/` | 开发时自动生成的类型与内部文件，加入 `.gitignore` |

## 示例

### 修改首页验证安装成功

```vue
<!-- app/pages/index.vue -->
<script setup lang="ts">
// useHead 自动导入，设置页面标题
useHead({ title: '我的第一个 Nuxt 4 应用' })
</script>

<template>
  <div>
    <h1>Nuxt 4 安装成功</h1>
    <p>源码位于 app/ 目录，而非 Nuxt 3 的项目根 pages/</p>
  </div>
</template>
```

保存后浏览器应自动热更新。

### 添加第二个路由

```vue
<!-- app/pages/about.vue -->
<!-- 自动映射为 /about，无需配置 vue-router -->
<template>
  <div>
    <h1>关于</h1>
    <NuxtLink to="/">返回首页</NuxtLink>
  </div>
</template>
```

访问 http://localhost:3000/about 即可看到新页面。

### 查看 package.json 常用脚本

```json
{
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "preview": "nuxt preview"
  }
}
```

| 脚本 | 用途 |
| ---- | ---- |
| `dev` | 开发模式 + HMR |
| `build` | 生产构建（输出 `.output/`） |
| `generate` | 静态站点生成 |
| `preview` | 本地预览生产构建 |

### 在 VS Code 中打开项目

```bash
code <project-name>
```

安装 **Vue - Official** 扩展后，`.vue` 文件可获得：

- 模板内变量类型提示
- `defineNuxtConfig`、`useFetch` 等 Nuxt API 自动补全
- 跳转到 `app/components/` 自动导入的组件定义

## 在线体验（无需本地安装）

若只想快速试用，可使用官方 StackBlitz 沙盒：

- [Nuxt 在线 Playground](https://nuxt.com/docs/4.x/getting-started/installation#play-online)

## 常见问题

| 问题 | 处理 |
| ---- | ---- |
| `create nuxt` 报错 Node 版本 | 升级到 Node 22+ |
| 端口 3000 被占用 | `npm run dev -- -p 3001` 指定其他端口 |
| 类型报错找不到模块 | 先运行一次 `npm run dev` 生成 `.nuxt/` 类型 |
| 从 Nuxt 3 迁移 | 将根目录 `pages/` 等移入 `app/` |

## 小结

安装 Nuxt 4 只需 Node 22+ 与 `npm create nuxt@latest`。开发时用 `npm run dev -- -o` 启动，注意源码在 **`app/`** 目录。下一步可阅读目录结构与配置文档，系统了解各文件夹职责。

## 官方文档

- [Installation（安装）](https://nuxt.com/docs/4.x/getting-started/installation)
- [Introduction（简介）](https://nuxt.com/docs/4.x/getting-started/introduction)
- [Directory Structure（目录结构）](https://nuxt.com/docs/4.x/getting-started/directory-structure)
