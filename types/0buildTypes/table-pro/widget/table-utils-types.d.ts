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
