import {ComponentsStore} from "../util/comp";
import _get from "../util/lodash-get.js";
import _set from "lodash.set";
import classNames from 'classnames';
import {defaultPrefix} from "../config-provider";

function getDep(name) {
    return _get(ComponentsStore.buildInComponents, name);
}

function TableContent(props) {
    const dialogRef = props.dialogRef;
    const prefix = props.prefix;
    const contentStyle = props.contentStyle;
    const tableProPropsParams = props.tableProProps;

    const TablePro = getDep('TablePro');
    const useTablePro = TablePro.useTablePro;
    const tableProProps = useTablePro(tableProPropsParams);

    //
    // const maxBodyHeightOld = _get(tableProProps, 'tableProps.maxBodyHeight');
    // if (!maxBodyHeightOld) {
    //     const maxBodyHeight = (Math.min(parseInt(contentStyle.height) || parseInt(contentStyle.maxHeight), 500)) - 100;
    //     _set(tableProProps, 'tableProps.maxBodyHeight', maxBodyHeight);
    // }

    _set(tableProProps, 'tableProps.maxBodyHeight', 10000);

    dialogRef.currentTableProProps = tableProProps;

    return (
        <div style={contentStyle} className={`${prefix}dialog-show-table-content`}>
            <TablePro {...tableProProps} styleMode={'simple'} />
        </div>
    )
}

function buildShowTable(show) {
    return function showTable(config = {}) {
        let {
            size = 'small',
            tableProProps = {},
            contentStyle = {},
            prefix = defaultPrefix,
            className,
            onOk,
            ...otherProps
        } = config;

        const dialogRef = {
            currentTableProProps: null,
        };

        const newOnOk = async (event, ...args) => {
            if (onOk) {
                event.tableProProps = dialogRef.currentTableProProps;
                return await onOk(event, ...args);
            }
        }

        return show({
            size,
            noPadding: true,
            className: classNames(`${prefix}dialog-show-table`, className),
            content: (
                <TableContent tableProProps={tableProProps}
                              contentStyle={contentStyle}
                              dialogRef={dialogRef}
                              prefix={prefix}/>
            ),
            onOk: newOnOk,
            ...otherProps,
        });
    }
}


export {
    buildShowTable
}
