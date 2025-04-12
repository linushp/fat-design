import React, {useState} from 'react'
import classnames from 'classnames'
import Button from "../button";
import Balloon from "../balloon";
import Message from '../message';
import {makeChain, wrapperFn} from "../util/func";
import zhCN from '../locale/zh-cn';
import ConfigProvider from "../config-provider";
import {obj, wrapAutoMessage} from "../util";
const defaultPrefix = ConfigProvider.defaultPrefix;

const noop = () => {
}

const defaultLocale = zhCN.BalloonConfirm;

const BalloonConfirm = (props, ref)=> {

    const {
        children,
        onOk,
        onCancel,
        okProps,
        cancelProps,
        footerAlign,
        footerActions,
        messageProps,
        trigger,
        prefix,
        className,
        autoOnOkMessage,
        ...balloonProps
    } = props

    console.log('BalloonConfirm props', props)

    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const cls = (tt) => {
        if (!tt) {
            return `${prefix}balloon-confirm`
        }
        return `${prefix}balloon-confirm-${tt}`
    }

    const _onVisibleChange = (newVisible, trigger) => {
        if (!('visible' in props)) {
            setVisible(newVisible)
        }
        props.onVisibleChange(newVisible, trigger)
    }


    const wrapper = (fn, callback) => {
        return wrapperFn(fn, (isLoading) => {
            setLoading(isLoading);
        }, callback, {});
    }

    const close = () => {
        setVisible(false)
    }

    const renderFooter = () => {
        const {footer, locale} = props
        if (footer === false) return null

        const newOnOk1 = wrapAutoMessage(onOk, autoOnOkMessage)
        const newOnOk = wrapper(newOnOk1, close)
        const newOnCancel = wrapper(onCancel, close)
        const actions = {newOnOk, newOnCancel}

        const newClassName = classnames({
            [cls('footer')]: true,
            [cls(`align-${footerAlign}`)]: true,
        })

        const newLocale = obj.deepMerge({}, defaultLocale, locale);

        const footerContent =
            footer === true || !footer
                ? footerActions.map((action) => {
                    const btnProps = props[`${action}Props`];

                    if (btnProps && action === 'ok') {
                        btnProps.loading = loading;
                    }

                    const btnText = props[`${action}Text`]
                    const newBtnProps = {
                        type: action === 'ok' ? 'primary' : undefined,
                        size: 'small',
                        ...btnProps,
                        iconSize:'xxs',
                        children: btnProps.children || btnText || newLocale[action] || action,
                        className: classnames(cls('btn'), btnProps.className),
                        onClick: makeChain(actions[`newOn${action[0].toUpperCase() + action.slice(1)}`], btnProps.onClick),
                    }
                    return <Button key={action} {...newBtnProps} />
                })
                : footer
        return <div className={newClassName}>{footerContent}</div>
    }


    const disabled = trigger && trigger.props ? trigger.props.disabled : false

    const newBalloonClassName = classnames({
        [`${cls('')}`]: true,
        [`${className}`]: !!className
    });


    return (
        <Balloon
            visible={visible && !disabled}
            closable={false}
            {...balloonProps}
            trigger={trigger}
            onVisibleChange={_onVisibleChange}
            className={newBalloonClassName}
        >
            <Message className={cls('message')}
                     type="warning"
                     {...messageProps}>
                {children}
            </Message>
            {renderFooter()}
        </Balloon>
    )
};



BalloonConfirm.defaultProps = {
    prefix: defaultPrefix,
    onOk: noop,
    onCancel: noop,
    okProps: {},
    cancelProps: {},
    autoOnOkMessage: true,
    footerAlign: 'right',
    footerActions: ['ok', 'cancel'],
    onVisibleChange: noop,
    triggerType: 'click',
}

BalloonConfirm.displayName = 'BalloonConfirm';

export default BalloonConfirm;

