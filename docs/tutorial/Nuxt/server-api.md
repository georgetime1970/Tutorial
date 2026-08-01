# Server API

## 定义

Nuxt 4 的 **`server/`** 目录由 **Nitro** 驱动，用于注册**仅在服务端运行**的 API 与中间件。`server/api/` 下每个文件自动映射为 `/api/*` 路由；前端通过 `useFetch('/api/...')` 或 `$fetch('/api/...')` 调用。这是全栈 Nuxt 的后端层，与 `app/` 中的 Vue 代码**运行在不同上下文**，不可混用。

## 目录结构

```
server/
├── api/              ← 自动加 /api 前缀
│   ├── hello.ts      → GET /api/hello
│   ├── users.get.ts  → GET /api/users
│   └── users.post.ts → POST /api/users
├── routes/           ← 无 /api 前缀（如 /hello）
├── middleware/       ← 每个请求前执行
├── plugins/          ← Nitro 插件
└── utils/            ← 服务端工具，可自动导入
```

| 目录 | 路由前缀 | 典型用途 |
| ---- | -------- | -------- |
| `server/api/` | `/api` | REST API、BFF 层 |
| `server/routes/` | 无 | 非 API 路由（如 `/sitemap.xml`） |
| `server/middleware/` | 全局 | 日志、鉴权上下文 |

## 最小 API 示例

```ts
// server/api/hello.ts
export default defineEventHandler(() => {
  return { hello: 'world' }
})
```

```vue
<!-- app/pages/index.vue -->
<script setup lang="ts">
const { data } = await useFetch('/api/hello')
</script>

<template>
  <pre>{{ data }}</pre>
  <!-- { "hello": "world" } -->
</template>
```

`defineEventHandler` 自动导入；返回值默认序列化为 **JSON**（也可返回 text、html、stream）。

## HTTP 方法文件

文件名后缀匹配 HTTP 方法，同一路径可拆分多个 handler：

```
server/api/
├── todos.get.ts    → GET  /api/todos
├── todos.post.ts   → POST /api/todos
└── todos/[id].delete.ts → DELETE /api/todos/:id
```

```ts
// server/api/todos.get.ts
export default defineEventHandler(() => {
  return [{ id: 1, title: '学习 Nuxt' }]
})
```

```ts
// server/api/todos.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return { created: true, title: body.title }
})
```

未匹配的方法返回 **405 Method Not Allowed**。

## 读取 Query 与 Body

### Query 参数

请求 `/api/search?q=nuxt&page=2`：

```ts
// server/api/search.get.ts
export default defineEventHandler((event) => {
  const query = getQuery(event)
  // { q: 'nuxt', page: '2' } — 值均为 string | string[]
  return { q: query.q, page: Number(query.page) || 1 }
})
```

### Request Body

```ts
// server/api/submit.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return { received: body }
})
```

```vue
<script setup lang="ts">
async function submit() {
  const res = await $fetch('/api/submit', {
    method: 'POST',
    body: { name: 'George' },
  })
}
</script>
```

注意：在 **GET** handler 中调用 `readBody` 会抛出 405。Body 应用 `.post.ts` 等 POST 路由。

### 路由参数

```ts
// server/api/users/[id].get.ts
export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  return { id, name: `User ${id}` }
})
```

访问 `/api/users/42` → `{ id: '42', name: 'User 42' }`。

## 错误与状态码

```ts
// server/api/validation/[id].get.ts
export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID 必须是整数',
    })
  }
  setResponseStatus(event, 200)
  return { id, valid: true }
})
```

- 未捕获异常 → 500
- `createError({ statusCode })` → 指定 HTTP 状态
- `setResponseStatus(event, 202)` → 仅改状态码

## 与 useFetch 配合

```vue
<!-- app/pages/users.vue -->
<script setup lang="ts">
const { data, error, refresh } = await useFetch('/api/users')

async function addUser(name: string) {
  await $fetch('/api/users', { method: 'POST', body: { name } })
  await refresh()
}
</script>
```

SSR 时 `useFetch` 在服务端直接调用 Nitro handler，无需 HTTP 环回；客户端则走网络请求。

## server/middleware 简介

`server/middleware/` 中的 handler 在**每个请求**到达具体路由**之前**执行：

```ts
// server/middleware/log.ts
export default defineEventHandler((event) => {
  console.log('请求:', getRequestURL(event))
  // 不 return 响应，仅扩展 context
})
```

