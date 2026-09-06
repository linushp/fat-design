# 布局（Layout）

## 标签与栅格

```tsx
<Form
  labelAlign="left"      // 'top' | 'left' | 'inset'
  labelTextAlign="right"
  labelCol={{ span: 6 }}
  wrapperCol={{ span: 15 }}
  size="medium"
  fullWidth              // 表单项控件宽度 100%
>
```

fatcms 弹窗表单常用：

```jsx
labelCol: { span: 6 },
wrapperCol: { span: 15 },
```

QueryForm / 列表筛选常用较紧凑布局，由 `QueryForm` 或 `BizTablePro.initFormProps` 决定。

## 布局模式 `layout`

| layout | 说明 |
|--------|------|
| 默认（不设） | 纵向排列，配合 `labelCol` / `wrapperCol` |
| `'responsive'` | 响应式网格，需 `layoutProps` |
| `'float'` | 从左到右浮动，常配 `labelAlign: 'inset'` |
| `'custom'` | 自定义 `layoutComponent` |
| `'null'` | 无布局包裹 |

### 响应式网格

```tsx
<Form
  layout="responsive"
  layoutProps={{
    columns: 3,
    gap: 8,
  }}
>
  <FormItem name="a" label="A" component="Input" />
  ...
</Form>
```

参考：`demo/demo-form-layout.tsx`、`src/form2/features.txt`

### 浮动布局

```tsx
<Form layout="float" labelAlign="inset" layoutProps={{ itemWidth: 200 }}>
```

## 跨列 cellProps

多列布局中占多格：

```tsx
<FormItem
  name="desc"
  label="描述"
  component="Input.TextArea"
  cellProps={{ colSpan: 2 }}
/>
```

Schema 同样支持 `cellProps: { colSpan: 2 }`。

## 内联表单

```tsx
<Form inline>
  <FormItem name="q" label="关键词" component="Input" />
</Form>
```

## Form.ItemCard（分组）

fatcms 扩展配置等场景用卡片分组（若项目已封装）：

```jsx
import { Form } from '@/libs/fat-design.js';
const FormItemCard = Form.ItemCard;

<FormItemCard title="基本信息">
  {/* Form.Item 或 schema */}
</FormItemCard>
```

## Dialog 内容区尺寸

```jsx
Dialog.showForm({
  formProps,
  contentStyle: { minHeight: '430px' }, // 或 height: 360
});
```

`show-form.jsx` 默认 `width: 600`、`maxHeight: 600`、`overflow: auto`。

## 只读预览模式

表单级：

```tsx
<Form isPreview>
```

字段级 `isPreview` 见 [linkage.md](./linkage.md)。

## RTL

```tsx
<Form rtl>
```

## 相关源码

- `src/form2/form-layout.tsx`
- `src/form2/layout/from-float-layout.tsx`
- `src/form2/main.scss`
