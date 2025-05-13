/// <reference types="react" />

import * as React from 'react';
import CommonProps from '../util';
import {QuickShowConfig, QuickShowRet} from "../dialog";

export interface LoadingProps extends React.HTMLAttributes<HTMLElement>, CommonProps {
    /**
     * 样式前缀
     */
    prefix?: string;

    /**
     * 自定义内容
     */
    tip?: React.ReactNode;

    /**
     * 自定义内容位置
     */
    tipAlign?: 'right' | 'bottom';

    /**
     * loading 状态, 默认 true
     */
    visible?: boolean;

    /**
     * 自定义class
     */
    className?: string;

    /**
     * 自定义内联样式
     */
    style?: React.CSSProperties;

    /**
     * 设置动画尺寸
     */
    size?: 'large' | 'medium';

    /**
     * 自定义动画内容
     */
    indicator?: React.ReactNode;

    /**
     * 动画颜色
     */
    color?: string;

    /**
     * 全屏展示
     */
    fullScreen?: boolean;
    /**
     * 是否禁用滚动，仅在 fullScreen 模式下生效
     */
    disableScroll?: boolean;
    /**
     * 子元素
     */
    children?: React.ReactNode;

    /**
     * should loader be displayed inline
     */
    inline?: boolean;

    safeNode?: any;


    /**
     * 在Loading组件外包一个div，一般用于loading时的占位
     * demo: <Loading wrapper={true} />
     * demo: <Loading wrapper={{height:'500px'}} />
     */
    wrapper?: any | boolean;

    /**
     * 全屏模式下，loading弹层请求关闭时触发的回调函数
     * @en The callback function triggered when the loading layer request is closed in full screen mode
     * @param type - 弹层关闭的来源 - The source of fan layer closure
     * @param e - DOM 事件 - DOM events
     */
    onVisibleChange?: (type: string, e: React.MouseEvent) => void;
}


export interface QuickShowLoadingConfig {
    tip?: any;
    fullScreen?: boolean;
    style?: any
}

export default class Loading extends React.Component<LoadingProps, any> {
    static showLoading(config: QuickShowLoadingConfig);
    static hideLoading();
}
