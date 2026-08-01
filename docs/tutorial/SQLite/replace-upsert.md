# 替换与 UPSERT（REPLACE / ON CONFLICT）

## 定义

当插入违反 **PRIMARY KEY** 或 **UNIQUE** 约束时，SQLite 提供两种常见策略：**REPLACE**（冲突则删除旧行再插入新行）与 **UPSERT**（`INSERT ... ON CONFLICT DO UPDATE` / `DO NOTHING`，冲突时更新或跳过）。UPSERT 是多数业务「有则改、无则增」的首选。

## 概念要点

- **REPLACE**：语法上类似 INSERT；冲突时**删除**旧行再插入，旧行未出现在 INSERT 中的列会丢失；可能触发 FK CASCADE。
- **INSERT OR REPLACE**：与 REPLACE INTO 等价写法。
- **UPSERT**（3.24+）：`ON CONFLICT (cols) DO UPDATE SET ...` 或 `DO NOTHING`。
- **冲突目标**：须匹配 UNIQUE/PK 索引；`ON CONFLICT DO UPDATE` 可用 **`excluded.`** 引用「欲插入的那一行」的值。
- **DO UPDATE SET**：可写 `col=excluded.col` 或表达式；WHERE 子句可限制是否更新（3.33+ partial upsert）。
- **DO NOTHING**：冲突时跳过，不报错。
- **与触发器**：REPLACE 是 DELETE+INSERT，触发两者；UPSERT 可能只走 UPDATE 路径。
- **rowid / AUTOINCREMENT**：REPLACE 删除旧行再插，rowid 可能变化；AUTOINCREMENT 表 id 通常不变但非 INSERT 语义。

### REPLACE vs UPSERT 对比

| 特性 | REPLACE | ON CONFLICT DO UPDATE |
| ---- | ------- | --------------------- |
| 冲突时行为 | 删旧行 + 插新行 | 原地更新列 |
| 未指定列 | 丢失（变 NULL/DEFAULT） | 保留原值 |
| 外键 | 可能 CASCADE 删除 | 通常仅 UPDATE |
| 推荐场景 | 简单全行覆盖 | 精细合并字段 |

## 语法 / 清单表

| 形式 | 语法 |
| ---- | ---- |
| REPLACE | `REPLACE INTO t (cols) VALUES (...)` |
| INSERT OR REPLACE | `INSERT OR REPLACE INTO t ...` |
| UPSERT 更新 | `INSERT INTO t (...) VALUES (...) ON CONFLICT(c) DO UPDATE SET col=excluded.col` |
| UPSERT 忽略 | `INSERT INTO t (...) VALUES (...) ON CONFLICT(c) DO NOTHING` |
| 冲突列省略 | 单 UNIQUE/PK 时可写 `ON CONFLICT DO UPDATE` |

### excluded 伪表

| 引用 | 含义 |
| ---- | ---- |
| `excluded.col` | 本次 INSERT 欲写入的 col 值 |
| `col`（无前缀） | 表中现有行的值（在 DO UPDATE SET 中） |

## 示例

### REPLACE（全行替换）

```sql
CREATE TABLE settings (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  note  TEXT
);

INSERT INTO settings VALUES ('theme', 'dark', '用户主题');

-- 冲突 key='theme'：删除旧行再插入；note 未提供则为 NULL
REPLACE INTO settings (key, value) VALUES ('theme', 'light');

SELECT * FROM settings;
-- key='theme', value='light', note=NULL（note 被清空）
```

### UPSERT — DO UPDATE（合并字段）

```sql
CREATE TABLE inventory (
  sku      TEXT PRIMARY KEY,
  qty      INTEGER NOT NULL DEFAULT 0,
  updated  TEXT
);

INSERT INTO inventory (sku, qty, updated) VALUES ('A001', 10, datetime('now'));

-- 有则累加数量，无则插入
INSERT INTO inventory (sku, qty, updated) VALUES ('A001', 5, datetime('now'))
ON CONFLICT (sku) DO UPDATE SET
  qty     = inventory.qty + excluded.qty,  -- 在现有数量上加 5
  updated = excluded.updated;

INSERT INTO inventory (sku, qty) VALUES ('B002', 3)
ON CONFLICT (sku) DO UPDATE SET qty = excluded.qty;
-- B002 不存在，走 INSERT
```

### UPSERT — DO NOTHING

```sql
CREATE TABLE users (
  id       INTEGER PRIMARY KEY,
  email    TEXT UNIQUE NOT NULL,
  username TEXT NOT NULL
);

-- 邮箱已存在则跳过，不报错
INSERT INTO users (email, username) VALUES ('a@ex.com', 'alice')
ON CONFLICT (email) DO NOTHING;

-- 或使用 OR IGNORE（等价于任意冲突 DO NOTHING）
INSERT OR IGNORE INTO users (email, username) VALUES ('a@ex.com', 'bob');
```

## 易错点与交叉引用

| 问题 | 说明 |
| ---- | ---- |
| REPLACE 丢列 | 未出现在 INSERT 中的列被重置，非「合并」 |
| REPLACE 与 FK | 删父行可能 CASCADE 删子表 |
| ON CONFLICT 列不匹配索引 | 须与 UNIQUE/PK 索引列一致 |
| DO UPDATE 违反 CHECK | 更新结果仍须满足 CHECK |
| 以为 INSERT OR IGNORE 会更新 | IGNORE 仅跳过，不更新 |
| 多 UNIQUE 冲突 | 须明确 `ON CONFLICT (哪组列)` |

**相关章节**：[插入](./insert) · [更新与删除](./update-delete) · [约束](./constraints) · [事务](./transaction)

## SQLite 官方参考

- [REPLACE](https://www.sqlite.org/lang_replace.html)
- [UPSERT（ON CONFLICT）](https://www.sqlite.org/lang_upsert.html)
- [INSERT OR REPLACE](https://www.sqlite.org/lang_insert.html)
- [The excluded table](https://www.sqlite.org/lang_upsert.html#the_excluded_table)
