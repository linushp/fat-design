import React from "react";


export enum StyleModeEnum {
    simple = 'simple'
}


export  interface QueryFormTableSlots {
    renderAfterQueryForm: any
}

export interface TableProProps {
    className?: string,
    settingName: string, // 所有设置相关的存储，用此name作为唯一标记
    prefix: string,
    components: any, //{}
    formProps: any,
    tableProps: any,
    paginationProps: any,
    filterProps: any,
    operationProps: OperationsProps,
    slots?: QueryFormTableSlots,
    actions?: any
    styleMode: StyleModeEnum;
    stickyLock?: boolean;
}



export type FnOnQuery = (formValues: any, otherValue: any) => any;


export interface IUseTableProParams {
    onQuery?: FnOnQuery; // 查询函数

    autoFirstQuery?: boolean,
    isReadyToFirstQuery?: FnOnQuery, // 判断是否可以进行第一次查询
    isEnableRowSelection?: boolean,
    isEnableCrossPageRowSelection?: boolean, // 是否开启跨页行选择
    isEnableFrontendPagination?: boolean, // 是否开启前端分页，开启前端分页后。点击分页不会再发起请求。

    initFormProps?: any,
    initTableProps?: any,
    initPaginationProps?: any,
    initFilterProps?: any,
    initOperationProps?: any
}

export interface OperationBtnItem {
    size?: string;
    icon?: string;
    text?: string;
    type?: string;
    tooltip?: any;
    onClick?: any | string; //函数 或内置函数
    children?: OperationBtnItem[]
}

export interface OperationsProps {
    prefix: string,
    spacing?: number,
    buttons: OperationBtnItem[],
    actions?: any
}

export interface OperateCellProps {
    prefix?: string;
    max?: number;
    size?: any;
    operationItems?: OperateCellItemProps[];
    direction?: "row" | "column" | "row-reverse";
    wrap?: boolean;
    spacing?: number;
    operationPerms?: string[]; // 当前有哪些权限。 判断算法：operationPerms.includes(operationCode)
}


export type onClickOperateCellItem = (btnItem: OperateCellItemProps) => void;

export interface OperateCellItemProps extends Record<string, any> {
    title: string;
    operationCode?: string; // 操作码，根据此过滤。。
    onClick?: onClickOperateCellItem; //点击函数
}


export interface TableToolbarProps {
    title?: string,
    totalCount?: number | string,
    filterProps?: any,
    operationProps?: any,
    prefix?: string,
    actions?: any,
    components?: any
}

export interface MultiFieldCellItem {
    content?: any;
    title?: any;
    display?: boolean;
}

export type MultiFieldCellItem2 = MultiFieldCellItem | string | boolean | number;

export interface MultiFieldCellProps {
    itemList: MultiFieldCellItem2[];
    prefix: any;
}


export type IGetTableColumnsBySettingFunc = (tableProProps: TableProProps)=> Promise<any[]>;
export type IUseTableProFunc = (params: IUseTableProParams) => any;
export type ICellRenderFunc = (value: any) => React.JSX.Element;
export type IRenderTableToolbar =  (props: TableToolbarProps) => any;
export type IRenderOperationCell = (operationItems: OperateCellItemProps[], others?: OperateCellProps) => any;
export type IRenderMultiFieldCell = (itemList: MultiFieldCellItem2[]) => any;