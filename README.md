# Fat Design

A React component library built for data-intensive admin dashboards. Focused on table-heavy and form-heavy scenarios where other libraries fall short.

[![React](https://img.shields.io/badge/React-16.8%20%7C%2017%20%7C%2018-blue)](https://reactjs.org) [![TypeScript](https://img.shields.io/badge/TypeScript-4.9%2B-blue)](https://www.typescriptlang.org) [![Version](https://img.shields.io/badge/version-0.1.0-green)](./package.json)

## React 版本支持

| React | 支持状态 | 业务入口配置 |
|-------|----------|--------------|
| **&lt; 16.8**（含 16.4） | ❌ **不支持** | — |
| **16.8** | ✅ 正式支持 | `configReactDOM(ReactDOM)` |
| **17** | ✅ 正式支持 | `configReactDOM(ReactDOM)` |
| **18** | ✅ 正式支持（推荐） | `configReactDOM18(ReactDOM, ReactDOMClient)` |
| **19** | ❌ **不支持** | 勿调用 `configReactDOM19`（会抛错） |

**peerDependencies：** `react` / `react-dom` 均为 `>=16.8.0 <19.0.0`。

### 为什么不能支持 React 16.4？

React **Hooks**（`useState` / `useEffect` / `useContext` 等）从 **16.8.0** 才提供。fat-design 核心路径大量使用 Hooks，例如：

- `ConfigProvider` v2（`useContext`）
- `Form` / `QueryForm` / `TablePro`（`useTablePro` 等）
- Overlay v2、Image、SortableList、Dialog v2 等

在 16.4 上运行会直接报 `Invalid hook call` / `useXxx is not a function`，**无法通过适配层或业务入口补丁解决**。若要兼容 16.4，等于把上述模块全部改回 class 组件，成本接近重写，本库不做。

宿主请至少升级到 **React 16.8+**（更推荐直接 17/18）。

fat-design **不打包** React / ReactDOM。Message、Notification、Dialog 等独立根节点依赖宿主在应用入口注入 ReactDOM。请按下方「按 React 版本快速开始」配置；组件用法本身在 16.8～18 之间一致。

更细的兼容说明见 [`doc/react-16-17-18-compat.md`](./doc/react-16-17-18-compat.md)。

## Installation

```bash
npm install fat-design react react-dom
# or
yarn add fat-design react react-dom
# or
pnpm add fat-design react react-dom
```

请自行安装与业务匹配的 `react` / `react-dom`（16.8 / 17 / 18 同一主版本），并建议将 `react-is` 锁定为同一主版本。

## 按 React 版本快速开始

> **通用约定**
>
> 1. `window.React` 必须与打包器解析到的 `react` **同源**（先 `import` 再挂全局）。
> 2. 先调用 `configReactDOM` / `configReactDOM18`，再加载依赖 fat-design 的业务代码。
> 3. **不要**在同一工程里运行时探测再决定是否 `import 'react-dom/client'`（React 16/17 构建期会失败）。按宿主版本写死入口即可。

### React 18（推荐）

```tsx
import React from 'react'
import * as ReactDOM from 'react-dom'
import * as ReactDOMClient from 'react-dom/client'
import { configReactDOM18, Button, Message } from 'fat-design'
import 'fat-design/style.css'

// 可选：给 UMD / 动态脚本用的合并对象
const ReactDOMMerged = {
  ...ReactDOMClient,
  ...ReactDOM,
  createRoot: ReactDOMClient.createRoot,
}
;(window as any).React = React
;(window as any).ReactDOM = ReactDOMMerged

// 必须：传入两个模块（不要只传合并对象）
configReactDOM18(ReactDOM, ReactDOMClient)

function App() {
  return (
    <Button type="primary" onClick={() => Message.success('Hello!')}>
      Click me
    </Button>
  )
}

const root = ReactDOMClient.createRoot(document.getElementById('root')!)
root.render(<App />)
```

### React 16.8 / 17

```tsx
import React from 'react'
import * as ReactDOM from 'react-dom'
// 不要 import 'react-dom/client'
import { configReactDOM, Button, Message } from 'fat-design'
import 'fat-design/style.css'

;(window as any).React = React
;(window as any).ReactDOM = ReactDOM

configReactDOM(ReactDOM)

function App() {
  return (
    <Button type="primary" onClick={() => Message.success('Hello!')}>
      Click me
    </Button>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### 低代码 / 动态加载场景（参考 fatcms-web）

若业务代码需在挂好全局后再加载，保持「挂全局 → config → 动态 import」顺序：

```tsx
import React from 'react'
import * as ReactDOM from 'react-dom'
import * as ReactDOMClient from 'react-dom/client'
import { configReactDOM18 } from 'fat-design'

async function prepare() {
  const ReactDOMMerged = {
    ...ReactDOMClient,
    ...ReactDOM,
    createRoot: ReactDOMClient.createRoot,
  }
  window.React = React
  window.ReactDOM = ReactDOMMerged
  window['react'] = React

  configReactDOM18(ReactDOM, ReactDOMClient)
  await import('./app-entry') // 内部再 import 组件
}
```

React 16/17 将上面的 `configReactDOM18` 换成 `configReactDOM(ReactDOM)`，且不要引入 `react-dom/client`。

### 样式

```tsx
import 'fat-design/style.css' // 或发布产物中的 style.css 路径
```

主题样式见下文 [Themes](#themes)。

### 通过 `<script>` 标签引入（UMD）

适用于无打包器的静态页、简易 demo、或 CDN 直出。产物全局变量名为 **`FatDesign`**（对应 `dist/index.umd.js`）。

**加载顺序（必须）：**

1. React UMD  
2. ReactDOM UMD  
3. fat-design 样式（`style.css`）  
4. fat-design UMD（`index.umd.js`，**不要**写 `type="module"`）  
5. 业务脚本  

UMD 场景下，若 `window.ReactDOM` 在库加载前已挂好，`tryAutoConfig` 会按版本自动调用 `configReactDOM` / `configReactDOM18`。为稳妥仍可在业务脚本里显式再调一次。

> React 19 **没有**官方 UMD 产物，且本库不支持 React 19。script 方式请使用 React **16.8 / 17 / 18** 的 UMD。

#### React 18 + script

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <title>fat-design script</title>
  <link rel="stylesheet" href="https://cdn.example.com/fat-design/style.css" />
</head>
<body>
  <div id="root"></div>

  <script src="https://unpkg.com/react@18.2.0/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js"></script>
  <script src="https://cdn.example.com/fat-design/index.umd.js"></script>
  <script>
    // React 18 UMD 的 ReactDOM 自带 createRoot，一般会自动配置；显式调用更稳妥：
    FatDesign.configReactDOM18(ReactDOM, ReactDOM);

    var h = React.createElement;
    var Button = FatDesign.Button;
    var Message = FatDesign.Message;

    ReactDOM.createRoot(document.getElementById('root')).render(
      h('div', null,
        h('p', null, 'version: ' + FatDesign.version),
        h(Button, {
          type: 'primary',
          onClick: function () { Message.success('来自 script 标签'); }
        }, '点我')
      )
    );
  </script>
</body>
</html>
```

本地可用发布目录中的 [`example.html`](./example.html) 对照（相对路径引用同目录下的 `style.css` / `index.umd.js`）。

#### React 16.8 / 17 + script

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <title>fat-design script (React 17)</title>
  <link rel="stylesheet" href="https://cdn.example.com/fat-design/style.css" />
</head>
<body>
  <div id="root"></div>

  <!-- 将 17.0.2 换成 16.14.0 等即可用于 React 16.8+ -->
  <script src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
  <script src="https://cdn.example.com/fat-design/index.umd.js"></script>
  <script>
    FatDesign.configReactDOM(ReactDOM);

    var h = React.createElement;
    var Button = FatDesign.Button;
    var Message = FatDesign.Message;

    ReactDOM.render(
      h('div', null,
        h(Button, {
          type: 'primary',
          onClick: function () { Message.success('Hello from UMD'); }
        }, 'Click me')
      ),
      document.getElementById('root')
    );
  </script>
</body>
</html>
```

#### script 方式注意点

| 项 | 说明 |
|----|------|
| 全局名 | `window.React`、`window.ReactDOM`、`window.FatDesign` |
| 组件用法 | `FatDesign.Button`、`FatDesign.Message`、`FatDesign.TablePro` …（无 JSX 时用 `React.createElement`） |
| 配置 API | 16/17：`FatDesign.configReactDOM(ReactDOM)`；18：`FatDesign.configReactDOM18(ReactDOM, ReactDOM)`（UMD 下第二参可与第一参相同） |
| 样式 | 务必引入 `style.css`，否则无样式 |
| CDN 路径 | 将示例中的 `https://cdn.example.com/fat-design/` 换成实际发布地址（如自有 CDN / unpkg / 构建产物目录） |

---

## Core Components

### TablePro — Advanced Data Table

Built around `useTablePro`, a hook that manages query form state, pagination, and row selection together. Designed for list pages with filtering.

```tsx
import { TablePro } from 'fat-design'

const { useTablePro, renderOperationCell, renderTime, renderBoolean, renderMultiFieldCell } = TablePro

function UserList() {
  const tableProProps = useTablePro({
    isEnableCrossPageRowSelection: true,
    initFormProps: {
      schema: {
        type: 'object',
        properties: {
          username: { label: 'Name', component: 'Input' },
          status: {
            label: 'Status',
            component: 'Select',
            enums: [
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
            ],
          },
        },
      },
    },
    initPaginationProps: { pageSize: 20 },
    initTableProps: {
      primaryKey: 'id',
      columns: [
        { title: 'ID',       dataIndex: 'id',         width: '120px', lock: 'left' },
        { title: 'Name',     dataIndex: 'name',        width: '180px', sortable: true },
        { title: 'Created',  dataIndex: 'createdAt',   width: '180px', cell: renderTime },
        { title: 'Active',   dataIndex: 'isActive',    width: '100px', cell: renderBoolean },
        {
          title: 'Actions', dataIndex: 'id', width: '160px', lock: 'right',
          cell: (_, __, record) => renderOperationCell([
            { title: 'Edit',   onClick: () => openEdit(record) },
            { title: 'Delete', onClick: () => handleDelete(record) },
          ]),
        },
      ],
    },
  })

  return <TablePro {...tableProProps} />
}
```

Key features:
- Cross-page row selection
- Integrated query form + pagination state management
- Built-in cell renderers: `renderTime`, `renderBoolean`, `renderOperationCell`, `renderMultiFieldCell`
- Column locking (left/right), sortable columns
- `Dialog.showTable` for nested table dialogs

### Form — Schema-Driven Forms

The `Form` component (internally Form2) supports schema-driven configuration with field-level dependency tracking for precise re-rendering.

```tsx
import { Form } from 'fat-design'

const FormItem = Form.Item

// Schema-based usage
<Form
  schema={{
    type: 'object',
    properties: {
      category: {
        label: 'Category',
        component: 'Select',
        required: true,
        enums: () => fetchCategories(),
      },
      subcategory: {
        label: 'Subcategory',
        component: 'Select',
        deps: ['category'],
        enums: (_, { values }) => fetchSubcategories(values.category),
      },
    },
  }}
  onSubmit={handleSubmit}
/>

// JSX-based usage with conditional fields
<Form defaultValues={initialValues} onSubmit={handleSubmit}>
  <FormItem label="Type" name="type" component="Select" enums={typeOptions} />
  <FormItem
    label="Detail"
    name="detail"
    component="Input"
    display={(values) => values.type === 'advanced'}
    disabled={(values) => values.readonly === true}
    isPreview={(values) => values.mode === 'preview'}
  />
  <FormItem component="FormButtonGroup" xProps={{ buttons: [
    { component: 'FormSubmit', text: 'Submit', type: 'primary' },
    { component: 'FormReset',  text: 'Reset' },
  ]}} />
</Form>
```

Key features:
- `deps` for field dependency tracking — only dependent fields re-render on change
- `display`, `disabled`, `isPreview` accept value functions for declarative conditional logic
- `enums` accepts static array, function, or async function
- `onCreated` callback exposes `formStore` and `formActions` for imperative control
- `autoValidate`, `autoValidateOnCreated` flags

### QueryForm — Collapsible Filter Bar

A schema-driven filter form that collapses fields beyond a threshold, with built-in submit/reset and loading state.

```tsx
import { QueryForm } from 'fat-design'

<QueryForm
  schema={schema}
  defaultValues={defaultFilters}
  onSubmit={fetchData}
/>
```

### Dialog — Modal with Built-in Patterns

```tsx
import { Dialog } from 'fat-design'

// Imperative API
Dialog.show({ title: 'Confirm', content: 'Are you sure?' })
Dialog.showForm({ title: 'Edit User', schema, onSubmit })
Dialog.showTable({ title: 'Logs', tableProProps })
Dialog.showBatchProcess({ title: 'Batch Import', ... })
```

### Other Components

| Component | Description |
|---|---|
| `Table` | Base table, used directly without `useTablePro` |
| `EditableTable` | Inline-editable table rows |
| `SortableList` | Drag-and-drop reordering |
| `VirtualList` | Windowed rendering for large lists |
| `Upload` | File upload with progress, batch support |
| `Image` | Image display with preview lightbox |
| `Comments` | Threaded comment system |
| `Drawer` | Side panel with `Drawer.show()` imperative API |
| `PageCard` | Standard page content container |
| `BatchInput` | Tag-style multi-value text input |
| `Select` | Dropdown with search, multi-select, remote options |
| `DatePicker` / `TimePicker` | Date and time selection |
| `Cascader` / `CascaderSelect` | Hierarchical selection |
| `TreeSelect` | Tree-structured dropdown |
| `Skeleton` | Loading placeholder |
| `Message` / `Notification` | Global feedback messages |

## Themes

Import one theme stylesheet:

```tsx
import 'fat-design/style.css'          // default（发布产物路径以包内实际文件为准）
import 'fat-design/libs/theme/theme-blue1.css'
import 'fat-design/libs/theme/theme-blue2.css'
import 'fat-design/libs/theme/theme-green.css'
import 'fat-design/libs/theme/theme-orange.css'
import 'fat-design/libs/theme/theme-pink.css'
import 'fat-design/libs/theme/theme-purple.css'
```

## Utilities

```tsx
import { configReactDOM18, configReactDOM } from 'fat-design'

// React 18
configReactDOM18(ReactDOM, ReactDOMClient)

// React 16.8 / 17
configReactDOM(ReactDOM)
```

Available hooks via `hooks` export:
- `useSize` — element resize observer
- `usePersistFn` — stable function reference
- `usePreciseStore` — granular reactive store
- `useCurrentState` — ref-synced state
- `useValueOnChange` — controlled/uncontrolled value bridge
- `useOnKeyPressSave` — Ctrl+S / Cmd+S handler

## Scripts

```bash
npm run dev                  # local demo at http://localhost:5173
npm run build                # npm package → dist/ (beta version)
npm run build:prod           # same as build, with the package.json version
npm run build:demo           # production demo SPA (CDN base)
npm run preview              # preview local dist
npm run upload               # upload dist/ to CDN
npm run release              # publish already-uploaded assets
npm run buildDeployRelease   # build:demo + upload + release
```

- `build` / `build:prod` emit the library (`index.js`, `index.umd.js`, `style.css`, `types/`, `skills/`, …) for npm.
- `build:demo` emits a full demo page; script/link URLs use  
  `//cdnjsx.oss-cn-shanghai.aliyuncs.com/assets/fat-design/<version>/`.
- `buildDeployRelease` runs `build:demo` then `scripts/deployAssets.cjs`. You will be prompted to log in if cookies are missing.

## Demo

```bash
npm run dev
```

Opens a component browser at `http://localhost:5173` with live examples for all components.

## Links

- [Live Demo](https://uifaas.com/ns/app/fat-design-doc/index)
- [React 16/17/18 兼容方案](./doc/react-16-17-18-compat.md)
- [GitHub](https://github.com/your-org/fat-design)
