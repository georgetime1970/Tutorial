# 组件与自动导入

## 定义

Nuxt 4 会**自动导入** `app/components/`、`app/composables/`、`app/utils/` 中的代码，以及 Vue / Nuxt 内置 API（如 `ref`、`computed`、`useFetch`）。你无需在每个文件手写 `import`，IDE 仍保留类型提示与补全；生产构建时只打包**实际使用**的符号（tree-shaking），并非传统意义上的「全局污染」。

## 自动导入范围一览

| 来源 | 目录/API | 示例 |
| ---- | -------- | ---- |
| 自定义组件 | `app/components/` | `<AppAlert />` |
| 组合式函数 | `app/composables/` | `useCounter()` |
| 工具函数 | `app/utils/` | `formatDate()` |
| Vue API | 内置 | `ref`、`computed`、`watch` |
| Nuxt 组合式函数 | 内置 | `useFetch`、`useRoute`、`navigateTo` |
| 服务端工具 | `server/utils/` | 仅在 `server/` 内自动导入 |

## 组件自动导入与命名规则

`app/components/` 下的 `.vue` 文件按**路径**生成组件名：

| 文件路径 | 模板中使用的名称 |
| -------- | ---------------- |
| `app/components/AppAlert.vue` | `<AppAlert />` |
| `app/components/base/Button.vue` | `<BaseButton />` |
| `app/components/base/button/Primary.vue` | `<BaseButtonPrimary />` |

规则要点：

- 目录名与文件名拼接为 PascalCase
- 同名目录与文件会**去重**一段（如 `base/button` + `Button.vue` → `BaseButton`）
- 组件在首次使用时**异步加载**，利于代码分割

```vue
<!-- app/app.vue -->
<template>
  <div>
    <h1>欢迎</h1>
    <!-- 无需 import，直接使用 -->
    <AppAlert>这是一条提示</AppAlert>
    <BaseButton label="提交" />
  </div>
</template>
```

### 显式指定组件名

可在 SFC 中使用 `defineOptions` 覆盖默认名：

```vue
<!-- app/components/MyWidget.vue -->
<script setup lang="ts">
defineOptions({ name: 'CustomWidget' })
</script>
```

## Composables 自动导入

`app/composables/` 中导出的函数可在任意 `<script setup>`、插件、路由中间件中使用：

```ts
// app/composables/useCounter.ts
export function useCounter(initial = 0) {
  const count = ref(initial)
  const increment = () => count.value++
  return { count, increment }
}
```

```vue
<!-- app/pages/demo.vue -->
<script setup lang="ts">
const { count, increment } = useCounter(10)
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>
```

### 命名约定

- 文件名与导出函数名建议一致，且以 `use` 开头（如 `useAuth.ts` → `useAuth()`）
- 组合式函数内再调用其他 Nuxt composable（如 `useRuntimeConfig`）是安全的；**不要在模块顶层**直接调用 composable

```ts
// ❌ 错误：模块顶层调用，缺少 Nuxt 上下文
const config = useRuntimeConfig()
export function useMyFeature() { /* ... */ }

// ✅ 正确：在 composable 函数体内调用
export function useMyFeature() {
  const config = useRuntimeConfig()
  return { config }
}
```

## Vue / Nuxt 内置 API

以下在 `<script setup>` 中可直接使用，无需 import：

```vue
<script setup lang="ts">
const count = ref(0)                              // Vue
const doubled = computed(() => count.value * 2)   // Vue
const route = useRoute()                          // Nuxt
const { data } = await useFetch('/api/hello')     // Nuxt
</script>
```

### 上下文限制

多数 composable 必须在以下时机**同步**调用：

- Vue 组件的 `setup`（或 `<script setup>`）
- `defineNuxtPlugin`、`defineNuxtRouteMiddleware`
- `defineNuxtComponent` 包裹的组件

在普通 `async` 回调、`setTimeout` 或模块顶层调用会触发 `Nuxt instance is unavailable` 错误。

## 显式导入（#imports）

