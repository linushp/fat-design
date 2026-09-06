import React from "react";
import FormItem from './form-item';
import { FormButton, FormButtonGroup, Reset, Submit } from './form-buttons';
import { FormProps } from "./form-types";
import { FormSection } from "./form-section";
import { FormItemCard } from "./form-item-card";
declare class Form extends React.Component<FormProps, any> {
    static Item: typeof FormItem;
    static ItemCard: typeof FormItemCard;
    static Section: typeof FormSection;
    static Submit: typeof Submit;
    static Reset: typeof Reset;
    static Button: typeof FormButton;
    static ButtonGroup: typeof FormButtonGroup;
    static schemaToFormItems: (schema: any) => import("react/jsx-runtime").JSX.Element[];
    static useFormChildren: (props: FormProps) => any[];
    render(): import("react/jsx-runtime").JSX.Element;
}
declare const _default: typeof Form;
export default _default;
