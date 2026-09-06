# fat-design React 16 / 17 / 18 兼容方案

> 目标：正式兼容 **React 16.8 / 17 / 18**（浏览器端）。  
> **不承诺 React 19**；19 相关改造见 `react-multi-version-compat.md`（归档参考，不作为当前排期）。  
> 方案日期：2026-09-06

## 一、结论先说

**只保 16/17/18 时，库组件源码几乎不用为「API 被删」而改。**  
React 19 才移除的 legacy context、`findDOMNode`、函数组件 `defaultProps`、`element.ref`，在 16～18 上均仍可用（18 上多为弃用警告）。

当前真正还要做的，集中在三块：

| 优先级 | 事项 | 不改会怎样 |
|--------|------|------------|
| P0 | **npm 构建不要内联 React 18 的 `jsx-runtime`** | 宿主用 React 16/17 时，元素由产物内嵌的 React 18 runtime 创建，与宿主 React **双实例/内部字段不一致** → hooks / context 异常或直接崩 |
| P0 | **业务显式注入 ReactDOM**（`configReactDOM` / `configReactDOM18`） | Message / Notification / Dialog 等独立根节点无法 `createRoot`/`render` |
| P1 | **peer / 依赖声明收紧到 16.8～18** | 安装与文档承诺不一致；误装 19 时失败形态不清晰 |

其余（Table context 迁移、fiber `findDOMNode`、defaultProps 改造等）**当前排期可不做**。

---

## 二、16 / 17 / 18 分别差在哪

| 能力 | 16.8 | 17 | 18 |
|------|------|-----|-----|
| Hooks | ✔ | ✔ | ✔ |
| `createContext` / `contextType` | ✔ | ✔ | ✔ |
| Legacy `getChildContext` | ✔ | ✔ | ✔（弃用警告） |
| `findDOMNode` | ✔ | ✔ | ✔（弃用警告） |
| 函数组件 `defaultProps` | ✔ | ✔ | ✔ |
| `element.ref` | ✔ | ✔ | ✔（18.3 起可能警告） |
| `ReactDOM.render` / `unmountComponentAtNode` | ✔ | ✔ | 仍可用，推荐迁 `createRoot` |
| `react-dom/client` + `createRoot` | ✘ | ✘ | ✔ |
| `react/jsx-runtime`（automatic JSX） | **≥16.14** | ✔ | ✔ |

库侧已有 `pReactDOM`：

- 16/17 → `configReactDOM(ReactDOM)` → `ReactRoot17`（内部 `render`）
- 18 → `configReactDOM18(ReactDOM, ReactDOMClient)` → `createRoot`

`createReactDOMProxy19` / `configReactDOM19`：**文档声明不支持**；可保留空实现或抛明确错误，避免误用。

---

## 三、必须改什么（库）

### 3.1 构建：classic JSX（P0）

现状：`vite.config.ts` npm 构建 `react()` 默认 automatic runtime，且只 external `'react'`，会把 **开发依赖里的 React 18 `jsx-runtime` 打进 `dist`**。

宿主若是 React 16/17，等于「库内嵌一套 React 18 的建元素逻辑 + 宿主另一套 React」——这是多版本兼容里最常见的硬伤。

**改法（推荐）：**

```ts
// vite.config.ts —— TARGET_ENV === 'npm'
react({ jsxRuntime: 'classic' })
// external 仍为 ['react']
```

源码组件普遍已有 `import React from 'react'`，classic 无额外改造。UMD 继续走 `window.React.createElement`。

**备选：** automatic + 同时 external `react` 与 `react/jsx-runtime`。要求宿主 **≥ 16.14**。若官方底线是 16.8，用 classic。

构建后自检：

```bash
rg -c "SECRET_INTERNALS|jsx-runtime" dist/index.js
# 期望：无内联 jsx-runtime / React 内部字段特征
```

### 3.2 peerDependencies 与 package 元数据（P1）

```json
// 产物 package.json（fatDesignPackagePlugin / npmPackageDependencies）
"peerDependencies": {
  "react": ">=16.8.0 <19.0.0",
  "react-dom": ">=16.8.0 <19.0.0"
}
```

建议同步：

- 顶层 `package.json`：`react` 从 `dependencies` 挪到 `devDependencies`（开发/demo 继续钉 18）。
- `npmPackageDependencies` 勿再写 `"react": "*"`。
- README / 接入文档写明：**正式支持 16.8 / 17 / 18；不支持 19。**

是否把 `react-dom` 也列为 peer：建议列。库运行时通过宿主注入使用 ReactDOM，不打包 `react-dom`。

### 3.3 适配层与自动探测（P1，小改）

保持现有 API：

- `configReactDOM(ReactDOM)` — 16 / 17
- `configReactDOM18(ReactDOM, ReactDOMClient)` — 18

建议：

