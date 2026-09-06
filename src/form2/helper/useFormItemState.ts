import {FormItemProps, FormItemState, FormItemStateSaved, IFormContext} from "../form-types";
import {useEffect, useMemo, useState} from "react";
import {PreciseStore, usePreciseValue} from "../../hooks/usePreciseStore";
import {linkageFormItemState} from "./linkageFormState";
import {fixItemPropsByState} from "./fixItemProps";
import {deepEqual} from "../../util/shallowEqual";
import {getCompositeValue, parseCompositeName} from "./parseCompositeName";


function parseFormItemErrors(props: any, itemState: FormItemStateSaved) {
    const errors = itemState.errors;

    let state;
    let stateMessage = '';
    if (errors && errors.length > 0) {
        state = 'error'
        stateMessage = errors[0].message;
        if (typeof props.help === "function") {
            stateMessage = props.help(props, errors);
        }
    }

    return {
        state,
        stateMessage
    }
}


function useFormItemValue(formStore: PreciseStore, name?: string) {
    const parsed = useMemo(() => parseCompositeName(name), [name]);
    const fieldsKey = parsed.fields.join(',');

    const [value, setValue] = useState(() => getCompositeValue(formStore, parsed));

    useEffect(() => {
        if (parsed.fields.length === 0) {
            return;
        }

        const refresh = () => {
            setValue(getCompositeValue(formStore, parsed));
        };

        refresh();

        const unsubs = parsed.fields.map((field) => {
            const path = `values.${field}`;
            formStore.watch(path, refresh);
            return () => formStore.unwatch(path, refresh);
        });

        return () => {
            unsubs.forEach((unsub) => unsub());
        };
    }, [formStore, fieldsKey]);

    return value;
}


function useFormItemState(props: FormItemProps, formContext: IFormContext): FormItemState {
    const {name} = props;

    useMemo(() => {

        const formStore = formContext.formStore;

        // 根据静态值：设置stateMap， 静态值只执行一次。
        const itemState: FormItemStateSaved = formStore.getValue('stateMap.' + name) || {};
        const newItemState = fixItemPropsByState(props, itemState);
        if (!deepEqual(newItemState, itemState)) {
            formStore.setValue('stateMap.' + name, newItemState)
        }

        //根据函数：设置stateMap
        linkageFormItemState(formStore, props);

    }, [name]);


    const value = useFormItemValue(formContext.formStore, name);
    const [itemState] = usePreciseValue(formContext.formStore, `stateMap.${name}`);
    const {state, stateMessage} = parseFormItemErrors(props, itemState)
    const fixedProps = fixItemPropsByState(props, itemState);
    return {
        value,
        state,
        stateMessage,
        ...fixedProps
    }

}


export {
    useFormItemState
}
