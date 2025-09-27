import {PreciseStore} from "../hooks/usePreciseStore";
import {FormItemProps, FormItemStateSaved, FormStoreExtData1, IItemState} from "./form-types";
import {buildValidateRules} from "./form-rules";
import SchemaValidate from '../validate'
import {uniqueId} from "../util/guid";
import { get } from '../util'
import {fixItemPropsByState} from "./helper/fixItemProps";

const DEF_EXT_DATA1: FormStoreExtData1 = {propsMap: {}};

type StringOrArray = string[] | string;


class FormActions {
    private formStore: PreciseStore;
    private schemaValidateOptions: any

    constructor(formStore: PreciseStore, locale: any) {
        this.formStore = formStore;
        this.schemaValidateOptions = {
            messages: locale.Validate || {},
            formStore: formStore
        }
    }

    getExtData1(): FormStoreExtData1 {
        return this.formStore.extData1 || DEF_EXT_DATA1;
    }

    async validate() {
        return this.validateForm();
    }

    async validateForm() {
        const {propsMap} = this.getExtData1();
        const nameList = Object.keys(propsMap);
        for (let i = 0; i < nameList.length; i++) {
            const name = nameList[i];
            const props = propsMap[name];
            if (props && props.name) {
                await this.validateFromItem(props.name);
            }
        }
        this.formStore.commit();
    }


    async firstAutoValidateForm() {
        const {propsMap} = this.getExtData1();
        const nameList = Object.keys(propsMap);
        for (let i = 0; i < nameList.length; i++) {
            const name = nameList[i];
            const props: FormItemProps = propsMap[name];
            if (props && props.name && props.autoValidate) {
                await this.validateFromItem(props.name);
            }
        }
        this.formStore.commit();
    }


    async validateFromItem(name: string) {
        const value = this.getValue(name);
        const itemProps = this.getFormItemPropsFixedByState(name);
        const rules = buildValidateRules(itemProps);
        const ruleObject = {[name]: rules};
        const schema = new SchemaValidate(ruleObject, this.schemaValidateOptions);
        const results = await schema.validatePromise({
            [name]: value
        });
        const errors = results?.errors || []
        this.setStateItem(name, 'errors', errors);
    }

    forceUpdate(name: string) {
        this.setStateItem(name, 'forceUpdateTick', uniqueId());
        this.formStore.commit();
    }

    setStateItem(name: string, stateKey: string, value: any) {
        const itemState = this.getState(name);
        this.formStore.setValue('stateMap.' + name, {
            ...itemState,
            [stateKey]: value
        });
    }

    setState(name: string, updates: Partial<FormItemStateSaved>) {
        const itemState = this.getState(name);
        this.formStore.setValue('stateMap.' + name, {
            ...itemState,
            ...updates
        });
    }

    getState(name: string) {
        return this.formStore.getValue('stateMap.' + name) || {};
    }

    getStates() {
        return this.formStore.getValue('stateMap') || {};
    }

    async validateFromItemByTrigger(name: string, triggerName: string) {
        const value = this.getValue(name);
        const itemProps = this.getFormItemPropsFixedByState(name);
        const rules = buildValidateRules(itemProps);

        const rules2 = rules.filter((rule) => {
            const trigger = rule.trigger || 'onChange';
            return trigger === triggerName;
        });

        if (rules2.length === 0) {
            return;
        }

        const ruleObject = {[name]: rules2};
        const schema = new SchemaValidate(ruleObject, this.schemaValidateOptions);
        const results = await schema.validatePromise({
            [name]: value
        });

        const errors = results?.errors || []
        this.setStateItem(name, 'errors', errors);
        this.formStore.commit();
        return errors;
    }


    getErrors() {
        const stateMap = this.formStore.getValue('stateMap');
        const keys = Object.keys(stateMap);
        return keys.map((key) => {
            const s = stateMap[key] as IItemState;
            if (s && s.display !== false && s.errors && s.errors.length > 0) {
                return s;
            }
            return null;
        }).filter((v) => {
            return !!v
        });
    }

    getFormItemPropsFixedByState(name: string): FormItemProps {
        const props = this.getFormItemProps(name);
        const props2 = {...props};
        const storeData = this.formStore.storeData || {};
        const itemState = get(storeData, 'stateMap.' + name);
        if (itemState) {
            const fixedProps = fixItemPropsByState(props2, itemState);
            Object.assign(props2, fixedProps);
        }
        return props2;
    }

    getFormItemProps(name: string): FormItemProps {
        const {propsMap} = this.getExtData1();
        return propsMap[name];
    }

    getValue(name: string): any {
        return this.formStore.getValue('values.' + name);
    }

    setValue(name: string, value: any): any {
        return this.formStore.setValue('values.' + name, value);
    }

    getValues(): any {
        return this.formStore.getValue('values');
    }

    setValues(values: any): any {
        return this.formStore.setValue('values', values);
    }

    getDefaultValues(): any {
        return this.formStore.getValue('defaultValues');
    }

    getResetNames(names: StringOrArray, exclude: string[]): string[] {
        const allnames = Object.keys(this.getValues());

        if (exclude && exclude.length > 0) {
            return allnames.filter((t) => {
                return exclude.indexOf(t) < 0;
            });
        }

        if (!names || names === '*') {
            return allnames;
        }
        if (!Array.isArray(names)) {
            return [names]
        }
        return names;
    }


    resetToDefault(names0: StringOrArray = "*", exclude: string[] = [], isValidate = true) {
        const names = this.getResetNames(names0, exclude);
        const defaultValues = this.getDefaultValues();
        const values = this.getValues();
        for (let i = 0; i < names.length; i++) {
            const name = names[i];
            values[name] = defaultValues[name];
        }
        this.setValues(values);

        let validateRes: any = null;
        if (isValidate) {
            validateRes =  this.validateForm();
        }
        this.formStore.commit();
        return Promise.resolve(validateRes)
    }

    reset(names0: StringOrArray = "*", exclude: string[] = [], isValidate = true) {
        const names = this.getResetNames(names0, exclude);
        const values = this.getValues();
        for (let i = 0; i < names.length; i++) {
            const name = names[i];
            values[name] = null;
        }
        this.setValues(values);

        let validateRes: any = null;
        if (isValidate) {
            validateRes =  this.validateForm();
        }
        this.formStore.commit();
        return Promise.resolve(validateRes)
    }


    async clearErrors() {
        const {propsMap} = this.getExtData1();
        const nameList = Object.keys(propsMap);
        for (let i = 0; i < nameList.length; i++) {
            const name = nameList[i];
            const props = propsMap[name];
            if (props.name) {
                this.setStateItem(props.name, 'errors', []);
            }
        }
    }


    /**
     * 只拣取表单中存在的字段，其他values字段不管了。
     */
    pickFormValues() {
        const {propsMap} = this.getExtData1();
        const propsArray = Object.values(propsMap);
        const values = this.getValues() || {};
        const resultValues: any = {};
        for (let i = 0; i < propsArray.length; i++) {
            const item = propsArray[i];
            if (item.name && item.label) {
                const name = item.name;
                const value = values[name];
                if (typeof value !== "undefined") {
                    resultValues[name] = value;
                }
            }
        }
        return resultValues;
    }

}

export {
    FormActions
}
