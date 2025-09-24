# Button 按钮组件使用文档

## 概述
Button 组件是 Fat Design 中的基础按钮组件，提供多种类型和样式的按钮支持，包括普通按钮、操作按钮和保存按钮。

## 基础用法

### 基本按钮类型
```jsx
import { Button, Box } from "fat-design";

function BasicButtons() {
  return (
    <Box direction="row" spacing={20}>
      <Button type="normal">Normal</Button>
      <Button type="primary">Primary</Button>
      <Button type="secondary">Secondary</Button>
    </Box>
  );
}
```

### 文本按钮
```jsx
function TextButtons() {
  return (
    <Box direction="row" spacing={20}>
      <Button type="normal" text>Normal</Button>
      <Button type="primary" text>Primary</Button>
      <Button type="secondary" text>Secondary</Button>
    </Box>
  );
}
```

### 警告按钮
```jsx
function WarningButtons() {
  return (
    <Box direction="row" spacing={20}>
      <Button type="normal" warning>Normal Warning</Button>
      <Button type="primary" warning>Primary Warning</Button>
    </Box>
  );
}
```

### 按钮尺寸
```jsx
function ButtonSizes() {
  return (
    <Box direction="row" spacing={20}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </Box>
  );
}
```

### 加载状态
```jsx
function LoadingButtons() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Box direction="row" spacing={20}>
      <Button loading={loading} onClick={handleClick}>
        {loading ? '加载中...' : '点击加载'}
      </Button>
      <Button loading={true}>
        始终加载中
      </Button>
    </Box>
  );
}
```

## 高级组件

### ActionButton - 动作按钮
ActionButton 支持二次确认功能，适用于重要操作。

```jsx
import { Button } from "fat-design";

const { ActionButton } = Button;

function ActionButtonDemo() {
  const handleAction = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('操作完成');
        resolve();
      }, 2000);
    });
  };

  return (
    <Box direction="row" spacing={20}>
      {/* 对话框确认 */}
      <ActionButton 
        type="primary"
        doubleConfirm
        onClick={handleAction}
      >
        二次确认（对话框）
      </ActionButton>

      {/* 气泡确认 */}
      <ActionButton 
        type="secondary"
        doubleConfirm
        doubleConfirmConfig={{type: 'balloon'}}
        onClick={handleAction}
      >
        二次确认（气泡）
      </ActionButton>

      {/* 无确认 */}
      <ActionButton type="primary" onClick={handleAction}>
        无确认
      </ActionButton>

      {/* 自定义确认配置 */}
      <ActionButton 
        type="primary"
        doubleConfirm
        doubleConfirmConfig={{
          type: 'dialog',
          title: '自定义标题',
          content: '确定要执行此操作吗？'
        }}
        loadingMessage="处理中..."
        successMessage="操作成功完成"
        onClick={handleAction}
      >
        自定义确认
      </ActionButton>
    </Box>
  );
}
```

### SaveButton - 保存按钮
SaveButton 是专门用于保存操作的按钮，具有内置的保存状态处理和快捷键支持。

```jsx
const { SaveButton } = Button;

function SaveButtonDemo() {
  const handleSave = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('保存完成');
        resolve();
      }, 2000);
    });
  };

  return (
    <Box direction="row" spacing={20}>
      <SaveButton type="primary" onClick={handleSave}>
        保存按钮
      </SaveButton>

      <SaveButton 
        type="secondary" 
        onClick={handleSave}
        loadingMessage="正在保存..."
        successMessage="保存成功"
      >
        自定义提示
      </SaveButton>

      <SaveButton 
        type="primary" 
        onClick={handleSave}
        loadingMessage={false}  // 不显示加载提示
        successMessage={false}  // 不显示成功提示
      >
        无提示保存
      </SaveButton>
    </Box>
  );
}
```

## API

### Button Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| type | `'primary' \| 'secondary' \| 'normal'` | 'normal' | 按钮类型 |
| size | `'small' \| 'medium' \| 'large'` | 'medium' | 按钮尺寸 |
| htmlType | `'submit' \| 'reset' \| 'button'` | 'button' | 原生 button 的 type 值 |
| component | `'button' \| 'a' \| React.ComponentType` | 'button' | 设置标签类型 |
| loading | boolean | false | 设置按钮载入状态 |
| ghost | boolean \| `'light' \| 'dark'` | false | 是否为幽灵按钮 |
| text | boolean | false | 是否为文本按钮 |
| warning | boolean | false | 是否为警告按钮 |
| disabled | boolean | false | 是否禁用 |
| onClick | function | - | 点击按钮的回调 |
| href | string | - | 点击跳转的地址，指定此属性 button 的行为和 a 链接一致 |
| target | string | - | 相当于 a 链接的 target 属性，href 存在时生效 |
| iconSize | number \| string | - | 按钮中 Icon 的尺寸 |
| icons | object | - | 按钮中的图标 |

