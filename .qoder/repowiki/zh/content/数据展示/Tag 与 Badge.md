# Tag 标签和 Badge 徽标组件技术文档

<cite>
**本文档中引用的文件**
- [src/tag/index.jsx](file://src/tag/index.jsx)
- [src/tag/tag.jsx](file://src/tag/tag.jsx)
- [src/tag/tag-group.jsx](file://src/tag/tag-group.jsx)
- [src/tag/selectable.jsx](file://src/tag/selectable.jsx)
- [src/tag/closeable.jsx](file://src/tag/closeable.jsx)
- [src/tag/scss/variable.scss](file://src/tag/scss/variable.scss)
- [src/tag/scss/mixin.scss](file://src/tag/scss/mixin.scss)
- [src/badge/index.jsx](file://src/badge/index.jsx)
- [src/badge/sup.jsx](file://src/badge/sup.jsx)
- [src/badge/main.scss](file://src/badge/main.scss)
- [src/badge/scss/variable.scss](file://src/badge/scss/variable.scss)
- [src/badge/scss/mixin.scss](file://src/badge/scss/mixin.scss)
- [demo/tmp-utils/tag-colors.js](file://demo/tmp-utils/tag-colors.js)
- [src/core/style/_color.scss](file://src/core/style/_color.scss)
</cite>

## 目录
1. [简介](#简介)
2. [项目结构](#项目结构)
3. [Tag 组件详解](#tag组件详解)
4. [Badge 组件详解](#badge组件详解)
5. [视觉样式与尺寸变体](#视觉样式与尺寸变体)
6. [颜色配置系统](#颜色配置系统)
7. [无障碍访问支持](#无障碍访问支持)
8. [实际应用场景](#实际应用场景)
9. [最佳实践建议](#最佳实践建议)
10. [总结](#总结)

## 简介

Fat Design 组件库提供了两个重要的数据展示组件：Tag 标签和 Badge 徽标。这两个组件都属于数据展示类别，但在功能和使用场景上各有特色。

**Tag 标签**：
- 支持可关闭、可选择状态
- 提供标签组（TagGroup）布局管理功能
- 支持多种尺寸和颜色配置
- 具备动画效果支持

**Badge 徽标**：
- 用于显示消息计数、状态提示
- 支持小红点和自定义内容
- 可以嵌套在其他组件内部
- 提供溢出计数处理机制

## 项目结构

```mermaid
graph TB
subgraph "Tag 组件结构"
TagIndex[index.jsx<br/>主入口文件]
TagMain[tag.jsx<br/>核心标签组件]
TagGroup[tag-group.jsx<br/>标签组容器]
TagSelectable[selectable.jsx<br/>可选择标签]
TagCloseable[closeable.jsx<br/>可关闭标签]
end
subgraph "Badge 组件结构"
BadgeIndex[index.jsx<br/>主入口文件]
BadgeSup[sup.jsx<br/>徽标内容渲染]
BadgeMain[main.scss<br/>样式主文件]
end
subgraph "样式系统"
TagSCSS[scss/<br/>Tag SCSS 文件]
BadgeSCSS[scss/<br/>Badge SCSS 文件]
CoreSCSS[core/style/<br/>核心样式]
end
TagIndex --> TagMain
TagIndex --> TagGroup
TagIndex --> TagSelectable
TagIndex --> TagCloseable
BadgeIndex --> BadgeSup
TagMain --> TagSCSS
BadgeSup --> BadgeSCSS
TagSCSS --> CoreSCSS
BadgeSCSS --> CoreSCSS
```

**图表来源**
- [src/tag/index.jsx](file://src/tag/index.jsx#L1-L37)
- [src/badge/index.jsx](file://src/badge/index.jsx#L1-L103)

## Tag 组件详解

### 核心架构设计

Tag 组件采用了模块化的设计理念，通过不同的子组件实现特定功能：

```mermaid
classDiagram
class Tag {
+string prefix
+string type
+string size
+string color
+boolean animation
+boolean closable
+string closeArea
+function onClose
+function onClick
+boolean disabled
+boolean rtl
+render() ReactElement
+handleBodyClick() void
+handleTailClick() void
+handleClose() void
+renderTailNode() ReactElement
+isPresetColor() boolean
+getTagStyle() object
}
class TagGroup {
+string prefix
+any className
+node children
+boolean rtl
+render() ReactElement
}
class Selectable {
+boolean selected
+function onChange
+render() ReactElement
}
class Closeable {
+function onClose
+function afterClose
+boolean animation
+render() ReactElement
}
Tag --> TagGroup : "被包含"
Tag --> Selectable : "扩展"
Tag --> Closeable : "扩展"
```

**图表来源**
- [src/tag/tag.jsx](file://src/tag/tag.jsx#L15-L100)
- [src/tag/tag-group.jsx](file://src/tag/tag-group.jsx#L1-L31)
- [src/tag/selectable.jsx](file://src/tag/selectable.jsx)
- [src/tag/closeable.jsx](file://src/tag/closeable.jsx)

### Tag 组件属性详解

Tag 组件提供了丰富的配置选项：

**基础属性**：
- `type`: 标签类型，支持 'normal' 和 'primary'
- `size`: 标签尺寸，支持 'small', 'medium', 'large'
- `color`: 自定义颜色，支持预设颜色（blue, green, orange, red, turquoise, yellow）和十六进制颜色值
- `animation`: 是否启用动画效果

**交互属性**：
- `closable`: 是否可关闭
- `closeArea`: 关闭区域设置，支持 'tag' 和 'tail'
- `onClose`: 关闭回调函数
- `onClick`: 点击回调函数
- `disabled`: 是否禁用状态

**节源**
- [src/tag/tag.jsx](file://src/tag/tag.jsx#L20-L60)

### 可关闭标签实现

可关闭标签通过 `closable` 属性实现，支持两种关闭区域设置：

```mermaid
sequenceDiagram
participant User as 用户
participant Tag as Tag组件
participant Handler as 事件处理器
participant Callback as 回调函数
User->>Tag : 点击关闭按钮
Tag->>Handler : handleTailClick()
Handler->>Tag : handleClose('tail')
Tag->>Callback : onClose('tail', tagNode)
Callback-->>Tag : 返回结果
Tag->>Tag : 更新可见状态
Tag->>Tag : afterClose(tagNode)
Note over User,Callback : 关闭流程完成
```

**图表来源**
- [src/tag/tag.jsx](file://src/tag/tag.jsx#L100-L150)

### 可选择标签功能

可选择标签通过 `Selectable` 子组件实现，支持选中状态管理和变更事件：

```mermaid
stateDiagram-v2
[*] --> 未选中
未选中 --> 已选中 : 点击标签
已选中 --> 未选中 : 再次点击
已选中 --> 已选中禁用 : 设置disabled=true
未选中 --> 未选中禁用 : 设置disabled=true
未选中禁用 --> 未选中 : 设置disabled=false
已选中禁用 --> 已选中 : 设置disabled=false
note right of 已选中
显示选中标记
应用选中样式
end note
note right of 未选中禁用
禁用状态不可点击
灰度显示
end note
```

**节源**
- [src/tag/selectable.jsx](file://src/tag/selectable.jsx)

### 标签组布局管理

TagGroup 组件提供了标签的容器功能，支持水平和垂直排列：

```mermaid
flowchart TD
Start([开始渲染]) --> CheckRTL{"RTL模式?"}
CheckRTL --> |是| SetRTL["设置dir='rtl'"]
CheckRTL --> |否| SetLTR["设置dir='ltr'"]
SetRTL --> ApplyClass["应用样式类名"]
SetLTR --> ApplyClass
ApplyClass --> RenderChildren["渲染子组件"]
RenderChildren --> End([渲染完成])
```

**图表来源**
- [src/tag/tag-group.jsx](file://src/tag/tag-group.jsx#L20-L31)

**节源**
- [src/tag/tag-group.jsx](file://src/tag/tag-group.jsx#L1-L31)

## Badge 组件详解

### Badge 核心架构

Badge 组件采用嵌套结构设计，通过 Sup 子组件处理数字滚动动画：

```mermaid
classDiagram
class Badge {
+string prefix
+node children
+number|string count
+boolean showZero
+node|string content
+number|string overflowCount
+boolean dot
+boolean rtl
+object style
+string className
+render() ReactElement
}
class Sup {
+string prefix
+number count
+boolean showZero
+number overflowCount
+node content
+boolean dot
+object style
+render() ReactElement
+renderDigit() ReactElement
+renderNumber() ReactElement
}
Badge --> Sup : "包含"
Sup --> Animate : "使用"
```

**图表来源**
- [src/badge/index.jsx](file://src/badge/index.jsx#L15-L80)
- [src/badge/sup.jsx](file://src/badge/sup.jsx#L15-L50)

### 数字滚动动画实现

Badge 的数字滚动动画通过 Sup 组件的 `renderNumber` 方法实现：

```mermaid
flowchart TD
Start([数字变化]) --> GetDigits["获取数字数组<br/>如: 123 -> [3,2,1]"]
GetDigits --> CreateScroll["创建滚动元素<br/>每个数字位独立"]
CreateScroll --> Animate["应用缩放动画<br/>zoomIn/zoomOut"]
Animate --> UpdatePosition["更新位置<br/>translateX(-50%)"]
UpdatePosition --> End([动画完成])
subgraph "滚动机制"
Digit1[数字1<br/>0-9循环]
Digit2[数字2<br/>0-9循环]
Digit3[数字3<br/>0-9循环]
end
CreateScroll --> Digit1
CreateScroll --> Digit2
CreateScroll --> Digit3
```

**图表来源**
- [src/badge/sup.jsx](file://src/badge/sup.jsx#L50-L100)

### 溢出计数处理

Badge 提供了智能的溢出计数处理机制：

```mermaid
flowchart TD
Input[输入计数值] --> CheckZero{"count == 0?"}
CheckZero --> |是且showZero=false| Hide[隐藏徽标]
CheckZero --> |是且showZero=true| ShowZero[显示0]
CheckZero --> |否| CheckOverflow{"count > overflowCount?"}
CheckOverflow --> |是| ShowOverflow["显示${overflowCount}+"]
CheckOverflow --> |否| ShowActual["显示实际值"]
Hide --> Output[输出结果]
ShowZero --> Output
ShowOverflow --> Output
ShowActual --> Output
```

**图表来源**
- [src/badge/sup.jsx](file://src/badge/sup.jsx#L160-L180)

**节源**
- [src/badge/sup.jsx](file://src/badge/sup.jsx#L1-L204)

## 视觉样式与尺寸变体

### Tag 尺寸系统

Tag 组件提供了三种标准尺寸，每种尺寸都有对应的文本大小、高度和间距配置：

```mermaid
graph LR
subgraph "Small 尺寸"
SHeight["$tag-size-s-height: $s-5"]
SText["$tag-size-s-text-size: $font-size-caption"]
SPadding["$tag-size-s-padding-lr: $s-2"]
SMargin["$tag-size-s-margin: $s-1"]
end
subgraph "Medium 尺寸"
MHeight["$tag-size-m-height: $s-7"]
MText["$tag-size-m-text-size: $font-size-body-2"]
MPadding["$tag-size-m-padding-lr: $s-3"]
MMargin["$tag-size-m-margin: $s-2"]
end
subgraph "Large 尺寸"
LHeight["$tag-size-l-height: $s-10"]
LText["$tag-size-l-text-size: $font-size-subhead"]
LPadding["$tag-size-l-padding-lr: $s-4"]
LMargin["$tag-size-l-margin: $s-4"]
end
```

**图表来源**
- [src/tag/scss/variable.scss](file://src/tag/scss/variable.scss#L20-L60)

### Badge 尺寸配置

Badge 组件的尺寸配置相对简单，主要区分点状徽标和数字徽标：

```mermaid
graph LR
subgraph "点状徽标"
DotWidth["$badge-size-dot-width: $s-2"]
DotMinWidth["$badge-size-dot-min-width: $s-2"]
DotHeight["$badge-size-dot-height: $s-2"]
end
subgraph "数字徽标"
CountHeight["$badge-size-count-height: $s-4"]
CountMinWidth["$badge-size-count-min-width: $s-4"]
CountFont["$badge-size-count-font: $font-size-caption"]
CountPadding["$badge-size-count-padding-lr: $s-1"]
end
subgraph "自定义内容"
CustomPadding["$badge-size-custom-padding-lr: $s-1"]
CustomRadius["$badge-size-custom-border-radius: $corner-1"]
end
```

**图表来源**
- [src/badge/scss/variable.scss](file://src/badge/scss/variable.scss#L15-L45)

**节源**
- [src/tag/scss/variable.scss](file://src/tag/scss/variable.scss#L1-L70)
- [src/badge/scss/variable.scss](file://src/badge/scss/variable.scss#L1-L76)

## 颜色配置系统

### Tag 预设颜色

Tag 组件支持六种预设颜色，每种颜色都有对应的颜色变量：

```mermaid
graph TB
subgraph "预设颜色配置"
Blue["蓝色系<br/>$tag-color-preset-blue: #4494F9"]
Green["绿色系<br/>$tag-color-preset-green: #46BC15"]
Orange["橙色系<br/>$tag-color-preset-orange: #FF9300"]
Red["红色系<br/>$tag-color-preset-red: #FF3000"]
Turquoise["青色系<br/>$tag-color-preset-turquoise: #01C1B2"]
Yellow["黄色系<br/>$tag-color-preset-yellow: #FCCC12"]
end
subgraph "颜色应用"
Primary["主要类型<br/>type='primary'"]
Normal["普通类型<br/>type='normal'"]
Fill["填充类型<br/>type='fill'"]
end
Blue --> Primary
Green --> Primary
Orange --> Primary
Red --> Primary
Turquoise --> Primary
Yellow --> Primary
Blue --> Normal
Green --> Normal
Orange --> Normal
Red --> Normal
Turquoise --> Normal
Yellow --> Normal
```

**图表来源**
- [src/tag/scss/variable.scss](file://src/tag/scss/variable.scss#L550-L569)

### Badge 颜色配置

Badge 组件的颜色配置相对简洁，主要关注背景色和边框色：

```mermaid
graph LR
subgraph "Badge 颜色变量"
BGColor["$badge-color-bg: $color-error-3"]
TextColor["$badge-color: $color-white"]
BorderColor["$badge-normal-count-border-color: $color-white"]
DotBG["$badge-dot-color-bg: $color-error-3"]
DotColor["$badge-dot-color: $color-white"]
end
subgraph "功能色映射"
Error3["$color-error-3: #f04631"]
White["$color-white: #fff"]
Line13["$color-line1-3: #d2d7de"]
end
BGColor --> Error3
TextColor --> White
BorderColor --> Line13
DotBG --> Error3
DotColor --> White
```

**图表来源**
- [src/badge/scss/variable.scss](file://src/badge/scss/variable.scss#L45-L75)
- [src/core/style/_color.scss](file://src/core/style/_color.scss#L60-L80)

### 自定义颜色支持

Tag 组件支持十六进制颜色值和 RGBA 颜色值，通过正则表达式检测预设颜色：

```javascript
// 预设颜色检测正则
const PRESET_COLOR_REG = /blue|green|orange|red|turquoise|yellow/;

// 自定义颜色样式计算
const customColorStyle = {
    backgroundColor: color,
    borderColor: color,
    color: '#fff',
};
```

**节源**
- [src/tag/tag.jsx](file://src/tag/tag.jsx#L180-L200)
- [src/tag/scss/variable.scss](file://src/tag/scss/variable.scss#L550-L569)

## 无障碍访问支持

### Tag 组件无障碍特性

Tag 组件充分考虑了无障碍访问需求：

```mermaid
sequenceDiagram
participant User as 用户
participant ScreenReader as 屏幕阅读器
participant Tag as Tag组件
participant Aria as ARIA属性
User->>ScreenReader : 导航到Tag
ScreenReader->>Aria : 获取role="button"
Aria-->>ScreenReader : role="button"
ScreenReader->>Aria : 获取tabIndex
Aria-->>ScreenReader : tabIndex="0" (非禁用)
ScreenReader->>Aria : 获取aria-disabled
Aria-->>ScreenReader : aria-disabled="false"
ScreenReader->>Aria : 获取aria-label
Aria-->>ScreenReader : aria-label="删除"
User->>Tag : 按下空格键
Tag->>Tag : onKeyDown事件
Tag->>Tag : 处理SPACE键
Tag->>Tag : 执行关闭或点击逻辑
Note over User,ScreenReader : 完整的无障碍交互流程
```

**图表来源**
- [src/tag/tag.jsx](file://src/tag/tag.jsx#L110-L130)

### Badge 组件无障碍特性

Badge 组件主要通过标题属性提供无障碍支持：

```javascript
// 数字徽标自动添加标题
if (count || (count === 0 && showZero)) {
    others.title = others.title || `${count}`;
}
```

**节源**
- [src/tag/tag.jsx](file://src/tag/tag.jsx#L110-L130)
- [src/badge/index.jsx](file://src/badge/index.jsx#L60-L70)

## 实际应用场景

### 在通知系统中的应用

Tag 组件常用于通知系统的标签分类：

```mermaid
graph TB
subgraph "通知系统架构"
NotificationSystem[通知系统]
FilterTags[过滤标签组]
StatusTags[状态标签]
TypeTags[类型标签]
end
subgraph "TagGroup 容器"
FilterContainer[Filter Tags Container]
StatusContainer[Status Tags Container]
TypeContainer[Type Tags Container]
end
NotificationSystem --> FilterTags
NotificationSystem --> StatusTags
NotificationSystem --> TypeTags
FilterTags --> FilterContainer
StatusTags --> StatusContainer
TypeTags --> TypeContainer
FilterContainer --> TagGroup1[TagGroup 1]
StatusContainer --> TagGroup2[TagGroup 2]
TypeContainer --> TagGroup3[TagGroup 3]
```

**图表来源**
- [demo/demo-filter.tsx](file://demo/demo-filter.tsx#L1-L30)

### 在用户界面状态标识中的应用

Badge 组件广泛应用于各种状态指示场景：

```mermaid
flowchart TD
subgraph "状态标识场景"
UserAvatar[用户头像]
ProductCard[商品卡片]
OrderList[订单列表]
MessageBubble[消息气泡]
end
subgraph "Badge 应用"
AvatarBadge[头像徽标<br/>未读消息数]
ProductBadge[商品徽标<br/>促销标签]
OrderBadge[订单徽标<br/>待处理数量]
MessageBadge[消息徽标<br/>新消息提醒]
end
UserAvatar --> AvatarBadge
ProductCard --> ProductBadge
OrderList --> OrderBadge
MessageBubble --> MessageBadge
AvatarBadge --> Badge1[Badge 1]
ProductBadge --> Badge2[Badge 2]
OrderBadge --> Badge3[Badge 3]
MessageBadge --> Badge4[Badge 4]
```

**节源**
- [demo/demo-filter.tsx](file://demo/demo-filter.tsx#L1-L30)

### 组合使用模式

Tag 和 Badge 经常配合使用，形成完整的状态管理系统：

```mermaid
graph LR
subgraph "组合使用模式"
Button[按钮组件]
Menu[菜单项]
Card[卡片组件]
List[列表项]
end
subgraph "Tag + Badge 组合"
ButtonTag[Button + Badge]
MenuTag[Menu + Tag]
CardTag[Card + Tag + Badge]
ListTag[List + Tag + Badge]
end
Button --> ButtonTag
Menu --> MenuTag
Card --> CardTag
List --> ListTag
ButtonTag --> Combined1[组合1]
MenuTag --> Combined2[组合2]
CardTag --> Combined3[组合3]
ListTag --> Combined4[组合4]
```

## 最佳实践建议

### Tag 组件使用建议

1. **颜色选择原则**：
   - 使用预设颜色保持一致性
   - 自定义颜色时注意对比度
   - 主要类型使用品牌色，普通类型使用中性色

2. **交互设计建议**：
   - 可关闭标签应提供明确的关闭提示
   - 可选择标签应有清晰的状态反馈
   - 禁用状态要有适当的视觉提示

3. **性能优化**：
   - 合理使用动画效果
   - 避免大量同时渲染的标签
   - 使用虚拟化处理长列表

### Badge 组件使用建议

1. **数字范围控制**：
   - 设置合理的 overflowCount 值
   - 对于大数值使用千分位格式
   - 考虑国际化数字格式

2. **视觉层次**：
   - 使用不同颜色突出重要信息
   - 控制徽标的大小和位置
   - 避免过多徽标堆叠

3. **用户体验**：
   - 提供清晰的数字含义
   - 考虑 RTL 语言支持
   - 确保无障碍访问支持

### Accessibility 无障碍访问最佳实践

1. **键盘导航**：
   - 确保所有交互元素可通过键盘访问
   - 提供清晰的焦点指示
   - 支持 Tab 键顺序导航

2. **屏幕阅读器支持**：
   - 正确设置 ARIA 属性
   - 提供有意义的标签文本
   - 包含必要的状态信息

3. **视觉辅助**：
   - 保证足够的颜色对比度
   - 提供替代的视觉提示
   - 支持高对比度模式

## 总结

Fat Design 的 Tag 和 Badge 组件提供了完整而灵活的数据展示解决方案。Tag 组件通过模块化设计支持多种交互状态，Badge 组件则通过精巧的动画效果提升用户体验。

**关键特性总结**：

- **Tag 组件**：支持可关闭、可选择状态，提供标签组布局管理，具备完整的无障碍访问支持
- **Badge 组件**：支持数字滚动动画，提供溢出计数处理，具有良好的性能表现
- **样式系统**：基于 SCSS 变量系统，支持主题定制和 RTL 语言支持
- **无障碍支持**：充分考虑屏幕阅读器和键盘导航需求

这两个组件在实际项目中有着广泛的应用场景，从简单的状态标识到复杂的通知系统，都能找到它们的身影。通过合理使用这些组件，可以显著提升用户界面的可用性和美观度。