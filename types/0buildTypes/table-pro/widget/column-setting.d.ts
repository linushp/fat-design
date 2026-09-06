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
import { TableProProps } from "../types";
/**
 * 验证 settingName 是否有效
 * settingName 必须是长度 > 10 的字符串，用于确保本地存储的唯一性
 * @param settingName 设置名称
 * @returns 是否有效
 */
declare function isSettingNameValid(settingName: any): boolean;
/**
 * 表格风格的出厂默认值（与 Table 组件 defaultProps 对齐）
 * 用户未做任何设置时使用此值
 */
declare const DEFAULT_TABLE_STYLE: {
    size: string;
    isZebra: boolean;
};
/**
 * 根据 initTableProps 解析「用户未做任何设置」时的风格初始值
 * initTableProps 中显式传入的 size / isZebra 优先，否则回退到 Table 组件默认值
 */
declare function resolveDefaultStyleSetting(initTableProps?: any): {
    size: any;
    isZebra: any;
};
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
declare function showColumnSettingDialog({ actions }: any): Promise<void>;
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
declare function getTableColumnsBySetting(tableProProps: TableProProps): Promise<any[]>;
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
declare function getTableStyleBySetting(settingName: string): Promise<any>;
export { isSettingNameValid, showColumnSettingDialog, getTableColumnsBySetting, getTableStyleBySetting, resolveDefaultStyleSetting, DEFAULT_TABLE_STYLE, };