### ActionButton Props
继承 Button 的所有属性，额外支持：

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| doubleConfirm | boolean | false | 是否启用二次确认 |
| doubleConfirmConfig | object | - | 二次确认配置 |
| actionParams | any | - | 操作按钮额外携带的参数 |
| loadingMessage | string \| boolean | - | 操作中提示文案 |
| successMessage | string \| boolean | - | 成功提示文案 |

### SaveButton Props
继承 Button 的所有属性，额外支持：

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| actionParams | any | - | 操作按钮额外携带的参数 |
| loadingMessage | string \| boolean | '保存中...' | 保存中提示文案 |
| successMessage | string \| boolean | - | 保存成功提示文案 |

### 二次确认配置 (doubleConfirmConfig)

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| type | `'dialog' \| 'balloon'` | 'dialog' | 确认方式 |
| title | ReactNode | - | 确认标题 |
| content | ReactNode | - | 确认内容 |

## 事件处理

### 异步操作支持
Button 组件支持异步操作，onClick 函数可以返回 Promise：

```jsx
const handleAsyncClick = async () => {
  try {
    await someAsyncOperation();
    Message.success('操作成功');
  } catch (error) {
    Message.error('操作失败：' + error.message);
  }
};

<Button onClick={handleAsyncClick}>异步操作</Button>
```

### 快捷键支持
SaveButton 自动监听 Ctrl+S 快捷键：

```jsx
// SaveButton 会自动响应 Ctrl+S 快捷键
<SaveButton onClick={handleSave}>保存</SaveButton>
```

## 完整示例

