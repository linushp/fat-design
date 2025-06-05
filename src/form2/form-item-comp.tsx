import React from "react";
import classnames from 'classnames';
import {FormItemProps, WrapFormItemProps} from "./form-types";
import {FormActions} from "./form-actions";
import debounce from 'lodash.debounce'
import {renderWrapPreview} from "./form-item-preview";
import {useDataSource} from "./helper/useDataSource";
import {getFormItemLabel} from "./form-item-label";
import {buildFnFormOnChangeParams} from "./helper/buildParams";
import {isNil} from "../util/object";
import {useGetXProps} from "./helper/useGetXProps";
import {FORM_ITEM_TYPE_MARK} from "./helper/constants";


const triggerAutoValidateDebounce = debounce((triggerName: string, formItemProps: FormItemProps, formActions: FormActions) => {
    const name = formItemProps.name;
    formActions.validateFromItemByTrigger(name, triggerName);
}, 100);


function cloneChildren(children: any, childrenProps: any, formItemProps: FormItemProps) {

    if (typeof children === "function") {
        return null;
    }

    if (!children || children.length === 0) {
        return null;
    }

    return React.Children.map(children, (child, idx) => {

        let nextChildren = child.props.children;
        if (nextChildren) {
            nextChildren = cloneChildren(nextChildren, childrenProps, formItemProps);
        }

        const typeMark = "" + child.type._typeMark; //TODO 设置
        const supportPreview = child.type._supportPreview; // TODO 设置

        // 需要preview但是组件不支持
        if (childrenProps.isPreview && !supportPreview) {
            return renderWrapPreview(childrenProps, formItemProps);
        }

        if (child && typeof child === "object" && typeMark !== FORM_ITEM_TYPE_MARK && typeMark.startsWith('FORM_COMP_')) {
            const extraProps = Object.assign({}, child.props, {...childrenProps, children: nextChildren});
            return React.cloneElement(child, extraProps);
        }

        if (typeof child === "function") {
            return null;
        }

        const extraProps = Object.assign({}, child.props, {children: nextChildren});
        return React.cloneElement(child, extraProps);
    });
}


function renderComponentTag(ComponentTag: any, childProps: any, formItemProps: FormItemProps) {
    if (!ComponentTag) {
        return null;
    }

    // 预览模式
    if (childProps.isPreview) {
        if (!ComponentTag._supportPreview) {
            return renderWrapPreview(childProps, formItemProps);
        }
        const className = classnames(childProps.className, `${formItemProps.prefix}form-preview`)
        return <ComponentTag {...childProps} className={className} />
    }

    return <ComponentTag {...childProps} />
}



function FormItemComp(props: WrapFormItemProps) {

    const {formItemProps, formContext, formItemState} = props;
    const {isPreview, disabled, state, value, forceUpdateTick} = formItemState;

    const {
        id,
        name,
        component,
        children,
        render,
        renderPreview,
        enums,
        hasFeedback,
        labelAlign,
        size,
    } = formItemProps;

    const xProps = useGetXProps(formItemProps, formItemState, formContext);

    const formStore = formContext.formStore;
    const formActions = formContext.formActions as FormActions;
    const formComponents = formContext.formComponents;
    const formOnChange = formContext.formOnChange;


    const ComponentTag = formComponents.getComponentTag(component);

    // 触发自动校验
    const triggerAutoValidate = (triggerName: string) => {
        if (!formItemProps.autoValidate) {
            return;
        }
        triggerAutoValidateDebounce(triggerName, formItemProps, formActions);
    };


    const onChangeCallback = (nextValue: any, onChangeReturnValue: any) => {
        if (!isNil(onChangeReturnValue)) {
            nextValue = onChangeReturnValue;
        }

        formStore.setValue(`values.${name}`, nextValue);
        formOnChange(formStore);
        formStore.commit();

        triggerAutoValidate('onChange');
    }


    const onChange = (nextValue: any, triggerType: any, valueDS: any) => {

        let onChangeReturn;
        if (typeof formItemProps.onChange === "function") {
            // 用户可以在onChange中对storeData进行修改，实现values的联动
            const onChangeParams = buildFnFormOnChangeParams(formStore, formActions);
            onChangeParams.eventArgs = [nextValue, triggerType, valueDS];
            onChangeReturn = formItemProps.onChange(nextValue, onChangeParams);
        }

        if (onChangeReturn && typeof onChangeReturn.then === "function") {

            onChangeReturn.then((v: any) => {
                onChangeCallback(nextValue, v);
            });

        } else {
            onChangeCallback(nextValue, onChangeReturn);
        }

    };

    const onBlur = () => {
        triggerAutoValidate('onBlur');
    };

    const onFocus = () => {
        triggerAutoValidate('onFocus');
    };


    const childProps: any = {
        id,
        value,
        size,
        onBlur,
        onFocus,
        onChange,
        disabled,
        ...xProps
    };

    if (state && (state === 'error' || hasFeedback)) {
        childProps.state = state;
    }

    if (labelAlign === 'inset') {
        childProps.label = getFormItemLabel(formItemProps, formItemState)
    }

    if (isPreview) {
        childProps.isPreview = true;
        childProps.renderPreview = renderPreview;
    }

    const dataSource = useDataSource(enums, childProps, xProps, formContext, forceUpdateTick);
    if (dataSource) {
        childProps.dataSource = dataSource;
    }

    // debugger;
    console.log("comp==> ",xProps, dataSource)


    // 三种方式渲染。
    const renders = [
        renderComponentTag(ComponentTag, childProps, formItemProps),
        cloneChildren(children, childProps, formItemProps),
        (typeof render === "function" ? render(value, childProps) : null)
    ].filter((s) => {
        return !!s
    });


    // 三种方式渲染都没有结果，默认使用Input组件
    if (renders.length === 0) {
        const inputTag = formComponents.getComponentTag('Input');
        return renderComponentTag(inputTag, childProps, formItemProps);
    }

    return (
        <>
            {renders[0] || null}
            {renders[1] || null}
            {renders[2] || null}
        </>);
}

export {
    FormItemComp
}
