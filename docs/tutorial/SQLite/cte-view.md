# CTE 与视图

## 定义

**CTE（Common Table Expression，公共表表达式）** 用 `WITH` 子句在单条 SQL 语句内定义临时命名结果集，供后续 `SELECT` / `INSERT` / `UPDATE` / `DELETE` 引用。**视图（VIEW）** 是持久化的「虚拟表」：保存一条 `SELECT` 定义，查询时动态展开，不单独存储数据（除非物化视图，SQLite 标准不支持）。

## 概念要点

- **作用域**：普通 CTE 仅在当前语句内有效；执行完毕即消失。
- **可读性**：将复杂子查询拆成多步命名块，便于维护与复用逻辑。
- **递归 CTE**：`WITH RECURSIVE` 用「锚点成员 + 递归成员」迭代生成层级/图结构数据（组织树、路径、数列等）。
- **视图 vs 表**：视图不占独立数据页；`INSERT`/`UPDATE`/`DELETE` 能否写视图取决于列映射与规则（SQLite 对可更新视图有限制）。
- **嵌套**：CTE 可互相引用；视图可基于其它视图定义。

### WITH 语法骨架

```sql
WITH [RECURSIVE] cte_name [(col1, col2, ...)] AS (
  -- 锚点或普通子查询
  SELECT ...
  [UNION ALL
  -- 递归成员（仅 RECURSIVE 时）
  SELECT ... FROM cte_name ...]
)
SELECT ... FROM cte_name ...;
```

### 递归 CTE 要点

| 要点 | 说明 |
| ---- | ---- |
| 必须 `RECURSIVE` | 递归引用自身时关键字不可省略 |
| 锚点 + 递归 | 至少两个 `SELECT`，用 `UNION ALL` 连接 |
| 终止条件 | 递归成员应随深度/条件收敛，避免无限循环 |
| 典型用途 | 树形层级、传递闭包、日期序列、图遍历 |

## 语法 / 清单表

| 操作 | 语法 |
| ---- | ---- |
| 普通 CTE | `WITH name AS (SELECT ...) SELECT ...` |
| 多 CTE | `WITH a AS (...), b AS (...) SELECT ...` |
| 递归 CTE | `WITH RECURSIVE name AS (anchor UNION ALL recursive) SELECT ...` |
| 创建视图 | `CREATE [TEMP] VIEW name [(cols)] AS select_stmt` |
| 替换视图 | `CREATE VIEW name AS ...` 需先 `DROP`；或用 `DROP VIEW IF EXISTS` 后重建 |
| 删除视图 | `DROP VIEW [IF EXISTS] name` |
| 查看定义 | `SELECT sql FROM sqlite_master WHERE type='view'` |

## 示例

### 普通 CTE：按部门汇总后再过滤

```sql
WITH dept_stats AS (
  SELECT dept_id,
         COUNT(*) AS cnt,
         AVG(salary) AS avg_sal
  FROM employees
  GROUP BY dept_id
)
SELECT d.name, s.cnt, s.avg_sal
FROM departments d
JOIN dept_stats s ON d.id = s.dept_id
WHERE s.cnt >= 5;
```

### 递归 CTE：组织树层级

```sql
WITH RECURSIVE org_tree AS (
  -- 锚点：根节点（无上级）
  SELECT id, name, manager_id, 0 AS depth
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  -- 递归：逐层向下找下属
  SELECT e.id, e.name, e.manager_id, t.depth + 1
  FROM employees e
  JOIN org_tree t ON e.manager_id = t.id
  WHERE t.depth < 10  -- 防止异常环导致无限递归
)
SELECT * FROM org_tree ORDER BY depth, id;
```

### 创建与使用视图

```sql
-- 创建：封装常用联表查询
CREATE VIEW active_users AS
SELECT u.id, u.name, u.email
FROM users u
WHERE u.deleted = 0;

-- 查询视图与查表语法相同
SELECT * FROM active_users WHERE name LIKE '张%';

-- 删除
DROP VIEW IF EXISTS active_users;
```

### CTE 与视图组合

```sql
-- 视图持久化「活跃订单」定义
CREATE VIEW v_open_orders AS
SELECT o.id, o.user_id, o.total
FROM orders o
WHERE o.status = 'open';

-- 语句内 CTE 再做聚合
WITH monthly AS (
  SELECT strftime('%Y-%m', created_at) AS ym,
         SUM(total) AS revenue
  FROM v_open_orders
  GROUP BY ym
)
SELECT * FROM monthly ORDER BY ym;
```

## 易错点与交叉引用

| 问题 | 说明 |
| ---- | ---- |
| 忘记 `RECURSIVE` | 自引用 CTE 未加关键字会报错 |
| 递归无终止 | 数据环或条件缺失导致达到递归深度上限 |
| 把 CTE 当持久对象 | CTE 不写入 schema；需复用请用视图或表 |
| 视图可更新性 | 复杂 JOIN/聚合视图通常不可直接 `INSERT`/`UPDATE` |
| 同名冲突 | 同一语句内外层 CTE 名勿与表名混淆 |

**相关章节**：[SELECT](./select) · [JOIN](./join) · [分组与 HAVING](./group-having) · [事务](./transaction)

## SQLite 官方参考

- [WITH 子句（lang_with）](https://www.sqlite.org/lang_with.html)
- [CREATE VIEW](https://www.sqlite.org/lang_createview.html)
- [DROP VIEW](https://www.sqlite.org/lang_dropview.html)
- [递归 CTE 说明](https://www.sqlite.org/lang_with.html#recursive_common_table_expressions)