1. `configReactDOM19`：实现改为直接 `throw` 明确文案（「当前版本不支持 React 19」），或从公开导出中移除/标 `@deprecated`。
2. `tryAutoConfig`：仅处理 16/17/18；检测到 `19.` 时打警告并跳过。  
   **业务主路径仍是显式 config**（与 fatcms-web 一致）。不要依赖「window 上合并版 ReactDOM 自动配好」。
3. 未配置时 getter **继续 throw**，错误信息写清应调用 `configReactDOM` 或 `configReactDOM18`。

`react-dom.ts` 里 19 的 `findDOMNode` TODO：**不必为 16～18 补 fiber 方案**；18 代理继续回退原生 `ReactDOM.findDOMNode` 即可。

### 3.4 组件源码（当前：可不改）

下列项在 16～18 **仍可用**，本方案不纳入必做：

- Legacy `childContextTypes` / `getChildContext`（Table / Nav / Radio / Checkbox）
- 函数组件 `defaultProps`
- `element.ref` 读取
- 全库 `findDOMNode` 调用点、`saveFatNodeInstance` 推广

可选清理（非阻断）：

- 删除仅声明 `contextTypes = { prefix }` 且从不读 `this.context` 的死代码（collapse/switch 等）——减警告噪音，非必须。
- Slider `this.refs.track` 已知死代码——与版本无关，顺手可修。

---

## 四、业务侧要做什么（fatcms-web 等）

### 4.1 React 18（现状，基本不动）

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

configReactDOM18(ReactDOM, ReactDOMClient);
await import('./index-npm.jsx');
```

要点：`config` 传**两个模块**；`window.ReactDOM` 合成合并版给动态脚本/UMD 用。

### 4.2 React 16.8 / 17

```jsx
import * as ReactDOM from 'react-dom'; // 不要 import react-dom/client
import { configReactDOM } from './libs/fat-design.js';

window.React = React;
window.ReactDOM = ReactDOM;
window['react'] = React;

configReactDOM(ReactDOM);
await import('./index-npm.jsx');
// 应用自身用 ReactDOM.render
```

**不要**在同一工程里运行时探测 `react-dom/client`（16/17 构建期会解析失败）。按宿主 React 版本写死入口模板。

### 4.3 通用约束

1. `window.React` 与打包器解析到的 `react` **同源**（先 import 再挂全局）。
2. 先 config，再动态加载依赖 fat-design 的业务入口。
3. 锁定 `react` / `react-dom` / `react-is` 同主版本，避免元素类型判断异常。

---

## 五、回归范围（相对 19 方案大幅缩小）

| 维度 | 16.8 | 17 | 18 |
|------|------|-----|-----|
| 构建产物在对应 React 下可挂载（无双 React） | ✔ 重点 | ✔ 重点 | ✔ |
| Message / Notification / Loading（`createRoot` 适配） | ✔ | ✔ | ✔ |
| Table / Nav / Overlay 主路径 | ✔ | ✔ | ✔（可关注弃用警告，不强制清零） |
| Form2 / QueryForm | ✔ | ✔ | ✔ |

建议：同一份 `dist`，分别用 React 16.8、17、18 各起一个最小 demo 页面冒烟即可；不必上 fiber / context 专项。

---

## 六、工作量与排期建议

```
1. vite classic + 构建自检          （库，0.5d）
2. peer / dependencies 元数据      （库，0.5d）
3. configReactDOM19 拒绝 + 文档    （库，0.5d）
4. 接入文档补 16/17 模板           （文档 + fatcms-web 如需要）
5. 三版本冒烟                      （0.5～1d）
```

**合计约 2～3 人日量级**，远小于原「含 React 19」方案（Table context + defaultProps + findDOMNode 等）。

---

## 七、与 React 19 方案的关系

| 项 | 本方案（16～18） | 原 19 方案 |
|----|-----------------|------------|
| classic / external jsx | **要做** | 要做 |
| peer `<19` | **要做** | peer 含 19 |
| legacy context 迁移 | 不做 | 必须 |
| 函数组件 defaultProps | 不做 | 必须 |
| `getElementRef` | 不做 | 必须 |
| fiber `findDOMNode` | 不做 | 必须（或换 ref） |
| `configReactDOM19` | 明确不支持 | 要完善 |

若未来要上 19：再启用 `react-multi-version-compat.md` 中的阶段 1，并单独开 major 或扩 peer；**不要**在未迁 context 前把 peer 写成支持 19。

---

## 八、验收清单

- [ ] `TARGET_ENV=npm` 构建使用 classic JSX（或已 external `react/jsx-runtime`）
- [ ] `dist/index.js` 无内联 React 18 jsx-runtime / `SECRET_INTERNALS` 特征
- [ ] 产物 `peerDependencies.react` 为 `>=16.8.0 <19.0.0`（`react-dom` 同理）
- [ ] 文档写明不支持 React 19；误调 `configReactDOM19` 有明确报错
- [ ] React 18 宿主：`configReactDOM18` 冒烟通过（含 Message/Dialog）
- [ ] React 16.8 或 17 宿主至少一条：`configReactDOM` + 页面可渲染、hooks 无 invalid hook call
