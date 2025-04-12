import {func} from "../../util";
import zhCn from "../../locale/zh-cn";
import ConfigProvider from "../../config-provider";

const defaultPrefix = ConfigProvider.defaultPrefix;


const formDefaultProps = {
    prefix: defaultPrefix,
    onSubmit: func.preventDefault,
    size: 'medium',
    labelAlign: 'left',
    onChange: func.noop,
    component: 'form',
    device: 'desktop',
    locale: zhCn.Form,
    colon: false,
    autoValidate: true,
    useLabelForErrorMessage: true,
    helpPos: 'bottom',
    disabled: false, // FormItem可以继承
    isPreview: false,  // FormItem可以继承
    display: true,  // FormItem可以继承
    autoValidateOnCreated: false,
    previewPlaceholder: '--'
};


export const FORM_ITEM_TYPE_MARK = defaultPrefix + 'form-item';
export const FORM_SUBMIT_TYPE_MARK = defaultPrefix + 'form-submit';
export const FORM_RESET_TYPE_MARK = defaultPrefix + 'form-reset';
export const FORM_BUTTON_TYPE_MARK = defaultPrefix + 'form-button';


export {
    formDefaultProps
}
