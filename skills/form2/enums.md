# enums 枚举项

form2 通过表单项 prop **`enums`** 为 Select / RadioGroup / CheckboxGroup 等提供选项。实现：`src/form2/helper/useDataSource.ts`。

主文档（含 fatcms `enumsBy*`）：`.qoder/skills/fat-design/SKILL.md` → **Enums（枚举项）**。

## 数据结构

```ts
interface ILabelValue {
  label: string;
  value: string | number;
  color?: string;   // 可选，Tag 等展示
}
```

## 三种来源

```tsx
// 1. 静态数组（推荐）
enums: entityStatusList

// 2. 同步函数
enums: (childProps, { values, formActions }) => {
  return values.type === 'a' ? listA : listB;
}

// 3. 异步
enums: () => api.getOptions().then(res => res.data)
// 或
enums: () => Promise.resolve([{ label: 'A', value: 'a' }])
```

函数第二参数为 `FnFormOnChangeParams`（含 `values`、`formActions`、`stateMap` 等）。

## 优先级

1. `xProps.dataSource`（非空数组）
2. `enums` 静态数组
3. `enums` 函数返回值 / Promise

## 级联

```tsx
deps: ['province'],
enums: (_, { values }) => cities[values.province] || [],
onChange: (_, { formActions }) => formActions.setValue('city', null),
```

## Select xProps

- `hasClear`、`placeholder`、`showSearch`、`filterLocal`
- `mode: 'multiple' | 'tag'`
- `itemRender` / `valueRender`：自定义选项与选中展示

## fatcms-web

- 静态：`import { entityStatusList, entityStatusMap } from '@/enums'`
- 远程：`enumsByDictCode` / `enumsByCysCfgEnum` / `enumsByLinkToCustom` + `useSchemaEnumInfo(schema)`
- 批量表格：`type: 'dropdown', enums: entityStatusList`

## 注意

- 提交的是 `value`，非 `label`
- `value` 类型与选项一致（number vs string）
- 必填枚举： `required` + 可选 `validator` 检查是否在列表内
