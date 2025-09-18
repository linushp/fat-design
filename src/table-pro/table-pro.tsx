import React from "react";
import get from "../util/lodash-get";
import classNames from 'classnames';
import {IUseTableProParams, TableProProps} from "./types";
import Table from "../table";
import Pagination from "../pagination";
import QueryForm from "../query-form";
import ConfigProvider from "../config-provider";
import Button from "../button";
import tableUtils from "./widget/index";
import {logger} from "../util/log";
import { isSettingNameValid } from './widget/column-setting'

interface TableProState {
    columns: any[] | null,
}

const EMPTY_STYLE = {};


function getTableComp(components: any, stickyLock: boolean) {
    if (components && components['Table']) {
        return components['Table']
    }
    if (stickyLock) {
        return Table.StickyLock;
    }
    return Table;
}


class TableProImpl extends React.Component<TableProProps, TableProState> {

    static defaultProps = {};
    static displayName = 'TableProImpl';

    constructor(props: any) {
        super(props);
        this.state = {
            columns: null, // columns为null表示没有初始化完成
        };
    }

    updateColumns = async () => {
        const columns = await tableUtils.getTableColumnsBySetting(this.props);
        this.setState({columns: columns});
    }

    componentDidMount() {
        this.updateColumns();
    }

    paginationTotalRender = (total: string) => {
        const {prefix} = this.props;
        const cls = `${prefix}tablepro-total-render`;
        return (
            <div className={cls}>共 {total} 项</div>
        )
    }

    rowSelectedMsgRender = (tableProps: any) => {
        const {prefix, actions} = this.props;
        const {updateRowSelection} = actions;
        const ids = get(tableProps, 'rowSelection.selectedRowKeys');
        const isEnableCrossPageRowSelection = get(tableProps, 'rowSelection.isEnableCrossPageRowSelection');
        if (!ids || ids.length === 0) {
            return null;
        }

        const cls = `${prefix}tablepro-row-selected-msg`;
        return (
            <div className={cls}>
                <div>
                    已选择 {ids.length} 项
                </div>
                <Button
                    text
                    type="primary"
                    onClick={() => {
                        updateRowSelection({selectedRowKeys: []});
                    }}>取消选择</Button>
                {isEnableCrossPageRowSelection ? (
                    <div>
                        (支持跨页选择)
                    </div>
                ) : null}
            </div>
        );
    }

    render() {

        const {
            prefix,
            components,
            paginationProps,
            filterProps,
            formProps,
            operationProps,
            tableProps,
            actions,
            slots,
            styleMode,
            settingName,
            className,
            stickyLock = true,
            styleConfig
        } = this.props;

        let columns = (isSettingNameValid(settingName) ?  this.state.columns : tableProps?.columns) || [];

        actions.getSettingName = () => {
            return settingName;
        };
        actions.updateColumns = () => {
            this.updateColumns()
        };


        const initialParams = actions.getInitialParams() as IUseTableProParams;

        const cls = (txt: string) => {
            return `${prefix}tablepro-${txt}`;
        }

        const QueryFormComp = (components && components['QueryForm']) || QueryForm;
        const TableComp = getTableComp(components, stickyLock);
        const PaginationComp = (components && components['Pagination']) || Pagination;

        if (paginationProps.totalRender === 'default') {
            paginationProps.totalRender = (total: string) => {
                return this.paginationTotalRender(total);
            }
        }

        const {title, showTotal, ...otherTableProps} = tableProps;

        logger.debug('TableProImpl render , columns = ', columns);

        if (columns === null) {
            return null;
        }

        const compCls = classNames({[cls('com')]: true, [`${className}`]: !!className});

        const contentStyle = get(styleConfig, 'contentStyle', EMPTY_STYLE) ;
        const queryFormStyle = get(styleConfig, 'queryFormStyle', EMPTY_STYLE) ;
        const rootStyle = get(styleConfig, 'rootStyle', EMPTY_STYLE) ;
        const tableStyle = get(styleConfig, 'tableStyle', EMPTY_STYLE) ;
        const bottomStyle = get(styleConfig, 'bottomStyle', EMPTY_STYLE) ;

        return (
            <div className={compCls} style={rootStyle}>

                {initialParams.initFormProps ? (
                    <div className={cls('query-form')} style={queryFormStyle}>
                        <QueryFormComp {...formProps} />
                    </div>
                ) : null}


                {
                    (slots && typeof slots.renderAfterQueryForm === "function") ?
                        slots.renderAfterQueryForm(this.props)
                        : null
                }

                <div className={cls('content')} style={contentStyle} >

                    {
                        (initialParams.initFilterProps || initialParams.initOperationProps) ?
                            tableUtils.renderTableToolbar({
                                title: title,
                                totalCount: paginationProps.total,
                                filterProps: filterProps,
                                operationProps: operationProps,
                                prefix: prefix,
                                actions: actions,
                                components: components
                            }) : null
                    }

                    <div className={cls('table')} style={tableStyle}>
                        <TableComp {...otherTableProps} columns={columns}/>
                    </div>

                    <div className={cls('table-bottom')} style={bottomStyle}>
                        <div className={cls('row-selected')}>
                            {this.rowSelectedMsgRender(tableProps)}
                        </div>

                        {
                            initialParams.initPaginationProps ? (
                                <div className={cls('pagination')}>
                                    <PaginationComp {...paginationProps} />
                                </div>
                            ) : null
                        }

                    </div>

                </div>
            </div>
        );
    }
}


const TableProInner = ConfigProvider.config<typeof TableProImpl>(TableProImpl, {});

export {
    TableProInner
}
