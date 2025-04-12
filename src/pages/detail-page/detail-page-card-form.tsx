import React from "react";
import {DetailPageCardFormProps} from "./types";
import Form from "../../form2";
import {LayoutEnum} from "../../form2/form-types";
import ConfigProvider from "../../config-provider";

const defaultPrefix = ConfigProvider.defaultPrefix;


function DetailPageCardForm(props: DetailPageCardFormProps) {
    const {prefix} = props;
    return (
        <div className={`${prefix}detail-page-card-form`}>
            <Form {...props} />
        </div>
    )
}


DetailPageCardForm.defaultProps = {
    prefix: defaultPrefix,
    autoValidateOnCreated: false,
    layout: LayoutEnum.null
}


export {
    DetailPageCardForm
}
