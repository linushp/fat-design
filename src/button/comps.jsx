import React, {useState} from 'react'
import ConfigProvider from "../config-provider";
import Button0 from "./view/button";
import {env} from "../util";
import {useOnKeyPressSave} from "../hooks/useOnKeyPressSave";
import {usePersistFn} from "../hooks/usePersistFn";
import {ComponentsStore} from "../util/comp";
import {pickErrorMessage} from "../util/pick-res-data";


const Button1 = ConfigProvider.config(Button0, {
    transform: /* istanbul ignore next */ (props, deprecated) => {
        if ('shape' in props) {
            deprecated('shape', 'text | warning | ghost', 'Button');

            const {shape, type, ...others} = props;

            let newType = type;
            if (
                type === 'light' ||
                type === 'dark' ||
                (type === 'secondary' && shape === 'warning')
            ) {
                newType = 'normal';
            }

            let ghost;
            if (shape === 'ghost') {
                ghost = {
                    primary: 'dark',
                    secondary: 'dark',
                    normal: 'light',
                    dark: 'dark',
                    light: 'light',
                }[type || Button0.defaultProps.type];
            }

            const text = shape === 'text';
            const warning = shape === 'warning';

            props = {type: newType, ghost, text, warning, ...others};
        }

        return props;
    },
});


function createButtonText() {
    if (env.isMacOS) {
        return "保存（⌘ +S）";
    }
    return "保存（Ctrl+S）";
}

/**
 * 自动设置loading状态
 * @param props
 * @constructor
 */
function SaveButton(props) {
    const {onClick, children, actionParams, loadingMessage = "保存中...", successMessage="保存成功", ...otherProps} = props;
    const [loading, setLoading] = useState(false)
    const Message = ComponentsStore.getBuildIn("Message");

    const handleSave = usePersistFn(async (...args) => {

        if (typeof onClick !== "function") {
            setLoading(false)
            return;
        }

        if (loading) {
            return;
        }

        let messageObj = null;

        if (loadingMessage) {
            const Message2 = Message.Message2;
            messageObj = Message2.loading({content: loadingMessage, duration: 0})
        }

        const closeMessageObj = ()=>{
            if (messageObj && typeof messageObj.close === "function") {
                messageObj.close();
            }
        }

        try {
            setLoading(true)
            const res = await onClick(actionParams);
            setLoading(false);
            closeMessageObj();

            if (res!==false) {
                if (typeof successMessage === "string"){
                    Message.success(successMessage)
                }
            }

        } catch (e) {
            closeMessageObj();
            Message.error(pickErrorMessage(e));
            setLoading(false)
        }

        setLoading(false)
    });


    useOnKeyPressSave(handleSave)

    const buttonText = createButtonText();

    return (
        <Button1 {...otherProps} onClick={handleSave} loading={loading}>
            {children || buttonText}
        </Button1>
    )
}

const CONFIRM_TYPE = {
    dialog: 'dialog',
    balloon: 'balloon',
};

function getConfirmType(doubleConfirm, doubleConfirmConfig) {
    if (!doubleConfirm) {
        return null;
    }
    if (doubleConfirmConfig && doubleConfirmConfig.type === 'balloon') {
        return 'balloon'
    }
    return 'dialog';
}

function ActionButton(props) {
    const Message = ComponentsStore.getBuildIn("Message");
    const Dialog = ComponentsStore.getBuildIn("Dialog");
    const BalloonConfirm = ComponentsStore.getBuildIn("BalloonConfirm");

    const {onClick, children, actionParams, loadingMessage, successMessage, doubleConfirm, doubleConfirmConfig = {}, ...otherProps} = props;
    const [loading, setLoading] = useState(false)

    const handleAction = async () => {

        if (typeof onClick !== "function") {
            setLoading(false)
            return;
        }

        if (loading) {
            return;
        }

        let messageObj = null;

        if (loadingMessage) {
            messageObj = Message.loading({content: loadingMessage, duration: 0})
        }

        const closeMessageObj = ()=>{
            if (messageObj && typeof messageObj.close === "function") {
                messageObj.close();
            }
        }

        let res = null
        try {
            setLoading(true)
            res =  await onClick(actionParams);
            setLoading(false);
            closeMessageObj();
            if (successMessage){
                Message.success(successMessage)
            }
        } catch (e) {
            closeMessageObj();
            Message.error(pickErrorMessage(e));
            setLoading(false)
        }

        setLoading(false);

        return res;
    }


    const confirmType = getConfirmType(doubleConfirm, doubleConfirmConfig)

    const confirmContent = (
        <div>
            确认是否操作 【{children}】 ?
        </div>
    );
    const handleOnClick = () => {
        if (confirmType === CONFIRM_TYPE.dialog) {
            Dialog.confirm({
                messageProps: {
                    type: 'warning'
                },
                title: '请确认',
                content: confirmContent,
                ...doubleConfirmConfig,
                onOk: handleAction
            })
        } else {
            handleAction();
        }
    }

    const buttonComp = (
        <Button1 {...otherProps} onClick={handleOnClick} loading={loading}>
            {children}
        </Button1>
    );


    if (confirmType === CONFIRM_TYPE.balloon) {
        return (
            <BalloonConfirm
                trigger={(
                    <Button1 {...otherProps} onClick={()=>{}} loading={loading}>{children}</Button1>
                )}
                title={doubleConfirmConfig.title || ''}
                onOk={handleAction}>
                {doubleConfirmConfig.content || confirmContent}
            </BalloonConfirm>
        )
    }

    return buttonComp;
}



function LoadingButton(props) {
    let { onClick, children, renderChildren, ...others} = props;
    const [loading, setLoading] = useState(false);
    const handleClick = async ()=>{
        if (typeof onClick === "function") {
            const res = onClick();
            if (res && typeof res.then === "function") {
                try {
                    setLoading(true);
                    await res;
                } catch (e) {
                    console.error('LoadingButton', e)
                } finally {
                    setLoading(false);
                }
            }
        }
    }

    if (typeof renderChildren === "function") {
        children = renderChildren(loading);
    }
    return (
        <Button1 {...others} onClick={handleClick} loading={loading} children={children} />
    )
}

export {
    Button1,
    ActionButton,
    SaveButton,
    LoadingButton
}
