# fat-design 多版本 React 兼容改造方案（含 React 19，归档参考）

> **当前正式目标已收窄为 16.8 / 17 / 18**，请以 [`react-16-17-18-compat.md`](./react-16-17-18-compat.md) 为准。  
> 本文保留作「若未来要支持 React 19」的改造清单与风险分析，不作为当前排期。
>
> 原目标：兼容 React 16.8 / 17 / 18 / 19，仅考虑浏览器端运行，不支持服务端组件渲染。  
> 方案日期：2026-09-06（修订：最小改动路径 + 库/业务分工）

## 一、现状结论（先说结果）

**fat-design 目前的架构（宿主注入 React/ReactDOM + `pReactDOM` 适配层）方向正确。**  
向下兼容 16.8~17 库侧基本不用改；真正硬阻断集中在 React 19，另有一处隐藏在构建产物里。

| # | 问题 | 位置 | React 19 表现 | 16/17/18 | 谁改 |
|---|------|------|--------------|----------|------|
| 1 | **构建产物内联了 React 18 的 jsx-runtime**（访问 `ReactCurrentOwner` 等内部字段，19 已改名/删除） | `dist/index.js` | **渲染即崩溃** | 正常 | **只能改库构建** |
| 2 | **Legacy Context**：真正提供 `getChildContext` 的约 15 个文件；另有一批仅声明 `contextTypes = { prefix }` 的死代码 | Table 全家桶、`radio-group`、`checkbox-group`、`nav` | context 空 → **Table/Nav/Radio/Checkbox 失效** | 正常（18 有弃用警告） | **只能改库** |
| 3 | **`ReactDOM.findDOMNode` 移除**，`createReactDOMProxy19` 仍是 TODO | **40+ 文件**走 `findDOMNode` / `pReactDOM.findDOMNode`（含 Overlay、Table、Tree、Select、Tab、Slider、Transition 等）；仅 8 个组件接了 `saveFatNodeInstance` | `findDOMNode is not a function` → 弹层定位等崩溃 | 正常 | **库适配层为主；业务可传可选 shim** |
| 4 | **函数组件 `defaultProps` 移除** | 约 25+ 处 + `ConfigProvider.configFn` 把 defaults 挂到 `forwardRef` 上 | 静默行为异常 | 正常 | **只能改库** |
| 5 | **`element.ref` 弃用**（19 警告，后续会移除；ref 变为普通 prop） | `overlay/overlay.jsx`、`overlay/gateway.jsx`、`overlay/v2/overlay.jsx`、`table/base.jsx` 共 4 处 | 取值为 `undefined` → ref 转发失效 | 正常 | **只能改库** |
| 6 | `propTypes` 运行时检查移除 | 全库大量使用 | 静默忽略，无害 | 正常 | 可不改 |
| 7 | `react-lifecycles-compat` polyfill | 25+ 处 `polyfill()` | 已无 legacy 生命周期，no-op | 正常 | 可留 |

非阻断但要理清的点：

- **`tryAutoConfig`（others.ts）**：18/19 的 ESM 主入口不带 `createRoot`（在 `react-dom/client`）；19 无 UMD。自动探测只适合「宿主已把合并版挂到 `window.ReactDOM`」的场景。**业务主路径应显式调用** `configReactDOM` / `configReactDOM18` / `configReactDOM19`（fatcms-web 已是此模式）。
- **产物 peer**：`react: "*"` → `"react": ">=16.8.0"`；顶层 `dependencies` 移除 `react`，`devDependencies` 保留 React 18 作开发基准。全库无 `useSyncExternalStore` / `useId` 等 18+ 专属 API。

**16.8/17**：库代码基本就绪（无 string ref 使用、无 `createFactory`、`ReactRoot17` 已走 `render` / `unmountComponentAtNode`）。Overlay 点击外部关闭走的是原生 `addEventListener`，**不是** React 17 事件委托变更的高风险点；更应回归 portal 焦点与滚动锁定。

**已有 `react-dom.ts` 适配层**：解决的是「宿主 ReactDOM API 形态不同」，**解决不了** jsx-runtime 内联、legacy context、函数组件 defaultProps、`element.ref`。19 的 `findDOMNode` TODO 才是适配层缺口。

---

## 二、库 vs 业务分工（最小改动原则）

