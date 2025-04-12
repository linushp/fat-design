import React from 'react';
import {DialogFooterUtils} from "../dialog/utils.jsx";

//
// /**
//  * 底部内容，设置为 false，则不进行显示
//  * @default [<Button type="primary">确定</Button>, <Button>取消</Button>]
//  */
//  footer: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
//     /**
//      * 底部按钮的对齐方式
//      */
//     footerAlign: PropTypes.oneOf(['left', 'center', 'right']),
//     /**
//      * 指定确定按钮和取消按钮是否存在以及如何排列,<br><br>**可选值**：
//      * ['ok', 'cancel']（确认取消按钮同时存在，确认按钮在左）
//      * ['cancel', 'ok']（确认取消按钮同时存在，确认按钮在右）
//      * ['ok']（只存在确认按钮）
//      * ['cancel']（只存在取消按钮）
//      */
//     footerActions: PropTypes.array,
//


function getIsRenderFooter(props) {
    if (props.footer === false) {
        return false;
    }
    const keyProps = ['onOk', 'onCancel', 'okProps', 'cancelProps', 'okText', 'cancelText'];
    for (let i = 0; i < keyProps.length; i++) {
        const keyProp = keyProps[i];
        if (props[keyProp]) {
            return true;
        }
    }
    const footerActions = props.footerActions;
    return Array.isArray(footerActions) && footerActions.length > 0;
}

function getFooterActions(props) {
    const footerActions = props.footerActions;
    if (Array.isArray(footerActions) && footerActions.length > 0) {
        return footerActions;
    }
    return ['ok', 'cancel'];
}


function DrawerFooter(props) {
    const {prefix, footer, locale} = props;
    const isRenderFooter = getIsRenderFooter(props);
    if (!isRenderFooter) {
        return null;
    }
    const footerActions = getFooterActions(props);
    const footerUtils = new DialogFooterUtils({...props});
    const footerContent = footerUtils.getFooterContent({prefix, footer, footerActions, locale})

    return (
        <div className={`${prefix}drawer-footer`}>
            {footerContent}
        </div>
    );
}

export {
    DrawerFooter
}