```jsx
import React, { useState } from 'react';
import { Button, Box, PageCard, Message } from 'fat-design';

const { ActionButton, SaveButton } = Button;

function CompleteButtonDemo() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSave = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.3) {
          resolve();
        } else {
          reject(new Error('保存失败，请重试'));
        }
      }, 2000);
    });
  };

  const handleDelete = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        Message.success('删除成功');
        resolve();
      }, 1000);
    });
  };

  const handleAsyncOperation = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      Message.success('异步操作成功');
    } catch (error) {
      Message.error('操作失败');
    } finally {
      setLoading(false);
    }
  };

  const handleLinkClick = () => {
    window.open('https://github.com', '_blank');
  };

  return (
    <PageCard title="Button 按钮组件示例">
      {/* 基础按钮 */}
      <h3>基础按钮</h3>
      <Box direction="row" spacing={20} style={{ marginBottom: 30 }}>
        <Button type="normal">Normal</Button>
        <Button type="primary">Primary</Button>
        <Button type="secondary">Secondary</Button>
        <Button disabled>Disabled</Button>
      </Box>

      {/* 文本按钮 */}
      <h3>文本按钮</h3>
      <Box direction="row" spacing={20} style={{ marginBottom: 30 }}>
        <Button type="normal" text>Normal Text</Button>
        <Button type="primary" text>Primary Text</Button>
        <Button type="secondary" text>Secondary Text</Button>
      </Box>

      {/* 警告按钮 */}
      <h3>警告按钮</h3>
      <Box direction="row" spacing={20} style={{ marginBottom: 30 }}>
        <Button type="normal" warning>Normal Warning</Button>
        <Button type="primary" warning>Primary Warning</Button>
      </Box>

      {/* 不同尺寸 */}
      <h3>按钮尺寸</h3>
      <Box direction="row" spacing={20} style={{ marginBottom: 30 }}>
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
      </Box>

      {/* 加载状态 */}
      <h3>加载状态</h3>
      <Box direction="row" spacing={20} style={{ marginBottom: 30 }}>
        <Button loading={loading} onClick={handleAsyncOperation}>
          {loading ? '处理中...' : '异步操作'}
        </Button>
        <Button loading={true}>始终加载中</Button>
      </Box>

      {/* ActionButton */}
      <h3>ActionButton - 操作按钮</h3>
      <Box direction="row" spacing={20} style={{ marginBottom: 30 }}>
        <ActionButton 
          type="primary"
          doubleConfirm
          onClick={handleSave}
          loadingMessage="保存中..."
          successMessage="保存成功"
        >
          二次确认（对话框）
        </ActionButton>

        <ActionButton 
          type="secondary"
          doubleConfirm
          doubleConfirmConfig={{
            type: 'balloon',
            title: '确认删除',
            content: '删除后无法恢复'
          }}
          onClick={handleDelete}
        >
          二次确认（气泡）
        </ActionButton>

        <ActionButton 
          type="primary" 
          warning
          doubleConfirm
          doubleConfirmConfig={{
            type: 'dialog',
            title: '危险操作',
            content: '此操作不可撤销，确定继续吗？'
          }}
          onClick={() => {
            return new Promise((resolve) => {
              setTimeout(() => {
                Message.warning('危险操作已执行');
                resolve();
              }, 1000);
            });
          }}
        >
          危险操作
        </ActionButton>
      </Box>

      {/* SaveButton */}
      <h3>SaveButton - 保存按钮</h3>
      <Box direction="row" spacing={20} style={{ marginBottom: 30 }}>
        <SaveButton type="primary" onClick={handleSave}>
          保存（支持 Ctrl+S）
        </SaveButton>

        <SaveButton 
          type="secondary" 
          onClick={handleSave}
          loadingMessage="正在保存数据..."
          successMessage="数据保存成功"
        >
          自定义提示
        </SaveButton>

        <SaveButton 
          type="primary" 
          onClick={handleSave}
          loadingMessage={false}
          successMessage={false}
        >
          无提示保存
        </SaveButton>
      </Box>

      {/* 链接按钮 */}
      <h3>链接样式</h3>
      <Box direction="row" spacing={20} style={{ marginBottom: 30 }}>
        <Button 
          component="a"
          href="https://github.com"
          target="_blank"
          type="primary"
        >
          外部链接
        </Button>

        <Button 
          type="primary"
          text
          onClick={handleLinkClick}
        >
          程序跳转
        </Button>
      </Box>

      {/* 组合使用 */}
      <h3>表单操作示例</h3>
      <div style={{ 
        padding: '20px', 
        background: '#f5f5f5', 
        borderRadius: '6px',
        marginBottom: '20px'
      }}>
        <div style={{ marginBottom: '15px' }}>
          <label>姓名：</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            style={{ marginLeft: '10px', padding: '4px 8px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>邮箱：</label>
          <input 
            type="email" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            style={{ marginLeft: '10px', padding: '4px 8px' }}
          />
        </div>
        
        <Box direction="row" spacing={10}>
          <SaveButton 
            type="primary"
            onClick={handleSave}
            disabled={!formData.name || !formData.email}
          >
            保存表单
          </SaveButton>
          
          <Button 
            onClick={() => setFormData({ name: '', email: '' })}
          >
            重置
          </Button>
          
          <ActionButton 
            warning
            doubleConfirm
            doubleConfirmConfig={{
              title: '确认取消',
              content: '取消后将丢失所有修改'
            }}
            onClick={() => {
              setFormData({ name: '', email: '' });
              return Promise.resolve();
            }}
          >
            取消
          </ActionButton>
        </Box>
      </div>
    </PageCard>
  );
}

export default CompleteButtonDemo;
```

## 使用场景

### 表单提交
```jsx
function FormSubmitExample() {
  const handleSubmit = async (formData) => {
    try {
      await submitForm(formData);
      Message.success('提交成功');
    } catch (error) {
      Message.error('提交失败：' + error.message);
    }
  };

  return (
    <SaveButton 
      type="primary"
      onClick={() => handleSubmit(formData)}
      loadingMessage="提交中..."
      successMessage="提交成功"
    >
      提交表单
    </SaveButton>
  );
}
```

### 危险操作确认
```jsx
function DangerousActionExample() {
  const handleDelete = () => {
    return deleteResource().then(() => {
      Message.success('删除成功');
      // 刷新列表
      refreshList();
    });
  };

  return (
    <ActionButton 
      type="primary"
      warning
      doubleConfirm
      doubleConfirmConfig={{
        type: 'dialog',
        title: '确认删除',
        content: '删除后数据无法恢复，确定要删除吗？'
      }}
      onClick={handleDelete}
    >
      删除数据
    </ActionButton>
  );
}
```

## 注意事项

1. **异步操作**：ActionButton 和 SaveButton 会自动处理 loading 状态
2. **二次确认**：使用 doubleConfirm 时，需要用户确认后才会执行 onClick
3. **快捷键**：SaveButton 自动支持 Ctrl+S 快捷键
4. **无障碍性**：按钮支持键盘导航和屏幕阅读器
5. **性能考虑**：避免在循环中使用复杂的 onClick 处理函数