/**
 * 显示表单设置对话框
 * 打开一个右侧抽屉，让用户可以配置表单项的显示顺序、显示/隐藏和默认值
 *
 * @param params.schema 表单 schema
 * @param params.settingName 设置名称（用于本地存储）
 * @param params.queryFormEventBus 事件总线，用于通知表单更新
 * @param params.defaultValues 表单原始默认值
 */
declare function showFormSettingDialog({ schema, settingName, queryFormEventBus, defaultValues }: any): Promise<void>;
export { showFormSettingDialog, };
