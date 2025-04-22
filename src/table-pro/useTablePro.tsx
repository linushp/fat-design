import {useCurrentState, useCurrentState2} from "../hooks/useCurrentState";
import {useEffect, useRef, useState} from "react";
import {log} from "../util";
import {ComponentsStore} from "../util/comp";
import {usePersistFn} from "../hooks/usePersistFn";
import formatQueryRes from './utils/formatQueryRes'
import {logger} from "../util/log";
import _get from "lodash.get";
import {pickErrorMessage} from "../util/pick-res-data";
import {toMap} from "../util/toMap";
import {IUseTableProParams} from "./types";

function getDep(name:string) {
    return _get(ComponentsStore.buildInComponents, name);
}


function initByParams(ob1: any, obj2: any) {
    if (obj2 && typeof obj2 === 'object') {
        Object.assign(ob1, obj2);
    }
    return ob1;
}


const noop = () => {
}


const QUERY_TRIGGER = {
    DID_MOUNT: 'DID_MOUNT',
    FORM_ON_SUBMIT: 'FORM_ON_SUBMIT',
    FORM_ON_RESET: 'FORM_ON_RESET',
    FORM_ON_ASYNC_ENUMS: 'FORM_ON_ASYNC_ENUMS',
    FILTER_ON_CHANGE: 'FILTER_ON_CHANGE',
    PAGINATION_ON_CHANGE: 'PAGINATION_ON_CHANGE',
    PAGINATION_ON_CHANGE_SIZE: 'PAGINATION_ON_CHANGE_SIZE',
};


class TableProActions {
    public name: string = 'TableProActions';
}


/**
 *  其他模块可以通过在useEffect中观察currentQueryParams和currentQueryTrigger对象，
 *  可能需要对currentQueryTrigger进行过滤
 *  触发查询。
 */
interface TempVars {
    didFirstQuery: boolean,
    actions: any,
    currentQueryParams: any, // 当前执行查询时，使用的查询参数
    currentQueryTrigger: string, // 当前执行查询时，动作是由什么触发的.
    entireDataSourceMap: any // 所有的表格数据。用于跨页选择的缓存
}

