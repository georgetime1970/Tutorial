# ORDER BY、LIMIT 与 OFFSET

## 定义

**ORDER BY** 对结果集排序；**LIMIT** 限制返回行数，**OFFSET** 跳过前 N 行（分页常用）。三者位于查询末尾（逻辑执行顺序最后）。

## 概念

### ORDER BY

- **ASC**（默认）：升序；**DESC**：降序。
- 可排序列：表列、表达式、SELECT 别名（SQLite 支持）、列序号（`ORDER BY 2` 不推荐）。
- 多列排序：从左到右优先级递减，如 `ORDER BY dept ASC, salary DESC`。

### NULL 排序

SQLite 中 **NULL 被认为小于任何非 NULL 值**：

| 排序   | NULL 位置（默认）     |
| ------ | --------------------- |
| ASC    | 最前                  |
| DESC   | 最后                  |

标准 SQL 的 `NULLS FIRST` / `NULLS LAST` 在 SQLite **不支持**；需用表达式模拟，例如：

```sql
ORDER BY col IS NULL, col ASC   -- NULL 放最后
ORDER BY col IS NULL DESC, col DESC
```

### LIMIT 与 OFFSET

- `LIMIT n`：最多 n 行。
- `OFFSET m`：跳过前 m 行；常与 `LIMIT` 联用做分页：`LIMIT page_size OFFSET (page - 1) * page_size`。
- SQLite 3.39+ 支持 `LIMIT count OFFSET skip` 与 `LIMIT skip, count`（MySQL 风格）两种写法；以官方文档为准。
- 大 **OFFSET** 性能差：引擎仍扫描跳过行，深分页考虑键集分页（`WHERE id > last_id ORDER BY id LIMIT n`）。

## 清单表

| 场景           | 写法                                      |
| -------------- | ----------------------------------------- |
| 升序           | `ORDER BY col ASC` 或 `ORDER BY col`      |
| 降序           | `ORDER BY col DESC`                       |
| 多列           | `ORDER BY a DESC, b ASC`                  |
| 按别名排序       | `SELECT x AS y ... ORDER BY y`            |
| 前 N 条          | `ORDER BY ... LIMIT 10`                   |
| 分页           | `LIMIT 20 OFFSET 40`（第 3 页，每页 20）  |
| NULL 置后（ASC） | `ORDER BY col IS NULL, col`               |
| 键集分页       | `WHERE id > ? ORDER BY id LIMIT 20`       |

## SQL 示例

```sql
-- 按价格降序
SELECT id, title, price
FROM products
ORDER BY price DESC;

-- 多列：先类别升序，同类内价格降序
SELECT id, category, price
FROM products
ORDER BY category ASC, price DESC;

-- 按表达式 / 别名
SELECT
  id,
  price * qty AS line_total
FROM order_items
ORDER BY line_total DESC
LIMIT 5;

-- NULL 排序：把无折扣的放最后
SELECT id, name, discount
FROM products
ORDER BY discount IS NULL, discount ASC;

-- 分页：第 2 页，每页 10 条（OFFSET 从 0 起）
SELECT id, title
FROM products
ORDER BY id
LIMIT 10 OFFSET 10;

-- 仅 LIMIT：SQLite 允许无 ORDER BY，但顺序不确定
SELECT id FROM logs LIMIT 100;  -- 调试可用，业务分页务必 ORDER BY

-- 键集分页（推荐深分页）
SELECT id, title
FROM products
WHERE id > 1000          -- 上一页最后一条 id
ORDER BY id
LIMIT 20;
```

## 易错点

1. **无 ORDER BY 的分页**：行顺序不稳定，翻页可能重复或遗漏。
2. **大 OFFSET**：数据量大时变慢，改用键集分页。
3. **ORDER BY 与 DISTINCT**：`ORDER BY` 表达式须与 `DISTINCT` 规则兼容。
4. **NULLS FIRST/LAST**：SQLite 不支持该语法，勿从 PostgreSQL 直接照搬。
5. **LIMIT 在子查询**：外层再包一层时注意别名与排序列作用域。

## 参考链接

- [ORDER BY / LIMIT](https://www.sqlite.org/lang_select.html)
- [表达式 — 排序规则](https://www.sqlite.org/lang_expr.html)
