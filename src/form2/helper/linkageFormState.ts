import {PreciseStore} from "../../hooks/usePreciseStore";
import {FormItemProps, FormStoreExtData1} from "../form-types";
import _get from 'lodash.get';
import {FormActions} from "../form-actions";
import {deepEqual} from "../../util/shallowEqual";

function getExtData1(formStore: PreciseStore): FormStoreExtData1 {
    return formStore.extData1 || {propsMap: {}};
}

function computeStateLinkage(itemState: any, itemProps: any, storeData: any, key: string, expectType: string) {

    if (!itemProps[key]) {
        return;
    }

    let result = itemProps[key];

    if (typeof result === "function") {

        result = result(storeData.values, storeData);
        if (typeof result === expectType) {
            itemState[key] = result;
        }

    }

}


function computeStateLinkageByDeps(itemState: any, itemProps: FormItemProps, storeData: any) {
    const deps = itemProps.deps;
    if (!deps || !Array.isArray(deps)) {
        itemState.forceUpdateTick = 0;
        return;
    }
    const values = storeData.values;
    let forceUpdateTickArray: string[] = [];
    for (let i = 0; i < deps.length; i++) {
        const dep = deps[i];
        forceUpdateTickArray.push(`${i}_${values[dep]||""}`);
    }
    itemState.forceUpdateTick = forceUpdateTickArray.join('-');
}


/**
 * 对单个formItem的状态进行联动计算
 * @param formStore
 * @param itemProps
 */
function linkageFormItemState(formStore: PreciseStore, itemProps: FormItemProps) {

    const storeData = formStore.storeData;
    const name = itemProps.name;

    const oldState = _get(storeData, 'stateMap.' + name) || {};
    const itemState = {...oldState};

    computeStateLinkage(itemState, itemProps, storeData, 'label', 'string');
    computeStateLinkage(itemState, itemProps, storeData, 'required', 'boolean');
    computeStateLinkage(itemState, itemProps, storeData, 'display', 'boolean');
    computeStateLinkage(itemState, itemProps, storeData, 'disabled', 'boolean');
    computeStateLinkage(itemState, itemProps, storeData, 'isPreview', 'boolean');
    computeStateLinkage(itemState, itemProps, storeData, 'xProps', 'object');
    computeStateLinkageByDeps(itemState, itemProps, storeData);

    if (!deepEqual(oldState, itemState)) {
        formStore.setValue('stateMap.' + name, itemState)
    }
}


/**
 * 对所有formItem的状态进行联动计算
 * @param formStore
 * @param formActions
 */
function linkageFormState(formStore: PreciseStore, formActions: FormActions) {
    const {propsMap} = getExtData1(formStore);
    const nameList = Object.keys(propsMap);
    for (let i = 0; i < nameList.length; i++) {
        const name = nameList[i];
        const itemProps = propsMap[name] as FormItemProps
        if (itemProps) {
            linkageFormItemState(formStore, itemProps);
        }
    }
}


export {
    linkageFormState,
    linkageFormItemState
}
