import React, { ReactNode } from 'react';

export interface IconsType {
    [key: string]: ReactNode;
}

/**
 * 事件监听器类型
 */
export type ListenerType = (...args: any[]) => any;

/**
 * 事件发射器接口
 */
export interface TinyEmitter {
    /**
     * 添加事件监听器
     */
    on: (eventName: string, listener: ListenerType) => void;
    
    /**
     * 移除事件监听器
     */
    off: (eventName: string, listener?: ListenerType) => void;
    
    /**
     * 清除所有事件监听器
     */
    clear: () => void;
    
    /**
     * 触发事件
     */
    emit: (eventName: string, ...args: any[]) => any[];
}

export default interface CommonProps {
    /**
     * 样式类名的品牌前缀
     */
    prefix?: string;

    /**
     * 国际化文案对象，属性为组件的 displayName
     */
    locale?: any;

    /**
     * 是否开启 Pure Render 模式，会提高性能，但是也会带来副作用
     */
    pure?: boolean;

    /**
     * 是否在开发模式下显示组件属性被废弃的 warning 提示
     */
    warning?: boolean;

    /**
     * 是否开启 rtl 模式
     */
    rtl?: boolean;
}


/**
 * @api PropTarget
 */
export type Target<T = unknown> =
    | React.ReactInstance
    | string
    | ((param?: T) => React.ReactInstance | Element | Text | Node | null | void | undefined)
    | Element
    | Node
    | Text
    | null
    | false
    | undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PropTarget = Target<any>;
