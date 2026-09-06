/**
 * 列设置模块
 * 
 * 提供表格列的自定义配置功能，包括：
 * - 列的显示/隐藏
 * - 列的排序（拖拽调整顺序）
 * - 列的锁定（左锁列/右锁列）
 * 
 * ## 如何开启列设置功能
 * 
 * ### 方式一：使用 useTablePro Hook（推荐）
 * ```tsx
 * function MyTable() {
 *   const { tableProps, actions } = TablePro.useTablePro({
 *     onQuery: fetchData,
 *   });
 *   
 *   // 在工具栏添加"列设置"按钮
 *   const operationProps = {
 *     buttons: [
 *       {
 *         text: '列设置',
 *         icon: 'set',
 *         onClick: () => showColumnSettingDialog({ actions }),
 *       },
 *     ],
 *   };
 *   
 *   return (
 *     <TablePro
 *       settingName="my-table-column-setting-unique-id"  // 必填，长度需 > 10，用于本地存储标识
 *       tableProps={tableProps}
 *       operationProps={operationProps}
 *       // ... 其他 props
 *     />
 *   );
 * }
 * ```
 * 
 * ### 方式二：手动应用列设置
 * ```tsx
 * async function MyTable() {
 *   const columns = await TablePro.getTableColumnsBySetting({
 *     settingName: 'my-table-column-setting-unique-id',
 *     tableProps: { columns: originalColumns },
 *     actions: tableActions,
 *   });
 *   
 *   // 使用处理后的 columns 渲染表格
 * }
 * ```
 * 
 * ## 注意事项
 * - settingName 必须是长度 > 10 的唯一字符串，用于区分不同表格的列设置
 * - 用户设置会保存在浏览器本地存储（localForage）中
 * - 可通过 column.display = false 设置某列默认不显示
 * 
 * @module column-setting
 */

import { getDep } from "./deps";
import React, { useState, useEffect } from "react";
import { toMap } from "../../util/toMap";
import Button from "../../button";
import Box from "../../box";
import ConfigProvider from "../../config-provider";
import { getElementText } from "../../util/react-utils";
import { parseJsonObject } from "../../util/func";
import { TinyEmitter } from "../../util/tiny-emitter";
import { storageInstance } from "../../util/localforage";
import { TableProProps } from "../types";


/**
 * 验证 settingName 是否有效
 * settingName 必须是长度 > 10 的字符串，用于确保本地存储的唯一性
 * @param settingName 设置名称
 * @returns 是否有效
 */
function isSettingNameValid(settingName: any) {
    return typeof settingName === "string" && settingName.length > 10;
}

const setObjAttr = (target: any, source: any, attrName: string, type: string) => {
    if (typeof source[attrName] === type) {
        target[attrName] = source[attrName];
    }
}

/**
 * 列设置表格组件的 Props
 */
interface ColumnSettingTableProps {
    /** 列配置数据源 */
    dataSource: any[],
    /** 拖拽排序完成回调 */
    onSortEnd: any,
    /** 事件发射器，用于组件间通信 */
    actionEmitter: any,
}

/**
 * 列设置表格组件
 * 在抽屉中展示的可拖拽排序的表格，用于配置列的显示、隐藏、锁定等
 * @param props 组件属性
 */
function ColumnSettingTable(props: ColumnSettingTableProps) {
    const { onSortEnd, dataSource, actionEmitter } = props;

    const SortableEditableTable = getDep('SortableList.SortableEditableTable');


    return (
        <div style={{ width: '500px' }}>
            <SortableEditableTable
                actionEmitter={actionEmitter}
                onSortEnd={onSortEnd}
                size="small"
                onRowValueChange={(row: any, column: any) => {

                    if (column.dataIndex === 'editingLockLeft') {
                        if (row.editingLockLeft) {
                            row.editingLockRight = false;
                        }
                    }

                    if (column.dataIndex === 'editingLockRight') {
                        if (row.editingLockRight) {
                            row.editingLockLeft = false;
                        }
                    }
                }}

                columns={[
                    {
                        title: '拖动排序',
                        width: '74px',
                        component: 'Icon',
                        draggable: true,
                        xProps: {
                            type: 'list',
                            size: 'medium',
                            style: {
                                position: 'absolute',
                                top: '4px',
                                left: '15px',
                                width: '40px',
                            }
                        },
                    },

                    {
                        title: '字段名',
                        dataIndex: 'editingTitle',
                    },

                    {
                        title: '是否显示',
                        dataIndex: 'editingDisplay',
                        width: '80px',
                        component: 'Checkbox',
                    },

                    {
                        title: '左锁列',
                        dataIndex: 'editingLockLeft',
                        width: '80px',
                        component: 'Checkbox',
                        forceUpdateRow: true,
                    },
                    {
                        title: '右锁列',
                        dataIndex: 'editingLockRight',
                        width: '80px',
                        component: 'Checkbox',
                        forceUpdateRow: true,
                    },
                ]}
                dataSource={dataSource} />
        </div>
    )
}


