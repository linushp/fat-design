# Fat Design 组件库文档

<div align="center">
  <h1>🏢 Fat Design</h1>
  <p><strong>专为后台管理系统打造的企业级 React 组件库</strong></p>
  <p>🎯 <em>专注于表格密集型和表单密集型的后端管理场景</em></p>

  <p>
    <img src="https://img.shields.io/badge/React-16%2B-blue" alt="React 版本" />
    <img src="https://img.shields.io/badge/TypeScript-4.9%2B-blue" alt="TypeScript 版本" />
    <img src="https://img.shields.io/badge/场景-后台管理-orange" alt="适用场景" />
    <img src="https://img.shields.io/badge/特色-表格%2B表单-green" alt="核心特色" />
  </p>
</div>

## 🎯 最佳适用场景

**Fat Design 专为后台管理系统开发而生**，特别擅长处理以下场景：

### 🗃️ 表格密集型应用
- **数据管理系统**：用户管理、订单管理、商品管理等
- **报表中心**：业务报表、财务报表、统计分析
- **监控平台**：系统监控、日志管理、性能分析
- **内容管理**：文章管理、媒体库、权限管理

### 📝 表单密集型应用
- **配置管理**：系统配置、参数设置、规则配置
- **数据录入**：批量导入、表单填写、信息收集
- **审批流程**：工单系统、审批管理、流程配置
- **业务配置**：商品配置、营销配置、用户设置

### 💼 典型应用类型
- **企业ERP系统** - 销售、库存、财务、人事管理
- **电商后台** - 商品、订单、用户、营销管理
- **内容管理系统(CMS)** - 文章、媒体、分类、用户管理
- **运营后台** - 数据分析、用户运营、内容运营
- **监控平台** - 系统监控、日志分析、报警管理

## ✨ 核心优势

### 🏆 表格场景王者
- **TablePro组件**：专为复杂表格场景设计，支持高级筛选、批量操作、列配置
- **高性能渲染**：虚拟滚动支持，轻松处理万级数据量
- **丰富的交互**：排序、筛选、搜索、导出一应俱全
- **用户体验**：跨页选择、批量操作、状态记忆

### 📋 表单场景专家
- **Form2系统**：业界领先的表单解决方案，支持复杂联动和验证
- **精准渲染**：React.memo优化，大型表单性能提升80%
- **Schema驱动**：配置化表单，快速构建复杂业务表单
- **智能联动**：字段依赖跟踪，实现复杂的业务逻辑

### 🎨 后台系统友好
- **11套内置主题**：专为后台管理系统设计的配色方案
- **响应式布局**：完美适配各种屏幕尺寸
- **完整类型支持**：TypeScript全量支持，开发体验极佳
- **轻量高效**：Tree Shaking支持，按需加载不臃肿

## 📦 快速开始

### 安装

```bash
npm install fat-design
# 或
yarn add fat-design
# 或
pnpm add fat-design
```

### 基本使用

```javascript
import React from 'react'
import { Button, Message } from 'fat-design'
import 'fat-design/dist/theme-default.css'

function App() {
  const handleClick = () => {
    Message.success('Hello Fat Design!')
  }

  return (
    <Button type="primary" onClick={handleClick}>
      点击我
    </Button>
  )
}
```

## 📖 文档导航

### 🚀 入门指南

- [**快速开始**](./doc/guide/getting-started.md) - 从安装到第一个示例
- [**安装指南**](./doc/guide/installation.md) - 详细的安装和配置说明
- [**基础概念**](./doc/guide/concepts.md) - 了解组件库的设计理念
- [**TypeScript**](./doc/guide/typescript.md) - TypeScript 使用指南

### 🎨 设计系统

- [**主题系统**](./doc/guide/themes.md) - 主题配置和自定义
- [**设计原则**](./doc/guide/design-principles.md) - 组件设计理念
- [**颜色体系**](./doc/guide/colors.md) - 颜色规范和使用
- [**布局系统**](./doc/guide/layout.md) - 栅格和布局组件

### 📋 组件分类

