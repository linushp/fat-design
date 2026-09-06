import FormItem from './form-item';
import { FormProps } from "./form-types";
declare function Form(formProps: FormProps): import("react/jsx-runtime").JSX.Element;
declare namespace Form {
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
    var displayName: string;
    var Item: typeof FormItem;
    var Section: any;
    var Reset: any;
    var Submit: any;
    var Button: any;
    var ButtonGroup: any;
    var ItemCard: any;
    var schemaToFormItems: (schema: any) => import("react/jsx-runtime").JSX.Element[];
    var useFormChildren: (props: FormProps) => any[];
}
export default Form;
