---
name: fat-design-form2
description: fat-design Form（form2）用法指南，这是 Fusion Form 的整份替换。涵盖 Schema/JSX、校验、联动、布局、formActions、Dialog.showForm。编写表单、QueryForm、弹窗表单时使用。Fusion Field / Form.Item 的旧写法不要用。
---

# fat-design Form2（替换 Fusion Form）

**不要按 Fusion Form / Field 来写。** 导出的 `Form` 是 `src/form2`，支持 Schema 与 JSX，可混用。

其它 Fusion 差异（TablePro、Dialog.show*、PageCard）见 [fat-design 枢纽](../fat-design/SKILL.md)。

```tsx
import { Form, Input, Select, Dialog } from 'fat-design';
// fatcms-web
import { Form, Dialog } from '@/libs/fat-design.js';

const FormItem = Form.Item;
const FormItemCard = Form.ItemCard; // 分组卡片（fatcms 常用）
```

## 文档索引

| 文档 | 内容 |
|------|------|
| [schema-mode.md](./schema-mode.md) | Schema 模式、`properties` 字段、与 QueryForm/Dialog 配合 |
| [jsx-mode.md](./jsx-mode.md) | `Form.Item` JSX 写法、`onSubmit` / `onCreated` |
| [validation.md](./validation.md) | `required`、`pattern`、`validator`、`maxLength` 等 |
| [enums.md](./enums.md) | `enums` 静态/函数/异步、级联、`xProps.dataSource`、fatcms enumsBy* |
| [linkage.md](./linkage.md) | `display` / `disabled` / `isPreview` / `deps` / `onChange` 联动 |
| [layout.md](./layout.md) | `labelCol`、`responsive`、`float`、`cellProps` |
| [form-actions.md](./form-actions.md) | `validateForm`、`pickFormValues`、`setValue`、`setState` |
| [best-practices.md](./best-practices.md) | Dialog.showForm、fatcms-web 案例、常见坑 |

## 最小示例

### Schema（推荐：配置化页面）

```tsx
const formProps = {
  defaultValues: { status: 1 },
  labelCol: { span: 6 },
  wrapperCol: { span: 15 },
  schema: {
    type: 'object',
    properties: {
      dict_code: {
        label: '字典编码',
        component: 'Input',
        required: true,
        maxLength: 30,
        xProps: { hasClear: true },
      },
    },
  },
};

Dialog.showForm({ title: '创建', formProps, onOk: async ({ formActions }) => { /* ... */ } });
```

### JSX（适合复杂交互）

```tsx
<Form defaultValues={{ name: '' }} onSubmit={(values, { formActions }) => {}}>
  <FormItem name="name" label="名称" component="Input" required maxLength={50} />
</Form>
```

## 核心概念

1. **字段名**：Schema 下 `properties` 的 key 即 `name`；JSX 下用 `name` 属性。
2. **值存储**：`formStore.storeData.values`；改值用 `formActions.setValue`。
3. **联动状态**：`display` / `disabled` / `isPreview` / `required` / `xProps` 可为 `(values, storeData) => …`。
4. **校验时机**：`Dialog.showForm` 默认 `validate: true`，点确定前 `validateForm()`；也可在 `onOk` 里手动调用。
5. **取值提交**：弹窗场景用 `formActions.pickFormValues()`（仅有 `name` 且带 `label` 的项）；`getValues()` 含 store 里全部 key。

## 源码与 Demo

- 源码：`src/form2/`（`form.tsx`、`form-item.tsx`、`form-actions.ts`、`form-rules.ts`、`helper/linkageFormState.ts`）
- Demo：`demo/demo-form2.tsx`、`demo-form-validation.tsx`、`demo-form-conditional.tsx`、`demo-form-layout.tsx`、`demo-query-form.tsx`
- 业务参考：`fatcms-web/src/pages/devops/data-dict-manage/`、`user-account-manage/`、`app-manage/app-table.jsx`

## 内置表单项组件名（常用）

`Input`、`Input.TextArea`、`Select`、`NumberPicker`、`Switch`、`Switch.BoolSwitch`、`DatePicker`、`Upload`、 `FormButtonGroup`（含 `FormSubmit` / `FormReset`）等，见 `ComponentsStore.buildInComponents`。
