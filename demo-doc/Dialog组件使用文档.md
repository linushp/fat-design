# Dialog 对话框组件使用文档

## 概述
Dialog 组件是 Fat Design 中的对话框组件，提供多种对话框类型和丰富的交互功能，包括确认对话框、输入对话框、表格对话框等。

## 基础用法

### 确认对话框
```jsx
import { Dialog } from "fat-design";

// 确认对话框
Dialog.confirm({
  title: '请确认标题',
  content: '请确认的内容',
  footerActions: ['ok', 'cancel'],
  onOk() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('确认操作完成');
        resolve();
      }, 300);
    });
  }
});
```

### 不同类型的对话框
```jsx
// 提示对话框
Dialog.alert({
  title: '提示',
  content: '这是一个警告信息',
  onOk() {
    console.log('确认');
  }
});

// 成功对话框
Dialog.success({
  title: '成功',
  content: '操作成功完成'
});

// 错误对话框
Dialog.error({
  title: '错误',
  content: '操作失败'
});

// 警告对话框
Dialog.warning({
  title: '警告',
  content: '请注意相关风险'
});

// 通知对话框
Dialog.notice({
  title: '通知',
  content: '这是一条通知信息'
});

// 帮助对话框
Dialog.help({
  title: '帮助',
  content: '这是帮助信息'
});
```

## 输入对话框

### 单行输入
```jsx
// 单行输入对话框
Dialog.showInput({
  title: '确认审批通过',
  label: '意见',
  placeholder: '请输入审批意见',
  onOk(value) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('输入内容:', value);
        resolve();
      }, 3000);
    });
  }
});

// 带标签对齐的输入框
Dialog.showInput({
  title: '确认审批通过',
  label: '确认审批通过(Are you sure ?)',
  formProps: {
    labelAlign: 'top',
  },
  onOk(value) {
    console.log('输入值:', value);
    return Promise.resolve();
  }
});
```

### 多行输入
```jsx
// 多行输入对话框
Dialog.showInput({
  mode: 'textareaMode',
  title: '确认审批通过',
  label: '请输入审批意见',
  placeholder: '请输入详细的审批意见',
  okText: '审批通过',
  deleteText: '删除',
  footerActions: ['ok', 'cancel', 'delete'],
  topTips: '上方提示文案',
  bottomTips: '下方提示信息',
  onOk(value) {
    console.log('审批意见:', value);
    return Promise.resolve();
  }
});

// 带确认类型的多行输入
Dialog.showInput({
  type: 'confirm',
  title: '确认审批通过',
  mode: 'textareaMode',
  label: '请输入审批意见',
  placeholder: '请输入审批意见??',
  onOk(value) {
    return Promise.resolve();
  }
});
```

### 批量输入
```jsx
// 批量输入对话框
Dialog.showBatchInput({
  title: '批量输入',
  onOk(values) {
    console.log('批量输入内容:', values);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
  }
});
```

## 表格对话框

### 显示表格数据
```jsx
// 小尺寸表格对话框
Dialog.showTable({
  title: '查看日志',
  contentStyle: {
    width: 700,
  },
  tableProProps: {
    isEnableRowSelection: false,
    initPaginationProps: {
      pageSize: 10
    },
    initTableProps: {
      size: 'small',
      fixedHeader: true,
      columns: [
        {title: '姓名', dataIndex: 'id', width: '150px'},
        {title: '标题', dataIndex: 'title.name', width: '180px'},
      ]
    },
    onQuery: (formParams, otherParams) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            total: 100,
            dataSource: mockDataSource(formParams, otherParams)
          });
        }, 500);
      });
    },
  },
});

// 中等尺寸表格对话框
Dialog.showTable({
  title: '查看日志',
  contentStyle: {
    width: 900,
  },
  tableProProps: {
    isEnableRowSelection: false,
    initPaginationProps: {},
    initTableProps: {
      size: 'medium',
      fixedHeader: true,
      columns: [
        {title: '姓名', dataIndex: 'id', width: '150px'},
        {title: '标题', dataIndex: 'title.name', width: '180px'},
      ]
    },
    onQuery: (formParams, otherParams) => {
      return Promise.resolve({
        total: 100,
        dataSource: mockData
      });
    },
  },
});
```

## 表单对话框

```jsx
Dialog.showForm({
  title: '数据字典创建',
  formProps: {
    defaultValues: {
      dict_type: '1'
    },
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 15,
    },
    schema: {
      type: 'object',
      properties: {
        dict_code: {
          label: '字典编码',
          component: 'Input',
          maxLength: 100,
          required: true,
          xProps: {
            hasClear: true
          }
        },
        dict_name: {
          label: '字典名称',
          component: 'Input',
          maxLength: 100,
          required: true,
          xProps: {
            hasClear: true
          }
        },
        dict_type: {
          label: '字典类型',
          component: 'Select',
          required: true,
          enums: [
            {label: '普通', value: '1'},
            {label: '树状', value: '2'}
          ],
          xProps: {
            hasClear: true
          }
        },
        dict_desc: {
          label: '描述',
          component: 'Input.TextArea',
          maxLength: 200,
          xProps: {
            maxLength: 200,
            showLimitHint: true,
            hasClear: true
          }
        }
      }
    }
  },
  contentStyle: {minHeight: 280}
});
```

