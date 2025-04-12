import {makeChain} from "../util/func";
import {obj, wrapAutoMessage} from "../util";
import Button from "../button/index.jsx";
import classNames from 'classnames';
import zhCN from "../locale/zh-cn.js";

const defaultLocale =  zhCN.Dialog;

class DialogFooterUtils {
    constructor(props) {
        this.props = props;
    }

    getFooterContent ({prefix, footer, footerActions, locale}) {
        const newLocale = obj.deepMerge({}, defaultLocale, locale);

        return (footer === true || !footer)
            ? footerActions.map(action => {
                const btnProps = this.props[`${action}Props`] || {};
                const btnText = this.props[`${action}Text`];
                const footerActionsProps = this.props.footerActionsProps || {}; //
                // 'ok': {
            //     onClick: ()=>{},
            //         children: 111,
            //         text: 111,
            // }
                const btnPros2 = footerActionsProps[action] || {};

                const newBtnProps = {
                    ...btnProps,
                    prefix,
                    className: classNames(`${prefix}dialog-btn`, btnProps.className, btnPros2.className),
                    onClick: makeChain(
                        btnPros2[`onClick`],
                        this.props[`on${action[0].toUpperCase() + action.slice(1)}`],
                        btnProps.onClick
                    ),
                    children: btnProps.children || btnText || btnPros2.children ||btnPros2.text ||newLocale[action] || action,
                };
                if (action === 'ok') {
                    newBtnProps.type = 'primary';
                }
                return <Button key={action} {...newBtnProps} />;
            })
            : footer;
    }
}


function wrapperMessage(onOk, autoOnOkMessage) {
    return wrapAutoMessage(onOk, autoOnOkMessage)
}

export {
    DialogFooterUtils,
    wrapperMessage
}
