# Message 消息提示组件使用文档

## 概述
Message 组件用于全局展示操作反馈信息，支持多种类型的消息提示。

## 基础用法

### 不同类型的消息
```jsx
import { Message, Button, Box } from "fat-design";

function MessageDemo() {
  return (
    <Box direction="row" spacing={20}>
      <Button onClick={() => Message.info('这是一条信息')}>
        Info
      </Button>

      <Button onClick={() => Message.success('操作成功')}>
        Success
      </Button>

      <Button onClick={() => Message.error('操作失败')}>
        Error
      </Button>

      <Button onClick={() => Message.warning('警告信息')}>
        Warning
      </Button>

      <Button onClick={() => Message.loading('加载中...')}>
        Loading
      </Button>

      <Button onClick={() => Message.notice('通知信息')}>
        Notice
      </Button>
    </Box>
  );
}
```

### 自定义配置
```jsx
// 详细配置
Message.info({
  title: 'Hello, Fat Design!',
  content: '这是详细内容',
  duration: 5000,  // 5秒后自动关闭
  closeable: true  // 显示关闭按钮
});

// 自定义图标
Message.open({
  type: 'success',
  iconType: 'smile',
  title: '自定义图标',
  content: '使用自定义图标的消息'
});

// 不自动关闭
Message.info({
  title: '重要提示',
  content: '这条消息不会自动关闭',
  duration: 0,
  closeable: true
});
```

### 控制消息
```jsx
// 关闭当前消息
Message.close();

// 销毁所有消息
Message.destroy();

// 获取消息实例进行控制
const messageInstance = Message.loading('处理中...');
setTimeout(() => {
  messageInstance.hide();
  Message.success('处理完成');
}, 3000);
```

## Message2 增强版本

```jsx
import { Message } from "fat-design";

const Message2 = Message.Message2;

// Message2 提供了更好的交互体验
function Message2Demo() {
  return (
    <Box direction="row" spacing={20}>
      <Button onClick={() => Message2.info('Message2 信息')}>
        Info
      </Button>

      <Button onClick={() => Message2.success('Message2 成功')}>
        Success
      </Button>

      <Button onClick={() => Message2.error('Message2 错误')}>
        Error
      </Button>

      <Button onClick={() => Message2.warning('Message2 警告')}>
        Warning
      </Button>

      <Button onClick={() => Message2.loading('Message2 加载中')}>
        Loading
      </Button>

      <Button onClick={() => Message2.notice('Message2 通知')}>
        Notice
      </Button>

      <Button onClick={() => Message2.open({
        type: 'error',
        iconType: 'smile',
        title: 'Message2 自定义'
      })}>
        Open
      </Button>
    </Box>
  );
}
```

## API

### Message 静态方法

#### Message.info(config | string)
显示信息提示

#### Message.success(config | string)
显示成功提示

#### Message.error(config | string)
显示错误提示

#### Message.warning(config | string)
显示警告提示

#### Message.loading(config | string)
显示加载提示

#### Message.notice(config | string)
显示通知提示

#### Message.open(config)
显示自定义提示

#### Message.close()
关闭当前提示

#### Message.destroy()
销毁所有提示

### 配置项 (config)

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| type | `'success' \| 'warning' \| 'error' \| 'notice' \| 'help' \| 'loading'` | - | 提示类型 |
| title | ReactNode | - | 标题 |
| content | ReactNode | - | 内容 |
| duration | number | 3000 | 显示时长（毫秒），0 表示不自动关闭 |
| closeable | boolean | false | 是否显示关闭按钮 |
| iconType | string \| false | - | 自定义图标类型 |
| size | `'medium' \| 'large'` | 'medium' | 尺寸 |
| shape | `'inline' \| 'addon' \| 'toast'` | 'inline' | 外观 |
| onClose | function | - | 关闭回调 |
| afterClose | function | - | 关闭后回调 |

### 返回值

所有 Message 方法都返回一个对象，包含 `hide()` 方法用于手动关闭：

```jsx
const instance = Message.info('提示信息');
// 手动关闭
instance.hide();
```

## 完整示例

