# 抽屉 (Drawer)

<cite>
**本文档中引用的文件**   
- [demo-drawer-show.tsx](file://demo/demo-drawer-show.tsx)
- [drawer.jsx](file://src/drawer/drawer.jsx)
- [inner.jsx](file://src/drawer/inner.jsx)
- [show.jsx](file://src/drawer/show.jsx)
- [footer.jsx](file://src/drawer/footer.jsx)
- [index.d.ts](file://types/drawer/index.d.ts)
</cite>

## 目录
1. [简介](#简介)
2. [核心功能与设计目的](#核心功能与设计目的)
3. [API参数详解](#api参数详解)
4. [显隐控制与回调机制](#显隐控制与回调机制)
5. [与Dialog组件的用户体验对比](#与dialog组件的用户体验对比)
6. [实际应用场景](#实际应用场景)
7. [响应式设计优势](#响应式设计优势)
8. [代码示例](#代码示例)

## 简介
抽屉（Drawer）组件是一种从屏幕边缘滑出的侧边面板，常用于移动端或需要保留背景上下文的场景。它提供了一种非模态的交互方式，允许用户在不完全离开当前页面的情况下查看或编辑信息。

## 核心功能与设计目的
抽屉组件的设计目的是为用户提供一种轻量级的交互模式，特别适用于以下场景：
- 移动端空间有限时的信息展示
- 需要保持背景内容可见性的操作
- 快速预览或编辑数据而不中断主流程
- 作为导航菜单的载体

其核心优势在于能够从四个方向（上、右、下、左）滑出，提供灵活的布局选择，并且不会完全遮挡主界面内容。

**Section sources**
- [demo-drawer-show.tsx](file://demo/demo-drawer-show.tsx#L1-L125)
- [drawer.jsx](file://src/drawer/drawer.jsx#L1-L335)

## API参数详解
抽屉组件提供了丰富的配置选项来满足不同的使用需求：

### 基础参数
- **placement**：指定抽屉出现的位置，可选值为 'top'、'right'、'bottom'、'left'，默认为 'right'
- **visible**：控制抽屉的显示状态，布尔值
- **closable**：是否显示关闭按钮，布尔值，默认为 true
- **closeMode**：推荐使用的关闭方式控制，支持数组形式 ['close', 'mask', 'esc']，分别对应点击关闭按钮、点击遮罩层、按下ESC键关闭
- **width/height**：分别在左右和上下方向时控制抽屉尺寸，支持数值或字符串（如 '30vw'）

### 样式与内容参数
- **title**：抽屉标题，支持React节点
- **headerStyle/bodyStyle**：分别为头部和主体区域设置自定义样式
- **content**：抽屉内容区域，支持任意React元素
- **animation**：自定义进出动画，格式为 { in: 'enter-class', out: 'leave-class' }

### 底部操作栏参数
- **footerActions**：指定底部按钮的排列方式，可选 ['ok', 'cancel']、['cancel', 'ok']、['ok']、['cancel']
- **okProps/cancelProps**：分别为确定和取消按钮设置属性对象
- **onOk/onCancel**：对应按钮的点击回调函数

**Section sources**
- [index.d.ts](file://types/drawer/index.d.ts#L1-L122)
- [drawer.jsx](file://src/drawer/drawer.jsx#L50-L150)

## 显隐控制与回调机制
抽屉组件通过 `visible` 属性进行显隐控制，这是一个受控属性，需要配合 `onClose` 回调函数共同使用。

### 显隐控制
```jsx
const [isOpen, setOpen] = useState(false);

<Drawer 
    visible={isOpen}
    onClose={() => setOpen(false)}
>
    内容
</Drawer>
```

### onClose回调触发时机
`onClose` 回调会在以下情况下被触发：
- 用户点击关闭按钮（当closeMode包含'close'时）
- 用户点击遮罩层（当closeMode包含'mask'时）
- 用户按下ESC键（当closeMode包含'esc'时）
- 程序调用setOpen(false)等状态更新方法

回调函数接收两个参数：`reason`（关闭原因字符串）和 `event`（事件对象）。

**Section sources**
- [demo-drawer-show.tsx](file://demo/demo-drawer-show.tsx#L40-L125)
- [drawer.jsx](file://src/drawer/drawer.jsx#L180-L200)

## 与Dialog组件的用户体验对比
| 特性 | 抽屉 (Drawer) | 对话框 (Dialog) |
|------|---------------|----------------|
| **视觉层级** | 从边缘滑入，保留背景上下文 | 模态弹窗，通常居中显示 |
| **交互方式** | 轻量级，适合频繁操作 | 重量级，适合重要确认 |
| **空间占用** | 可配置宽度，不完全遮挡背景 | 通常全屏或大尺寸 |
| **关闭方式** | 支持滑动关闭（移动端） | 主要依赖按钮或点击遮罩 |
| **适用场景** | 表单编辑、详情查看、筛选面板 | 警告提示、重要确认、登录注册 |

抽屉更适合需要保持上下文连续性的操作，而对话框更适合需要用户集中注意力的重要操作。

**Section sources**
- [demo-drawer-show.tsx](file://demo/demo-drawer-show.tsx#L1-L125)
- [demo-dialog-show.tsx](file://demo/demo-dialog-show.tsx#L567-L605)

## 实际应用场景
### 表单编辑场景
当需要编辑复杂表单时，使用抽屉可以避免页面跳转，保持主界面状态：

```jsx
<Drawer 
    title="编辑用户信息"
    placement="right"
    visible={editMode}
    onClose={() => setEditMode(false)}
    footerActions={['ok', 'cancel']}
>
    <UserForm />
</Drawer>
```

### 详情查看场景
在列表页中查看某条记录的详细信息：

```jsx
<Drawer 
    title="订单详情"
    placement="right"
    visible={showDetail}
    onClose={() => setShowDetail(false)}
    width={600}
>
    <OrderDetail order={currentOrder} />
</Drawer>
```

**Section sources**
- [demo-drawer-show.tsx](file://demo/demo-drawer-show.tsx#L40-L125)

## 响应式设计优势
抽屉组件在响应式设计中具有显著优势：
- 在移动端可以充分利用屏幕边缘空间
- 在桌面端可作为侧边栏提供额外功能
- 自动适应不同屏幕尺寸
- 支持RTL（从右到左）布局
- 动画效果在不同设备上保持一致

通过配置不同的 `placement` 和尺寸参数，可以实现跨设备的一致用户体验。

**Section sources**
- [drawer.jsx](file://src/drawer/drawer.jsx#L200-L335)
- [inner.jsx](file://src/drawer/inner.jsx#L1-L120)

## 代码示例
以下是基于 `demo/drawer-show.tsx` 的完整示例：

```jsx
import {useState} from 'react'
import {Drawer, Button, Box, PageCard} from "../src";

function DemoDrawerShow() {
    const [isOpen, setOpen] = useState(false);

    return (
        <div>
            <PageCard>
                <Box direction="row" spacing={20}>
                    <Button onClick={() => {
                        Drawer.show({
                            title:"标题",
                            placement:"right",
                            content:'hello',
                            onClose:()=>console.log('Drawer onClose'),
                            okText:'确认',
                            onOk:() => console.log('ok')
                        });
                    }}>
                        右侧滑出
                    </Button>
                    
                    <Button onClick={() => setOpen(true)}>
                        受控模式
                    </Button>
                </Box>
                
                <Drawer
                    title={'个性化设置'}
                    placement={'right'}
                    visible={isOpen}
                    onClose={()=> setOpen(false)}
                    okProps={{
                        children: '保存',
                        type:'primary'
                    }}
                    footerActions={['ok']}
                >
                    hello
                </Drawer>
            </PageCard>
        </div>
    )
}
```

**Section sources**
- [demo-drawer-show.tsx](file://demo/demo-drawer-show.tsx#L1-L125)