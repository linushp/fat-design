# TablePro 高级表格组件使用文档

## 概述
TablePro 是功能强大的表格组件，集成了查询表单、分页、筛选、操作栏等功能，适用于复杂的数据展示和管理场景。

## 基础用法

```jsx
import { TablePro, PageCard } from "fat-design";
import { useRef } from "react";

const { useTablePro, renderOperationCell, renderTime, renderBoolean } = TablePro;

function BasicTablePro() {
  const propsRef = useRef();

  propsRef.current = useTablePro({
    // 查询表单配置
    initFormProps: {
      labelAlign: 'top',
      defaultValues: {
        username: 'AAA',
      },
      schema: {
        type: 'object',
        properties: {
          username1: {
            label: '名字1',
            component: 'Input',
            required: true,
            xProps: {
              hasClear: true,
            }
          },
          username2: {
            label: '下拉框2',
            component: 'Select',
            enums: [
              {label: 'Label A', value: 'AAA'},
              {label: 'Label B', value: 'BBB'}
            ]
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
      title: '审批任务列表',
      primaryKey: 'id',
      columns: [
        {title: '姓名', dataIndex: 'id', width: '150px', lock: 'left'},
        {title: '标题', dataIndex: 'title.name', width: '180px', tips: "hello", sortable: true},
        {title: '入职日期', dataIndex: 'time', width: '200px', cell: renderTime},
        {title: '是否启用', dataIndex: 'yes', width: '120px', cell: renderBoolean},
        {
          title: '操作',
          dataIndex: 'time',
          width: '160px',
          lock: 'right',
          cell: (value, index, record) => {
            return renderOperationCell([
              {
                title: '编辑',
                onClick: () => handleEdit(record)
              },
              {
                title: '删除',
                onClick: () => handleDelete(record)
              }
            ]);
          }
        }
      ]
    },

    // 数据查询
    onQuery: (formParams, otherParams) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            total: 100,
            dataSource: mockDataSource(formParams, otherParams)
          });
        }, 500);
      });
    }
  });

  return (
    <PageCard mode="nobg">
      <TablePro {...propsRef.current} settingName="BasicTableDemo" />
    </PageCard>
  );
}
```

## 高级功能

### 跨页选择
```jsx
const propsRef = useTablePro({
  // 开启跨页选择
  isEnableCrossPageRowSelection: true,
  
  // 其他配置...
});
```

### 筛选器配置
```jsx
const propsRef = useTablePro({
  initFilterProps: {
    defaultValue: 'ALL',
    dataSource: [
      {label: '全部', value: 'ALL', count: 50},
      {label: '良品', value: 'good', count: 20},
      {label: '次品', value: 'bad', count: 30},
    ]
  },
  // 其他配置...
});
```

### 操作栏配置
```jsx
const propsRef = useTablePro({
  initOperationProps: {
    buttons: [
      {text: '操作一', icon: "smile", type: 'primary'},
      {text: '操作二'},
      {text: '操作三'},
      {
        text: '操作四',
        icon: "smile",
        children: [
          {text: '子操作一', icon: "smile"},
          {text: '子操作二'},
          {text: '子操作三'},
        ]
      },
      {text: '设置', onClick: 'setting', icon: 'set'},
    ]
  },
  // 其他配置...
});
```

### 复杂列渲染
```jsx
const propsRef = useTablePro({
  initTableProps: {
    columns: [
      // 多字段单元格
      {
        title: '详细信息',
        dataIndex: 'time',
        width: '320px',
        cell: (value, index, record) => {
          return renderMultiFieldCell([
            {content: '建议内容,建议内容,建议内容,建议内容'},
            {title: '建议内容', content: record.suggestion},
            {title: '建议原因', content: record.reason},
            {title: '状态', content: record.status},
            {title: '连续次数', content: record.count},
          ]);
        }
      },
      
      // 操作列
      {
        title: '操作',
        dataIndex: 'id',
        width: '160px',
        lock: 'right',
        cell: (value, index, record) => {
          return renderOperationCell([
            {
              title: '日志',
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
                        {title: '时间', dataIndex: 'time', width: '150px'},
                        {title: '操作', dataIndex: 'action', width: '180px'},
                      ]
                    },
                    onQuery: (formParams, otherParams) => {
                      return Promise.resolve({
                        total: 50,
                        dataSource: mockLogData
                      });
                    },
                  },
                });
              },
            },
            {
              title: '查看',
              disabled: true,
              tooltip: '暂无权限',
              onClick: () => {}
            },
            {
              title: '编辑',
              onClick: () => handleEdit(record)
            },
            {
              title: '删除',
              onClick: () => handleDelete(record)
            }
          ]);
        }
      }
    ]
  }
});
```

