# VACUUM 与 PRAGMA

## 定义

**VACUUM** 重建整个数据库文件：回收已删除数据留下的空闲页、可选整理页布局，使文件体积缩小。**PRAGMA** 是 SQLite 扩展命令，用于查询或修改库/连接级行为、查看 schema 元数据（不能代替 `SELECT` 查表数据）。

## 概念要点

- **VACUUM 代价**：复制全库到新文件再替换，大库耗时长、需额外磁盘空间；生产环境宜低峰执行。
- **auto_vacuum**：`PRAGMA auto_vacuum` 可设为 `INCREMENTAL` 等，增量回收，但不能完全替代手动 VACUUM。
- **PRAGMA 作用域**：多数仅影响**当前连接**或**当前事务**；D1 上 PRAGMA 通常仅对当前事务有效（见 [D1 差异](./d1-notes)）。
- **foreign_keys**：SQLite 默认不强制外键，须 `PRAGMA foreign_keys = ON`（D1 默认等价于始终 ON）。

## 语法 / 清单表

### VACUUM

| 操作 | 语法 |
| ---- | ---- |
| 整库整理 | `VACUUM` |
| 指定库 | `VACUUM schema_name` |
|  INTO 新文件 | `VACUUM INTO 'backup.db'`（SQLite 3.27+） |

### 常用 PRAGMA（清单级）

| PRAGMA | 用途 | 典型值 / 说明 |
| ------ | ---- | ------------- |
| `foreign_keys` | 外键 enforcement | `ON` / `OFF`；连接级 |
| `defer_foreign_keys` | 事务内延迟检查 | `ON` / `OFF`；迁移常用 |
| `journal_mode` | 日志模式 | `DELETE`（默认）、`WAL`、`MEMORY` 等 |
| `synchronous` | 刷盘策略 | `OFF` / `NORMAL` / `FULL` / `EXTRA` |
| `table_info(T)` | 列信息 | cid, name, type, notnull, dflt, pk |
| `table_list` | 表/视图列表 | schema, name, type, ncol… |
| `index_list(T)` | 表上索引 | name, unique, origin… |
| `index_info(I)` | 索引列 | seqno, cid, name |
| `compile_options` | 编译选项 | 是否含 FTS5、JSON1 等 |
| `integrity_check` | 完整性 | 返回 `ok` 或错误描述 |
| `quick_check` | 快速检查 | 比 integrity_check 轻 |
| `cache_size` | 页缓存页数 | 负值表示 KB |
| `encoding` | 数据库编码 | `UTF-8` / `UTF-16` |
| `user_version` | 应用版本号 | 整数，迁移标记常用 |
| `recursive_triggers` | 触发器递归 | `ON` / `OFF` |

## 示例

### VACUUM 与备份

```sql
-- 大量 DELETE 后文件仍很大，手动回收
VACUUM;

-- 导出整理后的副本（不替换当前库）
VACUUM INTO 'compact_backup.db';
```

### 开启外键（本地 sqlite3）

```sql
PRAGMA foreign_keys = ON;

CREATE TABLE parent (id INTEGER PRIMARY KEY);
CREATE TABLE child (
  id INTEGER PRIMARY KEY,
  pid INTEGER REFERENCES parent(id)
);

-- 无对应 parent 时会失败
INSERT INTO child (pid) VALUES (999);
```

### 查看 schema 与索引

```sql
-- 列结构
PRAGMA table_info(orders);

-- 所有表与视图
PRAGMA table_list;

-- orders 上的索引
PRAGMA index_list(orders);

-- 某索引包含哪些列
PRAGMA index_info(idx_orders_user_id);

-- 编译时启用的模块
PRAGMA compile_options;
-- 示例结果行：'ENABLE_FTS5'、'ENABLE_JSON1' 等
```

### journal_mode 与 WAL

```sql
-- 查看当前模式
PRAGMA journal_mode;

-- 切换 WAL（需写权限；切换时可能短暂锁库）
PRAGMA journal_mode = WAL;

-- WAL 下读写并发更好；checkpoint 由 SQLite 自动或 PRAGMA wal_checkpoint 触发
PRAGMA wal_checkpoint(TRUNCATE);
```

### 应用迁移版本号

```sql
PRAGMA user_version;          -- 读取
PRAGMA user_version = 3;        -- 写入：标记 schema 已到 v3
```

## 易错点与交叉引用

| 问题 | 说明 |
| ---- | ---- |
| 默认外键关闭 | 本地 SQLite 须显式 `foreign_keys=ON`；D1 行为不同 |
| VACUUM 需要空间 | 磁盘不足会失败；D1 托管环境勿假设可随意 VACUUM |
| journal_mode 持久 | 设置会写入数据库头；多连接需一致认知 |
| PRAGMA 非标准 SQL | 移植到 PostgreSQL/MySQL 无对应命令 |
| table_info 的 notnull | 返回 0 表示**允许** NULL（与直觉相反） |
| compile_options 查能力 | 部署环境 FTS/JSON 是否可用以此为准 |

**相关章节**：[约束](./constraints) · [事务](./transaction) · [D1 与标准 SQLite 差异](./d1-notes)

## SQLite 官方参考

- [VACUUM](https://www.sqlite.org/lang_vacuum.html)
- [PRAGMA 语句索引](https://www.sqlite.org/pragma.html)
- [PRAGMA foreign_keys](https://www.sqlite.org/pragma.html#pragma_foreign_keys)
- [PRAGMA journal_mode](https://www.sqlite.org/pragma.html#pragma_journal_mode)
- [PRAGMA compile_options](https://www.sqlite.org/pragma.html#pragma_compile_options)
