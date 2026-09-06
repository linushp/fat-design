# Schema 模式

Schema 模式用 `formProps.schema` 描述字段，由 `schemaToFormItems` 自动渲染为 `Form.Item`，适合 **列表查询、弹窗新建/编辑、配置化 CRUD**。

## 结构

```ts
interface FormSchema {
  type: 'object';
  properties: Record<string, FormItemSchema>;
}
```

- **`properties` 的 key** = 字段 `name`（提交数据的 key）
- 每个 property 支持 `label`、`component`、`required`、`validator`、`enums`、`xProps` 等（与 `Form.Item` props 一致）

## 完整示例（fatcms：数据字典）

```jsx
// fatcms-web/src/pages/devops/data-dict-manage/index.jsx
function getCreateEditFormProps(isCreate) {
  return {
    defaultValues: { dict_type: '1' },
    labelCol: { span: 6 },
    wrapperCol: { span: 15 },
    schema: {
      type: 'object',
      properties: {
        dict_code: {
          label: '字典编码',
          component: 'Input',
          maxLength: 30,
          required: true,
          validator: dictCodeValidator,
          isPreview: !isCreate,  // 编辑时只读
          xProps: {
            hasClear: true,
            placeholder: '字母、数字、下划线，最多30字符',
          },
        },
        dict_name: {
          label: '字典名称',
          component: 'Input',
          maxLength: 100,
          required: true,
          xProps: { hasClear: true },
        },
        status: {
          label: '启用状态',
          component: 'Select',
          enums: entityStatusList,
          required: true,
          validator: requiredStatusValidator,
          xProps: { hasClear: true },
        },
        dict_desc: {
          label: '描述',
          component: 'Input.TextArea',
          maxLength: 200,
          xProps: { maxLength: 200, showLimitHint: true, hasClear: true },
        },
      },
    },
  };
}
```

## 动态扩展 Schema（fatcms：字典项扩展字段）

在工厂函数里往 `properties` 追加字段，与固定字段共存：

```jsx
// fatcms-web/src/pages/devops/data-dict-manage/dict-item.jsx
const properties = formProps.schema.properties;
const extInfoArray = getExtInfoArray(dictInfo);
for (const extCfg of extInfoArray) {
  if (FIXED_EXT_FIELD_SET.has(extCfg.dataIndex)) continue; // 如 sort 已在固定区
  if (isBigintDataIndex(extCfg.dataIndex)) {
    properties[extCfg.dataIndex] = {
      label: extCfg.title,
      component: 'Input',
      required: extCfg.validate_required || false,
      validator: bigintFieldValidator,
      xProps: { placeholder: `整数，范围 ${BIGINT_RANGE_HINT}` },
    };
  } else if (extCfg.dataIndex === 'style') {
    properties[extCfg.dataIndex] = {
      label: extCfg.title,
      component: 'Select',
      enums: dictTagStyleList,
      required: extCfg.validate_required || false,
      xProps: { itemRender: tagStyleItemRender, valueRender: tagStyleItemRender },
    };
  } else {
    properties[extCfg.dataIndex] = {
      label: extCfg.title,
      component: 'Input',
      maxLength: 100,
      required: extCfg.validate_required || false,
      xProps: { hasClear: true },
    };
  }
}
```

## 与 Form 一起使用

```tsx
<Form {...formProps} />
// 或拆开展开
<Form
  defaultValues={formProps.defaultValues}
  labelCol={formProps.labelCol}
  wrapperCol={formProps.wrapperCol}
  schema={formProps.schema}
/>
```

## QueryForm（列表筛选）

`BizTablePro` 的 `initFormProps.schema` 与弹窗 schema 写法相同，但一般 **不做严格校验**（字段可空、用于筛选）：

```jsx
// index.jsx - queryFormSchema
initFormProps: {
  defaultValues: { status: 1 },
  schema: queryFormSchema,
},
```

## Dialog.showForm

```jsx
Dialog.showForm({
  title: '创建数据字典',
  formProps: getCreateEditFormProps(true),
  validate: true, // 默认 true，提交前 validateForm
  onOk: async ({ formActions }) => {
    const formValues = formActions.pickFormValues();
    // 或 params.formValues（show-form 注入）
    return await api.create({ data: formValues });
  },
});
```

编辑时设置 `formProps.defaultValues = record`。

## Schema 与 JSX 混用

`useFormChildren` 会先渲染 `schema` 生成的项，再渲染 `children`。复杂 slot 可用 JSX 补充：

```tsx
<Form schema={schema}>
  <FormItem name="_extra" label=" " component={CustomBlock} />
</Form>
```

## 相关源码

- `src/form2/helper/useFormChildren.tsx` — `schemaToFormItems`
- `src/form2/form-types.ts` — `FormItemSchema`、`FormSchema`
