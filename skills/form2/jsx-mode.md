# JSX 模式

用 `<Form.Item />`（或 `Form.Item`）作为 `Form` 子节点声明字段，适合 **强交互、演示、字段量少** 的场景。

```tsx
const FormItem = Form.Item;
const FormSubmit = Form.Submit;
```

## 基础表单

```tsx
<Form
  defaultValues={{ name1: '', Select1: 'AAA' }}
  labelAlign="left"
  labelCol={{ span: 6 }}
  wrapperCol={{ span: 16 }}
  onCreated={(values, { formStore, formActions }) => {
    // 保存 formActions 供外部使用
  }}
  onChange={(values, { formActions, stateMap }) => {
    // 联动逻辑，见 linkage.md
  }}
  onSubmit={async (values, { formActions }) => {
    await formActions.validateForm();
    const errors = formActions.getErrors();
    if (errors.length === 0) {
      await save(values);
    }
  }}
>
  <FormItem name="name1" label="名字" component="Input" required />
  <FormItem
    name="Select1"
    label="类型"
    component="Select"
    enums={() => Promise.resolve([
      { label: 'A', value: 'AAA' },
      { label: 'B', value: 'BBB' },
    ])}
  />
  <FormItem label=" " component="FormButtonGroup"
    xProps={{
      buttons: [
        { component: 'FormSubmit', text: '提交' },
        { component: 'FormReset', toDefault: true },
      ],
    }}
  />
</Form>
```

参考：`demo/demo-form2.tsx`

## Form.Item 必填属性

| 属性 | 说明 |
|------|------|
| `name` | 字段名（必填） |
| `label` | 标签；无 label 的项不会进入 `pickFormValues()` |
| `component` | 内置组件名字符串，如 `'Input'`、`'Select'` |
| `required` | 是否必填 |
| `maxLength` / `minLength` / `min` / `max` | 内置校验 |
| `pattern` | 正则；可配 `patternMessage` |
| `validator` | 自定义校验函数 |
| `enums` | 下拉/单选数据源 |
| `xProps` | 传给底层组件的 props |
| `display` / `disabled` / `isPreview` | 支持函数联动 |
| `description` | 表单项下方说明文字 |
| `autoValidate` | 是否在变更时自动校验该项 |

类型定义：`src/form2/form-types.ts` → `FormItemProps`

## 提交按钮

方式一：`submitter={true}` 使用默认提交/重置按钮（Schema 常用）。

方式二：JSX 使用 `FormButtonGroup`：

```tsx
<FormItem
  name="_submit"
  label=" "
  component="FormButtonGroup"
  xProps={{
    buttons: [
      { component: 'FormSubmit' },
      { component: 'FormReset', toDefault: true },
    ],
  }}
/>
```

方式三：外层 `Button` + `formActions.validateForm()`（Dialog.onOk 模式）。

## onSubmit 触发

表单项 `FormSubmit` 或原生 submit 会触发 `formEventBus` → `Form` 的 `onSubmit`。Dialog 场景一般不依赖 `onSubmit`，而在 `onOk` 里校验并 `pickFormValues`。

## 与 Schema 选型建议

| 场景 | 建议 |
|------|------|
| devops 后台 CRUD 弹窗 | Schema + `getXxxFormProps()` 工厂 |
| 查询区 QueryForm | Schema |
| 复杂联动 demo / 原型 | JSX |
| 扩展字段运行时拼装 | Schema 动态 `properties`（见 schema-mode.md） |

## fatcms 中的 JSX 用法

fatcms 业务页以 **Schema + Dialog.showForm** 为主；`Form.Item` 多用于 `Form.ItemCard` 包裹的局部（若存在）。字典项管理见 `dict-item.jsx` 的 `getCreateEditFormProps`（纯 Schema）。
