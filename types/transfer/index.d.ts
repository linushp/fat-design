/// <reference types="react" />

import * as React from 'react';
import CommonProps from '../util';

interface HTMLAttributesWeak extends React.HTMLAttributes<HTMLElement> {
    defaultValue?: any;
    onChange?: any;
}


/**
 * @api TransferDataItem
 */
export type TransferDataItem = {
    label: string | React.ReactNode;
    value: string;
    title?: string;
    disabled?: boolean;
    children?: TransferDataItem[];
    [key: string]: unknown;
};
/**
 * @api PositionType
 */
export type PositionType = 'left' | 'right';

/**
 * @api ExtraOptions
 */
export type ExtraOptions = {
    /**
     * 移动的方向，值为'left'或'right'
     * @en Move direction, 'left' or 'right'
     */
    direction: PositionType;
    /**
     * 左面板值
     * @en Data of left panel
     */
    leftValue: string[];
    /**
     * 左面板数据
     * @en Data of left panel
     */
    leftData: TransferDataItem[];
    /**
     * 发生移动的数据
     * @en Moved data
     */
    movedData: TransferDataItem[];
    /**
     * 发生移动的值
     * @en Moved value
     */
    movedValue: string[];
};

export interface TransferProps extends HTMLAttributesWeak, CommonProps {
    /**
     * 移动选项模式
     */
    mode?: 'normal' | 'simple';

    /**
     * 数据源
     */
    dataSource?: Array<any>;

    /**
     * （用于受控）当前值
     */
    value?: Array<any>;

    /**
     * （用于非受控）初始值
     */
    defaultValue?: Array<any>;

    /**
     * 值发生改变的时候触发的回调函数
     */
    onChange?: (value: Array<any>, data: Array<any>, extra: ExtraOptions) => void;

    /**
     * 是否禁用
     */
    disabled?: boolean;

    /**
     * 是否禁用左侧面板
     */
    leftDisabled?: boolean;

    /**
     * 是否禁用右侧面板
     */
    rightDisabled?: boolean;

    /**
     * 列表项渲染函数
     */
    itemRender?: (data: any) => React.ReactNode;

    /**
     * 左右面板是否显示搜索框
     */
    showSearch?: boolean | boolean[];

    /**
     * 左右面板搜索框配置
     */
    searchProps?: Record<string, any> | Record<string, any>[];

    /**
     * 自定义搜索函数
     */
    filter?: (searchedValue: string, data: any) => boolean;

    /**
     * 搜索框输入时触发的回调函数
     */
    onSearch?: (searchedValue: string, position: string) => void;

    /**
     * 是否开启虚拟滚动
     */
    useVirtual?: boolean;

    /**
     * 搜索框占位符
     */
    searchPlaceholder?: string;

    /**
     * 列表为空显示内容
     */
    notFoundContent?: React.ReactNode | React.ReactNode[];

    /**
     * 左右面板标题
     */
    titles?: Array<any>;

    /**
     * 向右向左移动按钮显示内容
     */
    operations?: Array<any>;

    /**
     * 左面板默认选中值
     */
    defaultLeftChecked?: Array<any>;

    /**
     * 右面板默认选中值
     */
    defaultRightChecked?: Array<any>;

    /**
     * 左右面板列表自定义样式类名
     */
    listClassName?: string;

    /**
     * 左右面板列表自定义样式对象
     */
    listStyle?: React.CSSProperties;

    /**
     * 是否允许拖拽排序
     */
    sortable?: boolean;

    /**
     * 拖拽排序时触发的回调函数
     */
    onSort?: (value: Array<any>, position: string) => void;

    /**
     * 请设置 id 以保证transfer的可访问性
     */
    id?: string;

    /**
     * 是否显示底部全选 checkbox
     * @en Whether show footer's check-all checkbox
     * @defaultValue true
     */
    showCheckAll?: boolean;

    /**
     * 接收 children 自定义渲染列表
     * @en Customer panel
     */
    children?: (props: TransferPanelProps) => React.ReactNode;
}

export default class Transfer extends React.Component<TransferProps, any> {}
