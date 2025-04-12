import React from "react";
import Form from "../../form2";
import {FormItemProps} from "../../form2/form-types";

import ConfigProvider from "../../config-provider";
const defaultPrefix = ConfigProvider.defaultPrefix;

const FormItem = Form.Item;


function DetailPageFormItem(props: FormItemProps) {
    return <FormItem {...props} />
}


DetailPageFormItem.defaultProps = {
    prefix: defaultPrefix,
}


export {
    DetailPageFormItem
}
