# 内置构造与包装对象

## 定义

JavaScript 在全局提供 **String、Number、Boolean、Array、Math、Date、JSON** 等内置对象，用于处理文本、数值、集合与时间等常见数据。原始类型在需要时可被**临时包装**为对应对象以调用方法，但日常应使用字面量而非 `new String()` 等包装构造。

## 概念要点

- **原始值 vs 引用值**：`string`、`number`、`boolean` 等是原始值；`Array`、`Date` 等是对象（按引用传递）。
- **装箱（boxing）**：访问 `'abc'.length` 时引擎临时创建 String 对象，用完即弃。
- **拆箱（unboxing）**：包装对象参与运算时转回原始值（如 `new Number(3) + 1` → `4`）。
- **不要用 `new String/Number/Boolean`**：会得到对象而非原始值，`typeof` 为 `'object'`，比较与序列化易出 bug。
- **数组方法** 已在 [循环与数组](./loops-arrays) 详述；本文侧重 String/Number/Math/Date/JSON 速查。

## 包装对象直觉

| 操作                 | 实际发生的事             | 建议          |
| -------------------- | ------------------------ | ------------- |
| `'hi'.toUpperCase()` | 临时装箱 → 调方法 → 拆箱 | ✅ 字面量即可 |
| `new String('hi')`   | 创建持久包装对象         | ❌ 避免       |
| `(42).toFixed(2)`    | Number 临时包装          | ✅            |
| `new Number(42)`     | 对象，`===` 与数字不等   | ❌            |
| `true && false`      | 原始布尔运算             | ✅            |
| `new Boolean(false)` | 对象永远 truthy          | ❌ 经典陷阱   |

```javascript
const s = "hello";
typeof s; // 'string'
typeof new String("hello"); // 'object' — 不要这样写

if (new Boolean(false)) {
  // 会执行！对象在布尔上下文中为 true
}
```

## String 常用方法

| 方法                             | 作用             | 示例                             |
| -------------------------------- | ---------------- | -------------------------------- |
| `length`                         | 字符数（非字节） | `'你好'.length` → 2              |
| `slice(start, end)`              | 截取子串         | `'abc'.slice(1)` → `'bc'`        |
| `includes(sub)`                  | 是否包含         | `'abc'.includes('b')` → true     |
| `startsWith` / `endsWith`        | 前缀 / 后缀      | 路径、扩展名校验                 |
| `indexOf` / `lastIndexOf`        | 查找位置         | 找不到返回 `-1`                  |
| `split(sep)`                     | 拆成数组         | `'a,b'.split(',')` → `['a','b']` |
| `trim` / `trimStart` / `trimEnd` | 去空白           | 表单输入清洗                     |
| `replace` / `replaceAll`         | 替换             | 支持字符串或正则                 |
| `toLowerCase` / `toUpperCase`    | 大小写           | 不修改原串，返回新串             |
| `padStart` / `padEnd`            | 填充到指定长度   | 格式化编号                       |

## Number / Math 常用

| API                                   | 作用                       |
| ------------------------------------- | -------------------------- |
| `Number.isNaN(x)`                     | 可靠检测 NaN               |
| `Number.isFinite(x)`                  | 有限数字                   |
| `Number.parseInt(str, 10)`            | 解析整数，**始终传进制**   |
| `Number.parseFloat(str)`              | 解析浮点                   |
| `toFixed(n)`                          | 固定小数位，返回**字符串** |
| `Math.floor` / `ceil` / `round`       | 向下 / 向上 / 四舍五入     |
| `Math.max(...)` / `Math.min(...)`     | 最大 / 最小                |
| `Math.random()`                       | [0, 1) 随机数              |
| `Math.abs` / `Math.sqrt` / `Math.pow` | 绝对值、开方、幂           |

```javascript
Number.parseInt("08", 10); // 8 — 始终指定进制 10
(3.14159).toFixed(2); // '3.14' — 字符串，展示用
Math.floor(Math.random() * 10); // 0–9 整数随机
```

## Date 与 JSON 速查

| Date                           | 说明                       |
| ------------------------------ | -------------------------- |
| `new Date()`                   | 当前时间                   |
| `new Date('2026-08-01')`       | ISO 字符串解析（注意时区） |
| `getFullYear()` / `getMonth()` | 年；月从 **0** 开始        |
| `getDate()` / `getDay()`       | 日；星期 0=周日            |
| `getTime()`                    | 毫秒时间戳                 |
| `toISOString()`                | UTC ISO 字符串             |

| JSON                  | 说明                                           |
| --------------------- | ---------------------------------------------- |
| `JSON.stringify(obj)` | 对象 → JSON 字符串                             |
| `JSON.parse(str)`     | JSON 字符串 → 值                               |
| 不支持                | `undefined`、函数、Symbol、`Date` 默认变字符串 |
| 循环引用              | `stringify` 会抛错                             |

## 示例

### 字符串处理

```javascript
const raw = "  user@example.com  ";
const email = raw.trim().toLowerCase(); // 去空白 + 小写

const path = "photo.jpg";
const isJpg = path.endsWith(".jpg"); // true

const csv = "apple,banana,cherry";
const fruits = csv.split(","); // ['apple', 'banana', 'cherry']
```

### 数值与格式化

```javascript
const price = 19.9;
const display = `¥${price.toFixed(2)}`; // '¥19.90'

const nums = [3, 1, 4, 1, 5];
Math.max(...nums); // 5 — 展开传入
```

### Date 与 JSON

```javascript
const now = new Date();
now.getMonth(); // 7 表示八月（0 起算）
now.toISOString(); // '2026-08-01T...'

const data = { name: "Alice", age: 30 };
const json = JSON.stringify(data); // '{"name":"Alice","age":30}'
const restored = JSON.parse(json); // 还原为对象
```

## 易错点与交叉引用

| 问题                        | 说明                                                   |
| --------------------------- | ------------------------------------------------------ |
| `new String/Number/Boolean` | 得到对象，破坏 `===` 与条件判断                        |
| `parseInt` 不传进制         | `'08'` 在旧环境可能被当八进制 → 始终 `parseInt(s, 10)` |
| `toFixed` 返回字符串        | 计算前需 `Number()` 转回                               |
| `Date.getMonth()` 从 0 开始 | 八月是 `7`                                             |
| `JSON.stringify` 丢字段     | `undefined`、函数、Symbol 键值会被忽略或省略           |
| 修改字符串「无效」          | 字符串不可变；方法都返回新串                           |

**相关章节**：[变量与类型](./variables-types) · [循环与数组](./loops-arrays) · [深浅拷贝 this 防抖](./advanced-patterns)（JSON 深拷贝局限）

## MDN 参考

- [JavaScript 数据类型和数据结构](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Data_structures)
- [String](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)
- [Number](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)
- [Math](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math)
- [Date](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [JSON](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON)
