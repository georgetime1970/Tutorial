# 对象

## 定义

**对象（Object）** 是键值对的集合，用于描述实体及其属性与方法。与数组不同，对象用字符串（或 Symbol）键访问数据，适合表示有命名属性的结构化信息。

## 概念要点

- **字面量** `{}` 是最常用的创建方式。
- **点语法** `obj.key` 访问已知属性名；**中括号** `obj['key']` 支持动态键名。
- **增删改查**：直接赋值添加/修改；`delete obj.key` 删除。
- **方法**：对象是属性的函数；调用时 `this` 指向该对象（入门认知即可，细节见进阶）。
- **浅拷贝**：展开 `{...obj}` 或 `Object.assign` 只复制一层引用。
- **数组是有序列表，对象是无序键值映射**（数组也是特殊对象，但语义不同）。

## 操作清单

| 操作      | 写法                      | 说明                |
| --------- | ------------------------- | ------------------- |
| 创建      | `const obj = { a: 1 }`    | 字面量              |
| 读取      | `obj.a` 或 `obj['a']`     | 中括号用于变量键    |
| 添加/修改 | `obj.b = 2`               | 不存在则添加        |
| 删除      | `delete obj.b`            | 返回布尔            |
| 判断属性  | `'a' in obj`              | 含原型链            |
| 自有属性  | `obj.hasOwnProperty('a')` | 仅自身              |
| 键列表    | `Object.keys(obj)`        | 可枚举自有键        |
| 值列表    | `Object.values(obj)`      | 自有值              |
| 键值对    | `Object.entries(obj)`     | `[key, value]` 数组 |
| 浅拷贝    | `{ ...obj }`              | 展开运算符          |

## 对象 vs 数组

| 特性     | 对象                       | 数组                         |
| -------- | -------------------------- | ---------------------------- |
| 键类型   | 字符串 / Symbol            | 数字索引（0 起）             |
| 用途     | 命名属性、实体             | 有序列表                     |
| 长度     | 无 `length`（除非自定义）  | 有 `length`                  |
| 典型遍历 | `for...in` / `Object.keys` | `for...of` / `forEach`       |
| 详见     | 本文                       | [循环与数组](./loops-arrays) |

## 示例

### 字面量与增删改查

```javascript
const user = {
  name: "小明", // 字符串属性
  age: 18,
  greet() {
    // 方法：对象内的函数
    return `我是 ${this.name}`; // this 指向 user
  },
};

user.email = "a@b.com"; // 添加属性
user.age = 19; // 修改属性
delete user.email; // 删除属性

console.log(user.name); // 点语法
const key = "name";
console.log(user[key]); // 中括号：动态键名
```

### Object.keys / values / entries

```javascript
const scores = { math: 90, english: 85 };

Object.keys(scores); // ['math', 'english']
Object.values(scores); // [90, 85]
Object.entries(scores); // [['math',90], ['english',85]]

for (const [subject, score] of Object.entries(scores)) {
  console.log(subject, score);
}
```

### 浅拷贝

```javascript
const original = { a: 1, nested: { b: 2 } };
const copy = { ...original }; // 浅拷贝：顶层独立

copy.a = 99;
copy.nested.b = 99; // nested 仍共享同一引用！

console.log(original.a); // 1 — 顶层未变
console.log(original.nested.b); // 99 — 嵌套对象被改
// 深拷贝见 [深浅拷贝 this 防抖](./advanced-patterns)
```

## 易错点与交叉引用

| 问题                  | 说明                                                   |
| --------------------- | ------------------------------------------------------ |
| 用数组存键值对        | 语义不清；应使用对象或 `Map`（见 [Api 总览](./jsapi)） |
| `this` 丢失           | 方法赋值给变量后调用，`this` 可能变 `undefined`        |
| 浅拷贝当深拷贝        | 嵌套对象仍共享引用                                     |
| `for...in` 遍历原型链 | 配合 `hasOwnProperty` 或 `Object.hasOwn`               |
| 对象比较              | `{a:1} === {a:1}` 为 false（不同引用）                 |
| 箭头函数方法          | 无 `this`，不适合需要对象自身引用的方法                |

**相关章节**：[变量与类型](./variables-types) · [函数与作用域](./functions-scope) · [循环与数组](./loops-arrays) · [构造函数与原型](./prototype)

## MDN 参考

- [对象基础](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Scripting/Object_basics)
- [Working with objects](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_objects)
- [Object](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)
- [this](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)
- [展开语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
