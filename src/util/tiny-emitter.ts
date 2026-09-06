type ListenerType = (...args: any[]) => any

interface IListenerObject {
    eventName: string,
    listener: ListenerType
}


class TinyEmitter {
    private listenerObjects: IListenerObject[];

    constructor() {
        this.listenerObjects = [];
    }

    on = (eventName: string, listener: ListenerType) => {
        this.listenerObjects.push({
            eventName: eventName,
            listener: listener
        })
    }
    off = (eventName: string, listener?: ListenerType) => {
        if (!eventName) {
            return;
        }
        if (!listener) {
            this.listenerObjects = this.listenerObjects.filter((obj) => {
                return obj.eventName !== eventName;
            });
        } else {
            this.listenerObjects = this.listenerObjects.filter((obj) => {
                return !(obj.eventName === eventName && obj.listener === listener);
            });
        }
    }

    clear = () => {
        this.listenerObjects = [];
    }

    emit = (eventName: string, ...args: any[]): any[] => {
        const listenerObjects = this.listenerObjects;
        const resultArray: any[] = [];
        for (let i = 0; i < listenerObjects.length; i++) {
            const listenerObject = listenerObjects[i];
            if (listenerObject.eventName === eventName) {
                const func = listenerObject.listener;
                let res: any;
                if (typeof func === "function") {
                    res = func(...args);
                }
                resultArray.push(res);
            }
        }
        return resultArray;
    }
}


export {
    TinyEmitter
}
