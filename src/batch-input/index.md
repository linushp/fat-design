# 批量输入

## 使用指南

### 何时使用

主要用于批量单号输入场景，可换行添加或从 Excel 中复制粘贴

### 引用方式

```
import { BatchInput } from 'fat-design'
```

## API

### BatchInput

继承 Input API
| 参数         | 说明                     | 类型                            | 可选值         |
| ------------ | ------------------------ | ------------------------------- | -------------- |
| placeholder  | 输入提示                 | String                          | -              |
| value        | 展示内容, 受控使用       | String                          |                |
| onChange     | 发生改变的时候触发的回调 | Function(value: String) => void | function() { } |
| defaultValue | 默认值                   | String                          |                |
| separator    | 分隔符                   | String                          | ","           |
| isArrayValue | 是否返回值是数组         | Boolean                         | false          |
| max          | 最大个数                | Number                         | -          |
| onOverlayDisappear | 当overlay消失时的回调 | Function(value: String) => void | function() {} | 



## 2022.07.28 更新batch-input功能
# 批量输入

## 使用指南

### 何时使用

主要用于批量单号输入场景，可用换行、","、"，"分隔输入，或从 Excel 中复制粘贴

### 引用方式

```
import { BatchInput } from 'fat-design'
```

## API

### BatchInput

继承 Input API
| 参数         | 说明                     | 类型                            | 可选值         |
| ------------ | ------------------------ | ------------------------------- | -------------- |
| placeholder  | 输入提示                 | String                          | -              |
| value        | 展示内容, 受控使用       | String                          |                |
| onChange     | 发生改变的时候触发的回调 | Function(value: String) => void | function() { } |
| defaultValue | 默认值                   | String                          |                |
| separator    | 分隔符，默认"," "，"                    | String                          |         |
| isArrayValue | 是否返回值是数组         | Boolean                         | false          |
| max    | 最大计数(请输入>0的数字，=0或<0默认无限制） | Number              | -          | 
| onOverlayDisappear | 当overlay消失时的回调 | Function(value: String) => void | function() {} | - |
|target | 计数方式，以输入条数计数"items"，以输入字符数计数"str",默认以输入条数计数 | Enum  | 'str','items'


