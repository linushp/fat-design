# Dialog 对话框组件

Dialog 组件提供了丰富的对话框功能，包括确认框、输入框、表单对话框、表格对话框等。

## 基本用法

### 确认对话框

```javascript
import React from 'react'
import { Dialog, Button, Message, Box } from 'fat-design'

function BasicDialog() {
  const showConfirm = () => {
    Dialog.confirm({
      title: '确认操作',
      content: '确定要执行这个操作吗？',
      onOk: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            Message.success('操作成功！')
            resolve()
          }, 1000)
        })
      }
    })
  }

  const showAlert = () => {
    Dialog.alert({
      title: '提示',
      content: '这是一个提示信息',
      onOk: () => {
        Message.info('已确认')
      }
    })
  }

  return (
    <Box direction="row" spacing={10}>
      <Button onClick={showConfirm}>确认对话框</Button>
      <Button onClick={showAlert}>提示对话框</Button>
    </Box>
  )
}
```

### 不同类型的对话框

```javascript
import React from 'react'
import { Dialog, Button, Message, Box } from 'fat-design'

function DialogTypes() {
  const showSuccess = () => {
    Dialog.success({
      title: '成功',
      content: '操作已成功完成',
      onOk: () => Message.success('OK')
    })
  }

  const showError = () => {
    Dialog.error({
      title: '错误',
      content: '操作失败，请重试',
      onOk: () => Message.error('OK')
    })
  }

  const showWarning = () => {
    Dialog.warning({
      title: '警告',
      content: '这是一个警告信息',
      onOk: () => Message.warning('OK')
    })
  }

  const showNotice = () => {
    Dialog.notice({
      title: '通知',
      content: '这是一个通知信息',
      onOk: () => Message.info('OK')
    })
  }

  const showHelp = () => {
    Dialog.help({
      title: '帮助',
      content: '这是帮助信息',
      onOk: () => Message.info('OK')
    })
  }

  return (
    <Box direction="row" spacing={10}>
      <Button onClick={showSuccess}>成功</Button>
      <Button onClick={showError}>错误</Button>
      <Button onClick={showWarning}>警告</Button>
      <Button onClick={showNotice}>通知</Button>
      <Button onClick={showHelp}>帮助</Button>
    </Box>
  )
}
```

## 输入对话框

### 单行输入

```javascript
import React from 'react'
import { Dialog, Button, Message } from 'fat-design'

function InputDialog() {
  const showSingleInput = () => {
    Dialog.showInput({
      title: '请输入内容',
      label: '名称',
      placeholder: '请输入名称',
      onOk: ({ formInputValue }) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            Message.success(`输入的内容：${formInputValue}`)
            resolve()
          }, 1000)
        })
      }
    })
  }

  const showTextareaInput = () => {
    Dialog.showInput({
      mode: 'textareaMode',
      title: '请输入意见',
      label: '审批意见',
      placeholder: '请输入审批意见',
      okText: '提交',
      onOk: ({ formInputValue }) => {
        console.log('输入内容:', formInputValue)
        Message.success('提交成功')
      }
    })
  }

  return (
    <div>
      <Button onClick={showSingleInput}>单行输入</Button>
      <Button onClick={showTextareaInput} style={{ marginLeft: 10 }}>
        多行输入
      </Button>
    </div>
  )
}
```

### 带提示的输入框

```javascript
import React from 'react'
import { Dialog, Button, Message } from 'fat-design'

function InputWithTips() {
  const showInputWithTips = () => {
    Dialog.showInput({
      title: '创建项目',
      mode: 'textareaMode',
      label: '项目描述',
      placeholder: '请输入项目描述',
      topTips: '请详细描述项目的目标和范围',
      bottomTips: '描述将用于项目展示页面',
      required: true,
      onOk: ({ formInputValue }) => {
        if (formInputValue.length < 10) {
          Message.warning('描述至少需要10个字符')
          return false // 阻止关闭
        }
        Message.success('项目创建成功')
      }
    })
  }

  return (
    <Button onClick={showInputWithTips}>
      带提示的输入框
    </Button>
  )
}
```

