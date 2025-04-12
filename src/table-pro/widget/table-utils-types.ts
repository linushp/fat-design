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
