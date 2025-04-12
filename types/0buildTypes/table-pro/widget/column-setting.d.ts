import { TableProProps } from "../types";
declare function showColumnSettingDialog({ actions }: any): Promise<void>;
declare function getTableColumnsBySetting(tableProProps: TableProProps): Promise<any[]>;
export { showColumnSettingDialog, getTableColumnsBySetting };
