import React from "react";
import {TableProInner} from "./table-pro";
import {useTablePro} from "./useTablePro";
import tableUtils from "./widget";
import {
    TableProProps,
    ICellRenderFunc,
    IUseTableProFunc,
    IGetTableColumnsBySettingFunc, OperationsProps,
    TableToolbarProps,
    IRenderTableToolbar,
    IRenderOperationCell,
    IRenderMultiFieldCell
} from "./types";
import { IRenderStringExtOptions, IRenderTimeDurationOptions } from "./widget/renderFormats";


// TableToolbarProps
class TablePro extends React.Component<TableProProps, any> {

    /**
     * 表格操作按钮组件
     * 用于渲染表格工具栏中的操作按钮组，支持普通按钮、下拉菜单按钮、带图标按钮等
     * @example <TablePro.TableOperations buttons={[{text: '新增', onClick: handleAdd}]} />
     */
    static TableOperations: React.FC<OperationsProps> = tableUtils.TableOperations;

    /**
     * 表格工具栏组件
     * 包含标题、数据总数、筛选器和操作按钮区域，用于表格顶部的综合工具栏
     * @example <TablePro.TableToolbar title="用户列表" totalCount={100} operationProps={...} />
     */
    static TableToolbar:  React.FC<TableToolbarProps> = tableUtils.TableToolbar;

    /**
     * 表格状态管理 Hook
     * 用于管理表格的查询、分页、筛选、行选择等状态，返回 formProps、tableProps、paginationProps 等配置对象
     * @param params 配置参数，包括 onQuery 查询函数、autoFirstQuery 是否自动首次查询等
     * @returns {formProps, tableProps, paginationProps, filterProps, operationProps, actions}
     * @example const { tableProps, actions } = TablePro.useTablePro({ onQuery: fetchData });
     */
    static useTablePro: IUseTableProFunc = useTablePro;

    /**
     * 根据用户设置的列配置获取表格列
     * 从本地存储读取用户对列的显示/隐藏、排序、锁定等设置，返回处理后的列配置
     * @param tableProProps TablePro 组件的 props
     * @returns 处理后的列配置数组
     * @example const columns = await TablePro.getTableColumnsBySetting(props);
     */
    static getTableColumnsBySetting: IGetTableColumnsBySettingFunc = tableUtils.getTableColumnsBySetting;

    /**
     * 获取用户保存的表格风格设置
     * 从本地存储读取用户保存的表格风格设置（尺寸、斑马纹）
     * @param settingName 设置名称
     * @returns 风格设置对象，如无保存则返回 null
     * @example const styleSetting = await TablePro.getTableStyleBySetting('my-table-setting');
     */
    static getTableStyleBySetting: (settingName: string) => Promise<any> = tableUtils.getTableStyleBySetting;

    /**
     * 渲染表格工具栏
     * 函数式渲染表格工具栏组件，等同于 <TablePro.TableToolbar />
     * @param props 工具栏配置属性
     * @returns React 元素
     */
    static renderTableToolbar: IRenderTableToolbar = tableUtils.renderTableToolbar;

    /**
     * 渲染操作列单元格
     * 用于表格操作列，支持权限过滤、超出数量自动收起到"更多"下拉菜单
     * @param operationItems 操作按钮配置数组
     * @param others 其他配置，如 max 最大显示数量、operationPerms 权限列表
     * @returns React 元素
     * @example TablePro.renderOperationCell([{title: '编辑', onClick: handleEdit}, {title: '删除', onClick: handleDelete}])
     */
    static renderOperationCell: IRenderOperationCell = tableUtils.renderOperationCell;

    /**
     * 渲染多字段单元格
     * 在一个单元格中显示多个字段内容，支持标题和内容的组合显示
     * @param itemList 字段项数组，每项可包含 title、content、display 属性
     * @returns React 元素
     * @example TablePro.renderMultiFieldCell([{title: '姓名', content: '张三'}, {title: '年龄', content: 25}])
     */
    static renderMultiFieldCell: IRenderMultiFieldCell = tableUtils.renderMultiFieldCell;

    /**
     * 渲染 JSON 格式数据
     * 将对象或 JSON 字符串格式化为缩进的 JSON 显示，用于展示复杂数据结构
     * @param value 要渲染的值，支持对象或 JSON 字符串
     * @returns 格式化的 <pre> 元素
     */
    static renderJSON: ICellRenderFunc = tableUtils.renderJSON;

    /**
     * 渲染字符串
     * 将各种类型的值转换为字符串显示，支持数字、字符串、数组、对象等类型
     * @param value 要渲染的值
     * @returns 字符串或占位符
     */
    static renderString: ICellRenderFunc = tableUtils.renderString;

