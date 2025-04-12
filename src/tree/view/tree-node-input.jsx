import React, { Component } from 'react';
import { findDOMNode } from '../../util';
import PropTypes from 'prop-types';
import Input from '../../input';

export default class TreeNodeInput extends Component {
    static propTypes = {
        prefix: PropTypes.string,
        defaultValue: PropTypes.node.isRequired,
        onBlur: PropTypes.func.isRequired,
        onKeyDown: PropTypes.func.isRequired
    };

    componentDidMount() {
        const inputWrapperNode = findDOMNode(this);
        const input = inputWrapperNode.querySelector('input');
        if (input) {
            input.focus();
        }
    }

    render() {
        const { prefix, defaultValue, ...others } = this.props;

        return (
            <Input
                size="small"
                className={`${prefix}tree-node-input`}
                defaultValue={defaultValue}
                {...others}
            />
        );
    }
}
