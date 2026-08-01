# Nuxt 简介

## 什么是 Nuxt

**Nuxt** 是基于 **Vue.js** 的免费开源全栈 Web 框架，目标是用约定优于配置的方式，让你以类型安全、高性能的方式构建生产级应用与网站。你仍然编写 `.vue` 单文件组件，但 Nuxt 在开发时提供 HMR（热模块替换），在生产环境默认启用 **SSR（服务端渲染）**，无需自行搭建 Node 服务器。

若你已熟悉 [Vue Composition API](https://cn.vuejs.org/guide/extras/composition-api-faq.html)，Nuxt 不会替换 Vue 语法，而是在其之上增加**文件路由、自动导入、数据获取、服务端 API** 等全栈能力。

## Nuxt vs 纯 Vue SPA

| 维度            | 纯 Vue SPA（Vite + vue-router） | Nuxt                                           |
| --------------- | ------------------------------- | ---------------------------------------------- |
| 路由            | 手动配置 `routes` 数组          | `app/pages/` 文件即路由                        |
| 组件/组合式函数 | 需手动 `import`                 | `app/components/`、`app/composables/` 自动导入 |
| 首屏渲染        | 客户端渲染（CSR），HTML 空壳    | 默认 SSR，首屏 HTML 含内容                     |
| 服务端 API      | 需另起 Express/Fastify 等       | `server/api/` 文件即 API 路由                  |
| 构建工具        | 自行配置 Vite                   | 内置 Vite + 最佳实践                           |
| 部署            | 静态托管即可                    | 静态 / Node / Serverless / Edge 均可           |
| TypeScript      | 自行配置                        | 零配置，自动生成类型                           |

纯 Vue SPA 适合纯后台、无需 SEO 的内网工具；Nuxt 适合需要 SEO、首屏性能、全栈一体化的站点与应用。

## Nuxt 4 目录约定（与 Nuxt 3 的重要区别）

Nuxt 4 将应用源码默认放在 **`app/`** 目录下，而非 Nuxt 3 时代项目根目录的 `pages/`、`components/` 等：

| Nuxt 3（旧）   | Nuxt 4（默认）     | 说明               |
| -------------- | ------------------ | ------------------ |
| `pages/`       | `app/pages/`       | 文件路由           |
| `components/`  | `app/components/`  | 组件自动导入       |
| `composables/` | `app/composables/` | 组合式函数自动导入 |
| `layouts/`     | `app/layouts/`     | 布局组件           |
| `middleware/`  | `app/middleware/`  | 路由中间件         |
| `plugins/`     | `app/plugins/`     | 插件               |
| `assets/`      | `app/assets/`      | 需构建处理的资源   |

`server/`、`public/`、`nuxt.config.ts` 仍在**项目根目录**。迁移旧项目时，这是最需要适应的变化。

## 核心约定一览

| 约定             | 作用                               | 典型位置                                |
| ---------------- | ---------------------------------- | --------------------------------------- |
| 文件路由         | 目录结构映射 URL                   | `app/pages/`                            |
| 自动导入         | 省略重复 import，保留 tree-shaking | `app/components/`、`app/composables/`   |
| SSR 默认开启     | 首屏 HTML 含内容，利于 SEO         | `nuxt.config.ts` 中 `ssr: true`（默认） |
| 代码分割         | 按路由懒加载 JS                    | 自动，基于 `app/pages/`                 |
| 数据获取         | SSR 兼容的 fetch 组合式函数        | `useFetch`、`useAsyncData` 等           |
| 服务端引擎 Nitro | 统一开发与生产的服务端运行时       | `server/`                               |

## 架构直觉：Vue + Nitro

```
浏览器
  │
  ├─ 客户端：Vue 3 应用（组件、路由、状态）
  │     ↑ hydrate 注水
  └─ 服务端：Nitro 引擎
        ├─ SSR：渲染 Vue 为 HTML
        ├─ server/api/ → REST API
        └─ server/middleware/ → 服务端中间件
```

- **Vue 层**：负责 UI、客户端交互，与纯 Vue 项目一致。
- **Nitro 层**：Nuxt 的服务端引擎。开发时用 Rollup + Node.js workers；生产构建为轻量 `.output` 目录，可部署到 Node、Serverless、Workers、Edge 或纯静态托管。
- **同构代码**：页面在服务端渲染一次，客户端「注水」后变为可交互 SPA，后续导航走客户端路由。

## 渲染模式（直觉）

| 模式        | 配置/命令       | 适用场景                     |
| ----------- | --------------- | ---------------------------- |
| SSR（默认） | 无需额外配置    | 动态内容、SEO、首屏性能      |
| SPA         | `ssr: false`    | 纯后台、无需 SEO             |
| 静态生成    | `nuxt generate` | 博客、文档站                 |
| 混合渲染    | `routeRules`    | 部分页面 SSR、部分静态或 SPA |

## 无厂商锁定

Nuxt 不绑定特定云平台。构建产物 `.output` 可部署到：

- 传统 Node/Deno 服务器
- 静态 CDN（预渲染后）
- Serverless / Edge（Cloudflare Workers、Vercel、Netlify 等）

框架本身开源，迁移成本主要在部署适配，而非代码重写。

## 示例

### 最小页面（自动路由 + 自动导入组件）

```vue
<!-- app/pages/index.vue -->
<!-- 此文件自动映射为路由 / -->
<script setup lang="ts">
// useHead 由 Nuxt 自动导入，无需 import
useHead({ title: "首页" });
</script>

<template>
  <!-- AppHeader 来自 app/components/AppHeader.vue，自动导入 -->
  <AppHeader />
  <h1>Hello Nuxt 4</h1>
</template>
```

### 组合式函数自动导入

```ts
// app/composables/useCounter.ts
/** 可复用的计数器逻辑 */
export function useCounter(initial = 0) {
  const count = ref(initial);
  const increment = () => count.value++;
  return { count, increment };
}
```

```vue
<!-- app/pages/demo.vue -->
<script setup lang="ts">
// 无需 import useCounter，Nuxt 自动扫描 app/composables/
const { count, increment } = useCounter(10);
</script>

<template>
  <button @click="increment">计数：{{ count }}</button>
</template>
```

### 关闭 SSR 变为纯 SPA

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: false, // 全局禁用 SSR，行为类似纯 Vue SPA
});
```

### 混合渲染：部分路由静态化

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  routeRules: {
    "/": { prerender: true }, // 首页预渲染为静态 HTML
    "/admin/**": { ssr: false }, // 后台走 SPA
    "/api/**": { cors: true }, // API 路由 CORS
  },
});
```

## 小结

Nuxt 在 Vue 之上提供**约定驱动的全栈开发体验**：`app/` 目录组织前端代码，`server/` 组织后端 API，Nitro 统一运行时。默认 SSR 兼顾 SEO 与首屏性能，同时可按需切换 SPA、静态或混合模式，且无厂商锁定。

## 官方文档

- [Introduction（简介）](https://nuxt.com/docs/4.x/getting-started/introduction)
- [Nuxt Concepts（核心概念）](https://nuxt.com/docs/4.x/guide/concepts)
- [Rendering Modes（渲染模式）](https://nuxt.com/docs/4.x/guide/concepts/rendering)
- [Nuxt Server Engine（Nitro 服务端引擎）](https://nuxt.com/docs/4.x/guide/concepts/server-engine)