#### 🧱 基础组件
- [**Button 按钮**](./doc/components/button.md) - 触发操作的基础组件
- [**Icon 图标**](./doc/components/icon.md) - 语义化矢量图标
- [**Avatar 头像**](./doc/components/avatar.md) - 用户头像展示
- [**Badge 徽标**](./doc/components/badge.md) - 消息提醒和状态标识

#### 📐 布局组件
- [**Grid 栅格**](./doc/components/grid.md) - 24 栅格布局系统
- [**Box 盒子**](./doc/components/box.md) - 灵活的布局容器
- [**Card 卡片**](./doc/components/card.md) - 内容容器组件
- [**Divider 分割线**](./doc/components/divider.md) - 内容分割组件

#### 📝 表单组件 (后台表单场景核心)
- [**⭐ Form/Form2 表单**](./doc/components/form.md) - **业界领先的表单解决方案，支持复杂联动和精准渲染**
- [**Input 输入框**](./doc/components/input.md) - 文本输入组件
- [**Select 选择器**](./doc/components/select.md) - 下拉选择组件
- [**DatePicker 日期选择**](./doc/components/date-picker.md) - 日期时间选择
- [**Checkbox 复选框**](./doc/components/checkbox.md) - 多选组件
- [**Radio 单选框**](./doc/components/radio.md) - 单选组件
- [**Switch 开关**](./doc/components/switch.md) - 开关切换组件
- [**BatchInput 批量输入**](./doc/components/batch-input.md) - 批量数据输入
- [**QueryForm 查询表单**](./doc/components/query-form.md) - **专为后台搜索场景优化**

#### 📊 数据展示 (后台表格场景核心)
- [**⭐ TablePro 增强表格**](./doc/components/table-pro.md) - **功能最强大的表格组件，后台管理必备**
- [**Table 表格**](./doc/components/table.md) - 基础表格组件
- [**EditableTable 可编辑表格**](./doc/components/editable-table.md) - **表格内编辑，适合配置管理**
- [**Tree 树形控件**](./doc/components/tree.md) - 层级数据展示
- [**Tag 标签**](./doc/components/tag.md) - 标记和分类
- [**Timeline 时间轴**](./doc/components/timeline.md) - 时间流展示
- [**Progress 进度条**](./doc/components/progress.md) - 进度展示

#### 💬 反馈组件
- [**Message 全局提示**](./doc/components/message.md) - 操作反馈信息
- [**Notification 通知提醒**](./doc/components/notification.md) - 系统通知
- [**Dialog 对话框**](./doc/components/dialog.md) - 模态对话框
- [**Drawer 抽屉**](./doc/components/drawer.md) - 侧边抽屉
- [**Loading 加载**](./doc/components/loading.md) - 加载状态提示
- [**Balloon 气泡**](./doc/components/balloon.md) - 气泡提示

#### 🧭 导航组件
- [**Menu 导航菜单**](./doc/components/menu.md) - 导航菜单组件
- [**Breadcrumb 面包屑**](./doc/components/breadcrumb.md) - 页面导航路径
- [**Pagination 分页**](./doc/components/pagination.md) - 数据分页组件
- [**Nav 导航**](./doc/components/nav.md) - 页面导航组件
- [**Tab 标签页**](./doc/components/tab.md) - 内容切换组件

#### 🔧 高级组件 (后台管理增强功能)
- [**Upload 上传**](./doc/components/upload.md) - **文件上传组件，支持批量上传和进度显示**
- [**VirtualList 虚拟列表**](./doc/components/virtual-list.md) - **大数据量列表，性能优化核心**
- [**SortableList 可排序列表**](./doc/components/sortable-list.md) - **拖拽排序，配置管理必备**
- [**Image 图片**](./doc/components/image.md) - 图片展示和预览

### 🛠️ 工具和Hooks

- [**Hooks**](./doc/guide/hooks.md) - 自定义 React Hooks
- [**Utils 工具函数**](./doc/guide/utils.md) - 实用工具函数集合
- [**⭐ StorageInstance 存储工具**](./doc/guide/storage-instance.md) - **统一存储解决方案，支持LocalForage和localStorage**
- [**配置与扩展**](./doc/guide/configuration.md) - 全局配置和扩展

### 📚 示例和最佳实践

