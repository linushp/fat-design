import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { obj } from '../util';

const { pickOthers } = obj;

/**
 * BoxV2 组件 - 使用纯CSS布局实现
 * 解决了原Box组件中children外层有包装组件时spacing失效的问题
 */
const BoxV2 = ({ 
    prefix,
    direction,
    justify,
    align,
    wrap,
    flex,
    spacing,
    padding,
    margin,
    style,
    className,
    children,
    component,
    ...others
}) => {
    const View = component;
    
    // 构建容器样式
    const containerStyle = {
        display: 'flex',
        flexDirection: direction === 'row-reverse' ? 'row-reverse' : direction,
        justifyContent: justify,
        alignItems: align,
        flexWrap: wrap ? 'wrap' : 'nowrap',
        ...style,
    };
    
    // 处理flex属性
    if (flex !== undefined) {
        if (Array.isArray(flex)) {
            containerStyle.flex = flex.join(' ');
        } else {
            containerStyle.flex = flex;
        }
    }
    
    // 处理margin属性
    if (margin !== undefined) {
        if (Array.isArray(margin)) {
            const [vertical, horizontal = vertical] = margin;
            containerStyle.margin = `${vertical}px ${horizontal}px`;
        } else {
            containerStyle.margin = `${margin}px`;
        }
    }
    
    // 处理padding属性
    if (padding !== undefined) {
        if (Array.isArray(padding)) {
            const [vertical, horizontal = vertical] = padding;
            containerStyle.padding = `${vertical}px ${horizontal}px`;
        } else {
            containerStyle.padding = `${padding}px`;
        }
    }
    
    // 处理spacing - 使用gap属性
    if (spacing !== undefined) {
        if (Array.isArray(spacing)) {
            const [rowGap, columnGap = rowGap] = spacing;
            containerStyle.rowGap = `${rowGap}px`;
            containerStyle.columnGap = `${columnGap}px`;
        } else {
            containerStyle.gap = `${spacing}px`;
        }
    }
    
    const cls = cx(
        {
            [`${prefix}box`]: true,
            [`${prefix}box-v2`]: true,
        },
        className
    );
    
    return (
        <View style={containerStyle} className={cls} {...others}>
            {children}
        </View>
    );
};

BoxV2.propTypes = {
    prefix: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.any,
    /**
     * 布局属性
     */
    flex: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
        PropTypes.number,
    ]),
    /**
     * 布局方向，默认为 column ，一个元素占据一整行
     * @default column
     */
    direction: PropTypes.oneOf(['row', 'column', 'row-reverse']),
    /**
     * 是否折行 支持IE11+
     */
    wrap: PropTypes.bool,
    /**
     * 元素之间的间距 [bottom&top, right&left]
     */
    spacing: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    /**
     * 设置 margin [bottom&top, right&left]
     */
    margin: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    /**
     * 设置 padding [bottom&top, right&left]
     */
    padding: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    /**
     * 沿着主轴方向，子元素们的排布关系 （兼容性同 justify-content ）
     */
    justify: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'space-between', 'space-around']),
    /**
     * 垂直主轴方向，子元素们的排布关系 （兼容性同 align-items ）
     */
    align: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'baseline', 'stretch']),
    /**
     * 定制标签名， 例如section等
     */
    component: PropTypes.string,
};

BoxV2.defaultProps = {
    direction: 'column',
    wrap: false,
    component: 'div',
};

export default BoxV2;