### 联动查询
```jsx
const schema = {
  type: 'object',
  properties: {
    username1: {
      label: '名字1',
      component: 'Input',
      xProps: { hasClear: true }
    },
    username2: {
      label: '下拉框2',
      component: 'Select',
      enums: [
        {label: 'Label A', value: 'AAA'},
        {label: 'Label B', value: 'BBB'}
      ]
    },
    username3: {
      label: '下拉框3',
      component: 'Select',
      xProps: {
        hasClear: true,
        filterLocal: false,
        showSearch: true,
        mode: "multiple",
      },
      deps: ["username2"],
      enums: (childProps, params) => {
        const { values, valuesOfOnSearch } = params;
        const searchKey = valuesOfOnSearch.username3;
        
        if (searchKey) {
          return [
            {label: `搜索结果1 ${searchKey}`, value: `RESULT1_${searchKey}`},
            {label: `搜索结果2 ${searchKey}`, value: `RESULT2_${searchKey}`}
          ];
        }

        if (values.username2 === 'AAA') {
          return [
            {label: 'Label AAA1', value: 'AAA1'},
            {label: 'Label AAA2', value: 'AAA2'}
          ];
        }
        
        return [
          {label: 'Label BBB1', value: 'BBB1'},
          {label: 'Label BBB2', value: 'BBB2'}
        ];
      },
    }
  }
};
```

### 前端分页
```jsx
const propsRef = useTablePro({
  // 启用前端分页
  isEnableFrontendPagination: true,
  
  onQuery: (formParams, otherParams) => {
    // 返回全量数据，组件会自动处理分页
    return Promise.resolve({
      dataSource: allData // 全量数据
    });
  }
});
```

## 工具函数

### renderTime - 时间渲染
```jsx
import { renderTime } from "fat-design/TablePro";

// 在列配置中使用
{
  title: '创建时间',
  dataIndex: 'createTime',
  cell: renderTime
}
```

### renderBoolean - 布尔值渲染
```jsx
import { renderBoolean } from "fat-design/TablePro";

// 在列配置中使用
{
  title: '是否启用',
  dataIndex: 'enabled',
  cell: renderBoolean
}
```

### renderOperationCell - 操作按钮渲染
```jsx
import { renderOperationCell } from "fat-design/TablePro";

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
        disabled: !hasDeletePermission,
        tooltip: hasDeletePermission ? '' : '无删除权限',
        onClick: () => handleDelete(record)
      }
    ], {
      max: 3, // 最多显示3个按钮，超出显示"更多"
      size: 'small'
    });
  }
}
```

### renderMultiFieldCell - 多字段渲染
```jsx
import { renderMultiFieldCell } from "fat-design/TablePro";

{
  title: '详细信息',
  cell: (value, index, record) => {
    return renderMultiFieldCell([
      '简单文本内容',
      {title: '姓名', content: record.name},
      {title: '年龄', content: record.age},
      {title: '地址', content: record.address, display: record.showAddress}
    ]);
  }
}
```

## API

### useTablePro 参数

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| onQuery | function | - | 查询数据回调函数 |
| autoFirstQuery | boolean | true | 是否自动执行首次查询 |
| isReadyToFirstQuery | function | - | 首次查询准备状态检查 |
| isEnableRowSelection | boolean | true | 是否启用行选择 |
| isEnableCrossPageRowSelection | boolean | false | 是否启用跨页选择 | 
| isEnableFrontendPagination | boolean | false | 是否启用前端分页 |
| initFormProps | object | - | 查询表单初始配置 |
| initTableProps | object | - | 表格初始配置 |
| initPaginationProps | object | - | 分页初始配置 |
| initFilterProps | object | - | 筛选器初始配置 |
| initOperationProps | object | - | 操作栏初始配置 |

### onQuery 回调参数

