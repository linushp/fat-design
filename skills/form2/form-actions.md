# formActions API

`onCreated` / `onChange` / `onSubmit` / `Dialog.onOk` 的第二个参数（或 `event.formActions`）提供 **FormActions** 实例，操作表单值与状态。

```tsx
<Form
  onCreated={(values, { formStore, formActions }) => {
    window.__formActions = formActions; // 调试
  }}
/>
```

## 校验

| 方法 | 说明 |
|------|------|
| `validateForm()` / `validate()` | 校验所有已注册字段 |
| `validateFromItem(name)` | 校验单个字段 |
| `validateFromItemByTrigger(name, trigger)` | 按 trigger 过滤（如 `'onBlur'`） |
| `firstAutoValidateForm()` | 仅 `autoValidate: true` 的字段 |
| `getErrors()` | `[{ name, errors }]` |
| `clearErrors(name?)` | 清空错误 |

```js
await formActions.validateForm();
if (formActions.getErrors().length > 0) return;
```

## 取值 / 设值

| 方法 | 说明 |
|------|------|
| `getValues()` | store 中全部 `values` |
| `getValue(name)` | 单字段 |
| `setValue(name, value)` | 设单字段 |
| `setValues(obj)` | 批量设值 |
| `pickFormValues()` | **仅含已注册且带 `label` 的字段**，提交用 |
| `getDefaultValues()` | 初始默认值 |
| `reset()` / `resetToDefault()` | 重置 |

### pickFormValues vs getValues

```js
// store: { username: 'a', _internal: 1 }
// 注册了 username（有 label）、secret（无 label 的辅助项）

formActions.getValues();       // { username: 'a', _internal: 1 }
formActions.pickFormValues();  // { username: 'a' }  — 无 label 的不提交
```

fatcms **Dialog.onOk** 推荐：

```js
const formValues = formActions.pickFormValues();
```

## 状态

| 方法 | 说明 |
|------|------|
| `getState(name)` | 单字段 stateMap（含 errors、display 等） |
| `getStates()` | 全部 stateMap |
| `setState(name, partial)` | 批量更新状态项 |
| `setStateItem(name, key, value)` | 更新单个状态键 |
| `forceUpdate(name?)` | 触发重渲染 |

```js
formActions.setState('field', { display: false, disabled: true });
```

## 其它

| 方法 | 说明 |
|------|------|
| `getFormItemProps(name)` | 原始注册 props |
| `getFormItemPropsFixedByState(name)` | 合并联动后的 props |
| `getExtData1().propsMap` | 所有字段注册信息 |

## Dialog.showForm 的 onOk 参数

```js
onOk: async (event) => {
  const { formActions, formValues, formStore } = event;
  // formValues 来自 store，未必经过 pickFormValues
  const data = formActions.pickFormValues();
};
```

部分 fatcms 页面解构为 `({ formActions })` 或 `({ formValues })`，建议统一 `pickFormValues()` + 业务 normalize。

## 源码

`src/form2/form-actions.ts`（含 JSDoc 示例）
