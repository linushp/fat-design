# Dialog（相对 Fusion Dialog 的差异）

JSX `<Dialog visible>`、`Dialog.show` / `confirm` / `alert` / `success` 等 **按 Fusion 用**。

本库在 `Dialog.show` 上加了一组命令式方法（`src/dialog/show.jsx`）。

## 扩展方法

| 方法 | 用途 |
|------|------|
| `Dialog.showForm` | 弹窗表单（内部是 form2） |
| `Dialog.showTable` | 弹窗里嵌 TablePro |
| `Dialog.showInput` | 单字段输入 |
| `Dialog.showComp` | 任意内容 |
| `Dialog.showTab` | header 上带 Tab |
| `Dialog.showAudit` | 审核 |
| `Dialog.showBatchInput` | 批量输入 |
| `Dialog.showBatchProcess` | 批量处理进度 |
| `Dialog.showBatchByExcel` | Excel 批量 |
| `Dialog.confirmPromise` | confirm，返回 `Promise<boolean>` |

`Drawer.show` 同样存在（列设置抽屉用它）。

## Dialog.showForm（最常用）

```tsx
Dialog.showForm({
  title: '创建',
  formProps: {
    defaultValues: { status: 1 },
    labelCol: { span: 6 },
    wrapperCol: { span: 15 },
    schema: { type: 'object', properties: { /* 见 form2 */ } },
  },
  onOk: async (event) => {
    const values = event.formActions.pickFormValues();
    await api.save(values);
    // 返回 false 阻止关闭；校验失败会自动拦截（validate 默认 true）
  },
});
```

- `validate` 默认 `true`：点确定先 `validateForm()`，有错不关。
- `onOk` 的 event 上挂了 `formActions` / `formStore` / `formValues`。
- 表单写法见 [form2 skill](../form2/SKILL.md)，不要用 Fusion Field。

Demo：`demo/demo-dialog-show.tsx`、`demo-form1.tsx`。

## Dialog.showTable

`tableProProps` 的形状与 `useTablePro({...})` 的入参相同（内部会自己调 hook）：

```tsx
Dialog.showTable({
  title: '查看日志',
  tableProProps: {
    isEnableRowSelection: false,
    initTableProps: { size: 'small', columns: [...] },
    initPaginationProps: { size: 'small' },
    onQuery: async () => ({ total, dataSource }),
  },
});
```

## 不要做的

- 不要为了「弹个表单」手写 `<Dialog><Form>`，用 `showForm`。
- `onOk` 返回 `false` 或校验失败才会拦住关闭；成功应 `await` 完再结束。
