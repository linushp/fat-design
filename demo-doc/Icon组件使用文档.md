# Icon 图标组件使用文档

## 概述
Icon 组件提供了一套完整的图标库，涵盖了常用的UI图标，支持多种尺寸和颜色定制。

## 基础用法

### 基本图标
```jsx
import { Icon, Box } from "fat-design";

function BasicIcons() {
  return (
    <Box direction="row" spacing={20}>
      <Icon type="smile" />
      <Icon type="success" />
      <Icon type="error" />
      <Icon type="warning" />
      <Icon type="help" />
    </Box>
  );
}
```

### 不同尺寸
```jsx
function IconSizes() {
  return (
    <Box direction="row" spacing={20}>
      <Icon type="smile" size="xxs" />
      <Icon type="smile" size="xs" />
      <Icon type="smile" size="small" />
      <Icon type="smile" size="medium" />
      <Icon type="smile" size="large" />
      <Icon type="smile" size="xl" />
      <Icon type="smile" size="xxl" />
      <Icon type="smile" size="xxxl" />
    </Box>
  );
}
```

### 自定义尺寸
```jsx
function CustomSize() {
  return (
    <Box direction="row" spacing={20}>
      <Icon type="smile" size={16} />
      <Icon type="smile" size={24} />
      <Icon type="smile" size={32} />
      <Icon type="smile" size={48} />
    </Box>
  );
}
```

## 图标类型

### 表情图标
```jsx
function EmotionIcons() {
  return (
    <Box direction="row" spacing={20}>
      <Icon type="smile" size="xl" />
      <Icon type="cry" size="xl" />
    </Box>
  );
}
```

### 状态图标
```jsx
function StatusIcons() {
  return (
    <Box direction="row" spacing={20}>
      <Icon type="success" size="xl" />
      <Icon type="warning" size="xl" />
      <Icon type="prompt" size="xl" />
      <Icon type="error" size="xl" />
      <Icon type="help" size="xl" />
      <Icon type="clock" size="xl" />
    </Box>
  );
}
```

### 填充状态图标
```jsx
function FilledIcons() {
  return (
    <Box direction="row" spacing={20}>
      <Icon type="success-filling" size="xl" />
      <Icon type="delete-filling" size="xl" />
      <Icon type="favorites-filling" size="xl" />
    </Box>
  );
}
```

### 操作图标
```jsx
function ActionIcons() {
  return (
    <Box direction="row" spacing={20}>
      <Icon type="add" size="xl" />
      <Icon type="minus" size="xl" />
      <Icon type="close" size="xl" />
      <Icon type="search" size="xl" />
      <Icon type="edit" size="xl" />
      <Icon type="copy" size="xl" />
      <Icon type="refresh" size="xl" />
      <Icon type="filter" size="xl" />
    </Box>
  );
}
```

### 方向图标
```jsx
function DirectionIcons() {
  return (
    <Box direction="row" spacing={20}>
      <Icon type="arrow-up" size="xl" />
      <Icon type="arrow-down" size="xl" />
      <Icon type="arrow-left" size="xl" />
      <Icon type="arrow-right" size="xl" />
      <Icon type="arrow-double-left" size="xl" />
      <Icon type="arrow-double-right" size="xl" />
    </Box>
  );
}
```

### 排序图标
```jsx
function SortIcons() {
  return (
    <Box direction="row" spacing={20}>
      <Icon type="sorting" size="xl" />
      <Icon type="descending" size="xl" />
      <Icon type="ascending" size="xl" />
    </Box>
  );
}
```

### 选择图标
```jsx
function SelectIcons() {
  return (
    <Box direction="row" spacing={20}>
      <Icon type="select" size="xl" />
      <Icon type="semi-select" size="xl" />
      <Icon type="switch" size="xl" />
    </Box>
  );
}
```

### 文件操作图标
```jsx
function FileIcons() {
  return (
    <Box direction="row" spacing={20}>
      <Icon type="upload" size="xl" />
      <Icon type="download" size="xl" />
      <Icon type="attachment" size="xl" />
      <Icon type="picture" size="xl" />
    </Box>
  );
}
```

### 系统图标
```jsx
function SystemIcons() {
  return (
    <Box direction="row" spacing={20}>
      <Icon type="set" size="xl" />
      <Icon type="account" size="xl" />
      <Icon type="email" size="xl" />
      <Icon type="lock" size="xl" />
      <Icon type="unlock" size="xl" />
      <Icon type="eye" size="xl" />
      <Icon type="eye-close" size="xl" />
    </Box>
  );
}
```

### 图表图标
```jsx
function ChartIcons() {
  return (
    <Box direction="row" spacing={20}>
      <Icon type="chart-pie" size="xl" />
      <Icon type="chart-bar" size="xl" />
    </Box>
  );
}
```

