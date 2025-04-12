import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ConfigProvider from '../config-provider';
import {pickBasicProps} from "../util/object.js";

const defaultPrefix = ConfigProvider.defaultPrefix;

/**
 * Card.Content
 * @order 3
 */
class CardContent extends Component {
    static propTypes = {
        prefix: PropTypes.string,
        /**
         * 设置标签类型
         */
        component: PropTypes.elementType,
        className: PropTypes.string,
    };

    static defaultProps = {
        prefix: defaultPrefix,
        component: 'div',
    };

    render() {
        const {
            prefix,
            className,
            component: Component,
            ...others
        } = this.props;
        let otherProps = others;
        if (typeof Component === "string") {
            otherProps = pickBasicProps(others);
        }
        return (
            <Component
                {...otherProps}
                className={classNames(
                    `${prefix}card-content-container`,
                    className
                )}
            />
        );
    }
}

export default ConfigProvider.config(CardContent);
