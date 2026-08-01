# 数据获取

## 定义

Nuxt 4 在同构（服务端 + 客户端）环境中提供 **`useFetch`**、**`useAsyncData`** 与 **`$fetch`** 三种数据获取方式。核心问题：若在组件 `setup` 里直接用 `$fetch`，SSR 阶段请求一次、客户端 hydration 后再请求一次，导致**重复请求**与 hydration 不一致。`useFetch` / `useAsyncData` 会把服务端结果序列化进 payload，客户端复用，避免双 fetch。

## 三者对比

| 工具 | 本质 | 适用场景 |
| ---- | ---- | -------- |
| `$fetch` | ofetch 封装，类似 `fetch` | 纯客户端交互（表单提交、按钮点击）、服务端路由内请求 |
| `useFetch` | `useAsyncData` + `$fetch` 语法糖 | 页面初始数据，URL 即数据源 |
| `useAsyncData` | 包装任意 async 函数 | CMS SDK、多请求合并、非 URL 数据源 |

关系：`useFetch('/api/x')` ≈ `useAsyncData(key, () => $fetch('/api/x'))`。

## SSR 与 Hydration：为何不双 fetch

```
服务端 render
  └─ useFetch('/api/posts') → 请求完成
  └─ 结果写入 payload（HTML 内嵌或独立脚本）
客户端 hydrate
  └─ 从 payload 读取，不再重复请求 /api/posts
```

- payload 可通过 `useNuxtApp().payload` 访问；DevTools 的 Payload 面板可 inspect
- 仅在**客户端**触发的 `$fetch`（如点击事件）不受此机制保护，这是预期行为

```vue
<script setup lang="ts">
// ✅ SSR 安全：服务端取数，客户端复用 payload
const { data: posts } = await useFetch('/api/posts')

// ✅ 事件驱动：只在浏览器执行
async function submitForm() {
  await $fetch('/api/submit', { method: 'POST', body: form.value })
}
</script>
```

## useFetch 基础

```vue
<!-- app/pages/index.vue -->
<script setup lang="ts">
const { data: count } = await useFetch('/api/count')
</script>

<template>
  <p>访问量：{{ count }}</p>
</template>
```

- 相对路径 `/api/...` 在服务端会解析为内部 Nitro 路由
- 服务端调用时，Nuxt 会通过 `useRequestFetch` 代理客户端 cookie/headers（除 `host` 等敏感头）

## useAsyncData 基础

当数据源不是简单 URL，或需包装第三方 SDK 时使用：

```vue
<script setup lang="ts">
// 推荐：显式 key + 查询函数
const { data, error } = await useAsyncData('users', () =>
  $fetch('/api/users'),
)

// 动态路由：key 含参数
const { id } = useRoute().params
const { data: user } = await useAsyncData(
  `user:${id}`,
  () => $fetch(`/api/users/${id}`),
)
</script>
```

### 并行多请求

```vue
<script setup lang="ts">
const { data: cart } = await useAsyncData('cart-discount', async (_nuxtApp, { signal }) => {
  const [coupons, offers] = await Promise.all([
    $fetch('/api/coupons', { signal }),
    $fetch('/api/offers', { signal }),
  ])
  return { coupons, offers }
})
</script>
```

注意：`useAsyncData` 用于**获取与缓存数据**，不宜用来触发 Pinia action 等副作用；副作用用 `callOnce`。

## 返回值

`useFetch` 与 `useAsyncData` 返回相同结构：

| 属性 | 类型 | 说明 |
| ---- | ---- | ---- |
| `data` | `Ref` | 成功结果 |
| `error` | `Ref` | 错误对象 |
| `status` | `Ref<'idle' \| 'pending' \| 'success' \| 'error'>` | 请求状态 |
| `refresh` / `execute` | `Function` | 重新执行查询 |
| `clear` | `Function` | 清空 data/error，status 置 idle |

模板中 `data` 自动解包；script 中需 `.value`。

```vue
<script setup lang="ts">
const { data, error, status, refresh, clear } = await useFetch('/api/users')
</script>

<template>
  <div v-if="status === 'pending'">加载中…</div>
  <div v-else-if="error">出错：{{ error.message }}</div>
  <div v-else>
    <pre>{{ data }}</pre>
    <button @click="refresh()">刷新</button>
    <button @click="clear()">清空</button>
  </div>
</template>
```

## key 选项与缓存

- **`useAsyncData`**：第一个字符串参数即 key；若只传函数，会按**调用位置**自动生成 key（自定义 composable 中建议始终显式 key）
- **`useFetch`**：默认从 URL + 选项 + 调用位置生成 key；同一 URL 在不同组件调用会产生**不同 key**、各自请求

共享数据：多处使用相同 key

