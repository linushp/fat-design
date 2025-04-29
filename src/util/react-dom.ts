interface IReactRoot {
    render: (element: any) => void;
    unmount: () => void;
    unmountWithContainer: () => void;
}

function isHTMLElement(obj) {
    // 处理 null/undefined 和非对象类型
    if (!obj || typeof obj !== 'object') return false
    return (obj instanceof HTMLElement)
}

function isElementNode(obj) {
    return isHTMLElement(obj) && obj.nodeType === Node.ELEMENT_NODE
}


class ReactRoot17 implements IReactRoot {
    private reactDOM: any;
    private container: any;
    private options: any;

    constructor(reactDOM: any, container: any, options: any) {
        this.reactDOM = reactDOM;
        this.container = container;
        this.options = options;
    }

    render(element: any): void {
        this.reactDOM.render(element, this.container);
    }

    unmount(): void {
        this.reactDOM.unmountComponentAtNode(this.container);
    }

    unmountWithContainer(): void {
        this.unmount();
        const container = this.container;
        if (container) {
            container.parentNode.removeChild(container);
            this.container = null;
        }
    }
}


class ReactRoot18 implements IReactRoot {
    private root1: IReactRoot;
    private container: any;
    private options: any;

    constructor(root1: IReactRoot, container: any, options: any) {
        this.root1 = root1;
        this.container = container;
        this.options = options;
    }


    render(element: any): void {
        this.root1.render(element);
    }

    unmount(): void {
        this.root1.unmount();
    }

    unmountWithContainer(): void {
        this.unmount();
        const container = this.container;
        if (container) {
            container.parentNode.removeChild(container);
            this.container = null;
        }
    }
}


interface IReactDOM {
    createRoot: (container: any, options?: any) => IReactRoot;
    createPortal: any;
    findDOMNode: any;
}


function createReactDOMProxy19(ReactDOM: any, ReactDOMClient: any): IReactDOM {
    return {
        createRoot: (container: any, options?: any): IReactRoot => {
            const root1 = ReactDOMClient.createRoot(container, options);
            return new ReactRoot18(root1, container, options);
        },
        createPortal: (element: any, container: any) => {
            return ReactDOM.createPortal(element, container);
        },
        findDOMNode: (e: any) => {
            // TODO
            return ReactDOM.findDOMNode(e);
        }
    };
}


function findDOMNodeByFat(e: any, deep: number): any {
    if (deep > 20 ) {
        return null; // 避免死递归
    }
    if (e) {
        if (isElementNode(e)) {
            return e;
        }
        if (e.fatNodeInstance) {
            return findDOMNodeByFat(e.fatNodeInstance, deep + 1)
        }
    }
    return null;
}


function createReactDOMProxy18(ReactDOM: any, ReactDOMClient: any): IReactDOM {
    return {
        createRoot: (container: any, options?: any): IReactRoot => {
            const root1 = ReactDOMClient.createRoot(container, options);
            return new ReactRoot18(root1, container, options);
        },
        createPortal: (element: any, container: any) => {
            return ReactDOM.createPortal(element, container);
        },
        findDOMNode: (e: any) => {
            if (!e) {
                return null;
            }
            const s = findDOMNodeByFat(e, 0);
            if (s) {
                return s;
            }
            // console.log('findDOMNode 2 ', e, e.fatNodeInstance)
            return ReactDOM.findDOMNode(e);
        }
    };
}



function createReactDOMProxy17(ReactDOM: any): IReactDOM {
    return {
        createRoot: (container: any, options?: any): IReactRoot => {
            return new ReactRoot17(ReactDOM, container, options);
        },
        createPortal: (element: any, container: any) => {
            return ReactDOM.createPortal(element, container);
        },
        findDOMNode: (e: any) => {
            return ReactDOM.findDOMNode(e);
        }
    };
}


class ReactDOMProxy {
    private _reactDOM: IReactDOM | undefined;
    private isReact18: boolean = false;
    private isReact19: boolean = false;

    configReactDOM(ReactDOM: any) {
        this.isReact18 = false;
        this.isReact19 = false;
        this._reactDOM = createReactDOMProxy17(ReactDOM);
    }

    configReactDOM18(ReactDOM: any, ReactDOMClient: any) {
        this.isReact18 = true;
        this._reactDOM = createReactDOMProxy18(ReactDOM, ReactDOMClient);
    }

    configReactDOM19(ReactDOM: any, ReactDOMClient: any) {
        this.isReact19 = true;
        this._reactDOM = createReactDOMProxy19(ReactDOM, ReactDOMClient);
    }


    get reactDOM(): IReactDOM {
        if (!this._reactDOM) {
            throw "必须通过configReactDOM18或configReactDOM配置依赖的ReactDOM";
        }
        return this._reactDOM;
    }

    createRoot(container: any, options?: any): IReactRoot {
        return this.reactDOM.createRoot(container, options);
    }

    createPortal(element: any, container: any) {
        return this.reactDOM.createPortal(element, container);
    }

    findDOMNode(e: any): any {
        return this.reactDOM.findDOMNode(e);
    }
}


function getTargetElement(target: any, defaultElement?: any) {
    if (!target) {
        return defaultElement;
    }
    let targetElement: any;

    if (typeof target === "function") {
        targetElement = target();
    } else if ('current' in target) {
        targetElement = target.current;
    } else {
        targetElement = target;
    }

    return targetElement;
}


const pReactDOM = new ReactDOMProxy();


function findDOMNode(e:any) {
    return pReactDOM.findDOMNode(e);
}
function createPortal(element: any, container: any){
    return pReactDOM.createPortal(element, container);
}

export {
    createPortal,
    findDOMNode,
    getTargetElement,
    pReactDOM
}
