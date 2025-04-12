import React from "react";
import { PreciseStore } from "../../hooks/usePreciseStore.js";
declare const configContext: React.Context<import("./types.js").IConfigValues>;
declare const CONFIG_VALUES_PATH = "configValues";
declare const configStore: PreciseStore;
export { configStore, configContext, CONFIG_VALUES_PATH };
