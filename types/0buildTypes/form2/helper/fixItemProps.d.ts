import { FormItemProps, FormItemStateSaved, IFormContext, IFormSectionContext } from "../form-types";
/**
 * 使用继承关系，设置FormItemProps
 * @param props0
 * @param formContext
 * @param formSectionContext
 * @param runtimeId
 */
declare function fixItemPropsByInherit(props0: FormItemProps, formContext: IFormContext, formSectionContext: IFormSectionContext, runtimeId: string): FormItemProps;
/**
 * 使用状态，设置FormItemProps
 * @param props
 * @param itemState
 */
declare function fixItemPropsByState(props: FormItemProps, itemState: FormItemStateSaved): FormItemStateSaved;
export { fixItemPropsByInherit, fixItemPropsByState };