### 页面类型图标
```jsx
function PageIcons() {
  return (
    <Box direction="row" spacing={20}>
      <Icon type="form" size="xl" />
      <Icon type="detail" size="xl" />
      <Icon type="list" size="xl" />
      <Icon type="dashboard" size="xl" />
    </Box>
  );
}
```

## API

### Icon Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| type | string | - | 图标类型（必填） |
| size | string \| number | 'medium' | 图标尺寸 |
| style | object | - | 自定义样式 |
| className | string | - | 自定义类名 |

### 尺寸选项

| 值 | 描述 | 大小 |
|------|------|------|
| 'xxs' | 超小 | 12px |
| 'xs' | 小 | 16px |
| 'small' | 小 | 20px |
| 'medium' | 中等（默认） | 24px |
| 'large' | 大 | 28px |
| 'xl' | 超大 | 32px |
| 'xxl' | 特大 | 48px |
| 'xxxl' | 巨大 | 64px |
| number | 自定义 | 指定像素值 |

### 图标类型列表

#### 表情类
- `smile` - 笑脸
- `cry` - 哭脸

#### 状态类
- `success` - 成功
- `warning` - 警告
- `prompt` - 提示
- `error` - 错误
- `help` - 帮助
- `clock` - 时钟
- `loading` - 加载中

#### 填充状态类
- `success-filling` - 成功填充
- `delete-filling` - 删除填充
- `favorites-filling` - 收藏填充

#### 操作类
- `add` - 添加
- `minus` - 减少
- `close` - 关闭
- `search` - 搜索
- `edit` - 编辑
- `copy` - 复制
- `refresh` - 刷新
- `filter` - 筛选
- `ellipsis` - 更多

#### 方向类
- `arrow-up` - 向上箭头
- `arrow-down` - 向下箭头
- `arrow-left` - 向左箭头
- `arrow-right` - 向右箭头
- `arrow-double-left` - 双向左箭头
- `arrow-double-right` - 双向右箭头

#### 排序类
- `sorting` - 排序
- `descending` - 降序
- `ascending` - 升序

#### 选择类
- `select` - 选中
- `semi-select` - 半选
- `switch` - 切换

#### 文件类
- `upload` - 上传
- `download` - 下载
- `attachment` - 附件
- `picture` - 图片

#### 系统类
- `set` - 设置
- `account` - 账户
- `email` - 邮件
- `lock` - 锁定
- `unlock` - 解锁
- `eye` - 显示
- `eye-close` - 隐藏
- `toggle-left` - 左切换
- `toggle-right` - 右切换
- `ashbin` - 垃圾桶
- `exit` - 退出
- `atm` - ATM
- `calendar` - 日历

#### 图表类
- `chart-pie` - 饼图
- `chart-bar` - 柱状图

#### 页面类
- `form` - 表单
- `detail` - 详情
- `list` - 列表
- `dashboard` - 仪表盘

## 完整示例

