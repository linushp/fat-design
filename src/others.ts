import {Logger} from "./util/log";
import {ComponentsStore} from "./util/comp";
import {pReactDOM} from "./util/react-dom";
import {constants} from "./util";
import dependencies from "./dependencies";
import {storageInstance} from "./util/localforage";

function configReactDOM18(ReactDOM: any, ReactDOMClient: any) {
    pReactDOM.configReactDOM18(ReactDOM, ReactDOMClient)
}

function configReactDOM19(ReactDOM: any, ReactDOMClient: any) {
    pReactDOM.configReactDOM19(ReactDOM, ReactDOMClient)
}

function configReactDOM(ReactDOM: any) {
    pReactDOM.configReactDOM(ReactDOM,)
}

function tryAutoConfig() {
    if (typeof window === 'undefined') {
        return;
    }
    const ReactDOM = window.ReactDOM;
    if (ReactDOM) {
        const version = "" + ReactDOM.version;
        if (version.startsWith("16.") || version.startsWith("17.")) {
            configReactDOM(ReactDOM);
            return;
        }
        // 必须是使用UMD形式的React 18
        if (version.startsWith("18.")) {
            configReactDOM18(ReactDOM, ReactDOM);
            return;
        }
        // 必须是使用UMD形式的React 18 \ 19
        if (version.startsWith("19.")) {
            configReactDOM19(ReactDOM, ReactDOM);
            return;
        }
    }
}


tryAutoConfig();

const logger = new Logger("others", "others");
export {
    logger,
    constants,
    dependencies,
    storageInstance,
    configReactDOM18,
    configReactDOM19,
    configReactDOM,
    ComponentsStore,
}
