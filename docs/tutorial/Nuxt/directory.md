# Nuxt 4 目录结构

## 总览

Nuxt 4 通过**约定目录**自动化路由、组件导入、服务端 API 等重复工作。项目根目录以 **`nuxt.config.ts`** 为标志；前端源码默认集中在 **`app/`**（这是与 Nuxt 3 最大的结构差异）。

```
project-root/
├── app/                    ← Nuxt 4 默认源码目录
│   ├── pages/
│   ├── layouts/
│   ├── components/
│   ├── composables/
│   ├── middleware/
│   ├── plugins/
│   ├── assets/
│   ├── utils/
│   ├── app.vue
│   ├── app.config.ts
│   └── error.vue
├── server/                 ← Nitro 服务端代码
│   ├── api/
│   ├── routes/
│   ├── middleware/
│   └── utils/
├── public/                 ← 不经构建的静态文件
├── shared/                 ← 客户端与服务端共享代码（可选）
├── nuxt.config.ts
├── package.json
└── .nuxt/                  ← 自动生成，勿提交 Git
```

## Nuxt 3 vs Nuxt 4 对照

| 用途 | Nuxt 3 位置 | Nuxt 4 默认位置 |
| ---- | ----------- | --------------- |
| 页面路由 | `/pages/` | `/app/pages/` |
| 布局 | `/layouts/` | `/app/layouts/` |
| 组件 | `/components/` | `/app/components/` |
| 组合式函数 | `/composables/` | `/app/composables/` |
| 路由中间件 | `/middleware/` | `/app/middleware/` |
| 插件 | `/plugins/` | `/app/plugins/` |
| 样式/图片等资源 | `/assets/` | `/app/assets/` |
| 应用配置 | `/app.config.ts` | `/app/app.config.ts` |
| 根组件 | `/app.vue` | `/app/app.vue` |

`server/`、`public/`、`nuxt.config.ts` 始终在项目根，两个版本一致。

## `app/` 目录详解

### `app/pages/` — 文件路由

每个 `.vue` 文件对应一条 URL 路由。这是 Nuxt 路由的**唯一来源**（除非你手动扩展）。

| 文件路径 | 路由 |
| -------- | ---- |
| `app/pages/index.vue` | `/` |
| `app/pages/about.vue` | `/about` |
| `app/pages/users/[id].vue` | `/users/:id` |
| `app/pages/[...slug].vue` | 捕获所有路径 |

**放什么**：页面级组件，对应独立 URL 的视图。
**不放什么**：可复用 UI 片段（应放 `components/`）、纯逻辑（放 `composables/`）。

### `app/layouts/` — 布局

包裹多个页面的外壳，切换路由时布局不重新挂载（避免重复渲染导航栏等）。

| 文件 | 用法 |
| ---- | ---- |
| `app/layouts/default.vue` | 默认布局 |
| `app/layouts/admin.vue` | 命名布局，页面用 `definePageMeta({ layout: 'admin' })` 指定 |

**放什么**：`<slot />` 包裹页面内容的布局组件。
**不放什么**：业务页面本身。

### `app/components/` — 组件（自动导入）

目录内 `.vue` 文件会被自动扫描并导入，无需 `import`。

| 命名 | 模板中使用 |
| ---- | ---------- |
| `components/AppHeader.vue` | `<AppHeader />` |
| `components/base/Button.vue` | `<BaseButton />`（目录名作前缀） |

**放什么**：按钮、卡片、表单等可复用 UI。
**不放什么**：完整页面（放 `pages/`）。

### `app/composables/` — 组合式函数（自动导入）

导出 `useXxx` 函数，在页面与组件中直接使用。

**放什么**：可复用响应式逻辑（`useAuth`、`useCart` 等）。
**不放什么**：与 Vue 无关的纯 Node 工具（服务端放 `server/utils/`，共享放 `shared/`）。

### `app/middleware/` — 路由中间件

在**客户端导航**前执行（非 `server/middleware/`）。

| 类型 | 文件命名 | 行为 |
| ---- | -------- | ---- |
| 命名中间件 | `auth.ts` | 页面通过 `definePageMeta({ middleware: 'auth' })` 引用 |
| 全局中间件 | `auth.global.ts` | 每次路由变化自动执行 |

**放什么**：鉴权、重定向、路由级权限检查。
**不放什么**：服务端请求处理（放 `server/middleware/`）。

### `app/plugins/` — 插件

在 Nuxt 应用创建时运行，可注册 Vue 插件、注入 provide、初始化第三方库。

**放什么**：`vue-i18n` 初始化、全局指令注册等。
**不放什么**：仅在单个页面使用的逻辑。

### `app/assets/` — 需构建处理的资源

由 Vite 处理的 SCSS、图片、字体等。在组件中通过 `import` 或 `@/` 引用。

**放什么**：`main.css`、SCSS 变量、小图标。
**不放什么**：需原文件名访问的文件（放 `public/`）。

### `app/` 根级特殊文件

