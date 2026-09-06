import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ConfigProvider, {defaultPrefix} from '../config-provider';
import Message from '../message';
import zhCN from '../locale/zh-cn';
import dialog from './dialog';
import dialog2 from './dialog-v2';
import {buildShowForm} from "./show-form.jsx";
import {buildShowInput} from "./show-input.jsx";
import {buildShowBatchInput} from "./show-batch-input.jsx";
import {buildShowComp} from "./show-comp.jsx";
import {buildShowAudit} from "./show-audit.jsx";
import {PopManager} from "../pop-manager";
import {wrapperFn} from "../util/func";
import {buildShowTable} from "./show-table.jsx";
import {buildShowBatchByExcel} from "./show-batch-by-excel.jsx";
import {defaultWidth, MESSAGE_TYPE} from "./constants.jsx";
import {wrapperMessage} from "./utils.jsx";
import {buildShowBatchProcess} from "./show-batch-process.jsx";
import {buildShowTab} from "./show-tab.jsx";

const Dialog = ConfigProvider.config(dialog, {});

const noop = () => {
};

export const ModalInner = function ({type, messageProps = {}, title, rtl, prefix = defaultPrefix, content}) {
    return (
        <Message
            size="medium"
            shape="addon"
            type={MESSAGE_TYPE[type]}
            {...messageProps}
            title={title}
            rtl={rtl}
            className={cx(`${prefix}dialog-message`, messageProps.className)}
        >
            {content}
        </Message>
    );
};



class Modal extends Component {
    static propTypes = {
        prefix: PropTypes.string,
        pure: PropTypes.bool,
        rtl: PropTypes.bool,
        type: PropTypes.oneOf(['alert', 'confirm', 'success', 'error', 'notice', 'warning', 'help']),
        title: PropTypes.node,
        content: PropTypes.node,
        messageProps: PropTypes.object,
        footerActions: PropTypes.array,
        /**
         * Callback function triggered when Ok button is clicked
         * @param {Object} event click event object
         * @returns {Promise} Optionally handles a Promise return object
         */
        onOk: PropTypes.func,
        /**
         * Callback function triggered when Cancel button is clicked
         * @param {Object} event click event object
         * @returns {Promise} Optionally handles a Promise return object
         */
        onCancel: PropTypes.func,
        /**
         * Callback function triggered when Close button is clicked
         * @param {Object} event click event object
         * @returns {Promise} Optionally handles a Promise return object
         */
        onClose: PropTypes.func,
        okProps: PropTypes.object,
        locale: PropTypes.object,
        needWrapper: PropTypes.bool,
        className: PropTypes.string,
        autoOnOkMessage: PropTypes.bool,
    };

    static defaultProps = {
        prefix: defaultPrefix,
        pure: false,
        messageProps: {},
        onOk: noop,
        onCancel: noop,
        onClose: noop,
        okProps: {},
        locale: zhCN.Dialog,
        needWrapper: true,
        autoOnOkMessage: true,
    };

    state = {
        visible: true,
        loading: false,
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
            prefix,
            type,
            title,
            content,
            messageProps,
            footerActions,
            onOk,
            onCancel,
            onClose,
            okProps,
            needWrapper,
            rtl,
            className,
            className2,
            width = defaultWidth,
            managerConfig,
            popManagerElement,
            autoOnOkMessage,
            v2,
            ...others
        } = this.props;
        const newTitle = needWrapper && type ? null : title;
        const newContent =
            needWrapper && type ? (
                <ModalInner
                    type={type}
                    messageProps={messageProps}
                    title={title}
                    rtl={rtl}
                    prefix={prefix}
                    content={content}
                />
            ) : (
                content
            );

        const newFooterActions =
            footerActions ||
            (type === 'confirm'
                ? ['ok', 'cancel']
                : ['alert', 'success', 'error', 'notice', 'warning', 'help'].indexOf(type) > -1
                    ? ['ok']
                    : undefined);

        const newOnOk1 = wrapperMessage(onOk, autoOnOkMessage);

        const newOnOk = this.wrapper(newOnOk1, this.close);
        const newOnCancel = this.wrapper(onCancel, this.close);
        const newOnClose = this.wrapper(onClose, this.close);

        const {visible, loading} = this.state;
        // 不能直接改，这里修改相当于改了全局 okProps
        // okProps.loading = loading;

        const newOkProps = {...okProps};
        if (!('loading' in okProps)) {
            newOkProps.loading = loading;
        }

        const classNames = className2 ?
            className2 : cx(`${prefix}dialog-quick`, className);

        const Tag = v2 ? dialog2 : Dialog;

        return (
            <Tag
                prefix={prefix}
                role="alertdialog"
                {...others}
                visible={visible}
                title={newTitle}
                rtl={rtl}
                footerActions={newFooterActions}
                onOk={this.state.loading ? noop : newOnOk}
                onCancel={newOnCancel}
                onClose={newOnClose}
                okProps={newOkProps}
                className={classNames}
                width={v2 ? width : undefined}
            >
                {newContent}
            </Tag>
        );
    }
}


const ConfigModal = ConfigProvider.config(Modal, {componentName: 'Dialog'});

const showManager = new PopManager({
    maxCount: 999,
    Tag: PopManager.buildModalList(ConfigModal),
    duration: PopManager.MAX_DURATION,
}).createExports();


function createShowFn(showFnBuild) {
    return (config) => {
        const config2 = ConfigProvider.getContextProps({props: config, displayName: 'Dialog'});
        const showFn = showFnBuild(showManager.show);
        return showFn({...config2, ...config});
    };
}


showManager.showForm = createShowFn(buildShowForm);
showManager.showInput = createShowFn(buildShowInput);
showManager.showTable = createShowFn(buildShowTable);
showManager.showBatchInput = createShowFn(buildShowBatchInput);
showManager.showComp = createShowFn(buildShowComp);
showManager.showAudit = createShowFn(buildShowAudit);
showManager.showBatchByExcel = createShowFn(buildShowBatchByExcel);
showManager.showBatchProcess = createShowFn(buildShowBatchProcess);
showManager.showTab = createShowFn(buildShowTab);


showManager.confirmPromise = (config) => {
    return new Promise((resolve, reject) => {
        showManager.confirm({
            ...config,
            onOk: () => {
                resolve(true);
            },
            onCancel: () => {
                resolve(false);
            },
            onClose: () => {
                resolve(false);
            },
        })
    });
}

export {
    showManager
}