```jsx
import React from 'react';
import { Message, Button, Box, PageCard } from 'fat-design';

const Message2 = Message.Message2;

function CompleteMessageDemo() {
  const showSequentialMessages = () => {
    Message.loading('正在处理...');
    
    setTimeout(() => {
      Message.close();
      Message.info('处理中，请稍候...');
    }, 1000);
    
    setTimeout(() => {
      Message.close();
      Message.success('处理完成！');
    }, 3000);
  };

  const showCustomMessage = () => {
    Message.open({
      type: 'success',
      title: '操作成功',
      content: '您的数据已成功保存到服务器',
      duration: 5000,
      closeable: true,
      iconType: 'smile',
      size: 'large',
      onClose: () => {
        console.log('消息已关闭');
      },
      afterClose: () => {
        console.log('关闭动画完成');
      }
    });
  };

  const showPersistentMessage = () => {
    const instance = Message.info({
      title: '重要通知',
      content: '系统将在30分钟后进行维护，请及时保存您的工作',
      duration: 0,  // 不自动关闭
      closeable: true,
      size: 'large'
    });

    // 30秒后自动关闭
    setTimeout(() => {
      instance.hide();
    }, 30000);
  };

  return (
    <PageCard title="Message 消息提示示例">
      <h3>基础消息类型</h3>
      <Box direction="row" spacing={20} style={{ marginBottom: 20 }}>
        <Button onClick={() => Message.info('这是信息提示')}>
          Info
        </Button>
        <Button onClick={() => Message.success('这是成功提示')}>
          Success
        </Button>
        <Button onClick={() => Message.error('这是错误提示')}>
          Error
        </Button>
        <Button onClick={() => Message.warning('这是警告提示')}>
          Warning
        </Button>
        <Button onClick={() => Message.loading('这是加载提示')}>
          Loading
        </Button>
        <Button onClick={() => Message.notice('这是通知提示')}>
          Notice
        </Button>
      </Box>

      <h3>Message2 增强版本</h3>
      <Box direction="row" spacing={20} style={{ marginBottom: 20 }}>
        <Button onClick={() => Message2.info('Message2 信息')}>
          Info
        </Button>
        <Button onClick={() => Message2.success('Message2 成功')}>
          Success
        </Button>
        <Button onClick={() => Message2.error('Message2 错误')}>
          Error
        </Button>
        <Button onClick={() => Message2.warning('Message2 警告')}>
          Warning
        </Button>
      </Box>

      <h3>高级功能</h3>
      <Box direction="row" spacing={20} style={{ marginBottom: 20 }}>
        <Button onClick={showSequentialMessages}>
          顺序消息
        </Button>
        <Button onClick={showCustomMessage}>
          自定义消息
        </Button>
        <Button onClick={showPersistentMessage}>
          持久消息
        </Button>
      </Box>

      <h3>消息控制</h3>
      <Box direction="row" spacing={20}>
        <Button onClick={() => Message.close()}>
          关闭当前
        </Button>
        <Button onClick={() => Message.destroy()}>
          销毁所有
        </Button>
        <Button onClick={() => {
          Message2.close();
        }}>
          关闭 Message2
        </Button>
        <Button onClick={() => {
          Message2.destroy();
        }}>
          销毁所有 Message2
        </Button>
      </Box>
    </PageCard>
  );
}

export default CompleteMessageDemo;
```

## 使用场景

### 操作反馈
```jsx
// 表单提交反馈
const handleSubmit = async (formData) => {
  const loadingInstance = Message.loading('正在提交...');
  
  try {
    await submitForm(formData);
    loadingInstance.hide();
    Message.success('提交成功');
  } catch (error) {
    loadingInstance.hide();
    Message.error('提交失败：' + error.message);
  }
};

// API 调用反馈
const handleSave = () => {
  return new Promise((resolve, reject) => {
    Message.loading('保存中...');
    
    setTimeout(() => {
      Message.close();
      if (Math.random() > 0.5) {
        Message.success('保存成功');
        resolve();
      } else {
        Message.error('保存失败，请重试');
        reject();
      }
    }, 2000);
  });
};
```

### 系统通知
```jsx
// 连接状态提示
const showConnectionStatus = (isConnected) => {
  if (isConnected) {
    Message.success({
      title: '连接成功',
      content: '已成功连接到服务器',
      duration: 2000
    });
  } else {
    Message.error({
      title: '连接失败',
      content: '无法连接到服务器，请检查网络',
      duration: 0,
      closeable: true
    });
  }
};

// 权限提示
const showPermissionDenied = () => {
  Message.warning({
    title: '权限不足',
    content: '您没有执行此操作的权限，请联系管理员',
    duration: 5000,
    closeable: true
  });
};
```

## 注意事项

1. **消息层级**：Message 会显示在页面最顶层，确保用户能够看到
2. **自动关闭**：默认 3 秒自动关闭，设置 `duration: 0` 可禁用自动关闭
3. **消息队列**：多个消息会按顺序显示，避免同时显示过多消息
4. **内存管理**：及时关闭不需要的消息实例，避免内存泄漏
5. **用户体验**：重要消息建议设置为手动关闭，避免用户错过重要信息