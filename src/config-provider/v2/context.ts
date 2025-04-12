import React from "react";
import {PreciseStore} from "../../hooks/usePreciseStore.js";
import {defaultConfigValues, defaultPrefix} from "../constants";


const configContext = React.createContext(defaultConfigValues);

const CONFIG_VALUES_PATH = 'configValues';

const configStore = new PreciseStore({
    [CONFIG_VALUES_PATH]: defaultConfigValues,
}, 'equal', null);


export {
    configStore,
    configContext,
    CONFIG_VALUES_PATH
}
