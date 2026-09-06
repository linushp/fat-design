/// <reference types="react" />

import * as React from 'react';
import CommonProps from '../util';
import { ButtonProps } from '../button';
import { OverlayProps } from '../overlay';
import { IUseTableProParams } from "../0buildTypes/table-pro/types";
import { FormProps } from "../0buildTypes/form2/form-types";

export type CloseMode = 'close' | 'mask' | 'esc';
interface HTMLAttributesWeak extends React.HTMLAttributes<HTMLElement> {
    title?: any;
}

export interface IFooterActionsProps {
    onClick?: (event: React.MouseEvent) => void;
    children?: React.ReactNode;
    text?: React.ReactNode;
    className?: string;
}

export interface DialogProps extends Omit<HTMLAttributesWeak, 'content'>, CommonProps {
    /**
     * 是否显示
     */
    visible?: boolean;

    /**
     * 标题
     */
    title?: React.ReactNode;

    /**
     * 内容
     */
    children?: React.ReactNode;

    /**
     * 底部内容，设置为 false，则不进行显示
     */
    footer?: boolean | React.ReactNode;

    /**
     * 底部按钮的对齐方式
     */
    footerAlign?: 'left' | 'center' | 'right';

    /**
     * 指定确定按钮和取消按钮是否存在以及如何排列,<br><br>**可选值**：
     * ['ok', 'cancel']（确认取消按钮同时存在，确认按钮在左）
     * ['cancel', 'ok']（确认取消按钮同时存在，确认按钮在右）
     * ['ok']（只存在确认按钮）
     * ['cancel']（只存在取消按钮）
     */
    footerActions?: Array<string>;

    /**
     * 隐藏时是否保留子节点，不销毁
     */
    cache?: boolean;

    /**
     * 在点击确定按钮时触发的回调函数
     */
    onOk?: (event: React.MouseEvent) => void;

    /**
     * 在点击取消按钮时触发的回调函数
     */
    onCancel?: (event: React.MouseEvent) => void;

    /**
     * 应用于确定按钮的属性对象
     */
    okProps?: ButtonProps;

    /**
     * 应用于取消按钮的属性对象
     */
    cancelProps?: ButtonProps;

    /**
     * [废弃]同closeMode, 控制对话框关闭的方式，值可以为字符串或者布尔值，其中字符串是由以下值组成：
     * **close** 表示点击关闭按钮可以关闭对话框
     * **mask** 表示点击遮罩区域可以关闭对话框
     * **esc** 表示按下 esc 键可以关闭对话框
     * 如 'close' 或 'close,esc,mask'
     * 如果设置为 true，则以上关闭方式全部生效
     * 如果设置为 false，则以上关闭方式全部失效
     */
    closeable?: 'close' | 'mask' | 'esc' | boolean | 'close,mask' | 'close,esc' | 'mask,esc';
    /**
     * [推荐]控制对话框关闭的方式，值可以为字符串或者数组，其中字符串、数组均为以下值的枚举：
     * **close** 表示点击关闭按钮可以关闭对话框
     * **mask** 表示点击遮罩区域可以关闭对话框
     * **esc** 表示按下 esc 键可以关闭对话框
     * 如 'close' 或 ['close','esc','mask'], []
     */
    closeMode?: CloseMode[] | 'close' | 'mask' | 'esc';

    /**
     * 对话框关闭时触发的回调函数
     */
    onClose?: (trigger: string, event: React.MouseEvent) => void;

    /**
     * 对话框关闭后触发的回调函数, 如果有动画，则在动画结束后触发
     */
    afterClose?: () => void;

    /**
     * 是否显示遮罩
     */
    hasMask?: boolean;

    /**
     * 显示隐藏时动画的播放方式
     */
    animation?: any | boolean;

    /**
     * 对话框弹出时是否自动获得焦点
     */
    autoFocus?: boolean;