```
fatcms-web / 其他宿主 main.jsx
  ├─ 挂 window.React（与打包器解析的 react 同源）
  ├─ 合成 window.ReactDOM（client + dom，便于 UMD/动态代码）
  ├─ 显式 configReactDOM / 18 / 19
  └─ （可选）findDOMNodeShim 作为第三参   ← 仅当库暂未内置 fiber 兜底时

fat-design（必须改）
  ├─ 构建：classic jsx / 或 external jsx-runtime
  ├─ legacy context：Radio / Checkbox / Nav / Table
  ├─ 函数组件 defaultProps + configFn
  ├─ getElementRef（4 处）
  └─ react-dom.ts：19 的 findDOMNode（fat → fiber → 可选宿主 shim）
```

| 事项 | 业务 `main.jsx` 能否扛 | 说明 |
|------|------------------------|------|
| 16/17 vs 18 vs 19 的 ReactDOM 入口差异 | **能** | 按版本写死配置函数；**不要**运行时 `import('react-dom/client')`（16/17 构建期就挂） |
| `createRoot` 来自 `react-dom/client` | **能** | 与现有 fatcms-web 一致：第二参传 `ReactDOMClient` |
| 19 无 UMD | **能** | `window.React = React` 即可 |
| findDOMNode 移除 | **能少量适配** | 可选传 fiber shim；更稳是库内置同一套逻辑，业务只换 `configReactDOM19` |
| jsx-runtime 内联 | **不能** | 已编译进 dist，必须重新构建 |
| legacy `getChildContext` | **不能** | 协调器不再调用，无外部 polyfill |
| 函数组件 defaultProps / `element.ref` | **不能** | 发生在组件内部 |

---

## 三、改造方案（按阶段）

### 阶段 0：构建层修复 —— 不改组件代码，优先做（解决 #1）

当前 `vite.config.ts` npm 构建用默认 automatic JSX runtime，且 `external` 只有 `'react'`，导致 `react/jsx-runtime`（React 18 拷贝）打进产物。

**推荐：npm 构建切 classic runtime**（源码组件已有 `import React from 'react'`，成本为零；UMD 继续走 `window.React.createElement`）：

```ts
// vite.config.ts —— TARGET_ENV === 'npm'
plugins: [
    emitDtsPlugin(),
    react({ jsxRuntime: 'classic' }),
    esmExternalRequirePlugin({
        external: ['react'],
    }),
    fatDesignPackagePlugin(buildVersion, packageJson),
],
```

配套验证：

```bash
rg -c "SECRET_INTERNALS|jsx-runtime" dist/index.js   # 期望：无匹配（或仅无害注释）
```

产物元数据：

```json
"peerDependencies": { "react": ">=16.8.0" }
```

顶层 `package.json`：`dependencies` 移除 `react`；`devDependencies` 保留 react / react-dom 18。

> **备选 B**：automatic + 同时 external `react` 与 `react/jsx-runtime`（宿主需 ≥ 16.14）。要兼容 16.8~16.13 用 classic（A）。classic 在 React 19 dev 可能有 "outdated JSX transform" 提示，不影响功能。

---

### 阶段 1：React 19 硬阻断（必须改库）

#### 1.1 函数组件 defaultProps → ES6 默认参数

类组件 `static defaultProps` **不用动**。

示例：

```jsx
const BoxV2 = ({
    direction = 'column',
    wrap = false,
    component = 'div',
    ...others
}) => { /* ... */ };
// 删除 BoxV2.defaultProps = { ... }
```

清单（赋值式 `Xxx.defaultProps =`，函数组件）：

- `box/box-v2.jsx`
- `empty/empty.tsx`
- `pages/detail-page/detail-page.tsx`
- `pages/detail-page/detail-page-summary.tsx`
- `pages/detail-page/detail-page-section.tsx`
- `pages/detail-page/detail-page-form-item.tsx`
- `pages/detail-page/detail-page-card-form.tsx`
- `pages/page-card/index.tsx`（Divider / PageCard）
- `form2/form.tsx`、`form2/form-buttons.tsx`（Submit / Reset）、`form2/form-section.tsx`
- `balloon-confirm/component.jsx`
- `batch-input/batch-input.jsx`
- `editable-table/editable-table.jsx`、`editable-table/setting-table.jsx`
- `sortable-list/sortable-table.tsx`、`sortable-list/sortable-editable-table.tsx`（**初版清单漏了**）
- `filter/filter.tsx`
- `range/view/slider.jsx`、`range/view/track.jsx`
- `table/base/wrapper.jsx`
- `date-picker/preview.jsx`
- `query-form/query-form.tsx`
- `react-transition-group/TransitionGroup.jsx`、`SwitchTransition.jsx`（**漏了**）
- **不要改** `react-transition-group/Transition.jsx`（类组件）