## 自定义组件对话框

```jsx
const MyComp = ({fnRef, a}) => {
  fnRef.setFn('onOk', () => {
    console.log('fnRef.onOk');
    return false;
  });

  fnRef.setFn('onFormat', () => {
    console.log('fnRef.onFormat');
    return false;
  });

  return <div>{a}</div>;
};

Dialog.showComp({
  xProps: {a: 1, b: 2},
  component: MyComp,
  footerActions: ['ok', 'cancel', 'format'],
  formatProps: {children: '格式化'},
});
```

## 无边框对话框

```jsx
Dialog.show({
  noPadding: true,
  needWrapper: false,
  footer: false,
  style: {width: '500px', height: '300px', border: 'none'},
  closeMode: ['close', 'mask', 'esc'],
  onClose: () => {
    console.log('对话框关闭');
  },
  content: (
    <img 
      style={{width: '500px', height: '300px'}}
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    />
  )
});
```

## API

### Dialog 静态方法

#### Dialog.show(config)
显示自定义对话框

#### Dialog.alert(config)
显示警告对话框

#### Dialog.confirm(config)
显示确认对话框

#### Dialog.success(config)
显示成功对话框

#### Dialog.error(config)
显示错误对话框

#### Dialog.warning(config)
显示警告对话框

#### Dialog.notice(config)
显示通知对话框

#### Dialog.help(config)
显示帮助对话框

### 配置项 (config)

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| title | ReactNode | - | 对话框标题 |
| content | ReactNode | - | 对话框内容 |
| footer | boolean \| ReactNode | true | 底部内容，设置为 false 则不显示 |
| footerActions | string[] | ['ok', 'cancel'] | 底部按钮配置 |
| footerAlign | `'left' \| 'center' \| 'right'` | 'right' | 底部按钮对齐方式 |
| onOk | function | - | 确认按钮回调 |
| onCancel | function | - | 取消按钮回调 |
| onClose | function | - | 对话框关闭回调 |
| closeMode | string[] | ['close', 'mask', 'esc'] | 关闭方式配置 |
| okProps | object | - | 确认按钮属性 |
| cancelProps | object | - | 取消按钮属性 |
| width | string \| number | - | 对话框宽度 |
| height | string \| number | - | 对话框高度 |
| style | object | - | 自定义样式 |
| className | string | - | 自定义类名 |
| noPadding | boolean | false | 是否无内边距 |
| needWrapper | boolean | true | 是否需要包装器 |

### Dialog.showInput(config)

输入对话框特有配置：

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| mode | `'inputMode' \| 'textareaMode'` | 'inputMode' | 输入模式 |
| label | string | - | 输入框标签 |
| placeholder | string | - | 输入框占位符 |
| defaultValue | string | - | 默认值 |
| required | boolean | true | 是否必填 |
| maxLength | number | - | 最大长度 |
| topTips | ReactNode | - | 顶部提示 |
| bottomTips | ReactNode | - | 底部提示 |
| validate | boolean | true | 是否校验 |

### Dialog.showTable(config)

表格对话框特有配置：

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| tableProProps | object | - | TablePro 组件配置 |
| contentStyle | object | - | 内容区域样式 |

### Dialog.showForm(config)

表单对话框特有配置：

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| formProps | object | - | Form 组件配置 |
| contentStyle | object | - | 内容区域样式 |
| validate | boolean | true | 提交时是否校验 |

## 完整示例

```jsx
import React from 'react';
import { Dialog, Button, Message, Box, PageCard } from 'fat-design';

function DialogDemo() {
  const handleShowInput = () => {
    Dialog.showInput({
      title: '请输入审批意见',
      label: '审批意见',
      placeholder: '请输入审批意见',
      mode: 'textareaMode',
      topTips: '请认真填写审批意见',
      bottomTips: '意见将作为审批记录保存',
      onOk(value) {
        if (!value) {
          Message.error('请输入审批意见');
          return Promise.reject();
        }
        return new Promise((resolve) => {
          setTimeout(() => {
            Message.success('审批成功');
            resolve();
          }, 2000);
        });
      }
    });
  };

  return (
    <PageCard>
      <Box direction="row" spacing={20}>
        <Button onClick={() => Dialog.confirm({
          title: '确认删除',
          content: '删除后数据无法恢复，确认删除吗？',
          onOk() {
            return new Promise((resolve) => {
              setTimeout(() => {
                Message.success('删除成功');
                resolve();
              }, 1000);
            });
          }
        })}>
          确认对话框
        </Button>

        <Button onClick={handleShowInput}>
          输入对话框
        </Button>

        <Button onClick={() => Dialog.success({
          title: '操作成功',
          content: '您的操作已成功完成'
        })}>
          成功对话框
        </Button>
      </Box>
    </PageCard>
  );
}

export default DialogDemo;
```

## 注意事项

1. **异步操作**：onOk 回调支持返回 Promise，对话框会自动处理 loading 状态
2. **关闭控制**：可以通过 closeMode 精确控制对话框的关闭方式
3. **样式定制**：支持通过 style、className 等属性进行样式定制
4. **表单校验**：showForm 和 showInput 支持内置的表单校验
5. **内存管理**：对话框关闭后会自动销毁，避免内存泄漏