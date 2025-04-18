import React from "react";
import {TableProInner} from "./table-pro";
import {useTablePro} from "./useTablePro";
import tableUtils from "./widget";
import {
    TableProProps,
    ICellRenderFunc,
    IUseTableProFunc,
    IGetTableColumnsBySettingFunc, OperationsProps,
    TableToolbarProps,
    IRenderTableToolbar,
    IRenderOperationCell,
    IRenderMultiFieldCell
} from "./types";


// TableToolbarProps
class TablePro extends React.Component<TableProProps, any> {

    static TableOperations: React.FC<OperationsProps> = tableUtils.TableOperations;
    static TableToolbar:  React.FC<TableToolbarProps> = tableUtils.TableToolbar;

    static useTablePro: IUseTableProFunc = useTablePro;

    static getTableColumnsBySetting: IGetTableColumnsBySettingFunc = tableUtils.getTableColumnsBySetting;

    static renderTableToolbar: IRenderTableToolbar = tableUtils.renderTableToolbar;
    static renderOperationCell: IRenderOperationCell = tableUtils.renderOperationCell;
    static renderMultiFieldCell: IRenderMultiFieldCell = tableUtils.renderMultiFieldCell;

    static renderJSON: ICellRenderFunc = tableUtils.renderJSON;
    static renderString: ICellRenderFunc = tableUtils.renderString;
    static renderDay: ICellRenderFunc = tableUtils.renderDay;
    static renderTime: ICellRenderFunc = tableUtils.renderTime;
    static renderThousands: ICellRenderFunc = tableUtils.renderThousands;
    static renderHTML: ICellRenderFunc = tableUtils.renderHTML;
    static renderBoolean: ICellRenderFunc = tableUtils.renderBoolean;

    render() {
        return (<TableProInner {...this.props}/>);
    }
}


export default TablePro;