```ts
// 组件 A 与 B 共享同一份 data/error/status
const { data } = await useFetch('/api/users', { key: 'users-list' })
```

动态 key（响应式 ref / computed）：

```ts
const userId = ref('123')
const { data: user } = useAsyncData(
  computed(() => `user-${userId.value}`),
  () => $fetch(`/api/users/${userId.value}`),
)
// userId 变化 → 自动 refetch，旧数据在无引用时清理
```

跨组件读取缓存：`useNuxtData('users-list')`；全局刷新：`refreshNuxtData()` / `clearNuxtData()`。

## lazy 与 immediate

### lazy（非阻塞导航）

默认情况下，Nuxt 用 Vue Suspense **阻塞导航**直到数据就绪。`lazy: true` 时导航立即完成，需自行处理 loading：

```vue
<script setup lang="ts">
const { status, data: posts } = useFetch('/api/posts', { lazy: true })
// 等价：useLazyFetch('/api/posts')
</script>

<template>
  <div v-if="status === 'pending'">加载中…</div>
  <div v-else>{{ posts }}</div>
</template>
```

### await 与 lazy 的区别

| 写法 | 服务端 | 客户端导航 |
| ---- | ------ | ---------- |
| `await useFetch(...)` | 等待完成 | 阻塞直到完成 |
| `useFetch(..., { lazy: true })` | 仍 SSR 取数 | 不阻塞，自行处理 status |
| 不写 await 且非 lazy | 仍 SSR 取数 | 立即导航，data 初始为 undefined |

`await` 与 `lazy` 独立：对 lazy 调用 `await`，客户端导航时 await 会**立即 resolve**，不会等待请求。

### immediate

`immediate: false` 时不在 setup 阶段自动执行，需手动 `execute()` / `refresh()`。

## server 选项（仅客户端取数）

```ts
const { data: comments } = useFetch('/api/comments', {
  lazy: true,
  server: false, // 跳过 SSR，hydration 完成后再请求
})
```

适合非 SEO 敏感、首屏不必展示的数据。未在服务端取数时，hydration 完成前 `data` 为 `undefined`。

## refresh / clear / watch

```vue
<script setup lang="ts">
const page = ref(1)
const { data, refresh, clear } = await useFetch('/api/items', {
  query: { page },
  watch: [page], // page 变化时自动 refetch
})

watch(() => route.path, (path) => {
  if (path === '/') clear()
})
</script>
```

## 调用内部 /api

项目内 `server/api/` 路由可直接用相对路径：

```vue
<script setup lang="ts">
const { data } = await useFetch('/api/hello')
// 服务端：走 Nitro 内部；客户端：同源 fetch
</script>
```

```ts
// server/api/hello.ts
export default defineEventHandler(() => ({ hello: 'world' }))
```

外部 API 用完整 URL；敏感 token 应放在服务端路由内，通过 `useRuntimeConfig` 读取，不要暴露到客户端。

## 常见选项速查

| 选项 | 说明 |
| ---- | ---- |
| `key` | 缓存键，共享/刷新用 |
| `lazy` | 非阻塞导航 |
| `server` | `false` 则仅客户端请求 |
| `immediate` | `false` 延迟到手动 execute |
| `watch` | 监听 ref 变化后 refetch |
| `pick` / `transform` | 减小 payload 体积 |
| `default` | data 初始/清空时的默认值 |
| `dedupe` | 重复请求去重策略 |

## 检查清单

- [ ] 页面**初始数据**用 `useFetch` / `useAsyncData`，勿在 setup 中裸用 `$fetch`
- [ ] 表单提交、按钮操作等**客户端事件**用 `$fetch`
- [ ] 自定义 composable 包装 `useAsyncData` 时提供**稳定显式 key**
- [ ] 多组件共享数据时使用相同 key
- [ ] 非首屏数据考虑 `lazy: true` + `status` 处理
- [ ] 纯客户端数据用 `server: false`
- [ ] 用 `refresh` 在 mutation 后更新列表；用 `clear` 在路由切换时重置
- [ ] 敏感逻辑与密钥放在 `server/api/`，前端只调 `/api/...`

## 小结

`$fetch` 适合 imperative 请求；`useFetch` / `useAsyncData` 解决 SSR 双 fetch，通过 payload 注水。掌握 key 缓存、lazy/immediate、status/error 与 refresh/clear，即可在 Nuxt 4 中安全高效地获取数据。

## 官方文档

- [Data Fetching（数据获取入门）](https://nuxt.com/docs/4.x/getting-started/data-fetching)
- [useFetch](https://nuxt.com/docs/4.x/api/composables/use-fetch)
- [useAsyncData](https://nuxt.com/docs/4.x/api/composables/use-async-data)
- [$fetch](https://nuxt.com/docs/4.x/api/utils/dollarfetch)
