# 其它差异（相对 Fusion）

## 样式前缀

class 前缀 **`fatd-`**，不是 `next-`。业务里不要写死 `next-` 选择器。

## Card：可折叠（Fusion Card 没有）

```tsx
<Card collapsible title="基本信息" extra={...} defaultCollapsed={false}>
  <Card.Content>...</Card.Content>
</Card>
```

- 必须有 `title`。点标题栏切换；收起用 `display:none`，子组件不卸载。
- `collapsed` + `onCollapsedChange` 为受控；`defaultCollapsed` 为非受控。
- Demo：`demo/demo-card-collapsible.tsx`。源码：`src/card/card.jsx`。

基础 `title` / `subTitle` / `extra` / `free` / `contentHeight` 仍按 Fusion Card。

## Button 扩展

基础 `type` / `text` / `warning` 按 Fusion。额外：

- `tooltip`：禁用时仍可 hover 看到原因。
- `Button.SaveButton`：`onClick` 返回 Promise，自动 loading + 成功/失败 Message。
- `Button.ActionButton` / `Button.LoadingButton`：同类异步按钮。

## QueryForm

Fusion 没有。基于 form2，多了查询布局和可选「表单设置」：

```tsx
<QueryForm
  schema={...}
  defaultValues={...}
  settings
  settingName="demoQueryFormSimple"  // settings 为 true 时必填
/>
```

列表页更常见的是塞进 `useTablePro({ initFormProps })`，不要单独再包一层 Fusion Form。

## PageCard / DetailPage

Fusion 没有。页面根容器用 `<PageCard>`，无背景：`mode="nobg"`。`PageCard.Divider` 分割。详情用 `DetailPage`（`CardForm` / `Section` / `Summary`）。

## Loading

包裹用法按 Fusion。额外：`Loading.showLoading({ tip, fullScreen })` / `Loading.hideLoading()`。

## Filter

不是 Table 列头 filter。工具栏分段：`dataSource={[{ label, value, count }]}`，由 `useTablePro` 的 `initFilterProps` 接入。

## BalloonConfirm / PopConfirm

```tsx
<PopConfirm title="确定删除？" onOk={...}><Button>删除</Button></PopConfirm>
```

## DatePicker / TimePicker

导出的是 Fusion **picker2**，API 按 v2（`value` 用 dayjs 等），不要当 Fusion v1 的 `onChange` 第二个参数是 formatted string 来用。
