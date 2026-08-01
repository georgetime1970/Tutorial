# 渲染模式与部署概念

## 定义

**渲染（Rendering）** 指将 Vue 组件转为 HTML 的过程。Nuxt 4 默认采用 **Universal Rendering（通用渲染 / SSR）**：首次请求在服务端生成完整 HTML，浏览器收到后再 **Hydration（水合）** 接管交互。也可全局或按路由切换为纯客户端、静态预渲染或混合策略。

权威参考：[Nuxt 4.x Rendering Modes](https://nuxt.com/docs/4.x/guide/concepts/rendering)、[Deployment](https://nuxt.com/docs/4.x/getting-started/deployment)。

## 默认 SSR 的收益

Nuxt 开箱即用 SSR，适合内容型站点（博客、营销页、电商列表等）。

| 维度 | 说明 |
| ---- | ---- |
| **SEO** | 爬虫直接拿到完整 HTML，索引快于「空壳 + JS 再渲染」的纯 SPA |
| **首屏感知 / TTFB** | 用户先看到静态 HTML，不必等 JS 下载解析后才出现正文 |
| **性能平衡** | 首屏由服务端/缓存 HTML 交付；后续路由可走客户端导航，减少重复 SSR |
| **可访问性** | 无 JS 或 JS 慢时，核心内容仍可见（交互需水合后生效） |

**水合直觉**：`<script setup>` 里 `ref` 初始化在服务端与客户端都会跑；事件处理函数（如 `@click` 回调）只在浏览器执行。中间件、页面在首访与水合时两侧都可能运行——详见官方「What's server-rendered and what's client-rendered?」。

**代价**：需 Node/边缘运行时或预渲染流水线；代码须兼顾服务端与浏览器环境（见文末陷阱）。

## 纯客户端 SPA（`ssr: false`）

关闭 SSR 后，应用与传统 Vue SPA 一致：浏览器下载 JS，客户端生成 DOM。

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: false,
})
```

| 适合 | 不适合 |
| ---- | ------ |
| 强交互后台、SaaS、在线工具 | 依赖 SEO 的公开内容页 |
| 可托管在任意静态文件服务器 | 首屏性能敏感且用户网络/设备参差 |

纯 SPA 时建议配置 `~/spa-loading-template.html` 作为加载占位。部署静态站可用 `nuxi generate`，通常产出 `index.html` 及 `200.html` / `404.html` 回退页供静态主机做客户端路由。**注意**：纯静态产物不含 Nitro 服务端，**无法**使用 [Server API](./server-api) 路由（需 `nuxi build` + Node/边缘运行时）。

配置项细节见 [配置](./configuration)。

## 静态生成与预渲染

**直觉**：构建阶段把指定路由「拍成」HTML（及 `_payload.json` 等静态资源），部署到 CDN/对象存储即可，无需常驻 Node 进程。

| 命令 | 作用 |
| ---- | ---- |
| `nuxi generate` | 预渲染路由并输出到 `.output/public/`（SSG 工作流） |
| `nuxi build --prerender` | 构建 + 预渲染，与 generate 同类产出 |
| `nuxi build`（默认） | 生成 Node/边缘 **服务端** 入口 `.output/server/index.mjs`，可按需 SSR |

**何时适合静态托管**

- 页面内容在构建时可确定，或更新频率低
- 希望最低运维成本（GitHub Pages、Cloudflare Pages 静态、S3 + CDN）
- 可接受「发版才更新 HTML」或配合 ISR/SWR 在支持的平台增量更新

预渲染与 `useFetch` / `useAsyncData` 在构建期拉数有关，见 [数据获取](./data-fetching)。全站 `nuxi generate` 时 **Hybrid Rendering 的 routeRules 不生效**（混合模式需 `nuxi build` + 支持 Nitro 的托管）。

## 混合渲染（Hybrid）与 `routeRules`

按 **URL 模式** 为不同路由指定渲染与缓存策略，Nitro 自动注册中间件与缓存层。典型清单级示例：

```ts
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true },                    // 构建时静态化首页
    '/products': { swr: true },                  // 服务端 stale-while-revalidate
    '/products/**': { swr: 3600 },               // SWR，TTL 3600 秒
    '/blog': { isr: 3600 },                      // CDN ISR（Netlify/Vercel 等）
    '/blog/**': { isr: true },                   // 缓存至下次部署
    '/admin/**': { ssr: false },                 // 该段仅客户端渲染
    '/api/**': { cors: true },                   // API CORS 头
    '/old-page': { redirect: '/new-page' },       // 服务端重定向
  },
})
```

| 规则 | 简要含义 |
| ---- | -------- |
| `prerender: true` | 构建时生成静态 HTML |
| `ssr: false` | 该路由不做服务端 HTML，仅浏览器渲染 |
| `swr: number \| boolean` | 服务端/反向代理缓存，过期后后台再生 |
| `isr: number \| boolean` | 同 SWR，且可写入 CDN 边缘缓存 |
| `redirect: string` | 服务端 302/301 到新路径 |
| `cors` / `headers` | 响应头策略 |

**典型组合**：公开内容 `prerender` 或 `isr`；登录后台 `ssr: false`；旧 URL `redirect`。边缘部署（Cloudflare Workers 等）可与 routeRules 联用，见 [Deployment - Presets](https://nuxt.com/docs/4.x/getting-started/deployment#presets)。

## 如何选择渲染模式

| 场景 | 推荐模式 | 部署形态 |
| ---- | -------- | -------- |
| 博客 / 文档 / 营销站 | 默认 SSR 或 `prerender` / `isr` | 静态 CDN 或边缘 |
| 电商商品列表（常更新） | `swr` / `isr` 混合 | Node 或边缘 + CDN |
| 管理后台 / 重度交互 | `ssr: false` 或 `/admin/**: { ssr: false }` | 静态 SPA 或 Node |
| 需要 Server API + 按路由策略 | `nuxi build` + `routeRules` | Node / serverless / 边缘 |
| 完全离线静态、无服务端 | `nuxi generate` 全站预渲染 | 纯静态主机 |
| 强 SEO + 部分仅客户端组件 | 保持 SSR，局部 `ClientOnly` | 视数据新鲜度选 build/generate |

## SSR 常见陷阱与规避

### 浏览器专属 API

服务端没有 `window`、`document`、`localStorage`。在 setup 顶层直接访问会在 SSR 报错或造成 **hydration mismatch**。

```ts
// 错误：SSR 阶段会执行
const width = window.innerWidth

// 较好：仅在客户端执行
onMounted(() => {
  const width = window.innerWidth
})

// 或使用 import.meta.client / import.meta.server 分支
if (import.meta.client) {
  // 浏览器逻辑
}
```

### `ClientOnly` 与 `useClientOnly`

- **`<ClientOnly>` 组件**：子树只在客户端挂载，SSR 阶段渲染 fallback 插槽（可选）。
- **`useClientOnly()`**：返回 `isMounted` 等 ref，用于条件渲染依赖 DOM 的 UI。

仅客户端库（依赖 `window`、带副作用的 browser-only 包）应放在客户端专用组件内，由 `ClientOnly` 包裹或动态 `import()` 且仅在 `onMounted` 后加载。

### 其他注意

- 服务端与客户端初始 DOM 须一致，否则水合警告；随机 ID、时间戳类数据需统一策略。
- 静态托管 SPA 需配置 `200.html` / `404.html` 回退（`nuxi generate` 默认生成）。
- Cloudflare 等 CDN 勿开启 Rocket Loader 等会注入脚本的优化，以免水合异常（见官方 Deployment CDN 说明）。

## 部署形态速查

| 形态 | 命令 | 产出 | 需要运行时 |
| ---- | ---- | ---- | ---------- |
| Node SSR | `nuxi build` | `.output/server/index.mjs` | 是（Node） |
| 全站静态 SSG | `nuxi generate` | `.output/public/` | 否 |
| 纯 SPA 静态 | `ssr: false` + generate | 单页 + 回退 HTML | 否 |
| 边缘 | `NITRO_PRESET=… nuxi build` | 平台适配 bundle | 边缘函数 |

本地验证生产包：`node .output/server/index.mjs`（需 `NODE_ENV=production`）。

## 延伸阅读

| 主题 | 链接 |
| ---- | ---- |
| 渲染模式（官方） | https://nuxt.com/docs/4.x/guide/concepts/rendering |
| 部署与静态托管 | https://nuxt.com/docs/4.x/getting-started/deployment |
| 预渲染 | https://nuxt.com/docs/4.x/getting-started/prerendering |
| Route Rules | https://nuxt.com/docs/4.x/guide/concepts/rendering#route-rules |
| Nitro 部署预设 | https://nitro.build/deploy |

本系列关联章节：[配置](./configuration) · [数据获取](./data-fetching) · [Server API](./server-api)
