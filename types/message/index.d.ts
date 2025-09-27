/// <reference types="react" />

import * as React from 'react';
import CommonProps from '../util';
import { OverlayProps } from '../overlay';
interface HTMLAttributesWeak extends React.HTMLAttributes<HTMLElement> {
    title?: any;
}

export interface MessageProps extends HTMLAttributesWeak, CommonProps {
    /**
     * 反馈类型
     */
    type?: 'success' | 'warning' | 'error' | 'notice' | 'help' | 'loading' | 'info';

    /**
     * 反馈外观
     */
    shape?: 'inline' | 'addon' | 'toast';

    /**
     * 反馈大小
     */
    size?: 'medium' | 'large';

    /**
     * 标题
     */
    title?: React.ReactNode;

    /**
     * 内容，非函数式调用下使用
     */
    children?: React.ReactNode;

    /**
     * 默认是否显示
     */
    defaultVisible?: boolean;

    /**
     * 当前是否显示
     */
    visible?: boolean;

    /**
     * 显示的图标类型，会覆盖内部设置的IconType，传false不显示图标
     */
    iconType?: string | false;

    /**
     * 显示关闭按钮
     */
    closeable?: boolean;

    /**
     * 关闭按钮的回调
     */
    onClose?: () => void;

    /**
     * 关闭之后调用的函数
     */
    afterClose?: () => void;

    /**
     * 是否开启展开收起动画
     */
    animation?: boolean;
}

export interface MessageQuickProps extends Omit<HTMLAttributesWeak, 'content'>, CommonProps {
    /**
     * 反馈类型
     */
    type?: 'success' | 'warning' | 'error' | 'notice' | 'help' | 'loading';

    /**
     * 反馈大小
     */
    size?: 'medium' | 'large';
    /**
     * 标题
     */
    title?: React.ReactNode;

    /**
     * 内容，函数式调用下使用
     */
    content?: React.ReactNode;
    /**
     * 弹层相对于参照元素的定位, 详见开发指南的[定位部分](#定位)
     */
    align?: string | boolean;

    /**
     * 弹层相对于参照元素定位的微调
     */
    offset?: Array<any>;
    /**
     * 是否显示遮罩
     */
    hasMask?: boolean;

    /**
     * 显示持续时间，0表示一直存在，以毫秒为单位
     */
    duration?: number;

    /**
     * 显示关闭按钮
     */
    closeable?: boolean;

    /**
     * 关闭按钮的回调
     */
    onClose?: () => void;

    /**
     * 关闭之后调用的函数
     */
    afterClose?: () => void;

    /**
     * 是否开启展开收起动画
     */
    animation?: boolean;
    /**
     * 透传到弹层组件的属性对象
     */
    overlayProps?: OverlayProps;
}

type OpenProps = string | React.ReactElement | MessageQuickProps;


export interface QuickMsgShowRet {
    hide: () => void;
}

export interface MessageConfigV2 {
    top?: number,
    maxCount?: number,
    duration?: number,
    title?: any,
    content?: any,
    className?: string
}

export default class Message extends React.Component<MessageProps, any> {
    static show(props: OpenProps): QuickMsgShowRet;
    static hide();
    static destroy();
    static success(props: OpenProps): QuickMsgShowRet;
    static warning(props: OpenProps): QuickMsgShowRet;
    static error(props: OpenProps): QuickMsgShowRet;
    static help(props: OpenProps): QuickMsgShowRet;
    static loading(props: OpenProps): QuickMsgShowRet;
    static notice(props: OpenProps): QuickMsgShowRet;
    static info(props: OpenProps): QuickMsgShowRet;
    static config(props: MessageConfigV2): void;
    static useV1(): void;
    static useV2(): void;
}
