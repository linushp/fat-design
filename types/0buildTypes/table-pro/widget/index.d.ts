/// <reference types="react" />
import { renderOperationCell } from "./renderOperationCell";
import { getTableColumnsBySetting } from "./column-setting";
declare const tableUtils: {
    getTableColumnsBySetting: typeof getTableColumnsBySetting;
    TableOperations: (props: import("../types").OperationsProps, ref: any) => import("react").JSX.Element;
    TableToolbar: (props: import("../types").TableToolbarProps, ref: any) => import("react").JSX.Element;
    renderTableToolbar: (props: import("../types").TableToolbarProps) => import("react").JSX.Element;
    renderOperationCell: typeof renderOperationCell;
    renderMultiFieldCell: (itemList: import("../types").MultiFieldCellItem2[]) => import("react").JSX.Element;
    renderJSON: (value: any) => import("react").JSX.Element;
    renderString: (value: any) => import("react").JSX.Element;
    renderDay: (value: any) => import("react").JSX.Element;
    renderTime: (value: any) => import("react").JSX.Element;
    renderThousands: (value: any) => import("react").JSX.Element;
    renderHTML: (value: any) => import("react").JSX.Element;
    renderBoolean: (value: any) => import("react").JSX.Element;
    renderRelativeTime: (value: any) => import("react").JSX.Element;
    renderFileDownload: (value: any) => import("react").JSX.Element;
    renderFileImage: (value: any) => import("react").JSX.Element;
    renderEnumTag: (value: any) => import("react").JSX.Element;
};
export default tableUtils;
