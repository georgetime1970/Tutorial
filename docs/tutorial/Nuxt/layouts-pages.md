# 布局与页面

## 定义

Nuxt 4 通过 **`app/app.vue`**、**`app/pages/`** 与 **`app/layouts/`** 三层协作实现视图：`app.vue` 是应用入口；`pages` 映射路由并承载页面内容；`layouts` 为多个页面提供共享外壳（导航、页脚等）。若你已熟悉 Vue Router，可把 **`NuxtPage`** 理解为 `<RouterView>`，**`NuxtLayout`** 理解为可切换的布局包装器。

## 视图层级关系

```
app/app.vue          ← 全局入口（每个路由都会渲染）
  └─ NuxtLayout      ← 按页面 meta 选择布局
       └─ NuxtPage  ← 当前路由对应的 page 组件
```

| 层级 | 文件/组件 | 职责 |
| ---- | --------- | ---- |
| 入口 | `app/app.vue` | 挂载 `<NuxtLayout>` + `<NuxtPage>`，可放全局 UI |
| 布局 | `app/layouts/*.vue` | 共享外壳，用 `<slot />` 插入页面内容 |
| 页面 | `app/pages/**/*.vue` | 与 URL 一一对应的具体视图 |

## 启用布局与页面

使用文件路由时，在 `app/app.vue` 中启用布局与页面渲染：

```vue
<!-- app/app.vue -->
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

若删除 `app/app.vue`，Nuxt 会使用默认入口；但自定义全局结构时，保留 `app.vue` 是常见做法。

## 默认布局

创建 `app/layouts/default.vue`，未指定布局的页面会自动使用它：

```vue
<!-- app/layouts/default.vue -->
<template>
  <div class="layout-default">
    <header>站点导航</header>
    <main>
      <slot />
      <!-- 页面内容渲染于此 -->
    </main>
    <footer>页脚</footer>
  </div>
</template>
```

布局文件必须有一个**根元素**（不能是 `<slot />` 本身），以便 Nuxt 在布局切换时应用过渡动画。

## 命名布局与切换

### 目录结构

```
app/layouts/
├── default.vue    ← 默认布局
├── admin.vue      ← 命名布局，name 为 admin
└── auth.vue       ← 命名布局，name 为 auth
```

### 通过 definePageMeta 指定

```vue
<!-- app/pages/admin/dashboard.vue -->
<script setup lang="ts">
definePageMeta({
  layout: 'admin', // 使用 app/layouts/admin.vue
})
</script>

<template>
  <h1>管理后台</h1>
</template>
```

布局名会规范化为 **kebab-case**：`someLayout` → `some-layout`。

### 动态切换布局

```vue
<!-- app/pages/login.vue -->
<script setup lang="ts">
definePageMeta({ layout: false }) // 先禁用默认布局

function switchToAuthLayout() {
  setPageLayout('auth') // 运行时切换
}
</script>

<template>
  <button @click="switchToAuthLayout">切换到 auth 布局</button>
</template>
```

### 在 app.vue 中覆盖默认布局

```vue
<!-- app/app.vue -->
<script setup lang="ts">
const layoutName = ref('default')
// 可根据登录态、API 结果等动态决定
</script>

<template>
  <NuxtLayout :name="layoutName">
    <NuxtPage />
  </NuxtLayout>
</template>
```

## 嵌套布局基础

布局目录可嵌套，名称由路径推导（去重段）：

| 文件路径 | 布局名 |
| -------- | ------ |
| `app/layouts/desktop/default.vue` | `desktop-default` |
| `app/layouts/desktop/index.vue` | `desktop` |
| `app/layouts/desktop-base/base.vue` | `desktop-base` |

建议文件名与布局名保持一致，便于维护。

### 页面内嵌套布局（layout: false）

需要更细粒度控制时，可在页面内直接使用 `<NuxtLayout>`：

```vue
<!-- app/pages/special.vue -->
<script setup lang="ts">
definePageMeta({ layout: false })
</script>

