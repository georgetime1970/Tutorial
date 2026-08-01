# JavaScript API 总览

## 定义

**内置 API** 指 JavaScript 语言及浏览器环境提供的全局值、关键字、全局函数与核心对象方法。本文是浏览器端入门的**速查清单**，非完整百科；深入机制见 [内置构造与包装](./builtin-objects) 与阮一峰教程等。

## 概念要点

- **全局对象（浏览器）**：`window` 是顶层对象；`var` 声明的全局变量会挂到 `window`（`let`/`const` 不会）。
- **原始类型 vs 包装对象**：`'abc'.length` 能调用方法，是因为临时包装；详见进阶。
- **可变 vs 不可变**：原始值不可变；数组/对象内容可变。
- **链式调用**：部分方法返回自身或新值，如 `'  hi  '.trim().toUpperCase()`。
- **异步 API**：`Promise` 是现代异步基础；DOM 事件见 [事件监听](./events)。

## 全局值与关键字（精简）

| 类别     | 名称                                 | 说明                               |
| -------- | ------------------------------------ | ---------------------------------- |
| 原始值   | `undefined`、`null`、`true`、`false` | 基础字面量                         |
| 数值     | `NaN`、`Infinity`                    | 非数字、无穷大                     |
| 全局对象 | `globalThis`                         | 跨环境统一全局引用                 |
| 类型检测 | `typeof`、`instanceof`               | 见 [变量与类型](./variables-types) |
| 声明     | `let`、`const`、`function`、`class`  | 勿用 `var`                         |
| 模块     | `import`、`export`                   | 见 [模块化](./modules)             |
| 严格     | `'use strict'`                       | module 默认严格                    |

## 全局函数（常用）

| 函数                   | 作用             | 示例                          |
| ---------------------- | ---------------- | ----------------------------- |
| `parseInt(str, radix)` | 解析整数         | `parseInt('42px', 10)` → `42` |
| `parseFloat(str)`      | 解析浮点数       | `parseFloat('3.14')` → `3.14` |
| `Number(val)`          | 转数字           | `Number('42')` → `42`         |
| `String(val)`          | 转字符串         | `String(123)` → `'123'`       |
| `Boolean(val)`         | 转布尔           | `Boolean('')` → `false`       |
| `isNaN(val)`           | 是否 NaN（有坑） | 优先 `Number.isNaN`           |
| `encodeURIComponent`   | URI 组件编码     | 拼 query 参数                 |
| `decodeURIComponent`   | URI 组件解码     |                               |
| `setTimeout(fn, ms)`   | 延迟执行         | 异步定时                      |
| `setInterval(fn, ms)`  | 周期执行         | 记得 `clearInterval`          |

## Object

| 方法                            | 作用                |
| ------------------------------- | ------------------- |
| `Object.keys(obj)`              | 自有可枚举键数组    |
| `Object.values(obj)`            | 自有可枚举值数组    |
| `Object.entries(obj)`           | `[key, value]` 数组 |
| `Object.assign(target, ...src)` | 浅合并到 target     |
| `Object.hasOwn(obj, key)`       | 是否有自有属性      |
| `Object.freeze(obj)`            | 冻结（浅）          |

详见 [对象](./objects)。

## Array

| 方法                        | 作用        | 变异      |
| --------------------------- | ----------- | --------- |
| `push/pop/shift/unshift`    | 增删首尾    | ✅        |
| `splice/slice`              | 删插 / 截取 | splice ✅ |
| `indexOf/includes`          | 查找        | ❌        |
| `find/findIndex`            | 条件查找    | ❌        |
| `forEach/map/filter/reduce` | 迭代变换    | ❌        |
| `some/every`                | 布尔判断    | ❌        |
| `join(sep)`                 | 拼接字符串  | ❌        |
| `sort(fn)`                  | 排序        | ✅        |
| `Array.isArray(val)`        | 是否数组    | ❌        |

详见 [循环与数组](./loops-arrays)。

## String