## 批量输入对话框

```javascript
import React from 'react'
import { Dialog, Button, Message } from 'fat-design'

function BatchInputDialog() {
  const showBatchInput = () => {
    Dialog.showBatchInput({
      title: '批量导入',
      placeholder: '请输入多行数据，每行一条',
      onOk: (values) => {
        console.log('批量输入数据:', values)
        return new Promise((resolve) => {
          setTimeout(() => {
            Message.success(`成功导入 ${values.length} 条数据`)
            resolve()
          }, 1000)
        })
      }
    })
  }

  return (
    <Button onClick={showBatchInput}>
      批量输入
    </Button>
  )
}
```

## 表单对话框

```javascript
import React from 'react'
import { Dialog, Button, Message } from 'fat-design'

function FormDialog() {
  const showFormDialog = () => {
    const formProps = {
      defaultValues: {
        type: 'normal'
      },
      labelCol: { span: 6 },
      wrapperCol: { span: 15 },
      schema: {
        type: 'object',
        properties: {
          name: {
            label: '名称',
            component: 'Input',
            maxLength: 100,
            required: true,
            xProps: {
              hasClear: true,
              placeholder: '请输入名称'
            }
          },
          type: {
            label: '类型',
            component: 'Select',
            required: true,
            enums: [
              { label: '普通', value: 'normal' },
              { label: '重要', value: 'important' }
            ],
            xProps: {
              hasClear: true
            }
          },
          description: {
            label: '描述',
            component: 'Input.TextArea',
            maxLength: 200,
            xProps: {
              maxLength: 200,
              showLimitHint: true,
              hasClear: true,
              rows: 4
            }
          }
        }
      }
    }

    Dialog.showForm({
      title: '创建项目',
      formProps,
      contentStyle: { minHeight: 280 },
      onOk: (values) => {
        console.log('表单数据:', values)
        Message.success('创建成功')
      }
    })
  }

  return (
    <Button onClick={showFormDialog}>
      表单对话框
    </Button>
  )
}
```

## 表格对话框

```javascript
import React from 'react'
import { Dialog, Button } from 'fat-design'

function TableDialog() {
  const showTableDialog = () => {
    const dataSource = (formParams, otherParams = {}) => {
      const { current = 1, pageSize = 10 } = otherParams
      const result = []
      
      for (let i = 0; i < pageSize; i++) {
        result.push({
          id: `${current}-${i}`,
          name: `用户${current}-${i}`,
          email: `user${i}@example.com`,
          createTime: Date.now() - i * 86400000
        })
      }
      return result
    }

    Dialog.showTable({
      title: '用户列表',
      contentStyle: { width: 800 },
      tableProProps: {
        isEnableRowSelection: false,
        initPaginationProps: {
          pageSize: 10,
          pageSizeList: [10, 20, 50]
        },
        initTableProps: {
          size: 'small',
          fixedHeader: true,
          columns: [
            { title: 'ID', dataIndex: 'id', width: '150px' },
            { title: '姓名', dataIndex: 'name', width: '150px' },
            { title: '邮箱', dataIndex: 'email', width: '200px' },
            { 
              title: '创建时间', 
              dataIndex: 'createTime', 
              width: '180px',
              cell: (value) => new Date(value).toLocaleString()
            }
          ]
        },
        onQuery: (formParams, otherParams) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                total: 100,
                dataSource: dataSource(formParams, otherParams)
              })
            }, 500)
          })
        }
      }
    })
  }

  return (
    <Button onClick={showTableDialog}>
      表格对话框
    </Button>
  )
}
```

## 自定义组件对话框

