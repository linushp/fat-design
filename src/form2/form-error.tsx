import React from 'react';
import {TypeHelpPos, WrapFormItemProps} from "./form-types";


interface FormErrorImplProps {
    prefix: any,
    stateMessage: any,
    helpPos?: TypeHelpPos
}

const FormErrorImpl = React.memo((props: FormErrorImplProps) => {
    const {prefix, stateMessage, helpPos} = props;

    if (helpPos === 'tip') {
        return null; // TODO 使用TIP显示错误提示
    }

    return <div className={`${prefix}form-item-help`}>{stateMessage}</div>;
});


export function FormError(props: WrapFormItemProps) {
    const prefix = props.formItemProps.prefix;
    const stateMessage = props.formItemState.stateMessage;
    const helpPos = props.formItemProps.helpPos;
    return <FormErrorImpl prefix={prefix} stateMessage={stateMessage} helpPos={helpPos}/>
}
