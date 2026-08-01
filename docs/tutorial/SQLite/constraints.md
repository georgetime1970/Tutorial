# 约束（Constraints）

## 定义

**约束**限制表中数据的合法性：主键保证行唯一标识，外键维护表间引用，NOT NULL / CHECK / DEFAULT / UNIQUE 等约束列值域与默认值。**GENERATED ALWAYS** 列由表达式计算得出，不可直接写入（除非 VIRTUAL 存储策略下部分场景）。

## 概念要点

- **PRIMARY KEY**：唯一且非 NULL（SQLite 中 NULL 不可作 PK 值）；单列表 INTEGER PK 常为 rowid 别名（见 [建表](./create-table)）。
- **UNIQUE**：列值唯一；与 PK 类似允许多个 NULL（NULL 与 NULL 不相等）。
- **NOT NULL**：禁止 SQL NULL。
- **DEFAULT**：省略 INSERT 列时使用；可用字面量或 `(...)` 表达式。
- **CHECK**：布尔表达式，插入/更新时须为真。
- **FOREIGN KEY**：子表列引用父表列；**默认不启用**，须 `PRAGMA foreign_keys = ON`（每个连接都要设）。
- **REFERENCES 动作**：`ON DELETE` / `ON UPDATE` 指定父行变更时的行为。
- **GENERATED ALWAYS**：`STORED`（物化存储）或 `VIRTUAL`（查询时计算，默认）。

### 外键动作速查

| 动作 | DELETE 时 | UPDATE 时 |
| ---- | --------- | --------- |
| `RESTRICT` | 有引用则拒绝删除（默认） | 有引用则拒绝更新父键 |
| `NO ACTION` | 同 RESTRICT（延迟检查时可不同） | 同 RESTRICT |
| `CASCADE` | 级联删除子行 | 级联更新子表 FK 列 |
| `SET NULL` | 子表 FK 设为 NULL | 子表 FK 设为 NULL |
| `SET DEFAULT` | 子表 FK 设为 DEFAULT | 子表 FK 设为 DEFAULT |

## 语法 / 清单表

| 约束 | 列级写法 | 表级写法 |
| ---- | -------- | -------- |
| PRIMARY KEY | `id INTEGER PRIMARY KEY` | `PRIMARY KEY (a, b)` |
| NOT NULL | `name TEXT NOT NULL` | — |
| UNIQUE | `email TEXT UNIQUE` | `UNIQUE (a, b)` |
| DEFAULT | `status TEXT DEFAULT 'active'` | — |
| CHECK | `age INTEGER CHECK (age >= 0)` | `CHECK (a < b)` |
| FOREIGN KEY | `user_id INTEGER REFERENCES users(id)` | `FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE` |
| GENERATED | `total AS (qty * price) STORED` | — |

### 启用外键（必做）

```sql
PRAGMA foreign_keys = ON;  -- 每个数据库连接执行一次
-- 验证：PRAGMA foreign_keys; 应返回 1
```

## 示例

### 主键、唯一、CHECK、DEFAULT

```sql
PRAGMA foreign_keys = ON;

CREATE TABLE users (
  id       INTEGER PRIMARY KEY,
  username TEXT    NOT NULL UNIQUE,
  age      INTEGER CHECK (age IS NULL OR age >= 0),
  role     TEXT    NOT NULL DEFAULT 'member'
);

INSERT INTO users (username, age) VALUES ('bob', 25);
INSERT INTO users (username) VALUES ('carol');  -- role 默认为 'member'
-- INSERT INTO users (username, age) VALUES ('bad', -1);  -- CHECK 失败
```

### 外键与级联

```sql
PRAGMA foreign_keys = ON;

CREATE TABLE posts (
  id      INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  title   TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

INSERT INTO posts (user_id, title) VALUES (1, 'Hello');
DELETE FROM users WHERE id = 1;  -- 启用 FK 后，posts 中对应行一并删除
```

### GENERATED ALWAYS 列

```sql
CREATE TABLE order_items (
  id        INTEGER PRIMARY KEY,
  qty       INTEGER NOT NULL,
  unit_price REAL   NOT NULL,
  line_total REAL GENERATED ALWAYS AS (qty * unit_price) STORED
);

INSERT INTO order_items (qty, unit_price) VALUES (3, 9.99);
SELECT line_total FROM order_items;  -- 29.97，不可 INSERT 直接写 line_total
```

## 易错点与交叉引用

| 问题 | 说明 |
| ---- | ---- |
| 未 `PRAGMA foreign_keys=ON` | 外键约束**完全不检查**，数据可能不一致 |
| 父表被引用仍删除 | 未开 FK 或 NO ACTION 时行为不同；生产必开 FK |
| UNIQUE 与 NULL | 多行 NULL 不冲突；业务「唯一且必填」需加 NOT NULL |
| AUTOINCREMENT 与 FK | 子表 FK 类型宜与父 PK 一致（INTEGER） |
| GENERATED 列写入 | STORED/VIRTUAL 均不可在 INSERT 列清单中赋值（除非 DEFAULT 特殊语法） |
| DEFERRABLE FK | SQLite 支持有限；多数场景即时检查 |

**相关章节**：[建表](./create-table) · [修改与删除表](./alter-drop) · [插入](./insert) · [替换与 UPSERT](./replace-upsert) · [事务](./transaction)

## SQLite 官方参考

- [CREATE TABLE — 约束](https://www.sqlite.org/lang_createtable.html#constraints)
- [Foreign Key Support](https://www.sqlite.org/foreignkeys.html)
- [PRAGMA foreign_keys](https://www.sqlite.org/pragma.html#pragma_foreign_keys)
- [Generated Columns](https://www.sqlite.org/gencol.html)
- [CHECK constraints](https://www.sqlite.org/lang_createtable.html#checkconst)
