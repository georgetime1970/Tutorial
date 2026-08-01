# 变量与类型

## 定义

**变量**用于在程序中命名并存储数据；**类型**描述数据的种类与可执行的操作。JavaScript 是动态类型语言：同一变量可在运行时持有不同类型的值。

## 概念要点

- **优先 `const`，需要重新赋值时用 `let`**：避免意外修改与作用域混乱。
- **`var` 已过时**：函数作用域、变量提升易导致 bug；新项目勿用。
- **7 种原始类型 + 1 种引用类型 `object`**：原始值按值传递，对象按引用传递。
- **`typeof` 检测类型**：对大部分原始类型有效；`typeof null === 'object'` 是历史遗留。
- **显式转换优于依赖隐式**：用 `Number()`、`String()`、`Boolean()` 更清晰。
- **`undefined` vs `null`**：`undefined` 表示未赋值；`null` 表示刻意空值。

## 变量声明对比

| 关键字  | 作用域 | 可重新赋值       | 必须初始化 | 推荐            |
| ------- | ------ | ---------------- | ---------- | --------------- |
| `const` | 块     | 否（绑定不可变） | 是         | ✅ 默认首选     |
| `let`   | 块     | 是               | 否         | ✅ 需要重赋值时 |
| `var`   | 函数   | 是               | 否         | ❌ 避免使用     |

### 命名规范

| 规则                   | 示例                                 |
| ---------------------- | ------------------------------------ |
| 驼峰命名               | `userName`、`totalCount`             |
| 常量语义（全大写可选） | `MAX_SIZE`、`API_URL`                |
| 有意义的名             | `isLoggedIn` 优于 `flag`             |
| 合法字符               | 字母、数字、`_`、`$`；不能以数字开头 |
| 保留字不可用           | `class`、`return` 等                 |

## 类型速查

| 类型        | 示例                           | typeof 结果               | 说明                       |
| ----------- | ------------------------------ | ------------------------- | -------------------------- |
| `string`    | `'你好'`、`"hi"`、`` `模板` `` | `'string'`                | 文本                       |
| `number`    | `42`、 `3.14`、`NaN`           | `'number'`                | 双精度浮点；无单独整数类型 |
| `bigint`    | `100n`                         | `'bigint'`                | 大整数                     |
| `boolean`   | `true`、`false`                | `'boolean'`               | 逻辑值                     |
| `undefined` | `undefined`                    | `'undefined'`             | 未定义                     |
| `null`      | `null`                         | `'object'` ⚠️             | 空值引用                   |
| `symbol`    | `Symbol('id')`                 | `'symbol'`                | 唯一标识符                 |
| `object`    | `{}`、`[]`、函数               | `'object'` / `'function'` | 引用类型                   |

## 类型转换

| 转换     | 写法                    | 注意                                        |
| -------- | ----------------------- | ------------------------------------------- |
| 转数字   | `Number('42')` → `42`   | `Number('')` → `0`；`Number('abc')` → `NaN` |
| 转字符串 | `String(123)` → `'123'` | 模板字符串 `` `${x}` `` 常用                |
| 转布尔   | `Boolean(0)` → `false`  | 假值：`0`、`''`、`null`、`undefined`、`NaN` |
| 隐式转换 | `'5' + 1` → `'51'`      | `+` 遇字符串会拼接；比较时用 `===`          |

## 示例

### const / let 基本用法

```javascript
const PI = 3.14159; // 常量：绑定不可重新赋值
let count = 0; // 可变变量
count = count + 1; // 允许重新赋值

// const obj = {}; obj.name = 'a';  // ✅ 对象属性可改
// PI = 4;                         // ❌ 报错：不能给 const 重新赋值
```

### typeof 与特殊值

```javascript
typeof "hello"; // 'string'
typeof 42; // 'number'
typeof undefined; // 'undefined'
typeof null; // 'object' — 历史 bug，判空用 === null
Number.isNaN(NaN); // true — 不要用 NaN === NaN
```

### 显式类型转换

```javascript
const input = "42";
const num = Number(input); // 42
const str = String(num); // '42'
const flag = Boolean(num); // true

// 隐式转换陷阱
console.log("5" + 1); // '51' — 字符串拼接
console.log("5" - 1); // 4 — 减号触发数字转换
```

## 易错点与交叉引用

| 问题                       | 说明                                                                    |
| -------------------------- | ----------------------------------------------------------------------- |
| 用 `var` 声明循环变量      | 循环结束后变量仍存在且值为最终迭代值 → 用 `let`                         |
| `typeof null === 'object'` | 判空请用 `value === null`                                               |
| `NaN` 不等于自身           | 用 `Number.isNaN(x)` 检测                                               |
| 隐式 `==` 比较             | `'0' == 0` 为 true → 见 [运算符与语句](./operators-statements) 用 `===` |
| 未声明直接赋值             | 严格模式下报错；始终用 `const`/`let` 声明                               |
| 对象「常量」误解           | `const` 只保证绑定不变，对象内部属性仍可修改 → 见 [对象](./objects)     |

**相关章节**：[运算符与语句](./operators-statements) · [循环与数组](./loops-arrays) · [函数与作用域](./functions-scope) · [Api 总览](./jsapi)

## MDN 参考

- [变量：存放所需信息的地方](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Scripting/Variables)
- [JavaScript 数据类型和数据结构](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Data_structures)
- [typeof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)
- [类型转换](https://developer.mozilla.org/zh-CN/docs/Glossary/Type_coercion)
- [null](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null)
- [undefined](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)
- [NaN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)
