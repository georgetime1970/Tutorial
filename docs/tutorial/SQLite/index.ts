const directory = [
  {
    text: "入门",
    collapsed: false,
    items: [{ text: "简介与数据类型", link: "/tutorial/SQLite/intro" }],
  },
  {
    text: "DDL",
    collapsed: false,
    items: [
      { text: "建表", link: "/tutorial/SQLite/create-table" },
      { text: "修改与删除", link: "/tutorial/SQLite/alter-drop" },
      { text: "约束", link: "/tutorial/SQLite/constraints" },
    ],
  },
  {
    text: "DML",
    collapsed: false,
    items: [
      { text: "插入", link: "/tutorial/SQLite/insert" },
      { text: "更新与删除", link: "/tutorial/SQLite/update-delete" },
      { text: "替换与 UPSERT", link: "/tutorial/SQLite/replace-upsert" },
    ],
  },
  {
    text: "查询",
    collapsed: false,
    items: [
      { text: "SELECT", link: "/tutorial/SQLite/select" },
      { text: "JOIN", link: "/tutorial/SQLite/join" },
      { text: "WHERE 与运算符", link: "/tutorial/SQLite/where-operators" },
      { text: "分组与 HAVING", link: "/tutorial/SQLite/group-having" },
      { text: "排序与分页", link: "/tutorial/SQLite/order-limit" },
      { text: "集合运算", link: "/tutorial/SQLite/set-ops" },
    ],
  },
  {
    text: "函数",
    collapsed: false,
    items: [
      { text: "聚合与窗口", link: "/tutorial/SQLite/agg-window" },
      { text: "标量函数", link: "/tutorial/SQLite/scalar-functions" },
    ],
  },
  {
    text: "进阶",
    collapsed: false,
    items: [
      { text: "CTE 与视图", link: "/tutorial/SQLite/cte-view" },
      { text: "触发器", link: "/tutorial/SQLite/trigger" },
      { text: "事务", link: "/tutorial/SQLite/transaction" },
      { text: "全文搜索", link: "/tutorial/SQLite/fts" },
      { text: "VACUUM 与 PRAGMA", link: "/tutorial/SQLite/vacuum-pragma" },
    ],
  },
  {
    text: "Cloudflare",
    collapsed: false,
    items: [{ text: "D1 与标准 SQLite 差异", link: "/tutorial/SQLite/d1-notes" }],
  },
];

export default directory;
