# 完整示例

展示 Fat Design 在实际项目中的应用。

## 📋 用户管理系统

```javascript
import React, { useRef } from 'react'
import { TablePro, Dialog, Message, Card } from 'fat-design'

const { useTablePro, renderTime, renderOperationCell } = TablePro

function UserManagementSystem() {
  const tableRef = useRef()

  const queryUsers = (formParams, otherParams) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = Array.from({ length: 10 }, (_, i) => ({
          id: `user_${i}`,
          name: `用户${i + 1}`,
          email: `user${i + 1}@example.com`,
          role: ['admin', 'editor', 'viewer'][i % 3],
          createTime: Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
        }))
        resolve({ total: 100, dataSource: users })
      }, 500)
    })
  }

  const handleAddUser = () => {
    Dialog.showForm({
      title: '添加用户',
      formProps: {
        schema: {
          type: 'object',
          properties: {
            name: { label: '姓名', component: 'Input', required: true },
            email: { label: '邮箱', component: 'Input', required: true },
            role: { 
              label: '角色', 
              component: 'Select', 
              enums: [
                { label: '管理员', value: 'admin' },
                { label: '编辑者', value: 'editor' }
              ]
            }
          }
        }
      },
      onOk: () => {
        Message.success('添加成功')
        tableRef.current?.actions?.doQuery()
      }
    })
  }

  const tableProProps = useTablePro({
    initTableProps: {
      columns: [
        { title: '姓名', dataIndex: 'name', width: '120px' },
        { title: '邮箱', dataIndex: 'email', width: '200px' },
        { title: '角色', dataIndex: 'role', width: '100px' },
        { title: '创建时间', dataIndex: 'createTime', width: '160px', cell: renderTime },
        {
          title: '操作',
          width: '150px',
          cell: (value, index, record) => renderOperationCell([
            { title: '编辑', onClick: () => Message.info('编辑') },
            { title: '删除', onClick: () => Message.warning('删除') }
          ])
        }
      ]
    },
    initOperationProps: {
      buttons: [{ text: '添加用户', type: 'primary', onClick: handleAddUser }]
    },
    onQuery: queryUsers
  })

  tableRef.current = tableProProps

  return (
    <Card title="用户管理" style={{ margin: '20px' }}>
      <TablePro {...tableProProps} settingName="UserManagementSystem" />
    </Card>
  )
}
```

## 🛒 购物车

```javascript
import React, { useState } from 'react'
import { Card, Table, Button, NumberPicker, Checkbox, Grid } from 'fat-design'

const { Row, Col } = Grid

function ShoppingCart() {
  const [items, setItems] = useState([
    { id: '1', name: 'iPhone 14', price: 7999, quantity: 1, selected: true },
    { id: '2', name: 'MacBook', price: 14999, quantity: 1, selected: false }
  ])

  const updateQuantity = (id, quantity) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity } : item
    ))
  }

  const toggleSelected = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ))
  }

  const total = items
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0)

  const columns = [
    {
      title: '选择',
      width: '60px',
      cell: (_, __, record) => (
        <Checkbox
          checked={record.selected}
          onChange={() => toggleSelected(record.id)}
        />
      )
    },
    { title: '商品', dataIndex: 'name', width: '200px' },
    { title: '单价', dataIndex: 'price', width: '120px', cell: v => `¥${v}` },
    {
      title: '数量',
      width: '120px',
      cell: (_, __, record) => (
        <NumberPicker
          value={record.quantity}
          min={1}
          onChange={(val) => updateQuantity(record.id, val)}
        />
      )
    },
    {
      title: '小计',
      width: '120px',
      cell: (_, __, record) => `¥${record.price * record.quantity}`
    }
  ]

  return (
    <div style={{ padding: '20px' }}>
      <Card title="购物车" style={{ marginBottom: '20px' }}>
        <Table dataSource={items} columns={columns} pagination={false} />
      </Card>
      
      <Card>
        <Row justify="space-between" align="middle">
          <Col>已选择 {items.filter(item => item.selected).length} 件商品</Col>
          <Col>
            <span style={{ fontSize: '18px', marginRight: 16 }}>
              合计：¥{total.toLocaleString()}
            </span>
            <Button type="primary">去结算</Button>
          </Col>
        </Row>
      </Card>
    </div>
  )
}
```

