import React from "react";
export declare enum StyleModeEnum {
    simple = "simple"
}
export interface QueryFormTableSlots {
    renderAfterQueryForm: any;
}
export interface TableProProps {
    className?: string;
    settingName: string;
    prefix: string;
    components: any;
    formProps: any;
    tableProps: any;
    paginationProps: any;
    filterProps: any;
    operationProps: OperationsProps;
    slots?: QueryFormTableSlots;
    actions?: any;
    styleMode: StyleModeEnum;
    stickyLock?: boolean;
}
export type FnOnQuery = (formValues: any, otherValue: any) => any;
export interface IUseTableProParams {
    onQuery?: FnOnQuery;
    autoFirstQuery?: boolean;
    isReadyToFirstQuery?: FnOnQuery;
    isEnableRowSelection?: boolean;
    isEnableCrossPageRowSelection?: boolean;
    isEnableFrontendPagination?: boolean;
    initFormProps?: any;
    initTableProps?: any;
    initPaginationProps?: any;
    initFilterProps?: any;
    initOperationProps?: any;
}
export interface OperationBtnItem {
    size?: string;
    icon?: string;
    text?: string;
    type?: string;
    tooltip?: any;
    onClick?: any | string;
    children?: OperationBtnItem[];
}
export interface OperationsProps {
    prefix: string;
    spacing?: number;
    buttons: OperationBtnItem[];
    actions?: any;
}
export interface OperateCellProps {
    prefix?: string;
    max?: number;
    size?: any;
    operationItems?: OperateCellItemProps[];
    direction?: "row" | "column" | "row-reverse";
    wrap?: boolean;
    spacing?: number;
    operationPerms?: string[];
}
export type onClickOperateCellItem = (btnItem: OperateCellItemProps) => void;
export interface OperateCellItemProps extends Record<string, any> {
    title: string;
    operationCode?: string;
    onClick?: onClickOperateCellItem;
}
export interface TableToolbarProps {
    title?: string;
    totalCount?: number | string;
    filterProps?: any;
    operationProps?: any;
    prefix?: string;
    actions?: any;
    components?: any;
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
export type IGetTableColumnsBySettingFunc = (tableProProps: TableProProps) => Promise<any[]>;
export type IUseTableProFunc = (params: IUseTableProParams) => any;
export type ICellRenderFunc = (value: any) => React.JSX.Element;
export type IRenderTableToolbar = (props: TableToolbarProps) => any;
export type IRenderOperationCell = (operationItems: OperateCellItemProps[], others?: OperateCellProps) => any;
export type IRenderMultiFieldCell = (itemList: MultiFieldCellItem2[]) => any;
