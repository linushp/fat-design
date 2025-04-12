interface IReactRoot {
    render: (element: any) => void;
    unmount: () => void;
    unmountWithContainer: () => void;
}
interface IReactDOM {
    createRoot: (container: any, options?: any) => IReactRoot;
    createPortal: any;
    findDOMNode: any;
}
declare class ReactDOMProxy {
    private _reactDOM;
    private isReact18;
    private isReact19;
    configReactDOM(ReactDOM: any): void;
    configReactDOM18(ReactDOM: any, ReactDOMClient: any): void;
    configReactDOM19(ReactDOM: any, ReactDOMClient: any): void;
    get reactDOM(): IReactDOM;
    createRoot(container: any, options?: any): IReactRoot;
    createPortal(element: any, container: any): any;
    findDOMNode(e: any): any;
}
declare function getTargetElement(target: any, defaultElement?: any): any;
declare const pReactDOM: ReactDOMProxy;
declare function findDOMNode(e: any): any;
declare function createPortal(element: any, container: any): any;
export { createPortal, findDOMNode, getTargetElement, pReactDOM };