| 方法                           | 作用                          |
| ------------------------------ | ----------------------------- |
| `length`                       | 字符长度（属性）              |
| `charAt(i)` / `[i]`            | 取字符                        |
| `slice/start/end)`             | 截取                          |
| `indexOf/lastIndexOf/includes` | 查找                          |
| `toLowerCase/toUpperCase/trim` | 大小写 / 去空白               |
| `split(sep)`                   | 分割为数组                    |
| `replace/search/match`         | 正则相关 → [regexp](./regexp) |
| `startsWith/endsWith`          | 前缀 / 后缀判断               |
| `padStart/padEnd`              | 填充                          |

## Number / Math / Date

| 对象       | 常用 API                                                                       |
| ---------- | ------------------------------------------------------------------------------ |
| **Number** | `Number.isNaN`、`Number.isFinite`、`Number.parseInt`、`toFixed(n)`             |
| **Math**   | `Math.floor/ceil/round`、`Math.max/min`、`Math.random`、`Math.abs`、`Math.pow` |
| **Date**   | `new Date()`、`getFullYear/getMonth/getDate`、`getTime()`、`toISOString()`     |

```javascript
Math.floor(3.7); // 3 — 向下取整
Number(0.1 + 0.2).toFixed(1); // '0.3' — 格式化（字符串）
const now = new Date();
now.getFullYear(); // 当前年份
```

## JSON

| 方法                  | 作用               |
| --------------------- | ------------------ |
| `JSON.stringify(obj)` | 对象 → JSON 字符串 |
| `JSON.parse(str)`     | JSON 字符串 → 对象 |

```javascript
const data = { name: "小明", age: 18 };
const json = JSON.stringify(data); // '{"name":"小明","age":18}'
JSON.parse(json); // 还原对象
```

## Promise（入门）

| 方法                                   | 作用           |
| -------------------------------------- | -------------- |
| `new Promise((resolve, reject) => {})` | 创建异步任务   |
| `.then(fn)`                            | 成功回调       |
| `.catch(fn)`                           | 失败回调       |
| `.finally(fn)`                         | 无论成败都执行 |
| `Promise.all([...])`                   | 全部完成       |
| `Promise.resolve/reject`               | 快速创建       |

```javascript
fetch("/api/user") // fetch 返回 Promise
  .then((res) => res.json()) // 解析 JSON
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
```

## Map / Set

| 类型    | 用途                   | 常用 API                        |
| ------- | ---------------------- | ------------------------------- |
| **Map** | 键值对，键可为任意类型 | `set/get/has/delete/size/clear` |
| **Set** | 唯一值集合             | `add/has/delete/size/clear`     |

```javascript
const map = new Map();
map.set("name", "小明");
map.get("name"); // '小明'

const set = new Set([1, 2, 2, 3]);
set.size; // 3 — 自动去重
```

## 示例

### 综合小片段

```javascript
const users = [
  { name: "小明", score: 85 },
  { name: "小红", score: 92 },
];

const passed = users
  .filter((u) => u.score >= 60) // 过滤及格
  .map((u) => u.name); // 只取姓名

const uniqueNames = [...new Set(passed)]; // 去重（示例）
JSON.stringify({ list: uniqueNames }); // 序列化
```

## 易错点与交叉引用

| 问题                  | 说明                                            |
| --------------------- | ----------------------------------------------- |
| `parseInt` 无 radix   | 以 `0` 开头可能被当八进制；始终传 `10`          |
| `sort()` 默认字典序   | 数字排序需 `(a,b) => a - b`                     |
| `JSON.stringify` 丢失 | `undefined`、函数、Symbol 会被忽略              |
| `Date` 月份从 0 起    | `getMonth()` 0 = 一月                           |
| `Math.random` 非加密  | 安全随机用 `crypto.getRandomValues`             |
| 深拷贝                | `JSON.parse(JSON.stringify())` 仅适合 JSON 数据 |

**基础章节**：[简介与引入](./intro) · [变量与类型](./variables-types) · [运算符与语句](./operators-statements) · [循环与数组](./loops-arrays) · [函数与作用域](./functions-scope) · [对象](./objects) · [正则表达式](./regexp)

**进阶章节**：[内置构造与包装](./builtin-objects) · [作用域与闭包](./scope-closure) · [DOM 基础](./dom-basics)

## MDN 参考

- [JavaScript 标准内置对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects)
- [Object](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)
- [Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [String](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)
- [Number / Math / Date](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)
- [JSON](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON)
- [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Map / Set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)
