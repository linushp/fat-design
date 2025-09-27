# Button 按钮组件

按钮用于触发操作，是最基础和常用的交互组件。

## 基本使用

```javascript
import React from 'react'
import { Button } from 'fat-design'

function BasicButton() {
  return (
    <div>
      <Button>默认按钮</Button>
      <Button type="primary">主要按钮</Button>
      <Button type="secondary">次要按钮</Button>
    </div>
  )
}
```

## 按钮类型

Fat Design 提供了多种按钮类型：

```javascript
import React from 'react'
import { Button, Box } from 'fat-design'

function ButtonTypes() {
  return (
    <Box direction="row" spacing={10}>
      <Button type="normal">Normal</Button>
      <Button type="primary">Primary</Button>
      <Button type="secondary">Secondary</Button>
    </Box>
  )
}
```

## 文本按钮

使用 `text` 属性创建文本按钮：

```javascript
import React from 'react'
import { Button, Box } from 'fat-design'

function TextButtons() {
  return (
    <Box direction="row" spacing={10}>
      <Button type="normal" text>Normal</Button>
      <Button type="primary" text>Primary</Button>
      <Button type="secondary" text>Secondary</Button>
    </Box>
  )
}
```

## 警告状态

使用 `warning` 属性显示警告状态：

```javascript
import React from 'react'
import { Button, Box } from 'fat-design'

function WarningButtons() {
  return (
    <Box direction="row" spacing={10}>
      <Button type="normal" warning>Normal Warning</Button>
      <Button type="primary" warning>Primary Warning</Button>
    </Box>
  )
}
```

## 高级按钮

### ActionButton 操作按钮

ActionButton 支持二次确认等高级功能：

```javascript
import React from 'react'
import { Button, Box, Message } from 'fat-design'

const { ActionButton, SaveButton } = Button

function AdvancedButtons() {
  const handleSave = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        Message.success('保存成功')
        resolve()
      }, 2000)
    })
  }

  return (
    <Box direction="row" spacing={10}>
      {/* 对话框二次确认 */}
      <ActionButton 
        type="primary"
        doubleConfirm
        onClick={handleSave}
      >
        二次确认（对话框）
      </ActionButton>

      {/* 气泡二次确认 */}
      <ActionButton 
        type="secondary"
        doubleConfirm
        doubleConfirmConfig={{ type: 'balloon' }}
        onClick={handleSave}
      >
        二次确认（气泡）
      </ActionButton>

      {/* 无确认 */}
      <ActionButton 
        type="primary" 
        onClick={handleSave}
      >
        无确认
      </ActionButton>

      {/* 保存按钮 */}
      <SaveButton 
        type="secondary" 
        onClick={handleSave}
      >
        保存按钮
      </SaveButton>
    </Box>
  )
}
```

## API 参考

### Button Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | `'normal' \| 'primary' \| 'secondary'` | `'normal'` | 按钮类型 |
| text | `boolean` | `false` | 是否为文本按钮 |
| warning | `boolean` | `false` | 是否为警告状态 |
| disabled | `boolean` | `false` | 是否禁用 |
| loading | `boolean` | `false` | 是否加载中 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 按钮尺寸 |
| onClick | `() => void` | - | 点击事件回调 |

### ActionButton Props

继承 Button 的所有属性，额外支持：

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| doubleConfirm | `boolean` | `false` | 是否启用二次确认 |
| doubleConfirmConfig | `object` | - | 二次确认配置 |

### SaveButton Props

继承 ActionButton 的所有属性，专为保存操作优化。