- [**⭐ 完整示例**](./doc/examples/complete-examples.md) - **后台管理系统完整示例**
- [**后台管理场景**](./doc/examples/admin-scenarios.md) - **用户管理、订单管理、商品管理等典型场景**
- [**表格表单最佳实践**](./doc/examples/table-form-practices.md) - **大型表格和复杂表单的最佳实践**
- [**性能优化指南**](./doc/examples/performance.md) - **大数据量场景的性能优化建议**

## 🚀 为什么选择 Fat Design？

### 📊 表格场景无与伦比

```javascript
// 一个配置搞定复杂表格
<TablePro
  useTablePro={useTablePro}
  columns={[
    { dataIndex: 'name', title: '用户名', sortable: true },
    { dataIndex: 'status', title: '状态', filterable: true },
    { dataIndex: 'createTime', title: '创建时间', dateFilter: true }
  ]}
  batchActions={[
    { key: 'delete', name: '批量删除' },
    { key: 'export', name: '批量导出' }
  ]}
  advancedFilter // 高级筛选
  columnConfig   // 列配置
  virtualScroll  // 虚拟滚动
/>
```

**核心优势：**
- ⚡ **性能卓越**：虚拟滚动 + 按需渲染，万级数据流畅显示
- 🎛️ **功能全面**：筛选、排序、搜索、导出、批量操作一应俱全
- 🔧 **高度可配置**：列显示、工具栏、操作按钮完全自定义
- 📱 **响应式设计**：移动端友好，完美适配各种屏幕

### 📝 表单场景的终极解决方案

```javascript
// Schema驱动的高性能表单
<Form
  schema={{
    type: 'object',
    properties: {
      category: {
        label: '商品分类',
        component: 'Select',
        required: true,
        enums: () => fetchCategories()
      },
      subcategory: {
        label: '子分类',
        component: 'Select', 
        deps: ['category'], // 依赖 category 字段
        enums: (value, {values}) => fetchSubcategories(values.category)
      }
    }
  }}
  onChange={handleChange}
  autoValidate
/>
```

**核心优势：**
- ⚡ **精准渲染**：React.memo + 智能依赖跟踪，性能提升80%
- 🔗 **智能联动**：字段间复杂依赖关系，配置即生效
- 🛡️ **全面验证**：内置验证规则 + 自定义验证，数据质量保障
- 📋 **Schema驱动**：配置化开发，复杂表单分钟搞定

### 🎨 专业的后台主题系统

为后台管理系统精心设计的11套主题：

```javascript
// 商务专业 - 蓝色系
import 'fat-design/dist/theme-blue1.css'   // 经典商务蓝
import 'fat-design/dist/theme-blue2.css'   // 科技感蓝

// 清新自然 - 绿色系  
import 'fat-design/dist/theme-green.css'   // 自然绿
import 'fat-design/dist/theme-green2.css'  // 薄荷绿

// 活力温暖 - 暖色系
import 'fat-design/dist/theme-orange.css'  // 活力橙
import 'fat-design/dist/theme-red.css'     // 热情红
import 'fat-design/dist/theme-pink.css'    // 温馨粉

// 高端神秘 - 冷色系
import 'fat-design/dist/theme-purple.css'  // 神秘紫
```

### 💡 专为后台管理优化的特性

- **大数据量处理**：表格虚拟滚动，表单按需渲染
- **复杂业务逻辑**：表单联动，表格筛选，批量操作
- **用户体验优化**：状态记忆，跨页选择，智能加载
- **开发效率提升**：Schema配置，Hook复用，TypeScript支持

## 🔗 相关资源

- [GitHub 仓库](https://github.com/your-org/fat-design)
- [在线演示](https://uifaas.com/ns/app/fat-design-doc/index)
- [更新日志](./CHANGELOG.md)
- [贡献指南](./CONTRIBUTING.md)

## 📞 支持与反馈

如果你在使用过程中遇到问题或有建议，欢迎：

- 提交 [GitHub Issues](https://github.com/your-org/fat-design/issues)
- 参与讨论和贡献代码
- 关注我们的更新动态

---

<div align="center">
  <p>Made with ❤️ by Fat Design Team</p>
</div>