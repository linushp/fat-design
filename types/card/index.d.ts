/// <reference types="react" />

import * as React from 'react';
import CommonProps from '../util';

interface HTMLAttributesWeak extends React.HTMLAttributes<HTMLElement> {
    title?: any;
}

export interface CardProps extends HTMLAttributesWeak, CommonProps {
    /**
     * 卡片的上的图片 / 视频
     */
    media?: React.ReactNode;

    /**
     * 卡片的标题
     */
    title?: React.ReactNode;

    /**
     * 卡片的副标题
     */
    subTitle?: React.ReactNode;

    /**
     * 卡片操作组，位置在卡片底部
     */
    actions?: React.ReactNode;

    /**
     * 是否显示标题的项目符号
     */
    showTitleBullet?: boolean;

    /**
     * 是否展示头部的分隔线
     */
    showHeadDivider?: boolean;

    /**
     * 内容区域的固定高度，默认： 120px
     */
    contentHeight?: string | number;

    /**
     * 标题区域的用户自定义内容
     */
    extra?: React.ReactNode;

    /**
     * 是否开启自由模式
     * - true（默认）：内容直接展示，无高度限制和折叠功能
     * - false：内容区域固定高度（默认120px），超出时显示展开/折叠按钮
     */
    free?: boolean;
    hasBorder?: boolean;

    /**
     * 是否开启收起/展开能力（需同时设置 title）
     * - 开启后：头部可点击切换，标题前显示箭头，extra 区域追加「收起/展开」提示
     * - 收起时隐藏内容区域（display:none，保留子组件状态不卸载）
     */
    collapsible?: boolean;

    /**
     * 初始是否收起（非受控模式）
     */
    defaultCollapsed?: boolean;

    /**
     * 受控模式：是否收起（传入后由外部完全控制）
     */
    collapsed?: boolean;

    /**
     * 收起/展开状态变化回调
     */
    onCollapsedChange?: (collapsed: boolean, e: React.MouseEvent) => void;
}

export interface CardBulletHeaderProps extends HTMLAttributesWeak, CommonProps {
    /**
     * 卡片的标题
     */
    title?: React.ReactNode;

    /**
     * 卡片的副标题
     */
    subTitle?: React.ReactNode;
    /**
     * 是否显示标题的项目符号
     */
    showTitleBullet?: boolean;
    /**
     * 标题区域的用户自定义内容
     */
    extra?: React.ReactNode;
}

export interface CardCollaspeContentProps extends HTMLAttributesWeak, CommonProps {
    contentHeight?: string | number;
}
export interface CardCollapseContentProps extends HTMLAttributesWeak, CommonProps {
    contentHeight?: string | number;
}

export interface CardHeaderProps extends HTMLAttributesWeak, CommonProps {
    /**
     * 卡片的标题
     */
    title?: React.ReactNode;

    /**
     * 卡片的副标题
     */
    subTitle?: React.ReactNode;

    /**
     * 标题区域的用户自定义内容
     */
    extra?: React.ReactNode;

    /**
     * 设置标签类型
     */
    component?: React.ElementType;
}

export interface CardContentProps extends HTMLAttributesWeak, CommonProps {
    /**
     * 设置标签类型
     */
    component?: React.ElementType;
}

export interface CardMediaProps extends HTMLAttributesWeak, CommonProps {
    /**
     * 设置标签类型
     */
    component?: React.ElementType;
    /**
     * 背景图片地址
     */
    image?: string;
    /**
     * 媒体源文件地址
     */
    src?: string;
}

export interface CardActionsProps extends HTMLAttributesWeak, CommonProps {}

export interface CardDividerProps extends HTMLAttributesWeak, CommonProps {
    /**
     * 分割线是否向内缩进
     */
    inset?: boolean;
}

export default class Card extends React.Component<CardProps, any> {
    static BulletHeader: React.ComponentType<CardBulletHeaderProps>;
    static CollaspeContent: React.ComponentType<CardCollaspeContentProps>;
    static CollapseContent: React.ComponentType<CardCollapseContentProps>;
    static Header: React.ComponentType<CardHeaderProps>;
    static Content: React.ComponentType<CardContentProps>;
    static Media: React.ComponentType<CardMediaProps>;
    static Actions: React.ComponentType<CardActionsProps>;
    static Divider: React.ComponentType<CardDividerProps>;
}
