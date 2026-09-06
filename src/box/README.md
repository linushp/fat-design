# Box 组件 V2 版本

Box 组件新增了 v2 属性，使用纯 CSS 布局实现，解决了原版本中 children 外层有包装组件时 spacing 失效的问题。

## 核心优势

- **使用纯CSS布局**：通过 CSS Gap 属性实现间距，不修改 children 属性
- **解决包装组件问题**：无论 children 外层有多少包装组件都能正常工作
- **更好的性能**：避免了 `React.cloneElement` 的使用
- **更简洁的实现**：减少了复杂的样式计算和 children 遍历逻辑

## 使用方式

只需在原 Box 组件上添加 `v2={true}` 属性：

```jsx
import { Box } from 'fat-design';

// 原版本（默认）
<Box spacing={16} direction="row">
  <WrapperComponent>
    <Button>Button 1</Button>
  </WrapperComponent>
  <WrapperComponent>
    <Button>Button 2</Button>
  </WrapperComponent>
</Box>

// V2版本（推荐）
<Box v2 spacing={16} direction="row">
  <WrapperComponent>
    <Button>Button 1</Button>
  </WrapperComponent>
  <WrapperComponent>
    <Button>Button 2</Button>
  </WrapperComponent>
</Box>
```

## API

BoxV2 支持所有原 Box 组件的属性：

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| direction | 'row' \| 'column' \| 'row-reverse' | 'column' | 布局方向 |
| spacing | number \| [number, number] | - | 元素间距，支持数组形式 [行间距, 列间距] |
| justify | string | - | 主轴对齐方式 |
| align | string | - | 交叉轴对齐方式 |
| wrap | boolean | false | 是否折行 |
| flex | number \| Array | - | flex 属性 |
| margin | number \| [number, number] | - | 外边距 |
| padding | number \| [number, number] | - | 内边距 |
| component | string | 'div' | 自定义标签名 |

## 问题解决

### 原版本问题示例
```jsx
// 这种情况下 spacing 可能失效
<Box spacing={16} direction="row">
  <WrapperComponent>  {/* 包装组件 */}
    <Button>Button 1</Button>
  </WrapperComponent>
  <WrapperComponent>
    <Button>Button 2</Button>
  </WrapperComponent>
</Box>
```

### V2版本解决方案
```jsx
// V2版本完美解决
<Box v2 spacing={16} direction="row">
  <WrapperComponent>  {/* 无论多少层包装都没问题 */}
    <Button>Button 1</Button>
  </WrapperComponent>
  <WrapperComponent>
    <Button>Button 2</Button>
  </WrapperComponent>
</Box>
```

## 浏览器兼容性

- ✅ Chrome 84+ (2020年7月)
- ✅ Firefox 63+ (2018年10月)
- ✅ Safari 14.1+ (2021年4月)
- ❌ IE 不支持 gap 属性（建议 IE 环境使用原 Box 组件）

## 迁移指南

### 新项目
建议直接使用 `<Box v2>` 获得更好的布局体验。

### 现有项目
可以逐步迁移，在需要解决包装组件问题的地方添加 `v2={true}` 属性。

对于需要兼容 IE 的项目，可以继续使用原版本。

## 技术实现

v2 版本使用以下 CSS 属性实现布局：

- `display: flex` - 容器布局
- `gap` / `row-gap` / `column-gap` - 处理 spacing
- `flex-direction` - 处理 direction
- `justify-content` - 处理 justify
- `align-items` - 处理 align
- `flex-wrap` - 处理 wrap

这种实现方式避免了修改 children 属性，从根本上解决了包装组件的问题。