```javascript
import React from 'react'
import { Dialog, Button, Message } from 'fat-design'

// 自定义组件
const MyComponent = ({ fnRef, ...props }) => {
  // 设置回调函数
  fnRef.setFn('onOk', () => {
    console.log('自定义确认逻辑')
    Message.success('自定义操作成功')
    return true // 返回 true 关闭对话框
  })

  fnRef.setFn('onFormat', () => {
    console.log('自定义格式化逻辑')
    Message.info('格式化完成')
    return false // 返回 false 不关闭对话框
  })

  return (
    <div style={{ padding: '20px' }}>
      <h3>自定义组件内容</h3>
      <p>这是一个自定义组件</p>
      <p>Props: {JSON.stringify(props)}</p>
    </div>
  )
}

function CustomComponentDialog() {
  const showCustomDialog = () => {
    Dialog.showComp({
      title: '自定义组件对话框',
      component: MyComponent,
      xProps: { 
        data: { id: 1, name: 'test' },
        config: { mode: 'edit' }
      },
      footerActions: ['ok', 'cancel', 'format'],
      formatProps: { children: '格式化' }
    })
  }

  return (
    <Button onClick={showCustomDialog}>
      自定义组件对话框
    </Button>
  )
}
```

## 无边框对话框

```javascript
import React from 'react'
import { Dialog, Button } from 'fat-design'

function NoBorderDialog() {
  const showImageDialog = () => {
    Dialog.show({
      noPadding: true,
      needWrapper: false,
      footer: false,
      style: { width: '500px', height: '300px', border: 'none' },
      closeMode: ['close', 'mask', 'esc'],
      content: (
        <img 
          style={{ width: '500px', height: '300px', display: 'block' }}
          src="https://via.placeholder.com/500x300"
          alt="示例图片"
        />
      )
    })
  }

  return (
    <Button onClick={showImageDialog}>
      图片预览
    </Button>
  )
}
```

## API 参考

### Dialog 静态方法

| 方法 | 说明 | 参数 |
|------|------|------|
| `Dialog.confirm()` | 确认对话框 | `config` |
| `Dialog.alert()` | 提示对话框 | `config` |
| `Dialog.success()` | 成功对话框 | `config` |
| `Dialog.error()` | 错误对话框 | `config` |
| `Dialog.warning()` | 警告对话框 | `config` |
| `Dialog.notice()` | 通知对话框 | `config` |
| `Dialog.help()` | 帮助对话框 | `config` |
| `Dialog.showInput()` | 输入对话框 | `config` |
| `Dialog.showBatchInput()` | 批量输入对话框 | `config` |
| `Dialog.showForm()` | 表单对话框 | `config` |
| `Dialog.showTable()` | 表格对话框 | `config` |
| `Dialog.showComp()` | 自定义组件对话框 | `config` |
| `Dialog.show()` | 通用对话框 | `config` |

### 基础配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | `ReactNode` | - | 对话框标题 |
| content | `ReactNode` | - | 对话框内容 |
| onOk | `function` | - | 确认回调 |
| onCancel | `function` | - | 取消回调 |
| okText | `string` | '确定' | 确认按钮文字 |
| cancelText | `string` | '取消' | 取消按钮文字 |
| footerActions | `array` | `['ok', 'cancel']` | 底部按钮配置 |

### showInput 配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| label | `string` | - | 输入框标签 |
| placeholder | `string` | - | 输入框占位符 |
| mode | `'inputMode' \| 'textareaMode'` | `'inputMode'` | 输入模式 |
| required | `boolean` | `true` | 是否必填 |
| topTips | `ReactNode` | - | 顶部提示 |
| bottomTips | `ReactNode` | - | 底部提示 |
| formProps | `object` | - | 表单属性 |

### showForm 配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| formProps | `object` | - | 表单配置 |
| contentStyle | `object` | - | 内容样式 |

### showTable 配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| tableProProps | `object` | - | TablePro 配置 |
| contentStyle | `object` | - | 内容样式 |

### showComp 配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| component | `Component` | - | 自定义组件 |
| xProps | `object` | - | 组件属性 |
| footerActions | `array` | - | 底部按钮 |