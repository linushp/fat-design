import React from "react";
import { useTablePro } from "./useTablePro";
import tableUtils from "./widget";
import { TableProProps } from "./types";
declare class TablePro extends React.Component<TableProProps, any> {
    static useTablePro: typeof useTablePro;
    static getTableColumnsBySetting: typeof tableUtils.getTableColumnsBySetting;
    static TableOperations: typeof tableUtils.TableOperations;
    static TableToolbar: typeof tableUtils.TableToolbar;
    static renderTableToolbar: typeof tableUtils.renderTableToolbar;
    static renderOperationCell: typeof tableUtils.renderOperationCell;
    static renderMultiFieldCell: typeof tableUtils.renderMultiFieldCell;
    static renderJSON: typeof tableUtils.renderJSON;
    static renderString: typeof tableUtils.renderString;
    static renderDay: typeof tableUtils.renderDay;
    static renderTime: typeof tableUtils.renderTime;
    static renderThousands: typeof tableUtils.renderThousands;
    static renderHTML: typeof tableUtils.renderHTML;
    static renderBoolean: typeof tableUtils.renderBoolean;
    render(): React.JSX.Element;
}
export default TablePro;
