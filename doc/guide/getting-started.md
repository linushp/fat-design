# 快速开始

本指南将帮助你快速上手 Fat Design 组件库，从安装到第一个完整示例。

## 📦 安装

### 环境要求

- Node.js >= 14.0.0
- React >= 16.8.0
- TypeScript >= 4.0.0 (可选)

### 包管理器安装

选择你熟悉的包管理器：

```bash
# npm
npm install fat-design

# yarn
yarn add fat-design

# pnpm
pnpm add fat-design
```

## 🎨 引入样式

Fat Design 提供了多套精美主题，选择一套主题并在项目入口引入：

```javascript
// 在 src/index.js 或 src/main.js 中引入
import 'fat-design/dist/theme-default.css'

// 或选择其他主题
import 'fat-design/dist/theme-blue1.css'
import 'fat-design/dist/theme-green.css'
```

### 可用主题列表

| 主题名称 | 描述 | 适用场景 |
|---------|------|----------|
| `theme-default.css` | 默认主题 | 通用场景 |
| `theme-blue1.css` | 蓝色主题1 | 商务、科技 |
| `theme-blue2.css` | 蓝色主题2 | 清新、现代 |
| `theme-blue3.css` | 蓝色主题3 | 专业、稳重 |
| `theme-blue4.css` | 蓝色主题4 | 深邃、高端 |
| `theme-green.css` | 绿色主题 | 自然、环保 |
| `theme-green2.css` | 绿色主题2 | 清新、活力 |
| `theme-orange.css` | 橙色主题 | 温暖、活跃 |
| `theme-pink.css` | 粉色主题 | 温柔、浪漫 |
| `theme-purple.css` | 紫色主题 | 神秘、优雅 |
| `theme-red.css` | 红色主题 | 热情、醒目 |

## 🚀 第一个示例

创建你的第一个 Fat Design 应用：

```javascript
import React from 'react'
import { Button, Message } from 'fat-design'
import 'fat-design/dist/theme-default.css'

function App() {
  const handleClick = () => {
    Message.success('欢迎使用 Fat Design！')
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>我的第一个 Fat Design 应用</h1>
      <Button type="primary" onClick={handleClick}>
        点击我
      </Button>
    </div>
  )
}

export default App
```

## 📝 表单示例

Fat Design 的表单组件功能强大，这里是一个基础示例：

```javascript
import React from 'react'
import { 
  Form, 
  Card,
  Message 
} from 'fat-design'

const FormItem = Form.Item

function FormExample() {
  const handleSubmit = (values, { formActions }) => {
    console.log('表单数据:', values)
    Message.success('提交成功！')
  }

  const handleCreated = (values, { formStore, formActions }) => {
    // 在这里可以获取到 formActions 用于重置表单
    window.formActions = formActions
  }

  return (
    <Card title="用户信息表单" style={{ maxWidth: 600, margin: '20px auto' }}>
      <Form
        onSubmit={handleSubmit}
        onCreated={handleCreated}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        defaultValues={{
          gender: 'male'
        }}
        autoValidate={true}
      >
        <FormItem
          label="用户名"
          name="username"
          component="Input"
          required
          minLength={2}
          xProps={{
            placeholder: '请输入用户名'
          }}
        />

        <FormItem
          label="邮箱"
          name="email"
          component="Input"
          required
          validator={(rule, value) => {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
              return Promise.reject('请输入有效的邮箱地址')
            }
            return Promise.resolve()
          }}
          xProps={{
            placeholder: '请输入邮箱'
          }}
        />

        <FormItem
          label="性别"
          name="gender"
          component="Select"
          required
          enums={[
            { label: '男', value: 'male' },
            { label: '女', value: 'female' }
          ]}
          xProps={{
            placeholder: '请选择性别'
          }}
        />

        <FormItem
          label="自我介绍"
          name="description"
          component="Input.TextArea"
          maxLength={200}
          xProps={{
            placeholder: '请输入自我介绍',
            rows: 4,
            showCount: true
          }}
        />

        <FormItem 
          label=" "
          component="FormButtonGroup"
          xProps={{
            buttons: [
              {
                component: 'FormSubmit',
                children: '提交',
                type: 'primary'
              },
              {
                component: 'FormReset',
                children: '重置',
                toDefault: true
              }
            ]
          }}
        />
      </Form>
    </Card>
  )
}

export default FormExample
```

## 📊 表格示例

Fat Design 提供强大的表格功能，包括基础表格和增强表格：

