## 一、SQLite “功能”分类

| 分类    | 名称                       | 用途                |
| ------- | -------------------------- | ------------------- |
| **DDL** | Data Definition Language   | 定义表结构          |
| **DML** | Data Manipulation Language | 操作数据            |
| **DQL** | Data Query Language        | 查询数据            |
| **DCL** | Data Control Language      | 权限控制(D1 用不到) |

## 二、DDL(表结构相关)

### 1️⃣ CREATE TABLE 创建表

```sql
-- 创建表语法
CREATE TABLE [IF NOT EXISTS] [schema_name].table_name (
	column_1 data_type PRIMARY KEY,
   	column_2 data_type NOT NULL,
	column_3 data_type DEFAULT 0,
	table_constraints
) [WITHOUT ROWID]; -- 不创建 rowid 列
```

```sql
-- 例子: 定义一张 user 表的结构(字段、类型、约束)
CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT, -- 唯一标识,不可重复,INTEGER PRIMARY KEY = 设置 rowid 的别名,AUTOINCREMENT:自动递增(不建议)
  -- 这句话的意思是使用id来代替rowid,并且使用自增,不会重用已删除的数字(一般没必要,AUTOINCREMENT会有额外cpu开销)
  user_id INTEGER UNIQUE NOT NULL, --整数,唯一,不为空
  user_name TEXT,  -- text类型
  first_name TEXT,
  last_name TEXT,
  language_code TEXT,
  is_bot BOOLEAN DEFAULT 0, -- 布尔类型,默认为0(flase,1为true)
  is_premium BOOLEAN DEFAULT 0,
  wallet TEXT,
  wallet_key TEXT,
  inviter_id INTEGER,
  join_date DATETIME DEFAULT CURRENT_TIMESTAMP, -- datetime类型,默认CURRENT_TIMESTAMP:当前时间
  airdrop_count INTEGER DEFAULT 0,
  airdrop_amount DECIMAL(10, 2) DEFAULT 0.00, -- decimal类型,默认0.00
  airdrop_latest_time DATETIME,
  op_latest_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (inviter_id) REFERENCES user(user_id)  -- 外键约束,inviter_id的值必须是user_id存在的值
);
```