需要明确依赖来源，或关闭自动导入后，可从 `#imports` 手动引入：

```vue
<script setup lang="ts">
import { ref, computed, useFetch } from '#imports'

const count = ref(1)
const { data } = await useFetch('/api/data')
</script>
```

## 何时禁用或手动导入

| 场景 | 做法 |
| ---- | ---- |
| 与本地变量同名冲突 | 显式 `import { ref } from 'vue'` 或重命名 |
| 需要清晰依赖边界（库/SDK） | 手动 import |
| 关闭全部 auto-import | `imports.autoImport: false` |
| 仅关闭自定义 composable 扫描 | `imports.scan: false`（Vue API 仍自动导入） |
| 关闭组件自动导入 | `components.dirs: []` |

```ts
// nuxt.config.ts — 完全关闭 composable/utils 自动导入
export default defineNuxtConfig({
  imports: {
    autoImport: false,
  },
})
```

```ts
// nuxt.config.ts — 保留 Vue/Nuxt 内置，自定义代码需手动 import
export default defineNuxtConfig({
  imports: {
    scan: false,
  },
})
```

```ts
// nuxt.config.ts — 关闭 components 目录扫描
export default defineNuxtConfig({
  components: {
    dirs: [],
  },
})
```

## Tree-shaking 说明

- 自动导入**不等于**整库打进 bundle：构建工具分析模板 与 script 中的引用，未使用的组件/composable **不会**进入产物
- 与「全局 `app.component()` 注册」不同，Nuxt 保留 per-file 静态分析能力
- 开发时 `.nuxt/imports.d.ts` 与 `.nuxt/components.d.ts` 提供类型；改目录结构后若类型过期，重启 dev server

## 第三方包自动导入

可通过 `imports.presets` 配置第三方导出：

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  imports: {
    presets: [
      {
        from: 'vue-i18n',
        imports: ['useI18n'],
      },
    ],
  },
})
```

许多 Nuxt Module 会替你配置对应 preset。

## 检查清单

- [ ] 可复用 UI 放 `app/components/`，逻辑复用放 `app/composables/`
- [ ] 组件名遵循路径 PascalCase 规则，避免模板中找不到组件
- [ ] composable 以 `use` 开头，且不在模块顶层调用 Nuxt composable
- [ ] 仅在 setup / 插件 / 中间件中调用 `useFetch`、`useRoute` 等
- [ ] 命名冲突时用显式 import 或 `#imports`
- [ ] 关闭 `scan` 时记得手动 import 自定义 composable（layers 覆盖行为会受影响）
- [ ] 生产构建后抽查 bundle，确认未误引入整库

## 示例：组件 + composable 协作

```ts
// app/composables/useTodos.ts
export function useTodos() {
  const { data, refresh } = useFetch('/api/todos')
  const addTodo = async (title: string) => {
    await $fetch('/api/todos', { method: 'POST', body: { title } })
    await refresh()
  }
  return { todos: data, addTodo }
}
```

```vue
<!-- app/components/TodoList.vue -->
<script setup lang="ts">
const { todos, addTodo } = useTodos()
</script>

<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">{{ todo.title }}</li>
  </ul>
  <BaseButton @click="addTodo('新任务')">添加</BaseButton>
</template>
```

```vue
<!-- app/pages/todos.vue -->
<template>
  <TodoList />
</template>
```

## 小结

Nuxt 4 的自动导入覆盖组件、composable、工具函数及 Vue/Nuxt API，按目录约定命名，生产环境仍 tree-shake。理解路径命名规则与 composable 上下文限制，必要时用 `#imports` 显式导入或调整 `nuxt.config` 关闭扫描。

## 官方文档

- [Auto-imports（自动导入概念）](https://nuxt.com/docs/4.x/guide/concepts/auto-imports)
- [Components（组件目录）](https://nuxt.com/docs/4.x/directory-structure/app/components)
- [Composables（组合式函数目录）](https://nuxt.com/docs/4.x/directory-structure/app/composables)
