import { PreciseStore } from "../hooks/usePreciseStore";
import { FormItemProps, FormStoreExtData1, IItemState } from "./form-types";
type StringOrArray = string[] | string;
declare class FormActions {
    private formStore;
    private schemaValidateOptions;
    constructor(formStore: PreciseStore, locale: any);
    getExtData1(): FormStoreExtData1;
    validate(): Promise<void>;
    validateForm(): Promise<void>;
    firstAutoValidateForm(): Promise<void>;
    validateFromItem(name: string): Promise<void>;
    forceUpdate(name: string): void;
    setStateItem(name: string, stateKey: string, value: any): void;
    setState(name: string, updates: any): void;
    getState(name: string): any;
    getStates(): any;
    validateFromItemByTrigger(name: string, triggerName: string): Promise<any>;
    getErrors(): IItemState[];
    getFormItemPropsFixedByState(name: string): FormItemProps;
    getFormItemProps(name: string): FormItemProps;
    getValue(name: string): any;
    setValue(name: string, value: any): any;
    getValues(): any;
    setValues(values: any): any;
    getDefaultValues(): any;
    getResetNames(names: StringOrArray, exclude: string[]): string[];
    resetToDefault(names0?: StringOrArray, exclude?: string[], isValidate?: boolean): Promise<any>;
    reset(names0?: StringOrArray, exclude?: string[], isValidate?: boolean): Promise<any>;
    clearErrors(): Promise<void>;
    /**
     * 只拣取表单中存在的字段，其他values字段不管了。
     */
    pickFormValues(): any;
}
export { FormActions };
