# Fat Design

A React component library built for data-intensive admin dashboards. Focused on table-heavy and form-heavy scenarios where other libraries fall short.

[![React](https://img.shields.io/badge/React-16%2B-blue)](https://reactjs.org) [![TypeScript](https://img.shields.io/badge/TypeScript-4.9%2B-blue)](https://www.typescriptlang.org) [![Version](https://img.shields.io/badge/version-0.0.2-green)](./package.json)

## Installation

```bash
npm install fat-design
# or
yarn add fat-design
# or
pnpm add fat-design
```

## Quick Start

```tsx
import { Button, Message } from 'fat-design'
import 'fat-design/dist/style.css'

function App() {
  return (
    <Button type="primary" onClick={() => Message.success('Hello!')}>
      Click me
    </Button>
  )
}
```

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
import 'fat-design/dist/style.css'          // default
import 'fat-design/dist/theme-blue1.css'
import 'fat-design/dist/theme-blue2.css'
import 'fat-design/dist/theme-green.css'
import 'fat-design/dist/theme-green2.css'
import 'fat-design/dist/theme-orange.css'
import 'fat-design/dist/theme-red.css'
import 'fat-design/dist/theme-pink.css'
import 'fat-design/dist/theme-purple.css'
```

## Utilities

```tsx
import { utils } from 'fat-design'

const { pReactDOM, log, StorageInstance } = utils

// React 16/17/18 compatibility
pReactDOM.configReactDOM18(ReactDOM, ReactDOMClient)

// Unified storage (localStorage + localForage)
const store = new StorageInstance('my-app')
await store.setItem('key', value)
const value = await store.getItem('key')
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
- [GitHub](https://github.com/your-org/fat-design)