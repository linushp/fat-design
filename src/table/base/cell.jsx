import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { obj, pickAttrs, ReactComponent } from '../../util';
import { defaultPrefix } from "../../config-provider";

const EMPTY_OBJ = {};

/**
 * 这些 props 引用变化不应单独触发单元格重渲：
 * - cell 为函数时：外层每次 render 都会生成新函数，函数通常只依赖 value / record / context
 * - style / innerStyle：row 渲染时总会 new 一个对象，按浅比较判断内容是否真的变了
 */
function isIgnorableCellProp(key, prevVal, nextVal) {
    if (prevVal === nextVal) {
        return true;
    }
    if (key === 'cell' && typeof prevVal === 'function' && typeof nextVal === 'function') {
        return true;
    }
    if (key === 'style' || key === 'innerStyle') {
        return obj.shallowEqual(prevVal || EMPTY_OBJ, nextVal || EMPTY_OBJ);
    }
    return false;
}


/**
 * 列未设置 cell 时的默认渲染：直接显示 dataIndex 对应的字段值
 * 签名与自定义 cell 一致：(value, rowIndex, record, cellContext) => ReactNode
 */
function defaultCellRender(value, rowIndex, record, cellContext) {
    return value;
}


export default class Cell extends ReactComponent {
    static propTypes = {
        prefix: PropTypes.string,
        pure: PropTypes.bool,
        primaryKey: PropTypes.oneOfType([PropTypes.symbol, PropTypes.string]),
        className: PropTypes.string,
        record: PropTypes.any,
        value: PropTypes.any,
        dataIndex: PropTypes.string,
        isIconLeft: PropTypes.bool,
        colIndex: PropTypes.number,
        rowIndex: PropTypes.number,
        // 经过锁列调整后的列索引，lock right的列会从非0开始
        __colIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        title: PropTypes.any,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        context: PropTypes.any,
        cell: PropTypes.oneOfType([PropTypes.element, PropTypes.node, PropTypes.func]),
        align: PropTypes.oneOf(['left', 'center', 'right']),
        component: PropTypes.oneOf(['td', 'th', 'div']),
        children: PropTypes.any,
        style: PropTypes.object,
        innerStyle: PropTypes.object,
        filterMode: PropTypes.oneOf(['single', 'multiple']),
        filterMenuProps: PropTypes.object,
        filterProps: PropTypes.object,
        filters: PropTypes.array,
        sortable: PropTypes.bool,
        sortDirections: PropTypes.arrayOf(PropTypes.oneOf(['desc', 'asc', 'default'])),
        lock: PropTypes.any,
        type: PropTypes.oneOf(['header', 'body']),
        resizable: PropTypes.bool,
        asyncResizable: PropTypes.bool,
        __normalized: PropTypes.bool,
    };

    static defaultProps = {
        component: 'td',
        type: 'body',
        isIconLeft: false,
        cell: defaultCellRender,
        prefix: defaultPrefix,
    };

    shouldComponentUpdate(nextProps) {
        return !obj.shallowEqual(this.props, nextProps, (valA, valB, key) => {
            if (isIgnorableCellProp(key, valA, valB)) {
                return true;
            }
            // obj.shallowEqual 的 compare：true 视为相等，false 视为不等，
            // undefined 则回退到默认的 valA !== valB。这里必须返回 undefined，
            // 不能返回 false，否则普通 props 都会被判成不相等，单元格会一直重渲。
            return undefined;
        });
    }

    render() {
        /* eslint-disable no-unused-vars */
        const {
            prefix,
            className,
            cell,
            resizable,
            asyncResizable,
            colIndex,
            rowIndex,
            __colIndex,
            record,
            value,
            dataIndex,
            context,
            align,
            style = {},
            component: Tag,
            children,
            title,
            width,
            innerStyle,
            primaryKey,
            __normalized,
            filterMode,
            filterMenuProps,
            filterProps,
            filters,
            sortable,
            sortDirections,
            lock,
            pure,
            locale,
            expandedIndexSimulate,
            rtl,
            isIconLeft,
            type,
            htmlTitle,
            wordBreak,
            ...others
        } = this.props;
        const tagStyle = { ...style };


        const cellContext = {
            value, rowIndex, record, dataIndex, title
        };
        if (context) {
            Object.assign(cellContext, context);
        }

        const cellProps = { value, index: rowIndex, record, context: cellContext };
        let content = cell;
        if (React.isValidElement(content)) {
            content = React.cloneElement(content, cellProps);
        } else if (typeof content === 'function') {
            content = content(value, rowIndex, record, cellContext);
        }
        if (align) {
            tagStyle.textAlign = align;
            if (rtl) {
                tagStyle.textAlign = align === 'left' ? 'right' : align === 'right' ? 'left' : align;
            }
        }
        const cls = classnames({
            [`${prefix}table-cell`]: true,
            [`${prefix}table-word-break-${wordBreak}`]: !!wordBreak,
            [className]: className,
        });

        return (
            <Tag {...pickAttrs(others)} className={cls} style={tagStyle} role="gridcell" ref={this.saveFatNodeInstance}>
                <div
                    className={`${prefix}table-cell-wrapper`}
                    ref={this.props.getCellDomRef}
                    style={innerStyle}
                    title={htmlTitle}
                    data-next-table-col={__colIndex}
                    data-next-table-row={rowIndex}
                >
                    {isIconLeft ? children : content}
                    {isIconLeft ? content : children}
                </div>
            </Tag>
        );
    }
}