function useTablePro(params: IUseTableProParams) {

    const Message = getDep('Message');

    const {autoFirstQuery = true, isEnableRowSelection = true, isEnableCrossPageRowSelection = false} = params;

    const tempVarsRef = useRef<TempVars>({
        didFirstQuery: false,
        actions: new TableProActions(),
        currentQueryParams: {},
        currentQueryTrigger: '',
        entireDataSourceMap: {},
    });

    const tempVars = tempVarsRef.current as TempVars;

    const [loading, setLoading, getIsLoading] = useCurrentState(false);

    const [rowSelection, updateRowSelection, getRowSelection] = useCurrentState2(initByParams({
        selectedRowKeys: []
    }, params.initTableProps.rowSelection));

    const [formProps, updateFormProps, getFormProps] = useCurrentState2(initByParams({
        _tmpFormValues: params.initFormProps?.defaultValues || {},
        isUseCard: true
    }, params.initFormProps));

    const [tableProps, updateTableProps, getTableProps] = useCurrentState2(initByParams({
        showTotal: true,
        title: null,
        primaryKey: 'id'
    }, params.initTableProps));

    const [paginationProps, updatePaginationProps, getPaginationProps] = useCurrentState2(initByParams({
        pageSizeList: [10, 20, 50, 100, 200],
        shape: 'arrow-only',
        pageSizePosition: 'end',
        pageSizeSelector: 'filter',
        showJump: false,
        pageSize: 20,
        current: 1,
        total: 0,
        totalRender: 'default',
        size: params.initTableProps.size,
    }, params.initPaginationProps));


    const [filterProps, updateFilterProps, getFilterProps] = useCurrentState2(initByParams({
        defaultValue: 'ALL',
        value: 'ALL',
        dataSource: [
            {label: '全部', value: 'ALL'}
        ],
    }, params.initFilterProps));


    const [operationProps, updateOperationProps, getOperationProps] = useCurrentState2(initByParams({}, params.initOperationProps));

    const getQueryParams = usePersistFn((queryTrigger: string) => {
        const currentPaginationProps = getPaginationProps();
        const currentFilterProps = getFilterProps();
        const currentFormProps = getFormProps();

        return {
            formValues: currentFormProps._tmpFormValues,
            otherValues: {
                queryTrigger,
                current: currentPaginationProps.current,
                pageSize: currentPaginationProps.pageSize,
                filterValue: currentFilterProps.value
            }
        }
    });

    const cacheEntireDataSourceMap = usePersistFn(() => {

        if (!isEnableCrossPageRowSelection) {
            // 没有开启跨了页行选择。只需要缓存本次查询的结果即可
            tempVars.entireDataSourceMap = {}
        }

        const tableProps = getTableProps();
        if (!tableProps.primaryKey) {
            throw new Error('tableProps is missing the primaryKey parameter');
        }
        const dataSource = tableProps.dataSource || []
        const dataSourceMap = toMap(dataSource, (r: any) => {
            return r[tableProps.primaryKey];
        });
        Object.assign(tempVars.entireDataSourceMap, dataSourceMap);
    });


    const doQuery = async (queryTrigger: string) => {
        tempVars.didFirstQuery = true;

        log.debug('[useQueryFormTable] onQuery by ' + queryTrigger)


        const currentQueryParams = getQueryParams(queryTrigger);

        const {formValues, otherValues} = currentQueryParams;
        if (typeof params.onQuery !== "function") {
            log.error('[useQueryFormTable] onQuery must be function')
            return false;
        }

        setLoading(true);



        // 未开启跨页行选择, 查询按钮点击、重制按钮点击 ==>清空选框
        if (!isEnableCrossPageRowSelection || queryTrigger===QUERY_TRIGGER.FORM_ON_SUBMIT || queryTrigger===QUERY_TRIGGER.FORM_ON_SUBMIT) {
            updateRowSelection({selectedRowKeys: []});
        }

        let res0;
        try {

            tempVars.currentQueryParams = {formValues, otherValues};
            tempVars.currentQueryTrigger = queryTrigger;

            res0 = await params.onQuery(formValues, otherValues);
        } catch (e) {
            log.error('[useQueryFormTable] onQuery error ', e);
            Message.error(pickErrorMessage(e));
        }

        setLoading(false);

        const res = formatQueryRes(res0);

        if (!res || !res.tableProps) {
            // 返回null表示本次查询无效。
            return false;
        }

        updatePaginationProps(res.paginationProps); // update 函数内部已经做了判空处理
        updateFormProps(res.formProps);
        updateTableProps(res.tableProps);
        updateFilterProps(res.filterProps);
        updateOperationProps(res.operationProps);
        cacheEntireDataSourceMap();




        return true;
    };


    /**
     * 尝试第一次查询
     * @param queryTrigger
     */
    const tryFirstQuery = async (queryTrigger: string) => {
        if (!autoFirstQuery) {
            // 不需要
            return;
        }

        if (tempVars.didFirstQuery) {
            // 已经做过第一次查询了
            return;
        }

        const queryParams = getQueryParams(queryTrigger);

        //  是否准备好可以开始第一次查询了。
        let isReadyToFirstQuery = true;
        if (params.isReadyToFirstQuery) {
            isReadyToFirstQuery = params.isReadyToFirstQuery(queryParams.formValues, queryParams.otherValues);
        }

        // 还没有准备好第一次查询。
        if (!isReadyToFirstQuery) {
            return;
        }

        return doQuery(queryTrigger);
    };


    filterProps.onChange = usePersistFn((value: any) => {
        if (getIsLoading()) {
            return;
        }

        filterProps.value = value;
        paginationProps.current = 1;

        updatePaginationProps(paginationProps);
        updateFilterProps(filterProps);
        doQuery(QUERY_TRIGGER.FILTER_ON_CHANGE).then(noop);
    });


    formProps.onSubmit = usePersistFn((values: any) => {
        if (getIsLoading()) {
            return;
        }

        formProps._tmpFormValues = values;
        paginationProps.current = 1;

        updatePaginationProps(paginationProps);
        updateFormProps(formProps);
        return doQuery(QUERY_TRIGGER.FORM_ON_SUBMIT).then((isSuccess) => {
            if (isSuccess) {
                updateFilterProps({
                    value: getFilterProps().defaultValue,
                });
            }
        });
    });

    formProps.onReset = usePersistFn((values: any) => {
        if (getIsLoading()) {
            return;
        }

        formProps._tmpFormValues = values;
        paginationProps.current = 1;

        updatePaginationProps(paginationProps);
        updateFormProps(formProps);
        return doQuery(QUERY_TRIGGER.FORM_ON_RESET).then(() => {
            updateFilterProps({
                value: getFilterProps().defaultValue,
            });
        });
    });


    formProps.onAsyncEnums = usePersistFn((childProps: any, {formActions}: any) => {
        formProps._tmpFormValues = formActions.getValues();
        updateFormProps(formProps);
        tryFirstQuery(QUERY_TRIGGER.FORM_ON_ASYNC_ENUMS).then(noop);
    });


    paginationProps.onChange = usePersistFn((current: number) => {
        if (getIsLoading()) {
            return;
        }

        paginationProps.current = current;
        updatePaginationProps(paginationProps);
        doQuery(QUERY_TRIGGER.PAGINATION_ON_CHANGE).then(noop);
    });

    paginationProps.onPageSizeChange = usePersistFn((pageSize: number) => {
        if (getIsLoading()) {
            return;
        }

        paginationProps.current = 1;
        paginationProps.pageSize = pageSize;
        updatePaginationProps(paginationProps);
        doQuery(QUERY_TRIGGER.PAGINATION_ON_CHANGE_SIZE).then(noop);
    });

    rowSelection.onChange = usePersistFn((ids: any, records: any) => {
        logger.debug('rowSelection.onChange ids:', ids)
        rowSelection.selectedRowKeys = ids;
        updateRowSelection(rowSelection);
    });

    rowSelection.isEnableCrossPageRowSelection = isEnableCrossPageRowSelection;


    tableProps.loading = loading;

    if (isEnableRowSelection) {
        tableProps.rowSelection = rowSelection;
    }

    useEffect(() => {
        tryFirstQuery(QUERY_TRIGGER.DID_MOUNT).then(noop);
    }, []);


    const getSelectedRowList = usePersistFn(() => {
        if (!tableProps.primaryKey) {
            throw new Error('tableProps is missing the primaryKey parameter');
        }
        const selectedRowKeys = rowSelection.selectedRowKeys || []
        const dataSourceMap = tempVars.entireDataSourceMap;
        return selectedRowKeys.map((key: string) => {
            return dataSourceMap[key];
        });
    });


    const actions = tempVars.actions;

    actions.updateRowSelection = updateRowSelection;
    actions.updatePaginationProps = updatePaginationProps;
    actions.updateFormProps = updateFormProps;
    actions.updateTableProps = updateTableProps;
    actions.updateFilterProps = updateFilterProps;
    actions.updateOperationProps = updateOperationProps;

    actions.getRowSelection = getRowSelection;
    actions.getPaginationProps = getPaginationProps;
    actions.getFormProps = getFormProps;
    actions.getTableProps = getTableProps;
    actions.getFilterProps = getFilterProps;
    actions.getOperationProps = getOperationProps;
    actions.getQueryParams = getQueryParams;
    actions.doQuery = usePersistFn(doQuery);
    actions.getSelectedRowList = getSelectedRowList;
    actions.getInitialParams = ()=>{return params;};
    actions.getSettingName = ()=> {
        logger.error("getSettingName not implemented");
    };

    return {
        formProps,
        tableProps,
        paginationProps,
        filterProps,
        operationProps,
        actions,
    };
}


export {
    useTablePro
}
