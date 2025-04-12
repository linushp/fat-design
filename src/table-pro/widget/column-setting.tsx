import {getDep} from "./deps";
import React from "react";
import {toMap} from "../../util/toMap";
import Button from "../../button";
import Box from "../../box";
import ConfigProvider from "../../config-provider";
import {getElementText} from "../../util/react-utils";
import {parseJsonObject} from "../../util/func";
import {TinyEmitter} from "../../util/tiny-emitter";
import { storageInstance } from "../../util/localforage";
import {TableProProps} from "../types";


function isSettingNameValid(settingName: any) {
    return typeof settingName === "string" && settingName.length > 10;
}

const setObjAttr = (target: any, source: any, attrName: string, type: string) => {
    if (typeof source[attrName] === type) {
        target[attrName] = source[attrName];
    }
}

interface ColumnSettingTableProps {
    dataSource: any[],
    onSortEnd: any,
    actionEmitter: any,
}

function ColumnSettingTable(props: ColumnSettingTableProps) {
    const {onSortEnd, dataSource, actionEmitter} = props;

    const SortableEditableTable = getDep('SortableList.SortableEditableTable');


    return (
        <div style={{width: '500px'}}>
            <SortableEditableTable
                actionEmitter={actionEmitter}
                onSortEnd={onSortEnd}
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
                dataSource={dataSource}/>
        </div>
    )
}


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

function toEditingColumns(columns: any[], settingArray: any): any[] {

    let settingMap: any = {};
    if (settingArray && Array.isArray(settingArray)) {
        settingArray = settingArray.map((settingObj, index) => {
            return {...settingObj, editingSortIndex: index};
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


function getLocaleForageKey(settingName: string) {
    return `TableProColumnSetting_${settingName}`;
}


async function showColumnSettingDialog({actions}: any) {
    const Message = getDep('Message');
    const Drawer = getDep('Drawer');

    const settingName = actions.getSettingName();
    if (!isSettingNameValid(settingName)) {
        Message.error("the param 'settingName' of TablePro is required and length > 10");
        return;
    }

    const actionEmitter = new TinyEmitter();

    const LOCAL_FORAGE_KEY = getLocaleForageKey(settingName);

    // 上次移除的列
    const setting = (await storageInstance.getItem(LOCAL_FORAGE_KEY)) as string;

    const settingArray = parseJsonObject(setting);
    const tableProps = actions.getTableProps();
    const editingColumns = toEditingColumns(tableProps.columns || [], settingArray);

    const {prefix} = ConfigProvider.getContext();

    const dialogRef = {
        editingColumns: editingColumns,
        dialogInstance: null
    };
    const onSortEnd = (newSetting: any) => {
        dialogRef.editingColumns = [...newSetting];
    }

    const onSaveSetting = async () => {
        const editingColumns = (dialogRef.editingColumns || []).map((c, index)=>{
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
        actions.updateColumns();
        Message.success("设置生效成功！");
    }


    const onRevertSetting = async () => {
        dialogRef.editingColumns = toEditingColumns(tableProps.columns || [], []);
        actionEmitter.emit("forceUpdateDataSource", dialogRef.editingColumns);

        await storageInstance.removeItem(LOCAL_FORAGE_KEY);
        actions.updateColumns();
        Message.success("恢复默认成功！");
    }


    const title = (
        <div className={`${prefix}column-setting-dialog-title`}>
            <span>列设置</span>
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
        width: 540,
        content: (
            <ColumnSettingTable onSortEnd={onSortEnd}
                                actionEmitter={actionEmitter}
                                dataSource={dialogRef.editingColumns}/>
        )
    });
}


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

    return editingColumns.filter((column:any) => {
        const editingDisplay = column.editingDisplay as any;
        return editingDisplay !== false;
    }).map((column) => {
        const columnObj = {...column};

        if (columnObj.editingLockLeft === true) {
            columnObj.lock = 'left';
        }

        if (columnObj.editingLockRight === true) {
            columnObj.lock = 'right';
        }

        if(!columnObj.editingLockLeft && !columnObj.editingLockRight) {
            delete columnObj.lock;
        }

        delete columnObj.editingLockLeft;
        delete columnObj.editingLockRight;
        delete columnObj.editingDisplay;
        delete columnObj.editingSortIndex;
        return columnObj;
    });
}


export {
    showColumnSettingDialog,
    getTableColumnsBySetting
}
