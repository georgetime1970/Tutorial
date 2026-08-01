# GROUP BY 与 HAVING

## 定义

**GROUP BY** 将行按列值（或表达式）分成若干组，常配合聚合函数（`COUNT`、`SUM` 等）对每组汇总一行。**HAVING** 在分组形成之后过滤组，语义类似「组的 WHERE」。

## 概念

### GROUP BY

- 分组键：列名、表达式、列序号（不推荐）、别名（SQLite 允许同层别名）。
- SELECT 中非聚合列，原则上应出现在 `GROUP BY` 中（SQLite 历史上有宽松模式，但应遵循 SQL 标准以免歧义）。
- 一组一行：组内多行折叠为聚合结果。

### HAVING vs WHERE

| 子句   | 作用对象     | 执行阶段（逻辑顺序） |
| ------ | ------------ | -------------------- |
| WHERE  | 单行         | GROUP BY **之前**    |
| HAVING | 整组（聚合后）| GROUP BY **之后**    |

- 能用 `WHERE` 筛行就不要放到 `HAVING`（先减行再分组，更高效）。
- `HAVING` 可引用聚合函数，如 `HAVING COUNT(*) > 1`；`WHERE` 不能（除非子查询已聚合）。

### 与 DISTINCT

- `GROUP BY col` 与 `SELECT DISTINCT col` 不同：前者常带聚合，后者仅去重无汇总。

## 清单表

| 任务                 | 写法要点                              |
| -------------------- | ------------------------------------- |
| 按单列计数           | `GROUP BY col` + `COUNT(*)`           |
| 多列分组             | `GROUP BY a, b`                       |
| 过滤组               | `HAVING SUM(amount) > 1000`           |
| 先筛行再分组         | `WHERE ... GROUP BY ... HAVING ...`   |
| 排序分组结果         | `ORDER BY` 聚合别名或表达式           |
| 无匹配组             | 无行则不输出该组（非 LEFT JOIN 语义） |

## SQL 示例

```sql
-- 每类商品数量与均价
SELECT
  category,
  COUNT(*) AS product_count,
  AVG(price) AS avg_price
FROM products
WHERE active = 1           -- 先过滤行：仅活跃商品
GROUP BY category
HAVING COUNT(*) >= 3       -- 再过滤组：至少 3 个 SKU
ORDER BY avg_price DESC;

-- 每用户订单总额（多列分组键）
SELECT
  user_id,
  date(created_at) AS order_day,
  SUM(amount) AS daily_total
FROM orders
WHERE status = 'completed'
GROUP BY user_id, date(created_at);

-- WHERE 与 HAVING 分工
SELECT
  user_id,
  COUNT(*) AS order_cnt
FROM orders
WHERE created_at >= date('now', '-90 days')  -- 行级：近 90 天
GROUP BY user_id
HAVING COUNT(*) > 5;                          -- 组级：超过 5 单的用户

-- HAVING 引用聚合
SELECT
  department,
  AVG(salary) AS avg_sal
FROM employees
GROUP BY department
HAVING AVG(salary) > 80000;

-- 错误思路：WHERE 不能写聚合
-- SELECT user_id, COUNT(*) FROM orders WHERE COUNT(*) > 1 GROUP BY user_id;  -- 非法

-- 等价：用子查询先聚合再过滤
SELECT user_id, order_cnt
FROM (
  SELECT user_id, COUNT(*) AS order_cnt
  FROM orders
  GROUP BY user_id
) AS t
WHERE t.order_cnt > 1;
```

## 易错点

1. **SELECT 列不在 GROUP BY 中**：标准 SQL 不允许；SQLite 可能接受但结果不确定，生产环境避免。
2. **把行条件写进 HAVING**：逻辑正确但性能差，应优先 `WHERE`。
3. **空组**：某键值无行则不出现在结果；要「零计数」需 LEFT JOIN 维度表或 `GROUP BY` 全表扫描技巧。
4. **`COUNT(*)` vs `COUNT(col)`**：后者不计 NULL；计非空用 `COUNT(col)`，计行用 `COUNT(*)`。
5. **HAVING 无 GROUP BY**：SQLite 允许对整个结果集当一组过滤，少见，可读性差。

## 参考链接

- [GROUP BY / HAVING](https://www.sqlite.org/lang_select.html)
- [聚合函数](https://www.sqlite.org/lang_aggfunc.html)
