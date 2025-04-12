import {shallowEqual} from "./shallowEqual";

export type CompareFn1 = (current: any, nextState: any) => boolean;

export type CompareFn =  string | boolean |  CompareFn1 ;

function isStateEquals(compareFn: CompareFn, current: any, nextState: any) {

    if (typeof nextState === "function") {
        return false;
    }

    if (!compareFn) {
        return false;
    }

    if (compareFn === true || compareFn === 'equal') {
        return current === nextState;
    }

    if (compareFn === 'shallowEqual') {
        return shallowEqual(current, nextState);
    }

    if (typeof compareFn === "function") {
        return compareFn(current, nextState);
    }

    return false;
}


export {
    isStateEquals
}
