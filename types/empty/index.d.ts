/// <reference types="react" />

import * as React from 'react';
import CommonProps from '../util';

/**
 * Empty组件的图片类型常量
 */
export const EMPTY_TYPE: {
    DEFAULT: 'DEFAULT';
    SIMPLE: 'SIMPLE';
};

export interface EmptyProps extends React.HTMLAttributes<HTMLDivElement>, CommonProps {
    /**
     * 组件样式类名前缀
     */
    prefixCls?: string;

    /**
     * 自定义样式类名
     */
    className?: string;

    /**
     * 自定义样式
     */
    style?: React.CSSProperties;

    /**
     * 图片样式
     */
    imageStyle?: React.CSSProperties;

    /**
     * 自定义图片类型
     */
    image?: string | React.ReactNode;

    /**
     * 自定义描述内容
     */
    description?: React.ReactNode;

    /**
     * 国际化配置
     */
    locale?: {
        description?: string;
    };

    /**
     * 子元素（显示在底部）
     */
    children?: React.ReactNode;

    /**
     * 是否为右到左布局
     */
    rtl?: boolean;

    /**
     * 自定义图片节点
     */
    imageNode?: React.ReactNode;

    /**
     * 组件样式前缀
     */
    prefix?: string;
}

declare const Empty: React.FC<EmptyProps> & {
    defaultProps: Partial<EmptyProps>;
    SIMPLE: string;
    DEFAULT: string;
};

export default Empty;