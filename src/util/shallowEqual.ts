const isBasicType = (t: any) => {
    return t === 'number' || t === 'string' || t === 'boolean' || t === 'undefined';
};

/**
 * 数组和对象都能比较
 * @param a
 * @param b
 * @param nextCompareMethod
 * @param ignoreFn
 * @returns {boolean}
 */
function compareByObject(a: any, b: any, nextCompareMethod: any, ignoreFn: boolean = false) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
        return false;
    }

    const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(b);
    for (let idx = 0; idx < keysA.length; idx++) {
        const key = keysA[idx];
        const nextA = a[key];
        const nextB = b[key];


        if (ignoreFn && typeof nextA === "function" && typeof nextB === "function") {
            continue;
        }

        // if (!bHasOwnProperty(key) || aKey !== bKey) {
        if (!bHasOwnProperty(key) || (!nextCompareMethod(nextA, nextB))) {
            return false;
        }

    }

    return true;
}


const commonEqual = (a: any, b: any, nextCompareMethod: any, ignoreFn: boolean = false,) => {

    if (a === b) {
        return true;
    }

    const aType = typeof a;
    const bType = typeof b;

    if (aType !== bType) {
        return false;
    }

    if (isBasicType(aType) && isBasicType(bType)) {
        return a === b;
    }

    if (typeof a !== 'object' || !a || typeof b !== 'object' || !b) {
        return false;
    }


    return compareByObject(a, b, nextCompareMethod, ignoreFn);
}


const shallowEqual = (a: any, b: any, ignoreFn: boolean = false): boolean => {
    const nextCompareMethod = (nextA: any, nextB: any) => {
        return nextA === nextB;
    }
    return commonEqual(a, b, nextCompareMethod, ignoreFn)
}


function deepEqual(a: any, b: any, ignoreFn: boolean = false, deep: number = 0): boolean {
    const nextCompareMethod = (nextA: any, nextB: any) => {
        if (deep > 10) {
            return nextA === nextB;
        }
        return deepEqual(nextA, nextB, ignoreFn, deep + 1);
    }
    return commonEqual(a, b, nextCompareMethod, ignoreFn)
}


export {
    shallowEqual,
    deepEqual
};
