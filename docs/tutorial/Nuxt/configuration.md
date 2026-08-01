# Nuxt 配置

## 配置入口：`nuxt.config.ts`

`nuxt.config.ts` 位于**项目根目录**（与 `app/` 同级），是 Nuxt 的**单一配置来源**。它导出 `defineNuxtConfig` 返回的配置对象，用于覆盖或扩展框架默认值。

```ts
// nuxt.config.ts
// defineNuxtConfig 全局可用，无需 import
export default defineNuxtConfig({
  // 在此编写项目配置
})
```

建议使用 `.ts` 扩展名，IDE 会提供选项补全与类型检查，减少拼写错误。

## 常用配置项直觉

| 选项 | 类型/示例 | 作用 |
| ---- | --------- | ---- |
| `ssr` | `true` / `false` | 是否启用服务端渲染；`false` 即纯 SPA |
| `modules` | `['@nuxt/ui']` | 注册 Nuxt 模块，扩展功能 |
| `css` | `['~/assets/main.css']` | 全局注入的样式文件 |
| `app.head` | `{ title, meta, link }` | 默认 HTML `<head>` 内容 |
| `devtools` | `{ enabled: true }` | Nuxt DevTools 面板 |
| `routeRules` | `{ '/admin/**': { ssr: false } }` | 按路由混合渲染策略 |
| `runtimeConfig` | 见下文 | 运行时环境变量（含私密 Key） |
| `vite` / `nitro` | 嵌套对象 | 透传 Vite / Nitro 底层配置 |

### 按环境覆盖

Nuxt 4 支持在配置内用特殊键区分环境：

```ts
export default defineNuxtConfig({
  $development: {
    devtools: { enabled: true },
  },
  $production: {
    routeRules: {
      '/**': { isr: true },
    },
  },
  $env: {
    staging: {
      // staging 环境专用配置
    },
  },
})
```

构建时可通过 `--envName staging` 选择环境。

## 示例：常见配置组合

### 基础站点配置

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  // 开发工具
  devtools: { enabled: true },

  // 全局 CSS（路径相对于 app/ 或项目根）
  css: ['~/assets/main.css'],

  // 默认 head 元信息
  app: {
    head: {
      title: '我的 Nuxt 站点',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '基于 Nuxt 4 的全栈应用' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
      ],
    },
  },

  // 注册模块
  modules: [
    '@nuxt/eslint',
  ],
})
```

### 渲染模式与路由规则

```ts
export default defineNuxtConfig({
  ssr: true, // 默认即为 true

  routeRules: {
    '/': { prerender: true },          // 构建时预渲染首页
    '/blog/**': { swr: 3600 },          // 服务端缓存 1 小时
    '/dashboard/**': { ssr: false },    // 后台区域走 SPA
  },
})
```

### 注册模块与透传 Vite

```ts
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],

  vite: {
    vue: {
      script: {
        defineModel: true, // 启用 defineModel 宏
      },
    },
  },
})
```

## `runtimeConfig` — 运行时配置

用于暴露**环境相关**的值，尤其是 API Key、数据库连接等。定义在 `nuxt.config.ts`，可通过环境变量在部署时覆盖。

| 命名空间 | 可见范围 | 典型用途 |
| -------- | -------- | -------- |
| 顶层键（如 `apiSecret`） | **仅服务端** | 私密 Token、数据库 URL |
| `runtimeConfig.public.*` | **客户端 + 服务端** | 公开 API 基址、功能开关 |
| `runtimeConfig.app.*` | Nuxt 内部使用 | 一般无需手动设置 |

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    // 仅服务端可访问
    apiSecret: 'dev-secret-key',

    public: {
      // 客户端也可访问（会打入客户端 bundle）
      apiBase: '/api',
      siteName: 'My App',
    },
  },
})
```

环境变量覆盖规则：大写 + 嵌套用 `_` 分隔。

```bash
# .env
NUXT_API_SECRET=production-secret
NUXT_PUBLIC_API_BASE=https://api.example.com
```

```vue
<!-- app/pages/index.vue -->
<script setup lang="ts">
const config = useRuntimeConfig()

// 客户端只能读 public 命名空间
console.log(config.public.apiBase)

// apiSecret 在客户端为 undefined（安全）
// 在 server/api/*.ts 中可正常读取 config.apiSecret
</script>
```

