import React from "react";
import { TableProProps, ICellRenderFunc, IUseTableProFunc, IGetTableColumnsBySettingFunc, OperationsProps, TableToolbarProps, IRenderTableToolbar, IRenderOperationCell, IRenderMultiFieldCell } from "./types";
declare class TablePro extends React.Component<TableProProps, any> {
    static TableOperations: React.FC<OperationsProps>;
    static TableToolbar: React.FC<TableToolbarProps>;
    static useTablePro: IUseTableProFunc;
    static getTableColumnsBySetting: IGetTableColumnsBySettingFunc;
    static renderTableToolbar: IRenderTableToolbar;
    static renderOperationCell: IRenderOperationCell;
    static renderMultiFieldCell: IRenderMultiFieldCell;
    static renderJSON: ICellRenderFunc;
    static renderString: ICellRenderFunc;
    static renderDay: ICellRenderFunc;
    static renderTime: ICellRenderFunc;
    static renderThousands: ICellRenderFunc;
    static renderHTML: ICellRenderFunc;
    static renderBoolean: ICellRenderFunc;
    static renderRelativeTime: ICellRenderFunc;
    static renderFileDownload: ICellRenderFunc;
    static renderFileImage: ICellRenderFunc;
    static renderEnumTag: ICellRenderFunc;
    render(): React.JSX.Element;
}
export default TablePro;
