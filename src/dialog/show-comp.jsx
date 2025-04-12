import React from 'react';
import classNames from 'classnames';
import {defaultPrefix} from "../config-provider";

// function Component({fnRef, record}){
//     fnRef.onOk = ()=>{
//
//     }
//     return <div />
// }
//
// Dialog.showComp({
//     comp: Comp,
//     record:record
// })

function DefComp(){
    return (
        <div>
            缺少component参数
        </div>
    )
}


function buildFooterActions(footerActions, fnRef){
    const callbacks = {}
    if(Array.isArray(footerActions)){
        for (let i = 0; i < footerActions.length; i++) {
            const action = footerActions[i];
            if (typeof action === "string") {
                const fnName = `on${action[0].toUpperCase() + action.slice(1)}`
                callbacks[fnName] = async ()=>{
                    const fnFromFnRef = fnRef[fnName]
                    if (typeof fnFromFnRef === "function") {
                        return await fnFromFnRef();
                    }
                }
            }
        }
    }
    return callbacks;
}


function buildShowComp(show) {
    return function showComp(config = {}) {
        let {
            size = 'small',
            prefix = defaultPrefix,
            className,
            component,
            xProps,
            footerActions,
            onOk,
            onCancel,
            onClose,
            ...otherProps
        } = config;

        const Component = component || DefComp;

        const fnRef = {
            onOk,
            onCancel,
            onClose, // 这是常用的三个函数，还可以通过footerActions传入任意函数
            setFn: (fnName, fn)=>{
                fnRef[fnName] = fn;
            }
        };

        const dataRef = {};

        const otherActions = buildFooterActions(footerActions, fnRef);

        return show({
            size,
            className: classNames(`${prefix}dialog-show-comp`, className),
            content: (
                <Component fnRef={fnRef} dataRef={dataRef} {...xProps} />
            ),
            footerActions,
            ...otherActions,
            onOk: async () => {
                if (typeof fnRef.onOk === "function") {
                    return await fnRef.onOk();
                }
            },
            onCancel: async () => {
                if (typeof fnRef.onCancel === "function") {
                    return await fnRef.onCancel();
                }
            },
            onClose: async () => {
                if (typeof fnRef.onClose === "function") {
                    return await fnRef.onClose();
                }
            },
            ...otherProps,
        });
    }
}


export {
    buildShowComp
}
