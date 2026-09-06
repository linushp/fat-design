/**
 * 获取表单设置的本地存储 key
 */
export declare function getFormSettingKey(settingName: string): string;
/**
 * 从 localForage 读取已保存的表单设置
 * @returns 设置数组，如果没有则返回 null
 */
export declare function loadFormSetting(settingName: string): Promise<any | null>;
/**
 * 保存表单设置到 localForage
 */
export declare function saveFormSetting(settingName: string, settingArray: any): Promise<void>;
/**
 * 删除 localForage 中的表单设置
 */
export declare function removeFormSetting(settingName: string): Promise<void>;
/**
 * 将 schema 的 properties 转换为可编辑的字段设置列表
 * 合并用户保存的设置（排序、显示、默认值）和表单原始默认值
 */
export declare function toEditingFields(properties: any, settingArray: any, defaultValues?: any): any[];
/**
 * 将保存的设置应用到 schema（重排 properties 顺序、过滤隐藏字段）
 */
export declare function applySettingToSchema(schema: any, settingArray: any): any;
/**
 * 从保存的设置中提取默认值，合并到原始默认值上
 */
export declare function getDefaultValuesFromSetting(settingArray: any, originalDefaults: any): any;
/**
 * 读取表单设置并计算出修改后的默认值
 * 供 useTablePro 和 QueryForm 初始化时使用
 *
 * @param settingName 设置名称
 * @param originalDefaults 原始默认值
 * @returns { formSetting, modifiedDefaultValues }
 */
export declare function resolveFormDefaults(settingName: string, originalDefaults: any): Promise<{
    formSetting: any;
    modifiedDefaultValues: any;
}>;
