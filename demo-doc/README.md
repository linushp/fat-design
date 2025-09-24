# Fat Design 组件库使用文档

## 概述

Fat Design 是一个功能丰富的 React UI 组件库，提供了完整的业务开发解决方案。本文档基于项目中的 demo 示例代码和 TypeScript 类型定义，详细介绍各个组件的使用方法。

## 文档结构

### 基础组件
- [Button 按钮组件](./Button组件使用文档.md) ✅
- [Icon 图标组件](./Icon组件使用文档.md) ✅
- [Loading 加载组件](./Loading组件使用文档.md) ✅

### 反馈组件
- [Message 消息提示组件](./Message组件使用文档.md) ✅
- [Dialog 对话框组件](./Dialog组件使用文档.md) ✅
- [Drawer 抽屉组件](./Drawer组件使用文档.md)
- [Balloon 气泡组件](./Balloon组件使用文档.md)

### 数据输入组件
- [Form 表单组件](./Form组件使用文档.md) ✅
- [BatchInput 批量输入组件](./BatchInput组件使用文档.md) ✅
- [Upload 上传组件](./Upload组件使用文档.md)

### 数据展示组件
- [Table 表格组件](./Table组件使用文档.md)
- [TablePro 高级表格组件](./TablePro组件使用文档.md) ✅
- [Image 图片组件](./Image组件使用文档.md)

### 导航组件
- [Menu 菜单组件](./Menu组件使用文档.md)
- [MenuButton 菜单按钮组件](./MenuButton组件使用文档.md)

### 布局组件
- [Box 布局盒子组件](./Box组件使用文档.md)
- [PageCard 页面卡片组件](./PageCard组件使用文档.md)

## 快速开始

### 安装

```bash
npm install fat-design
# 或
yarn add fat-design
```

### 基本使用

```jsx
import React from 'react';
import { Button, Message } from 'fat-design';

function App() {
  const handleClick = () => {
    Message.success('Hello Fat Design!');
  };

  return (
    <div>
      <Button type="primary" onClick={handleClick}>
        点击我
      </Button>
    </div>
  );
}

export default App;
```

### 主题配置

Fat Design 支持多种主题配置：

```jsx
// 主题样式引入
import 'fat-design/libs/theme/theme-default.css';
// 或其他主题
// import 'fat-design/libs/theme/theme-blue1.css';
// import 'fat-design/libs/theme/theme-green.css';
```

## 开发说明

### 项目结构
- `src/` - 组件源码
- `demo/` - 示例代码  
- `types/` - TypeScript 类型定义
- `libs/theme/` - 主题样式文件

### 组件特点
1. **TypeScript 支持** - 完整的类型定义
2. **主题定制** - 多套预设主题
3. **国际化** - 支持多语言
4. **响应式** - 适配不同设备
5. **无障碍** - 符合无障碍标准

### 开发规范
- 组件采用 React Hooks 开发
- 支持受控和非受控模式
- 遵循 Fusion Design 设计规范
- 提供完整的 demo 和文档

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进 Fat Design。

### 开发环境搭建

```bash
# 克隆项目
git clone <repository-url>

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建项目
npm run build
```

## 更新日志

详细的更新日志请查看项目的 CHANGELOG.md 文件。

## 许可证

MIT License