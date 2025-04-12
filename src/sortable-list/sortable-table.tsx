import React, {useRef, useEffect, useState} from 'react';
import classNames from 'classnames';
import SortableList, {SortableKnob, SortableItem} from "./sortable-list";
import {SortableTableProps} from "./types";
import ConfigProvider, {defaultPrefix} from "../config-provider";
import {logger} from "../util/log";
import {arrayMoveImmutable} from "../util/array-move";
import {uniqueId} from "../util/guid";
import {usePersistFn} from "../hooks/usePersistFn";


interface SortableTableRowProps {
    tablePrefix: string,
    columns: any[],
    row: any,
    rowIndex: number,
    getCellStyle: any,
    actionEmitter: any
}


function SortableTableRow(props: SortableTableRowProps) {
    const {tablePrefix, row, columns, getCellStyle, rowIndex, actionEmitter} = props;
    const [tableRowTick, setTableRowTick] = useState('');


    useEffect(() => {
        const listener = (targetRow: any) => {
            if (row === targetRow) {
                logger.debug('receive forceUpdateRow ', targetRow);
                setTableRowTick(uniqueId());
            }
        };

        if (actionEmitter && typeof actionEmitter.on === "function") {
            actionEmitter.on('forceUpdateRow', listener);
        }
        return () => {
            if (actionEmitter && typeof actionEmitter.off === "function") {
                actionEmitter.off('forceUpdateRow', listener);
            }
        }

    }, [actionEmitter, row]);

    return (
        <SortableItem key={row.tmpRowKey}>
            <div className={`${tablePrefix}-tr`} key={`tr-${row.tmpRowKey}`}>
                {
                    columns.map((col: any, colIndex: number) => {
                        if (!col || typeof col !== "object") {
                            col = {};
                        }
                        const draggable = col.draggable;
                        const value = row[col.dataIndex];

                        const cls = classNames({
                            [`${tablePrefix}-td`]: true,
                            [`${tablePrefix}-td-draggable`]: !!draggable,
                        });

                        const cell = (
                            <div className={cls} key={colIndex} style={getCellStyle(colIndex)}>
                                {
                                    typeof col.cell === "function" ? col.cell(value, rowIndex, row) : value
                                }
                            </div>
                        );

                        if (draggable) {
                            return (<SortableKnob key={colIndex}>{cell}</SortableKnob>);
                        }

                        return cell;
                    })
                }
            </div>
        </SortableItem>
    )
}

function calcColumnWidthArray(columns: any[], tableWidth: number): string[] {

    if (!columns || columns.length === 0) {
        return [];
    }

    const defaultWidth = 140;
    let total = 0;
    let noWidthCount = 0;
    const columns2 = columns.map((column) => {
        let isNoWidth = false;
        const widthParsed = parseInt(column.width, 10);
        if (!column.width || !widthParsed) { // 不存在或者解析失败
            noWidthCount++;
            isNoWidth = true;
        }

        const width2 = widthParsed || defaultWidth;
        total = total + width2;
        return {
            ...column,
            width2: width2,
            isNoWidth
        }
    });

    let diff = tableWidth - total;
    if (diff >= 0) {
        // 优先分配给没有width属性的列
        let noWidthColumnPreDiff = 0;
        if (noWidthCount > 0 && diff > 0) {
            noWidthColumnPreDiff = diff / noWidthCount;
        }

        // 还有剩余的话，所有列都分配一下
        let allPreDiff = 0;
        diff = diff - noWidthColumnPreDiff * noWidthCount;

        if (diff > 0) {
            allPreDiff = diff / columns.length;
        }

        const columns3 = columns2.map((column) => {
            let width3 = column.width2;
            if (column.isNoWidth && noWidthColumnPreDiff > 0) {
                width3 = width3 + noWidthColumnPreDiff;
            }
            if (allPreDiff) {
                width3 = width3 + allPreDiff;
            }
            return {...column, width3};
        });

        return columns3.map((column) => {
            return `${column.width3}px`;
        });
    }


    return columns2.map((column) => {
        return `${100 * column.width2 / total}%`
    });
}