    /**
     * [v2废弃] 对话框对齐方式, 具体见Overlay文档
     * @deprecated
     */
    align?: string | boolean;
    /**
     * [v2废弃] 当对话框高度超过浏览器视口高度时，是否显示所有内容而不是出现滚动条以保证对话框完整显示在浏览器视口内，该属性仅在对话框垂直水平居中时生效，即 align 被设置为 'cc cc' 时
     * @deprecated
     */
    isFullScreen?: boolean;

    /**
     * [v2废弃] 是否在对话框重新渲染时及时更新对话框位置，一般用于对话框高度变化后依然能保证原来的对齐方式
     * @deprecated
     */
    shouldUpdatePosition?: boolean;

    /**
     * [v2废弃] 对话框距离浏览器顶部和底部的最小间距，align 被设置为 'cc cc' 并且 isFullScreen 被设置为 true 时不生效
     * @deprecated
     */
    minMargin?: number;
    /**
     * 透传到弹层组件的属性对象
     */
    overlayProps?: OverlayProps;

    /**
     * 自定义国际化文案对象
     */
    locale?: {
        ok: string;
        cancel: string;
    };

    /**
     * 对话框的高度样式属性
     */
    height?: string | number;

    /**
     * 对话框头部区域（dialog-header）的样式
     */
    headerStyle?: React.CSSProperties;

    /**
     * 对话框头部区域（dialog-header）的类名
     */
    headerClassName?: string;

    /**
     * 对话框内容区域（dialog-body）的样式
     */
    bodyStyle?: React.CSSProperties;

    /**
     * 对话框内容区域（dialog-body）的类名
     */
    bodyClassName?: string;

    popupContainer?: string | HTMLElement | ((target: HTMLElement) => HTMLElement);
    /**
     * 开启 v2 版本弹窗
     */
    v2?: boolean;
    /**
     * [v2] 定制关闭按钮 icon
     */
    closeIcon?: React.ReactNode;
    /**
     * [v2] 弹窗宽度 v2 生效
     */
    width?: string | number;
    /**
     * [v2] 弹窗上边距。默认 100，设置 centered=true 后默认 40
     */
    top?: number;
    /**
     * [v2] 弹窗下边距, 默认 40
     */
    bottom?: number;
    /**
     * [v2] 对话框高度超过浏览器视口高度时，对话框是否展示滚动条。关闭此功后对话框会随高度撑开页面
     */
    overflowScroll?: boolean;
    /**
     * [v2] 弹窗居中对齐
     */
    centered?: boolean;
    /**
     * [v2] 自定义渲染弹窗
     */
    dialogRender?: (modal: React.ReactNode) => React.ReactNode;
    /**
     * [v2] 最外包裹层 className
     */
    wrapperClassName?: string;

    footerActionsProps?: Record<string, IFooterActionsProps>
}


export interface QuickShowConfigOnOKEvent extends React.MouseEvent {
    formActions?: any;
    formStore?: any;
    formValues?: any;
}

export interface QuickShowConfig extends DialogProps {
    prefix?: string;
    type?: 'alert' | 'confirm';
    messageProps?: object;
    content?: React.ReactNode;
    onOk?: (event: QuickShowConfigOnOKEvent) => any;
    onCancel?: () => void;
    okProps?: object;
    needWrapper?: boolean;
}

export interface QuickShowRet {
    hide: () => void;
}

export interface IUseTableProProps {
    formProps: any,
    tableProps: any,
    paginationProps: any,
    filterProps: any,
    operationProps: any,
    actions: any,
}

export interface ShowTableCfgQuickShowConfigOnOKEvent extends React.MouseEvent  {
    tableProProps: IUseTableProProps
}

export interface IShowTableCfg extends QuickShowConfig {
    tableProProps: IUseTableProParams;
    contentStyle?: any;
    className?: string;
    onOk?: (event: ShowTableCfgQuickShowConfigOnOKEvent) => any;
}