**隐藏点：`ConfigProvider.configFn`**

```tsx
// config-provider/v2/index.tsx
const Component1 = React.forwardRef((props, ref) => <Component {...props} />);
Component1.defaultProps = defaultProps; // React 19 对 forwardRef 无效
```

Empty / Filter / BatchInput / EditableTable 等走 `configFn`。内层改成默认参数后多数仍可用；更稳：在 wrapper 内对 `=== undefined` 的 key 合并 defaults（**不要** `{...defaults, ...props}`，显式 `undefined` 会盖掉默认值，与 React `defaultProps` 语义不一致）。

#### 1.2 `getElementRef` 替换 4 处 `element.ref`

```ts
// src/util/react-dom.ts（或 react-utils）
// 先读 props.ref，避免 React 19 上访问 element.ref 触发弃用警告
function getElementRef(element: any): any {
    if (!element || typeof element !== 'object') {
        return null;
    }
    if (element.props && 'ref' in element.props) {
        return element.props.ref;
    }
    return element.ref;
}
```

改造点：

- `overlay/overlay.jsx`（判断 + `makeChain(..., child.ref)`）
- `overlay/gateway.jsx`
- `overlay/v2/overlay.jsx`（string ref 保护性 throw）
- `table/base.jsx`（`props.ref = child.ref`）

`typeof child.ref === 'string'` 的 throw **可保留**（保护性检查，不是在用 string ref）。用 `getElementRef(child)` 读值即可。

#### 1.3 findDOMNode：适配层一次做完（不要先铺 40 个 fat ref）

**问题**：调用面远不止文档初版写的 13 处；且只挂 `saveFatNodeInstance` **不能**自动修好 `findDOMNode(this.menuEl)` / `findDOMNode(otherInstance)`——目标实例也要继承 `ReactComponent` 并挂 ref。全面铺开改动大、易漏。

**最小做法：只改 `react-dom.ts`**

解析顺序：`HTMLElement` → `findDOMNodeByFat` → 宿主可选 shim → fiber 下钻（与 React 原 `findDOMNode` 同路径）：

```ts
function findDOMNodeCompat(e: any, hostImpl?: (e: any) => any) {
    if (!e) return null;
    if (isElementNode(e)) return e;

    const fat = findDOMNodeByFat(e, 0);
    if (fat) return fat;

    if (typeof hostImpl === 'function') {
        const host = hostImpl(e);
        if (host) return host;
    }

    // 16: _reactInternalFiber；17+：_reactInternals（内部字段，19.x 大改时需回归）
    let fiber = e._reactInternals || e._reactInternalFiber;
    while (fiber) {
        const node = fiber.stateNode;
        if (node && node.nodeType === 1) return node;
        fiber = fiber.child;
    }
    return null;
}

function createReactDOMProxy19(ReactDOM: any, ReactDOMClient: any, hostFindDOMNode?: (e: any) => any): IReactDOM {
    return {
        createRoot: (container, options?) => {
            const root1 = ReactDOMClient.createRoot(container, options);
            return new ReactRoot18(root1, container, options);
        },
        createPortal: (element, container) => ReactDOM.createPortal(element, container),
        findDOMNode: (e) => findDOMNodeCompat(e, hostFindDOMNode),
    };
}

// configReactDOM19(ReactDOM, ReactDOMClient, findDOMNodeImpl?)
// createRoot 必须来自第二参 ReactDOMClient，不要假设 ReactDOM 主入口带 createRoot
```

18 代理也可先走 `findDOMNodeCompat`，再回退原生 `ReactDOM.findDOMNode`。

**`saveFatNodeInstance`**：已接的 8 个组件保留作更稳优先路径，**按需渐进补**，不作为 19 上线前提。

**业务可选 shim**（库已内置 fiber 时可省略第三参）：

```js
function findDOMNodeShim(comp) {
    if (comp == null) return null;
    if (comp.nodeType === 1) return comp;
    let fiber = comp._reactInternals || comp._reactInternalFiber;
    while (fiber) {
        if (fiber.stateNode && fiber.stateNode.nodeType === 1) return fiber.stateNode;
        fiber = fiber.child;
    }
    return null;
}
```

