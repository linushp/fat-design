import React from "react";
import { DetailPageCardFormProps } from "./types";
import { LayoutEnum } from "../../form2/form-types";
declare function DetailPageCardForm(props: DetailPageCardFormProps): React.JSX.Element;
declare namespace DetailPageCardForm {
    var defaultProps: {
        prefix: string;
        autoValidateOnCreated: boolean;
        layout: LayoutEnum;
    };
}
export { DetailPageCardForm };
