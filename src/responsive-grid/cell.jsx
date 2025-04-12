import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ConfigProvider from '../config-provider';

/**
 * ResponsiveGrid.Cell
 */
class Cell extends Component {
    static _typeMark = 'responsive_grid_cell';
    static propTypes = {
        colIndex: PropTypes.number,

        /**
         * 横向，占据几列
         */
        colSpan: PropTypes.number,

        /**
         * 纵向，占据几行
         */
        rowSpan: PropTypes.number,
        /**
         * 设置标签类型
         */
        component: PropTypes.elementType,

        style: PropTypes.any
    };

    static defaultProps = {
        component: 'div',
    };

    fixStyle(colSpan, colIndex) {
        const style = {};
        if (colSpan && typeof colIndex === "number") {
            style['gridColumn'] = `${(colIndex)} / span ${colSpan}`;
            return style;
        }

        if (colSpan) {
            style['gridColumnStart'] = `span ${colSpan}`;
            return style;
        }

        return {};
    }

    render() {
        const {
            colSpan,
            colIndex,
            rowSpan,
            style = {},
            component: View,
            children,
            prefix,
            rtl,
            ...others
        } = this.props;

        const nextStyle = {
            ...style,
            ...this.fixStyle(colSpan, colIndex)
        };

        if (typeof View ==="string") {
            others.locale = undefined;
        }
        return <View {...others} style={nextStyle}>{children}</View>;
    }
}

export default ConfigProvider.config(Cell);