    /**
     * 增强版渲染字符串，支持最大行数限制
     * 超过最大行数时显示省略号，鼠标悬浮时显示 Balloon 提示
     * @param value 要渲染的值
     * @param options 配置项
     * @param options.maxLines 最大显示行数
     * @param options.triggerType 触发方式，hover 或 click，默认 hover
     * @returns React 元素
     */
    static renderStringExt: (value: any, options: IRenderStringExtOptions) => React.JSX.Element = tableUtils.renderStringExt;

    /**
     * 渲染日期（YYYY-MM-DD）
     * 将时间戳或日期字符串格式化为日期显示，支持单个值、数组、JSON 字符串
     * @param value 时间戳、日期字符串或日期数组
     * @returns 格式化的日期字符串
     */
    static renderDay: ICellRenderFunc = tableUtils.renderDay;

    /**
     * 渲染日期（YYYY-MM-DD），自动识别秒级时间戳
     * 与 renderDay 类似，但会自动判断时间戳是秒级还是毫秒级
     * @param value 时间戳、日期字符串或日期数组
     * @returns 格式化的日期字符串
     */
    static renderDayAuto: ICellRenderFunc = tableUtils.renderDayAuto;

    /**
     * 渲染日期时间（YYYY-MM-DD HH:mm:ss）
     * 将时间戳或日期字符串格式化为完整日期时间显示
     * @param value 时间戳、日期字符串或日期数组
     * @returns 格式化的日期时间字符串
     */
    static renderTime: ICellRenderFunc = tableUtils.renderTime;

    /**
     * 渲染日期时间（YYYY-MM-DD HH:mm:ss），自动识别秒级时间戳
     * 与 renderTime 类似，但会自动判断时间戳是秒级还是毫秒级
     * @param value 时间戳、日期字符串或日期数组
     * @returns 格式化的日期时间字符串
     */
    static renderTimeAuto: ICellRenderFunc = tableUtils.renderTimeAuto;

    /**
     * 渲染千分位数字
     * 将数字格式化为带千分位分隔符的字符串，默认保留2位小数
     * @param value 数字或数字字符串
     * @returns 格式化的千分位字符串，如 "1,234.00"
     */
    static renderThousands: ICellRenderFunc = tableUtils.renderThousands;

    /**
     * 渲染 HTML 内容
     * 将字符串作为 HTML 直接渲染，用于显示富文本内容
     * @param value HTML 字符串
     * @returns 包含 HTML 内容的元素
     * @warning 注意 XSS 安全风险，确保内容来源可信
     */
    static renderHTML: ICellRenderFunc = tableUtils.renderHTML;

    /**
     * 渲染布尔值
     * 将布尔值或相关值转换为"是/否"显示
     * @param value 布尔值、Y/N、YES/NO、1/0 等
     * @returns "是" 或 "否"
     */
    static renderBoolean: ICellRenderFunc = tableUtils.renderBoolean;

    /**
     * 渲染相对时间
     * 将日期时间转换为相对时间描述，如"3天前"、"2小时前"
     * @param value 时间戳或日期字符串
     * @returns 相对时间字符串
     */
    static renderRelativeTime: ICellRenderFunc = tableUtils.renderRelativeTime;

    /**
     * 渲染时长
     * 将数值按原数据单位换算后，格式化为指定单位的时长字符串
     * @param value 时长数值
     * @param options 配置项
     * @param options.timeDurationSource 时长原数据格式：ms / second / minute
     * @param options.timeDurationFormatter 时长显示格式：auto / ms / second / minute / hour / day / month / year
     * @param options.isDisplayUnit 是否显示单位，默认 true
     * @returns 格式化的时长字符串
     */
    static renderTimeDuration: (value: any, options?: IRenderTimeDurationOptions) => string = tableUtils.renderTimeDuration;

    /**
     * 渲染文件下载链接
     * 将文件 URL 渲染为可点击的下载链接
     * @param value 文件 URL 或文件信息对象
     * @returns 下载链接元素
     */
    static renderFileDownload: ICellRenderFunc = tableUtils.renderFileDownload;

    /**
     * 渲染文件图片预览
     * 将图片 URL 渲染为可预览的缩略图
     * @param value 图片 URL 或图片信息对象
     * @returns 图片预览元素
     */
    static renderFileImage: ICellRenderFunc = tableUtils.renderFileImage;

    /**
     * 渲染枚举标签
     * 将枚举值渲染为带颜色的标签（Tag），用于状态、类型等枚举字段展示
     * @param value 枚举对象（包含 label 和 style）或枚举数组
     * @returns Tag 组件或标签数组
     * @example TablePro.renderEnumTag({label: '启用', style: 'green'})
     */
    static renderEnumTag: ICellRenderFunc = tableUtils.renderEnumTag;

    render() {
        return (<TableProInner {...this.props}/>);
    }
}


export default TablePro;
