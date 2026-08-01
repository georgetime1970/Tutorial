# 正则表达式

## 定义

**正则表达式（Regular Expression）** 是描述字符串模式的工具，用于匹配、查找、替换与分割文本。在浏览器端常用于表单校验、数据清洗与搜索过滤。

## 概念要点

- **两种创建方式**：字面量 `/pattern/flags`（推荐）与 `new RegExp('pattern', 'flags')`（动态模式）。
- **元字符** 有特殊含义，在模式中需转义（如 `.` `*` `+` `?`）。
- **RegExp 方法**：`test()` 返回布尔；`exec()` 返回匹配详情或 `null`。
- **String 方法**：`match`、`search`、`replace`、`split` 均可接受正则。
- **修饰符（flags）** 改变匹配行为：`g` 全局、`i` 忽略大小写、`m` 多行等。
- **入门够用即可**；复杂回溯与性能优化见 MDN 与进阶资料。

## 创建方式

| 方式     | 示例                      | 适用                   |
| -------- | ------------------------- | ---------------------- |
| 字面量   | `/\d+/g`                  | 模式固定，推荐         |
| 构造函数 | `new RegExp('\\d+', 'g')` | 模式来自变量或用户输入 |

## 常用元字符

| 元字符  | 含义                    | 示例                       |
| ------- | ----------------------- | -------------------------- |
| `.`     | 任意单个字符（除换行）  | `/a.c/` 匹配 `abc`         |
| `\d`    | 数字 `[0-9]`            | `/\d+/` 一串数字           |
| `\D`    | 非数字                  |                            |
| `\w`    | 单词字符 `[A-Za-z0-9_]` |                            |
| `\s`    | 空白字符                | 空格、制表、换行           |
| `^`     | 行首                    | `/^https/` URL 开头        |
| `$`     | 行尾                    | `/\.com$/` 以 .com 结尾    |
| `*`     | 0 次或多次              | `/ab*/` → `a`、`ab`、`abb` |
| `+`     | 1 次或多次              | `/\d+/`                    |
| `?`     | 0 次或 1 次             | `/colou?r/` → color/colour |
| `{n,m}` | 重复 n 到 m 次          | `/\d{4}/` 四位数字         |
| `[abc]` | 字符集                  | `/[aeiou]/` 元音           |
| `( )`   | 捕获分组                | 提取子串                   |
| `\`     | 转义                    | `/\./` 匹配字面点号        |

## 修饰符

| 修饰符 | 含义                            |
| ------ | ------------------------------- |
| `g`    | global，全局匹配所有结果        |
| `i`    | ignore case，忽略大小写         |
| `m`    | multiline，`^`/`$` 匹配每行首尾 |
| `u`    | unicode，正确处理 Unicode       |
| `s`    | dotAll，`.` 匹配换行            |

## API 清单

| API                        | 所属   | 作用                    |
| -------------------------- | ------ | ----------------------- |
| `regex.test(str)`          | RegExp | 是否匹配，返回布尔      |
| `regex.exec(str)`          | RegExp | 首次匹配详情数组或 null |
| `str.match(regex)`         | String | 匹配结果数组或 null     |
| `str.search(regex)`        | String | 首次匹配索引或 -1       |
| `str.replace(regex, repl)` | String | 替换（`g` 替换全部）    |
| `str.split(regex)`         | String | 按模式分割为数组        |

## 示例

### test 与 match

```javascript
const emailPattern = /^[\w.-]+@[\w.-]+\.\w+$/; // 简单邮箱模式

emailPattern.test("user@example.com"); // true
emailPattern.test("invalid"); // false

const text = "订单号 12345，电话 67890";
text.match(/\d+/g); // ['12345', '67890'] — g 全局匹配
```

### replace 与 split

```javascript
const raw = "  hello   world  ";
raw.replace(/\s+/g, " ").trim(); // 'hello world' — 合并空白

const csv = "apple,banana,cherry";
csv.split(/,\s*/); // ['apple','banana','cherry']
```

### 表单校验

```javascript
const phoneInput = document.getElementById("phone");
const phoneRegex = /^1[3-9]\d{9}$/; // 大陆 11 位手机号（简化）

function validatePhone() {
  const value = phoneInput.value.trim();
  if (phoneRegex.test(value)) {
    return { ok: true, msg: "格式正确" };
  }
  return { ok: false, msg: "请输入有效手机号" };
}
```

## 易错点与交叉引用

| 问题                 | 说明                                             |
| -------------------- | ------------------------------------------------ |
| 忘记转义 `.` `*`     | 想匹配字面点号应写 `\.`                          |
| 无 `g` 的 replace    | 只替换第一个匹配                                 |
| 字面量 vs 字符串转义 | `RegExp` 中 `\\d` 才表示 `\d`                    |
| 复杂校验只靠正则     | 邮箱/URL 完整 RFC 极复杂；可结合 HTML5 `pattern` |
| 正则状态             | 带 `g` 的 regex 有 `lastIndex`，重复使用需注意   |
| 字符串方法           | 更多见 [Api 总览](./jsapi) String 节             |

**相关章节**：[变量与类型](./variables-types) · [函数与作用域](./functions-scope) · [Api 总览](./jsapi)

## MDN 参考

- [正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_expressions)
- [RegExp](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
- [RegExp.prototype.test](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)
- [String.prototype.match](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match)
- [String.prototype.replace](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
