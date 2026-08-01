# 集合运算

## 定义

**集合运算**将两个 SELECT 的结果集按列位置合并或求交、差。要求：**列数相同、对应列类型兼容**（SQLite 动态类型较宽松，但仍应保证语义一致）。各 SELECT 可独立带 `WHERE`，但通常不带互斥的 `ORDER BY`（在最外层统一排序）。

## 概念

### UNION vs UNION ALL

| 运算符     | 行为                                   |
| ---------- | -------------------------------------- |
| UNION      | 合并后**去重**（同 DISTINCT）          |
| UNION ALL  | 合并**保留重复行**，一般更快           |

默认 `UNION` 会去重并可能排序；大数据量优先 `UNION ALL`，若业务允许重复。

### INTERSECT

- 两结果集的**交集**：同时出现在两边的行（整行相等）。
- `INTERSECT ALL`：保留重复次数为两集合重复次数的较小值（SQLite 支持）。

### EXCEPT

- 左结果集中**不在**右结果集的行（差集）。
- `EXCEPT ALL`：按多重集语义减（SQLite 支持）。

### 优先级与括号

SQLite 中 **`INTERSECT` 优先于 `UNION` / `EXCEPT`**。混合使用时加括号：

```sql
SELECT a FROM t1
UNION
SELECT a FROM t2
INTERSECT
SELECT a FROM t3;
-- 等价于 t1 UNION (t2 INTERSECT t3)
```

## 清单表

| 需求               | 运算符        | 备注                     |
| ------------------ | ------------- | ------------------------ |
| 合并且去重         | UNION         | 可能隐式排序             |
| 合并保留重复       | UNION ALL     | 性能更好                 |
| 共同行             | INTERSECT     | 两查询列对齐             |
| 左有右无           | EXCEPT        | 顺序重要                 |
| 最外层排序         | 包一层子查询再 ORDER BY |            |
| 列名               | 取**第一个** SELECT 的列名 |          |

## SQL 示例

```sql
-- UNION：合并两个来源的用户 ID（去重）
SELECT user_id FROM orders WHERE status = 'paid'
UNION
SELECT user_id FROM subscriptions WHERE active = 1;

-- UNION ALL：合并日志，允许重复
SELECT 'web' AS source, event_time, message FROM web_logs
UNION ALL
SELECT 'api', event_time, message FROM api_logs
ORDER BY event_time DESC;  -- 最外层排序

-- INTERSECT：既买过 A 类又买过 B 类的用户（简化示例）
SELECT user_id FROM orders WHERE product_category = 'book'
INTERSECT
SELECT user_id FROM orders WHERE product_category = 'electronics';

-- EXCEPT：有订单但无订阅的用户
SELECT user_id FROM orders
EXCEPT
SELECT user_id FROM subscriptions;

-- 列数须一致
SELECT id, name FROM users WHERE region = 'CN'
UNION ALL
SELECT id, name FROM archived_users;

-- 混合运算加括号
(SELECT tag FROM post_tags WHERE post_id = 1)
UNION
(SELECT tag FROM post_tags WHERE post_id = 2
 INTERSECT
 SELECT tag FROM banned_tags);

-- 用 UNION ALL 模拟 OR（不同表同结构）
SELECT id, title FROM articles WHERE published = 1
UNION ALL
SELECT id, title FROM drafts WHERE ready = 1;
```

## 易错点

1. **列数 / 顺序不一致**：第二 SELECT 列数不同会报错；列语义错配导致 silent bug。
2. **UNION 隐式去重开销**：大表合并用 `UNION ALL` + 外层 `DISTINCT` 或改写为单查询。
3. **ORDER BY 位置**：仅最外层 `UNION` 链末尾的 `ORDER BY` 作用于整体；子 SELECT 的 `ORDER BY` 无意义（除非配合 LIMIT）。
4. **EXCEPT 方向**：`A EXCEPT B` ≠ `B EXCEPT A`。
5. **NULL 相等**：集合比较中两行均为 NULL 的同一列，仍视为相等行。

## 参考链接

- [compound SELECT — UNION / INTERSECT / EXCEPT](https://www.sqlite.org/lang_select.html)
- [集合运算语义](https://www.sqlite.org/lang_select.html#compound_select_stmts)
