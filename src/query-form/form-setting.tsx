import React from "react";
import _get from "../util/lodash-get";
import { ComponentsStore } from "../util/comp";
import Button from "../button";
import Box from "../box";
import ConfigProvider from "../config-provider";
import { TinyEmitter } from "../util/tiny-emitter";
import {
    loadFormSetting,
    saveFormSetting,
    removeFormSetting,
    toEditingFields,
} from "./form-default-values";

const getDep = (name: string) => _get(ComponentsStore.buildInComponents, name);

/**
 * 表单字段设置表格组件
 * 使用 SortableEditableTable 实现拖拽排序、显示控制和默认值设置
 */
function FormFieldSettingTable(props: { dataSource: any[], onSortEnd: any, actionEmitter: any }) {
    const { onSortEnd, dataSource, actionEmitter } = props;
    const SortableEditableTable = getDep('SortableList.SortableEditableTable');

    return (
        <div style={{ width: '500px' }}>
            <SortableEditableTable
                actionEmitter={actionEmitter}
                onSortEnd={onSortEnd}
                size="small"
                onRowValueChange={() => { }}
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
                                position: 'relative',
                                // top: '4px',
                                left: '15px',
                                // width: '40px',
                            }
                        },
                    },
                    {
                        title: '字段名',
                        dataIndex: 'fieldLabel',
                    },
                    {
                        title: '是否显示',
                        dataIndex: 'display',
                        width: '80px',
                        component: 'Checkbox',
                    },
                    {
                        title: '默认值',
                        dataIndex: 'defaultValue',
                        component: 'Input',
                        xProps: {
                            placeholder: '输入默认值',
                        },
                    },
                ]}
                dataSource={dataSource}
            />
        </div>
    );
}

/**
 * 显示表单设置对话框
 * 打开一个右侧抽屉，让用户可以配置表单项的显示顺序、显示/隐藏和默认值
 *
 * @param params.schema 表单 schema
 * @param params.settingName 设置名称（用于本地存储）
 * @param params.queryFormEventBus 事件总线，用于通知表单更新
 * @param params.defaultValues 表单原始默认值
 */
async function showFormSettingDialog({ schema, settingName, queryFormEventBus, defaultValues }: any) {
    const Message = getDep('Message');
    const Drawer = getDep('Drawer');

    if (!settingName || typeof settingName !== 'string' || settingName.length <= 0) {
        Message.error("settingName is required when settings is enabled");
        return;
    }

    const actionEmitter = new TinyEmitter();

    // 读取已保存的设置
    const settingArray = await loadFormSetting(settingName);

    const properties = (schema && schema.properties) || {};
    const editingFields = toEditingFields(properties, settingArray, defaultValues);

    const { prefix } = ConfigProvider.getContext();

    const dialogRef: any = {
        editingFields,
        dialogInstance: null,
    };

    const onSortEnd = (newFields: any) => {
        dialogRef.editingFields = [...newFields];
    };

    const onSaveSetting = async () => {
        const fieldsToSave = (dialogRef.editingFields || []).map((f: any, index: number) => ({
            fieldKey: f.fieldKey,
            fieldLabel: f.fieldLabel,
            sortIndex: index,
            display: f.display,
            defaultValue: f.defaultValue,
        }));
        await saveFormSetting(settingName, fieldsToSave);
        queryFormEventBus.emit('formSettingChange', fieldsToSave);
        Message.success("设置生效成功！");
    };

    const onRevertSetting = async () => {
        dialogRef.editingFields = toEditingFields(properties, [], defaultValues);
        actionEmitter.emit("forceUpdateDataSource", dialogRef.editingFields);
        await removeFormSetting(settingName);
        queryFormEventBus.emit('formSettingChange', null);
        Message.success("恢复默认成功！");
    };

    const title = (
        <div className={`${prefix}column-setting-dialog-title`}>
            <span>表单设置</span>
            <div className={`${prefix}column-setting-dialog-save-group`}>
                <Box direction="row" spacing={15}>
                    <Button type={'normal'} onClick={onRevertSetting}>恢复默认</Button>
                    <Button type={'secondary'} onClick={onSaveSetting}>设置生效</Button>
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
            <FormFieldSettingTable
                onSortEnd={onSortEnd}
                actionEmitter={actionEmitter}
                dataSource={dialogRef.editingFields}
            />
        )
    });
}

export {
    showFormSettingDialog,
};
