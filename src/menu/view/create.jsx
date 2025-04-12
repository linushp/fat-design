import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Overlay from '../../overlay';
import {func} from '../../util';
import ConfigProvider from '../../config-provider';
import menu from './menu';
import {PopManager} from "../../pop-manager/index.jsx";

const {bindCtx} = func;
const {getContextProps} = ConfigProvider;
const Menu = ConfigProvider.config(menu, {});


class ContextMenu extends Component {
    static propTypes = {
        className: PropTypes.string,
        popupClassName: PropTypes.string,
        target: PropTypes.any,
        align: PropTypes.string,
        offset: PropTypes.array,
        overlayProps: PropTypes.object,
        afterClose: PropTypes.func,
        mode: PropTypes.oneOf(['inline', 'popup']),
        onOpen: PropTypes.func,
        onItemClick: PropTypes.func,
    };

    static defaultProps = {
        prefix: ConfigProvider.defaultPrefix,
        align: 'tl tl',
        mode: 'popup',
    };

    constructor(props) {
        super(props);

        this.state = {
            visible: true,
        };

        bindCtx(this, [
            'handleOverlayClose',
            'handleOverlayOpen',
            'handleItemClick',
            'getOverlay',
        ]);
    }

    getOverlay = (ref) => {
        this.overlay = ref;
    }

    close() {
        this.setState({
            visible: false,
        });

        setTimeout(() => {
            this.props.popManagerElement.close();
        }, 300);

    }

    handleOverlayClose(triggerType, e, ...others) {
        const clickedPopupMenu =
            triggerType === 'docClick' &&
            this.popupNodes.some(node => node.contains(e.target));
        if (!clickedPopupMenu) {
            this.close();
            const {overlayProps} = this.props;
            if (overlayProps && overlayProps.onRequestClose) {
                overlayProps.onRequestClose(triggerType, e, ...others);
            }
        }
    }

    handleOverlayOpen() {
        this.popupNodes = this.overlay
            .getInstance()
            .getContent()
            .getInstance().popupNodes;
        const {overlayProps} = this.props;
        if (overlayProps && overlayProps.onOpen) {
            overlayProps.onOpen();
        }
    }

    handleItemClick(...args) {
        this.close();

        this.props.onItemClick && this.props.onItemClick(...args);
    }

    render() {
        const {
            className,
            popupClassName,
            target,
            align,
            offset,
            afterClose,
            overlayProps = {},
            managerConfig,
            popManagerElement,
            ...others
        } = this.props;

        const contextProps = getContextProps({props: this.props, displayName: 'ContextMenu'});

        const {prefix} = contextProps;
        const {visible} = this.state;

        const newOverlayProps = {
            ...contextProps,
            ...overlayProps,
            target,
            align,
            offset,
            afterClose,
            visible,
            onRequestClose: this.handleOverlayClose,
            onOpen: this.handleOverlayOpen,
            ref: this.getOverlay,
        };
        const menuProps = {
            ...contextProps,
            triggerType: 'hover',
            ...others,
            className: cx({
                [`${prefix}context`]: true,
                [className]: !!className,
            }),
            popupClassName: cx({
                [`${prefix}context`]: true,
                [popupClassName]: !!popupClassName,
            }),
            onItemClick: this.handleItemClick,
        };

        newOverlayProps.rtl = false;

        return (
            <Overlay {...newOverlayProps}>
                <Menu {...menuProps} />
            </Overlay>
        );
    }
}



const ContextMenuConfig = ConfigProvider.config(ContextMenu, {});

const showManager = new PopManager({
    maxCount: 999,
    Tag: PopManager.buildModalList(ContextMenuConfig),
    duration: PopManager.MAX_DURATION,
}).createExports();

export default function create(props) {
    const menuInstance = showManager.show(props);
    menuInstance.destroy = () => {
        menuInstance.close();
    }
    return menuInstance;
}
