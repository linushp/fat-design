import React from "react";
import {TableProInner} from "./table-pro";
import {useTablePro} from "./useTablePro";
import tableUtils from "./widget";
import {TableProProps} from "./types";


class TablePro extends React.Component<TableProProps, any> {

    static useTablePro = useTablePro;
    static getTableColumnsBySetting: typeof tableUtils.getTableColumnsBySetting = tableUtils.getTableColumnsBySetting;
    static TableOperations: typeof tableUtils.TableOperations = tableUtils.TableOperations;
    static TableToolbar: typeof tableUtils.TableToolbar = tableUtils.TableToolbar;
    static renderTableToolbar: typeof tableUtils.renderTableToolbar = tableUtils.renderTableToolbar;
    static renderOperationCell: typeof tableUtils.renderOperationCell = tableUtils.renderOperationCell;
    static renderMultiFieldCell: typeof tableUtils.renderMultiFieldCell = tableUtils.renderMultiFieldCell;
    static renderJSON: typeof tableUtils.renderJSON = tableUtils.renderJSON;
    static renderString: typeof tableUtils.renderString = tableUtils.renderString;
    static renderDay: typeof tableUtils.renderDay = tableUtils.renderDay;
    static renderTime: typeof tableUtils.renderTime = tableUtils.renderTime;
    static renderThousands: typeof tableUtils.renderThousands = tableUtils.renderThousands;
    static renderHTML: typeof tableUtils.renderHTML = tableUtils.renderHTML;
    static renderBoolean: typeof tableUtils.renderBoolean = tableUtils.renderBoolean;

    render() {
        return (<TableProInner {...this.props}/>);
    }
}


export default TablePro;