## 📊 数据面板

```javascript
import React from 'react'
import { Card, Grid, Tag } from 'fat-design'

const { Row, Col } = Grid

function DataDashboard() {
  const StatisticCard = ({ title, value, prefix, color, tag }) => (
    <Card style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '16px', marginBottom: '8px', color: '#666' }}>
        {title}
      </div>
      <div style={{ fontSize: '32px', fontWeight: 'bold', color, marginBottom: '8px' }}>
        {prefix} {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      {tag && (
        <Tag color={tag.color} style={{ marginTop: 8 }}>
          {tag.text}
        </Tag>
      )}
    </Card>
  )

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <StatisticCard
            title="总用户数"
            value={12580}
            prefix="👥"
            color="#3f8600"
            tag={{ text: '+245 新增', color: 'green' }}
          />
        </Col>
        <Col span={6}>
          <StatisticCard
            title="订单数"
            value={8964}
            prefix="📦"
            color="#1890ff"
            tag={{ text: '+126 今日', color: 'blue' }}
          />
        </Col>
        <Col span={6}>
          <StatisticCard
            title="收入"
            value={156780}
            prefix="💰"
            color="#cf1322"
            tag={{ text: '+8.5% 环比', color: 'red' }}
          />
        </Col>
        <Col span={6}>
          <StatisticCard
            title="转化率"
            value="11.28%"
            prefix="📈"
            color="#722ed1"
            tag={{ text: '+2.1% 上升', color: 'purple' }}
          />
        </Col>
      </Row>
    </div>
  )
}
```

## 📝 表单向导

```javascript
import React, { useState } from 'react'
import { Card, Form, Input, Select, Button, Steps, Message } from 'fat-design'

function FormWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})

  const steps = ['基本信息', '详细信息', '确认提交']

  const handleSubmit = (values) => {
    const newData = { ...formData, ...values }
    setFormData(newData)
    
    if (currentStep === steps.length - 1) {
      Message.success('提交成功!')
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  return (
    <Card title="表单向导" style={{ margin: '20px', maxWidth: 600 }}>
      <Steps current={currentStep} style={{ marginBottom: 32 }}>
        {steps.map(step => <Steps.Step key={step} title={step} />)}
      </Steps>
      
      {currentStep === 0 && (
        <Form onFinish={handleSubmit} initialValues={formData}>
          <Form.Item label="姓名" name="name" rules={[{ required: true }]}>
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item label="邮箱" name="email" rules={[{ required: true }]}>
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">下一步</Button>
          </Form.Item>
        </Form>
      )}
      
      {currentStep === 1 && (
        <Form onFinish={handleSubmit} initialValues={formData}>
          <Form.Item label="职业" name="job">
            <Select placeholder="请选择职业">
              <Select.Option value="dev">开发者</Select.Option>
              <Select.Option value="design">设计师</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button onClick={() => setCurrentStep(0)} style={{ marginRight: 8 }}>
              上一步
            </Button>
            <Button type="primary" htmlType="submit">下一步</Button>
          </Form.Item>
        </Form>
      )}
      
      {currentStep === 2 && (
        <div>
          <p>姓名：{formData.name}</p>
          <p>邮箱：{formData.email}</p>
          <p>职业：{formData.job}</p>
          <Button onClick={() => setCurrentStep(1)} style={{ marginRight: 8 }}>
            上一步
          </Button>
          <Button type="primary" onClick={() => handleSubmit({})}>
            提交
          </Button>
        </div>
      )}
    </Card>
  )
}
```

这些示例展示了 Fat Design 的实际应用场景，代码简洁易懂，可直接在项目中使用。