import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {defaultPrefix} from "../config-provider";
import './native-select.scss'
import {pickProps} from "../util/object.js";
import {renderFormPreview} from "../util/render-utils.jsx";


const NativeSelectPreview = React.memo((props) => {
    const {value, style, prefix, dataSource, className, previewPlaceholder} = props;
    let displayValue = previewPlaceholder;
    if (Array.isArray(dataSource)) {
        for (let i = 0; i < dataSource.length; i++) {
            const element = dataSource[i];
            if (typeof element === 'string' || typeof element === 'number' || typeof element === 'boolean') {
                if (value === element) {
                    displayValue = element;
                }
            } else {
                if (element && value === element.value) {
                    displayValue = element.label || element.value;
                }
            }
        }
    }
    return renderFormPreview({
        displayValue, className, style, prefix, previewPlaceholder
    });
});

function renderNativeSelectPreview(props) {
    const newProps = pickProps("value,style,prefix,dataSource,className,previewPlaceholder", props);
    return (
        <NativeSelectPreview {...newProps} />
    );

}

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
const NativeSelect = (props) => {
    const {
        value,
        isPreview,
        size = 'medium',
        prefix = defaultPrefix,
        onChange,
        dataSource,
        className = '',
        placeholder = '请选择',
        disabled = false,
        style
    } = props;
    const handleChange = (event) => {
        if (typeof onChange === "function") {
            onChange(event.target.value);
        }
    }

    // console.log('NativeSelect', value)

    let selectValue = value;
    if (typeof value === "undefined" || value === null) {
        selectValue = "";
    }

    if (isPreview) {
        return renderNativeSelectPreview({...props, prefix})
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

NativeSelect._supportPreview = true;

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
    disabled: PropTypes.bool,
    prefix: PropTypes.string,
};

export {
    NativeSelect
}