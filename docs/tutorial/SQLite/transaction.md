# 事务

## 定义

**事务（Transaction）** 将一组 SQL 操作包成原子单元：要么全部成功提交（`COMMIT`），要么全部撤销（`ROLLBACK`）。SQLite 默认 **autocommit** 模式：每条语句自动提交；显式 `BEGIN` 开启事务后，直到 `COMMIT`/`ROLLBACK` 才结束。

## 概念要点

- **ACID**：Atomicity（原子）、Consistency（一致）、Isolation（隔离）、Durability（持久）。
- **autocommit**：未 `BEGIN` 时，每条独立语句是一个事务。
- **DEFERRED / IMMEDIATE / EXCLUSIVE**：`BEGIN` 后可指定锁升级策略；默认 `DEFERRED` 读锁，写时再升级。
- **SAVEPOINT**：事务内嵌套检查点，可部分回滚到命名点而不放弃整个事务。
- **WAL 模式**：`PRAGMA journal_mode=WAL` 下读写并发更好（见 [VACUUM 与 PRAGMA](./vacuum-pragma)）。

### 锁与并发（直觉）

| 模式 | 读 | 写 | 直觉 |
| ---- | -- | -- | ---- |
| 未事务 / 读 | 共享锁 | — | 多人可同时读 |
| 写事务 | 阻塞新写 | 独占 | 同一时刻只有一个写者 |
| WAL | 读不阻塞写（多数情况） | 写仍串行 | 适合读多写少 |

SQLite 是**文件级**数据库：单连接写串行；多进程/多连接靠锁协调，不是客户端/服务器多线程模型。

## 语法 / 清单表

| 操作 | 语法 |
| ---- | ---- |
| 开始 | `BEGIN [DEFERRED \| IMMEDIATE \| EXCLUSIVE] [TRANSACTION]` |
| 提交 | `COMMIT` 或 `END TRANSACTION` |
| 回滚 | `ROLLBACK [TRANSACTION]` |
| 保存点 | `SAVEPOINT name` |
| 回滚到点 | `ROLLBACK TO [SAVEPOINT] name` |
| 释放点 | `RELEASE [SAVEPOINT] name` |
| 自动回滚 | 语句出错且未处理 → 整个事务进入 aborted，需 `ROLLBACK` |

## 示例

### 基本转账：全成功或全失败

```sql
BEGIN IMMEDIATE;  -- 写事务尽早拿写锁，减少死锁重试

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- 业务校验：余额不能为负
SELECT CASE
  WHEN (SELECT balance FROM accounts WHERE id = 1) < 0
  THEN RAISE(ABORT, 'insufficient funds')
END;

COMMIT;
```

### ROLLBACK 撤销

```sql
BEGIN;

INSERT INTO orders (user_id, total) VALUES (1, 99.9);
-- 发现库存不足，放弃整笔
ROLLBACK;
```

### SAVEPOINT：部分回滚

```sql
BEGIN;

INSERT INTO users (name) VALUES ('Alice');   -- 步骤 1
SAVEPOINT sp1;

INSERT INTO orders (user_id, total) VALUES (last_insert_rowid(), 50);
-- 订单校验失败，只撤销步骤 2
ROLLBACK TO sp1;

-- 用户仍保留，继续其它操作
INSERT INTO audit (msg) VALUES ('order skipped');
COMMIT;
```

### UPSERT 与事务

```sql
BEGIN;

INSERT INTO settings (key, value) VALUES ('theme', 'dark')
ON CONFLICT(key) DO UPDATE SET value = excluded.value;

COMMIT;
```

## 易错点与交叉引用

| 问题 | 说明 |
| ---- | ---- |
| 忘记 COMMIT | 连接关闭时未提交事务会自动 ROLLBACK |
| aborted 状态 | 出错后继续发 SQL 会报 `cannot commit - no transaction is active` 等，须先 ROLLBACK |
| 长事务 | 长时间占用写锁阻塞其它写者；WAL 下仍可能拖慢 checkpoint |
| 嵌套 BEGIN | SQLite 不支持真正嵌套事务，仅 SAVEPOINT 模拟 |
| 应用层连接池 | 每条连接独立事务上下文，勿假设跨请求共享事务 |
| 触发器/约束失败 | 同语句内失败会导致整事务回滚（除非 SAVEPOINT 捕获） |

**相关章节**：[插入](./insert) · [替换与 UPSERT](./replace-upsert) · [触发器](./trigger) · [D1 与标准 SQLite 差异](./d1-notes)

## SQLite 官方参考

- [BEGIN TRANSACTION](https://www.sqlite.org/lang_transaction.html)
- [SAVEPOINT](https://www.sqlite.org/lang_savepoint.html)
- [SQLite 事务（文件锁）](https://www.sqlite.org/lockingv3.html)
- [WAL 模式](https://www.sqlite.org/wal.html)
