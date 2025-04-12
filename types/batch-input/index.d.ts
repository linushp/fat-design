/// <reference types="react" />

import * as React from 'react';
import CommonProps from '../util';

type OnChange = (arg: string | Array<string>) => void ;
export type IValue = string | Array<string | number> | any;


interface HTMLAttributesWeak extends React.InputHTMLAttributes<HTMLElement> {
    defaultValue?: any;
    onChange?: any;
    onKeyDown?: any;
    size?: any;
}

export interface BatchInputProps extends HTMLAttributesWeak, CommonProps {
    /**
     * Value值是不是数组
     */
    isArrayValue?: boolean;
    /**
     * 当前值
     */
    value?: IValue;

    /**
     * 初始化值
     */
    defaultValue?: IValue;

    /**
     * 发生改变的时候触发的回调
     */
    onChange?: OnChange;

    /**
     * 键盘按下的时候触发的回调
     */
    onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>, opts: {}) => void;

    /**
     * 禁用状态
     */
    disabled?: boolean;

    /**
     * 最大长度， 最多字符数
     */
    maxLength?: number;

    /**
     * 是否展现最大长度样式
     */
    hasLimitHint?: boolean;
    showLimitHint?: boolean;

    /**
     * onChange返回会自动去除头尾空字符
     */
    trim?: boolean;

    /**
     * 输入提示
     */
    placeholder?: string;

    /**
     * 获取焦点时候触发的回调
     */
    onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;

    /**
     * 失去焦点时候触发的回调
     */
    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;

    /**
     * 自定义字符串计算长度方式
     */
    getValueLength?: (value: string) => number;

    /**
     * 自定义class
     */
    className?: string;

    /**
     * 自定义内联样式
     */
    style?: React.CSSProperties;

    /**
     * 原生type
     */
    htmlType?: string;

    /**
     * name
     */
    name?: string;

    /**
     * 状态
     */
    state?: 'error' | 'warning';

    /**
     * 是否有边框
     */
    hasBorder?: boolean;

    /**
     * 自动高度 true / {minRows: 2, maxRows: 4}
     */
    autoHeight?: boolean | {};

    /**
     * 多行文本框高度 <br />(不要直接用height设置多行文本框的高度, ie9 10会有兼容性问题)
     */
    rows?: number;

    /**
     * 是否为预览态
     */
    isPreview?: boolean;

    renderPreview?: (value: string | number) => React.ReactNode;

    /**
     * 开启后会过滤输入法中间字母状态，文字输入完成后才会触发 onChange
     */
    composition?: boolean;

    formatter?: string;
    size?: string | any;
    container?: HTMLElement;
    isBtnPaste?: boolean;
    target?: 'str' | 'items';
    inputCls?: string;
    onOverlayDisappear?: (arg: IValue) => void;
    textAreaWidth?: number,
    openChineseInput?: boolean,
}



declare function BatchInput(props: BatchInputProps): JSX.Element;
declare namespace BatchInput {

}
export default BatchInput;
