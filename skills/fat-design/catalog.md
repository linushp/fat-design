# 组件对照（相对 Fusion）

未列出的同名组件：按 Fusion Next 使用。

## Fusion 同名（不要重新发明 API）

`Affix` `Animate` `Avatar` `Badge` `Balloon` `Box` `Breadcrumb` `Button`（基础用法）`Calendar` `Card`（基础用法）`Cascader` `CascaderSelect` `Checkbox` `Collapse` `ConfigProvider` `DatePicker`（v2）`Dialog`（JSX / `show` / `confirm` / `alert`）`Divider` `Drawer` `Dropdown` `Grid` `Icon` `Input` `Loading`（包裹用法）`Menu` `MenuButton` `Message` `Nav` `Notification` `NumberPicker` `Overlay` `Pagination` `Progress` `Radio` `Range` `ResponsiveGrid` `Search` `Select` `Slider` `SplitButton` `Step` `Switch` `Tab` `Table`（基础表格）`Tag` `Timeline` `TimePicker`（v2）`Transfer` `Tree` `TreeSelect` `Upload` `VirtualList`

## 本库替换 / 新增

| 组件 | 相对 Fusion |
|------|-------------|
| `Form` | **整份替换**为 form2，见 form2 skill |
| `TablePro` | 新增，列表页标准方案 |
| `QueryForm` | 新增，基于 form2 的查询表单 |
| `PageCard` | 新增，页面容器 |
| `DetailPage` | 新增，详情页布局 |
| `Filter` | 新增，工具栏分段筛选（不是 Table filter） |
| `EditableTable` | 新增 |
| `SortableList` | 新增，含 `SortableEditableTable` |
| `BatchInput` | 新增 |
| `Comments` | 新增 |
| `Image` | 新增（预览组） |
| `Empty` | 新增 |
| `Skeleton` | 新增 |
| `BalloonConfirm` / `PopConfirm` | 新增，确认气泡 |
| `Dialog.showForm` 等 | 在 Fusion `Dialog.show` 之上扩展，见 [dialog.md](./dialog.md) |

## 小差异（同名但多了能力）

见 [extras.md](./extras.md)：`Card collapsible`、`Button.SaveButton`、`Button.tooltip`、`Loading.showLoading`、`Table` 列 `cell` 第 4 参 `context`、`Drawer.show`。
