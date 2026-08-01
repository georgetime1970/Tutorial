# 建表（CREATE TABLE）

## 定义

**CREATE TABLE** 用于在 SQLite 数据库中定义新表：指定列名、声明类型（影响亲和性）、列级约束，以及表级约束（主键、外键等）。每张表默认有一个隐藏的 **rowid**（或 INTEGER PRIMARY KEY 别名），用于唯一标识每一行。

## 概念要点

- **rowid**：64 位整数行标识；普通表隐式存在，除非 `WITHOUT ROWID`。
- **INTEGER PRIMARY KEY**：该列成为 rowid 的别名（**rowid 表**），插入时不指定则自动分配唯一整数。
- **AUTOINCREMENT**：**仅**在与 `INTEGER PRIMARY KEY` 合用时有效；保证 rowid 单调递增、不重用已删除行的 id（有额外开销）。
- **IF NOT EXISTS**：表已存在时不报错，静默跳过。
- **WITHOUT ROWID**：整行数据存于 PRIMARY KEY 索引中，适合主键即访问键且行较短的场景。
- **STRICT**（3.37+）：写入值必须与列声明存储类兼容，否则报错（纠正动态类型的宽松行为）。
- **TEMP / TEMPORARY**：临时表，连接关闭时自动删除。

### INTEGER PRIMARY KEY 与 rowid

| 写法 | rowid 行为 |
| ---- | ---------- |
| 无 INTEGER PK | 隐藏 `rowid` 列自动存在 |
| `id INTEGER PRIMARY KEY` | `id` 即 rowid；可 `NULL` 时自动分配 |
| `id INTEGER PRIMARY KEY AUTOINCREMENT` | 同上 + 保证 id 只增不减、不回收 |
| `PRIMARY KEY (a, b)` 复合主键 | **不是** rowid 别名；表仍有独立 rowid（除非 WITHOUT ROWID） |

### AUTOINCREMENT 官方语义

- 必须写成 **`INTEGER PRIMARY KEY AUTOINCREMENT`**（或 `INT PRIMARY KEY AUTOINCREMENT`）。
- **错误写法**：单独 `INTEGER AUTOINCREMENT`（无 PRIMARY KEY）——无效语法或语义不符。
- 无 AUTOINCREMENT 时，删除最大 rowid 的行后再插入，新 rowid 可能**复用**已删除值；加 AUTOINCREMENT 则永不复用（内部使用 `sqlite_sequence` 表）。

## 语法 / 清单表

| 子句 / 选项 | 语法片段 | 说明 |
| ----------- | -------- | ---- |
| 基本建表 | `CREATE TABLE name (col type ...)` | 至少一列 |
| 条件创建 | `CREATE TABLE IF NOT EXISTS name (...)` | 已存在则忽略 |
| 临时表 | `CREATE TEMP TABLE name (...)` | 会话级 |
| 主键 | `id INTEGER PRIMARY KEY` | 推荐整型 rowid 别名 |
| 自增 | `id INTEGER PRIMARY KEY AUTOINCREMENT` | 仅与此组合 |
| 无 rowid | `CREATE TABLE ... WITHOUT ROWID` | PK 必填且通常无 AUTOINCREMENT |
| 严格表 | `CREATE TABLE ... STRICT (...)` | 类型与存储类一致 |
| 表约束 | `, PRIMARY KEY (...)` `, FOREIGN KEY (...)` | 见 [约束](./constraints) |

## 示例

### 标准用户表（INTEGER PRIMARY KEY）

```sql
CREATE TABLE IF NOT EXISTS users (
  id         INTEGER PRIMARY KEY,  -- rowid 别名；省略时自动分配
  username   TEXT    NOT NULL UNIQUE,
  email      TEXT,
  created_at TEXT    DEFAULT (datetime('now'))  -- ISO8601 文本
);

INSERT INTO users (username, email) VALUES ('alice', 'a@example.com');
-- id 自动为 1（或当前最大 rowid + 1）

SELECT rowid, id FROM users;  -- rowid 与 id 相同
```

### AUTOINCREMENT（单调递增 id）

```sql
CREATE TABLE IF NOT EXISTS orders (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,  -- 必须 INTEGER PRIMARY KEY
  user_id     INTEGER NOT NULL,
  total_cents INTEGER NOT NULL
);

INSERT INTO orders (user_id, total_cents) VALUES (1, 9900);
DELETE FROM orders WHERE id = 1;
INSERT INTO orders (user_id, total_cents) VALUES (1, 1200);
-- 新 id 为 2，不会复用已删除的 1
```

### STRICT 表与 WITHOUT ROWID

```sql
-- STRICT：写入类型不匹配列声明存储类时报错
CREATE TABLE metrics (
  name  TEXT NOT NULL,
  value REAL NOT NULL
) STRICT;

-- WITHOUT ROWID：主键即物理存储键，适合键值型小行
CREATE TABLE kv (
  key   TEXT PRIMARY KEY,
  val   BLOB NOT NULL
) WITHOUT ROWID;
```

## 易错点与交叉引用

| 问题 | 说明 |
| ---- | ---- |
| `INTEGER AUTOINCREMENT` 单独使用 | 无效；必须是 `INTEGER PRIMARY KEY AUTOINCREMENT` |
| 以为 AUTOINCREMENT 更快 | 反而更慢、占空间；仅需「不重用 id」时才加 |
| `PRIMARY KEY AUTOINCREMENT` 非 INTEGER | AUTOINCREMENT 只对 INTEGER PRIMARY KEY 生效 |
| 复合主键期望自增 | AUTOINCREMENT 不适用复合 PK |
| 忽略 STRICT 与默认动态类型差异 | 迁移旧表到 STRICT 需确保数据兼容 |
| WITHOUT ROWID 滥用 | 宽行、非 PK 访问为主时不适合 |

**相关章节**：[约束](./constraints) · [修改与删除表](./alter-drop) · [插入](./insert) · [简介与数据类型](./intro)

## SQLite 官方参考

- [CREATE TABLE](https://www.sqlite.org/lang_createtable.html)
- [Rowid Tables](https://www.sqlite.org/lang_createtable.html#rowid)
- [AUTOINCREMENT](https://www.sqlite.org/autoinc.html)
- [WITHOUT ROWID](https://www.sqlite.org/withoutrowid.html)
- [STRICT Tables](https://www.sqlite.org/stricttables.html)
