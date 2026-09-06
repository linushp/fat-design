/// <reference types="react" />

import * as React from 'react';
import CommonProps from '../util';

export interface GroupProps extends React.HTMLAttributes<HTMLElement>, CommonProps {
    /**
     * 统一设置 Button 组件的按钮大小
     */
    size?: string;
}

export class Group extends React.Component<GroupProps, any> {}
interface HTMLAttributesWeak extends React.ButtonHTMLAttributes<HTMLElement> {
    type?: any;
    onClick?: any;
}

export interface ButtonProps extends HTMLAttributesWeak, CommonProps {
    children?: React.ReactNode;

    /**
     * 按钮的类型
     */
    type?: 'primary' | 'secondary' | 'normal';

    /**
     * 按钮的尺寸
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * 按钮中 Icon 的尺寸，用于替代 Icon 的默认大小
     */
    icons?: { loading?: React.ReactNode };
    /**
     * 按钮中 Icon 的尺寸，用于替代 Icon 的默认大小
     */
    iconSize?: number | 'xxs' | 'xs' | 'small' | 'medium' | 'large' | 'xl' | 'xxl' | 'xxxl' | 'inherit';

    /**
     * 当 component = 'button' 时，设置 button 标签的 type 值
     */
    htmlType?: 'submit' | 'reset' | 'button';

    /**
     * 设置标签类型
     * TODO: 这里的 ReactNode 是错的，但是为了向前兼容而保留，下个大版本应该去掉
     */
    component?: 'button' | 'a' | React.ReactNode | React.ComponentType<any>;

    /**
     * 设置按钮的载入状态
     */
    loading?: boolean;

    /**
     * 是否为幽灵按钮
     */
    ghost?: true | false | 'light' | 'dark';

    /**
     * 是否为文本按钮
     */
    text?: boolean;

    /**
     * 是否为警告按钮
     */
    warning?: boolean;

    /**
     * 是否禁用
     */
    disabled?: boolean;

    /**
     * 禁用（disabled为true）时点击可触发气泡提示，用于解释按钮为何禁用
     */
    tooltip?: React.ReactNode;

    /**
     * 点击按钮的回调
     */
    onClick?: React.MouseEventHandler;

    /**
     * 在Button组件使用component属性值为a时有效，代表链接页面的URL
     */
    href?: string;

    /**
     * 在Button组件使用component属性值为a时有效，代表何处打开链接文档
     */
    target?: string;

    /**
     * 在Button组件使用component属性值为 React Router Link 时有效，代表链接页面的路径
     */
    to?: string;
}


/**
 * 保存按钮。按钮会监听Ctrl+S键盘事件。
 */
export interface SaveButtonProps extends ButtonProps {
    /**
     * 操作按钮额外携带的参数
     */
    actionParams?: any;

    /**
     * 是否显示保存中...Message。默认值：‘保存中...’
     */
    loadingMessage?: string | boolean;

    /**
     *  是否显示成功提示文案
     */
    successMessage?: string | boolean;

}


declare function SaveButton(props: SaveButtonProps): React.JSX.Element;


export type IDoubleConfirmConfigType = 'dialog' | 'balloon'

export interface IDoubleConfirmConfig {
    type?: IDoubleConfirmConfigType; // dialog(默认), balloon,
    title?: any;
    content?: any;
}


/**
 * 普通操作按钮，可以带二次确认.
 */
export interface ActionButtonProps extends ButtonProps {

    /**
     * 操作按钮额外携带的参数
     */
    actionParams?: any;

    /**
     * 是否显示操作中...Message
     */
    loadingMessage?: string | boolean;

    /**
     *  是否显示成功提示文案
     */
    successMessage?: string | boolean;


    /**
     * 是否显示二次确认对话框
     */
    doubleConfirm?: boolean;

    /**
     * 二次确认对话框的属性
     */
    doubleConfirmConfig?: IDoubleConfirmConfig;
}


declare function ActionButton(props: ActionButtonProps): React.JSX.Element;


export interface LoadingButtonProps extends ButtonProps {
    renderChildren?: (loading: boolean)=> React.ReactNode;
}


declare function LoadingButton(props: LoadingButtonProps): React.JSX.Element;



export default class Button extends React.Component<ButtonProps, any> {
    static Group: typeof Group;
    static SaveButton: typeof SaveButton;
    static ActionButton: typeof ActionButton;
    static LoadingButton: typeof LoadingButton;
}