/**
 * 获取列标题文本
 * 从列配置中提取标题文本，支持字符串、React 元素等多种格式
 * @param column 列配置对象
 * @param index 列索引，用于生成默认标题
 * @returns 列标题文本
 */
function getColumnTitleText(column: any, index: number): string {
    const title = column.title;
    if (!title) {
        return column.dataIndex || `Column${index}`;
    }
    if (typeof title === "string") {
        return title;
    }
    if (typeof title === "object") {
        return getElementText(title);
    }
    return `Column${index}`
}

/**
 * 将原始列配置转换为可编辑的列配置
 * 合并用户保存的设置（显示/隐藏、排序、锁定）到列配置中
 * 
 * @param columns 原始列配置数组
 * @param settingArray 用户保存的设置数组（从本地存储读取）
 * @returns 合并设置后的可编辑列配置数组
 */
function toEditingColumns(columns: any[], settingArray: any): any[] {

    let settingMap: any = {};
    if (settingArray && Array.isArray(settingArray)) {
        settingArray = settingArray.map((settingObj, index) => {
            return { ...settingObj, editingSortIndex: index };
        });
        settingMap = toMap(settingArray, (settingObj: any) => {
            return settingObj.editingColumnKey;
        });
    }

    const columns2 = columns.map((column, index) => {
        const editingTitle = getColumnTitleText(column, index);
        const editingColumnKey = `${editingTitle}_${column.dataIndex}`;

        const settingObj = settingMap[editingColumnKey];

        // 默认值
        const columnObj = {
            ...column,
            editingColumnKey: editingColumnKey,
            editingTitle: editingTitle,
            editingLockLeft: column.lock === 'left',
            editingLockRight: column.lock === 'right',
            editingDisplay: typeof column.display === "boolean" ? column.display : true, // 可以通过display=false属性，设置此列默认不显示
            editingSortIndex: index,
        };

        // 保存的值
        if (settingObj) {
            setObjAttr(columnObj, settingObj, 'editingLockLeft', 'boolean');
            setObjAttr(columnObj, settingObj, 'editingLockRight', 'boolean');
            setObjAttr(columnObj, settingObj, 'editingDisplay', 'boolean');
            setObjAttr(columnObj, settingObj, 'editingSortIndex', 'number');
        }

        return columnObj;
    });


    return columns2.sort((a, b) => {
        return a.editingSortIndex - b.editingSortIndex;
    });
}


/**
 * 获取本地存储的 key
 * 根据 settingName 生成唯一的本地存储标识
 * @param settingName 设置名称
 * @returns 本地存储 key
 */
function getLocaleForageKey(settingName: string) {
    return `TableProColumnSetting_${settingName}`;
}


/**
 * 获取风格设置的本地存储 key
 * @param settingName 设置名称
 * @returns 本地存储 key
 */
function getStyleSettingKey(settingName: string) {
    return `TableProStyleSetting_${settingName}`;
}


/**
 * 表格风格的出厂默认值（与 Table 组件 defaultProps 对齐）
 * 用户未做任何设置时使用此值
 */
const DEFAULT_TABLE_STYLE = {
    size: 'medium',
    isZebra: false,
};

/**
 * 根据 initTableProps 解析「用户未做任何设置」时的风格初始值
 * initTableProps 中显式传入的 size / isZebra 优先，否则回退到 Table 组件默认值
 */
