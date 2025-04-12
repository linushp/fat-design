export interface EditableTableProps {
    prefix: string,
    columns?: any[],
    dataSource?: any[],
    components?: any,
    onRowValueChange?: any,
    actionEmitter?: any,
    isShowAddRow?: boolean,
}

// columns, dataSource, onAddData, components, prefix
export interface SettingTableProps {
    prefix: string,
    columns?: any[],
    dataSource?: any[],
    components?: any,
    onAddData?: any,
}
