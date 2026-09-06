/// <reference types="react" />

import { HTMLAttributes, ElementType, Component } from 'react';
import CommonProps from '../util';

export interface BoxProps extends HTMLAttributes<HTMLElement>, CommonProps {
    device?: 'phone' | 'tablet' | 'desktop';
    flex?: number | Array<number | string>;
    direction?: 'row' | 'column' | 'row-reverse';
    wrap?: boolean;
    spacing?: number | Array<number>;
    margin?: number | Array<number>;
    padding?: number | Array<number>;
    justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | string;
    align?: 'flex-start' | 'center' | 'flex-end' | 'baseline' | 'stretch' | string;
    component?: string;
    /**
     * 是否使用v2版本实现，v2版本使用纯CSS布局，不修改children属性
     * v2版本解决了children外层有包装组件时spacing失效的问题
     * @default false
     */
    v2?: boolean;
}

export default class Box extends Component<BoxProps, any> {}
