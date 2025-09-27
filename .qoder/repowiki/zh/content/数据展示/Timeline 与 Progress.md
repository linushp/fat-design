# Timeline 与 Progress

<cite>
**本文档中引用的文件**  
- [timeline/index.jsx](file://src/timeline/index.jsx)
- [timeline/view/timeline.jsx](file://src/timeline/view/timeline.jsx)
- [timeline/view/timeline-item.jsx](file://src/timeline/view/timeline-item.jsx)
- [progress/index.jsx](file://src/progress/index.jsx)
- [progress/view/progress.jsx](file://src/progress/view/progress.jsx)
- [progress/view/progress-line.jsx](file://src/progress/view/progress-line.jsx)
- [progress/view/progress-circle.jsx](file://src/progress/view/progress-circle.jsx)
- [libs/theme/theme-default.css](file://libs/theme/theme-default.css)
- [libs/theme/theme-blue1.css](file://libs/theme/theme-blue1.css)
- [libs/theme/theme-red.css](file://libs/theme/theme-red.css)
</cite>

## 目录
1. [简介](#简介)
2. [Timeline 组件](#timeline-组件)
3. [Progress 组件](#progress-组件)
4. [样式定制](#样式定制)
5. [响应式设计](#响应式设计)
6. [总结](#总结)

## 简介
本指南详细介绍了 Fat Design 组件库中的 `Timeline`（时间轴）和 `Progress`（进度条）组件。`Timeline` 用于展示时间序列事件，支持垂直与交错布局，可自定义节点样式与内容渲染；`Progress` 提供线性与环形两种形态，适用于任务进度、加载状态等场景。文档将结合代码结构、视觉示例与主题定制方法，全面说明其使用方式。

## Timeline 组件

`Timeline` 组件用于可视化时间序列事件，通过节点（Item）展示关键时间点及其相关信息。组件支持多种布局模式与自定义内容，适用于日志、流程追踪、历史记录等场景。

### 基本结构与用法
`Timeline` 由容器组件 `Timeline` 和子项组件 `Timeline.Item` 构成。通过嵌套 `Timeline.Item` 实现事件序列的展示。

```jsx
<Timeline>
  <Timeline.Item>事件一</Timeline.Item>
  <Timeline.Item>事件二</Timeline.Item>
  <Timeline.Item>事件三</Timeline.Item>
</Timeline>
```

### 节点样式与状态
每个 `Timeline.Item` 支持设置状态（`state`）以反映事件完成情况，包括：
- `done`：已完成
- `process`：进行中
- `error`：出错
- `success`：成功

同时支持自定义图标（`icon`）或完全自定义节点（`dot`），增强视觉表达。

### 布局方向
通过 `mode` 属性控制布局方向：
- `left`：所有节点位于左侧（默认）
- `alternate`：节点左右交替排列，适用于长文本内容，提升可读性

该布局通过动态生成 CSS 类名实现，如 `${prefix}timeline-item-left` 和 `${prefix}timeline-item-right`。

### 自定义内容渲染
`Timeline.Item` 支持以下内容区域：
- `timeLeft`：左侧时间标签
- `title`：标题
- `content`：正文内容
- `time`：时间戳

支持在左右两侧分别渲染内容，适应不同信息密度需求。

### 折叠功能
通过 `fold` 属性可配置折叠区域，适用于长列表场景。用户可点击按钮展开/收起指定范围的节点，提升界面简洁性。

**组件源码**
- [timeline/index.jsx](file://src/timeline/index.jsx)
- [timeline/view/timeline.jsx](file://src/timeline/view/timeline.jsx)
- [timeline/view/timeline-item.jsx](file://src/timeline/view/timeline-item.jsx)

## Progress 组件

`Progress` 组件用于可视化任务或加载的完成进度，提供线性（`line`）和环形（`circle`）两种形态，适用于不同界面空间与设计风格。

### 基本形态
通过 `shape` 属性选择形态：
- `line`：线性进度条，适合水平空间充足场景
- `circle`：环形进度条，适合紧凑空间或仪表盘式展示

### 状态与样式
支持以下状态：
- `normal`：正常
- `success`：成功
- `error`：失败

通过 `progressive` 属性启用渐进式色彩变化，根据进度百分比自动调整颜色（如红→黄→绿），增强视觉反馈。

### 文本渲染
通过 `textRender` 函数自定义进度文本内容，例如显示“已完成”、“加载中”等。默认显示百分比数值。

### 线性进度条（Line）
线性进度条通过 `div` 嵌套实现，外层容器包含背景层与覆盖层。覆盖层宽度由 `percent` 控制，支持 `hasBorder` 属性添加边框。

关键样式类：
- `${prefix}progress-line-container`：容器
- `${prefix}progress-line-underlay`：背景层
- `${prefix}progress-line-overlay`：进度层

### 环形进度条（Circle）
环形进度条基于 SVG 实现，使用两个 `path` 元素分别绘制背景环与进度环。通过 `stroke-dasharray` 和 `stroke-dashoffset` 控制进度显示。

关键计算：
- 路径生成：`_getPath(radius)`
- 偏移量计算：`_computeOverlayStrokeDashOffset()`

支持动态获取 `stroke-width`，确保样式一致性。

**组件源码**
- [progress/index.jsx](file://src/progress/index.jsx)
- [progress/view/progress.jsx](file://src/progress/view/progress.jsx)
- [progress/view/progress-line.jsx](file://src/progress/view/progress-line.jsx)
- [progress/view/progress-circle.jsx](file://src/progress/view/progress-circle.jsx)

## 样式定制

### SCSS 变量
组件样式通过 SCSS 变量定义，位于 `src/progress/scss/variable.scss` 和 `src/timeline/scss/variable.scss` 中。可通过覆盖变量值实现全局样式调整。

### 主题文件
项目提供多套预设主题（位于 `libs/theme/` 目录），如：
- `theme-default.css`：默认主题
- `theme-blue1.css`：蓝色主题
- `theme-red.css`：红色主题

通过引入不同主题 CSS 文件即可切换整体视觉风格。

### ConfigProvider 配置
通过 `ConfigProvider` 组件统一配置前缀（`prefix`）、方向（`rtl`）等属性，支持运行时动态切换。

```jsx
<ConfigProvider prefix="fd-" rtl={false}>
  <App />
</ConfigProvider>
```

`ConfigProvider.config()` 高阶函数用于注入配置，确保组件继承全局设置。

## 响应式设计

### 自适应布局
- `Timeline` 在小屏幕下自动调整为单列布局，避免内容重叠
- `Progress` 的 `size` 属性支持 `small`、`medium`、`large`，适配不同设备尺寸

### RTL 支持
通过 `rtl` 属性启用从右到左布局，组件自动调整方向与对齐方式，支持多语言环境。

### 可访问性
- `Progress` 组件使用 `role="progressbar"` 及 `aria-valuenow` 等属性，提升无障碍访问能力
- `Timeline` 使用语义化 `<ul>` 和 `<li>` 结构，符合标准 HTML 规范

## 总结
`Timeline` 与 `Progress` 组件在 Fat Design 中提供了强大且灵活的可视化能力。`Timeline` 通过丰富的布局与内容定制选项，适用于复杂的时间序列展示；`Progress` 则通过线性与环形两种形态，满足多样化的进度反馈需求。结合 SCSS 变量、主题文件与 `ConfigProvider`，开发者可轻松实现品牌化定制与响应式适配。