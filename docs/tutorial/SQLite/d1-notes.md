# D1 与标准 SQLite 差异

> **说明**：完整 SQL 语法见本目录其它章节（[SELECT](./select)、[事务](./transaction)、[FTS](./fts) 等）。**本页只列 Cloudflare D1 与本地 `sqlite3` 的差异与用法要点**，权威来源为 [Cloudflare D1 文档](https://developers.cloudflare.com/d1/)。

## 定义

**Cloudflare D1** 是运行在 Cloudflare 全球网络上的**托管 SQLite 兼容** SQL 数据库：底层使用 SQLite 查询引擎，通过 Workers **绑定（binding）** 从边缘代码访问，由平台负责持久化、复制与运维。D1 **兼容大部分 SQLite SQL**，但并非与本地 `sqlite3` CLI 的每一特性完全一致。

## D1 是什么

| 维度 | D1 | 本地 SQLite |
| ---- | -- | ----------- |
| 部署 | Cloudflare 托管，绑定到 Worker/Pages | 进程内库或单文件 |
| 访问 | `env.DB.prepare()` 等 Binding API | C API / CLI / 驱动 |
| 规模模型 | 建议多库水平扩展（如每租户一库，单库上限 10 GB） | 单文件可很大（受 OS 限制） |
| 并发 | 单库单线程串行处理查询；读副本可分担读 | 文件锁 + WAL 等 |
| 计费 | 按 rows read/written、存储 | 无（自托管） |

## Workers 绑定用法要点

在 `wrangler.jsonc` 配置 `d1_databases` 后，Worker 内通过 `env.DB`（名称随 `binding` 而定）访问：

```javascript
// prepare → bind → run / all / first / raw
const stmt = env.DB.prepare(
  "SELECT * FROM users WHERE email = ?"
).bind(email);

const { results, meta } = await stmt.run();   // 含 meta（rows_read 等）
const rows = await stmt.all();                // 等同 run().results
const one = await stmt.first();               // 首行或 null
const grid = await stmt.raw();                // 二维数组，无 meta
```

```javascript
// batch：多条语句一次往返，顺序执行、等价事务；任一条失败则整批回滚
const batchResult = await env.DB.batch([
  env.DB.prepare("INSERT INTO logs (msg) VALUES (?)").bind("a"),
  env.DB.prepare("UPDATE counters SET n = n + 1 WHERE id = 1"),
]);
```

| API | 用途 |
| --- | ---- |
| `prepare(sql)` | 预编译语句（推荐，防注入） |
| `bind(...vals)` | 绑定 `?` / `?NNN` 占位符 |
| `run()` | 执行并返回 `D1Result`（含 `meta`、`results`） |
| `all()` | 只要结果行数组 |
| `first(col?)` | 第一行或单列值 |
| `raw({ columnNames })` | 二维数组结果 |
| `batch([stmt...])` | 批量执行（事务语义） |
| `exec(sql)` | 多语句字符串；返回 `D1ExecResult` |

**参数绑定**：遵循 SQLite 约定；当前 D1 支持 `?` 与 `?NNN`，**命名参数（`:name`）尚未支持**。勿传 `undefined`，应显式传 `null`（否则可能 `D1_TYPE_ERROR`）。

## 与本地 SQLite 的常见差异 / 限制

| 类别 | 本地 SQLite | D1 注意 |
| ---- | ----------- | ------- |
| 外键 | 默认 `foreign_keys=OFF`，需手动开 | **默认等价 `PRAGMA foreign_keys=ON`**；不能用 `foreign_keys=OFF` 永久关闭 |
| 延迟外键 | `PRAGMA defer_foreign_keys` | 支持，**仅当前事务**；迁移时临时放宽约束 |
| PRAGMA | 丰富 | **仅支持子集**；且多数**只对当前事务有效** |
| `journal_mode` / `VACUUM` | 用户可控 | 托管环境；勿依赖本地 WAL/VACUUM 运维习惯 |
| `ATTACH DATABASE` | 可附加库 | **不支持**附加独立文件库 |
| 扩展模块 | 视编译选项 | D1 内置 **FTS5、JSON1、数学函数** 等子集，非全部扩展 |
| 事务模型 | 显式 `BEGIN`…`COMMIT` | 每条 Binding 调用在**隐式事务**中；跨语句原子性用 **`batch()`** |
| 会话/连接 | 长连接状态 | **无传统长连接**；PRAGMA 不跨请求保留 |
| 大整数 | int64 完整 | JS 绑定 **Number 仅 52 位精度**；超大整数可能失真 |
| 并发写 | 文件锁竞争 | 单库串行；过载返回 overloaded 类错误，可重试 |
| 时间 | `datetime('now')` 等 | 仍用 SQLite 函数；**业务时区建议在应用层统一** |

### D1 支持的 PRAGMA（部分）

`table_info`、`table_list`、`index_list`、`index_info`、`foreign_key_list`、`foreign_key_check`、`quick_check`、`defer_foreign_keys`、`foreign_keys`（事务内）、`optimize` 等。完整列表见官方 [SQL statements / PRAGMA](https://developers.cloudflare.com/d1/sql-api/sql-statements/)。

**不支持或受限示例**：`PRAGMA optimize(-1)`；许多本地可用的 PRAGMA 在 D1 未开放；**不要假设** `journal_mode`、`cache_size` 等与本地行为相同。

### 不支持 / 慎用（基于官方文档）

- **`ATTACH DATABASE`**：不能挂载外部 `.db` 文件。
- **任意加载 SQLite 扩展**：仅平台内置模块可用。
- **跨 Worker 请求共享事务**：每次调用独立；用 `batch()` 或业务幂等 + 重试。
- **单条超大变更**：百万行 `UPDATE`/`DELETE` 需分批（平台执行限制）。
- **命名绑定参数**：暂不支持 `:name` / `@name`（以文档为准）。

## 类型与 JS 绑定注意

| SQLite 存储 | JS 返回值 | 注意 |
| ----------- | --------- | ---- |
| `NULL` | `null` | 勿用 `undefined` 绑定 |
| `INTEGER` | `number` | 超过 `Number.MAX_SAFE_INTEGER` 可能丢精度 |
| `REAL` | `number` | 浮点误差同 JS |
| `TEXT` | `string` | UTF-8 |
| `BLOB` | `ArrayBuffer` 等 | 视 API 版本 |

写入时类型应与列亲和性一致；不匹配可能 `D1_TYPE_ERROR`。查询 meta 含 `rows_read`、`rows_written`，可用于估算 [D1 计费](https://developers.cloudflare.com/d1/platform/pricing/)。

## 迁移与本地开发（一句）

使用 **`wrangler d1 migrations create / apply`** 管理 `migrations/*.sql`；本地 `wrangler dev` 默认写**本地 D1 实例**，上生产用 `wrangler d1 migrations apply --remote` 或配置 `remote` 绑定。导入现有 SQLite 数据见 [Import and export](https://developers.cloudflare.com/d1/best-practices/import-export-data/)。

```bash
npx wrangler d1 create my-db
npx wrangler d1 migrations create my-db init_schema
npx wrangler d1 migrations apply my-db --local   # 或 --remote
```

## 易错点

| 问题 | 说明 |
| ---- | ---- |
| 假设与本地完全一致 | D1 是 **SQLite-compatible**，不是 byte-for-byte 相同 |
| 未用 prepared statement | 动态 SQL 应 `prepare` + `bind`，避免注入与计划缓存缺失 |
| 多语句不用 batch | 分开 `await` 两次写**不保证**同一原子事务 |
| 本地测完直接上生产 | 本地/远程是不同实例；迁移与 `--remote` 要分清 |
| 忽略 rows_read | 全表 `SELECT *` 在 D1 有真实 IO 与计费成本 |
| 外键迁移顺序 | 用 `PRAGMA defer_foreign_keys = ON` 包裹 DDL |

## 官方链接

- [D1 文档首页](https://developers.cloudflare.com/d1/)
- [Workers Binding API](https://developers.cloudflare.com/d1/worker-api/)
- [Prepared statements](https://developers.cloudflare.com/d1/worker-api/prepared-statements/)
- [SQL statements 与 PRAGMA](https://developers.cloudflare.com/d1/sql-api/sql-statements/)
- [Foreign keys](https://developers.cloudflare.com/d1/sql-api/foreign-keys/)
- [Migrations](https://developers.cloudflare.com/d1/reference/migrations/)
- [Local development](https://developers.cloudflare.com/d1/best-practices/local-development/)
- [Limits 与 FAQ](https://developers.cloudflare.com/d1/platform/limits/)
