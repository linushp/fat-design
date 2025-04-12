import {PreciseStore} from "../../hooks/usePreciseStore";
import {FormActions} from "../form-actions";
import {FnFormOnChangeParams, IFormStoreValues} from "../form-types";

const buildFnFormOnChangeParams = (formStore: PreciseStore, formActions: FormActions): FnFormOnChangeParams => {
    const storeData = formStore.storeData as IFormStoreValues;
    const {
        defaultValues,
        runtimeParams,
        valuesOfOnSearch,
        stateMap,
        values,
    } = storeData || {};

    return {
        defaultValues,
        runtimeParams,
        valuesOfOnSearch,
        stateMap,
        values: values || {},
        storeData,
        formStore,
        formActions,
        eventArgs: []
    }
}

export {
    buildFnFormOnChangeParams
}



