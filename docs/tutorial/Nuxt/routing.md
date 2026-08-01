# Nuxt 路由

## 文件系统路由

Nuxt 基于 **vue-router**，但从 **`app/pages/`** 目录结构**自动生成**路由表，无需手写 `routes` 配置。每个 `.vue` 文件对应一条 URL；Nuxt 还会为每个页面做**代码分割**，按需加载 JS。

> Nuxt 4 的页面目录是 **`app/pages/`**，不是 Nuxt 3 项目根下的 `pages/`。

## 路由映射规则

| 文件路径 | 生成路由 | 说明 |
| -------- | -------- | ---- |
| `app/pages/index.vue` | `/` | `index` 表示目录根 |
| `app/pages/about.vue` | `/about` | 静态段 |
| `app/pages/users/index.vue` | `/users` | 嵌套 index |
| `app/pages/users/[id].vue` | `/users/:id` | 动态参数 |
| `app/pages/posts/[...slug].vue` | `/posts/*` | 捕获所有剩余段 |
| `app/pages/users-[group].vue` | `/users-admin` 等 | 静态前缀 + 动态后缀 |

### 目录结构 → 路由表示例

```
app/pages/
├── index.vue           → /
├── about.vue           → /about
├── posts/
│   ├── index.vue       → /posts
│   └── [id].vue        → /posts/:id
└── docs/
    └── [...slug].vue   → /docs/*（catch-all）
```

## 导航：`<NuxtLink>`

`<NuxtLink>` 是 Nuxt 对 `<router-link>` 的封装，渲染带 `href` 的 `<a>` 标签，支持客户端导航（无整页刷新）与**预取**（链接进入视口时预加载目标页资源）。

```vue
<!-- app/pages/index.vue -->
<template>
  <nav>
    <ul>
      <!-- to 接受路径字符串或路由对象 -->
      <li><NuxtLink to="/about">关于</NuxtLink></li>
      <li><NuxtLink to="/posts/1">文章 1</NuxtLink></li>
      <li>
        <NuxtLink :to="{ path: '/posts', query: { sort: 'new' } }">
          最新文章
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
```

| 属性 | 作用 |
| ---- | ---- |
| `to` | 目标路径或路由位置对象 |
| `active-class` | 当前路由匹配时的 CSS 类 |
| `exact-active-class` | 精确匹配时的 CSS 类 |
| `external` | 强制作为普通外链处理 |
| `prefetch` | 控制是否预取（默认开启） |

## `useRoute` 与 `useRouter`

### `useRoute()` — 读取当前路由

返回当前路由的响应式对象：路径、参数、查询字符串等。

```vue
<!-- app/pages/posts/[id].vue -->
<script setup lang="ts">
const route = useRoute()

// 访问 /posts/42 时，route.params.id === '42'
const postId = computed(() => route.params.id)

// 查询参数：/posts/1?tab=comments → route.query.tab === 'comments'
const activeTab = computed(() => route.query.tab ?? 'content')
</script>

<template>
  <h1>文章 {{ postId }}</h1>
  <p>当前 Tab：{{ activeTab }}</p>
</template>
```

### `useRouter()` — 编程式导航

```vue
<script setup lang="ts">
const router = useRouter()

/** 跳转到指定路径 */
function goHome() {
  router.push('/')
}

/** 带参数跳转 */
function goToPost(id: string) {
  router.push({ path: `/posts/${id}`, query: { from: 'list' } })
}

/** 替换当前历史记录（不可后退） */
function replaceLogin() {
  router.replace('/login')
}
</script>
```

在路由中间件中，更推荐 Nuxt 提供的 **`navigateTo()`**（支持 SSR 与外部 URL）。

## 路由中间件

路由中间件在**客户端 Vue 应用**内的导航发生前执行，用于鉴权、重定向等。注意：与 **`server/middleware/`**（Nitro 服务端）完全不同，也不处理 `/api/*` 请求。

### 三种类型

| 类型 | 定义方式 | 触发时机 |
| ---- | -------- | -------- |
| 匿名（内联） | `definePageMeta` 内联函数 | 仅引用它的页面 |
| 命名 | `app/middleware/xxx.ts` | 页面 `definePageMeta({ middleware: 'xxx' })` 时 |
| 全局 | `app/middleware/xxx.global.ts` | 每次路由变化 |

### 命名中间件示例

```ts
// app/middleware/auth.ts
// 文件名 auth → 引用时 middleware: 'auth'（自动 kebab-case）
export default defineNuxtRouteMiddleware((to, from) => {
  const isLoggedIn = false // 替换为真实鉴权逻辑

  if (!isLoggedIn) {
    // 未登录则重定向到登录页，并记录原目标
    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath },
    })
  }
})
```

