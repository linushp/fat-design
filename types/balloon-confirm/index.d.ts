import * as React from 'react';
import {BalloonProps} from "../balloon";
import {ButtonProps} from "../button";


export interface BalloonConfirmProps extends BalloonProps {
    prefix?: string;
    locale?: any;
    className?: string;
    
    /**
     * 是否在 onOk 成功时自动显示成功消息
     */
    autoOnOkMessage?: boolean;
    
    messageProps?: any;

    /**
     * 底部内容，设置为 false 则不进行显示
     * @default [<Button type="primary">确定</Button>, <Button>取消</Button>]
     */
    footer?: React.ReactNode | boolean;
    
    /**
     * 底部按钮的对齐方式
     */
    footerAlign?: 'left' | 'center' | 'right';
    
    /**
     * 指定确定按钮和取消按钮是否存在以及如何排列
     * @example ['ok', 'cancel'] | ['cancel', 'ok'] | ['ok'] | ['cancel']
     */
    footerActions?: Array<'ok' | 'cancel'>;
    
    /**
     * 确认按钮文案
     */
    okText?: React.ReactNode;
    
    /**
     * 取消按钮文案
     */
    cancelText?: React.ReactNode;

    /**
     * 在点击确定按钮时触发的回调函数，支持返回 Promise
     * @param event 点击事件对象
     * @returns 可以返回 void、Promise、false（阻止关闭）或其他值
     */
    onOk?: (event: React.MouseEvent) => void | Promise<any> | boolean | any;

    /**
     * 在点击取消按钮时触发的回调函数，支持返回 Promise
     * @param event 点击事件对象
     * @returns 可以返回 void、Promise、false（阻止关闭）或其他值
     */
    onCancel?: (event: React.MouseEvent) => void | Promise<any> | boolean | any;

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
        footerAlign: 'right';
        footerActions: ['ok', 'cancel'];
        onVisibleChange: () => void;
        triggerType: 'click';
    };
}
export default BalloonConfirm;


export interface PopConfirmProps extends Omit<BalloonConfirmProps, 'content'> {
    /**
     * 确认框的标题
     */
    title?: React.ReactNode;
    
    /**
     * 确认框的内容
     */
    content?: React.ReactNode;
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

