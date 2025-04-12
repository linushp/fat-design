export interface IaddEventListenerWrapRes {
    remove: () => void;
}

export default function addEventListenerWrap(target: any, eventType: any, cb: any, option: any): IaddEventListenerWrapRes {
    const callback = cb;
    if (target?.addEventListener) {
        target.addEventListener(eventType, callback, option);
    }
    return {
        remove: () => {
            if (target?.removeEventListener) {
                target.removeEventListener(eventType, callback, option);
            }
        },
    };
}
