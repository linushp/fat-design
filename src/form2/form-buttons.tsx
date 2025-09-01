import React, { useContext, useState, useEffect, useRef } from "react";
import { formContextDef } from "./form-context";
import {
    BaseBtnProps,
    FormButtonGroupBtn,
    FormButtonGroupProps,
    IFormContext, ResetProps, SubmitProps
} from "./form-types";
import { FormActions } from "./form-actions";
import zhCn from "../locale/zh-cn";
import { buildFnFormOnChangeParams } from "./helper/buildParams";
import { getDeps } from "./deps";
import { PreciseStore } from "../hooks/usePreciseStore";
import { pickErrorMessage } from "../util/pick-res-data";
import { log } from "../util";
import { FORM_BUTTON_TYPE_MARK, FORM_RESET_TYPE_MARK, FORM_SUBMIT_TYPE_MARK } from "./helper/constants";
import { usePersistFn } from "../hooks/usePersistFn";


function getLocale(formContext: IFormContext, key: string): string {
    const locale = formContext.formProps?.locale || {};
    if (locale[key]) {
        return locale[key];
    }
    const defaultLocale = zhCn.Form as any;
    return defaultLocale[key] || `key.${key}`;
}


function getButtonChildren(props: BaseBtnProps, formContext: any, localKey: string) {
    const { children, text } = props;
    if (children) {
        return children;
    }
    if (text) {
        return (
            <>
                {text}
            </>
        )
    }
    return getLocale(formContext, localKey);
}


function FormButton(props: BaseBtnProps) {
    const { Button, Message } = getDeps();

    const formContext = useContext(formContextDef) as IFormContext;
    const {
        type,
        onClick,
        children,
        text,
        bizCallback,
        localKey,

        validate,
        toDefault,
        exclude,
        names,

        htmlType,
        xProps,

        ...otherProps
    } = props as any;

    const [loading, setLoading] = useState(false);
    const loadingRef = useRef(false);

    
    const formActions = formContext.formActions as FormActions;
    const formStore = formContext.formStore;
    const formEventBus = formContext.formEventBus;


    const handleClick = usePersistFn(async (e: any, b: any, c: any) => {
        const innerFn = async (e: any, b: any, c: any) => {
            if (typeof onClick === "function") {
                const params = buildFnFormOnChangeParams(formStore, formActions);
                params.eventArgs = [e, b, c];
                await onClick(e, params);
            }
            await bizCallback(formStore, formActions, formContext);
        }

        if(loadingRef.current) {
            return;
        }

        setLoading(true);
        loadingRef.current = true;

        try {
            await innerFn(e, b, c);
        } catch (err: any) {
            log.error('[FormButton] handleClick error ', err);
            Message.error(pickErrorMessage(err));
        }

        loadingRef.current = false;
        setLoading(false);
    });


    useEffect(() => {

        if (!formEventBus) {
            return;
        }

        const listener = () => {
            if (htmlType === 'submit') {
                // handleClick()
            }
        }

        // 自动触发的提交时间。
        formEventBus.on('FORM_IMPL_ON_SUBMIT', listener);

        return () => {
            formEventBus.off('FORM_IMPL_ON_SUBMIT', listener);
        }

    }, [formEventBus, htmlType])


    if (xProps && typeof xProps === "object") {
        Object.assign(otherProps, xProps);
    }


    return (
        <Button {...otherProps}
            type={type}
            htmlType={htmlType}
            loading={loading}
            onClick={handleClick}>
            {getButtonChildren(props, formContext, localKey)}
        </Button>
    );
}

FormButton._typeMark = FORM_BUTTON_TYPE_MARK;
FormButton._supportPreview = true;


function Submit(props: SubmitProps) {
    const { Message } = getDeps();

    const { validate, showToast, ...others } = props;

    const bizCallback = async (formStore: PreciseStore, formActions: FormActions, formContext: IFormContext) => {
        if (validate) {
            await formActions.validateForm();
            const errors = formActions.getErrors();
            if (errors.length > 0) {
                if (showToast) {
                    const errors0 = errors[0] as any;
                    const errors00 = errors0?.errors[0];
                    const stateMessage = errors00?.message || "";
                    Message.error(stateMessage);
                }
                return;
            }
        }

        if (typeof formContext.formProps.onSubmit === "function") {
            const values = formActions.getValues();
            await formContext.formProps.onSubmit(values, buildFnFormOnChangeParams(formStore, formActions));
        }
    }

    return (
        <FormButton type={'primary'} {...others} localKey={'buttonSubmit'} bizCallback={bizCallback} htmlType="submit" />
    );
}


Submit.defaultProps = {
    validate: true
};
Submit._typeMark = FORM_SUBMIT_TYPE_MARK;
Submit._supportPreview = true;


function Reset(props: ResetProps) {

    const {
        toDefault,
        names,
        exclude,
        ...others
    } = props;

    const bizCallback = async (formStore: PreciseStore, formActions: FormActions, formContext: IFormContext) => {
        if (toDefault) {
            await formActions.resetToDefault(names, exclude);
        } else {
            await formActions.reset(names, exclude);
        }

        if (typeof formContext.formProps.onReset === "function") {
            const values = formActions.getValues();
            await formContext.formProps.onReset(values, buildFnFormOnChangeParams(formStore, formActions));
        }
    }

    return (
        <FormButton {...others} localKey={'buttonReset'} bizCallback={bizCallback} htmlType="button" />
    );
}

Reset._typeMark = FORM_RESET_TYPE_MARK;
Reset._supportPreview = true;
Reset.defaultProps = {
    toDefault: false
};


function FormButtonGroup(props: FormButtonGroupProps): React.JSX.Element {
    const buttons = props.buttons || [];
    const className = props.className || '';
    const formContext = useContext(formContextDef) as IFormContext;
    const prefix = formContext.formProps.prefix;
    const formComponents = formContext.formComponents;

    return (
        <div className={`${prefix}form-button-group ${className}`}>
            {buttons.map((btn: FormButtonGroupBtn, index: number) => {
                const {
                    component,
                    ...otherProps
                } = btn;

                const Tag = formComponents.getComponentTag(component);

                if (!Tag) {
                    return null;
                }

                return (
                    <Tag key={index} {...otherProps} />
                );

            })}
        </div>
    );
}

FormButtonGroup._supportPreview = true;

export {
    Submit,
    Reset,
    FormButton,
    FormButtonGroup
}
