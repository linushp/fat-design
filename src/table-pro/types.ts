import {OperationsProps} from "./widget/table-utils-types";

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
