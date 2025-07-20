import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {defaultPrefix} from "../config-provider";
import './native-select.scss'

/**
 * 原生选择框组件
 * @param {Object} props - 组件属性
 * @param {any} props.value - 当前选中的值
 * @param {function} props.onChange - 选择变化时的回调函数
 * @param {Array<Object>} props.dataSource - 选项数据源，格式为{label, value}
 * @param {string} [props.className] - 自定义类名
 * @param {string} [props.placeholder] - 占位文本
 * @param {boolean} [props.disabled] - 是否禁用
 */
const NativeSelect = ({
                          value,
                          size = 'medium',
                          prefix = defaultPrefix,
                          onChange,
                          dataSource,
                          className = '',
                          placeholder = '请选择',
                          disabled = false,
                          style
                      }) => {

    const handleChange = (event) => {
        if (typeof onChange === "function") {
            onChange(event.target.value);
        }
    }

    console.log('NativeSelect', value)

    let selectValue = value;
    if (typeof value === "undefined" || value === null) {
        selectValue = "";
    }

    return (
        <select
            value={selectValue}
            onChange={handleChange}
            className={classnames(
                `${prefix}input`,
                `${prefix}${size}`,
                `${prefix}native-select`,
                className)}
            style={style}
            disabled={disabled}
        >

            <option value="" disabled={true}>
                {placeholder || '请选择'}
            </option>

            {
                Array.isArray(dataSource) ? dataSource.map((item, index) => (
                    <option key={item.value || index} value={item.value}>
                        {item.label}
                    </option>
                )) : null}
        </select>
    );
};

NativeSelect.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    dataSource: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.node.isRequired,
            value: PropTypes.any.isRequired
        })
    ).isRequired,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool
};

export {
    NativeSelect
}