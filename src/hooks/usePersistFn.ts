import {useMemo, useRef} from 'react';

function usePersistFn(fn: any) {
    const fnRef = useRef(fn);
    fnRef.current = useMemo(function () {
        return fn;
    }, [fn]);

    const memoizedFn = useRef<any>();
    if (!memoizedFn.current) {
        memoizedFn.current = function () {
            const args: any[] = [];
            for (let i = 0; i < arguments.length; i++) {
                args[i] = arguments[i];
            }
            return fnRef.current.apply(this, args);
        };
    }
    return memoizedFn.current;
}

const useMemoizedFn = usePersistFn;

export {
    usePersistFn,
    useMemoizedFn
}