#### 1.4 Legacy Context → `createContext`（唯一大块工作量）

无法从业务侧 polyfill。目标最低 16.8，`createContext` / `contextType` 全版本可用，**无需版本分支**。

**真正必须迁的提供者（有 `getChildContext`）：**

| 批次 | 范围 | 做法 |
|------|------|------|
| ① | `radio-group` + `radio/with-context`；`checkbox-group` + `checkbox/with-context` | 新建 Context；Provider 包 children；消费端 `static contextType` |
| ② | `nav/nav.tsx` + item/group/sub-nav/popup-item | 同上，context 打成单对象 |
| ③ | Table：`base` / `lock` / `new-lock` / `list` / `tree` / `expanded` / `selection` / `virtual` / `sticky` / `fixed` 及各 `contextTypes` 消费端 | **新建 `TableContext`，不要复用 `configContext`** |

**不要迁、直接删的死代码：**

`collapse` / `switch` / `progress` / `step` / `transfer` / `range` / `balloon/inner` 等仅有 `contextTypes = { prefix }`、无 `getChildContext`。ConfigProvider v2 已通过 props 灌 `prefix`，`this.context.prefix` 在现网多半本就是 `undefined`。删声明即可，不必建 Context。

`ColumnGroup` 的 `parent: this`：Column/ColumnGroup 均 `render null`，Table 用 `normalizeChildren` 抽 props，基本是死数据，可删不迁。

**Table 迁移注意（legacy 合并语义）：**

Legacy context：子级 `getChildContext` **只覆盖自己声明的 key**，其余父级 key 继续下传。`createContext` 没有此语义。每个 Table HOC 必须：

```jsx
<TableContext.Consumer>
  {(parent) => (
    <TableContext.Provider value={{ ...parent, ...this.getExtraContext() }}>
      {/* ... */}
    </TableContext.Provider>
  )}
</TableContext.Consumer>
```

且 `notRenderCellIndex` 等必须是**同一数组引用**（row/cell 里会 `splice` / `push`），不能每次 `|| []` 新建。

Radio 示例：

```jsx
// radio-group-context.jsx
import { createContext } from 'react';
const RadioGroupContext = createContext(null);
export default RadioGroupContext;

// radio-group.jsx — Provider 包原渲染；删除 childContextTypes / getChildContext

// with-context.jsx
static contextType = RadioGroupContext;
render() {
    return <Radio {...this.props} context={this.context || {}} />;
}
```

弹层 / Message：`pop-manager` 已走 `ConfigProvider.getContext()` + 新 context，不受本项影响。

---

### 阶段 2：修正自动探测（次要；显式配置才是主路径）

```ts
function tryAutoConfig() {
    if (typeof window === 'undefined') return;
    const ReactDOM = window.ReactDOM;
    if (!ReactDOM) return;

    const version = '' + ReactDOM.version;
    if (version.startsWith('16.') || version.startsWith('17.')) {
        configReactDOM(ReactDOM);
        return;
    }
    // 仅当 window.ReactDOM 已是合并版（含 createRoot）时才自动成功
    if (version.startsWith('18.') && typeof ReactDOM.createRoot === 'function') {
        configReactDOM18(ReactDOM, ReactDOM);
        return;
    }
    if (version.startsWith('19.') && typeof ReactDOM.createRoot === 'function') {
        configReactDOM19(ReactDOM, ReactDOM);
        return;
    }
    // 否则不配置：等业务显式 configReactDOM18/19(ReactDOM, ReactDOMClient)
}
```

约定：

- **主路径**：业务显式 `configReactDOM(ReactDOM)` / `configReactDOM18(ReactDOM, ReactDOMClient)` / `configReactDOM19(ReactDOM, ReactDOMClient[, shim])`。
- `window.ReactDOM` 合成合并版：方便动态脚本 / UMD，**不等于**可以省略显式 config。
- getter 未配置时：**保持 throw**，错误信息写清需调用哪套 config（改成 console.error + 降级容易把配置错误藏成静默坏行为）。

---

### 阶段 3：业务接入模板（以 fatcms-web `main.jsx` 为标准）

现有模式保留：先挂全局 → `configReactDOM*` → 再 `await import('./index-npm.jsx')`。  
**按 React 版本分模板，不要在同一工程运行时探测 `react-dom/client`。**

**React 18（现状）：**

