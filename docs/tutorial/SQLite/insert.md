# 插入（INSERT）

## 定义

**INSERT** 向表中追加一行或多行数据。可指定列清单与值列表对应，省略列时使用 DEFAULT 或 NULL；支持 **`INSERT ... SELECT`** 从查询结果批量插入，以及 **`DEFAULT VALUES`** 插入一行且各列均取默认值。

## 概念要点

- **列清单可选**：省略时须为**全部列**提供值，且顺序与表定义一致（含隐藏列时需注意）。
- **DEFAULT**：列有 DEFAULT 且未出现在 INSERT 清单中则使用默认值；无 DEFAULT 的可空列则为 NULL。
- **INTEGER PRIMARY KEY 省略**：不指定 id 时自动分配 rowid（见 [建表](./create-table)）。
- **多行 INSERT**：一条语句多个 `VALUES` 元组，减少往返。
- **INSERT SELECT**：目标列与 SELECT 列数、类型应匹配（SQLite 动态类型较宽松）。
- **RETURNING**（3.35+）：插入后返回新行字段（与 [更新与删除](./update-delete) 相同子句）。
- **冲突处理**：违反 UNIQUE/PK 时报错；需静默或更新时用 [替换与 UPSERT](./replace-upsert)。

## 语法 / 清单表

| 形式 | 语法 | 用途 |
| ---- | ---- | ---- |
| 指定列 | `INSERT INTO t (a,b) VALUES (1,'x')` | 常用 |
| 全列 | `INSERT INTO t VALUES (...)` | 列顺序须与表一致 |
| 多行 | `INSERT INTO t (a) VALUES (1), (2), (3)` | 批量 |
| 查询插入 | `INSERT INTO t (a,b) SELECT x,y FROM s` | 拷贝/迁移 |
| 默认行 | `INSERT INTO t DEFAULT VALUES` | 各列 DEFAULT/NULL |
| 返回值 | `INSERT INTO t (...) VALUES (...) RETURNING id` | 取新主键 |

### INSERT 与约束交互

| 情况 | 结果 |
| ---- | ---- |
| NOT NULL 列未提供且无 DEFAULT | 错误 |
| UNIQUE/PK 重复 | 错误（除非 UPSERT） |
| FK 引用不存在 | 错误（需 `foreign_keys=ON`） |
| CHECK 不满足 | 错误 |
| GENERATED 列 | 不要出现在 INSERT 列清单 |

## 示例

### 基本插入与 DEFAULT

```sql
PRAGMA foreign_keys = ON;

CREATE TABLE tasks (
  id          INTEGER PRIMARY KEY,
  title       TEXT    NOT NULL,
  status      TEXT    NOT NULL DEFAULT 'todo',
  priority    INTEGER DEFAULT 0,
  created_at  TEXT    DEFAULT (datetime('now'))
);

-- 只写必填列，其余用 DEFAULT
INSERT INTO tasks (title) VALUES ('学习 SQLite');
INSERT INTO tasks (title, status) VALUES ('写文档', 'doing');

-- 一行全用默认值（id 自动分配，title 无 DEFAULT 会失败 — 此例 title NOT NULL 不可用 DEFAULT VALUES）
-- INSERT INTO tasks DEFAULT VALUES;  -- 会报错：title NOT NULL
```

### 多行 INSERT

```sql
INSERT INTO tasks (title, priority) VALUES
  ('任务 A', 1),
  ('任务 B', 2),
  ('任务 C', 3);
-- 一次语句插入三行，比三条 INSERT 更高效
```

### INSERT SELECT 与 RETURNING

```sql
CREATE TABLE tasks_archive AS SELECT * FROM tasks WHERE 0;  -- 空表同结构

INSERT INTO tasks_archive (id, title, status, priority, created_at)
SELECT id, title, status, priority, created_at
FROM tasks
WHERE status = 'done';  -- 把已完成任务归档

-- 插入并返回新 rowid
INSERT INTO tasks (title) VALUES ('新任务')
RETURNING id, created_at;
```

## 易错点与交叉引用

| 问题 | 说明 |
| ---- | ---- |
| VALUES 列数不匹配 | 与列清单或全表列数不一致则报错 |
| 省略列但顺序错 | 全列 INSERT 依赖表定义顺序，ALTER ADD 后顺序变化 |
| 忘记开外键 | 插入非法 `user_id` 可能不被拒绝 |
| 对 GENERATED 列 INSERT | 应省略，由表达式计算 |
| 大事务一次插百万行 | 注意 journal 与内存；可分批 + 事务 |
| 与 UPSERT 混淆 | 普通 INSERT 冲突即失败；要「有则更新」见 [替换与 UPSERT](./replace-upsert) |
| 字符串引号 | 文本值用单引号 `'...'`；双引号是标识符引号 |

### 批量插入与事务

大量写入时宜包在事务中，减少 fsync 次数：

```sql
BEGIN;
INSERT INTO logs (msg) VALUES ('line 1');
INSERT INTO logs (msg) VALUES ('line 2');
-- ... 或单条多行 INSERT
COMMIT;
```

**相关章节**：[建表](./create-table) · [约束](./constraints) · [更新与删除](./update-delete) · [替换与 UPSERT](./replace-upsert) · [SELECT](./select)

## SQLite 官方参考

- [INSERT](https://www.sqlite.org/lang_insert.html)
- [DEFAULT VALUES](https://www.sqlite.org/lang_insert.html#default_values)
- [RETURNING clause](https://www.sqlite.org/lang_returning.html)
- [INSERT ... SELECT](https://www.sqlite.org/lang_insert.html#insert_select)