```jsx
onQuery: (formParams, otherParams) => {
  // formParams: 查询表单的值
  // otherParams: { current, pageSize, filterValue, ...其他参数 }
  
  return Promise.resolve({
    total: 100,        // 总条数
    dataSource: []     // 数据数组
  });
}
```

### TablePro Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| settingName | string | - | 表格设置存储名称（必填） |
| className | string | - | 自定义类名 |
| stickyLock | boolean | false | 锁定列是否粘性定位 |
| styleMode | string | - | 样式模式 |

### 操作按钮配置

```tsx
interface OperateCellItemProps {
  title: string;           // 按钮文本
  disabled?: boolean;      // 是否禁用
  tooltip?: string;        // 提示信息
  operationCode?: string;  // 操作权限码
  onClick?: (btnItem: OperateCellItemProps) => void; // 点击回调
}
```

### 筛选器配置

```tsx
interface FilterProps {
  defaultValue: string;    // 默认选中值
  dataSource: Array<{
    label: string;         // 显示文本
    value: string;         // 值
    count?: number;        // 数量（可选）
  }>;
}
```

## 完整示例

```jsx
import React, { useRef } from 'react';
import { TablePro, PageCard, Dialog, Message } from 'fat-design';

const { 
  useTablePro, 
  renderOperationCell, 
  renderTime, 
  renderBoolean,
  renderMultiFieldCell 
} = TablePro;

function CompleteTableProDemo() {
  const propsRef = useRef();

  // 模拟数据源
  const generateMockData = (formParams, otherParams) => {
    const { current = 1, pageSize = 10 } = otherParams;
    const { username1 = '', username2 = '' } = formParams;
    
    const data = [];
    for (let i = 0; i < pageSize; i++) {
      data.push({
        id: `${current}_${i}`,
        name: `用户${current}_${i}`,
        title: {
          name: `标题 ${username1} ${username2} ${i}`
        },
        time: Date.now() + i * 1000,
        enabled: i % 2 === 0,
        status: i % 3,
        suggestion: `建议内容${i}`,
        reason: `原因${i}`,
        count: i + 1
      });
    }
    return data;
  };

  const handleEdit = (record) => {
    Dialog.showForm({
      title: '编辑用户',
      formProps: {
        defaultValues: {
          name: record.name,
          enabled: record.enabled
        },
        schema: {
          type: 'object',
          properties: {
            name: {
              label: '姓名',
              component: 'Input',
              required: true,
              xProps: { hasClear: true }
            },
            enabled: {
              label: '启用状态',
              component: 'Switch'
            }
          }
        }
      },
      onOk: ({ formValues }) => {
        console.log('更新数据:', formValues);
        Message.success('更新成功');
        // 刷新表格
        propsRef.current.actions.doQuery();
        return Promise.resolve();
      }
    });
  };

  const handleDelete = (record) => {
    Dialog.confirm({
      title: '确认删除',
      content: `确定要删除用户 "${record.name}" 吗？`,
      onOk: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            Message.success('删除成功');
            propsRef.current.actions.doQuery();
            resolve();
          }, 1000);
        });
      }
    });
  };

  const handleBatchDelete = () => {
    const selectedRows = propsRef.current.selectedRows;
    if (!selectedRows.length) {
      Message.warning('请先选择要删除的数据');
      return;
    }

    Dialog.confirm({
      title: '批量删除',
      content: `确定要删除选中的 ${selectedRows.length} 条数据吗？`,
      onOk: () => {
        console.log('批量删除:', selectedRows);
        Message.success('批量删除成功');
        propsRef.current.actions.doQuery();
        return Promise.resolve();
      }
    });
  };

  propsRef.current = useTablePro({
    // 开启跨页选择
    isEnableCrossPageRowSelection: true,

    // 查询表单配置
    initFormProps: {
      labelAlign: 'top',
      defaultValues: {
        username1: 'AAA',
      },
      schema: {
        type: 'object',
        properties: {
          username1: {
            label: '名字1',
            component: 'Input',
            required: true,
            xProps: { hasClear: true }
          },
          username2: {
            label: '下拉框2',
            component: 'Select',
            enums: [
              {label: 'Label A', value: 'AAA'},
              {label: 'Label B', value: 'BBB'}
            ]
          },
          dateRange: {
            label: '日期范围',
            component: 'DatePickerRangePicker'
          },
          status: {
            label: '状态',
            component: 'Select',
            enums: [
              {label: '全部', value: ''},
              {label: '启用', value: '1'},
              {label: '禁用', value: '0'}
            ]
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
      title: '用户管理列表',
      primaryKey: 'id',
      fixedHeader: true,
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          width: '100px',
          lock: 'left'
        },
        {
          title: '姓名',
          dataIndex: 'name',
          width: '120px',
          sortable: true
        },
        {
          title: '标题',
          dataIndex: 'title.name',
          width: '200px',
          tips: "这是标题列的提示"
        },
        {
          title: '创建时间',
          dataIndex: 'time',
          width: '180px',
          cell: renderTime
        },
        {
          title: '启用状态',
          dataIndex: 'enabled',
          width: '100px',
          cell: renderBoolean
        },
        {
          title: '详细信息',
          dataIndex: 'detail',
          width: '300px',
          cell: (value, index, record) => {
            return renderMultiFieldCell([
              {content: '基本信息展示'},
              {title: '建议', content: record.suggestion},
              {title: '原因', content: record.reason},
              {title: '状态', content: record.status === 0 ? '待处理' : record.status === 1 ? '处理中' : '已完成'},
              {title: '次数', content: record.count},
            ]);
          }
        },
        {
          title: '操作',
          dataIndex: 'actions',
          width: '200px',
          lock: 'right',
          cell: (value, index, record) => {
            return renderOperationCell([
              {
                title: '查看详情',
                onClick: () => {
                  Dialog.show({
                    title: '用户详情',
                    content: `用户 ${record.name} 的详细信息`,
                    footer: false
                  });
                }
              },
              {
                title: '编辑',
                onClick: () => handleEdit(record)
              },
              {
                title: '删除',
                onClick: () => handleDelete(record)
              }
            ], {
              max: 2,
              size: 'small'
            });
          }
        }
      ]
    },

    // 筛选器配置
    initFilterProps: {
      defaultValue: 'ALL',
      dataSource: [
        {label: '全部', value: 'ALL', count: 50},
        {label: '启用', value: 'enabled', count: 30},
        {label: '禁用', value: 'disabled', count: 20},
      ]
    },

    // 操作栏配置
    initOperationProps: {
      buttons: [
        {
          text: '新增用户',
          icon: 'add',
          type: 'primary',
          onClick: () => {
            Dialog.showForm({
              title: '新增用户',
              formProps: {
                schema: {
                  type: 'object',
                  properties: {
                    name: {
                      label: '姓名',
                      component: 'Input',
                      required: true
                    },
                    email: {
                      label: '邮箱',
                      component: 'Input',
                      required: true
                    }
                  }
                }
              },
              onOk: ({ formValues }) => {
                console.log('新增用户:', formValues);
                Message.success('新增成功');
                propsRef.current.actions.doQuery();
                return Promise.resolve();
              }
            });
          }
        },
        {
          text: '批量删除',
          onClick: handleBatchDelete
        },
        {
          text: '更多操作',
          children: [
            {
              text: '导出数据',
              icon: 'download',
              onClick: () => {
                Message.info('导出功能开发中...');
              }
            },
            {
              text: '导入数据',
              icon: 'upload',
              onClick: () => {
                Message.info('导入功能开发中...');
              }
            }
          ]
        },
        {
          text: '设置',
          onClick: 'setting',
          icon: 'set'
        }
      ]
    },

    // 数据查询
    onQuery: (formParams, otherParams) => {
      console.log('查询参数:', formParams, otherParams);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            total: 100,
            dataSource: generateMockData(formParams, otherParams)
          });
        }, 500);
      });
    }
  });

  // 暴露给全局调试用
  window.tableProRef = propsRef.current;

  return (
    <PageCard mode="nobg">
      <TablePro {...propsRef.current} settingName="CompleteTableProDemo" />
    </PageCard>
  );
}

export default CompleteTableProDemo;
```

## 注意事项

1. **settingName 必填**：用于保存用户的表格设置（列宽、排序等）
2. **性能优化**：大数据量时建议使用服务端分页
3. **权限控制**：可以通过 operationCode 配合权限系统控制按钮显示
4. **状态管理**：通过 actions 对象可以主动触发表格刷新等操作
5. **样式定制**：支持通过 CSS 变量和类名进行样式定制
