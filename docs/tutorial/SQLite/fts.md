# 全文搜索（FTS5）

## 定义

**FTS5（Full-Text Search module 5）** 是 SQLite 的全文搜索扩展：以**虚表（VIRTUAL TABLE）** 形式存储倒排索引，支持对文本列做分词匹配、排序与简单检索语法。适合站内搜索、日志检索、文档标题/正文搜索等场景。

## 概念要点

- **虚表**：`CREATE VIRTUAL TABLE ... USING fts5(...)` 创建；底层维护 `docid`、词项索引，不是普通 B-tree 表。
- **MATCH**：在 FTS 表上用 `column MATCH 'query'` 或 `table MATCH 'query'` 检索。
- **分词器（tokenizer）**：默认按 Unicode 规则分词；可指定 `tokenize='porter'` 等（入门常用默认即可）。
- **内容与索引列**：可只索引部分列；`content=` 选项指向外部内容表（contentless / external content 模式）。
- **排名**：`bm25()` 等辅助函数用于相关性排序（FTS5 内置）。

### 与 LIKE 对比

| 方式 | 优点 | 缺点 |
| ---- | ---- | ---- |
| `LIKE '%词%'` | 简单 | 无法分词；前缀 `%` 难走索引 |
| FTS5 `MATCH` | 分词、相关性、短语/前缀 | 需建虚表；中文分词依赖 tokenizer |

## 语法 / 清单表

| 操作 | 语法 |
| ---- | ---- |
| 建表 | `CREATE VIRTUAL TABLE name USING fts5(col1, col2, ...)` |
| 插入 | `INSERT INTO fts_table VALUES (...)` 或 `INSERT INTO fts_table(fts_table) VALUES('rebuild')` |
| 查询 | `SELECT * FROM fts WHERE col MATCH 'keyword'` |
| 短语 | `MATCH '"exact phrase"'` |
| 前缀 | `MATCH 'key*'` |
| AND / OR | `MATCH 'foo AND bar'`、`MATCH 'foo OR bar'` |
| 删除 | `DELETE FROM fts_table WHERE rowid = ?` |
| 常用选项 | `tokenize=`、`content=`、`content_rowid=`、`columnsize=` |

## 示例

### 最简 FTS5 表与查询

```sql
-- 创建全文索引虚表：title、body 参与搜索
CREATE VIRTUAL TABLE articles_fts USING fts5(
  title,
  body,
  content='articles',      -- 正文存于普通表 articles
  content_rowid='id'       -- 关联 articles.id
);

-- 普通表存完整数据
CREATE TABLE articles (
  id    INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  body  TEXT NOT NULL
);

-- 插入普通表后，同步 FTS（external content 模式需手动维护或触发器）
INSERT INTO articles (title, body) VALUES ('SQLite 教程', 'FTS5 全文搜索入门');
INSERT INTO articles_fts(rowid, title, body)
  VALUES (last_insert_rowid(), 'SQLite 教程', 'FTS5 全文搜索入门');

-- MATCH 查询：title 或 body 含「搜索」
SELECT a.id, a.title, highlight(articles_fts, 1, '<b>', '</b>') AS snippet
FROM articles_fts
JOIN articles a ON a.id = articles_fts.rowid
WHERE articles_fts MATCH '搜索'
ORDER BY bm25(articles_fts);
```

### 独立 FTS 表（无 external content）

```sql
CREATE VIRTUAL TABLE notes_fts USING fts5(
  title,
  body,
  tokenize='unicode61'   -- 默认类分词；英文可用 porter
);

INSERT INTO notes_fts (title, body)
VALUES ('Meeting', 'discuss roadmap and milestones');

-- 短语 + 前缀
SELECT rowid, title FROM notes_fts
WHERE notes_fts MATCH 'road* AND "mile stones"~1';  -- ~1 为 NEAR 近似（FTS5 语法）
```

### 常用选项入门

```sql
-- contentless：只存索引不存列值（省空间，查正文需 JOIN 源表）
CREATE VIRTUAL TABLE idx_only USING fts5(
  title,
  content='',
  contentless=1
);

-- 指定不参与索引的 UNINDEXED 列（仅存储不搜索）
CREATE VIRTUAL TABLE docs USING fts5(
  title,
  url UNINDEXED
);
```

## 易错点与交叉引用

| 问题 | 说明 |
| ---- | ---- |
| 忘记 MATCH | 对 FTS 表用普通 `WHERE col LIKE` 不走倒排索引 |
| external content 不同步 | `content=` 模式下 INSERT/UPDATE/DELETE 需同步 FTS 或触发器 |
| 中文分词 | 默认 tokenizer 对中文按字/规则切分，效果因场景而异；复杂中文需自定义 tokenizer |
| 特殊字符 | MATCH 字符串中引号、`*` 等需按 FTS5 语法转义 |
| 模块未启用 | 部分环境需编译时启用 FTS5；Cloudflare D1 支持 FTS5（见 [D1 差异](./d1-notes)） |

**相关章节**：[SELECT](./select) · [WHERE 与运算符](./where-operators) · [触发器](./trigger)

## SQLite 官方参考

- [FTS5 概述](https://www.sqlite.org/fts5.html)
- [CREATE VIRTUAL TABLE（fts5）](https://www.sqlite.org/fts5.html#fts5_tables)
- [FTS5 查询语法](https://www.sqlite.org/fts5.html#full_text_query_syntax)
- [辅助函数 bm25 / highlight / snippet](https://www.sqlite.org/fts5.html#appendix_a)
