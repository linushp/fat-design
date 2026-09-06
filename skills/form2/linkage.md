# 联动（Linkage）

form2 在每次值变更后会执行 **状态联动**（`linkageFormState`），根据表单项 props 上的函数更新 `stateMap` 中的 `display`、`disabled`、`isPreview`、`required`、`label`、`xProps` 等。

## 声明式联动（推荐）

props 支持 **`(values, storeData) => 结果`**：

```tsx
<FormItem
  name="conditionalField"
  label="条件字段"
  component="Input"
  display={(values) => values.triggerField === 'show'}
/>

<FormItem
  name="disableField"
  label="可禁用字段"
  component="Input"
  disabled={(values) => values.disableTrigger === 'disable'}
/>

<FormItem
  name="previewField"
  label="只读字段"
  component="Input"
  isPreview={(values) => values.previewMode === 'preview'}
/>

<FormItem
  name="dynamicRequired"
  label="动态必填"
  component="Input"
  required={(values) => values.needRequired === true}
/>
```

参考：`demo/demo-form-conditional.tsx`

### 编辑场景：新建可编辑、编辑只读

```jsx
// fatcms：dict_code 编辑时不可改
dict_code: {
  isPreview: !isCreate,
  required: true,
},
```

## 命令式联动（onChange + formActions）

`onChange` 在联动计算 **之后** 触发，可读写 `formActions`：

```tsx
// demo/demo-form2.tsx
const onChange = (values, { formActions, stateMap }) => {
  if (values.name1 === 'z') {
    formActions.setValue('name2', 'zzzzz');
    formActions.setState('name4', { display: false });
    formActions.setState('name5', { disabled: false });
  } else {
    formActions.setState('name4', { display: true });
    formActions.setState('name5', { disabled: true });
  }
};
```

### setState 常用键

```ts
formActions.setState('fieldName', {
  display: false,   // 隐藏（不占位行为取决于布局）
  disabled: true,   // 禁用
  isPreview: true,  // 只读预览
  errors: [],       // 清空错误
});
```

## deps：依赖字段强制刷新

当其它字段变化需要 **重渲染本项**（如 enums 依赖上级）：

```tsx
<FormItem
  name="city"
  component="Select"
  deps={['province']}
  enums={(childProps, { values }) => getCities(values.province)}
/>
```

`deps` 变化会更新 `forceUpdateTick`，触发组件重挂载/刷新。

## xProps 联动

`xProps` 可为函数，动态传给底层 Input/Select：

```tsx
xProps={(values) => ({
  placeholder: values.mode === 'edit' ? '可修改' : '只读',
  disabled: values.lock === true,
})}
```

## 单字段 onChange

表单项级 `onChange` 在值写入后触发，签名：

```ts
onChange?: (value, params: FnFormOnChangeParams) => void
```

`params` 含 `formActions`、`values`、`stateMap` 等。

## 执行顺序（features.txt）

1. `setValue`（用户输入）
2. 表单项 `onChange`
3. **linkage**：`display` / `disabled` / `isPreview` / `xProps` / `deps`
4. 表单级 `onChange`
5. `commit` → 重渲染

## Dialog.onChange 强制刷新

`Dialog.showForm` 的 `onChange` 若 **返回 `true`**，会强制刷新弹窗内容（用于联动后更新 slot）：

```js
// src/dialog/show-form.jsx
if (onChange(...args) === true) {
  setTick(Date.now());
}
```

## fatcms 实践

- 扩展字段是否必填：来自 `extCfg.validate_required`，写入 schema 的 `required`
- 字典编码编辑只读：`isPreview: !isCreate`
- 复杂表格联动：批量编辑用 Handsontable，不用 form2 onChange

## 相关源码

- `src/form2/helper/linkageFormState.ts`
- `src/form2/form.tsx` — 变更后调用 `linkageFormState`
- `src/form2/helper/fixItemProps.ts` — 合并 state 与 props
