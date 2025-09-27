# TablePro 增强表格组件

TablePro 是 Fat Design 提供的高级表格组件，集成了查询表单、数据表格、分页、筛选、批量操作等功能。

## 基本使用

```javascript
import React, { useRef } from 'react'
import { TablePro, Card } from 'fat-design'

const { useTablePro, renderTime, renderBoolean } = TablePro

function BasicTablePro() {
  const propsRef = useRef()

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
      labelAlign: 'top',
      schema: {
        type: 'object',
        properties: {
          username: {
            label: '用户名',
            component: 'Input',
            required: true,
            xProps: {
              hasClear: true,
              placeholder: '请输入用户名'
            }
          },
          status: {
            label: '状态',
            component: 'Select',
            enums: [
              { label: 'Label A', value: 'AAA' },
              { label: 'Label B', value: 'BBB' }
            ]
          }
        }
      }
    },

    // 表格配置
    initTableProps: {
      title: '用户列表',
      primaryKey: 'id',
      columns: [
        { title: 'ID', dataIndex: 'id', width: '150px', lock: 'left' },
        { title: '姓名', dataIndex: 'name', width: '180px' },
        { title: '邮箱', dataIndex: 'email', width: '200px' },
        { 
          title: '状态', 
          dataIndex: 'status', 
          width: '120px',
          cell: renderBoolean
        },
        { 
          title: '创建时间', 
          dataIndex: 'createTime', 
          width: '200px',
          cell: renderTime
        }
      ]
    },

    // 分页配置
    initPaginationProps: {
      pageSize: 10,
      pageSizeList: [10, 20, 50, 100]
    },

    // 查询方法
    onQuery: handleQuery
  })

  return (
    <Card title="基础 TablePro">
      <TablePro {...propsRef.current} settingName="BasicTableProDemo" />
    </Card>
  )
}
```

## 高级功能

### 跨页选择

```javascript
propsRef.current = useTablePro({
  // 开启跨页选择
  isEnableCrossPageRowSelection: true,
  
  // 其他配置...
})
```

### 工具栏和批量操作

```javascript
propsRef.current = useTablePro({
  initOperationProps: {
    buttons: [
      { text: '新增', icon: 'plus', type: 'primary' },
      { text: '批量删除', icon: 'delete' },
      { text: '导出', icon: 'download' },
      {
        text: '更多操作',
        icon: 'more',
        children: [
          { text: '批量启用', icon: 'check' },
          { text: '批量禁用', icon: 'close' }
        ]
      },
      { text: '设置', onClick: 'setting', icon: 'set' }
    ]
  },
  
  // 其他配置...
})
```

### 筛选功能

```javascript
propsRef.current = useTablePro({
  initFilterProps: {
    defaultValue: 'ALL',
    dataSource: [
      { label: '全部', value: 'ALL', count: 50 },
      { label: '活跃', value: 'active', count: 20 },
      { label: '非活跃', value: 'inactive', count: 30 }
    ]
  },
  
  // 其他配置...
})
```

## 复杂示例