**特点**：

- 支持环境变量覆盖（部署友好）
- 私密键不会泄露到客户端 bundle
- 值在运行时确定，修改需重启 dev server 或重新部署
- 仅支持字符串等原始类型（非复杂 JS 对象）

## `app.config.ts` — 应用公共配置

位于 **`app/app.config.ts`**（Nuxt 4 源码目录内），用于**构建时确定**的公共配置：主题、UI 变体、站点级非敏感设置。

```ts
// app/app.config.ts
export default defineAppConfig({
  title: 'Hello Nuxt',
  theme: {
    dark: true,
    colors: {
      primary: '#3b82f6',
    },
  },
})
```

```vue
<script setup lang="ts">
const appConfig = useAppConfig()
// 响应式，支持 HMR 热更新
console.log(appConfig.theme.colors.primary)
</script>
```

**特点**：

- 不支持环境变量覆盖
- 可含非原始 JS 类型（嵌套对象、数组）
- 客户端 bundle 内联，完全公开
- 支持 HMR，改配置即时生效
- 可按请求动态（在插件或中间件中修改）

## `runtimeConfig` vs `app.config.ts`

| 特性 | `runtimeConfig` | `app.config.ts` |
| ---- | --------------- | --------------- |
| 定义位置 | `nuxt.config.ts` | `app/app.config.ts` |
| 客户端可见性 | 仅 `public` 子键 | 全部公开 |
| 环境变量覆盖 | ✅ 支持 | ❌ 不支持 |
| 响应式 | ✅ | ✅ |
| TypeScript 类型 | 部分 | 完整 |
| 复杂 JS 类型 | ❌ 仅原始值 | ✅ 支持 |
| HMR | ❌ | ✅ |
| 按请求配置 | ❌ | ✅ |
| 典型场景 | API Key、部署 URL | 主题色、功能菜单结构 |

### 如何选择？

```
需要私密 Token / 部署时用 .env 覆盖？
  └─ 是 → runtimeConfig（私密放顶层，公开放 public）

是 UI 主题、导航结构等构建时确定的公开配置？
  └─ 是 → app.config.ts

两者可同时使用，职责不重叠。
```

### 组合示例

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    stripeSecretKey: '',                    // 服务端支付密钥
    public: {
      stripePublishableKey: '',             // 客户端 Stripe 公钥
    },
  },
})
```

```ts
// app/app.config.ts
export default defineAppConfig({
  ui: {
    primaryColor: 'blue',
    sidebar: { collapsed: false },
  },
})
```

```vue
<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()  // 密钥与 API 地址
const appConfig = useAppConfig()          // 主题与 UI 结构
</script>
```

## 外部配置文件

Nuxt **不会**自动读取独立的 `vite.config.ts` 或 `nitro.config.ts`，应通过 `nuxt.config.ts` 嵌套：

| 工具 | 独立文件（Nuxt 不读） | Nuxt 写法 |
| ---- | -------------------- | --------- |
| Vite | `vite.config.ts` | `vite: { ... }` |
| Nitro | `nitro.config.ts` | `nitro: { ... }` |
| PostCSS | `postcss.config.js` | `postcss: { ... }` |

## 小结

- **`nuxt.config.ts`**：框架级配置（SSR、模块、CSS、head、runtimeConfig）。
- **`runtimeConfig`**：运行时可变、支持 `.env` 的配置；私密放顶层，公开放 `public`。
- **`app/app.config.ts`**：构建时确定的公开应用配置，适合主题与 UI 结构。

三者配合，即可安全地管理从部署密钥到界面主题的全部配置需求。

## 官方文档

- [Configuration（配置概览）](https://nuxt.com/docs/4.x/getting-started/configuration)
- [Nuxt Configuration Reference（配置项参考）](https://nuxt.com/docs/4.x/api/nuxt-config)
- [Runtime Config（运行时配置）](https://nuxt.com/docs/4.x/guide/going-further/runtime-config)
- [App Config（应用配置）](https://nuxt.com/docs/4.x/directory-structure/app/app-config)