export interface IShowBatchInputCfg extends QuickShowConfig {

    /**
     * 对话框标题
     */
    title?: string;

    /**
     * 输入框placeholder
     */
    placeholder?: string;

    /**
     * 显示内容为空时的文案
     */
    requiredMessage?: string;

    /**
     * 显示数量的文案
     */
    countMessage?: string;

    /**
     * 用于提取正确内容项的正则表达式
     */
    matchPattern?: RegExp;
    /**
     * 顶部自定义提示信息
     */
    topTips?: any;
}


export interface IShowImportFieldMapping {
    source: string, // Excel字段名
    target: string, // 映射成json的字段名
    type: 'string'| 'date' | 'origin', // 数据类型
}


export interface IBatchProcessElementResultList {
    element: any;
    index: number;
    result?: any;
    errorMsg?: string;
}

// onBatchProcessDone({errorCount, successCount, elementResultList }

export interface ITypeOnBatchProcessDoneParam {
    errorCount?: number;
    successCount?: number;
    elementResultList: IBatchProcessElementResultList[]
}

export interface IHandleProcessElementResult {
    success: boolean;
    message?: string; // 错误时的错误信息。
}

/**
 * 函数：批量导入完成事件
 */
export type TypeOnBatchProcessDone = (param: ITypeOnBatchProcessDoneParam)=> Promise<void>;

/**
 * 函数：执行单个导入
 */
export type TypeHandleProcessElement = (elementObj: any)=> Promise<IHandleProcessElementResult>;


/**
 * Excel导入对话框的配置
 */
export interface IShowBatchByExcelCfg extends QuickShowConfig {
    excelTemplateName: string, //字符串：excel导入模板的模板名称。 不能为空
    excelTemplateUrl: string, //字符串：excel导入模板的模板的下载地址URL。 不能为空
    fieldMappingList: IShowImportFieldMapping[], // 字段映射：表格中的表头和我们需要的结构化字段的映射关系

    loadExcelScript: ()=> Promise<void>, //函数：加载window.XLSX使用的脚本文件, 不能为空
    preprocessTableData: (tableData: any[])=> Promise<void>, //函数：导入前校验数据完整性，也可以对数据设置一些字段

    onBatchProcessDone?: TypeOnBatchProcessDone, // 函数：批量处理完成事件
    handleProcessElement: TypeHandleProcessElement, // 函数：执行单个数据处理
    notifyOnError?: boolean, // 出现错误时，是否使用Notification.error直接显示出来。默认为false
    elementDisplayKey?: string, // 出现错误时，用于标识某一条数据的key
}

/**
 * 批处理的一些文案
 */
export interface IShowBatchProcessMsgCfg  {
    confirmMsg?: string; // 确认提示文案。
    processMsg?: string; // 处理中的提示文案
}

/**
 * 批量数据数对话框的配置
 */
export interface IShowBatchProcessCfg extends QuickShowConfig {
    elementList: any[], // 需要被处理的元素列表
    msgCfg?: IShowBatchProcessMsgCfg,

    onBatchProcessDone?: TypeOnBatchProcessDone, // 函数：批量导入完成事件
    handleProcessElement: TypeHandleProcessElement, // 函数：执行单个导入
    notifyOnError?: boolean, // 出现错误时，是否使用Notification.error直接显示出来。默认为false
    elementDisplayKey?: string, // 出现错误时，用于标识某一条数据的key
}


export interface IShowCompCfg extends QuickShowConfig {
    component: any,
    xProps: any,
}

export interface TypeShowFormCfgOnOKParams {
    formActions: any;
    formStore: any;
    formValues: any;
}

export type TypeShowFormCfgOnOK = (p: TypeShowFormCfgOnOKParams, ...args: any) => any;

