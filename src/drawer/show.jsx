import React from 'react';
import ConfigProvider, {defaultPrefix} from '../config-provider';
import Drawer from './drawer';
import {PopManager} from "../pop-manager";
import {noop, wrapperFn} from "../util/func";
import {wrapperMessage} from "../dialog/utils.jsx";
import zhCN from "../locale/zh-cn.js";

class Modal extends React.Component {
    state = {
        visible: true,
        loading: false,
    };

    static defaultProps = {
        prefix: defaultPrefix,
        onOk: noop,
        onCancel: noop,
        onClose: noop,
        okProps: {},
        locale: zhCN.Dialog,
        needWrapper: true,
        autoOnOkMessage: true,
    };

    close = () => {
        this.setState({
            visible: false,
        });
        setTimeout(() => {
            this.props.popManagerElement.close();
        }, 300);
    };

    loading = loading => {
        this.setState({
            loading,
        });
    };

    wrapper = (fn, callback) => {
        return wrapperFn(fn, (isLoading) => {
            this.loading(isLoading);
        }, callback, this);
    }

    render() {
        const {
            visible,
            content,
            onClose,
            managerConfig,
            popManagerElement,
            onOk,
            okProps,
            autoOnOkMessage,
            onCancel,
            ...others
        } = this.props;

        const newOnOk1 = wrapperMessage(onOk, autoOnOkMessage);

        const newOnOk = this.wrapper(newOnOk1, this.close);
        const newOnCancel = this.wrapper(onCancel, this.close);
        const newOnClose = this.wrapper(onClose, this.close);

        const newOkProps = {...okProps};
        if (!('loading' in okProps)) {
            newOkProps.loading = this.state.loading;
        }

        return (
            <Drawer {...others}
                    onClose={newOnClose}
                    onCancel={newOnCancel}
                    onOk={newOnOk}
                    okProps={newOkProps}
                    visible={this.state.visible}>
                {content}
            </Drawer>
        );
    }
}


const ConfigModal = ConfigProvider.config(Modal, {componentName: 'Drawer'});

const showManager = new PopManager({
    maxCount: 999,
    Tag: PopManager.buildModalList(ConfigModal),
    duration: PopManager.MAX_DURATION,
}).createExports();


export {
    showManager
}
