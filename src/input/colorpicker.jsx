import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {obj, func} from '../util';
import Base from './base';
import {renderFormPreview} from "../util/render-utils.jsx";
import {isEmptyStr} from "../util/string.ts";

/**
 * ColorPicker 颜色选择器组件
 * 基于Input组件，使用原生的input[type="color"]实现
 */
class ColorPicker extends Base {
    static displayName = 'ColorPicker';
    static getDerivedStateFromProps = Base.getDerivedStateFromProps;

    static propTypes = {
        ...Base.propTypes,
        /**
         * 颜色值，支持十六进制格式
         */
        value: PropTypes.string,
        /**
         * 默认颜色值
         */
        defaultValue: PropTypes.string,
        /**
         * 颜色变化回调
         */
        onChange: PropTypes.func,
        /**
         * 是否显示颜色文本
         */
        showColorText: PropTypes.bool,
        /**
         * 是否有边框
         */
        hasBorder: PropTypes.bool,
        /**
         * 状态
         */
        state: PropTypes.oneOf(['error', 'loading', 'success', 'warning']),
        /**
         * 尺寸
         */
        size: PropTypes.oneOf(['small', 'medium', 'large']),
        /**
         * 是否为预览态
         */
        isPreview: PropTypes.bool,
        /**
         * 预览态渲染函数
         */
        renderPreview: PropTypes.func,

        previewPlaceholder: PropTypes.string,
    };

    static defaultProps = {
        ...Base.defaultProps,
        showColorText: true,
        hasBorder: true,
        isPreview: false,
        onChange: func.noop,
        defaultValue: '#000000',
    };

    constructor(props) {
        super(props);

        let value;
        if ('value' in props) {
            value = props.value;
        } else {
            value = props.defaultValue;
        }

        this.state = {
            ...this.state,
            value: value || '#000000',
        };
    }

    handleColorChange = (e) => {
        const value = e.target.value;

        // 非受控模式更新内部状态
        if (!('value' in this.props)) {
            this.setState({value});
        }

        this.props.onChange(value, e);
    };

    renderColorDisplay() {
        const {prefix} = this.props;
        const {value} = this.state;

        return (
            <span
                className={`${prefix}color-picker-color-display`}
                style={{
                    backgroundColor: value,
                }}
            />
        );
    }

    renderColorText() {
        const {prefix} = this.props;
        const {value} = this.state;

        return (
            <span className={`${prefix}color-picker-color-text`}>
                {value ? value.toUpperCase() : ''}
            </span>
        );
    }

    renderHiddenColorInput() {
        const {disabled, readOnly, prefix} = this.props;
        const {value} = this.state;

        return (
            <input
                type="color"
                value={value}
                onChange={this.handleColorChange}
                disabled={disabled}
                readOnly={readOnly}
                className={`${prefix}color-picker-hidden-input`}
                ref={this.saveRef}
            />
        );
    }

    render() {
        const {
            size,
            disabled,
            style,
            className,
            hasBorder,
            prefix,
            isPreview,
            renderPreview,
            showColorText,
            previewPlaceholder,
            rtl,
            placeholder='请选择颜色'
        } = this.props;

        const {value} = this.state;

        const cls = classNames(this.getClass(), {
            [`${prefix}${size}`]: true,
            [`${prefix}noborder`]: !hasBorder,
            [`${prefix}disabled`]: disabled,
            [`${prefix}color-picker`]: true,
            [className]: !!className,
        });

        const previewCls = classNames({
            [`${prefix}form-preview`]: true,
            [className]: !!className,
        });

        // 自定义数据属性分配到顶层节点
        const dataProps = obj.pickAttrsWith(this.props, 'data-');
        const others = obj.pickOthers(Object.assign({}, dataProps, ColorPicker.propTypes), this.props);

        if (isPreview) {

            if (isEmptyStr(value)) {
                return renderFormPreview({
                    className, prefix, previewPlaceholder
                })
            }

            if (typeof renderPreview === 'function') {
                return (
                    <div className={previewCls}>
                        {renderPreview(value, this.props)}
                    </div>
                );
            }
            return (
                <div className={`${prefix}color-picker-preview`}>
                    <div className={previewCls}>
                        {this.renderColorDisplay()}
                        {showColorText && (
                            <span style={{marginLeft: '8px'}}>
                            {this.renderColorText()}
                        </span>
                        )}
                    </div>
                </div>
            );
        }

        const colorDisplay = this.renderColorDisplay();
        const colorText = showColorText ? this.renderColorText() : null;

        return (
            <span
                {...dataProps}
                dir={rtl ? 'rtl' : undefined}
                className={cls}
                style={style}
            >
                {
                    value ? (<>
                                <span className={`${prefix}color-picker-display-wrapper`}>
                                    {colorDisplay}
                                </span>
                                {colorText && (
                                <span  className={`${prefix}color-picker-color-text-wrapper ${prefix}color-picker-color-text-wrapper-${size}`}>
                                    {colorText}
                                </span>
                        )}

                    </>) : (
                        <div className={`${prefix}color-picker-placeholder`}>{placeholder}</div>
                    )
                }

                {this.renderControl()}
                {this.renderHiddenColorInput()}
            </span>
        );
    }
}

export default ColorPicker;