```ts
// server/middleware/auth.ts
export default defineEventHandler((event) => {
  event.context.auth = { userId: 123 }
})
```

规则：

- **不应** return 响应体或直接结束请求（除非抛错）
- 用于日志、注入 `event.context`、校验 header
- 与 `app/middleware/`（Vue 路由中间件）完全不同

## 运行时配置与密钥

```ts
// server/api/github.get.ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  return await $fetch('https://api.github.com/repos/nuxt/nuxt', {
    headers: { Authorization: `token ${config.githubToken}` },
  })
})
```

`nuxt.config.ts` 中 `runtimeConfig.githubToken` 仅服务端可见；传给 handler 的 `event` 可读取运行时覆盖的环境变量。

## 服务端工具与 #server 别名

```ts
// server/utils/formatUser.ts
export function formatUser(raw: { id: number; name: string }) {
  return { id: raw.id, displayName: raw.name.toUpperCase() }
}
```

```ts
// server/api/users/[id].get.ts
import { formatUser } from '#server/utils/formatUser'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  return formatUser({ id: Number(id), name: 'demo' })
})
```

`#server` 别名**只能在 `server/` 目录内**使用。

## 禁止混用 Vue 与 Nitro 代码

| 位置 | 可 import | 不可 import |
| ---- | --------- | ----------- |
| `server/api/` | `server/utils/`、`shared/`、Node API | Vue 组件、`app/composables/`、DOM API |
| `app/pages/` | composables、组件 | `server/` 专有工具（除非经 API 暴露） |

原因：服务端运行在 Nitro/h3 上下文，无 DOM、无 Vue 实例。浏览器专用代码（`window`、`document`、Canvas）不应出现在 `server/`。

## 命名空间与 catch-all

```
server/api/foo/
├── index.get.ts   → GET /api/foo
├── index.post.ts  → POST /api/foo
├── bar.get.ts     → GET /api/foo/bar
└── [...].ts       → /api/foo/* 未匹配时的 fallback
```

## 检查清单

- [ ] API 文件放在 `server/api/`，自动带 `/api` 前缀
- [ ] 使用 `defineEventHandler` 导出默认函数
- [ ] GET 用 `getQuery`，POST/PUT 用 `readBody`（配合 `.post.ts` 等）
- [ ] 动态段用 `[param].ts`，读取用 `getRouterParam`
- [ ] 返回 plain object 即 JSON；错误用 `createError`
- [ ] 前端初始数据用 `useFetch('/api/...')`，mutation 用 `$fetch` + `refresh`
- [ ] 密钥与 DB 访问仅放 server 端，经 `useRuntimeConfig`
- [ ] 不在 server 路由中 import Vue 组件或浏览器 API
- [ ] 全局日志/鉴权上下文放 `server/middleware/`，勿与 `app/middleware` 混淆

## 完整 CRUD 示例

```ts
// server/api/todos.get.ts
const todos = [{ id: 1, title: '示例' }]
export default defineEventHandler(() => todos)
```

```ts
// server/api/todos.post.ts
export default defineEventHandler(async (event) => {
  const { title } = await readBody(event)
  return { id: Date.now(), title }
})
```

```vue
<!-- app/pages/todos.vue -->
<script setup lang="ts">
const { data: todos, refresh } = await useFetch('/api/todos')

async function createTodo(title: string) {
  await $fetch('/api/todos', { method: 'POST', body: { title } })
  await refresh()
}
</script>

<template>
  <ul>
    <li v-for="t in todos" :key="t.id">{{ t.title }}</li>
  </ul>
  <button @click="createTodo('新任务')">添加</button>
</template>
```

## 小结

`server/api/` 以文件约定定义 Nitro API：`defineEventHandler` 处理请求，`getQuery` / `readBody` 读入参，按方法后缀分文件，返回 JSON。与 `app/` 严格分离；前端通过 `useFetch` / `$fetch` 调用。`server/middleware` 做请求级横切逻辑。

## 官方文档

- [Server（服务端入门）](https://nuxt.com/docs/4.x/getting-started/server)
- [server/ 目录结构](https://nuxt.com/docs/4.x/directory-structure/server)
- [Server Engine（Nitro 概念）](https://nuxt.com/docs/4.x/guide/concepts/server-engine)
