import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ConfigProvider from "../config-provider";
const defaultPrefix = ConfigProvider.defaultPrefix;

class Group extends Component {
    static propTypes = {
        prefix: PropTypes.string,
        className: PropTypes.any,
        children: PropTypes.node,
        rtl: PropTypes.bool,
    };

    static defaultProps = {
        prefix: defaultPrefix,
        rtl: false,
    };

    render() {
        const { className, prefix, children, rtl, ...others } = this.props;
        const clazz = classNames(`${prefix || defaultPrefix}tag-group`, className);

        return (
            <div className={clazz} dir={rtl ? 'rtl' : undefined} {...others}>
                {children}
            </div>
        );
    }
}

export default Group;