```javascript
import React, { useState } from 'react'
import { Table, Button, Tag, Card } from 'fat-design'

function TableExample() {
  const [loading, setLoading] = useState(false)

  // 模拟数据
  const dataSource = [
    {
      id: '1',
      name: '张三',
      age: 28,
      email: 'zhangsan@example.com',
      status: 'active',
      createTime: '2023-01-15'
    },
    {
      id: '2',
      name: '李四',
      age: 32,
      email: 'lisi@example.com',
      status: 'inactive',
      createTime: '2023-02-20'
    },
    {
      id: '3',
      name: '王五',
      age: 25,
      email: 'wangwu@example.com',
      status: 'active',
      createTime: '2023-03-10'
    }
  ]

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: 80
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: 200
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      cell: (value) => (
        <Tag color={value === 'active' ? 'green' : 'red'}>
          {value === 'active' ? '活跃' : '非活跃'}
        </Tag>
      )
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 120
    },
    {
      title: '操作',
      width: 150,
      cell: (value, index, record) => (
        <div>
          <Button size="small" type="primary" style={{ marginRight: 8 }}>
            编辑
          </Button>
          <Button size="small" type="secondary">
            删除
          </Button>
        </div>
      )
    }
  ]

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <Card 
      title="用户列表" 
      extra={
        <Button onClick={handleRefresh} loading={loading}>
          刷新
        </Button>
      }
      style={{ margin: '20px auto' }}
    >
      <Table
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        primaryKey="id"
        pagination={{
          current: 1,
          pageSize: 10,
          total: 3
        }}
      />
    </Card>
  )
}

export default TableExample
```

## 🚀 高级表格 TablePro

对于复杂的表格需求，推荐使用 TablePro：

```javascript
import React, { useRef } from 'react'
import { TablePro, Card } from 'fat-design'

const { useTablePro, renderTime, renderBoolean } = TablePro

function TableProExample() {
  const propsRef = useRef()

  // 模拟查询接口
  const handleQuery = (formParams, otherParams) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { current = 1, pageSize = 10 } = otherParams
        const dataSource = []
        
        for (let i = 0; i < pageSize; i++) {
          dataSource.push({
            id: `${current}-${i}`,
            name: `用户${current}-${i}`,
            email: `user${i}@example.com`,
            status: i % 2 === 0,
            createTime: Date.now() - i * 86400000
          })
        }

        resolve({
          total: 100,
          dataSource
        })
      }, 500)
    })
  }

  propsRef.current = useTablePro({
    // 查询表单配置
    initFormProps: {
      schema: {
        type: 'object',
        properties: {
          keyword: {
            label: '关键词',
            component: 'Input',
            xProps: {
              placeholder: '请输入用户名或邮箱'
            }
          },
          status: {
            label: '状态',
            component: 'Select',
            enums: [
              { label: '全部', value: '' },
              { label: '活跃', value: true },
              { label: '非活跃', value: false }
            ]
          }
        }
      }
    },

    // 表格配置
    initTableProps: {
      columns: [
        { title: 'ID', dataIndex: 'id', width: 100 },
        { title: '姓名', dataIndex: 'name', width: 120 },
        { title: '邮箱', dataIndex: 'email', width: 200 },
        { 
          title: '状态', 
          dataIndex: 'status', 
          width: 100,
          cell: renderBoolean
        },
        { 
          title: '创建时间', 
          dataIndex: 'createTime', 
          width: 160,
          cell: renderTime
        }
      ]
    },

    // 分页配置
    initPaginationProps: {
      pageSize: 10,
      pageSizeList: [10, 20, 50]
    },

    // 查询方法
    onQuery: handleQuery
  })

  return (
    <Card title="高级表格示例" style={{ margin: '20px auto' }}>
      <TablePro {...propsRef.current} settingName="GettingStartedTablePro" />
    </Card>
  )
}

export default TableProExample
```

## 💬 消息反馈

Fat Design 提供了丰富的反馈组件：

