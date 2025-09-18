import { TableProProps } from "../types";
declare function isSettingNameValid(settingName: any): boolean;
declare function showColumnSettingDialog({ actions }: any): Promise<void>;
declare function getTableColumnsBySetting(tableProProps: TableProProps): Promise<any[]>;
export { isSettingNameValid, showColumnSettingDialog, getTableColumnsBySetting };
