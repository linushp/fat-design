/// <reference types="react" />
import { renderOperationCell } from "./renderOperationCell";
import { getTableColumnsBySetting, getTableStyleBySetting } from "./column-setting";
declare const tableUtils: {
    getTableColumnsBySetting: typeof getTableColumnsBySetting;
    getTableStyleBySetting: typeof getTableStyleBySetting;
    TableOperations: (props: import("../types").OperationsProps, ref: any) => import("react/jsx-runtime").JSX.Element;
    TableToolbar: (props: import("../types").TableToolbarProps, ref: any) => import("react/jsx-runtime").JSX.Element;
    renderTableToolbar: (props: import("../types").TableToolbarProps) => import("react/jsx-runtime").JSX.Element;
    renderOperationCell: typeof renderOperationCell;
    renderMultiFieldCell: (itemList: import("../types").MultiFieldCellItem2[]) => import("react/jsx-runtime").JSX.Element;
    renderJSON: (value: any) => import("react/jsx-runtime").JSX.Element;
    renderString: (value: any) => import("react/jsx-runtime").JSX.Element;
    renderStringExt: (value: any, options: import("./renderFormats").IRenderStringExtOptions) => import("react").JSX.Element;
    renderDay: (value: any) => import("react/jsx-runtime").JSX.Element;
    renderDayAuto: (value: any) => import("react/jsx-runtime").JSX.Element;
    renderTime: (value: any) => import("react/jsx-runtime").JSX.Element;
    renderTimeAuto: (value: any) => import("react/jsx-runtime").JSX.Element;
    renderThousands: (value: any) => import("react/jsx-runtime").JSX.Element;
    renderHTML: (value: any) => import("react/jsx-runtime").JSX.Element;
    renderBoolean: (value: any) => import("react/jsx-runtime").JSX.Element;
    renderRelativeTime: (value: any) => import("react/jsx-runtime").JSX.Element;
    renderTimeDuration: typeof import("./renderFormats").renderTimeDuration;
    renderFileDownload: (value: any) => import("react/jsx-runtime").JSX.Element;
    renderFileImage: (value: any) => import("react/jsx-runtime").JSX.Element;
    renderEnumTag: (value: any) => import("react/jsx-runtime").JSX.Element;
};
export default tableUtils;
