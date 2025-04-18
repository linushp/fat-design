import React from "react";
import {TableProInner} from "./table-pro";
import {useTablePro} from "./useTablePro";
import tableUtils from "./widget";
import {IUseTableProParams, TableProProps} from "./types";


export type RenderFunc = (value: any) => React.JSX.Element;
export type TypeGetTableColumnsBySetting = (tableProProps: TableProProps)=> Promise<any[]>;
export type TypeUseTablePro = (params: IUseTableProParams) => any;


class TablePro extends React.Component<TableProProps, any> {

    static useTablePro: TypeUseTablePro = useTablePro;
    static getTableColumnsBySetting: TypeGetTableColumnsBySetting = tableUtils.getTableColumnsBySetting;
    static TableOperations: typeof tableUtils.TableOperations = tableUtils.TableOperations;
    static TableToolbar: typeof tableUtils.TableToolbar = tableUtils.TableToolbar;
    static renderTableToolbar: typeof tableUtils.renderTableToolbar = tableUtils.renderTableToolbar;
    static renderOperationCell: typeof tableUtils.renderOperationCell = tableUtils.renderOperationCell;
    static renderMultiFieldCell: typeof tableUtils.renderMultiFieldCell = tableUtils.renderMultiFieldCell;
    static renderJSON: RenderFunc = tableUtils.renderJSON;
    static renderString: RenderFunc = tableUtils.renderString;
    static renderDay: RenderFunc = tableUtils.renderDay;
    static renderTime: RenderFunc = tableUtils.renderTime;
    static renderThousands: RenderFunc = tableUtils.renderThousands;
    static renderHTML: RenderFunc = tableUtils.renderHTML;
    static renderBoolean: RenderFunc = tableUtils.renderBoolean;

    render() {
        return (<TableProInner {...this.props}/>);
    }
}


export default TablePro;