function resolveDefaultStyleSetting(initTableProps: any = {}) {
    const source = initTableProps || {};
    return {
        size: source.size || DEFAULT_TABLE_STYLE.size,
        isZebra: typeof source.isZebra === 'boolean' ? source.isZebra : DEFAULT_TABLE_STYLE.isZebra,
    };
}


/**
 * 从 actions 读取初始化时快照的风格默认值
 * 优先用 useTablePro 快照的 getDefaultStyleSetting，避免被运行时 updateTableProps 污染
 */
function getDefaultStyleSettingFromActions(actions: any) {
    if (actions && typeof actions.getDefaultStyleSetting === 'function') {
        return actions.getDefaultStyleSetting();
    }
    const initTableProps = actions && typeof actions.getInitialParams === 'function'
        ? (actions.getInitialParams() || {}).initTableProps
        : undefined;
    return resolveDefaultStyleSetting(initTableProps);
}


/**
 * 风格设置面板组件
 * 在列设置抽屉中展示表格风格设置选项，包括：
 * - 尺寸（small / medium）
 * - 斑马纹（isZebra）
 */
function StyleSettingsPanel({ initialSettings, onChange, actionEmitter }: { initialSettings: any, onChange: any, actionEmitter: any }) {
    const [settings, setSettings] = useState(initialSettings);

    // 监听“恢复默认”事件，更新面板状态
    useEffect(() => {
        if (!actionEmitter) return;
        const handler = (newSettings: any) => {
            setSettings(newSettings);
        };
        actionEmitter.on("forceUpdateStyleSettings", handler);
        return () => {
            actionEmitter.off("forceUpdateStyleSettings", handler);
        };
    }, [actionEmitter]);

    const update = (patch: any) => {
        const next = { ...settings, ...patch };
        setSettings(next);
        onChange(next);
    };

    const wrapperStyle: any = {
        padding: '0 0 16px',
        borderBottom: '1px solid #eee',
        marginBottom: 16,
    };

    const titleStyle: any = {
        fontWeight: 600,
        fontSize: 14,
        marginBottom: 12,
    };

    const rowStyle: any = {
        display: 'flex',
        gap: 24,
        alignItems: 'center',
        flexWrap: 'wrap' as const,
    };

    const labelStyle: any = {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
    };

    const Switch = getDep('Switch');

    return (
        <div style={wrapperStyle}>
            <div style={titleStyle}>风格设置</div>
            <div style={rowStyle}>
                <div style={labelStyle}>
                    <span>尺寸</span>
                    <Button
                        size="small"
                        type={settings.size === 'small' ? 'primary' : 'normal'}
                        onClick={() => update({ size: 'small' })}
                    >Small</Button>
                    <Button
                        size="small"
                        type={settings.size === 'medium' ? 'primary' : 'normal'}
                        onClick={() => update({ size: 'medium' })}
                    >Medium</Button>
                </div>
                <div style={labelStyle}>
                    <span>斑马纹</span>
                    <Switch
                        checked={settings.isZebra}
                        onChange={(checked: boolean) => update({ isZebra: checked })}
                    />
                </div>
            </div>
        </div>
    );
}


/**
 * Tab 内容渲染器
 * 监听 tabChange 事件，在风格设置和列设置面板之间切换
 */
function TabContentRenderer({ actionEmitter, stylePanel, columnPanel }: { actionEmitter: any, stylePanel: any, columnPanel: any }) {
    const [activeTab, setActiveTab] = useState('columns');

    useEffect(() => {
        const handler = (key: string) => {
            setActiveTab(key);
        };
        actionEmitter.on('tabChange', handler);
        return () => {
            actionEmitter.off('tabChange', handler);
        };
    }, [actionEmitter]);

    return activeTab === 'style' ? stylePanel : columnPanel;
}


/**
 * 显示列设置对话框
 * 打开一个右侧抽屉，让用户可以配置列的显示、隐藏、排序和锁定，
 * 同时支持表格风格设置（尺寸、斑马纹）
 * 
 * @param params 参数对象
 * @param params.actions useTablePro 返回的 actions 对象，包含 getSettingName、getTableProps、updateColumns 等方法
 * 
 * @example
 * // 在操作按钮中调用
 * const operationProps = {
 *   buttons: [
 *     {
 *       text: '列设置',
 *       icon: 'set',
 *       onClick: () => showColumnSettingDialog({ actions }),
 *     },
 *   ],
 * };
 */
