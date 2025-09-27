# Fat Design 组件库使用指南

<div align="center">
  <h1>🎨 Fat Design</h1>
  <p>一套功能强大、体积轻量的 React 组件库</p>

  <p>
  项目网站：
  https://uifaas.com/ns/app/fat-design-doc/index
  </p>
  
  <p>
    <img src="https://img.shields.io/badge/React-16%2B-blue" alt="React 版本" />
    <img src="https://img.shields.io/badge/TypeScript-4.9%2B-blue" alt="TypeScript 版本" />
    <img src="https://img.shields.io/badge/Bundle%20Size-761KB-green" alt="包大小" />
  </p>
</div>

## ✨ 特性

- 🎯 **体积轻量**：构建后仅 761KB，比同类产品小 30%+
- 🚀 **功能强大**：提供 60+ 高质量组件，涵盖企业级应用的各种场景
- 💪 **兼容性强**：支持 React 16、17、18 多个版本
- 🎨 **主题丰富**：内置 11 套精美主题，支持自定义主题
- 📦 **按需加载**：支持 Tree Shaking，减少打包体积
- 🛡️ **类型安全**：完整的 TypeScript 支持
- 📚 **文档完善**：详细的组件文档和丰富的示例

## 🎯 对比优势

与其他主流组件库相比：

| 特性 | Fat Design | Ant Design | Next UI |
|------|------------|------------|----------|
| 包体积 | 761KB | 1.2MB+ | 1.1MB+ |
| React 版本支持 | 16/17/18 | 16/17/18 | 17/18 |
| TypeScript | ✅ 完整支持 | ✅ 完整支持 | ✅ 完整支持 |
| 主题系统 | 11 套预设主题 | 默认主题 | 多套主题 |
| 高级组件 | Form、TablePro、QueryForm | 基础组件 | 基础组件 |

## 📦 安装

### 使用 npm

```bash
# 安装最新版本
npm install fat-design

# 安装指定版本
npm install fat-design@latest
```

### 使用 yarn

```bash
# 安装最新版本
yarn add fat-design

# 安装指定版本
yarn add fat-design@latest
```

### 使用 pnpm

```bash
# 安装最新版本
pnpm add fat-design

# 安装指定版本
pnpm add fat-design@latest
```

## 🚀 快速开始

### 1. 引入样式

在项目入口文件中引入样式文件：

```javascript
// 引入默认主题
import 'fat-design/dist/theme-default.css'

// 或选择其他主题
import 'fat-design/dist/theme-blue1.css'
import 'fat-design/dist/theme-green.css'
```

### 2. 使用组件

#### 全量导入（不推荐）

```javascript
import FatDesign from 'fat-design'

function App() {
  return (
    <div>
      <FatDesign.Button type="primary">点击我</FatDesign.Button>
    </div>
  )
}
```

#### 按需导入（推荐）

```javascript
import { Button, Form, Table, Message } from 'fat-design'

function App() {
  const handleClick = () => {
    Message.success('按钮被点击了！')
  }

  return (
    <div>
      <Button type="primary" onClick={handleClick}>
        点击我
      </Button>
    </div>
  )
}
```

### 3. 完整示例

```javascript
import React from 'react'
import { 
  Button, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  Message,
  Card 
} from 'fat-design'
import 'fat-design/dist/theme-default.css'

function App() {
  const [form] = Form.useForm()

  const handleSubmit = (values) => {
    console.log('表单数据:', values)
    Message.success('提交成功！')
  }

  return (
    <Card title="用户信息" style={{ maxWidth: 600, margin: '50px auto' }}>
      <Form
        form={form}
        onFinish={handleSubmit}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item
          label="性别"
          name="gender"
          rules={[{ required: true, message: '请选择性别' }]}
        >
          <Select placeholder="请选择性别">
            <Select.Option value="male">男</Select.Option>
            <Select.Option value="female">女</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="生日"
          name="birthday"
        >
          <DatePicker placeholder="请选择生日" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => form.resetFields()}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default App
```

## 🎨 主题系统

Fat Design 提供了丰富的主题系统，包含 11 套精美的预设主题：

### 预设主题

```javascript
// 默认主题
import 'fat-design/dist/theme-default.css'

// 蓝色系主题
import 'fat-design/dist/theme-blue1.css'
import 'fat-design/dist/theme-blue2.css'
import 'fat-design/dist/theme-blue3.css'
import 'fat-design/dist/theme-blue4.css'

// 绿色系主题
import 'fat-design/dist/theme-green.css'
import 'fat-design/dist/theme-green2.css'

// 其他颜色主题
import 'fat-design/dist/theme-orange.css'
import 'fat-design/dist/theme-pink.css'
import 'fat-design/dist/theme-purple.css'
import 'fat-design/dist/theme-red.css'
```

### 动态切换主题

```javascript
function changeTheme(themeName) {
  const link = document.getElementById('fat-design-theme')
  if (link) {
    link.href = `/node_modules/fat-design/dist/${themeName}.css`
  } else {
    const newLink = document.createElement('link')
    newLink.id = 'fat-design-theme'
    newLink.rel = 'stylesheet'
    newLink.href = `/node_modules/fat-design/dist/${themeName}.css`
    document.head.appendChild(newLink)
  }
}

// 使用示例
changeTheme('theme-blue1')
```

### 自定义主题

```scss
// 自定义主题变量
:root {
  --color-brand1-1: #f0f8ff;
  --color-brand1-6: #4169e1;
  --color-brand1-9: #0000cd;
  
  --color-text1-1: #666;
  --color-text1-2: #333;
  --color-text1-3: #000;
  
  --color-line1-1: #eee;
  --color-line1-2: #ddd;
  --color-line1-3: #ccc;
}
```

## 📚 核心组件