```jsx
import React from 'react';
import { Icon, Box, PageCard } from 'fat-design';

// 所有可用的图标类型
const iconTypes = [
  'smile', 'cry', 'success', 'warning', 'prompt', 'error', 'help', 'clock',
  'success-filling', 'delete-filling', 'favorites-filling', 'add', 'minus',
  'arrow-up', 'arrow-down', 'arrow-left', 'arrow-right', 'arrow-double-left',
  'arrow-double-right', 'switch', 'sorting', 'descending', 'ascending',
  'select', 'semi-select', 'loading', 'search', 'close', 'ellipsis',
  'picture', 'calendar', 'ashbin', 'upload', 'download', 'set', 'edit',
  'refresh', 'filter', 'attachment', 'account', 'email', 'atm', 'copy',
  'exit', 'eye', 'eye-close', 'toggle-left', 'toggle-right', 'lock',
  'unlock', 'chart-pie', 'chart-bar', 'form', 'detail', 'list', 'dashboard'
];

function CompleteIconDemo() {
  return (
    <PageCard title="Icon 图标组件示例">
      <h3>不同尺寸</h3>
      <Box direction="row" spacing={20} style={{ marginBottom: 30 }}>
        <div style={{ textAlign: 'center' }}>
          <Icon type="smile" size="xxs" />
          <div style={{ fontSize: '12px', marginTop: '4px' }}>xxs</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Icon type="smile" size="xs" />
          <div style={{ fontSize: '12px', marginTop: '4px' }}>xs</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Icon type="smile" size="small" />
          <div style={{ fontSize: '12px', marginTop: '4px' }}>small</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Icon type="smile" size="medium" />
          <div style={{ fontSize: '12px', marginTop: '4px' }}>medium</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Icon type="smile" size="large" />
          <div style={{ fontSize: '12px', marginTop: '4px' }}>large</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Icon type="smile" size="xl" />
          <div style={{ fontSize: '12px', marginTop: '4px' }}>xl</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Icon type="smile" size="xxl" />
          <div style={{ fontSize: '12px', marginTop: '4px' }}>xxl</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Icon type="smile" size="xxxl" />
          <div style={{ fontSize: '12px', marginTop: '4px' }}>xxxl</div>
        </div>
      </Box>

      <h3>所有图标</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: '16px',
        marginBottom: '30px'
      }}>
        {iconTypes.map((type, index) => (
          <div key={index} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '12px',
            border: '1px solid #e8e8e8',
            borderRadius: '6px',
            backgroundColor: '#fafafa'
          }}>
            <Icon type={type} size="xl" />
            <span style={{
              fontSize: '12px',
              marginTop: '8px',
              textAlign: 'center',
              wordBreak: 'break-all'
            }}>
              {type}
            </span>
          </div>
        ))}
      </div>

      <h3>彩色图标</h3>
      <Box direction="row" spacing={20} style={{ marginBottom: 30 }}>
        <Icon type="success" size="xl" style={{ color: '#52c41a' }} />
        <Icon type="warning" size="xl" style={{ color: '#faad14' }} />
        <Icon type="error" size="xl" style={{ color: '#f5222d' }} />
        <Icon type="help" size="xl" style={{ color: '#1890ff' }} />
        <Icon type="smile" size="xl" style={{ color: '#722ed1' }} />
      </Box>

      <h3>使用场景示例</h3>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '20px',
        marginBottom: '20px'
      }}>
        <div style={{ padding: '16px', border: '1px solid #e8e8e8', borderRadius: '6px' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon type="form" size="large" />
            表单标题
          </h4>
          <p>带图标的标题示例</p>
        </div>
        
        <div style={{ padding: '16px', border: '1px solid #e8e8e8', borderRadius: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Icon type="success" size="small" style={{ color: '#52c41a' }} />
            <span>操作成功</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Icon type="warning" size="small" style={{ color: '#faad14' }} />
            <span>请注意</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon type="error" size="small" style={{ color: '#f5222d' }} />
            <span>操作失败</span>
          </div>
        </div>
      </div>

      <h3>按钮中的图标</h3>
      <Box direction="row" spacing={20}>
        <button style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '6px',
          padding: '8px 16px',
          border: '1px solid #d9d9d9',
          borderRadius: '4px',
          background: 'white',
          cursor: 'pointer'
        }}>
          <Icon type="add" size="small" />
          <span>新增</span>
        </button>
        
        <button style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '6px',
          padding: '8px 16px',
          border: '1px solid #d9d9d9',
          borderRadius: '4px',
          background: 'white',
          cursor: 'pointer'
        }}>
          <Icon type="edit" size="small" />
          <span>编辑</span>
        </button>
        
        <button style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '6px',
          padding: '8px 16px',
          border: '1px solid #ff4d4f',
          borderRadius: '4px',
          background: '#ff4d4f',
          color: 'white',
          cursor: 'pointer'
        }}>
          <Icon type="delete-filling" size="small" />
          <span>删除</span>
        </button>
      </Box>
    </PageCard>
  );
}

export default CompleteIconDemo;
```

## 使用场景

### 按钮图标
```jsx
function ButtonIconExample() {
  return (
    <Box direction="row" spacing={10}>
      <Button>
        <Icon type="add" size="small" style={{ marginRight: '6px' }} />
        新增
      </Button>
      
      <Button>
        <Icon type="edit" size="small" style={{ marginRight: '6px' }} />
        编辑
      </Button>
      
      <Button warning>
        <Icon type="delete-filling" size="small" style={{ marginRight: '6px' }} />
        删除
      </Button>
    </Box>
  );
}
```

### 状态提示
```jsx
function StatusIconExample() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <Icon type="success" size="small" style={{ color: '#52c41a' }} />
        <span>操作成功</span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <Icon type="warning" size="small" style={{ color: '#faad14' }} />
        <span>注意事项</span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Icon type="error" size="small" style={{ color: '#f5222d' }} />
        <span>错误信息</span>
      </div>
    </div>
  );
}
```

## 注意事项

1. **图标语义**：选择与功能语义匹配的图标类型
2. **尺寸一致**：同一界面中保持图标尺寸的一致性
3. **颜色搭配**：图标颜色应与设计系统保持一致
4. **无障碍性**：为图标提供适当的文字说明
5. **性能考虑**：避免在列表中使用过大的图标