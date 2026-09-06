import {TableOperations} from "./operations";
import {TableToolbar, renderTableToolbar} from "./renderToolbar";
import {renderOperationCell} from "./renderOperationCell";
import {renderMultiFieldCell} from "./renderMultiFieldCell";
import {getTableColumnsBySetting, getTableStyleBySetting} from "./column-setting";
import {renderFormats} from "./renderFormats";

const tableUtils = {
    getTableColumnsBySetting: getTableColumnsBySetting,
    getTableStyleBySetting: getTableStyleBySetting,
    TableOperations: TableOperations,
    TableToolbar: TableToolbar,
    renderTableToolbar: renderTableToolbar,
    renderOperationCell: renderOperationCell,
    renderMultiFieldCell: renderMultiFieldCell,
    renderJSON: renderFormats.renderJSON,
    renderString: renderFormats.renderString,
    renderStringExt: renderFormats.renderStringExt,
    renderDay: renderFormats.renderDay,
    renderDayAuto: renderFormats.renderDayAuto,
    renderTime: renderFormats.renderTime,
    renderTimeAuto: renderFormats.renderTimeAuto,
    renderThousands: renderFormats.renderThousands,
    renderHTML: renderFormats.renderHTML,
    renderBoolean: renderFormats.renderBoolean,
    renderRelativeTime: renderFormats.renderRelativeTime,
    renderTimeDuration: renderFormats.renderTimeDuration,
    renderFileDownload: renderFormats.renderFileDownload,
    renderFileImage: renderFormats.renderFileImage,
    renderEnumTag: renderFormats.renderEnumTag,
}


export default tableUtils;
