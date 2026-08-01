# WHERE 与运算符

## 定义

**WHERE** 子句在分组之前过滤行，条件为真（或非 UNKNOWN）的行进入后续 `GROUP BY`、`SELECT`。SQLite 提供比较、逻辑、模式匹配、集合与空值检测等运算符与谓词。

## 概念

### 比较与逻辑

| 运算符 / 关键字 | 含义                          |
| --------------- | ----------------------------- |
| `=`, `!=`, `<>` | 相等 / 不等                   |
| `<`, `>`, `<=`, `>=` | 大小比较               |
| `AND`, `OR`, `NOT` | 逻辑与、或、非             |
| `IS`, `IS NOT`  | 主要用于 NULL 判断            |

**三值逻辑**：与 `NULL` 比较（除 `IS NULL`）结果为 `UNKNOWN`，行被过滤。`WHERE` 只保留条件为 **TRUE** 的行。

### 集合与范围

| 谓词       | 说明                                           |
| ---------- | ---------------------------------------------- |
| `IN (...)` | 值在列表或子查询结果中                         |
| `NOT IN`   | 不在列表中；列表含 NULL 时结果可能全为 UNKNOWN |
| `BETWEEN a AND b` | 闭区间 `[a, b]`                         |

### 模式匹配

| 谓词   | 说明                                              |
| ------ | ------------------------------------------------- |
| `LIKE` | SQL 模式：`%` 任意长度，`_` 单字符；默认不区分大小写（ASCII） |
| `GLOB` | Unix 通配：`*` `?` `[abc]`；**区分大小写**        |
| `ESCAPE` | 自定义转义符，如 `LIKE '%\%%' ESCAPE '\'`      |

### 空值

- `IS NULL` / `IS NOT NULL`：唯一可靠的 NULL 检测方式。
- 勿写 `= NULL` 或 `!= NULL`。

### 表达式

WHERE 中可使用函数、算术、`CASE`、标量子查询；见 [标量函数](./scalar-functions)。列与字面量类型应兼容，避免隐式转换意外。

## 清单表

| 需求           | 写法示例                          |
| -------------- | --------------------------------- |
| 等值           | `status = 'active'`               |
| 多值           | `id IN (1, 2, 3)`                 |
| 范围           | `age BETWEEN 18 AND 65`           |
| 前缀匹配       | `name LIKE '张%'`                 |
| 大小写敏感匹配 | `code GLOB 'ABC*'`                |
| 可空列过滤     | `email IS NOT NULL`               |
| 复合条件       | `(a = 1 OR a = 2) AND b > 0`      |
| 子查询         | `id IN (SELECT user_id FROM ...)`  |

## SQL 示例

```sql
-- 比较与逻辑
SELECT id, name, age
FROM users
WHERE age >= 18 AND status = 'active';

SELECT id, name
FROM users
WHERE NOT (role = 'guest' OR role IS NULL);

-- IN 与 BETWEEN
SELECT product_id, qty
FROM order_items
WHERE product_id IN (101, 102, 103);

SELECT id, title, price
FROM products
WHERE price BETWEEN 10.0 AND 99.99;

-- LIKE：不区分大小写（ASCII）
SELECT id, email
FROM users
WHERE email LIKE '%@example.com';

-- GLOB：区分大小写
SELECT id, sku
FROM products
WHERE sku GLOB 'A??-????';

-- IS NULL
SELECT id, name
FROM users
WHERE deleted_at IS NULL;

-- 表达式与 CASE
SELECT id, price
FROM products
WHERE price * 0.8 > 50;

SELECT id, name
FROM users
WHERE CASE
  WHEN vip = 1 THEN points > 100
  ELSE orders_count > 0
END;

-- 子查询
SELECT id, name
FROM users
WHERE id IN (
  SELECT user_id FROM orders WHERE created_at > date('now', '-30 days')
);
```

## 易错点

1. **`= NULL` 永远未知**：必须用 `IS NULL`。
2. **`NOT IN` 与 NULL**：子查询或列表含 NULL 时，整谓词可能无 TRUE，行全被滤掉。
3. **`LIKE` 与索引**：前导 `%` 无法走普通 B-tree 索引；大量数据考虑 FTS 或前缀索引策略。
4. **`OR` 与索引**：`(a = 1 OR b = 2)` 常难用单索引，可改 `UNION` 或重构条件。
5. **字符串与数字比较**：SQLite 动态类型，`'10' > '2'` 按规则可能不符合直觉，保持类型一致。

## 参考链接

- [WHERE 子句](https://www.sqlite.org/lang_select.html)
- [表达式](https://www.sqlite.org/lang_expr.html)
- [LIKE / GLOB](https://www.sqlite.org/lang_expr.html#like)
