# 修改与删除表（ALTER / DROP）

## 定义

**ALTER TABLE** 修改已有表的结构或名称；**DROP TABLE** 删除整张表及其数据与索引。SQLite 3.35+ 起支持较完整的列级 ALTER（ADD / DROP / RENAME COLUMN），但**仍不支持**直接修改列类型或删除/重排多列的一次性复杂变更（旧版需重建表）。

## 概念要点

- **RENAME TABLE**：改表名；索引与触发器自动跟随（外键引用需自行处理）。
- **RENAME COLUMN**（3.25+）：改列名；依赖该列的索引、视图、触发器会更新。
- **ADD COLUMN**（3.1.3+）：追加列；新列对已有行填 `NULL` 或 `DEFAULT`；不能带 `NOT NULL` 且无 DEFAULT（除非 DEFAULT 存在）。
- **DROP COLUMN**（3.35+）：删除列；内部可能重建表，大表耗时。
- **DROP TABLE**：删除表定义与全部数据；`IF EXISTS` 避免不存在时报错。
- **历史限制**：无 `ALTER COLUMN TYPE`；改类型通常 `CREATE新表 → 拷贝 → DROP旧表 → RENAME`。
- **外键**：ALTER 期间若涉及 FK，确保 `PRAGMA foreign_keys=ON`（见 [约束](./constraints)）。

## 语法 / 清单表

| 操作 | 语法 | 最低版本 |
| ---- | ---- | -------- |
| 重命名表 | `ALTER TABLE old RENAME TO new` | 3.1.3 |
| 添加列 | `ALTER TABLE t ADD COLUMN col type ...` | 3.1.3 |
| 重命名列 | `ALTER TABLE t RENAME COLUMN old TO new` | 3.25.0 |
| 删除列 | `ALTER TABLE t DROP COLUMN col` | 3.35.0 |
| 删除表 | `DROP TABLE [IF EXISTS] t` | — |
| 删除临时表 | `DROP TABLE IF EXISTS temp.t` | — |

### ADD COLUMN 限制清单

| 限制 | 说明 |
| ---- | ---- |
| 只能追加到末尾 | 不能指定列顺序 |
| 新列 NOT NULL | 必须有 DEFAULT，否则已有行无法满足 |
| PRIMARY KEY / UNIQUE | 新列不能直接加表级 PK（需重建表） |
| 引用与生成列 | 受版本与上下文限制，复杂变更用重建法 |

## 示例

### 重命名表与列

```sql
CREATE TABLE user (id INTEGER PRIMARY KEY, name TEXT);

ALTER TABLE user RENAME TO users;              -- 表改名为 users
ALTER TABLE users RENAME COLUMN name TO username;  -- 列改名为 username
```

### ADD COLUMN（带默认值）

```sql
CREATE TABLE products (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

-- 已有行 status 自动为 'draft'
ALTER TABLE products ADD COLUMN status TEXT NOT NULL DEFAULT 'draft';

-- 可空列，已有行为 NULL
ALTER TABLE products ADD COLUMN description TEXT;
```

### DROP COLUMN 与 DROP TABLE

```sql
-- 删除不再需要的列（3.35+）
ALTER TABLE products DROP COLUMN description;

-- 删除整表；IF EXISTS 避免表不存在时报错
DROP TABLE IF EXISTS old_backup;
DROP TABLE products;  -- 不可恢复，生产环境先备份
```

### 改列类型（重建表模式）

```sql
-- SQLite 无 ALTER COLUMN TYPE；示例：把 price 从 INTEGER 改为 REAL
CREATE TABLE products_new (
  id    INTEGER PRIMARY KEY,
  name  TEXT NOT NULL,
  price REAL
);

INSERT INTO products_new (id, name, price)
SELECT id, name, CAST(price AS REAL) FROM products;

DROP TABLE products;
ALTER TABLE products_new RENAME TO products;
```

## 易错点与交叉引用

| 问题 | 说明 |
| ---- | ---- |
| ADD COLUMN 加 NOT NULL 无 DEFAULT | 对已有数据行非法 |
| 假设能改列类型 | 需重建表；D1/旧 SQLite 版本能力不同 |
| DROP COLUMN 大表阻塞 | 内部复制全表，注意维护窗口 |
| 重命名表后 FK 失效 | 引用方需 `PRAGMA foreign_key_check` 或同步改 schema |
| 与 WITHOUT ROWID 表 ALTER | DROP COLUMN 等仍可能触发重建 |
| 未备份就 DROP | 单文件库无「回收站」，先复制 `.db` |

**相关章节**：[建表](./create-table) · [约束](./constraints) · [事务](./transaction) · [VACUUM 与 PRAGMA](./vacuum-pragma)

## SQLite 官方参考

- [ALTER TABLE](https://www.sqlite.org/lang_altertable.html)
- [DROP TABLE](https://www.sqlite.org/lang_droptable.html)
- [Making Other Kinds Of Table Schema Changes](https://www.sqlite.org/lang_altertable.html#making_other_kinds_of_table_schema_changes)
- [ADD COLUMN 限制](https://www.sqlite.org/lang_altertable.html#altertabaddcol)
