# 更新与删除（UPDATE / DELETE）

## 定义

**UPDATE** 修改表中已有行的列值；**DELETE** 删除满足条件的行。SQLite 3.35+ 支持 **RETURNING** 子句，在更新或删除后返回受影响行的指定列，便于应用层记录审计或获取旧值。

## 概念要点

- **WHERE 省略**：UPDATE/DELETE 作用于**全表**，生产环境几乎必须带 WHERE。
- **约束检查**：更新/删除时同样检查 NOT NULL、UNIQUE、FK、CHECK（FK 需 `PRAGMA foreign_keys=ON`）。
- **触发器**：BEFORE/AFTER UPDATE/DELETE 触发器可拦截或记录变更（见 [触发器](./trigger)）。
- **RETURNING**：`UPDATE ... RETURNING col` 或 `DELETE ... RETURNING *`；多行返回多结果行。
- **子查询更新**：SET 可用 correlated subquery；FROM 子句（3.33+）支持 PostgreSQL 风格多表 UPDATE。
- **rowid**：可用 `WHERE rowid = ?` 精确定位一行（非 WITHOUT ROWID 表）。
- **级联**：父表 UPDATE/DELETE 可能 CASCADE 到子表（外键动作，见 [约束](./constraints)）。

## 语法 / 清单表

| 语句 | 基本语法 | 说明 |
| ---- | -------- | ---- |
| UPDATE | `UPDATE t SET col=expr [, ...] WHERE cond` | 按条件改列 |
| UPDATE RETURNING | `UPDATE t SET ... WHERE ... RETURNING old.*` | 返回改后/改前行 |
| DELETE | `DELETE FROM t WHERE cond` | 按条件删行 |
| DELETE RETURNING | `DELETE FROM t WHERE ... RETURNING id` | 返回被删行 |
| 清空表 | `DELETE FROM t` | 保留表结构；重置 AUTOINCREMENT 不保证 |
| 快速清空 | `DELETE FROM t; VACUUM` 或重建 | TRUNCATE 语法不存在 |

### UPDATE 扩展（3.33+）

| 形式 | 示例 |
| ---- | ---- |
| FROM 子句 | `UPDATE t SET x=1 FROM s WHERE t.id=s.id` |
| ORDER BY + LIMIT | `UPDATE t SET flag=1 WHERE ... ORDER BY id LIMIT 10` |

## 示例

### UPDATE 基本用法

```sql
PRAGMA foreign_keys = ON;

CREATE TABLE users (
  id       INTEGER PRIMARY KEY,
  username TEXT NOT NULL,
  status   TEXT NOT NULL DEFAULT 'active'
);

UPDATE users
SET status = 'inactive'
WHERE id = 3;  -- 只更新 id=3 的行

UPDATE users
SET username = lower(username)
WHERE status = 'active';  -- 批量规范化用户名
```

### DELETE 与误删防护

```sql
-- 删除已完成且超过 90 天的任务（示例条件）
DELETE FROM tasks
WHERE status = 'done'
  AND created_at < datetime('now', '-90 days');

-- 危险：无 WHERE 会删全表
-- DELETE FROM tasks;
```

### RETURNING（取变更结果）

```sql
-- 更新并返回新状态
UPDATE users
SET status = 'banned'
WHERE username = 'spammer'
RETURNING id, username, status;

-- 删除并返回被删主键（便于同步缓存）
DELETE FROM sessions
WHERE expires_at < datetime('now')
RETURNING id, user_id;

-- RETURNING 可用 old./new. 前缀（3.35+）
UPDATE products
SET price = price * 1.1
WHERE category = 'book'
RETURNING id, old.price AS was, new.price AS now;
```

## 易错点与交叉引用

| 问题 | 说明 |
| ---- | ---- |
| 忘记 WHERE | 全表更新/删除，常见生产事故 |
| FK 未开启删父行 | 无 CASCADE 时可能留下孤儿行（FK 关时）或报错（FK 开时） |
| RETURNING 与客户端 API | 部分驱动需逐行读 RETURNING 结果集 |
| 并发更新丢失 | 应用层宜 `UPDATE ... WHERE id=? AND version=?` 或事务 |
| DELETE 后 id 复用 | 无 AUTOINCREMENT 时新 INSERT 可能重用 rowid |
| 与 REPLACE 混淆 | REPLACE 先删后插；见 [替换与 UPSERT](./replace-upsert) |

**相关章节**：[插入](./insert) · [约束](./constraints) · [WHERE 与运算符](./where-operators) · [事务](./transaction) · [触发器](./trigger)

## SQLite 官方参考

- [UPDATE](https://www.sqlite.org/lang_update.html)
- [DELETE](https://www.sqlite.org/lang_delete.html)
- [RETURNING](https://www.sqlite.org/lang_returning.html)
- [UPDATE ... FROM](https://www.sqlite.org/lang_update.html#update_from)
