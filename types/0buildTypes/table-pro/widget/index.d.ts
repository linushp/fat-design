import React from 'react';
import { TableOperations } from "./operations";
import { TableToolbar } from "./renderToolbar";
import { renderOperationCell } from "./renderOperationCell";
import { renderMultiFieldCell } from "./renderMultiFieldCell";
import { getTableColumnsBySetting } from "./column-setting";
import { TableToolbarProps } from "./table-utils-types";
export type RenderFunc = (value: any) => React.JSX.Element;
export type IRenderTableToolbar = (props: TableToolbarProps) => React.JSX.Element;
export interface ITableUtilsTypes {
    getTableColumnsBySetting: typeof getTableColumnsBySetting;
    TableOperations: typeof TableOperations;
    TableToolbar: typeof TableToolbar;
    renderTableToolbar: IRenderTableToolbar;
    renderOperationCell: typeof renderOperationCell;
    renderMultiFieldCell: typeof renderMultiFieldCell;
    renderJSON: RenderFunc;
    renderString: RenderFunc;
    renderDay: RenderFunc;
    renderTime: RenderFunc;
    renderThousands: RenderFunc;
    renderHTML: RenderFunc;
    renderBoolean: RenderFunc;
}
declare const tableUtils: ITableUtilsTypes;
export default tableUtils;
