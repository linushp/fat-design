# 校验（Validation）

校验规则由 `form-rules.ts` 的 `buildValidateRules` 从表单项 props 生成，底层使用 `src/validate`（async-validator 风格）。

## 内置校验

| Prop | 说明 |
|------|------|
| `required` | 非 `undefined` / `null` / `''`；**不 trim**，纯空格会通过 |
| `maxLength` / `minLength` | 字符串长度 |
| `length` | 固定长度 |
| `pattern` | 正则字符串或 RegExp，配 `patternMessage` |
| `format` | `'email'` \| `'number'` \| `'url'` \| `'tel'` |
| `min` / `max` | 数字范围（配合 `NumberPicker`） |
| `rules` | 高级：额外规则对象数组 |

```tsx
<FormItem
  name="email"
  label="邮箱"
  component="Input"
  required
  pattern="^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$"
  patternMessage="请输入有效的邮箱地址"
/>
```

参考：`demo/demo-form-validation.tsx`

## 自定义 validator（fatcms 推荐写法）

类型：`FnValidator = (rule, value) => string | null | Promise<...>`

**返回字符串表示错误**；返回 `undefined` / `null` 表示通过。

```jsx
// fatcms-web：字典编码
function dictCodeValidator(rule, value) {
  const str = String(value ?? '').trim();
  if (str === '') return '不能为空';
  if (str.length > 30) return '最多 30 个字符';
  if (!/^[A-Za-z0-9_]+$/.test(str)) return '只能包含字母、数字、下划线';
}

// fatcms-web：label/value 去空格必填
function requiredLabelValueValidator(rule, value) {
  if (value === undefined || value === null || String(value).trim() === '') {
    return '不能为空';
  }
}

properties.dict_code = {
  required: true,
  validator: dictCodeValidator,
  maxLength: 30,
};
```

### 与 demo 的差异

`demo-form-validation.tsx` 中部分示例使用 **单参数** `(value) => Promise.reject('...')`，与当前 `FnValidator (rule, value)` 并存时，**业务代码请统一用 `(rule, value) => 错误文案`**，与 `dict-item.jsx`、`index.jsx` 一致。

## 必填 + trim 最佳实践

`required` 不处理首尾空格时，应叠加 `validator`：

```jsx
{
  required: true,
  validator: (rule, value) => {
    if (String(value ?? '').trim() === '') return '不能为空';
  },
}
```

提交前再 `trim` 一次：

```js
dict_code: String(formValues.dict_code ?? '').trim(),
```

## 何时触发校验

| 方式 | 说明 |
|------|------|
| `Dialog.showForm` + `validate: true`（默认） | 点确定 → `formActions.validateForm()` → 有 errors 则 `return false` 阻止关闭 |
| `onSubmit` 内手动 | `await formActions.validateForm()` |
| `autoValidate`（字段级） | 值变化时校验该项 |
| `autoValidateOnCreated`（表单级） | 挂载后 `firstAutoValidateForm()` |
| `validateFromItem(name)` | 单字段 |
| `validateFromItemByTrigger(name, 'onBlur')` | 按 trigger 过滤 |

## Dialog.showForm 校验流程

```js
// src/dialog/show-form.jsx
onOk: async () => {
  if (validate) {
    await formActions.validateForm();
    if (formActions.getErrors().length > 0) return false;
  }
  return await onOk({ formActions, formValues, formStore });
}
```

fatcms 典型写法：

```jsx
Dialog.showForm({
  title: '创建数据项',
  formProps,
  onOk: async (params) => {
    const formValues = normalizeDictItemPayloadForSubmit(
      params.formActions.pickFormValues(),
      dictInfo
    );
    return await dataDictManageApi.createDataDictItem({ data: formValues });
  },
});
```

## 错误展示

- 错误写入 `stateMap[field].errors`
- `useLabelForErrorMessage: true` 时，错误信息可用 label 替换字段名
- `helpPos`: `'bottom'`（默认）| `'tip'` | `'always'`

## 批量表格（Handsontable）与 Form2 分离

字典项 **批量新增/编辑** 不走 Form2，用 `validateData` 回调（见 `dict-item.jsx` 的 `buildBatchHandsonValidateData`）。规则应与表单侧保持一致（label/value/status 必填、bigint 范围等）。

## 相关源码

- `src/form2/form-rules.ts`
- `src/validate/rules/required.js` — 必填判定
- `src/form2/form-actions.ts` — `validateForm`、`validateFromItem`
