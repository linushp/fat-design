import React from "react";
import { BaseBtnProps, FormButtonGroupProps, ResetProps, SubmitProps } from "./form-types";
declare function FormButton(props: BaseBtnProps): import("react/jsx-runtime").JSX.Element;
declare namespace FormButton {
    var _typeMark: string;
    var _supportPreview: boolean;
}
declare function Submit(props: SubmitProps): import("react/jsx-runtime").JSX.Element;
declare namespace Submit {
    var defaultProps: {
        validate: boolean;
    };
    var _typeMark: string;
    var _supportPreview: boolean;
}
declare function Reset(props: ResetProps): import("react/jsx-runtime").JSX.Element;
declare namespace Reset {
    var _typeMark: string;
    var _supportPreview: boolean;
    var defaultProps: {
        toDefault: boolean;
    };
}
declare function FormButtonGroup(props: FormButtonGroupProps): React.JSX.Element;
declare namespace FormButtonGroup {
    var _supportPreview: boolean;
}
export { Submit, Reset, FormButton, FormButtonGroup };
