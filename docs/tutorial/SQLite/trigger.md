# 触发器

## 定义

**触发器（TRIGGER）** 是与表绑定的自动化规则：当指定事件（`INSERT` / `UPDATE` / `DELETE`）发生且满足 `WHEN` 条件时，SQLite 自动执行触发器体中的 SQL。触发器在**同一语句/事务上下文**内运行，可访问伪表 `NEW`（新行）与 `OLD`（旧行）。

## 概念要点

- **时机**：`BEFORE` 在约束检查前运行，可修改 `NEW` 以影响即将写入的值；`AFTER` 在变更已生效后运行，适合做审计、级联日志。
- **粒度**：`FOR EACH ROW` 为行级（SQLite 仅支持行级）；`FOR EACH STATEMENT` 在 SQLite 中不可用。
- **伪表 `NEW` / `OLD`**：`INSERT` 仅有 `NEW`；`DELETE` 仅有 `OLD`；`UPDATE` 两者皆有。
- **递归**：默认触发器内再触发其它触发器；可用 `PRAGMA recursive_triggers = OFF` 关闭（见 [VACUUM 与 PRAGMA](./vacuum-pragma)）。
- **与约束区别**：触发器是用户定义的过程逻辑；`CHECK` / `FOREIGN KEY` 是声明式约束。

### 触发器结构

```sql
CREATE [TEMP] TRIGGER [IF NOT EXISTS] trigger_name
[BEFORE | AFTER] [INSERT | UPDATE [OF col,...] | DELETE]
ON table_name
[FOR EACH ROW]
[WHEN condition]
BEGIN
  -- 一条或多条 SQL，用分号分隔
END;
```

## 语法 / 清单表

| 操作 | 语法 |
| ---- | ---- |
| 创建 | `CREATE TRIGGER ... BEFORE/AFTER ... ON ... BEGIN ... END` |
| 更新列限定 | `UPDATE OF col1, col2` 仅在这些列变化时触发 |
| 条件 | `WHEN (expr)` 为假则跳过 |
| 删除 | `DROP TRIGGER [IF EXISTS] trigger_name` |
| 列出触发器 | `SELECT name, sql FROM sqlite_master WHERE type='trigger'` |
| 临时触发器 | `CREATE TEMP TRIGGER` 随连接结束消失 |

### 常用模式

| 模式 | 时机 | 用途 |
| ---- | ---- | ---- |
| 审计日志 | `AFTER INSERT/UPDATE/DELETE` | 写入 audit 表 |
| 自动时间戳 | `BEFORE UPDATE` | `NEW.updated_at = datetime('now')` |
| 防删保护 | `BEFORE DELETE` | `WHEN` + `RAISE(ABORT, '...')` |
| 计数维护 | `AFTER INSERT/DELETE` | 更新汇总表行数 |
| 级联软删 | `AFTER UPDATE OF deleted` | 同步关联表标志 |

## 示例

### 自动维护 updated_at

```sql
-- BEFORE UPDATE：在写入前把 NEW.updated_at 设为当前时间
CREATE TRIGGER trg_users_touch
BEFORE UPDATE ON users
FOR EACH ROW
WHEN NEW.updated_at = OLD.updated_at  -- 仅当应用未手动设置时
BEGIN
  UPDATE users SET updated_at = datetime('now') WHERE id = OLD.id;
END;
```

若触发器体只需改 `NEW` 列，也可用 `UPDATE ... SET col = expr` 作用于本行（SQLite 允许在 BEFORE 触发器内通过子 UPDATE 间接更新）。

### 审计表：记录删除

```sql
CREATE TABLE audit_log (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  table_name TEXT NOT NULL,
  row_id     INTEGER,
  action     TEXT NOT NULL,
  payload    TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TRIGGER trg_orders_audit_delete
AFTER DELETE ON orders
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (table_name, row_id, action, payload)
  VALUES ('orders', OLD.id, 'DELETE', json_object('total', OLD.total));
END;
```

### BEFORE DELETE：禁止删除未结订单

```sql
CREATE TRIGGER trg_orders_no_delete_open
BEFORE DELETE ON orders
FOR EACH ROW
WHEN OLD.status = 'open'
BEGIN
  SELECT RAISE(ABORT, 'cannot delete open order');
END;
```

### UPDATE OF：仅特定列变化时触发

```sql
CREATE TRIGGER trg_products_price_change
AFTER UPDATE OF price ON products
FOR EACH ROW
WHEN NEW.price <> OLD.price
BEGIN
  INSERT INTO price_history (product_id, old_price, new_price)
  VALUES (OLD.id, OLD.price, NEW.price);
END;
```

## 易错点与交叉引用

| 问题 | 说明 |
| ---- | ---- |
| AFTER 中修改同表 | 可能再次触发触发器，注意 `recursive_triggers` 与逻辑环 |
| BEFORE 误用 OLD 写回 | `INSERT` 无 `OLD`；`DELETE` 无 `NEW` |
| 触发器内 RAISE | `ABORT`/`FAIL`/`ROLLBACK`/`IGNORE` 语义不同，影响事务 |
| 性能 | 大批量导入时逐行触发器开销大，可临时 `DROP TRIGGER` |
| 与 FK CASCADE 叠加 | 删除父行可能级联 + 触发器双重副作用 |

**相关章节**：[约束](./constraints) · [事务](./transaction) · [VACUUM 与 PRAGMA](./vacuum-pragma)

## SQLite 官方参考

- [CREATE TRIGGER](https://www.sqlite.org/lang_createtrigger.html)
- [DROP TRIGGER](https://www.sqlite.org/lang_droptrigger.html)
- [触发器语法（lang_createtrigger 详解）](https://www.sqlite.org/lang_createtrigger.html#summary)
