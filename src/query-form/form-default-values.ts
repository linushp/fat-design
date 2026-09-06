import { storageInstance } from "../util/localforage";
import { parseJsonObject } from "../util/func";

/* ===================== 存储读写 ===================== */

/**
 * 获取表单设置的本地存储 key
 */
export function getFormSettingKey(settingName: string) {
    return `QueryFormSetting_${settingName}`;
}

/**
 * 从 localForage 读取已保存的表单设置
 * @returns 设置数组，如果没有则返回 null
 */
export async function loadFormSetting(settingName: string): Promise<any | null> {
    const SETTING_KEY = getFormSettingKey(settingName);
    const str = await storageInstance.getItem(SETTING_KEY);
    return parseJsonObject(str);
}

/**
 * 保存表单设置到 localForage
 */
export async function saveFormSetting(settingName: string, settingArray: any) {
    const SETTING_KEY = getFormSettingKey(settingName);
    await storageInstance.setItem(SETTING_KEY, JSON.stringify(settingArray));
}

/**
 * 删除 localForage 中的表单设置
 */
export async function removeFormSetting(settingName: string) {
    const SETTING_KEY = getFormSettingKey(settingName);
    await storageInstance.removeItem(SETTING_KEY);
}

/* ===================== 纯逻辑 ===================== */

const setObjAttr = (target: any, source: any, attrName: string, type: string) => {
    if (source[attrName] !== undefined && typeof source[attrName] === type) {
        target[attrName] = source[attrName];
    }
};

/**
 * 将 schema 的 properties 转换为可编辑的字段设置列表
 * 合并用户保存的设置（排序、显示、默认值）和表单原始默认值
 */
export function toEditingFields(properties: any, settingArray: any, defaultValues?: any): any[] {
    let settingMap: any = {};
    if (settingArray && Array.isArray(settingArray)) {
        settingArray = settingArray.map((s: any, index: number) => ({ ...s, sortIndex: index }));
        settingMap = settingArray.reduce((map: any, s: any) => {
            map[s.fieldKey] = s;
            return map;
        }, {});
    }

    const defaults = defaultValues || {};
    const keys = Object.keys(properties || {});
    const fields = keys.map((key, index) => {
        const prop = properties[key];
        const fieldLabel = prop.label || key;

        const field: any = {
            fieldKey: key,
            fieldLabel,
            sortIndex: index,
            display: true,
            defaultValue: defaults[key] !== undefined ? defaults[key] : '',
        };

        const setting = settingMap[key];
        if (setting) {
            setObjAttr(field, setting, 'sortIndex', 'number');
            setObjAttr(field, setting, 'display', 'boolean');
            if (setting.defaultValue !== undefined) {
                field.defaultValue = setting.defaultValue;
            }
        }

        return field;
    });

    return fields.sort((a, b) => a.sortIndex - b.sortIndex);
}

/**
 * 将保存的设置应用到 schema（重排 properties 顺序、过滤隐藏字段）
 */
export function applySettingToSchema(schema: any, settingArray: any): any {
    if (!schema || !schema.properties) return schema;
    if (!settingArray || !Array.isArray(settingArray)) return schema;

    const properties = schema.properties;
    const editingFields = toEditingFields(properties, settingArray);

    const newProperties: any = {};
    editingFields.forEach((field) => {
        if (field.display !== false && properties[field.fieldKey]) {
            newProperties[field.fieldKey] = { ...properties[field.fieldKey] };
        }
    });

    return { ...schema, properties: newProperties };
}

/**
 * 从保存的设置中提取默认值，合并到原始默认值上
 */
export function getDefaultValuesFromSetting(settingArray: any, originalDefaults: any): any {
    const result: any = { ...(originalDefaults || {}) };
    if (settingArray && Array.isArray(settingArray)) {
        settingArray.forEach((s: any) => {
            if (s.defaultValue !== undefined && s.defaultValue !== '' && s.display !== false) {
                result[s.fieldKey] = s.defaultValue;
            }
        });
    }
    return result;
}

/* ===================== 便捷方法 ===================== */

/**
 * 读取表单设置并计算出修改后的默认值
 * 供 useTablePro 和 QueryForm 初始化时使用
 *
 * @param settingName 设置名称
 * @param originalDefaults 原始默认值
 * @returns { formSetting, modifiedDefaultValues }
 */
export async function resolveFormDefaults(settingName: string, originalDefaults: any) {
    const formSetting = await loadFormSetting(settingName);
    const modifiedDefaultValues = formSetting
        ? getDefaultValuesFromSetting(formSetting, originalDefaults)
        : originalDefaults;
    return { formSetting, modifiedDefaultValues };
}