function addRowKey(dataSource: any[]) {
    for (let i = 0; i < dataSource.length; i++) {
        const dataSourceElement = dataSource[i];
        if (!dataSourceElement.tmpRowKey) {
            dataSourceElement.tmpRowKey = uniqueId('row');
        }
    }
}

function SortableTableImpl(props: SortableTableProps, ref: any) {
    const {columns, dataSource, prefix, size, isZebra,  onSortEnd, actionEmitter, onCreated} = props;
    const tablePrefix = `${prefix}sortable-table`;
    addRowKey(dataSource);
    const [items, setItems] = React.useState(dataSource);

    const tableClass = classNames({
        [tablePrefix]: true,
        [`${tablePrefix}-${size}`]: !!size,
        [`${tablePrefix}-zebra`]: isZebra,
    });

    const [columnWidthArray, setColumnWidthArray] = useState<string[]>();
    const tableRef = useRef(null);

    const getItems = usePersistFn(()=>{
        return items;
    })


    useEffect(() => {
        setTimeout(() => {
            const tableDom = tableRef.current as any;
            if (tableDom) {
                const rect = tableDom.getBoundingClientRect();
                const widths = calcColumnWidthArray(columns, rect.width);
                setColumnWidthArray(widths);
            } else {
                logger.error('SortableTableImpl get tableDom error');
            }
        }, 20);
    }, []);





    useEffect(() => {
        const updateDataSource = (newDataSource: any) => {
            addRowKey(newDataSource);
            setItems(newDataSource);
        };

        if (actionEmitter && typeof actionEmitter.on === "function") {
            actionEmitter.on('forceUpdateDataSource', updateDataSource);
        }


        if (typeof onCreated === "function") {
            onCreated({
                actionEmitter,
                setDataSource: updateDataSource,
                getDataSource: getItems
            });
        }

        return () => {
            if (actionEmitter && typeof actionEmitter.off === "function") {
                actionEmitter.off('forceUpdateDataSource', updateDataSource);
            }
        }

    }, [actionEmitter]);



    const getCellStyle = (colIndex: number) => {
        if (!columnWidthArray) {
            return {
                width: '100px',
                minWidth: '20px',
            };
        } else {
            return {
                width: columnWidthArray[colIndex] || '100px',
                minWidth: '20px',
            };
        }
    }

    logger.debug('SortableTableImpl render', items);

    return (
        <div className={tableClass} ref={tableRef}>
            {
                columnWidthArray ? (
                    <>
                        <div className={`${tablePrefix}-header`}>
                            <div className={`${tablePrefix}-tr`}>
                                {
                                    columns.map((col: any, colIndex: number) => {
                                        if (!col || typeof col !== "object") {
                                            col = {};
                                        }
                                        return (
                                            <div className={`${tablePrefix}-th`} key={colIndex}
                                                 style={getCellStyle(colIndex)}>
                                                {col.title || colIndex}
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        <SortableList
                            customHolderRef={tableRef}
                            className={`${tablePrefix}-body`}
                            draggedItemClassName={`${tablePrefix}-tr ${tablePrefix}-tr-dragged`}
                            onSortEnd={function noRefCheck(oldIndex: number, newIndex: number) {
                                console.log('onSortEnd', oldIndex, newIndex)
                                setItems((array) => {
                                    const nextArray = arrayMoveImmutable(array, oldIndex, newIndex);
                                    if (typeof onSortEnd === "function") {
                                        onSortEnd(nextArray, oldIndex, newIndex);
                                    }
                                    return nextArray;
                                })
                            }}
                        >
                            {items.map((row, index) => {
                                const rowProps = {
                                    tablePrefix,
                                    columns,
                                    row,
                                    rowIndex: index,
                                    getCellStyle,
                                    actionEmitter
                                }
                                return (
                                    <SortableTableRow {...rowProps} key={row.tmpRowKey}/>
                                )
                            })}

                        </SortableList>
                    </>
                ) : null
            }
        </div>
    );
}


SortableTableImpl.defaultProps = {
    prefix: defaultPrefix,
    isZebra: true,
};


const SortableTable = ConfigProvider.configFn(SortableTableImpl, {
    componentName: 'SortableTable',
});

export {
    SortableTable
}
