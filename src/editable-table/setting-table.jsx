import React, {useRef, useState} from "react";
import {EditableTable} from './editable-table.jsx'
import Box from '../box'
import Button from '../button'
import Message from '../message'
import {uniqueId} from "../util/guid";
import {defaultPrefix} from "../config-provider";


const EDITABLE_TABLE_COMPONENTS = {};

function SettingTable({columns, dataSource, onAddData, components, prefix}) {

    const actionsRef = useRef();
    const [tick, setTick] = useState();

    const onCreated = ({actions}) => {
        actionsRef.current = actions;
    }

    const forceUpdateTable = () => {
        setTick(Date.now());
    }

    const actionColumn = {
        title: '操作',
        width: 120,
        lock: 'left',
        dataIndex: 'id',
        cell: (a, index, record) => {

            const onMoveUp = () => {
                if (index - 1 < 0) {
                    return;
                }
                const row = dataSource[index];
                dataSource[index] = dataSource[index - 1];
                dataSource[index - 1] = row;
                forceUpdateTable();
                Message.success('上移成功')
            };
            const onMoveDown = () => {
                if (index + 1 >= dataSource.length) {
                    return;
                }
                const row = dataSource[index];
                dataSource[index] = dataSource[index + 1];
                dataSource[index + 1] = row;
                forceUpdateTable();
                Message.success('下移成功')
            };
            const onMoveOff = () => {
                dataSource.splice(index, 1);
                forceUpdateTable();
                Message.success('删除成功')
            };

            return (
                <div className={`${prefix}-setting-table-action`}>
                    <Box direction="row" spacing={10}>
                        <Button text type='primary' onClick={onMoveUp} disabled={index - 1 < 0}>上移</Button>
                        <Button text type='primary' onClick={onMoveDown}
                                disabled={index + 1 >= dataSource.length}>下移</Button>
                        <Button text type='primary' onClick={onMoveOff}>删除</Button>
                    </Box>
                </div>
            );
        }
    };


    const mergeColumns = [actionColumn, ...columns];

    if (Array.isArray(dataSource)) {
        for (let i = 0; i < dataSource.length; i++) {
            const dataSourceElement = dataSource[i];
            if (!dataSourceElement.settingKey) {
                dataSourceElement.settingKey = uniqueId()
            }
        }
    }

    const mergeComponents = {
        ...EDITABLE_TABLE_COMPONENTS,
        ...components
    }

    return (
        <div className={`${prefix}-setting-table`} >
            <EditableTable
                primaryKey={'settingKey'}
                components={mergeComponents}
                columns={mergeColumns}
                size={'small'}
                dataSource={dataSource}
                onCreated={onCreated}/>
            <Button type={'secondary'}
                    className={`${prefix}-setting-table-add`}
                    onClick={() => {
                        onAddData()
                        forceUpdateTable()
                    }}>添加设置</Button>
        </div>
    );
}

SettingTable.defaultProps = {
    prefix: defaultPrefix,
    components: {},
};

SettingTable.registerComponents = (components) => {
    Object.assign(EDITABLE_TABLE_COMPONENTS, components);
}

export {
    SettingTable
}
