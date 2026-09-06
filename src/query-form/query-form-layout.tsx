import React, {useRef} from 'react';
import _get from "../util/lodash-get";
import _set from "lodash.set";
import {useSize} from "../hooks/useSize";
import {logger} from "../util/log";
import {FORM_ITEM_TYPE_MARK} from "../form2/helper/constants";


function getColumns(width: number) {
    // 基于每列宽度 200-300px 的原则计算列数
    // 优先使用 250px 作为理想列宽进行计算
    const idealColumnWidth = 250;
    const minColumnWidth = 200;
    const maxColumnWidth = 300;
    
    // 计算理想列数
    const idealColumns = Math.floor(width / idealColumnWidth);
    
    // 验证实际列宽是否在合理范围内
    const actualColumnWidth = width / idealColumns;
    
    if (actualColumnWidth >= minColumnWidth && actualColumnWidth <= maxColumnWidth) {
        return Math.max(1, idealColumns);
    }
    
    // 如果理想列数导致列宽过小，减少列数
    if (actualColumnWidth < minColumnWidth) {
        const adjustedColumns = Math.floor(width / minColumnWidth);
        return Math.max(1, adjustedColumns);
    }
    
    // 如果理想列数导致列宽过大，增加列数
    if (actualColumnWidth > maxColumnWidth) {
        const adjustedColumns = Math.ceil(width / maxColumnWidth);
        return adjustedColumns;
    }
    
    // 备用断点配置（如果上述计算出现异常）
    const breakPoints = [
        {width: 300, columns: 1},   // 0-300px: 1列
        {width: 500, columns: 2},   // 301-500px: 2列
        {width: 750, columns: 3},   // 501-750px: 3列
        {width: 1000, columns: 4},  // 751-1000px: 4列
        {width: 1250, columns: 5},  // 1001-1250px: 5列
        {width: 1500, columns: 6},  // 1251-1500px: 6列
        {width: 1750, columns: 7},  // 1501-1750px: 7列
        {width: 2000, columns: 8},  // 1751-2000px: 8列
        {width: 2250, columns: 9},  // 2001-2250px: 9列
        {width: 2500, columns: 10}, // 2251-2500px: 10列
        {width: 2750, columns: 11}, // 2501-2750px: 11列
        {width: 3000, columns: 12}, // 2751-3000px: 12列
        {width: 3500, columns: 14}, // 3001-3500px: 14列
        {width: 4000, columns: 16}, // 3501-4000px: 16列
        {width: 5000, columns: 20}, // 4001-5000px: 20列
        {width: Infinity, columns: 24}, // 5000px以上: 24列
    ];

    for (let i = 0; i < breakPoints.length; i++) {
        const breakPoint = breakPoints[i];
        if (width <= breakPoint.width) {
            return breakPoint.columns;
        }
    }

    return 12; // 默认返回值
}

function getCellsCount(children: any): number {
    let total = 0;
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const colSpan = Number(_get(child,'props.cellProps.colSpan', 1)) || 1;
        total = total + colSpan;
    }
    return total;
}


function isFormItem(child: any): boolean {
    const childTypeMark = child?.type?._typeMark
    return childTypeMark === FORM_ITEM_TYPE_MARK
}

//
// function setQueryFormButtonGroupSpan(children: any, columnCount: number, displayRowCount: number) {
//     // 计算可见表单项占用的单元格数
//     let visibleFormItemCount = 0;
//     const maxVisibleCells = columnCount * displayRowCount;
//
//     for (let i = 0; i < children.length; i++) {
//         const child = children[i];
//         if (isFormItem(child)) {
//             const colSpan = Number(_get(child, 'props.cellProps.colSpan', 1)) || 1;
//             visibleFormItemCount += colSpan;
//         }
//     }
//
//     // 计算最后一行剩余的单元格数
//     const lastRowRemainingCells = maxVisibleCells - visibleFormItemCount;
//
//     // 设置 ButtonGroup 的 colSpan 为最后一行的剩余空间
//     for (let i = 0; i < children.length; i++) {
//         const child = children[i];
//         if (child && child.props && child.props.name === 'QueryFormButtonGroup') {
//             const newProps = {...child.props};
//             _set(newProps, 'cellProps.colSpan', lastRowRemainingCells);
//             children[i] = React.cloneElement(child, newProps);
//         }
//     }
// }


function useFormWidth(ref: any, initialFormWidth?: number): number {
    const widthRef = useRef(0)
    const {width} = useSize(ref);
    if (width) {
        widthRef.current = width;
        return width;
    }
    return widthRef.current || initialFormWidth || 0
}


/**
 * 设置表单项的 display: block/none状态。如果超过initialDisplayRowCount规定的行数，则不显示。
 * @param children 
 * @param columnCount 列数 
 * @param initialDisplayRowCount 
 */
function setFormItemDisplayStyle(children: any, columnCount: number, initialDisplayRowCount: number): number {

    let moreVisibleCount = 0
    let currentCellCount = 0;
    const maxVisibleCells = columnCount * initialDisplayRowCount - 1; // 减1是因为最后一行留给ButtonGroup
    
    for (let i = 0; i < children.length; i++) {
        const child = children[i];

        // 跳过 ButtonGroup，它始终显示
        if (child && child.props && child.props.name === 'QueryFormButtonGroup') {
            continue;
        }

        if (isFormItem(child)) {
            const newProps = {...child.props};
            const colSpan = Number(_get(child, 'props.cellProps.colSpan', 1)) || 1;
            
            // 判断当前项是否应该显示
            // 如果加上当前项的 colSpan 后不超过最大可见单元格数，则显示
            const isDisplay = (currentCellCount + colSpan <= maxVisibleCells) ;

            if(!isDisplay) {
               // _set(newProps, 'display', false);
               _set(newProps, 'extItemClassName', 'fatd-query-form-item-more');
                moreVisibleCount = moreVisibleCount + 1;
            }

            children[i] = React.cloneElement(child, newProps);
            currentCellCount += colSpan;
        }
    }


    return moreVisibleCount;
}

function useQueryFormLayout(ref: any, fixProps: any, initialFormWidth?: number, initialRowCount?: number): any {
    const width = useFormWidth(ref, initialFormWidth);
    logger.debug('useQueryFormLayout', width);
    if (!width) {
        return null;
    }

    const children = fixProps.children;

    if (fixProps.layout === 'responsive') {

        const layoutProps = fixProps.layoutProps || {};

        const columnCount = (typeof layoutProps.columns === "number" && layoutProps.columns > 0)
            ? layoutProps.columns
            : getColumns(width - 32);
        const displayRowCount = typeof initialRowCount === 'number' ? initialRowCount : 2; // 默认显示2行

        // 设置表单项的显示/隐藏状态（与 columns 是否手动指定无关）
        fixProps.moreVisibleCount = setFormItemDisplayStyle(children, columnCount, displayRowCount);
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
