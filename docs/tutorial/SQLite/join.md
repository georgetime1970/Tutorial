# JOIN

## 定义

**JOIN** 将多张表的行按关联条件组合成结果集。SQLite 支持 `INNER`、`LEFT`、`CROSS` 等连接；条件写在 `ON` 或 `USING` 中。以 [sqlite.org](https://www.sqlite.org/lang_select.html) 为准。

## 概念

### 连接类型

| 类型         | 行为                                           |
| ------------ | ---------------------------------------------- |
| INNER JOIN   | 仅保留两表均满足连接条件的行                   |
| LEFT JOIN    | 保留左表全部行；右表无匹配时右列填 NULL        |
| CROSS JOIN   | 笛卡尔积：左表每行 × 右表每行                  |
| RIGHT JOIN   | SQLite **3.39.0+** 支持；语义同「以右表为驱动的外连接」，可写 `RIGHT JOIN` 或改写为 `LEFT JOIN` 交换表顺序 |

SQLite 长期以 `LEFT JOIN` 为主流外连接写法；在新版本中 `RIGHT JOIN` 可用，但为兼容性仍建议用 `LEFT JOIN` 交换左右表。

### ON vs USING

- **ON**：任意布尔表达式，常用 `a.id = b.foreign_id`，可写不等号、多条件。
- **USING(col)**：两表同名列等值连接，结果中该列只出现一次；列名必须两表皆有。

### 连接顺序

引擎优化器可能重排 JOIN；编写时仍建议：**小表 / 过滤后的子查询作驱动表**，连接列上有索引。

## 清单表

| 场景               | 推荐写法                                      |
| ------------------ | --------------------------------------------- |
| 必须匹配才保留     | `INNER JOIN ... ON`                           |
| 保留主表全部记录   | `LEFT JOIN`，右表条件勿误写进 `WHERE`         |
| 枚举组合           | `CROSS JOIN`（或 `FROM a, b`）                |
| 同名列等值         | `JOIN ... USING(id)`                          |
| 多表               | 逐个 JOIN，每步写清 `ON`                      |
| 右外连接（新 SQLite）| `RIGHT JOIN` 或改写为 `LEFT JOIN`           |

## SQL 示例

```sql
-- 准备示例表（概念演示）
-- users(id, name)  orders(id, user_id, amount)

-- INNER JOIN：仅有订单的用户-订单对
SELECT u.name, o.amount
FROM users AS u
INNER JOIN orders AS o ON u.id = o.user_id;

-- LEFT JOIN：所有用户，无订单则 amount 为 NULL
SELECT u.name, o.amount
FROM users AS u
LEFT JOIN orders AS o ON u.id = o.user_id;

-- 错误示范：把右表过滤写在 WHERE，会把 LEFT JOIN 变成 INNER 效果
-- SELECT u.name, o.amount
-- FROM users u LEFT JOIN orders o ON u.id = o.user_id
-- WHERE o.status = 'paid';  -- 无订单用户被滤掉

-- 正确：右表条件放 ON
SELECT u.name, o.amount
FROM users AS u
LEFT JOIN orders AS o
  ON u.id = o.user_id AND o.status = 'paid';

-- USING：两表都有 user_id 列
SELECT user_id, u.name, o.amount
FROM users AS u
INNER JOIN orders AS o USING (user_id);

-- CROSS JOIN：颜色 × 尺寸 全组合
SELECT c.color, s.size
FROM colors AS c
CROSS JOIN sizes AS s;

-- 多表 JOIN
SELECT u.name, o.id, i.product_name
FROM users AS u
INNER JOIN orders AS o ON u.id = o.user_id
INNER JOIN order_items AS i ON o.id = i.order_id;

-- RIGHT JOIN（SQLite 3.39+）：以 orders 为驱动保留全部订单
-- 等价写法：FROM orders o LEFT JOIN users u ON ...
SELECT u.name, o.amount
FROM users AS u
RIGHT JOIN orders AS o ON u.id = o.user_id;
```

## 易错点

1. **LEFT JOIN + WHERE 过滤右表**：未匹配行的 NULL 在 `WHERE col = ...` 中被排除，外连接失效。
2. **USING 列名不一致**：两表列名必须相同，否则用 `ON`。
3. **缺少连接条件**：漏写 `ON`/`USING` 且非 CROSS JOIN 会报错或产生意外积。
4. **RIGHT JOIN 版本**：旧版 SQLite 不支持，部署到 D1/嵌入式时需确认版本。
5. **重复行**：一对多 JOIN 会使左表行重复，计数需 `COUNT(DISTINCT ...)` 或子查询聚合后再 JOIN。

## 参考链接

- [SELECT — JOIN 子句](https://www.sqlite.org/lang_select.html)
- [SQLite 3.39 发布说明（RIGHT JOIN）](https://www.sqlite.org/releaselog/3_39_0.html)