### 基础组件

- **Button 按钮**：支持多种类型、尺寸、状态的按钮组件
- **Icon 图标**：丰富的图标库
- **Avatar 头像**：用户头像展示组件
- **Badge 徽标**：消息提醒、状态标识组件

### 布局组件

- **Grid 栅格**：24 栅格系统
- **Box 盒子**：灵活的布局容器
- **Divider 分割线**：内容分割组件

### 表单组件

- **Form/Form2 表单**：强大的表单解决方案
- **Input 输入框**：文本输入组件
- **Select 选择器**：下拉选择组件
- **DatePicker 日期选择**：日期时间选择组件
- **Checkbox 复选框**：多选组件
- **Radio 单选框**：单选组件
- **Switch 开关**：开关切换组件
- **BatchInput 批量输入**：批量数据输入组件

### 数据展示

- **Table 表格**：基础表格组件
- **TablePro 增强表格**：高级表格功能
- **Tree 树形控件**：层级数据展示
- **Tag 标签**：标记和分类
- **Timeline 时间轴**：时间流展示

### 反馈组件

- **Message 全局提示**：操作反馈信息
- **Notification 通知提醒**：系统通知
- **Dialog 对话框**：模态对话框
- **Drawer 抽屉**：侧边抽屉
- **Loading 加载**：加载状态提示

### 导航组件

- **Menu 导航菜单**：导航菜单组件
- **Breadcrumb 面包屑**：页面导航路径
- **Pagination 分页**：数据分页组件
- **Nav 导航**：页面导航组件

### 高级组件

- **Image 图片**：图片展示和预览
- **Upload 上传**：文件上传组件
- **SortableList 可排序列表**：拖拽排序列表
- **VirtualList 虚拟列表**：大数据量列表
- **QueryForm 查询表单**：搜索表单组件

## 🔧 构建工具集成

### Vite 集成（推荐）

```javascript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "fat-design/dist/variables.scss";`
      }
    }
  }
})
```

### Webpack 集成

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
}
```

### Next.js 集成

```javascript
// next.config.js
module.exports = {
  transpilePackages: ['fat-design'],
  experimental: {
    esmExternals: 'loose'
  }
}
```

## 🛠️ TypeScript 支持

Fat Design 提供完整的 TypeScript 类型定义：

```typescript
import { ButtonProps, FormProps, TableProps } from 'fat-design'

// 组件 Props 类型
const buttonProps: ButtonProps = {
  type: 'primary',
  size: 'medium',
  onClick: () => console.log('clicked')
}

// 表单验证
interface FormData {
  username: string
  email: string
}

const formProps: FormProps<FormData> = {
  onFinish: (values: FormData) => {
    console.log(values.username, values.email)
  }
}
```

## 🔍 按需加载

为了减少打包体积，推荐使用按需加载：

```javascript
// 推荐写法 - 自动 Tree Shaking
import { Button, Form, Table } from 'fat-design'

// 避免以下写法
import FatDesign from 'fat-design' // ❌
import * as FatDesign from 'fat-design' // ❌
```

## 🐛 常见问题

### 1. React 版本兼容性

Fat Design 支持 React 16、17、18，如遇到兼容性问题：

```javascript
import { tryAutoConfig } from 'fat-design'

// 自动配置
tryAutoConfig()
```

### 2. 样式问题

如果样式没有正确加载，请确保：

```javascript
// 1. 正确引入样式文件
import 'fat-design/dist/theme-default.css'

// 2. 检查 CSS 加载器配置
// 3. 确保样式文件路径正确
```

### 3. TypeScript 类型错误

```typescript
// tsconfig.json 配置
{
  "compilerOptions": {
    "typeRoots": ["node_modules/@types", "node_modules/fat-design/types"],
    "types": ["fat-design"]
  }
}
```

## 📖 进阶使用

### 自定义 Hook

```javascript
import { hooks } from 'fat-design'

function MyComponent() {
  const [value, setValue] = hooks.useCurrentState('')
  const persistFn = hooks.usePersistFn(() => {
    console.log('持久化函数')
  })
  
  return <div>{/* 组件内容 */}</div>
}
```

### 工具函数

```javascript
import { utils } from 'fat-design'

// ID 生成
const id = utils.generateId()

// 对象操作
const isEqual = utils.shallowEqual(obj1, obj2)

// DOM 操作
const element = utils.findDOMNode(ref.current)
```

## 🌟 最佳实践

### 1. 组件设计

```javascript
// 推荐：组合使用组件
function UserCard({ user }) {
  return (
    <Card
      title={
        <div>
          <Avatar src={user.avatar} />
          <span>{user.name}</span>
        </div>
      }
      extra={<Tag color="blue">{user.role}</Tag>}
    >
      <p>{user.description}</p>
    </Card>
  )
}
```

### 2. 表单处理

```javascript
// 推荐：使用 Form2 处理复杂表单
function UserForm() {
  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      onFinish={handleSubmit}
    >
      <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      
      <Form.Item name="profile" label="个人信息">
        <Form
          layout="inline"
          initialValues={{ age: 18 }}
        >
          <Form.Item name="age" label="年龄">
            <NumberPicker />
          </Form.Item>
          <Form.Item name="city" label="城市">
            <Select />
          </Form.Item>
        </Form>
      </Form.Item>
    </Form>
  )
}
```

### 3. 数据展示

```javascript
// 推荐：使用 TablePro 处理复杂表格
function UserTable() {
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      sorter: true,
      filter: true
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status}
        </Tag>
      )
    }
  ]

  return (
    <TablePro
      columns={columns}
      dataSource={users}
      pagination={{ pageSize: 10 }}
      toolbar={{
        search: true,
        filter: true,
        export: true
      }}
    />
  )
}
```