```javascript
import React from 'react'
import { Button, Message, Notification, Dialog, Box } from 'fat-design'

function FeedbackExample() {
  const showMessage = (type) => {
    Message[type](`这是一个${type}消息`)
  }

  const showNotification = (type) => {
    Notification[type]({
      title: `${type.toUpperCase()} 通知`,
      content: `这是一个${type}通知的内容`
    })
  }

  const showDialog = () => {
    Dialog.confirm({
      title: '确认操作',
      content: '确定要执行这个操作吗？',
      onOk: () => {
        Message.success('操作成功！')
      }
    })
  }

  return (
    <div style={{ padding: '20px' }}>
      <h3>Message 全局提示</h3>
      <Box direction="row" spacing={8}>
        <Button onClick={() => showMessage('success')}>成功</Button>
        <Button onClick={() => showMessage('error')}>错误</Button>
        <Button onClick={() => showMessage('warning')}>警告</Button>
        <Button onClick={() => showMessage('info')}>信息</Button>
      </Box>

      <h3 style={{ marginTop: '20px' }}>Notification 通知</h3>
      <Box direction="row" spacing={8}>
        <Button onClick={() => showNotification('success')}>成功通知</Button>
        <Button onClick={() => showNotification('error')}>错误通知</Button>
        <Button onClick={() => showNotification('warning')}>警告通知</Button>
        <Button onClick={() => showNotification('info')}>信息通知</Button>
      </Box>

      <h3 style={{ marginTop: '20px' }}>Dialog 对话框</h3>
      <Button onClick={showDialog}>确认对话框</Button>
    </div>
  )
}

export default FeedbackExample
```

## 💾 数据存储

Fat Design 提供了 StorageInstance 统一存储解决方案：

```javascript
import React, { useEffect, useState } from 'react'
import { storageInstance, Button, Card, Message } from 'fat-design'

function StorageExample() {
  const [data, setData] = useState(null)

  const saveData = async () => {
    const userData = {
      name: '用户名',
      preferences: { theme: 'blue', lang: 'zh-CN' },
      timestamp: Date.now()
    }
    
    try {
      await storageInstance.setItem('userData', JSON.stringify(userData))
      setData(userData)
      Message.success('数据保存成功')
    } catch (error) {
      Message.error('保存失败')
    }
  }

  const loadData = async () => {
    try {
      const stored = await storageInstance.getItem('userData')
      if (stored) {
        const userData = JSON.parse(stored)
        setData(userData)
        Message.info('数据加载成功')
      }
    } catch (error) {
      Message.error('加载失败')
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <Card title="数据存储示例" style={{ maxWidth: 500, margin: '20px auto' }}>
      <div style={{ marginBottom: 16 }}>
        <Button onClick={saveData} style={{ marginRight: 8 }}>
          保存数据
        </Button>
        <Button onClick={loadData}>
          加载数据
        </Button>
      </div>
      
      {data && (
        <div style={{ background: '#f5f5f5', padding: 12, borderRadius: 4 }}>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </Card>
  )
}

export default StorageExample
```

**特性：**
- ✨ **渐进增强**：优先使用 LocalForage，降级到 localStorage
- 🚀 **异步 API**：统一的异步接口，简化使用
- 📊 **适用场景**：用户设置、表单草稿、购物车数据等

> 📚 更多详情请查看 [StorageInstance 存储工具](./storage-instance.md)

## 🛠️ 构建工具配置

### Vite 配置

```
// vite.config.js
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

### Webpack 配置

```
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
}
```

### Next.js 配置

```
// next.config.js
module.exports = {
  transpilePackages: ['fat-design'],
  experimental: {
    esmExternals: 'loose'
  }
}
```

## 🎯 按需导入

为了减少打包体积，推荐按需导入：

```
// ✅ 推荐 - 自动 Tree Shaking
import { Button, Form, Table, Message } from 'fat-design'

// ❌ 不推荐 - 全量导入
import FatDesign from 'fat-design'
import * as FatDesign from 'fat-design'
```

## 🐛 常见问题

### 1. 样式没有正确加载

确保正确引入了主题样式文件：

```javascript
// 在项目入口文件中
import 'fat-design/dist/theme-default.css'
```

### 2. React 版本兼容性

Fat Design 支持 React 16、17、18，如遇问题可尝试：

```javascript
import { tryAutoConfig } from 'fat-design'

// 自动配置兼容性
tryAutoConfig()
```

### 3. TypeScript 类型错误

确保 tsconfig.json 配置正确：

```json
{
  "compilerOptions": {
    "typeRoots": ["node_modules/@types", "node_modules/fat-design/types"],
    "types": ["fat-design"]
  }
}
```

## 📖 下一步

恭喜！你已经完成了 Fat Design 的快速开始。接下来你可以：

- 查看 [组件文档](../components/) 了解更多组件用法
- 学习 [主题系统](./themes.md) 自定义样式
- 查看 [完整示例](../examples/) 获取更多灵感
- 了解 [最佳实践](../examples/best-practices.md) 提高开发效率

如果在使用过程中遇到问题，欢迎查看 [常见问题](./faq.md) 或提交 Issue。