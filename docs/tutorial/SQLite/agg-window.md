# 聚合函数与窗口函数

## 定义

**聚合函数**将多行折叠为单个值（常与 `GROUP BY` 联用）。**窗口函数**在保留各行明细的同时，按「窗口」计算排名、累计、移动平均等；语法为 `函数(...) OVER (窗口定义)`。

## 概念

### 常用聚合函数

| 函数        | 作用                         | 备注                          |
| ----------- | ---------------------------- | ----------------------------- |
| COUNT(*)    | 行数                         | 含 NULL 行                    |
| COUNT(col)  | 非 NULL 的 col 个数          | NULL 不计                     |
| SUM(col)    | 求和                         | 忽略 NULL                     |
| AVG(col)    | 平均值                       | 忽略 NULL                     |
| MIN / MAX   | 最小 / 最大                  | 可比较类型                    |
| GROUP_CONCAT| 组内字符串连接               | 可选 `SEPARATOR`              |

无 `GROUP BY` 时，聚合作用于**整表一行**。

### 窗口函数 OVER 子句

```sql
函数(参数) OVER (
  [ PARTITION BY 分组列 [, ...] ]
  [ ORDER BY 排序列 [ASC|DESC] [, ...] ]
  [ 帧子句 ROWS | RANGE | GROUPS ... ]  -- 进阶，清单级略
)
```

| 子句           | 作用                                           |
| -------------- | ---------------------------------------------- |
| PARTITION BY   | 划分子窗口，组内独立计算（类似 GROUP BY 分组界） |
| ORDER BY       | 定义窗口内行顺序，影响 `ROW_NUMBER`、累计等     |
| 帧（Frame）    | 限定当前行前后哪些行参与计算                   |

### 常用窗口函数（清单级）

| 函数 / 语法              | 用途                 |
| ------------------------ | -------------------- |
| ROW_NUMBER()             | 组内连续序号 1,2,3…  |
| RANK() / DENSE_RANK()    | 排名（并列处理不同） |
| NTILE(n)                 | 分成 n 桶            |
| SUM(x) OVER (...)        | 累计和、组内和       |
| AVG(x) OVER (...)        | 移动 / 组内平均      |
| LAG(col, n) / LEAD(col, n) | 前 / 后 n 行值   |
| FIRST_VALUE / LAST_VALUE | 窗口帧首 / 末值      |

SQLite **3.25.0+** 支持窗口函数；部署环境需确认版本（含 Cloudflare D1）。

## 清单表

| 场景           | 聚合                         | 窗口                               |
| -------------- | ---------------------------- | ---------------------------------- |
| 总行数         | `COUNT(*)`                   |                                    |
| 组内计数       | `GROUP BY` + `COUNT(*)`      | `COUNT(*) OVER (PARTITION BY ...)` |
| 组内排名       | 子查询（繁琐）               | `ROW_NUMBER() OVER (...)`          |
| 累计销售额     | 子查询                       | `SUM(amt) OVER (ORDER BY dt)`      |
| 与明细同屏     | 难以实现                     | 窗口函数首选                       |

## SQL 示例

```sql
-- 聚合：每部门人数与工资总和
SELECT
  department,
  COUNT(*) AS headcount,
  SUM(salary) AS payroll,
  AVG(salary) AS avg_sal,
  MIN(hire_date) AS earliest_hire
FROM employees
GROUP BY department;

-- 全表聚合（无 GROUP BY）
SELECT COUNT(*) AS total_products, AVG(price) AS avg_price
FROM products;

-- 窗口：每用户订单按金额排名，并显示该用户订单总额
SELECT
  id,
  user_id,
  amount,
  SUM(amount) OVER (PARTITION BY user_id) AS user_total,  -- 组内总和
  ROW_NUMBER() OVER (
    PARTITION BY user_id
    ORDER BY amount DESC
  ) AS rank_in_user                                         -- 组内金额排名
FROM orders
WHERE status = 'completed';

-- RANK 与累计（按日）
SELECT
  order_date,
  daily_sales,
  SUM(daily_sales) OVER (ORDER BY order_date) AS running_total
FROM (
  SELECT date(created_at) AS order_date, SUM(amount) AS daily_sales
  FROM orders
  GROUP BY date(created_at)
);

-- LAG：与上一行对比
SELECT
  month,
  revenue,
  revenue - LAG(revenue) OVER (ORDER BY month) AS mom_delta
FROM monthly_revenue;
```

## 易错点

1. **SELECT 混用聚合与非聚合列**：无 `GROUP BY` 时，非聚合列只能来自常量或函数，否则报错或结果异常。
2. **窗口与 GROUP BY 同层**：同一 SELECT 可同时有 `GROUP BY` 与窗口函数，窗口在分组结果上计算，注意粒度。
3. **ORDER BY 影响窗口**：`OVER (ORDER BY ...)` 缺失时，帧与排名行为可能不符合预期。
4. **版本**：旧 SQLite 无窗口函数，需子查询或应用层实现。
5. **COUNT(*) vs COUNT(col)**：与 [分组与 HAVING](./group-having) 相同，NULL 处理不同。

## 参考链接

- [聚合函数](https://www.sqlite.org/lang_aggfunc.html)
- [窗口函数](https://www.sqlite.org/windowfunctions.html)
- [SELECT — 窗口定义](https://www.sqlite.org/syntax/window-defn.html)
