import {ComponentsStore} from "../util/comp";
import _get from "lodash.get";
import _set from "lodash.set";
import classNames from 'classnames';
import {defaultPrefix} from "../config-provider";

function getDep(name) {
    return _get(ComponentsStore.buildInComponents, name);
}

function TableContent(props) {
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
            contentStyle,
            prefix = defaultPrefix,
            className,
            ...otherProps
        } = config;

        return show({
            size,
            noPadding: true,
            className: classNames(`${prefix}dialog-show-table`, className),
            content: (
                <TableContent tableProProps={tableProProps}
                              contentStyle={contentStyle}
                              prefix={prefix}/>
            ),
            ...otherProps,
        });
    }
}


export {
    buildShowTable
}
