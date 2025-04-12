import { PreciseStore } from "../../hooks/usePreciseStore";
import { FormItemProps } from "../form-types";
import { FormActions } from "../form-actions";
/**
 * 对单个formItem的状态进行联动计算
 * @param formStore
 * @param itemProps
 */
declare function linkageFormItemState(formStore: PreciseStore, itemProps: FormItemProps): void;
/**
 * 对所有formItem的状态进行联动计算
 * @param formStore
 * @param formActions
 */
declare function linkageFormState(formStore: PreciseStore, formActions: FormActions): void;
export { linkageFormState, linkageFormItemState };
