import React from "react";
import FormItem from './form-item';
import {schemaToFormItems, useFormChildren} from "./helper/useFormChildren";
import FormComponent from './form';
import {FormButton, FormButtonGroup, Reset, Submit} from './form-buttons';
import {FormProps} from "./form-types";
import {FormSection} from "./form-section";
import {FormItemCard} from "./form-item-card";
import ConfigProvider from "../config-provider";


class Form extends React.Component<FormProps, any> {
    static Item: typeof FormItem = FormItem;
    static ItemCard: typeof FormItemCard = FormItemCard;
    static Section: typeof FormSection = FormSection
    static Submit: typeof Submit = Submit;
    static Reset: typeof Reset = Reset;
    static Button: typeof FormButton = FormButton;
    static ButtonGroup: typeof FormButtonGroup = FormButtonGroup;
    static schemaToFormItems = (schema: any) => {
        return schemaToFormItems(schema, FormItem)
    };
    static useFormChildren = (props: FormProps) => {
        return useFormChildren(props, FormItem);
    }

    render() {
        return <FormComponent {...this.props} />
    }
}

export default ConfigProvider.config<typeof Form>(Form, {displayName: 'Form'});
