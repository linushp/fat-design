# BalloonConfirm 气泡确认组件

## 使用指南

### 何时使用

气泡式的轻量弹窗，组件继承与Balloon组件，提供确认，取消功能

### 引用方式

```
import { BalloonConfirm } from 'fat-design';
```

## API

### BalloonConfirm

继承Balloon可以参考API

| 参数名     | 说明 | 必填 | 类型  | 默认值 | 备注  |
| ---------- | ----- | ---- | ------------ | ------ | ----------------------- |
| onOk  |  确认按钮点击事件, 返回值Promise对象，会触发loading状态| 否   |  function | () => {} |   |
| okProps  |  确认按钮参数, 继承Button组件  | 否   |  object | | |
| onCancel  |  取消按钮点击事件, 返回false时会取消关闭 | 否   |  object | |  |
| cancelProps  |  取消按钮参数, 继承Button组件 | 否   |  object | |  |
| footer  |  底部内容，设置为 false则不进行显示, 默认展示'[<Button type="primary">确定</Button>, <Button>取消</Button>]' | 否   |  true | | |
| footerAlign  |  按钮对齐方式， 枚举值：'left'，'center'， 'right' | 否   |  'right' | | |
| footerActions  |  指定确定按钮和取消按钮是否存在以及如何排列, 例如：['ok', 'cancel'] | 否   |  'right' | | |
