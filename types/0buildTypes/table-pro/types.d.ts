import { OperationsProps } from "./widget/table-utils-types";
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