export interface IShowFormCfg extends QuickShowConfig {
    formProps?: FormProps;
    bottomTips?: any;
    topTips?: any;
    validate?: boolean;
    contentStyle?: any;
    contentClass?: string;
    className?: string;
    slots?: any;
    onOk?: TypeShowFormCfgOnOK
}

export interface TypeShowInputCfgOnOKParams extends TypeShowFormCfgOnOKParams {
    formInputValue: string
}

interface IEnumItem {
    label: string;
    value: any;
}

export type TypeShowInputCfgOnOK = (p:TypeShowInputCfgOnOKParams, ...args: any)=>any;
export type IShowInputCfgMode = 'textareaMode' | 'inputMode';
export interface IShowInputCfg extends IShowFormCfg {
    title?: string;
    label?: string;
    placeholder?: string;
    validate?: boolean;
    required?: boolean;
    requiredMessage?: string;
    maxLength?: number;
    defaultValue?: string;
    mode?: IShowInputCfgMode;
    specialReg?: RegExp;
    onOk?: TypeShowInputCfgOnOK,
    enums? : IEnumItem[], // showAudit有用到
}

export interface IShowTabItem {
    /**
     * Tab key，可不传；未传时自动为 index0、index1…
     */
    key?: string | number;
    title: React.ReactNode;
    content?: React.ReactNode;
    disabled?: boolean;
}

export interface TypeShowTabCfgOnOKParams extends QuickShowConfigOnOKEvent {
    activeKey: string;
    /** 已补齐 key 的 items */
    items: Array<IShowTabItem & {key: string}>;
}

export type TypeShowTabCfgOnOK = (p: TypeShowTabCfgOnOKParams, ...args: any) => any;

export interface IShowTabCfg extends Omit<QuickShowConfig, 'onOk' | 'title' | 'content' | 'onChange'> {
    /**
     * Tab 项列表；item.key 可不传（自动 index0、index1…）
     */
    items: IShowTabItem[];
    /**
     * 默认激活的 Tab key，可不传（默认第一个未禁用项）
     */
    defaultActiveKey?: string | number;
    /**
     * Tab 切换回调
     */
    onChange?: (key: string) => void;
    /**
     * 透传给 Tab 组件的属性
     */
    tabProps?: Record<string, any>;
    /**
     * 是否保留未激活 Tab 的内容（隐藏而非卸载），默认 true
     */
    keepAlive?: boolean;
    /**
     * dialog-body 样式，默认 { padding: 0 }
     */
    bodyStyle?: React.CSSProperties;
    /**
     * 内容区域样式
     */
    contentStyle?: React.CSSProperties;
    /**
     * 内容区域类名
     */
    contentClassName?: string;
    onOk?: TypeShowTabCfgOnOK;
}

export default class Dialog extends React.Component<DialogProps, any> {
    static showComp(config: IShowCompCfg): QuickShowRet;
    static showForm(config: IShowFormCfg): QuickShowRet;
    static showInput(config: IShowInputCfg): QuickShowRet;
    static showAudit(config: IShowInputCfg): QuickShowRet;
    static showTable(config: IShowTableCfg): QuickShowRet;
    static showBatchInput(config: IShowBatchInputCfg): QuickShowRet;
    static showBatchByExcel(config: IShowBatchByExcelCfg): QuickShowRet;
    static showBatchProcess(config: IShowBatchProcessCfg): QuickShowRet;
    static showTab(config: IShowTabCfg): QuickShowRet;
    static confirmPromise(config: QuickShowConfig): Promise<boolean>;
    static show(config: QuickShowConfig): QuickShowRet;
    static alert(config: QuickShowConfig): QuickShowRet;
    static confirm(config: QuickShowConfig): QuickShowRet;
    static success(config: QuickShowConfig): QuickShowRet;
    static error(config: QuickShowConfig): QuickShowRet;
    static warning(config: QuickShowConfig): QuickShowRet;
    static notice(config: QuickShowConfig): QuickShowRet;
    static help(config: QuickShowConfig): QuickShowRet;
}
