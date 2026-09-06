---
name: fat-design
description: >-
  fat-design 是 Fusion Next 的二次封装，只记录与 Fusion 的差异。编写 TablePro、QueryForm、
  Dialog.showForm/showTable、PageCard、Form2、列设置、settingName，或从 Fusion API
  迁移到 fat-design 时使用。Fusion 同名组件（Button/Table/Input/Select 等）按 Fusion 用法即可。
---

# fat-design（相对 Fusion 的差异）

`fat-design` 基于 **Fusion Next**。同名基础组件（`Button`、`Table`、`Input`、`Select`、`Dialog` 声明式用法、`Tab`、`Balloon` 等）**按 Fusion API 写**，不要在本 skill 里查完整 props。

这里只记：**换掉的组件、新增的组件、行为不一致的点**。

## 引入

```tsx
import { TablePro, Form, Dialog, PageCard } from 'fat-design';
// fatcms-web
import { TablePro, Form, Dialog } from '@/libs/fat-design.js';
```

- class 前缀是 **`fatd-`**，不是 Fusion 的 `next-`
- `DatePicker` / `TimePicker` 实际是 Fusion **v2**
- 导出列表见 `src/libs.tsx`；类型见 `types/`

## 选型（和 Fusion 最大的差别）

| 要做的事 | 用这个 | 不要用 Fusion 那套 |
|---|---|---|
| 后台列表（查询+表+分页+工具栏） | `TablePro` + `useTablePro` | 自己拼 `Table` + `Pagination` + 查询 |
| 列表查询区 | `QueryForm` 或 `initFormProps` | Fusion `Form` + 一排 `Input` |
| 新建/编辑弹窗 | `Dialog.showForm` | 自己拼 `Dialog` + Fusion `Form` |
| 弹窗里再开一张表 | `Dialog.showTable` | |
| 表单 | `Form`（**form2**，不是 Fusion Form） | `@alifd/next` Form / Field |
| 页面容器 | `PageCard` | 随意 `div` |
| 可折叠区块 | `Card collapsible` | 自己写展开 |

## 硬性约定

1. **`Form` = form2**，不是 Fusion Form。Schema / JSX / `formActions` 见 [form2 skill](../form2/SKILL.md)。
2. **`settingName`** 必须是长度 **> 10** 的字符串（列设置、风格设置、QueryForm 设置都用它做本地存储 key）。
3. 列 `cell` 签名是 `(value, index, record, context)`，外部状态放到列的 `context`，不要靠闭包。详见 [table-pro.md](./table-pro.md)。

## 分册（需要时再读）

| 文档 | 何时读 |
|------|--------|
| [catalog.md](./catalog.md) | 不确定某个组件是 Fusion 原样还是本库新增 |
| [table-pro.md](./table-pro.md) | 列表页、列设置、列排序、单元格渲染 |
| [dialog.md](./dialog.md) | `Dialog.show*` 命令式 API |
| [extras.md](./extras.md) | Card / Button 扩展 / QueryForm / PageCard / Loading |
| [../form2/SKILL.md](../form2/SKILL.md) | 任何表单 |

细节以源码和 demo 为准：`src/`、`types/`、`demo/`。
