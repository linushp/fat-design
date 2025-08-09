type ListenerType = (...args: any[]) => any;
declare class TinyEmitter {
    private listenerObjects;
    constructor();
    on: (eventName: string, listener: ListenerType) => void;
    off: (eventName: string, listener: ListenerType) => void;
    clear: () => void;
    emit: (eventName: string, ...args: any[]) => any[];
}
export { TinyEmitter };
