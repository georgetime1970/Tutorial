# SQLite 简介与数据类型

## 定义

**SQLite** 是一个嵌入式、无服务器的 SQL 关系数据库引擎：整个数据库通常存于单个 `.db` 文件，由应用程序进程内链接库直接读写，无需独立数据库服务进程。适合本地存储、移动应用、边缘计算（如 Cloudflare D1）等场景。

## 概念要点

- **零配置**：无需安装、启动守护进程；打开文件即可用。
- **单文件数据库**：一个文件即一个库；备份即复制文件（注意并发写入时的 WAL 模式）。
- **ACID 事务**：默认支持事务；`BEGIN` / `COMMIT` / `ROLLBACK`（详见 [事务](./transaction)）。
- **动态类型**：列可声明类型，但**不强制**存储类；实际存储由写入值决定（见下方存储类）。
- **类型亲和性（Type Affinity）**：列声明的类型名只影响**比较与转换倾向**，不是独立存储格式。
- **SQL 方言**：与标准 SQL 大体兼容，但有 UPSERT、部分 ALTER 能力等差异（本系列按 SQLite 3.x 现行语法）。

### 五种存储类（Storage Classes）

SQLite 在磁盘上只存以下五类，**没有**独立的 BOOLEAN、DATETIME、DECIMAL 存储类：

| 存储类   | 含义           | 典型内容                          |
| -------- | -------------- | --------------------------------- |
| `NULL`   | 空值           | SQL NULL                          |
| `INTEGER`| 有符号整数     | 1、-42、9223372036854775807       |
| `REAL`   | 浮点数         | 3.14、1.0e10                      |
| `TEXT`   | UTF-8/UTF-16 文本 | `'hello'`、`'中文'`           |
| `BLOB`   | 二进制         | 图片、protobuf 等原始字节         |

### 类型亲和性速查

声明类型名中的关键字决定亲和性，**不是**「声明什么就存什么」：

| 亲和性   | 匹配规则（类型名含下列词）                    | 倾向存储 |
| -------- | --------------------------------------------- | -------- |
| `INTEGER`| `INT`                                         | 整数     |
| `REAL`   | `REAL`、`FLOA`、`DOUB`                         | 浮点     |
| `TEXT`   | `CHAR`、`CLOB`、`TEXT`                        | 文本     |
| `BLOB`   | `BLOB`                                        | 二进制   |
| `NUMERIC`| 其余（含 `BOOLEAN`、`DATE`、`DATETIME`、`DECIMAL`） | 整数或实数或文本，依值而定 |

**常见误解**：`BOOLEAN`、`DATETIME`、`DECIMAL` 是**亲和性分类用的类型名**，不会创建额外存储类；`BOOLEAN` 通常存成 0/1 整数，`DATETIME` 常存 ISO8601 文本。

### 声明类型 vs 实际存储

```sql
-- 列声明为 TEXT，但写入整数 — 合法，实际存储类为 INTEGER
CREATE TABLE t (a TEXT);
INSERT INTO t VALUES (42);
SELECT typeof(a) FROM t;  -- 返回 'integer'
```

`typeof(X)` 返回值的**实际**存储类名（小写）：`null`、`integer`、`real`、`text`、`blob`。

## 语法 / 清单表

| 操作 / 概念        | 说明 |
| ------------------ | ---- |
| 打开数据库         | `sqlite3 my.db` 或应用内 API |
| 查看表结构         | `.schema table_name` 或 `PRAGMA table_info(table_name)` |
| 当前 SQLite 版本   | `SELECT sqlite_version();` |
| 存储类检测         | `typeof(column)` |
| 亲和性来源         | 列定义中的类型名关键字 |
| 严格模式（可选）   | `CREATE TABLE ... STRICT` 强制声明类型与存储类一致（见 [建表](./create-table)） |

## 示例

### 五种存储类与 typeof

```sql
CREATE TABLE demo (
  c_null  TEXT,   -- 亲和性 TEXT，可存 NULL
  c_int   INTEGER,
  c_real  REAL,
  c_text  TEXT,
  c_blob  BLOB
);

INSERT INTO demo VALUES
  (NULL, 100, 3.14, '你好', X'48656C6C6F');  -- X'...' 为十六进制 BLOB 字面量

SELECT
  typeof(c_null) AS t_null,   -- 'null'
  typeof(c_int)  AS t_int,    -- 'integer'
  typeof(c_real) AS t_real,   -- 'real'
  typeof(c_text) AS t_text,   -- 'text'
  typeof(c_blob) AS t_blob;   -- 'blob'
```

### BOOLEAN / DATETIME 的实际存储

```sql
CREATE TABLE flags (
  active   BOOLEAN,    -- 亲和性 NUMERIC，通常存 0/1
  created  DATETIME    -- 亲和性 NUMERIC，常存 ISO8601 文本
);

INSERT INTO flags VALUES (1, '2026-08-02T12:00:00Z');

SELECT typeof(active), typeof(created) FROM flags;
-- 可能返回 'integer' 与 'text'，取决于写入值
```

### 动态类型跨列写入

```sql
CREATE TABLE flexible (id INTEGER PRIMARY KEY, payload TEXT);

INSERT INTO flexible (payload) VALUES (123);      -- 存 INTEGER
INSERT INTO flexible (payload) VALUES ('abc');    -- 存 TEXT
INSERT INTO flexible (payload) VALUES (3.5);      -- 存 REAL

SELECT id, payload, typeof(payload) FROM flexible;
```

## 易错点与交叉引用

| 问题 | 说明 |
| ---- | ---- |
| 把声明类型当强制类型 | 默认模式下列可存任意存储类；需要严格时用 `STRICT` 表 |
| 认为有 BOOLEAN 类型 | 只是 NUMERIC 亲和性的别名，存储仍是 INTEGER/TEXT 等 |
| 用 `typeof` 判断业务类型 | `typeof` 看存储类，不看列声明；业务日期格式需应用层约定 |
| 忽略 UTF-8 | TEXT 默认 UTF-8；连接时可 `PRAGMA encoding` 查看 |
| 与 MySQL/PostgreSQL 类型对照生搬 | 迁移时需重写类型与约束语义 |

**相关章节**：[建表](./create-table) · [约束](./constraints) · [插入](./insert) · [VACUUM 与 PRAGMA](./vacuum-pragma)

## SQLite 官方参考

- [SQLite 文档首页](https://www.sqlite.org/docs.html)
- [SQLite 特点（When To Use）](https://www.sqlite.org/whentouse.html)
- [Datatypes In SQLite（datatype3）](https://www.sqlite.org/datatype3.html)
- [Storage Classes and Datatypes](https://www.sqlite.org/datatype3.html#storage_classes_and_datatypes)
- [Type Affinity](https://www.sqlite.org/datatype3.html#affinity)
- [typeof() 函数](https://www.sqlite.org/lang_corefunc.html#typeof)
