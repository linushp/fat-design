import React from 'react';
import {TableOperations} from "./operations";
import {TableToolbar, renderTableToolbar} from "./renderToolbar";
import {renderOperationCell} from "./renderOperationCell";
import {renderMultiFieldCell} from "./renderMultiFieldCell";
import {getTableColumnsBySetting} from "./column-setting";
import {renderFormats} from "./renderFormats";
import {TableToolbarProps} from "./table-utils-types";

export type RenderFunc = (value: any) => React.JSX.Element;
export type IRenderTableToolbar =  (props: TableToolbarProps) => React.JSX.Element;
export interface ITableUtilsTypes {
    getTableColumnsBySetting: typeof getTableColumnsBySetting,
    TableOperations: typeof TableOperations,
    TableToolbar: typeof TableToolbar,
    renderTableToolbar: IRenderTableToolbar,
    renderOperationCell: typeof renderOperationCell,
    renderMultiFieldCell: typeof renderMultiFieldCell,
    renderJSON: RenderFunc,
    renderString: RenderFunc,
    renderDay: RenderFunc,
    renderTime: RenderFunc,
    renderThousands: RenderFunc,
    renderHTML: RenderFunc,
    renderBoolean: RenderFunc,
}



const tableUtils: ITableUtilsTypes = {
    getTableColumnsBySetting: getTableColumnsBySetting,
    TableOperations: TableOperations,
    TableToolbar: TableToolbar,
    renderTableToolbar: renderTableToolbar,
    renderOperationCell: renderOperationCell,
    renderMultiFieldCell: renderMultiFieldCell,
    renderJSON: renderFormats.renderJSON,
    renderString: renderFormats.renderString,
    renderDay: renderFormats.renderDay,
    renderTime: renderFormats.renderTime,
    renderThousands: renderFormats.renderThousands,
    renderHTML: renderFormats.renderHTML,
    renderBoolean: renderFormats.renderBoolean,
}


export default tableUtils;