```javascript
import React, { useRef } from 'react'
import { TablePro, Dialog, Message } from 'fat-design'

const { 
  useTablePro, 
  renderOperationCell, 
  renderMultiFieldCell,
  renderTime, 
  renderBoolean 
} = TablePro

function ComplexTablePro() {
  const propsRef = useRef()

  const dataSource = (formParams, otherParams = {}) => {
    const { current = 1, pageSize = 10, filterValue } = otherParams
    const result = []
    
    for (let i = 0; i < pageSize; i++) {
      result.push({
        id: `${current}-${i}`,
        title: { name: `标题 ${current}-${i} ${filterValue || ''}` },
        time: Date.now() + 200 * i,
        yes: i % 2 === 0,
        description: '这是一段描述信息...'
      })
    }
    return result
  }

  propsRef.current = useTablePro({
    // 开启跨页选择
    isEnableCrossPageRowSelection: true,

    // 查询表单
    initFormProps: {
      labelAlign: 'top',
      defaultValues: {
        username1: 'AAA'
      },
      schema: {
        type: 'object',
        properties: {
          username1: {
            label: '名字1',
            component: 'Input',
            required: true,
            xProps: {
              hasClear: true
            }
          },
          username2: {
            label: '下拉框2',
            component: 'Select',
            enums: [
              { label: 'Label A', value: 'AAA' },
              { label: 'Label B', value: 'BBB' }
            ]
          },
          username3: {
            label: '搜索下拉框',
            component: 'Select',
            xProps: {
              hasClear: true,
              filterLocal: false,
              showSearch: true,
              mode: 'multiple'
            },
            deps: ['username2'],
            enums: (value, { values, valuesOfOnSearch }) => {
              const key = valuesOfOnSearch.username3
              delete valuesOfOnSearch.username3

              if (key) {
                return [
                  { label: `搜索结果1 ${key}`, value: `KEY1_${key}` },
                  { label: `搜索结果2 ${key}`, value: `KEY2_${key}` }
                ]
              }

              if (values.username2 === 'AAA') {
                return [
                  { label: 'Label AAA1', value: 'AAA1' },
                  { label: 'Label AAA2', value: 'AAA2' }
                ]
              }
              return [
                { label: 'Label BBB1', value: 'BBB1' },
                { label: 'Label BBB2', value: 'BBB2' }
              ]
            }
          },
          dateRange: {
            label: '日期范围',
            component: 'DatePickerRangePicker'
          }
        }
      }
    },

    // 分页配置
    initPaginationProps: {
      pageSize: 10,
      pageSizeList: [10, 20, 50, 100, 200, 500]
    },

    // 表格配置
    initTableProps: {
      title: '复杂表格示例',
      primaryKey: 'id',
      fixedHeader: true,
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          width: '150px',
          lock: 'left'
        },
        {
          title: '标题',
          dataIndex: 'title.name',
          width: '180px',
          tips: '这是提示信息',
          sortable: true
        },
        {
          title: '创建时间',
          dataIndex: 'time',
          width: '200px',
          cell: renderTime
        },
        {
          title: '状态',
          dataIndex: 'yes',
          width: '120px',
          cell: renderBoolean
        },
        {
          title: '详细信息',
          dataIndex: 'time',
          width: '320px',
          cell: (value, index, record) => {
            return renderMultiFieldCell([
              { content: '基本信息：' + record.description },
              { title: '创建时间', content: new Date(record.time).toLocaleString() },
              { title: '状态', content: record.yes ? '启用' : '禁用' },
              { title: 'ID', content: record.id }
            ])
          }
        },
        {
          title: '操作',
          dataIndex: 'operations',
          width: '200px',
          lock: 'right',
          cell: (value, index, record) => {
            return renderOperationCell([
              {
                title: '查看日志',
                onClick: () => {
                  Dialog.showTable({
                    title: '查看日志',
                    tableProProps: {
                      isEnableRowSelection: false,
                      initPaginationProps: {
                        size: 'small'
                      },
                      initTableProps: {
                        size: 'small',
                        fixedHeader: true,
                        columns: [
                          { title: 'ID', dataIndex: 'id', width: '150px' },
                          { title: '操作', dataIndex: 'action', width: '180px' },
                          { title: '时间', dataIndex: 'time', width: '180px', cell: renderTime }
                        ]
                      },
                      onQuery: (formParams, otherParams) => {
                        return new Promise((resolve) => {
                          setTimeout(() => {
                            resolve({
                              total: 20,
                              dataSource: dataSource(formParams, otherParams)
                            })
                          }, 300)
                        })
                      }
                    }
                  })
                }
              },
              {
                title: '编辑',
                onClick: () => {
                  Message.info(`编辑 ${record.id}`)
                }
              },
              {
                title: '删除',
                disabled: record.yes, // 启用状态不能删除
                tooltip: record.yes ? '启用状态不能删除' : '',
                onClick: () => {
                  Message.warning(`删除 ${record.id}`)
                }
              }
            ])
          }
        }
      ]
    },

    // 筛选配置
    initFilterProps: {
      defaultValue: 'ALL',
      value: 'ALL',
      dataSource: [
        { label: '全部', value: 'ALL', count: 50 },
        { label: '启用', value: 'enabled', count: 20 },
        { label: '禁用', value: 'disabled', count: 30 }
      ]
    },

    // 工具栏配置
    initOperationProps: {
      buttons: [
        { text: '新增', icon: 'smile', type: 'primary' },
        { text: '批量删除' },
        { text: '导出' },
        {
          text: '更多操作',
          icon: 'smile',
          children: [
            { text: '批量启用', icon: 'smile' },
            { text: '批量禁用' },
            { text: '批量导出' }
          ]
        },
        { text: '设置', onClick: 'setting', icon: 'set' }
      ]
    },

    // 查询方法
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
  })

  return <TablePro {...propsRef.current} settingName="ComplexTableDemo" />
}
```