[CREATE TABLE 参考](https://www.sqlitetutorial.net/sqlite-create-table/)

#### 原始数据类型

- SQLite 提供了五种原始数据类型,通常称为 存储类
- 在许多情况下,您可以将存储类和数据类型互换使用

| 类型      | 含义                                               |
| --------- | -------------------------------------------------- |
| `NULL`    | 表示缺失的信息或未知                               |
| `INTEGER` | 整数(正整数或负整数)                               |
| `REAL`    | 使用 8 字节浮点数表示的带有小数部分的实数          |
| `TEXT`    | 字符串                                             |
| `BLOB`    | 二进制,可以存储任何类型的数据,如图像、视频、文档等 |

- SQLite 使用一种 动态类型系统 ,你可以将任何类型的值存储在某一列中.
- SQLite 提供了五种存储类,包括 `INTEGER`、`REAL`、`TEXT`、`BLOB` 和 `NULL`.
- 使用 `typeof()` 函数来检查一个值的存储类型.
- 显式类型: 建表时写的类型(如 INTEGER, TEXT),只是建议,用来决定类型亲和性
- 类型亲和性: 指的是列的推荐类型,SQLite 实际尝试转换的规则

[数据类型 参考](https://www.sqlitetutorial.net/sqlite-data-types/)

#### AUTOINCREMENT 自增

```sql
CREATE TABLE table_name(
   column1 INTEGER AUTOINCREMENT, -- 整数并且自增,不需要主动写入
   column2 datatype,
   column3 datatype,
   .....
   columnN datatype,
);
```

- `AUTOINCREMENT` 和 `rowid` 的区别: AUTOINCREMENT 不会重用已删除的数字

[AUTOINCREMENT 和 ROWID 参考](https://www.sqlitetutorial.net/sqlite-autoincrement/)

#### 约束 Constraints

| Constraints                                            | 说明                                                                                             |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `INTEGER PRIMARY KEY`                                  | 等于将这一列作为 rowid 的别名列                                                                  |
| `PRIMARY KEY`                                          | 唯一标识,NOT NULL 和 UNIQUE 的结合,只能有一个;多个可使用`PRIMARY KEY(column_1,column_2,...)`定义 |
| `UNIQUE`                                               | 确保列中的所有值都是唯一的,可为空;多个可使用`UNIQUE(column_1,column_2,...)`                      |
| `NOT NULL`                                             | 确保列不能有 NULL 值                                                                             |
| `DEFAULT`                                              | 规定没有给列赋值时的默认值                                                                       |
| `CHECK(expression)`                                    | 保证列中的值符合指定的条件                                                                       |
| `FOREIGN KEY (column1) REFERENCES table_name(column1)` | 外键约束,当前表中的 column1 字段的数据必须在 table_name 表的 column2 字段的数据中                |
| `GENERATED ALWAYS`                                     | 生成列,数据根据其他列计算得来                                                                    |
| `STRICT `                                              | 严格表,将严格按照指定类型进行类型约束                                                            |

**FOREIGN KEY 外键约束**

被约束的字段的值必须在约束字段的值中

```sql
FOREIGN KEY (foreign_key_columns)
   REFERENCES parent_table(parent_key_columns)
      ON UPDATE action -- 当父键被删除或更新时外键约束的行为
      ON DELETE action;
```

SQLite supports the following actions:

| actions     | 说明                                                                   |
| ----------- | ---------------------------------------------------------------------- |
| SET NULL    | 当父表的主键发生删除或更新操作时,子表中所有对应行的外键将被设置为 NULL |
| SET DEFAULT | 外键的值设置为列定义中指定的默认值                                     |
| RESTRICT    | 不允许更改或删除父表主键中的值                                         |
| NO ACTION   | 效果与 RESTRICT 相似                                                   |
| CASCADE     | 当您更新或删除父键时,CASCADE 操作会将更改从父表传播到子表              |

[外键约束 参考](https://www.sqlitetutorial.net/sqlite-foreign-key/)

**GENERATED ALWAYS 生成列**

使用其他列的值计算当前列的值

```sql
column_name data_type
    [GENERATED ALWAYS] AS expression
    [VIRTUAL | STORED]
```

```sql
-- net_price 的值由price discount 和tax的值计算而来,没有指定STORED,这里,默认是VIRTUAL
CREATE TABLE products(
    name TEXT NOT NULL,
    price REAL NOT NULL,
    discount REAL NOT NULL,
    tax REAL NOT NULL,
    net_price REAL GENERATED ALWAYS
        AS (price * (1-discount) * (1+tax))
);
```

- 生成列是其值由同一表中的其他列派生而来的列.
- 使用 `GENERATED ALWAYS` 约束来声明一个生成列.
- 使用 `VIRTUAL` 或 `STORED` 选项来定义生成列.STORED 列会占用数据库文件的空间,而 VIRTUAL 列则不会.如果未明确指定,SQLite 默认使用 VIRTUAL 选项
- 当你希望优化读取性能时,使用 STORED 选项；当你希望优化写入性能时,使用 VIRTUAL 选项

[生成列 参考](https://www.sqlitetutorial.net/sqlite-generated-columns/)

**严格表**

```sql
CREATE TABLE strict_table_name(
    column type constraint,
    ...
) STRICT; -- 使用STRICT 关键字,表明这是一个严格表
```

- 使用 `STRICT` 关键字定义严格表.
- 严格表使用静态类型列而不是动态类型列.
- 严格表中的 `INTEGER PRIMARY KEY` 列隐含了 NOT NULL 约束

[严格表 参考](https://www.sqlitetutorial.net/sqlite-strict-tables/)

#### 索引 Index

```sql
-- 创建单行索引
CREATE [UNIQUE] INDEX [IF NOT EXISTS] index_name
ON table_name(column_list);
```

```sql
-- 创建多行索引(联合索引)
-- 只有WHERE first_name = 'John';和 WHERE first_name = 'John' AND last_name = 'Doe'会启用多行索引;
-- 但是依据 最左前缀匹配原则 first_name 能单独享受该索引
CREATE [UNIQUE] INDEX [IF NOT EXISTS] index_names
ON contacts (first_name, last_name);
```

```sql
-- 表达式索引 参考: https://www.sqlitetutorial.net/sqlite-index-expression/
CREATE INDEX invoice_line_amount
ON invoice_items(unitprice*quantity);
```

```sql
-- 删除索引
DROP INDEX [IF EXISTS] index_name;
```

```sql
-- 例子: 给 user 表的 inviter_id 字段创建索引
-- 创建索引 (仅保留 inviter_id 的索引,user_id 索引由 UNIQUE 自动生成)
CREATE INDEX idx_user_inviter_id
ON user(inviter_id);
```

| 约束                  | 说明                   |
| --------------------- | ---------------------- |
| `INTEGER PRIMARY KEY` | 最重要,最快,推荐使用   |
| `PRIMARY KEY`         | 自动创建一个唯一索引   |
| `UNIQUE`              | 唯一索引(unique index) |

- `UNIQUE` ≈ `CREATE UNIQUE INDEX(隐式)`

📌 适合建索引的字段：

- 经常 `WHERE`
- 经常 `ORDER BY`
- 用户 ID、外键

**隐式索引**

- 隐式索引是在创建对象时,由数据库服务器自动创建的索引.
- SQLite 自动为主键约束(`PRIMARY KEY`)和唯一约束(`UNIQUE`)创建索引

**查看是否使用索引**

```sql
EXPLAIN QUERY PLAN -- 查看语句
SELECT
	first_name,
	last_name,
	email
FROM
	contacts
WHERE
	email = 'lisa.smith@sqlitetutorial.net';
```

**显示索引**

要查找与某张表相关联的所有索引,可以使用以下命令：

```sql
PRAGMA index_list('table_name');
```

要获取索引中列的信息,您可以使用以下命令：

```sql
PRAGMA index_info('idx_table_name');
```

[Index 参考](https://www.sqlitetutorial.net/sqlite-index/)

### 2️⃣ ALTER TABLE 修改表

```sql
-- 重命名表: 将 user 表重命名为 userDate
ALTER TABLE user
RENAME TO userDate;
```

```sql
-- 重命名列: 将current_name 重命名为 new_name
ALTER TABLE table_name
RENAME COLUMN current_name TO new_name;
```

```sql
-- 增加列: 给 user 表增加 email 字段
ALTER TABLE user
ADD COLUMN email TEXT;
```

```sql
-- 删除列: 删除 user 表中的 column_name 列
ALTER TABLE user
DROP COLUMN email
```

⚠️ SQLite / D1 限制：

- ❌ 不能直接改类型
- 👉 复杂修改要「重建表」

### 3️⃣ DROP TABLE 删除表

```sql
DROP TABLE [IF EXISTS] [schema_name.]table_name;
```

❗ **生产环境极度危险**
👉 一般只在初始化或测试时用

## 三、DML(数据操作：增删改替)

### 4️⃣ INSERT 插入数据

```sql
-- 不指定列名插入: 但要确保值的顺序与列在表中的顺序一致
INSERT INTO table_name VALUES (value1,value2,value3,...valueN);
```

```sql
-- 单挑插入: 指定列名称,插入单条
INSERT INTO table_name (column1,column2 ,..)
VALUES( value1,	value2 ,...);
```

```sql
-- 多条插入: 指定列名称,插入多条
INSERT INTO table_name (column1,column2 ,..)
VALUES
   (value1,value2 ,...),
   (value1,value2 ,...),
    ...
   (value1,value2 ,...);

```

```sql
-- 插入默认值
-- 它使用列定义中指定的默认值将新行插入表,如果默认值不可用且列没有 NOT NULL 约束,则插入 NULL
INSERT INTO artists DEFAULT VALUES;
```

```sql
-- SELECT 语句插入: 使用 SELECT 语句提供的数据插入新行
-- 备份 artists 表
INSERT INTO artists_backup
SELECT ArtistId, user_name
FROM artists;
```

```sql
-- 如果存在就不插入
INSERT OR IGNORE INTO table_name (column1,column2 ,..)
VALUES
   (value1,value2 ,...),
   (value1,value2 ,...),
    ...
   (value1,value2 ,...);
```

📌 **最佳实践**

- 明确写字段名
- 不要依赖表字段顺序

[INSERT 参考](https://www.sqlitetutorial.net/sqlite-insert/)

#### INSTEAD OF 触发器

在 SQLite 中,视图是只读的.如果您对视图执行 DML 语句(例如 INSERT,UPDATE 或 DELETE),将报错

一个视图如果有一个 `INSTEAD OF` 触发器,当发出相应的 DML 语句时,此触发器将触发.可以在触发器处理流程中注入自己的逻辑

```sql
-- 在更改视图的时候使用此触发器来更改,如果直接在视图中进行增删改操作会报错,相当于曲线救国
CREATE TRIGGER [IF NOT EXISTS] schema_ame.trigger_name
    INSTEAD OF [DELETE | INSERT | UPDATE OF column_name]
    ON table_name
BEGIN
    -- insert code here
END;
```

[INSTEAD OF 参考](https://www.sqlitetutorial.net/sqlite-instead-of-triggers/)

#### UPSERT 冲突解决

- `Upsert` 是 `update` 和 `insert` 的组合.新值与旧值冲突时的执行逻辑
- 如果指定的唯一标识符 `UNIQUE` 约束(或 `PRIMARY KEY`)不存在,`Upsert` 会插入新行；
- 如果相同的标识符已存在于表中,则 `Upsert` 会更新现有行.

```sql
INSERT INTO table_name(column_list)
VALUES(value_list)
ON CONFLICT(conflict_column)
DO
   UPDATE SET column_name = expression
   WHERE conflict_condition;
```

在这种语法中：

- `INSERT INTO ... VALUES` 部分定义了将值插入表的指定列的基本插入语句.
- `ON CONFLICT (conflict_colum)` 子句引入了 upsert 行为.如果 conflict_colum n 中发生冲突,则应执行相应的操作.
- `DO` 标志着冲突解决策略的开始.
- `UPDATE SET` 允许您在发生冲突时更新现有行.可选的 WHERE 子句定义了在冲突期间要更新哪些行.当您只想更新满足 conflict_condition 的特定行时,此功能非常有用.

如果你不想在冲突发生时采取任何行动,你可以使用 `DO NOTHING` 策略,如下所示：

```sql
INSERT INTO table_name(column_list)
VALUES(value_list)
ON CONFLICT(conflict_column)
DO NOTHING;
```

- DO 关键字后面的 `UPDATE` 子句可以使用 `excluded` 关键字来访问您尝试插入或更新的值: `excluded.name`

[参考: SQLite UPSERT](https://www.sqlitetutorial.net/sqlite-upsert/)

#### RETURNING 返回操作结果

- 从 `INSERT` 、 `UPDATE` 和 `DELETE` 语句返回数据

```sql
INSERT INTO table_name(column_list)
VALUES(value_list)
RETURNING
    expression1 AS column_alias1,
    expression2 AS column_alias2,
    ...;
```

| 语句   | RETURNING 返回     |
| ------ | ------------------ |
| INSERT | 插入行(插入后)     |
| UPDATE | 更新后的行(更新后) |
| DELETE | 已删除的行(删除前) |

### 5️⃣ DELETE 删除数据

```sql
DELETE FROM table_name
WHERE search_condition;
```

> ❌ 没有 WHERE = 全表删除

📌 建议：重要数据用「软删除」

```sql
UPDATE users
SET is_active = 0
WHERE id = 123456;
```

[DELETE 参考](https://www.sqlitetutorial.net/sqlite-delete/)

### 6️⃣ UPDATE 更新数据

```sql
UPDATE table_name
SET column_1 = new_value_1,
    column_2 = new_value_2
WHERE
    search_condition
```

> ❌ 没有 WHERE = 全表更新

```sql
UPDATE users SET is_active = 0;
-- 直接团灭
```

👉 **任何 UPDATE,先确认 WHERE**

[UPDATE 参考](https://www.sqlitetutorial.net/sqlite-update/)

#### UPDATE FROM

- 根据另一个表中的数据更新一个表中的数据

```sql
UPDATE target_table
SET
  column1 = source_table.value1,
  column2 = source_table.value2
FROM
  source_table
[WHERE
condition];
```

[UPDATE FROM 参考](https://www.sqlitetutorial.net/sqlite-update-from/)

### 7️⃣ REPLACE 替换

- 在表格中插入新行或替换已有的行,相当于忽略约束强制更新

```sql
REPLACE INTO table(column_list)
VALUES(value_list);
```

- 当发生 `UNIQUE` 或 `PRIMARY KEY` 约束违规时,它会做以下动作：
  1. 首先, 删除导致约束违规的现有行
  2. 第二, 新增一行
  3. 第二步,如果发生任何约束违规,例如 NOT NULL 约束,REPLACE 语句将中止该动作并回滚交易

## 四、DQL(查询数据)

### SQLite 查询执行顺序

| 顺序 | 关键字             | 作用说明                                         | 是否可选 |
| ---- | ------------------ | ------------------------------------------------ | -------- |
| 1    | `FROM`             | 从哪些表(或子查询)读取数据,执行表连接(JOIN)      | 必填     |
| 2    | `WHERE`            | 过滤原始行(行级过滤),在连接后、聚合前执行        | 可选     |
| 3    | `GROUP BY`         | 按指定列分组,生成分组后的结果集                  | 可选     |
| 4    | `HAVING`           | 对分组后的结果进行过滤(分组级过滤)               | 可选     |
| 5    | `SELECT`           | 选择要输出的列、计算表达式、别名等(包括聚合函数) | 必填     |
| 6    | `DISTINCT`         | 去除重复行(在 SELECT 之后执行)                   | 可选     |
| 7    | `ORDER BY`         | 对最终结果集排序                                 | 可选     |
| 8    | `LIMIT` / `OFFSET` | 限制返回行数(分页),在排序后执行                  | 可选     |

### SQLite 查询语法顺序

| 关键字(按出现顺序)      | 出现位置     | 是否可选     | 备注                                  |
| ----------------------- | ------------ | ------------ | ------------------------------------- |
| `WITH [RECURSIVE]`      | 最前面       | 可选         | CTE,支持递归                          |
| `SELECT`                | 主查询开始   | 必填         | DISTINCT / ALL                        |
| `FROM`                  | 数据源       | 必填         | 可接子查询                            |
| `JOIN` / `NATURAL JOIN` | 连接         | 可选         | LEFT / RIGHT / INNER / FULL / CROSS   |
| `ON` / `USING`          | 连接条件     | 视 JOIN 类型 | USING 自动等值                        |
| `WHERE`                 | 行过滤       | 可选         |                                       |
| `GROUP BY`              | 分组         | 可选         | 支持 ROLLUP/CUBE/GROUPING SETS(3.25+) |
| `HAVING`                | 分组过滤     | 可选         |                                       |
| `WINDOW`                | 窗口定义     | 可选         | 3.25+                                 |
| SELECT 内的窗口函数     | 在 SELECT 中 | 可选         | "ROW_NUMBER, LAG, LEAD 等"            |
| `ORDER BY`              | 排序         | 可选         | 支持 COLLATE、NULLS FIRST/LAST        |
| `LIMIT` / `OFFSET`      | 分页         | 可选         | 两种写法都支持                        |

- `USING` 是 `ON` 的语法糖，专门用于连接列名完全相同的等值连接;`USING (列名)` 代替 `ON 表1.列名 = 表2.列名`
- `NATURAL JOIN` 是 `USING` 的极端版（自动连接所有同名列），不推荐使用，因为太隐晦，容易出错

```sql
-- 完整查询示例
SELECT DISTINCT column_list
FROM table_name
  JOIN table_name2 ON join_condition
WHERE row_filter
GROUP BY column_name
HAVING group_filter;
ORDER BY column_name
LIMIT count OFFSET offset
```

| 常见写法组合                                                                            | 执行顺序说明 |
| --------------------------------------------------------------------------------------- | ------------ |
| `SELECT ... FROM ...`                                                                   | 最简单       |
| `SELECT ... FROM ... WHERE ...`                                                         | 普通过滤     |
| `SELECT ... FROM ... GROUP BY ...`                                                      | 分组统计     |
| `SELECT ... FROM ... GROUP BY ... HAVING ...`                                           | 分组后过滤   |
| `SELECT ... FROM ... WHERE ... GROUP BY ... HAVING ...`                                 | 典型聚合查询 |
| `SELECT ... FROM ... ORDER BY ... LIMIT ...`                                            | 分页查询     |
| `SELECT DISTINCT ... FROM ...`                                                          | 去重         |
| `SELECT ... FROM ... JOIN ... WHERE ... GROUP BY ... HAVING ... ORDER BY ... LIMIT ...` | 完整复杂查询 |

### 8️⃣ SELECT 查询

```sql
-- 使用 SELECT 语句执行简单计算
SELECT	1 + 1;
```

```sql
-- SELECT 语句中使用多个表达式
SELECT
   10 / 5,
   2 * 4 ;
```

```sql
-- 查询所有字段
SELECT * FROM users;
```

```sql
-- 查询指定字段
SELECT user_name, id FROM users;
```

📌 **生产环境不推荐 `SELECT *`**: 使用 SELECT 语句时,尽量避免使用星号(\*)养成一个好习惯

[SELECT 参考](https://www.sqlitetutorial.net/sqlite-select/)

#### DISTINCT 去重

```sql
-- 去除 column1, column2,.....columnN 全都一样的行
SELECT DISTINCT column1, column2,.....columnN
FROM table_name
WHERE [condition]
```

### 9️⃣ JOIN 连接

- 合并多张表进行查询,有不同的合并方式
- 实际的流程是 表之间形成笛卡尔积,然后使用条件进行筛选

#### INNER JOIN 内部连接

- 将表之间符合条件的行聚合在一起

表 A 有 a1、a2 和 f 列.表 B 有 b1、b2 和 f 列.表 A 通过名为 f 的外键列与表 B 链接

```sql
-- A B 表符合条件的(B.f = A.f)会合并为一个表
SELECT a1, a2, b1, b2
FROM A
INNER JOIN B ON B.f = A.f; -- 等于 JOIN B ON B.f = A.f;可简写 JOIN B USING (f)
```

对于 A 表中的每一行,INNER JOIN 子句会将 f 列的值与 B 表中 f 列的值进行比较.如果 A 表中 f 列的值等于 B 表中 f 列的值,则会合并 a1、a2、b1、b2 列的数据,并将该行包含在结果集中.

换句话说,**INNER JOIN 子句会返回 A 表中与 B 表中有对应行的数据**

如果你连接超过 2 个表,则应用相同的逻辑

[INNER JOIN 参考](https://www.sqlitetutorial.net/sqlite-inner-join/)

#### LEFT JOIN 左连接

- 加入的表符合条件的会加入原表中
- `LEFT JOIN table` = `LEFT OUTER JOIN table` ,因为 OUTER 关键字是可选的

```sql
-- B 表符合条件的(A.f = B.f)数据会被加入 A 表中
SELECT
	a,
	b
FROM
	A
-- 相同的 column_name,可以使用 USING 语法简化
LEFT JOIN B ON A.f = B.f  -- 等于 LEFT JOIN B USING(f)
WHERE search_condition;
```

[LEFT JOIN 参考](https://www.sqlitetutorial.net/sqlite-left-join/)

#### RIGHT JOIN 右连接

- 原表中符合条件的会被添加到加入的表中
- `RIGHT JOIN table` = `RIGHT OUTER JOIN table` ,因为 OUTER 关键字是可选的

```sql
-- A 表符合条件的(A.f = B.f)数据会被加入 B 表中
SELECT
	a,
	b
FROM
	A
  -- 相同的 column_name,可以使用 USING 语法简化
RIGHT JOIN B ON A.f = B.f  -- 等于 RIGHT JOIN B USING(f)
WHERE search_condition;
```

[RIGHT JOIN 参考](https://www.sqlitetutorial.net/sqlite-right-join/)

#### FULL JOIN 全外连接

- 根据条件全部聚合成一张表,不满足条件则为 NULL
- `FULL JOIN` = `LEFT JOIN` + `RIGHT JOIN`
- `FULL JOIN` = `FULL OUTER JOIN` ,因为 OUTER 关键字是可选的

```sql
-- A B 表合并为一张表,符合条件的(A.f = B.f)数据会被合并为一行,不符合的也会合并为一行,但没有的值会是 NULL
SELECT
	a,
	b
FROM
	A
  -- 相同的 column_name,可以使用 USING 语法简化
FULL JOIN B ON A.f = B.f  -- 等于 FULL JOIN B USING(f)
WHERE search_condition;
```

[FULL JOIN 参考](https://www.sqlitetutorial.net/sqlite-full-outer-join/)

#### CROSS JOIN 交叉连接

```sql
SELECT
	a,
	b
FROM
	A
CROSS JOIN B; -- 等于JOIN B (隐式默认 CROSS JOIN)
```

假设,表 A 有 n 行,表 B 有 m 行,这两个表的交叉连接将产生一个包含 n\*m 行的结果集(笛卡尔乘积)

[CROSS JOIN 参考](https://www.sqlitetutorial.net/sqlite-cross-join/)

#### 自连接

- 自连接是指一张表与自己进行 JOIN 操作,即在同一个表上进行连接查询.
- 虽然看起来是“自己连自己”,但实际上是通过表别名(alias)把同一张表当作两个(或多个)不同的逻辑表来使用
- 自连接本质上是表与自己的笛卡尔积后再过滤,数据量大时要注意索引(特别是在 ON 条件字段上建索引)

```sql
SELECT m.firstname || ' ' || m.lastname AS 'Manager', -- || 连接运算符,合并字符串
       e.firstname || ' ' || e.lastname AS 'Direct report'
FROM employees e  -- 等于 employess AS e
INNER JOIN employees m ON m.employeeid = e.reportsto
ORDER BY manager;
```

[SQLite Self-Join](https://www.sqlitetutorial.net/sqlite-self-join/)

### 🔟 WHERE 条件过滤

```sql
SELECT
  column_list
FROM
  TABLE
WHERE
  search_condition;
```

#### 比较运算符

| 符号              | 含义   |
| ----------------- | ------ |
| `=`               | 等于   |
| `!=` `<>`         | 不等于 |
| `>` `<` `>=` `<=` | 比较   |

#### 逻辑运算符

| 运算符    | 描述                                                                                                  |
| --------- | ----------------------------------------------------------------------------------------------------- |
| `ALL`     | 如果所有表达式都为 1(true),则返回 1                                                                   |
| `ANY`     | 如果一组比较中有一个为 1,则返回 1                                                                     |
| `AND`     | 如果两个表达式都为 1,则返回 1,如果其中一个表达式为 0,则返回 0                                         |
| `OR`      | 如果任一表达式为 1,则返回 true                                                                        |
| `BETWEEN` | 如果值在指定范围内,则返回 1                                                                           |
| `EXISTS`  | 如果子查询包含任何行,则返回 1                                                                         |
| `IN`      | 如果值在值列表中,则返回 1                                                                             |
| `LIKE`    | 如果值与模式匹配,则返回 1                                                                             |
| `GLOB`    | GLOB 运算符用于把某个值与使用通配符运算符的相似值进行比较. GLOB 与 LIKE 不同之处在于,它是大小写敏感的 |
| `NOT`     | 反转其他运算符(如 `NOT EXISTS`、`NOT IN`、`NOT BETWEEN` 等)的值                                       |
| `IS`      | IS 运算符与 = 相似                                                                                    |
| `IS NULL` | NULL 运算符用于把某个值与 NULL 值进行比较                                                             |
| `IS NOT`  | IS NOT 运算符与 != 相似,例如: `IS NOT NULL`                                                           |
| `\|\|`    | 连接两个不同的字符串,得到一个新的字符串                                                               |

#### IN 运算符

```sql
-- 选取 name 为 "Google" 或 "菜鸟教程" 的所有数据
SELECT * FROM Websites
WHERE name IN ('Google','菜鸟教程');
```

```sql
-- 反向选取
SELECT * FROM Websites
WHERE name NOT IN ('Google','菜鸟教程');
```

- 类似 `OR` 运算符的简写形式

#### BETWEEN 运算

符

```sql
-- 选取 alexa 介于 1 和 20 之间的所有网站(一般用于数值、文本或者日期)
SELECT * FROM Websites
WHERE alexa BETWEEN 1 AND 20;
```

```sql
-- 反向选取
SELECT * FROM Websites
WHERE alexa NOT BETWEEN 1 AND 20;
```

```sql
-- 选取 alexa 介于 1 和 20 之间但 country 不为 USA 和 IND 的所有网站
SELECT * FROM Websites
WHERE (alexa BETWEEN 1 AND 20)
AND country NOT IN ('USA', 'IND');
```

#### AND / OR 运算符

```sql
SELECT * FROM users
WHERE is_active = 1 AND user_name IS NOT NULL;
```

⚠️ 注意优先级：

```sql
A AND B OR C
-- 等价于 (A AND B) OR C
```

👉 复杂条件请加括号

#### LIKE 模式匹配

```sql
-- 查询 user_name 以 10% 开头的数据
SELECT * FROM users
WHERE user_name LIKE '10\%%' ESCAPE  '\';
```

- LIKE 运算符会将 ESCAPE 关键字后面的 expression 求值为一个单字符字符串,或转义字符

| 常见通配符                   | 描述                       |
| ---------------------------- | -------------------------- |
| `%`                          | 替代 0 个或多个字符        |
| `_`                          | 替代一个字符               |
| `[charlist]`                 | 字符列中的任何单一字符     |
| `[^charlist]`或`[!charlist]` | 不在字符列中的任何单一字符 |

[LIKE 参考](https://www.sqlitetutorial.net/sqlite-like/)

#### GLOB 模式匹配

- 与 LIKE 运算符不同,GLOB 运算符是区分大小写的,并使用 UNIX 通配符.此外,GLOB 模式没有转义字符

```sql
-- 查询 user_name 以 ji 开头的数据
SELECT * FROM users
WHERE user_name GLOB 'ji*';
```

| 通配符   | 描述                                                                                         |
| -------- | -------------------------------------------------------------------------------------------- |
| `*`      | 匹配零个、一个或多个数字或字符                                                               |
| `?`      | 代表一个单一的数字或字符                                                                     |
| `[...]`  | 匹配方括号内指定的字符之一.例如,`[abc]` 匹配 "a"、"b" 或 "c" 中的任何一个字符                |
| `[^...]` | 匹配不在方括号内指定的字符之一.例如,`[^abc]` 匹配不是 "a"、"b" 或 "c" 中的任何一个字符的字符 |

[GLOB 参考](https://www.sqlitetutorial.net/sqlite-glob/)

#### EXISTS 返回判断

- EXISTS 运算符是一个逻辑运算符,用于检查子查询是否返回任何行
- 如果子查询返回一行或多行,EXISTS 运算符返回 true.否则,EXISTS 运算符返回 false 或 NULL

```sql
EXISTS(subquery)
```

```sql
NOT EXISTS (subquery)
```

[EXISTS 参考](https://www.sqlitetutorial.net/sqlite-exists/)

### 1️⃣1️⃣ GROUP BY 分组

- GROUP BY 子句必须放在 WHERE 子句中的条件之后,必须放在 ORDER BY 子句之前

```sql
--  将users表 按照user_name字段分组,并统计行数,然后按照user_name的升序排列
SELECT user_name, COUNT(*)
FROM users
GROUP BY user_name -- 可多列排序
ORDER BY user_name;
```

```sql
SELECT user_name
FROM users
GROUP BY user_name
ORDER BY user_name;

-- 等于下面的语法(去重)

SELECT DISTINCT user_name
FROM COMPANY
ORDER BY user_name;
```

- 在有 GROUP BY 的情况下,SELECT 中的表达式必须满足以下之一：
  1. 必须出现在 `GROUP BY` 中
  2. 或使用聚合函数,`MAX(job_title)`, `COUNT(\*)`

[Group By 参考](https://www.sqlitetutorial.net/sqlite-group-by/)

### 1️⃣2️⃣ HAVING 分组过滤

- 和 `WHERE` 用法一致
- `HAVING` 子句必须放在 `GROUP BY` 子句之后,必须放在 ORDER BY 子句之前

```sql
SELECT column1, column2
FROM table1, table2
WHERE [ conditions ]
GROUP BY column1, column2
HAVING [ search_condition ]
ORDER BY column1, column2
```

[Having 参考](https://www.sqlitetutorial.net/sqlite-having/)

### 1️⃣3️⃣ ORDER BY 排序

- 使用 SQLite 的 ORDER BY 子句按一个或多个列升序和降序排序行

```sql
-- 将 users表 的数据按多条件排序
SELECT
    select_list
FROM
    users
ORDER BY
    column_1 ASC,     -- 先按 column_1 升序排序
    column_2 DESC;    -- 在 column_1 相同的情况下,再按 column_2 降序排序
```

| 关键字        | 含义                             |
| ------------- | -------------------------------- |
| `ASC`         | 升序(默认)                       |
| `DESC`        | 降序                             |
| `NULLS FIRST` | 将 NULL 值置于其他非 NULL 值之前 |
| `NULLS LAST`  | 将 NULL 值置于其他非 NULL 值之后 |

[ORDER BY 参考](https://www.sqlitetutorial.net/sqlite-order-by/)

### 1️⃣4️⃣ LIMIT/OFFSET 限制/分页

```sql
-- 从第21行开始,返回10行数据(21-30行,相当于第3页)
SELECT * FROM users
ORDER BY id DESC
LIMIT 10 OFFSET 20;
```

📌 常见分页公式：

```text
OFFSET = (page - 1) * pageSize(LimitSize)
```

## 操作符

### UNION 合并查询

- 使用 `UNION` 运算符合并两个结果集的行到一个结果集中,会删除重复的行
- 使用 `UNION ALL` 运算符以保留最终结果集中的重复行

```sql
query1  -- 指定第一个查询
UNION [ALL] -- 使用 UNION 运算符来表示你希望将第一个查询的结果集与下一个查询的结果集合并
query2; -- 指定第二个查询
```

[UNION 参考](https://www.sqlitetutorial.net/sqlite-union/)

### EXCEPT 比较查询

- `EXCEPT` 操作符比较两个查询的结果集,并返回第一个查询中存在而第二个查询结果集中不存在的不同行

```sql
SELECT select_list1
FROM table1
EXCEPT
SELECT select_list2
FROM table2;
```

[EXCEPT 参考](https://www.sqlitetutorial.net/sqlite-except/)

### INTERSECT 交集查询

- `INTERSECT` 操作符允许您合并两个 查询 的结果集,并返回在两个查询结果集中出现的不同行

```sql
SELECT select_list1
FROM table1
INTERSECT
SELECT select_list2
FROM table2;
```

[INTERSECT 参考](https://www.sqlitetutorial.net/sqlite-intersect/)

## 函数

| 函数               | 说明                                    |
| ------------------ | --------------------------------------- |
| `sqlite_version()` | sqlite_version 函数返回 SQLite 库的版本 |
| `typeof()`         | 根据值的格式检查其存储类型              |

### 聚合函数

| 函数                                   | 说明                                                                                                 |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `AVG([ALL \| DISTINCT] expression)`    | 用于计算行内所有非 NULL 值的平均值                                                                   |
| `COUNT([ALL \| DISTINCT] expression)`  | 返回符合指定条件的行数                                                                               |
| `MAX([ALL\| DISTINCT] expression)`     | 返回行中的最大值.                                                                                    |
| `MIN([ALL\| DISTINCT] expression)`     | 返回一组数据中的最小值                                                                               |
| `SUM([ALL\| DISTINCT] expression)`     | 返回数值的总和                                                                                       |
| `GROUP_CONCAT(expression, separator?)` | 使用指定分隔符将列中的所有非空值连接起来                                                             |
| `COALESCE(可能为NULL的表达式, 默认值)` | 返回参数列表中第一个非 NULL 的值。如果所有参数都是 NULL，则返回 NULL（但通常我们至少提供一个默认值） |

[聚合函数 参考](https://www.sqlitetutorial.net/sqlite-aggregate-functions/)

### 窗口函数

- 在不影响结果集的情况下,进行聚合

```sql
-- 基本语法
函数名() OVER (
    [PARTITION BY col1, col2 ...]          -- 分组(类似 GROUP BY)
    [ORDER BY col [ASC|DESC]]              -- 排序(决定窗口顺序)
    [ROWS|RANGE BETWEEN ...]               -- 窗口帧(范围)
)
```

| Name                                  | Description                               |
| ------------------------------------- | ----------------------------------------- |
| `CUME_DIST()`                         | 计算一组值中某个值的累积分布              |
| `DENSE_RANK(expression)`              | 计算有序行集中某一行的排名                |
| `FIRST_VALUE(expression)`             | 取指定窗口框架中第一行的值                |
| `LAST_VALUE(expression)`              | 获取指定窗口框架中最后一行的值            |
| `LAG(expression ,offset?, default?)`  | 从分区中的当前行获取前一行的值            |
| `LEAD(expression ,offset?, default?)` | 从分区中的当前行获取下一行的值            |
| `NTH_VALUE(expression, N)`            | 获取指定窗口框架中第 N 行的值             |
| `NTILE(expression)`                   | 将结果集分成若干桶,并为每一行分配一个桶号 |
| `PERCENT_RANK()`                      | 计算有序结果集中行的百分比排名            |
| `RANK()`                              | 计算查询结果集中行的排名                  |
| `ROW_NUMBER()`                        | 为查询结果集中的每一行分配一个顺序整数    |

- 累计分布(Cumulative Distribution) 在统计学中指的是：到某个值为止(包括该值),所有小于等于该值的元素占整个数据集的比例

**普通聚合函数与窗口函数比较**

| 类型           | 普通聚合函数       | 窗口函数                       |
| -------------- | ------------------ | ------------------------------ |
| 输入行数       | 多行 → 输出 1 行   | 多行 → 输出 多行(每行一个结果) |
| 是否保留原始行 | 不保留(分组后压缩) | 保留所有原始行                 |
| 典型用途       | 统计总数、平均等   | 累计总额、排名、移动平均等     |

[窗口函数 参考](https://www.sqlitetutorial.net/sqlite-window-functions/)

### 字符串函数

| Name                                      | Description                                                            |
| ----------------------------------------- | ---------------------------------------------------------------------- |
| `substr( string, start, length )`         | 从字符串中返回一个从指定位置开始、长度预定义的子字符串                 |
| `trim(string, character?)`                | 移除字符串开头和结尾的空格或其他指定的字符                             |
| `ltrim(string,character?)`                | 移除字符串开头的空格或其他指定字符                                     |
| `rtrim(string,character?)`                | 移除字符串末尾的空格或指定字符                                         |
| `length(data)`                            | 返回字符串中的字符数或 BLOB 中的字节数                                 |
| `replace(string,pattern,replacement)`     | 替换字符串中所有指定的字符串                                           |
| `upper(string)`                           | 把字符串转换为大写字母                                                 |
| `lower(string)`                           | 把字符串转换为小写字母                                                 |
| `instr(string, substring);`               | 在字符串中查找子字符串,并返回一个整数,该整数表示子字符串首次出现的位置 |
| `concat(s1, s2, ...)` 和 `\|\|`           | 将多个字符串连接成一个字符串                                           |
| `concate_ws(separator, str1, str2, ...);` | 使用指定的分隔符将多个字符串连接成一个字符串                           |

[字符串函数 参考](https://www.sqlitetutorial.net/sqlite-string-functions/)

### 时间函数

| 函数                | 说明                                                                 |
| ------------------- | -------------------------------------------------------------------- |
| `datetime()`        | 将时间转换为格式 YYYY-MM-DD HH:MM:SS 的时间字符串                    |
| `date()`            | 将时间转换为格式 YYYY-MM-DD 的时间字符串                             |
| `time()`            | 将时间转换为格式 HH:MM:SS 的时间字符串                               |
| `julianday()`       | 将日期和时间转换为儒略日数(连续日计数法)                             |
| `unixepoch()`       | 将日期和时间转换 Unix 时间戳(1970-01-01 00:00:00 UTC 开始经过的秒数) |
| `strftime()`        | 根据指定的格式对时间、日期或 datetime 值进行格式化                   |
| `current_timestamp` | 没有(),返回当前 UTC 日期和时间,格式为 YYYY-MM-DD HH:MM:SS            |
| `current_date`      | 没有(),返回当前 UTC 日期,格式为 YYYY-MM-DD                           |
| `current_time`      | 没有(),返回当前 UTC 时间的字符串,格式为 HH:MM:SS                     |

- `date('now')` => 2024-04-12
- `date('2024-03-01', '-1 day')` => 2024-02-29
- `time('now')` => 08:16:40 (UTC 时间)
- `time('now','localtime')`=> 16:16:40 (本地时间)
- `julianday('2024-04-11')`=> 2460411.5 (单位:天)
- `unixepoch('2024-04-11 15:30:20.45','subsec')`=> 1712849420.45 (单位:秒)

[时间函数 参考](https://www.sqlitetutorial.net/sqlite-date-functions/)
[日期时间格式 参考](https://www.sqlitetutorial.net/sqlite-date-functions/sqlite-datetime-format/)

**日期时间修饰符**

| Modifier                 | Explanation                                                                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| ±NNN days                | Adds or subtracts(减) the specified(指定) number of `days` to/from a date or datetime value.                                         |
| ±NNN hours               | Adds or subtracts the specified number of `hours` to/from a datetime value.                                                          |
| ±NNN minutes             | Adds or subtracts the specified number of `minutes` to/from a datetime value.                                                        |
| ±NNN seconds             | Adds or subtracts the specified number of `seconds` to/from a datetime value.                                                        |
| ±NNN months              | Adds or subtracts the specified number of `months` to/from a date or datetime value.                                                 |
| ±NNN years               | Adds or subtracts the specified number of `years` to/from a date or datetime value.                                                  |
| ±HH:MM                   | Adds or subtracts the specified offset in `hours and minutes` to/from a datetime value.                                              |
| ±HH:MM:SS                | Adds or subtracts the specified offset in `hours, minutes, and seconds` to/from a datetime value.                                    |
| ±HH:MM:SS.SSS            | Adds or subtracts the specified offset in `hours, minutes, seconds, and milliseconds` to/from a datetime value.                      |
| ±YYYY-MM-DD              | Adds or subtracts the specified `date` to/from a date or datetime value.                                                             |
| ±YYYY-MM-DD HH:MM        | Adds or subtracts the specified `date and time` to/from a datetime value.                                                            |
| ±YYYY-MM-DD HH:MM:SS     | Adds or subtracts the specified `date and time` to/from a datetime value.                                                            |
| ±YYYY-MM-DD HH:MM:SS.SSS | Adds or subtracts the specified `date and time` to/from a datetime value.                                                            |
| start of month           | Returns the `first day of the month` for a given date or datetime value.                                                             |
| start of year            | Returns the `first day of the year` for a given date or datetime value.                                                              |
| start of day             | Returns the `start of the day (midnight 午夜)` for a given date or datetime value.                                                   |
| weekday N                | Returns the date of the first weekday (Sunday as 0, Monday as 1, etc.) that occurs on or after the specified date or datetime value. |
| unixepoch                | Returns the date and time as the number of seconds since 1970-01-01 00:00:00 UTC.                                                    |
| julianday                | Returns the Julian day number of a given date or datetime value.                                                                     |
| auto                     | Automatically(自动) detects(检测) the format(格式) of a date or datetime string and converts(转换) it to a datetime value.           |
| localtime                | Converts a datetime value from UTC to the local timezone(时区).                                                                      |
| utc                      | Converts a datetime value from the local timezone to UTC.                                                                            |
| subsec                   | Returns the subsecond(亚秒) part(部分) of a datetime value.                                                                          |
| subsecond                | Returns the subsecond part of a datetime value as a fractional(小数) second(秒).                                                     |

[时间修饰符 参考](https://www.sqlitetutorial.net/sqlite-date-functions/sqlite-datetime-modifiers/)

### JSON 函数

- SQLite 使用 TEXT 数据类型来存储 JSON 数据.

**基本操作**

| 函数                              | 说明                       |
| --------------------------------- | -------------------------- |
| `json_extract(json, path)`        | 从 JSON 数据中提取值       |
| `json_insert(json, path, value)`  | 值插入 JSON 文档中         |
| `json_replace(json, path, value)` | 替换已存在 JSON 数据中的值 |
| `json_set(json, path, value)`     | 替换或新建 JSON 数据中的值 |
| `json_remove(json, path)`         | 从 JSON 数据中移除值       |
| `json_group_array(name)`          | 将值聚合为 JSON 数组       |
| `json_group_object(name, value)`  | 将值聚合为 JSON 对象       |

- 使用`$.`访问 json 数据: `json_extract (details, '$.price')`, `$.price'` 相当于 `details.price`

[基础 JSON 函数 参考](https://www.sqlitetutorial.net/sqlite-json/)

**JSON 函数拓展**

| 函数                                             | 说明                                                   |
| ------------------------------------------------ | ------------------------------------------------------ |
| `json(json)`                                     | 用于验证 JSON 值并返回去除多余空白字符的最小化 JSON 值 |
| `json_pretty(json, format?)`                     | 功能与 `json()` 函数类似,但会美化 JSON 值              |
| `json_valid(json)`                               | 用于检查字符串是否包含有效的 JSON                      |
| `json_error_position(json_string)`               | 返回 JSON 字符串中第一个语法错误的字符位置             |
| `json_array(value1, value2, ...)`                | 从一个或多个值创建 JSON 数组                           |
| `json_object(name1, value1, name2, value2, ...)` | 创建 JSON 对象                                         |
| `json_quote(x)`                                  | 返回 x 的 JSON 表示形式                                |
| `json_each(json)`                                | 提取和遍历 JSON 对象或数组中的顶层元素                 |
| `json_tree(json, path)`                          | 递归遍历 JSON 对象或 JSON 数组的元素                   |
| `json_type(x)`                                   | 返回 JSON 元素的类型                                   |
| `json_array_length(json_array)`                  | 获取 JSON 数组中的元素数量                             |

[JSON 函数 参考](https://www.sqlitetutorial.net/sqlite-json-functions/)

**JSON 操作符**

| 符号  | 语法            | 说明                                          |
| ----- | --------------- | --------------------------------------------- |
| `->`  | `json -> path`  | 返回 JSON 值,与`json_extract(json, path)`类似 |
| `->>` | `json ->> path` | 返回子组件的 SQL 表示形式(标量)               |

[操作符 参考](https://www.sqlitetutorial.net/sqlite-json-functions/sqlite-json-operators/)

### 数学函数

| 功能名称    | 描述                                      |
| ----------- | ----------------------------------------- |
| `abs()`     | 返回一个数字的绝对值                      |
| `acos()`    | 返回一个数的弧余弦,以弧度为单位           |
| `acosh()`   | 返回一个数的反余弦                        |
| `asin()`    | 返回一个数的弧正弦,以弧度为单位           |
| `asinh()`   | 返回一个数的反余弦函数                    |
| `atan()`    | 返回一个数的弧度的反正切                  |
| `atan2()`   | 返回弧度的反正切值,其中 y 和 x 是两个参数 |
| `atanh()`   | 返回一个数的反余弦函数                    |
| `ceil()`    | 返回给定数字的最小整数值,大于或等于该数字 |
| `ceiling()` | 与 ceil()相同                             |
| `cos()`     | 返回一个数的余弦值,以弧度为单位           |
| `cosh()`    | 返回一个数的双曲余弦                      |
| `degrees()` | 将一个值从弧度转换为度                    |
| `exp()`     | 返回 e(欧拉数)的幂次的结果                |
| `floor()`   | 返回给定数字小于或等于的最大整数值        |
| `ln()`      | 返回一个数的自然对数(以 e 为底)           |
| `log(B)`    | 返回一个数的以 B 为底的对数               |
| `log()`     | 与 ln()相同                               |
| `log10()`   | 返回一个数的十进制对数                    |
| `log2()`    | 返回一个数的以 2 为底的对数               |
| `mod()`     | 返回除法操作的余数                        |
| `pi()`      | 返回 π 常数(π)                            |
| `pow()`     | 返回一个数的幂次方                        |
| `power()`   | 与 pow()相同                              |
| `radians()` | 将度数转换为弧度                          |
| `random()`  | 返回一个随机整数                          |
| `sin()`     | 返回一个数的正弦值,以弧度为单位           |
| `sinh()`    | 返回一个数的双曲正弦                      |
| `sqrt()`    | 返回一个数字的平方根                      |
| `tan()`     | 返回一个数的弧度的正切值                  |
| `tanh()`    | 返回一个数的双曲正切                      |
| `trunc()`   | 返回一个数字的整数部分,向零舍入           |
| `round()`   | 将一个数字四舍五入到指定的小数位数        |

[数学函数 参考](https://www.sqlitetutorial.net/sqlite-math-functions/)

## 表达式

### CTE 公用表表达式

- 使用公用表表达式(CTE)创建一个在查询范围内定义的临时结果集, 结果是一个以 CTE 名称命令的临时数据表

```sql
WITH [RECURSIVE] cte_name AS (
    -- 非递归部分（锚点查询）
    SELECT ...

    UNION [ALL]

    -- 递归部分（引用自身）
    SELECT ...
    FROM cte_name ...
)
-- 主查询
SELECT ... FROM cte_name;
```

1. 首先,在 WITH 子句中指定 CTE 的名称.如果 CTE 实际引用了自己，必须加 RECURSIVE，否则报错
2. 其次,提供一个查询,在括号内定义 CTE,然后跟随着 AS 关键字.这个查询的结果集与这个查询一起形成临时结果集,你可以在主查询中引用这个临时结果集.
3. 第三,编写引用 CTE 的主查询.

```sql
WITH cte_example AS (
    SELECT column1, column2
    FROM table_name
    WHERE condition
)
SELECT * FROM cte_example;
```

1. cte_example 是 CTE 的名称
2. CTE 查询基于指定条件从 table_name 的列 1 和列 2 中检索数据.请注意,查询可能包括连接 、 分组 、 筛选以及 SELECT 语句的其他子句.
3. 主查询从 CTE cte_example 中选择所有列.

[CTE 参考](https://www.sqlitetutorial.net/sqlite-cte/)

### CREATE VIEW 视图

```sql
-- 创建 视图
CREATE [TEMP] VIEW [IF NOT EXISTS] view_name[(column-name-list)]
AS
   select-statement;

-- 删除 视图
DROP VIEW [IF EXISTS] [schema_name.]view_name;
```

```sql
-- 1. 创建 视图(可自定义列名)
CREATE VIEW v_tracks
AS
SELECT
	trackid,
	tracks.name,
	albums.Title AS album,
	media_types.Name AS media,
	genres.Name AS genres
FROM
	tracks
INNER JOIN albums ON Albums.AlbumId = tracks.AlbumId
INNER JOIN media_types ON media_types.MediaTypeId = tracks.MediaTypeId
INNER JOIN genres ON genres.GenreId = tracks.GenreId;

-- 2. 使用 视图
SELECT * FROM v_tracks;

-- 3. 删除 视图
DROP VIEW v_tracks;
```

| 维度     | CREATE VIEW                           | CTE                                     |
| -------- | ------------------------------------- | --------------------------------------- |
| 作用范围 | 永久存在(数据库中保存,直到 DROP)      | 仅当前一条 SQL 语句有效,执行完就消失    |
| 存储方式 | 定义永久存储在数据库元数据中          | 临时定义,只在内存中存在                 |
| 重复使用 | 可以多次、在多个查询中反复使用        | 只能在定义它的那条语句中使用一次        |
| 性能     | 每次查询视图都重新执行底层 SELECT     | 同上,但可被优化器更好利用(尤其递归 CTE) |
| 可递归   | 不支持递归                            | 支持递归(WITH RECURSIVE)                |
| 可更新   | 某些简单视图支持 INSERT/UPDATE/DELETE | 不支持(临时结果集)                      |
| 权限管理 | 可以单独授权视图访问                  | 无(因为是临时)                          |
| 定义位置 | 独立语句(CREATE VIEW)                 | 必须在 SELECT/INSERT/UPDATE/DELETE 前   |
| 典型用途 | 提供稳定、简化的数据接口；安全控制    | 复杂查询中分解步骤、递归查询、临时计算  |

**总结**

- `CREATE VIEW`：创建永久、可重复使用的虚拟表,适合固定、常用的查询视图.
- `CTE`：定义临时、仅当前语句有效的结果集,适合一次性复杂查询或递归.
- 两者在功能上有重叠(都基于 SELECT),但持久性和使用范围是最大区别.
- 实际开发中,两者经常结合使用：VIEW 提供稳定接口,CTE 用于临时复杂逻辑.

[CREATE VIEW 参考](https://www.sqlitetutorial.net/sqlite-create-view/)

### CASE 条件表达式

- CASE 表达式会评估一系列条件,并根据评估结果返回一个表达式

**简单 CASE**

```sql
CASE case_expression  -- 匹配 case_expression
     WHEN when_expression_1 THEN result_1 -- 如果case_expression =  when_expression_1 ,返回 result_1
     WHEN when_expression_2 THEN result_2 -- 如果case_expression =  when_expression_2 ,返回 result_2
     ...
     [ ELSE result_else ] -- 如果没有匹配到,则返回 result_else;如果没有ELSE子句,则返回 NULL
END
```

- 简单的 CASE 表达式使用短路求值.换句话说,它一旦找到匹配项就会返回结果并停止评估其他条件.

**搜索 CASE**

```sql
CASE
     WHEN bool_expression_1 THEN result_1 -- 如果满足 bool_expression_1 ,返回result_1
     WHEN bool_expression_2 THEN result_2 -- 如果满足 bool_expression_2 ,返回result_2
     [ ELSE result_else ] -- 如果都不满足,则返回 result_else;如果没有ELSE子句,则返回 NULL
END
```

- 简单 CASE 和 搜索 CASE 的区别主要是 CASE 关键字后面是否带表达式

[CASE 参考](https://www.sqlitetutorial.net/sqlite-case/)

### 触发器(Trigger)

```sql
-- 创建触发器
CREATE TRIGGER [IF NOT EXISTS] trigger_name
   [BEFORE|AFTER|INSTEAD OF] [DELETE | INSERT | UPDATE [OF column_list]] -- UPDATE OF 指定列更新才执行触发器
   ON table_name
   [FOR EACH ROW] -- 是否是行级触发器 99%加这一行
   [WHEN condition]
BEGIN
 statements; -- 触发逻辑
END;

-- 查询触发器
SELECT name, tbl_name, sql FROM sqlite_master WHERE type = 'trigger';

-- 删除触发器
DROP TRIGGER [IF EXISTS] trigger_name;
```

- `OLD` 和 `NEW` 引用形式中的 OLD.column_name 和 NEW.column_name 访问插入、删除或更新行的数据

```sql
-- 在更新数据前,更新它的op_latest_time字段
CREATE TRIGGER update_user_latest_time
BEFORE UPDATE ON user
FOR EACH ROW
BEGIN
  UPDATE user
  SET op_latest_time = CURRENT_TIMESTAMP
  WHERE user_id = NEW.user_id;
END;
```

```sql
-- 在更新数据后,更新它的op_latest_time字段
CREATE TRIGGER update_user_latest_time
AFTER UPDATE ON user
FOR EACH ROW
WHEN NEW.op_latest_time = OLD.op_latest_time  -- 添加条件,防止递归触发(死循环)
BEGIN
  UPDATE user
  SET op_latest_time = CURRENT_TIMESTAMP
  WHERE user_id = NEW.user_id;
END;
```

| 维度          | BEFORE UPDATE | AFTER UPDATE |
| ------------- | ------------- | ------------ |
| 触发时机      | 写入前        | 写入后       |
| 操作对象      | NEW 行对象    | 表           |
| 是否写 UPDATE | ❌            | ✅           |
| 是否写 WHERE  | ❌            | ✅           |
| 是否可能递归  | ❌            | ✅           |

**行级触发器**

- 触发后涉及的行都会执行一次触发器任务
- 如果不写,如果一次操作设计多行,那么也只会执行一次

| 特性               | FOR EACH ROW                          | 语句级触发器 (不写)                      |
| ------------------ | ------------------------------------- | ---------------------------------------- |
| 执行次数           | 受影响的行数次数                      | 整个语句只执行 1 次                      |
| 可以访问 OLD/NEW   | 可以（OLD.列 和 NEW.列 表示当前行值） | 不能（会报错：no such column: OLD）      |
| 典型用途           | 记录每行变化、校验每行数据、审计日志  | 记录“某操作发生过”、整体统计、一次性操作 |
| 性能（大数据量时） | 较慢（行数多时执行多次）              | 更快（只执行一次）                       |

[Trigger 参考](https://www.sqlitetutorial.net/sqlite-trigger/)

### Transaction 事务

- 用于将多个数据库操作组合在一起,要么都成功,要么都失败

| 特性   | 英文        | 含义                                                            | 举例说明                                 |
| ------ | ----------- | --------------------------------------------------------------- | ---------------------------------------- |
| 原子性 | Atomicity   | 事务是一个原子操作,要么全做,要么全不做                          | 转账：扣 A 的钱 + 加 B 的钱,必须同时成功 |
| 一致性 | Consistency | 事务执行前后,数据库从一个一致状态到另一个一致状态(约束不被破坏) | 余额不能为负、外键必须存在               |
| 隔离性 | Isolation   | 多个事务并发执行时,相互不干扰(不同隔离级别影响可见性)           | 你转账时别人看不到中间状态               |
| 持久性 | Durability  | 事务一旦提交(COMMIT),数据永久保存,即使系统崩溃也能恢复          | 提交后断电,重启数据还在                  |

```sql
-- 1. 显式事务(推荐,最清晰)
BEGIN TRANSACTION;
-- 多条 SQL
COMMIT;        -- 提交
-- 或 ROLLBACK; -- 回滚

-- 2. 简写模式
BEGIN;
-- SQL
COMMIT;

-- 3. 更安全的模式(推荐用于写操作)
BEGIN IMMEDIATE;  -- 立即获取写锁,防止并发冲突
-- 或 BEGIN EXCLUSIVE;  -- 独占锁

-- 4. 自动事务(SQLite 默认行为)
-- 每条单独的 INSERT/UPDATE/DELETE 都会自动包裹在一个事务中
-- 但多条语句时,建议手动 BEGIN/COMMIT 提升性能和安全性
```

**例子: 在现有表中添加 CHECK 约束**

```sql
BEGIN;
-- create a new table
CREATE TABLE new_table (
    [...],
    CHECK ([...])
);
-- copy data from old table to the new one
INSERT INTO new_table SELECT * FROM old_table;

-- drop the old table
DROP TABLE old_table;

-- rename new table to the old one
ALTER TABLE new_table RENAME TO old_table;

-- commit changes
COMMIT;

```

[Transaction 参考](https://www.sqlitetutorial.net/sqlite-transaction/)

### Full-text Search 全文搜索

**FTS5(Full-Text Search 5)是 SQLite 内置的一个虚拟表模块,专门用于实现高效的全文本搜索(Full-Text Search).**

简单来说：**FTS5 让你能在 SQLite 数据库中像使用搜索引擎一样快速搜索文本内容**,特别适合处理大量文本数据的模糊搜索、关键词匹配等场景.

| 用途场景           | 说明                                                                      | 为什么用 FTS5 而不是普通查询                         |
| ------------------ | ------------------------------------------------------------------------- | ---------------------------------------------------- |
| **全文搜索**       | 支持关键词搜索、短语搜索、前缀搜索、多关键词 `AND/OR/NOT` 等              | 普通 LIKE `'%keyword%'` 在大数据量时非常慢(全表扫描) |
| **模糊匹配和容错** | 支持近似匹配(`NEAR`)、通配符(\*)、忽略大小写、拼音搜索(需扩展)            | LIKE 无法高效处理复杂条件                            |
| **高性能**         | 内部使用倒排索引(`inverted index`),搜索速度极快,即使百万级数据            | 普通索引对文本搜索无效                               |
| **排序相关性**     | 可以按匹配度(`rank`)排序,结果更相关的排前面                               | 普通查询无相关性排序                                 |
| **多语言支持**     | 内置 `tokenizer` 支持英文、中文(需 `porter` 或 `extra tokenizer`)、日文等 | LIKE 对中文几乎无效                                  |
| **内容表同步**     | 可与普通表自动同步(`content='table'`),插入/更新自动更新搜索索引           | 手动维护索引麻烦                                     |

**1. 创建 FTS5 虚拟表**

```sql
-- 直接创建(手动管理内容)
CREATE VIRTUAL TABLE email
USING fts5(sender, title, body);

-- 推荐：与普通表同步(自动维护)
CREATE TABLE emails(id INTEGER PRIMARY KEY, sender TEXT, title TEXT, body TEXT);

CREATE VIRTUAL TABLE email_fts
USING fts5(sender, title, body, content='emails', content_rowid='id');
```

**2. 插入数据(同步模式下插入普通表即可)**

```sql
INSERT INTO emails(sender, title, body)
VALUES ('alice@example.com', '会议通知', '明天上午10点开会');
```

**3. 触发器自动同步(SQLite 会自动创建这些触发器)**

使用 `content='emails'` 时,SQLite 自动生成插入/更新/删除触发器,保持 FTS 表同步.

**4. 搜索查询(核心)**

```sql
-- 基本关键词搜索(默认 AND)
SELECT * FROM email_fts WHERE email_fts MATCH '会议 AND 明天';

-- 短语搜索
SELECT * FROM email_fts WHERE email_fts MATCH '"会议通知"';

-- 前缀搜索(标题以“会议”开头)
SELECT * FROM email_fts WHERE email_fts MATCH 'title:会议*';

-- 多列指定
SELECT * FROM email_fts WHERE email_fts MATCH 'sender:alice OR body:重要';

-- 按相关性排序(越相关越靠前)
SELECT *, rank FROM email_fts WHERE email_fts MATCH '会议' ORDER BY rank;
```

**常见应用场景**

- **APP 内搜索**：如笔记 App、邮件客户端、聊天记录搜索
- **博客/文章搜索**：快速查找包含特定关键词的文章
- **商品搜索**：电商 App 中搜索商品名称、描述
- **日志分析**：搜索海量日志中的关键词
- **离线全文检索**：无需服务器,纯本地实现搜索引擎功能

**FTS5 vs FTS3/FTS4 vs 普通 LIKE**

| 特性          | FTS5                | FTS3/FTS4 | LIKE `'%key%'` |
| ------------- | ------------------- | --------- | -------------- |
| 搜索速度      | 极快(倒排索引)      | 快        | 慢(全表扫描)   |
| 支持复杂查询  | 是(AND/OR/NOT/NEAR) | 是        | 基本不支持     |
| 前缀/短语搜索 | 支持                | 支持      | 有限           |
| 相关性排序    | 支持(rank/bm25)     | 有限      | 不支持         |
| 中文支持      | 好(需 tokenizer)    | 一般      | 差             |
| 维护成本      | 低(自动同步)        | 中等      | 无需维护       |
| 推荐程度      | 强烈推荐            | 可用      | 不推荐用于搜索 |

**一句话结论**：
**如果你需要在 SQLite 中搜索大量文本内容(如文章、邮件、聊天记录),FTS5 是最佳选择,它能让你从“慢如蜗牛的 LIKE”变成“快如搜索引擎”的体验！**

[Full-text Search 参考](https://www.sqlitetutorial.net/sqlite-full-text-search/)

## VACUUM 命令

用于优化数据库

[VACUUM 命令 参考](https://www.sqlitetutorial.net/sqlite-vacuum/)

```

```

```

```
