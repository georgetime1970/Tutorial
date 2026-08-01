# 标量函数

## 定义

**标量函数**对单个值（或每行一个值）计算并返回一个结果，可用于 `SELECT`、`WHERE`、`ORDER BY` 等任意表达式位置。SQLite 内置字符串、日期时间、数学、JSON 等函数；完整列表见官方，本节为实用清单 + 短例，非全手册。

## 概念

### 字符串

| 函数 / 语法        | 作用                              |
| ------------------ | --------------------------------- |
| length(s)          | 字符长度（UTF-8 字节数需注意）    |
| substr(s, start, len) | 子串；start 从 1 起            |
| replace(s, from, to) | 替换所有匹配子串               |
| trim(s) / ltrim / rtrim | 去空白或指定字符集           |
| lower(s) / upper(s)| 大小写转换（ASCII）               |
| \|\|               | 字符串连接                        |
| instr(s, sub)      | 子串位置，0 表示未找到            |
| printf(fmt, ...)   | 格式化                            |

### 日期与时间

SQLite 无独立 DATE 类型；常以 **ISO-8601 文本** `'YYYY-MM-DD HH:MM:SS'` 存储，用函数解析。

| 函数                          | 作用                                    |
| ----------------------------- | --------------------------------------- |
| date(timestring, mod, ...)    | 日期部分                                |
| time(timestring, mod, ...)    | 时间部分                                |
| datetime(timestring, mod, ...) | 日期时间                             |
| julianday(timestring)         | 儒略日，便于日期差运算                  |
| strftime(fmt, timestring, ...) | 按格式输出，如 `'%Y-%m-%d'`          |

修饰符示例：`date('now')`、`datetime('now', '-7 days')`、`date('now', 'start of month')`。

### 数学

| 函数              | 作用           |
| ----------------- | -------------- |
| abs(x)            | 绝对值         |
| round(x, n)       | 四舍五入       |
| ceil / floor      | 上 / 下取整    |
| max(a,b,...) min  | 二元比较       |
| random()          | 随机整数       |
| typeof(x)         | 存储类型名     |

### JSON（SQLite 3.38+ JSON 扩展，通常默认启用）

| 函数 / 操作            | 作用                         |
| ---------------------- | ---------------------------- |
| json_extract(json, path) | 取值，path 如 `'$.name'` |
| json_object(k, v, ...) | 构造 JSON 对象               |
| json_array(v, ...)     | 构造 JSON 数组               |
| json_each / json_tree  | 行化遍历                     |
| -> / ->>               | 3.38+ 简写路径（若启用）     |

JSON 列常用 **TEXT** 存储；校验可用 `json_valid(json)`。

## 清单表

| 类别   | 常用场景              | 首选函数                          |
| ------ | --------------------- | --------------------------------- |
| 拼接   | 全名、地址            | `\|\|` 或 `printf`                |
| 截取   | 前缀、后缀            | `substr`                          |
| 清理   | 用户输入              | `trim` + `lower`                  |
| 当天   | 过滤今日记录          | `date(col) = date('now')`         |
| 近 N 天| 时间范围              | `col >= datetime('now', '-30 days')` |
| 格式化 | 报表展示              | `strftime('%Y-%m-%d', col)`       |
| JSON 字段 | 读嵌套属性         | `json_extract(data, '$.id')`      |
| 构造 JSON | API 响应           | `json_object('id', id, 'name', name)` |

## SQL 示例

```sql
-- 字符串
SELECT
  lower(trim(email)) AS email_norm,
  substr(phone, 1, 3) || '****' || substr(phone, -4) AS masked_phone,
  replace(notes, '\n', ' ') AS notes_one_line,
  length(title) AS title_len
FROM users;

-- 连接
SELECT first_name || ' ' || last_name AS full_name FROM users;

-- 日期
SELECT id, created_at
FROM orders
WHERE date(created_at) = date('now');

SELECT id, created_at
FROM orders
WHERE created_at >= datetime('now', '-7 days');

SELECT
  strftime('%Y-%m', created_at) AS month,
  COUNT(*) AS cnt
FROM orders
GROUP BY month;

SELECT julianday('2026-01-01') - julianday('2025-01-01') AS days_diff;

-- 数学
SELECT round(price * 1.13, 2) AS price_with_tax FROM products;

-- JSON
SELECT
  id,
  json_extract(payload, '$.user.name') AS user_name,
  json_extract(payload, '$.items[0].sku') AS first_sku
FROM events
WHERE json_valid(payload) = 1;

SELECT json_object(
  'id', id,
  'title', title,
  'price', price
) AS product_json
FROM products
LIMIT 3;
```

## 易错点

1. **substr 起始为 1**：不是 0；负索引表示从末尾计数。
2. **length 与字符数**：`length()` 为字节长度，多字节 UTF-8 与「字符个数」可能不一致。
3. **日期存非 ISO 格式**：`date()` 解析失败返回 NULL，比较结果异常。
4. **时区**：`now` 为 UTC；本地时间需应用层或 `strftime` 配合修饰符，SQLite 不内置时区表。
5. **json_extract 路径**：路径错误返回 NULL，与「字段值为 null」难区分，可结合 `json_type`。
6. **函数名大小写**：SQLite 不区分，但建议与文档一致便于搜索。

## 参考链接

- [内置函数总览](https://www.sqlite.org/lang_corefunc.html)
- [日期时间函数](https://www.sqlite.org/lang_datefunc.html)
- [JSON 函数](https://www.sqlite.org/json1.html)
- [字符串函数](https://www.sqlite.org/lang_corefunc.html)
