import React from "react";
import { IFormSectionProps } from "./form-types";
declare function FormSection(props: IFormSectionProps): React.JSX.Element;
declare namespace FormSection {
    var defaultProps: {
        prefix: string;
        onSubmit: typeof import("../util/func").preventDefault;
        size: string;
        labelAlign: string;
        onChange: () => void;
        component: string;
        device: string;
        locale: any;
        colon: boolean;
        autoValidate: boolean;
        useLabelForErrorMessage: boolean;
        helpPos: string;
        disabled: boolean;
        isPreview: boolean;
        display: boolean;
        autoValidateOnCreated: boolean;
        previewPlaceholder: string;
    };
}
export { FormSection };