async function showColumnSettingDialog({ actions }: any) {
    const Message = getDep('Message');
    const Drawer = getDep('Drawer');

    const settingName = actions.getSettingName();
    if (!isSettingNameValid(settingName)) {
        Message.error("the param 'settingName' of TablePro is required and length > 10");
        return;
    }

    const actionEmitter = new TinyEmitter();

    const LOCAL_FORAGE_KEY = getLocaleForageKey(settingName);
    const STYLE_FORAGE_KEY = getStyleSettingKey(settingName);

    // 上次移除的列
    const setting = (await storageInstance.getItem(LOCAL_FORAGE_KEY)) as string;

    const settingArray = parseJsonObject(setting);
    const tableProps = actions.getTableProps();
    const editingColumns = toEditingColumns(tableProps.columns || [], settingArray);

    // 用户未做任何设置时的初始值（来自 useTablePro 对 initTableProps 的快照）
    const defaultStyleSetting = getDefaultStyleSettingFromActions(actions);

    // 读取已保存的风格设置：有 storage 用 storage，没有则用初始值
    const styleSettingStr = (await storageInstance.getItem(STYLE_FORAGE_KEY)) as string;
    const savedStyleSetting = parseJsonObject(styleSettingStr);
    const styleSettings = savedStyleSetting
        ? { ...defaultStyleSetting, ...savedStyleSetting }
        : { ...defaultStyleSetting };

    const { prefix } = ConfigProvider.getContext();

    const dialogRef = {
        editingColumns: editingColumns,
        styleSettings: styleSettings,
        dialogInstance: null
    };
    const onSortEnd = (newSetting: any) => {
        dialogRef.editingColumns = [...newSetting];
    }

    // 将风格设置应用到表格
    const applyStyleSettings = () => {
        const currentTableProps = actions.getTableProps();
        const { size, isZebra } = dialogRef.styleSettings;
        actions.updateTableProps({
            ...currentTableProps,
            size,
            isZebra,
        });
    };

    const onSaveSetting = async () => {
        const editingColumns = (dialogRef.editingColumns || []).map((c, index) => {
            return {
                editingColumnKey: c.editingColumnKey,
                editingTitle: c.editingTitle,
                editingLockLeft: c.editingLockLeft,
                editingLockRight: c.editingLockRight,
                editingDisplay: c.editingDisplay,
                editingSortIndex: index,
            };
        });
        await storageInstance.setItem(LOCAL_FORAGE_KEY, JSON.stringify(editingColumns));

        // 保存风格设置
        await storageInstance.setItem(STYLE_FORAGE_KEY, JSON.stringify(dialogRef.styleSettings));

        // 应用风格设置
        applyStyleSettings();

        actions.updateColumns();
        Message.success("设置生效成功！");
    }


    const onRevertSetting = async () => {
        dialogRef.editingColumns = toEditingColumns(tableProps.columns || [], []);
        actionEmitter.emit("forceUpdateDataSource", dialogRef.editingColumns);

        await storageInstance.removeItem(LOCAL_FORAGE_KEY);

        // 移除风格设置
        await storageInstance.removeItem(STYLE_FORAGE_KEY);
        dialogRef.styleSettings = { ...defaultStyleSetting };
        actionEmitter.emit("forceUpdateStyleSettings", dialogRef.styleSettings);
        applyStyleSettings();

        actions.updateColumns();
        Message.success("恢复默认成功！");
    }


    const Tab = getDep('Tab');

    const title = (
        <div className={`${prefix}column-setting-dialog-title`}>
            <div className={`${prefix}column-setting-dialog-tab-wrapper`}>
                <Tab
                    defaultActiveKey="columns"
                    contentStyle={{ display: 'none' }}
                    onChange={(key: string) => {
                        actionEmitter.emit('tabChange', key);
                    }}
                >
                    <Tab.Item title="列设置" key="columns" />
                    <Tab.Item title="风格设置" key="style" />
                </Tab>
            </div>

            <div className={`${prefix}column-setting-dialog-save-group`}>
                <Box direction="row" spacing={15}>
                    <Button type={'normal'}
                        onClick={onRevertSetting}
                    >恢复默认</Button>
                    <Button type={'secondary'}
                        onClick={onSaveSetting}
                    >设置生效</Button>
                </Box>
            </div>
        </div>
    );


    dialogRef.dialogInstance = Drawer.show({
        title: title,
        placement: 'right',
        width: 550,
        footerActions: ['cancel'],
        cancelText: '关闭',
        content: (
            <TabContentRenderer
                actionEmitter={actionEmitter}
                stylePanel={
                    <StyleSettingsPanel
                        initialSettings={dialogRef.styleSettings}
                        actionEmitter={actionEmitter}
                        onChange={(newSettings: any) => {
                            dialogRef.styleSettings = newSettings;
                        }}
                    />
                }
                columnPanel={
                    <ColumnSettingTable onSortEnd={onSortEnd}
                        actionEmitter={actionEmitter}
                        dataSource={dialogRef.editingColumns} />
                }
            />
        )
    });
}