```vue
<!-- app/pages/dashboard.vue -->
<script setup lang="ts">
definePageMeta({
  middleware: 'auth', // 引用 app/middleware/auth.ts
})
</script>

<template>
  <h1>控制台</h1>
</template>
```

### 全局中间件示例

```ts
// app/middleware/log.global.ts
// .global 后缀 → 每个路由变化都执行
export default defineNuxtRouteMiddleware((to, from) => {
  console.log(`导航：${from.path} → ${to.path}`)
})
```

### 内联中间件示例

```vue
<script setup lang="ts">
definePageMeta({
  middleware: [
    // 仅本页使用的匿名中间件
    function (to, from) {
      if (to.params.id === '0') {
        return navigateTo('/posts')
      }
    },
    'auth', // 可同时组合命名中间件
  ],
})
</script>
```

## 路由验证：`definePageMeta` 的 `validate`

在页面渲染前校验路由参数是否合法；返回 `false` 触发 404，也可返回自定义错误对象。

```vue
<!-- app/pages/posts/[id].vue -->
<script setup lang="ts">
definePageMeta({
  validate(route) {
    // 仅允许数字 ID
    const id = route.params.id
    if (typeof id !== 'string') return false
    return /^\d+$/.test(id)
  },
})
</script>
```

```vue
<!-- 返回自定义错误状态 -->
<script setup lang="ts">
definePageMeta({
  validate(route) {
    if (route.params.id === '999') {
      return { status: 403, statusText: '无权访问此文章' }
    }
    return true
  },
})
</script>
```

复杂校验逻辑也可拆到 `app/middleware/` 中的命名中间件。

## 页面元数据：`definePageMeta`

`definePageMeta` 是编译宏，只能在 **`app/pages/`** 内使用，用于声明页面级配置：

| 字段 | 作用 |
| ---- | ---- |
| `layout` | 指定 `app/layouts/` 中的布局名 |
| `middleware` | 路由中间件（字符串或数组） |
| `validate` | 路由参数校验函数 |
| `title` / 自定义字段 | 配合 `useRoute().meta` 读取 |

```vue
<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
  title: '用户管理',
})
</script>
```

## 完整示例：文章详情页

```vue
<!-- app/pages/posts/[id].vue -->
<script setup lang="ts">
const route = useRoute()
const postId = computed(() => String(route.params.id))

// 路由校验：ID 必须为数字
definePageMeta({
  validate: (route) =>
    typeof route.params.id === 'string' && /^\d+$/.test(route.params.id),
})

// 根据动态参数获取数据（Nuxt 数据获取组合式函数）
const { data: post } = await useFetch(`/api/posts/${postId.value}`)
</script>

<template>
  <article v-if="post">
    <h1>{{ post.title }}</h1>
    <p>{{ post.body }}</p>
    <NuxtLink to="/posts">← 返回列表</NuxtLink>
  </article>
</template>
```

## 动态路由命名对照

| 文件名模式 | vue-router 路径 | 示例 URL |
| ---------- | --------------- | -------- |
| `[id].vue` | `/:id` | `/posts/42` |
| `[id]-[slug].vue` | `/:id-:slug` | `/posts/1-intro` |
| `[[optional]].vue` | `/:optional?` | `/users` 或 `/users/1` |
| `[...slug].vue` | `/*` | `/docs/a/b/c` |

## 小结

Nuxt 4 路由核心：`app/pages/` 文件即路由，`<NuxtLink>` 负责声明式导航，`useRoute`/`useRouter` 负责读取与编程式跳转，`app/middleware/` + `definePageMeta` 负责守卫与校验。掌握文件命名约定后，大多数路由需求无需手写 vue-router 配置。

## 官方文档

- [Routing（路由概览）](https://nuxt.com/docs/4.x/getting-started/routing)
- [Pages（页面目录）](https://nuxt.com/docs/4.x/directory-structure/app/pages)
- [NuxtLink 组件](https://nuxt.com/docs/4.x/api/components/nuxt-link)
- [useRoute](https://nuxt.com/docs/4.x/api/composables/use-route)
- [useRouter](https://nuxt.com/docs/4.x/api/composables/use-router)
- [Route Middleware（路由中间件）](https://nuxt.com/docs/4.x/directory-structure/app/middleware)
- [definePageMeta](https://nuxt.com/docs/4.x/api/utils/define-page-meta)
