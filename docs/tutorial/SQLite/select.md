# SELECT 与 FROM

## 定义

**SELECT** 语句用于从一张或多张表中读取行与列，是 SQL 查询的核心。书写顺序与引擎实际执行的**逻辑顺序**不同；理解两者有助于写出正确、高效的查询。

## 概念

### 书写顺序 vs 逻辑执行顺序

| 书写顺序（你写的） | 逻辑执行顺序（引擎做的） |
| ------------------ | ------------------------ |
| SELECT             | FROM / JOIN              |
| FROM               | WHERE                    |
| WHERE              | GROUP BY                 |
| GROUP BY           | HAVING                   |
| HAVING             | SELECT（列、表达式）     |
| ORDER BY           | DISTINCT                 |
| LIMIT / OFFSET     | ORDER BY                 |
|                    | LIMIT / OFFSET           |

要点：**WHERE 在 SELECT 列别名之前执行**，因此 `WHERE` 子句中通常不能引用 SELECT 里定义的列别名（除非外层再包一层子查询）。聚合、窗口函数等见 [聚合与窗口](./agg-window)。

### SELECT 列

- `*`：所有列（调试可用，生产环境建议显式列名）。
- `表名.列名` 或 `别名.列名`：多表时消歧义。
- **表达式**：算术、函数、子查询均可作为列，建议起别名便于阅读。

### 别名（AS）

```sql
SELECT price * qty AS amount FROM order_items;
SELECT u.name user_name FROM users u;  -- AS 可省略
```

别名可用于 `ORDER BY`；在 SQLite 中也可用于 `GROUP BY`、`HAVING`（同一 SELECT 层级）。同一 SELECT 列表中的列别名**不能**在同层 `WHERE` 中引用。

### DISTINCT

- `SELECT DISTINCT col`：按列组合去重，保留每组一行。
- `SELECT DISTINCT col1, col2`：以 `(col1, col2)` 元组为单位去重。
- 与 `GROUP BY col` 类似但语义不同：`DISTINCT` 不聚合，只去重。

### FROM

- 单表：`FROM table_name [AS alias]`。
- 多表：`FROM t1 JOIN t2 ...`（见 [JOIN](./join)）。
- **逗号连接**：`FROM a, b` 等价于 `CROSS JOIN`，易产生笛卡尔积，不推荐隐式写法。

## 清单表

| 项目           | 说明                                      |
| -------------- | ----------------------------------------- |
| 显式列名       | 避免 `*`，便于索引覆盖与 schema 变更      |
| 表别名         | 多表查询缩短前缀，提高可读性              |
| 列别名         | 表达式、函数结果必须命名                    |
| DISTINCT       | 全行去重用 `DISTINCT *` 或指定列组合      |
| FROM 顺序      | 驱动表、JOIN 顺序影响计划，大表注意索引   |
| 子查询作 FROM  | `FROM (SELECT ...) AS sub` 需有别名        |

## SQL 示例

```sql
-- 基本查询：指定列与表别名
SELECT
  p.id,
  p.title,
  p.price
FROM products AS p
WHERE p.active = 1;

-- 表达式列与别名
SELECT
  id,
  price,
  price * 0.9 AS sale_price,  -- 折后价
  length(title) AS title_len   -- 标题长度
FROM products;

-- DISTINCT：去重类别
SELECT DISTINCT category
FROM products
ORDER BY category;

-- 多列 DISTINCT
SELECT DISTINCT category, brand
FROM products;

-- FROM 子查询（派生表必须有别名）
SELECT sub.category, sub.cnt
FROM (
  SELECT category, COUNT(*) AS cnt
  FROM products
  GROUP BY category
) AS sub
WHERE sub.cnt > 5;

-- 逗号连接 vs 显式 JOIN（推荐后者）
-- 不推荐：FROM orders o, customers c WHERE o.customer_id = c.id
SELECT o.id, c.name
FROM orders AS o
INNER JOIN customers AS c ON o.customer_id = c.id;
```

## 易错点

1. **在 WHERE 里用 SELECT 别名**：逻辑上 SELECT 尚未执行，应写完整表达式或包一层子查询。
2. **`SELECT *` 与 schema 变更**：新增列会改变结果形状，API 层易出错。
3. **`DISTINCT` 与 `ORDER BY`**：`ORDER BY` 表达式须出现在 SELECT 列表中，或为 `DISTINCT` 所涉列之一（SQLite 规则）。
4. **隐式逗号 JOIN**：忘记 `WHERE` 连接条件会得到笛卡尔积，行数爆炸。
5. **派生表缺别名**：`FROM (SELECT ...) sub` 中 `AS sub` 在 SQLite 中必填。

## 参考链接

- [SELECT 语法](https://www.sqlite.org/lang_select.html)
- [FROM 子句](https://www.sqlite.org/syntax/select-stmt.html)