## 内置渲染器

### renderTime 时间渲染器

```javascript
import { TablePro } from 'fat-design'
const { renderTime } = TablePro

// 在列配置中使用
{
  title: '创建时间',
  dataIndex: 'createTime',
  cell: renderTime
}
```

### renderBoolean 布尔值渲染器

```javascript
import { TablePro } from 'fat-design'
const { renderBoolean } = TablePro

// 在列配置中使用
{
  title: '是否启用',
  dataIndex: 'enabled',
  cell: renderBoolean
}
```

### renderOperationCell 操作列渲染器

```javascript
import { TablePro } from 'fat-design'
const { renderOperationCell } = TablePro

// 在列配置中使用
{
  title: '操作',
  cell: (value, index, record) => {
    return renderOperationCell([
      {
        title: '编辑',
        onClick: () => handleEdit(record)
      },
      {
        title: '删除',
        disabled: record.status === 'protected',
        tooltip: '受保护的记录不能删除',
        onClick: () => handleDelete(record)
      }
    ])
  }
}
```

### renderMultiFieldCell 多字段渲染器

```javascript
import { TablePro } from 'fat-design'
const { renderMultiFieldCell } = TablePro

// 在列配置中使用
{
  title: '详细信息',
  cell: (value, index, record) => {
    return renderMultiFieldCell([
      { content: '基本描述信息' },
      { title: '创建者', content: record.creator },
      { title: '状态', content: record.status },
      { title: '最后更新', content: record.updateTime }
    ])
  }
}
```

## API 参考

### useTablePro Options

| 属性 | 类型 | 说明 |
|------|------|------|
| initFormProps | `object` | 查询表单配置 |
| initTableProps | `object` | 表格配置 |
| initPaginationProps | `object` | 分页配置 |
| initFilterProps | `object` | 筛选配置 |
| initOperationProps | `object` | 工具栏配置 |
| isEnableCrossPageRowSelection | `boolean` | 是否启用跨页选择 |
| isEnableRowSelection | `boolean` | 是否启用行选择 |
| onQuery | `function` | 查询方法 |
| settingName | `string` | 设置存储名称 |

### 查询方法参数

```javascript
onQuery: (formParams, otherParams) => {
  // formParams: 表单参数
  // otherParams: { current, pageSize, filterValue, selectedRowKeys }
  return Promise.resolve({
    total: number,
    dataSource: array
  })
}
```

### 返回值

useTablePro 返回包含以下属性的对象：

| 属性 | 类型 | 说明 |
|------|------|------|
| actions | `object` | 操作方法集合 |
| formProps | `object` | 表单属性 |
| tableProps | `object` | 表格属性 |
| paginationProps | `object` | 分页属性 |
| filterProps | `object` | 筛选属性 |
| operationProps | `object` | 工具栏属性 |

### actions 方法

| 方法 | 说明 |
|------|------|
| doQuery() | 执行查询 |
| doReset() | 重置表单 |
| getSelectedRows() | 获取选中行 |
| clearSelection() | 清空选择 |