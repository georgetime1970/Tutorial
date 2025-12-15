# JS 有数组类型吗?引申的数据类型详解

## 一、最严格的结论（基于规范）

> **JavaScript 在“语言层面”只有 8 种数据类型**

这是 **ECMAScript 2023+ 规范**里的正式定义（真实有据，不是经验说法）。

### ✅ 7 种「原始类型（Primitive Types，原始值）」

| 类型        | `typeof` 结果 | 说明                 |
| ----------- | ------------- | -------------------- |
| `Undefined` | `"undefined"` | 未赋值               |
| `Null`      | `"object"` ⚠️ | 空值（历史遗留 bug） |
| `Boolean`   | `"boolean"`   | 布尔值               |
| `Number`    | `"number"`    | 双精度浮点数         |
| `BigInt`    | `"bigint"`    | 任意精度整数         |
| `String`    | `"string"`    | 字符串               |
| `Symbol`    | `"symbol"`    | 唯一标识符           |

### ✅ 1 种「对象类型（Object）」

| 类型     | `typeof`   |
| -------- | ---------- |
| `Object` | `"object"` |

👉 **所有非原始值，统统属于 Object**

---

## 二、严格回答 JS 有数组类型吗?

### ❓ JS 有没有“数组类型”？

> **严格来说：没有。**

```js
typeof [] // "object"
```

### ❓ 数组是什么？

> **数组是 Object 的一种“内建子类型（built-in object）”**

也就是说：

- `Array` 是一个构造函数
- `[]` 是 `Array` 的实例
- 原型链：

  ```text
  [] → Array.prototype → Object.prototype
  ```

---

## 三、那为什么我们“平时”会说数组是一种类型？

这是**工程语义**，不是语言规范语义。

### 日常说法（非严格）

| 常说的“类型” | 严格规范里的身份        |
| ------------ | ----------------------- |
| 数组         | Object（Array 实例）    |
| 函数         | Object（Function 实例） |
| 正则         | Object（RegExp 实例）   |
| 日期         | Object（Date 实例）     |
| Map / Set    | Object                  |
| Promise      | Object                  |

👉 这些全是 **对象的具体形态（Object Subtypes）**

---

## 四、严格类型 vs 日常类型

### ① 规范层（最严格）

```text
Primitive：
- Undefined
- Null
- Boolean
- Number
- BigInt
- String
- Symbol

Reference：
- Object
```

👉 **一共 8 种**

---

### ② 日常工程层（语义友好）

```text
基础类型：
- number
- string
- boolean
- null
- undefined
- symbol
- bigint

引用类型：
- object
- array
- function
- date
- regexp
- map
- set
- promise
```

👉 **这是“方便交流”的分类，不是规范**

---

## 五、为什么 JS 规范要“故意不设数组类型”？

这是一个**非常高级但真实的设计点**：

### 1️⃣ 简化语言核心

- JS 只需要：

  - 原始值
  - 对象

- 所有复杂结构 → 对象扩展

---

### 2️⃣ 原型链机制更统一

```js
Array.prototype.push
Function.prototype.call
```

👉 全部复用对象模型

---

### 3️⃣ 极强的动态能力（好 & 坏并存）

```js
const arr = []
arr.foo = 123 // 合法
```

这在很多强类型语言里是不允许的

---

## 六、如何“严格判断”数组？（不是 typeof）

```js
Array.isArray(value)
```

👉 这是规范级推荐做法

---

## 七、我给你的「最严谨 + 最好记」总结

> ### ✅ 规范角度
>
> JS **只有 8 种数据类型**，数组不在其中
>
> ### ✅ 语义角度
>
> 数组是 **Object 的一种具体形态**
>
> ### ✅ 工程角度
>
> 我们“把数组当成一种类型”是为了方便交流和设计 API
