# 最佳实践

结合 `fatcms-web` 与 `demo/` 总结的 form2 使用习惯。

## 1. 后台 CRUD：Schema + 工厂函数

```jsx
function getCreateEditFormProps(isCreate, extraContext) {
  return {
    defaultValues: { status: 1, sort: 1 },
    labelCol: { span: 6 },
    wrapperCol: { span: 15 },
    schema: { type: 'object', properties: { /* ... */ } },
  };
}

// 新建
Dialog.showForm({ title: '创建', formProps: getCreateEditFormProps(true), onOk });

// 编辑
const formProps = getCreateEditFormProps(false);
formProps.defaultValues = normalizeRecord(record);
Dialog.showForm({ title: '编辑', formProps, onOk });
```

参考：

- `fatcms-web/src/pages/devops/data-dict-manage/index.jsx`
- `fatcms-web/src/pages/devops/data-dict-manage/dict-item.jsx`
- `fatcms-web/src/pages/devops/app-manage/app-table.jsx`

## 2. 列表查询：QueryForm Schema 放宽校验

查询字段 **一般不必 `required`**，可用 `hasClear`、`placeholder` 即可。

```jsx
const queryFormSchema = {
  type: 'object',
  properties: {
    dict_code: { label: '字典编码', component: 'Input', xProps: { hasClear: true } },
    status: { label: '启用状态', component: 'Select', enums: entityStatusList, xProps: { hasClear: true } },
  },
};

// BizTablePro
initFormProps: { defaultValues: { status: 1 }, schema: queryFormSchema },
```

## 3. 校验：required + validator + 提交 normalize

| 层级 | 做法 |
|------|------|
| 必填 | `required: true` |
| 去空格 | 自定义 `validator` 检查 `trim()` |
| 格式 | `pattern` / `maxLength` / 专用 `validator` |
| 提交 | `pickFormValues()` 后再 `trim`、bigint 转字符串 |

示例：`dictCodeValidator`、`requiredLabelValueValidator`、`normalizeDictItemPayloadForSubmit`（`dict-item.jsx`）。

## 4. 编辑态只读主键

```jsx
dict_code: {
  required: true,
  isPreview: !isCreate,
},
```

避免编辑时改主键；仍参与校验与展示。

## 5. 扩展字段运行时拼装

扩展元数据存 `ext_info_desc` JSON，表单循环写入 `schema.properties`：

- 固定字段（`sort`）放 `FIXED_EXT_FIELD_SET`，在固定区声明，避免重复
- `bigint*` 用 `Input` + `bigintFieldValidator`，勿用 `NumberPicker`（精度问题）
- `style` 用 `Select` + `enums`
- 必填读 `extCfg.validate_required`

## 6. Dialog.onOk 与 API

```jsx
onOk: async ({ formActions }) => {
  const formValues = normalizeDictItemPayloadForSubmit(
    formActions.pickFormValues(),
    dictInfo
  );
  return await api.update({ data: formValues, condition: { id } });
  // return res 供 Dialog 根据 success 关窗
},
```

`Dialog.showForm` 默认 **`validate: true`**，无需在 onOk 开头重复 `validateForm`，除非关闭默认校验。

## 7. 批量编辑：不用 Form2

Handsontable 批量场景用 `showBatchCreateByHandsonDialog` / `showBatchEditByHandsonDialog` + `validateData`，规则与表单 **对齐**（label/value/status 必填、bigint、sort 整数范围）。

共用列：`buildBatchHandsonColumns`；共用校验：`buildBatchHandsonValidateData`。

## 8. enums 数据源

```jsx
// 静态
enums: entityStatusList,

// 异步
enums: () => Promise.resolve([...]),

// 依赖其它字段（配合 deps）
enums: (childProps, { values }) => fetchOptions(values.type),
```

`entityStatusList` 等见 `@/enums`。

## 9. 常见坑

| 问题 | 原因 | 建议 |
|------|------|------|
| 必填但空格通过 | `required` 不 trim | 加 `validator` |
| 提交少了字段 | 无 `label` 未进 `pickFormValues` | 表单项必须有 `label` |
| 编辑还能改编码 | 未设 `isPreview` | `isPreview: !isCreate` |
| bigint 精度丢失 | `NumberPicker` | 用 `Input` + BigInt 校验 |
| 联动不刷新 | 仅改 props 未走 form | 用函数式 `display` 或 `setState` |
| Schema 重复 sort | 固定区 + 扩展区都配 | `FIXED_EXT_FIELD_SET` 过滤 |

## 10. Demo 速查

| 文件 | 主题 |
|------|------|
| `demo/demo-form2.tsx` | onChange + setState 联动 |
| `demo/demo-form-validation.tsx` | 各类校验 |
| `demo/demo-form-conditional.tsx` | display/disabled/isPreview |
| `demo/demo-form-layout.tsx` | responsive 布局 |
| `demo/demo-query-form.tsx` | 查询表单 |

## 11. 与上层组件关系

```
Form (form2)
  ├── QueryForm（查询条）
  ├── Dialog.showForm（弹窗）
  └── BizTablePro.initFormProps（fatcms 列表页）
```

编写 fatcms 页面前，优先复制同模块已有 `getCreateEditFormProps` / `queryFormSchema` 模式，再按字段改 `properties`。
