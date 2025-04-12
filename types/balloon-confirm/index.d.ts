import * as React from 'react';
import {BalloonProps} from "../balloon";
import {ButtonProps} from "../button";


export interface BalloonConfirmProps extends BalloonProps {
    prefix?: string;
    locale?: any;
    className?: string;
    autoOnOkMessage?: boolean;
    children?: any;

    messageProps?: any;

    /**
     * 在点击确定按钮时触发的回调函数
     */
    onOk?: (event: React.MouseEvent) => void;

    /**
     * 在点击取消按钮时触发的回调函数
     */
    onCancel?: (event: React.MouseEvent) => void;

    /**
     * 应用于确定按钮的属性对象
     */
    okProps?: ButtonProps;

    /**
     * 应用于取消按钮的属性对象
     */
    cancelProps?: ButtonProps;

}



declare function BalloonConfirm(props: BalloonConfirmProps): React.JSX.Element;
declare namespace BalloonConfirm {
    var defaultProps: {
        onOk: () => void;
        onCancel: () => void;
        okProps: {};
        cancelProps: {};
        autoOnOkMessage: boolean;
        footerAlign: string;
        footerActions: string[];
        onVisibleChange: () => void;
        triggerType: string;
    };
}
export default BalloonConfirm;


export interface PopConfirmProps extends BalloonConfirmProps {
    title?: any;
    content?: any;
}

declare function PopConfirm(props: PopConfirmProps): React.JSX.Element;
declare namespace PopConfirm {
    var defaultProps: {
        onOk: () => void;
        onCancel: () => void;
        okProps: {};
        cancelProps: {};
        autoOnOkMessage: boolean;
        footerAlign: string;
        footerActions: string[];
        onVisibleChange: () => void;
        triggerType: string;
    };
}
export {
    PopConfirm
};

