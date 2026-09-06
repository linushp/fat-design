# Table / TablePro（相对 Fusion Table 的差异）

Fusion `Table` 的 columns、lock、stickyLock、rowSelection 等 **照旧**。下面只记本库多出来的部分。

## 列表页用 TablePro，不要手拼 Fusion Table

```tsx
const { useTablePro, renderTime, renderBoolean, renderOperationCell } = TablePro;

function Page() {
  const props = useTablePro({
    onQuery: async (formValues, otherValues) => {
      // otherValues: { queryTrigger, current, pageSize, filterValue, sort }
      return { total: 100, dataSource: [] }; // 或 { tableProps, paginationProps }
    },
    initFormProps: { schema, defaultValues: {}, settings: true, settingName: 'myQueryFormSetting' },
    initTableProps: { primaryKey: 'id', title: '列表', sort: { created_at: 'desc' }, columns: [...] },
    initPaginationProps: { pageSize: 20 },
    initFilterProps: { dataSource: [{ label: '全部', value: 'ALL' }] },
    initOperationProps: { buttons: [{ text: '设置', onClick: 'setting', icon: 'set' }] },
  });

  return <TablePro {...props} settingName="myTableColumnSetting" />;
}
```

- **`useTablePro` 管状态，`<TablePro settingName>` 管渲染**，两段式。
- `settingName` 长度必须 **> 10**，列设置 / 风格设置存在 localForage。
- `onClick: 'setting'` 打开列设置抽屉（显示/隐藏/排序/锁列 + 尺寸/斑马纹）。
- 列默认隐藏：`display: false`。锁列：`lock: 'left' | 'right'`。
- 用户没做过设置时：用 `initTableProps` 的 `size`（默认 `medium`）和 `isZebra`（默认 `false`）；有本地数据则覆盖。

源码：`src/table-pro/`。Demo：`demo/demo-table-pro.tsx`。

## 列排序（useTablePro 接管，不要自己写 onSort）

列上 `sortable: true` 与 Fusion Table **相同**。差别是：`useTablePro` 内部维护 `sort`，点列头会回到第 1 页并 `doQuery`，`onQuery` 里用 **Table 同款结构** 拼后端 `orderBy`。

```tsx
useTablePro({
  initTableProps: {
    sort: { created_at: 'desc' }, // 仅初始值，可省略（默认 {}）
    columns: [
      { title: '创建时间', dataIndex: 'created_at', sortable: true },
    ],
  },
  onQuery: async (formValues, { current, pageSize, sort }) => {
    // sort: { created_at: 'desc' }  或  {}（未排序 / 取消排序）
    return api.list({ ...formValues, pageNo: current, pageSize, sort });
  },
});
```

- `initTableProps.sort` **只是初始值**，之后状态在 hook 里；表单重置会回到这份快照。
- 搜索、筛选项、翻页 **保持** 当前 sort；点列头取消排序时 `sort` 为 `{}`（Table 的 `default` 已被清掉，不要传给后端）。
- hook 会覆盖 `tableProps.onSort`。不要再写 `onSort` + `sortRef` + `actions.doQuery()`。
- 这是后端排序。不要在 `onSort` 里排当前页 `dataSource`。列设置抽屉的拖拽排序（`onSortEnd`）是改列顺序，和列头 sort 不是一回事。

## cell 第 4 个参数 context（Fusion 没有）

```tsx
cell: (value, index, record, context) => context.currency + value
// 列上透传：
{ dataIndex: 'amount', context: pageContext, cell: (v, i, r, ctx) => ... }
```

`context` 默认含 `value` / `rowIndex` / `record` / `dataIndex` / `title`，再合并列上的 `context`。外部会变的状态放到 `context`，不要闭包进 `cell`（单元格会忽略 `cell` 函数引用变化以做性能优化）。

Demo：`demo/demo-table-cell-context.tsx`。

## 内置 cell 渲染（TablePro 静态方法）

`renderString` `renderStringExt` `renderTime` `renderTimeAuto` `renderDay` `renderDayAuto` `renderBoolean` `renderThousands` `renderJSON` `renderHTML` `renderRelativeTime` `renderTimeDuration` `renderEnumTag` `renderFileDownload` `renderFileImage` `renderOperationCell` `renderMultiFieldCell`

```tsx
{ title: '时间', dataIndex: 'time', cell: renderTime }
{ title: '操作', lock: 'right', cell: (a, b, record) => renderOperationCell([{ title: '编辑', onClick: () => {} }]) }
```

## 不要做的

- 后台 CRUD 列表不用裸 Fusion `Table` 拼分页。
- 不要把处理后的 `columns` 写回 `initTableProps.columns`（隐藏列会丢）；原始列留在 hook 状态里，展示列由 `settingName` 计算。
- 列排序不要自己维护 `sortRef` / `initTableProps.onSort`，从 `otherValues.sort` 取。
