import React from "react";
import Filter from "../../filter";
import {TableOperations} from "./operations";
import {TableToolbarProps} from "./table-utils-types";
import ConfigProvider from "../../config-provider";
import {isNotEmpty} from "../../util/func";


function TableToolbarImpl(props: TableToolbarProps, ref: any) {

    const {title, totalCount, filterProps, operationProps, prefix, actions, components} = props;

    const FilterComp = (components && components['Filter']) || Filter;
    const OperationsComp = (components && components['Operations']) || TableOperations;

    const cls = (name: string) => {
        return `${prefix}table-utils-toolbar-${name}`;
    }

    return (
        <div className={cls('comp')}>

            {
                title ? (
                    <div className={cls('title')}>
                        {title}
                    </div>
                ) : null
            }

            {
                (typeof totalCount === "number" || typeof totalCount === "string") ? (
                    <div className={cls('total')}>
                        共 {totalCount} 项
                    </div>
                ) : null
            }

            {
                filterProps && isNotEmpty(filterProps.dataSource) ? (
                    <div className={cls('filter-wrap')}>
                        <FilterComp {...filterProps} />
                    </div>
                ) : null
            }

            {
                operationProps ? (
                    <div className={cls('operations-wrap')}>
                        <OperationsComp {...operationProps} prefix={prefix} actions={actions}/>
                    </div>
                ) : null
            }

        </div>
    )
}


const TableToolbar = ConfigProvider.config<typeof TableToolbarImpl>(React.forwardRef(TableToolbarImpl), {
    componentName : 'TableToolbarImpl',
});

const renderTableToolbar = (props: TableToolbarProps) => {
    return <TableToolbar {...props} />
};

export {
    TableToolbar,
    renderTableToolbar
}
