export interface IaddEventListenerWrapRes {
    remove: () => void;
}
export default function addEventListenerWrap(target: any, eventType: any, cb: any, option: any): IaddEventListenerWrapRes;
