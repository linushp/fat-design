/* eslint-disable valid-jsdoc */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ConfigProvider, {defaultPrefix} from '../config-provider';
import BulletHeader from './bullet-header';
import CollapseContent from './collapse-content';
import CardMedia from './media';
import CardActions from './actions';
import Icon from '../icon';
import nextLocale from '../locale/zh-cn';
import { obj } from '../util';

const { pickOthers } = obj;

/**
 * Card
 * @order 0
 */
export default class Card extends React.Component {
    static displayName = 'Card';

    static propTypes = {
        ...ConfigProvider.propTypes,
        prefix: PropTypes.string,
        rtl: PropTypes.bool,
        /**
         * 卡片的上的图片 / 视频
         */
        media: PropTypes.node,
        /**
         * 卡片的标题
         */
        title: PropTypes.node,
        /**
         * 卡片的副标题
         */
        subTitle: PropTypes.node,
        /**
         * 卡片操作组，位置在卡片底部
         */
        actions: PropTypes.node,
        /**
         * 是否显示标题的项目符号
         */
        showTitleBullet: PropTypes.bool,
        /**
         * 是否展示头部的分隔线
         */
        showHeadDivider: PropTypes.bool,
        /**
         * 内容区域的固定高度
         */
        contentHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        /**
         * 标题区域的用户自定义内容
         */
        extra: PropTypes.node,
        /**
         * 是否开启自由模式
         * - true（默认）：内容直接展示，无高度限制和折叠功能
         * - false：内容区域固定高度（默认120px），超出时显示展开/折叠按钮
         */
        free: PropTypes.bool,
        /**
         * 是否带边框
         * @version 1.24
         */
        hasBorder: PropTypes.bool,
        /**
         * 是否开启收起/展开能力（需同时设置 title）
         * - 开启后：头部可点击切换，标题前显示箭头，extra 区域追加「收起/展开」提示
         * - 收起时隐藏内容区域（display:none，保留子组件状态不卸载）
         */
        collapsible: PropTypes.bool,
        /**
         * 初始是否收起（非受控模式）
         */
        defaultCollapsed: PropTypes.bool,
        /**
         * 受控模式：是否收起（传入后由外部完全控制）
         */
        collapsed: PropTypes.bool,
        /**
         * 收起/展开状态变化回调
         * @param {boolean} collapsed 最新状态：true 已收起 / false 已展开
         * @param {Event} e 点击事件
         */
        onCollapsedChange: PropTypes.func,
        locale: PropTypes.object,
        className: PropTypes.string,
        children: PropTypes.node,
    };

    static defaultProps = {
        prefix: defaultPrefix,
        free: true,
        showTitleBullet: true,
        showHeadDivider: true,
        hasBorder: true,
        contentHeight: 120,
        collapsible: false,
        defaultCollapsed: false,
        locale: nextLocale.Card,
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            collapsed: props.collapsed !== undefined ? !!props.collapsed : !!props.defaultCollapsed,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.collapsed !== undefined && nextProps.collapsed !== prevState.collapsed) {
            return { collapsed: nextProps.collapsed };
        }
        return null;
    }

    isCollapsed() {
        return this.props.collapsed !== undefined ? !!this.props.collapsed : this.state.collapsed;
    }

    handleHeadClick = e => {
        if (!this.props.collapsible) {
            return;
        }
        const next = !this.isCollapsed();
        if (this.props.collapsed === undefined) {
            this.setState({ collapsed: next });
        }
        if (typeof this.props.onCollapsedChange === 'function') {
            this.props.onCollapsedChange(next, e);
        }
    };

    render() {
        const {
            prefix,
            className,
            title,
            subTitle,
            extra,
            showTitleBullet,
            showHeadDivider,
            children,
            rtl,
            contentHeight,
            free,
            actions,
            hasBorder,
            media,
            collapsible,
            locale,
        } = this.props;

        const isCollapsed = this.isCollapsed();

        const cardCls = classNames(
            {
                [`${prefix}card`]: true,
                [`${prefix}card-free`]: free,
                [`${prefix}card-noborder`]: !hasBorder,
                [`${prefix}card-show-divider`]: showHeadDivider,
                [`${prefix}card-hide-divider`]: !showHeadDivider,
                [`${prefix}card-collapsible`]: collapsible,
                [`${prefix}card-collapsed`]: collapsible && isCollapsed,
            },
            className
        );

        const others = pickOthers(Object.keys(Card.propTypes), this.props);

        others.dir = rtl ? 'rtl' : undefined;

        let titleNode = title;
        let extraNode = extra;
        if (collapsible && title) {
            titleNode = (
                <span className={`${prefix}card-collapse-title`}>
                    <Icon
                        type="arrow-down"
                        size="xxs"
                        className={classNames(`${prefix}card-collapse-icon`, {
                            [`${prefix}card-collapse-icon-collapsed`]: isCollapsed,
                        })}
                    />
                    {title}
                </span>
            );
            extraNode = (
                <>
                    {extra}
                    <span className={`${prefix}card-collapse-hint`}>
                        {isCollapsed ? locale.expand : locale.fold}
                    </span>
                </>
            );
        }

        const body = free ? (
            children
        ) : (
            <CollapseContent contentHeight={contentHeight}>{children}</CollapseContent>
        );
        // free 模式内容无统一包装，折叠时用 wrapper 隐藏（display:none，保留子组件状态不卸载）
        const bodyNode = collapsible && free ? (
            <div
                className={`${prefix}card-collapse-wrapper`}
                style={{ display: isCollapsed ? 'none' : undefined }}
            >
                {body}
            </div>
        ) : (
            body
        );

        return (
            <div {...others} className={cardCls}>
                {media && <CardMedia>{media}</CardMedia>}
                <BulletHeader
                    title={titleNode}
                    subTitle={subTitle}
                    extra={extraNode}
                    showTitleBullet={showTitleBullet}
                    onClick={collapsible ? this.handleHeadClick : undefined}
                />
                {bodyNode}
                {actions && <CardActions>{actions}</CardActions>}
            </div>
        );
    }
}