/**
 * 根据用户设置获取表格列配置
 * 从本地存储读取用户的列设置，过滤隐藏列，应用锁定配置
 * 
 * 此函数通常在表格初始化时调用，用于应用用户之前保存的列设置
 * 
 * @param tableProProps TablePro 组件的 props
 * @param tableProProps.actions useTablePro 返回的 actions 对象
 * @param tableProProps.tableProps 包含 columns 的表格属性
 * @returns 处理后的列配置数组（已过滤隐藏列，已应用锁定设置）
 * 
 * @example
 * // 在组件中使用
 * const columns = await TablePro.getTableColumnsBySetting({
 *   settingName: 'my-table-columns',
 *   tableProps: { columns: originalColumns },
 *   actions: tableActions,
 * });
 */
async function getTableColumnsBySetting(tableProProps: TableProProps): Promise<any[]> {
    const actions = tableProProps.actions || {};
    const tableProps = tableProProps.tableProps || {};
    const columns = tableProps.columns || [];
    const settingName = actions.getSettingName();

    if (!isSettingNameValid(settingName)) {
        return Promise.resolve(columns);
    }

    const LOCAL_FORAGE_KEY = getLocaleForageKey(settingName);


    // 上次移除的列
    const setting = (await storageInstance.getItem(LOCAL_FORAGE_KEY)) as string;
    const settingArray = parseJsonObject(setting);
    const editingColumns = toEditingColumns(tableProps.columns || [], settingArray);

    return editingColumns.filter((column: any) => {
        const editingDisplay = column.editingDisplay as any;
        return editingDisplay !== false;
    }).map((column) => {
        const columnObj = { ...column };

        if (columnObj.editingLockLeft === true) {
            columnObj.lock = 'left';
        }

        if (columnObj.editingLockRight === true) {
            columnObj.lock = 'right';
        }

        if (!columnObj.editingLockLeft && !columnObj.editingLockRight) {
            delete columnObj.lock;
        }

        delete columnObj.editingLockLeft;
        delete columnObj.editingLockRight;
        delete columnObj.editingDisplay;
        delete columnObj.editingSortIndex;
        return columnObj;
    });
}


/**
 * 获取用户保存的表格风格设置
 * 从本地存储读取用户保存的表格风格设置（尺寸、斑马纹）
 * 
 * 此函数通常在表格初始化时调用，用于应用用户之前保存的风格设置
 * 
 * @param settingName 设置名称
 * @returns 风格设置对象，包含 size、isZebra 字段；如无保存则返回 null
 * 
 * @example
 * const styleSetting = await getTableStyleBySetting('my-table-style-setting');
 * if (styleSetting) {
 *   tableProps.size = styleSetting.size;
 *   tableProps.isZebra = styleSetting.isZebra;
 * }
 */
async function getTableStyleBySetting(settingName: string): Promise<any> {
    if (!isSettingNameValid(settingName)) {
        return null;
    }
    const STYLE_FORAGE_KEY = getStyleSettingKey(settingName);
    const styleSettingStr = (await storageInstance.getItem(STYLE_FORAGE_KEY)) as string;
    return parseJsonObject(styleSettingStr);
}


export {
    isSettingNameValid,
    showColumnSettingDialog,
    getTableColumnsBySetting,
    getTableStyleBySetting,
    resolveDefaultStyleSetting,
    DEFAULT_TABLE_STYLE,
}