| 文件 | 作用 |
| ---- | ---- |
| `app.vue` | 应用根组件，通常含 `<NuxtLayout><NuxtPage /></NuxtLayout>` |
| `app.config.ts` | 构建时可确定的公共配置（主题、站点标题等） |
| `error.vue` | 全局错误页 |

## `server/` 目录详解

Nuxt 服务端由 **Nitro** 驱动。`server/` 内文件自动注册为服务端路由或工具。

### `server/api/` — API 路由

| 文件 | 端点 |
| ---- | ---- |
| `server/api/hello.get.ts` | `GET /api/hello` |
| `server/api/users/[id].get.ts` | `GET /api/users/:id` |
| `server/api/users.post.ts` | `POST /api/users` |

文件名中的 HTTP 方法后缀（`.get`、`.post` 等）决定请求动词。

### `server/routes/` — 非 `/api` 前缀的服务端路由

例如 `server/routes/sitemap.xml.ts` → `/sitemap.xml`。

### `server/middleware/` — 服务端中间件

在每个服务端请求处理前执行，与 `app/middleware/`（Vue 路由）完全不同。

### `server/utils/` — 服务端工具函数

仅服务端可用的辅助函数，可自动导入。

## 其他根目录

### `public/` — 静态公共资源

原样复制到输出根路径，不经过 Vite 处理。

| 文件 | 访问 URL |
| ---- | -------- |
| `public/favicon.ico` | `/favicon.ico` |
| `public/robots.txt` | `/robots.txt` |

**放什么**：favicon、robots.txt、不需 hash 的大文件。
**不放什么**：需要 import 和 tree-shaking 的资源（放 `app/assets/`）。

### `nuxt.config.ts` — 主配置

`defineNuxtConfig({ ... })` 覆盖框架默认行为：模块、SSR、CSS、runtimeConfig 等。

### `package.json` — 依赖与脚本

声明 `nuxt` 版本及 `dev`/`build`/`generate` 等 CLI 脚本。

### `.nuxt/` — 自动生成

开发或构建时由 Nuxt 生成，包含类型声明、内部 manifest。**不要手动编辑或提交 Git**。

## 放哪里？速查表

| 我要放… | 目录 |
| ------- | ---- |
| 一个 URL 对应的页面 | `app/pages/` |
| 导航栏、侧边栏布局 | `app/layouts/` |
| 可复用按钮、卡片 | `app/components/` |
| `useXxx` 响应式逻辑 | `app/composables/` |
| 登录检查、路由守卫 | `app/middleware/` |
| Vue 插件初始化 | `app/plugins/` |
| SCSS、需打包的图片 | `app/assets/` |
| REST API 接口 | `server/api/` |
| sitemap、RSS 等服务端路由 | `server/routes/` |
| favicon、robots.txt | `public/` |
| 私密 API Key 配置 | `nuxt.config.ts` → `runtimeConfig` |
| 主题色、站点标题（公开） | `app/app.config.ts` |

## 示例

### 典型 `app/app.vue`

```vue
<!-- app/app.vue：所有页面的根包裹 -->
<template>
  <NuxtLayout>
    <!-- 当前路由匹配的 pages/*.vue 渲染在此 -->
    <NuxtPage />
  </NuxtLayout>
</template>
```

### 默认布局

```vue
<!-- app/layouts/default.vue -->
<template>
  <div>
    <AppHeader />
    <main>
      <slot />
      <!-- pages/*.vue 的内容插入这里 -->
    </main>
    <AppFooter />
  </div>
</template>
```

### 服务端 API 文件

```ts
// server/api/hello.get.ts
// 自动映射 GET /api/hello
export default defineEventHandler(() => {
  return { message: '来自 Nitro 的问候' }
})
```

### 引用 assets vs public

```vue
<script setup lang="ts">
// assets：经 Vite 处理，可获 hash、可 tree-shake
import logo from '~/assets/logo.svg'
</script>

<template>
  <!-- public：固定 URL，不经构建 -->
  <img src="/favicon.ico" alt="图标" />
  <img :src="logo" alt="Logo" />
</template>
```

## 小结

Nuxt 4 将前端源码收拢到 **`app/`**，根目录保留 **`server/`**（Nitro 后端）、**`public/`**（静态文件）与 **`nuxt.config.ts`**（配置）。理解「什么放哪里」后，大部分 Nuxt 约定会自然生效，无需手动注册路由或 import 组件。

## 官方文档

- [Directory Structure（目录结构总览）](https://nuxt.com/docs/4.x/getting-started/directory-structure)
- [App Directory（app/ 目录）](https://nuxt.com/docs/4.x/directory-structure/app)
- [Server Directory（server/ 目录）](https://nuxt.com/docs/4.x/directory-structure/server)
- [Public Directory（public/ 目录）](https://nuxt.com/docs/4.x/directory-structure/public)
- [Nuxt Config（nuxt.config.ts）](https://nuxt.com/docs/4.x/directory-structure/nuxt-config)
