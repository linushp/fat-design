import React, {useEffect, useMemo, useRef} from "react";
import classNames from 'classnames';
import FormItem from './form-item';
import {FormProps, FormStoreExtData1, IFormContext, LayoutEnum} from "./form-types";
import {formContextDef} from "./form-context";
import {PreciseStore, useCreatePreciseStore} from "../hooks/usePreciseStore";
import {FormActions} from "./form-actions";
import {linkageFormState} from "./helper/linkageFormState";
import {usePersistFn} from "../hooks/usePersistFn";
import {deepClone} from "../util/object";
import {FormLayout} from "./form-layout";
import {schemaToFormItems, useFormChildren} from "./helper/useFormChildren";
import {ComponentsStore} from "../util/comp";
import {buildFnFormOnChangeParams} from "./helper/buildParams";

import {logger} from "../util/log";
import {formDefaultProps} from "./helper/constants";

interface FormImplProps extends FormProps {
    formStore: PreciseStore
}

function FormImpl(props: FormImplProps) {

    logger.debug('render FormImpl', props)

    const {
        className = '',
        inline,
        size,
        style,
        prefix,
        rtl,
        isPreview,
        layout,
        formStore,
    } = props;

    // 每次render，必须重新设置。保证这里的propsMap所见即所得。
    formStore.extData1 = {propsMap: {}} as FormStoreExtData1;

    const formClassName = classNames({
        [`${prefix}form`]: true,
        [`${prefix}inline`]: inline, // 内联
        [`${prefix}${size}`]: size,
        [`${prefix}form-responsive-grid`]: layout === LayoutEnum.responsive,
        [`${prefix}form-preview`]: isPreview,
        [className]: !!className,
    });

    const children = useFormChildren(props, FormItem);

    return (
        <form
            role="grid"
            className={formClassName}
            style={style}
            dir={rtl ? 'rtl' : undefined}
            onSubmit={(e)=>{
                logger.debug('FormImpl onSubmit', e)
                if (e && typeof e.preventDefault === "function") {
                    e.preventDefault();
                }
                if (e && typeof e.stopPropagation === "function") {
                    e.stopPropagation();
                }
                return false;
            }}>
            <FormLayout {...props} children={children}/>
        </form>
    );
}


function Form(formProps: FormProps) {

    const FormProvider = formContextDef.Provider;

    const formActionsRef = useRef<FormActions>();

    const formStore = useCreatePreciseStore(() => {
        const defaultValues = formProps.defaultValues || {};
        return {
            defaultValues: deepClone(defaultValues),
            runtimeParams: {}, // 运行时的临时参数，form本身不关注，不影响render
            valuesOfOnSearch:{},
            stateMap: {},
            values: deepClone(defaultValues)
        }
    }, 'equal');


    const formOnChange = usePersistFn((formStore: PreciseStore) => {

        // 根据配置联动计算状态
        linkageFormState(formStore, formActionsRef.current as any);

        // 调用Form的onChange函数
        const storeData = formStore.storeData;
        if (typeof formProps.onChange === "function") {
            const {values} = storeData || {};
            formProps.onChange(values, buildFnFormOnChangeParams(formStore, formActionsRef.current as FormActions));
        }
    });



    const formActions = useMemo(() => {
        const locale = formProps.locale || {};
        formActionsRef.current = new FormActions(formStore, locale);
        return formActionsRef.current;
    }, [formStore]);


    const formContext = useMemo(() => {

        const formComponents = new ComponentsStore({
            components: formProps.components || {}
        });

        const ss: IFormContext = {
            formStore: formStore,
            formProps: formProps,
            formActions: formActions,
            formComponents: formComponents,
            formOnChange: formOnChange
        };
        return ss;

    }, [formProps, formStore, formActions, formOnChange]) as IFormContext;


    useEffect(() => {
        if (typeof formProps.onCreated === "function") {
            const values = formActions.getValues();
            formProps.onCreated(values, buildFnFormOnChangeParams(formStore, formActions));
        }

        setTimeout(() => {
            if (formProps.autoValidateOnCreated) {
                formActions.firstAutoValidateForm();
            }
        }, 1);
    }, [formStore, formActions]);


    return (
        <FormProvider value={formContext}>
            <FormImpl {...formProps} formStore={formStore}/>
        </FormProvider>
    );
}


Form.defaultProps = formDefaultProps;
Form.displayName = 'Form';
Form.Item = FormItem;
Form.Section = null as any;
Form.Reset = null as any;
Form.Submit = null as any;
Form.Button = null as any;
Form.ButtonGroup = null as any;
Form.ItemCard = null as any;
Form.schemaToFormItems = (schema: any) => {
    return schemaToFormItems(schema, FormItem)
};
Form.useFormChildren = (props: FormProps) => {
    return useFormChildren(props, FormItem);
}

export default Form;
