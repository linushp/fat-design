import {FormItemProps, FormItemState, FormItemStateSaved, IFormContext} from "../form-types";
import {useMemo} from "react";
import {usePreciseValue} from "../../hooks/usePreciseStore";
import {linkageFormItemState} from "./linkageFormState";
import {fixItemPropsByState} from "./fixItemProps";
import {deepEqual} from "../../util/shallowEqual";


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



    const [value] = usePreciseValue(formContext.formStore, `values.${name}`);
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
