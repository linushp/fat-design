import {FormItemProps, FormItemStateSaved, IFormContext, IFormSectionContext, LabelAlignEnum} from "../form-types";
import {inheritFormProps} from "./fnInheritProps";

/**
 * @param firstValue 高优先级
 * @param secondValue
 * @param expectType
 * @param defaultValue
 */
function mergeValue(firstValue: any, secondValue: any, expectType: string, defaultValue: any) {
    if (typeof firstValue === expectType) {
        return firstValue;
    }
    if (typeof secondValue === expectType) {
        return secondValue;
    }
    return defaultValue;
}


/**
 * 使用继承关系，设置FormItemProps
 * @param props0
 * @param formContext
 * @param formSectionContext
 * @param runtimeId
 */
function fixItemPropsByInherit(props0: FormItemProps, formContext: IFormContext, formSectionContext: IFormSectionContext, runtimeId: string): FormItemProps {
    const formProps = formContext.formProps as any;
    const sectionProps = formSectionContext?.sectionProps as any;

    const parentProps = {};
    if (formProps) {
        Object.assign(parentProps, formProps);
    }
    if (sectionProps) {
        Object.assign(parentProps, sectionProps);
    }

    const itemProps = {...props0} as any;

    inheritFormProps(itemProps, parentProps);

    itemProps.id = itemProps.id || runtimeId;

    itemProps.labelAlign = itemProps.device === 'phone' ? LabelAlignEnum.top : itemProps.labelAlign;

    return itemProps;
}

const DEFAULT_X_PROPS = {};

/**
 * 使用状态，设置FormItemProps
 * @param props
 * @param itemState
 */
function fixItemPropsByState(props: FormItemProps, itemState: FormItemStateSaved): FormItemStateSaved{
    return {
        xProps: mergeValue(itemState.xProps, props.xProps, 'object', DEFAULT_X_PROPS),
        required: mergeValue(itemState.required, props.required, 'boolean', false),
        display: mergeValue(itemState.display, props.display, 'boolean', true),
        disabled: mergeValue(itemState.disabled, props.disabled, 'boolean', false),
        isPreview: mergeValue(itemState.isPreview, props.isPreview, 'boolean', false),
        label: mergeValue(itemState.label, props.label, 'string', null),
        forceUpdateTick: itemState.forceUpdateTick || 0
    }
}

export {
    fixItemPropsByInherit,
    fixItemPropsByState
}
