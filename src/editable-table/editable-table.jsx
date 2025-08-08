import {ComponentsStore, get} from "../util";
import {useEffect, useMemo, useState} from "react";
import {usePersistFn} from "../hooks/usePersistFn";
import ConfigProvider, {defaultPrefix} from "../config-provider";
import {TinyEmitter} from "../util/tiny-emitter.ts";

const nextTick = () => {
    nextTick.valueIndex = nextTick.valueIndex || 1;
    nextTick.valueIndex++;
    return `${Date.now()}_${nextTick.valueIndex}`;
}

function ColumnCell({column, record, Comp, actions, prefix}) {
    const xProps = column.xProps || {};
    const [tick, setTick] = useState('');
    const handleOnChange = (newValue) => {
        const oldValue = get(record, column.dataIndex);

        record[column.dataIndex] = newValue;

        if (xProps.onChange) {
            xProps.onChange(newValue, record, oldValue);
        }

        actions.onRowValueChange(record, column);

        // 更新单元格
        setTick(nextTick());

        // 更新整个行
        if (column.forceUpdateRow === true) {
            actions.forceUpdateRow(record, column)
        }

        // 更新整个表格
        if (column.forceUpdateTable === true) {
            actions.forceUpdateTable(record, column)
        }

    }

    const value = get(record, column.dataIndex);

    const compProps = {
        ...xProps,
        className: `${prefix}editable-table-comp`,
        record: record,
        onChange: handleOnChange,
    };

    if (Comp.displayName === 'WithConsumer(Checkbox)') {
        compProps.checked = value;
    } else {
        compProps.value = value;
    }

    return (<Comp {...compProps} />);
}

function getColumnCell(column, comps, actions, prefix) {
    if (typeof column.cell === "function") {
        return column.cell;
    }

    if (column.component) {

        let Comp = null;
        if (typeof column.component === "function") {
            Comp = column.component;
        } else {
            Comp = comps.getComponentTag(column.component);
        }
        if (Comp) {
            return (v, b, record) => {
                return (
                    <ColumnCell
                        value={v}
                        record={record}
                        Comp={Comp}
                        column={column}
                        actions={actions}
                        prefix={prefix}
                    />);
            }
        }
    }
    return null;
}

function EditableTableImpl(props, ref) {

    const {columns = [], components, prefix = defaultPrefix, onRowValueChange, onCreated, ...otherProps} = props;

    const [tableTick, setTableTick] = useState('');

    const actionEmitter = useMemo(() => {
        if (props.actionEmitter) {
            return props.actionEmitter;
        }
        return new TinyEmitter();
    }, []);


    const tableProps = {
        ...otherProps,
        prefix,
        actionEmitter
    };


    const comps = useMemo(() => {
        return new ComponentsStore({
            components: components || {}
        });
    }, []);

    const actions = {
        forceUpdateTable: usePersistFn(() => {
            setTableTick(nextTick());
        }),
        onRowValueChange: usePersistFn((row, column) => {
            if (typeof onRowValueChange === "function") {
                onRowValueChange(row, column);
            }
        }),
        forceUpdateRow: usePersistFn((row, column) => {
            actionEmitter.emit('forceUpdateRow', row, column);
        })
    };


    const Table = comps.getComponentTag('Table');

    const editableColumns = columns.map((column) => {
        const {component, xProps, ...others} = column;
        const columnObject = {...others};
        const cell = getColumnCell(column, comps, actions, prefix);
        if (cell) {
            columnObject.cell = cell;
        }
        return columnObject;
    });

    useEffect(()=>{
        if (typeof onCreated === "function"){
            onCreated({actions})
        }
    },[])

    return (
        <Table prefix={prefix} {...tableProps} columns={editableColumns}/>
    )
}


EditableTableImpl.defaultProps = {
    prefix: defaultPrefix
};

const EditableTable = ConfigProvider.configFn(EditableTableImpl, {
    componentName: 'EditableTable'
});

export {
    EditableTable
}
