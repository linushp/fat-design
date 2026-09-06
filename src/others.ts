import {Logger} from "./util/log";
import {ComponentsStore} from "./util/comp";
import {pReactDOM} from "./util/react-dom";
import {constants} from "./util";
import dependencies from "./dependencies";
import {storageInstance} from "./util/localforage";

const UNSUPPORTED_REACT19 =
    'fat-design 当前正式支持 React 16.8 / 17 / 18，不支持 React 19。请使用 configReactDOM（16/17）或 configReactDOM18（18）。';

function configReactDOM18(ReactDOM: any, ReactDOMClient: any) {
    pReactDOM.configReactDOM18(ReactDOM, ReactDOMClient)
}

/**
 * @deprecated 当前版本不支持 React 19，调用会抛错。
 */
function configReactDOM19(_ReactDOM?: any, _ReactDOMClient?: any) {
    throw new Error(UNSUPPORTED_REACT19);
}

function configReactDOM(ReactDOM: any) {
    pReactDOM.configReactDOM(ReactDOM)
}

function tryAutoConfig() {
    if (typeof window === 'undefined') {
        return;
    }
    const ReactDOM = window.ReactDOM;
    if (!ReactDOM) {
        return;
    }
    const version = "" + ReactDOM.version;
    if (version.startsWith("16.") || version.startsWith("17.")) {
        configReactDOM(ReactDOM);
        return;
    }
    // 仅当 window.ReactDOM 已是合并版（含 createRoot）时自动成功；ESM 宿主请显式 configReactDOM18
    if (version.startsWith("18.") && typeof (ReactDOM as any).createRoot === 'function') {
        configReactDOM18(ReactDOM, ReactDOM);
        return;
    }
    if (version.startsWith("19.")) {
        if (typeof console !== 'undefined' && console.warn) {
            console.warn('[fat-design] ' + UNSUPPORTED_REACT19);
        }
    }
}


tryAutoConfig();

const version: string = __FAT_DESIGN_VERSION__;
const logger = new Logger("others", "others");
export {
    version,
    logger,
    constants,
    dependencies,
    storageInstance,
    configReactDOM18,
    configReactDOM19,
    configReactDOM,
    ComponentsStore,
    tryAutoConfig
}