<template>
  <div>
    <NuxtLayout name="custom">
      <template #header>自定义头部插槽</template>
      页面主体内容
    </NuxtLayout>
  </div>
</template>
```

注意：页面内使用 `<NuxtLayout>` 时，它**不能**作为页面的根元素，否则布局/页面过渡可能异常。

## Pages vs Components

| 对比项 | `app/pages/` | `app/components/` |
| ------ | ------------ | ----------------- |
| 路由 | 自动生成 URL | 无路由，需被引用 |
| 用途 | 完整页面视图 | 可复用 UI 片段 |
| 布局 meta | 支持 `definePageMeta` | 不支持 |
| 数据获取 | 可在 setup 中 `await useFetch` | 同 Vue 组件规则 |
| 命名 | 由文件路径决定 URL | 由路径决定组件名（自动导入） |

**原则**：页面负责「这一 URL 展示什么」；组件负责「多处复用的 UI 块」。不要把整页逻辑塞进 `components/` 再手动挂路由。

## 页面文件路由速查

| 文件 | 路由 |
| ---- | ---- |
| `app/pages/index.vue` | `/` |
| `app/pages/about.vue` | `/about` |
| `app/pages/users/[id].vue` | `/users/:id` |
| `app/pages/blog/[...slug].vue` | 捕获多级路径 |

动态路由参数通过 `useRoute().params` 读取（自动导入）。

## definePageMeta 常用字段

| 字段 | 说明 |
| ---- | ---- |
| `layout` | 布局名，或 `{ name, props }` 传 props 给布局 |
| `layout: false` | 不使用任何布局 |
| `middleware` | 路由中间件（见路由章节） |
| `title` | 页面标题（需配合 head 配置） |

```vue
<script setup lang="ts">
definePageMeta({
  layout: {
    name: 'panel',
    props: { sidebar: true, title: '仪表盘' },
  },
})
</script>
```

## 检查清单

- [ ] `app/app.vue` 中包含 `<NuxtLayout>` 与 `<NuxtPage>`（若使用 pages 路由）
- [ ] 布局文件有单一根元素，且包含 `<slot />`
- [ ] 命名布局文件名与 `definePageMeta({ layout: '...' })` 一致
- [ ] 共享 UI 放 `components/`，整页视图放 `pages/`
- [ ] 仅需单一布局且无复杂切换时，可考虑直接在 `app.vue` 写外壳，省略 `layouts/`
- [ ] 动态布局用 `setPageLayout()` 或在 `app.vue` 绑定 `:name`
- [ ] 页面内嵌套 `<NuxtLayout>` 时设置 `layout: false`，且不作为根元素

## 示例：完整三页应用

```vue
<!-- app/app.vue -->
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

```vue
<!-- app/layouts/default.vue -->
<template>
  <div>
    <nav>
      <NuxtLink to="/">首页</NuxtLink>
      <NuxtLink to="/about">关于</NuxtLink>
    </nav>
    <slot />
  </div>
</template>
```

```vue
<!-- app/pages/index.vue -->
<template>
  <h1>首页</h1>
</template>
```

```vue
<!-- app/pages/about.vue -->
<script setup lang="ts">
definePageMeta({ layout: 'default' })
</script>

<template>
  <h1>关于我们</h1>
</template>
```

## 小结

Nuxt 4 的视图体系：`app.vue` 作入口，`NuxtPage` 渲染当前路由页面，`NuxtLayout` 包裹共享外壳。布局放在 `app/layouts/`，通过 `definePageMeta`、`setPageLayout` 或 `app.vue` 的 `:name` 切换；页面与组件职责分离，pages 映射 URL，components 复用 UI。

## 官方文档

- [Views（视图概览）](https://nuxt.com/docs/4.x/getting-started/views)
- [Layouts（布局）](https://nuxt.com/docs/4.x/directory-structure/app/layouts)
- [Pages（页面）](https://nuxt.com/docs/4.x/directory-structure/app/pages)
