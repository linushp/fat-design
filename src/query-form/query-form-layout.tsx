import React, {useRef} from 'react';
import _get from "lodash.get";
import _set from "lodash.set";
import {useSize} from "../hooks/useSize";
import {logger} from "../util/log";


function getColumns(width: number) {
    const breakPoints = [
        {width: 400, columns: 1},
        {width: 700, columns: 2},
        {width: 1000, columns: 3},
        {width: 1200, columns: 4},
        {width: 1400, columns: 5},
        {width: 1600, columns: 5},
        {width: 1700, columns: 6},
        {width: 1800, columns: 7},
        {width: 2000, columns: 10},
        {width: 1000000, columns: 10},
    ];

    for (let i = 0; i < breakPoints.length; i++) {
        const breakPoint = breakPoints[i];
        if (width <= breakPoint.width) {
            return breakPoint.columns
        }
    }

    return 5;
}

function getCellsCount(children: any): number {
    let total = 0;
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const colSpan = _get(child,'props.cellProps.colSpan', 1);
        total = total + colSpan;
    }
    return total;
}


function setQueryFormButtonGroupSpan(children: any, addedCellsCount: number) {
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child && child.props && child.props.name === 'QueryFormButtonGroup') {
            const newProps = {...child.props};

            const colSpan = _get(newProps, 'cellProps.colSpan', 1);
            _set(newProps, 'cellProps.colSpan', colSpan + addedCellsCount);

            children[i] = React.cloneElement(child, newProps);
        }
    }
}


function useFormWidth(ref: any, initialFormWidth?: number): number {
    const widthRef = useRef(0)
    const {width} = useSize(ref);
    if (width) {
        widthRef.current = width;
        return width;
    }
    return widthRef.current || initialFormWidth || 0
}


function useQueryFormLayout(ref: any, fixProps: any, initialFormWidth?: number): any {
    const width = useFormWidth(ref, initialFormWidth);
    logger.debug('useQueryFormLayout', width);
    if (!width) {
        return null;
    }

    const children = fixProps.children;

    if (fixProps.layout === 'responsive') {

        const layoutProps = fixProps.layoutProps || {};

        if (typeof layoutProps.columns === "number" && layoutProps.columns > 0) {
            return fixProps;
        }

        const cellsCount = getCellsCount(children);
        const columnCount = getColumns(width - 32);
        const rowCount = Math.ceil(cellsCount / columnCount); // 需要多少行
        const maxCellsCount = columnCount * rowCount;

        if (maxCellsCount > cellsCount) {
            setQueryFormButtonGroupSpan(children, maxCellsCount - cellsCount);
        }


        fixProps.layoutProps = {
            ...layoutProps,
            columns: columnCount
        };
    }

    return fixProps;
}

export {
    useQueryFormLayout
}