```jsx
import * as ReactDOMClient from 'react-dom/client';
import * as ReactDOM from 'react-dom';
import { configReactDOM18 } from './libs/fat-design.js';

const ReactDOM2 = {
    ...ReactDOMClient,
    ...ReactDOM,
    createRoot: ReactDOMClient.createRoot,
};
window.React = React;
window.ReactDOM = ReactDOM2;
window['react'] = React;
window['react-dom'] = ReactDOM2;
window['react-is'] = ReactIs;

configReactDOM18(ReactDOM, ReactDOMClient); // 两参分离，不要只塞合并对象
await import('./index-npm.jsx');
```

**React 19：**

```jsx
import * as ReactDOMClient from 'react-dom/client';
import * as ReactDOM from 'react-dom';
import { configReactDOM19 } from './libs/fat-design.js';

const ReactDOM2 = {
    ...ReactDOMClient,
    ...ReactDOM,
    createRoot: ReactDOMClient.createRoot,
};
window.React = React;
window.ReactDOM = ReactDOM2;
window['react'] = React;
window['react-is'] = ReactIs;

// 库已内置 fiber findDOMNode 时第三参可省略
configReactDOM19(ReactDOM, ReactDOMClient /*, findDOMNodeShim */);
await import('./index-npm.jsx');
```

**React 16.8 / 17：**

```jsx
import * as ReactDOM from 'react-dom'; // 不要 import react-dom/client
import { configReactDOM } from './libs/fat-design.js';

window.React = React;
window.ReactDOM = ReactDOM;
window['react'] = React;
configReactDOM(ReactDOM);
// 应用自身用 ReactDOM.render（无 createRoot）
```

通用约束：

1. `window.React` 必须与打包器解析到的 `react` **同源**（先 import 再挂全局）。
2. 业务组件在挂全局 + config 之后再加载（动态 import）。
3. React 19 业务工程自身也要清：string ref、函数组件 defaultProps。

---

### 阶段 4：回归测试矩阵

| 维度 | 16.8 | 17 | 18.2/18.3 | 19 |
|------|------|-----|-----------|-----|
| Table（锁列/虚拟/树/展开） | ✔ | ✔ | ✔ | ✔（context 合并 + 可变数组重点） |
| Nav / Menu 弹层定位 | ✔ | ✔ | ✔ | ✔（findDOMNode 重点） |
| Radio / Checkbox Group | ✔ | ✔ | ✔ | ✔ |
| Overlay / Dialog / Drawer / Balloon | ✔ | ✔（portal 焦点/滚动） | ✔ | ✔（ref 转发 + findDOMNode） |
| Message / Notification / Loading（独立 createRoot） | ✔ | ✔ | ✔ | ✔ |
| Form2 / QueryForm / Filter / configFn 组件 | ✔ | ✔ | ✔ | ✔（defaultProps） |

建议：先用 **React 18.3**（带 19 弃用警告）清零警告，再挂 19；同一份 dist 用不同 React 版本做 A/B。

---

## 四、优先级与依赖

```
阶段0 构建修复（必须先做）
  ├─ 1.1 defaultProps + configFn     │
  ├─ 1.2 getElementRef               ├─ 可并行
  ├─ 1.3 react-dom.ts findDOMNode    │
  └─ 1.4 legacy context（Radio/Checkbox → Nav → Table）← 最大工作量
        ↓
阶段2 tryAutoConfig（次要）→ 阶段3 业务模板 → 阶段4 回归
```

**库侧硬改下限（按改动面）：**

1. vite classic + peerDependencies  
2. `react-dom.ts` 一处补完 19 findDOMNode（+ 可选第三参）  
3. 函数组件 defaultProps 一批 + `configFn`  
4. `getElementRef` 4 处  
5. context：Radio / Checkbox / Nav / Table（其余 prefix-only `contextTypes` 删除）

**业务侧（fatcms-web）：** 按版本切换 `configReactDOM*`；19 过渡期可传 `findDOMNodeShim`。无法替代 #1/#2/#4/#5。

---

## 五、参考资料

- React 19 升级指南：https://react.dev/blog/2024/04/25/react-19-upgrade-guide
- React 19 移除：`contextTypes` / `getChildContext`、string refs、`createFactory`、`ReactDOM.render` / `hydrate` / `unmountComponentAtNode` / `findDOMNode`、`react-dom/test-utils`、函数组件 `propTypes` / `defaultProps`、UMD
- React 19 弃用：`element.ref` 访问（警告，未来移除）
