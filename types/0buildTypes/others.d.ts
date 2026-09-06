import { Logger } from "./util/log";
import { ComponentsStore } from "./util/comp";
import { constants } from "./util";
import dependencies from "./dependencies";
import { storageInstance } from "./util/localforage";
declare function configReactDOM18(ReactDOM: any, ReactDOMClient: any): void;
/**
 * @deprecated 当前版本不支持 React 19，调用会抛错。
 */
declare function configReactDOM19(_ReactDOM?: any, _ReactDOMClient?: any): void;
declare function configReactDOM(ReactDOM: any): void;
declare function tryAutoConfig(): void;
declare const version: string;
declare const logger: Logger;
export { version, logger, constants, dependencies, storageInstance, configReactDOM18, configReactDOM19, configReactDOM, ComponentsStore, tryAutoConfig };
