import {useCallback, useRef} from 'react';

export default function useEvent<T extends Function>(callback: any): T {

    const fnRef = useRef<any>();
    fnRef.current = callback;

    return useCallback<T>(
        ((...args: any) => {
            if (!fnRef.current) {
                return;
            }
            return fnRef.current(...args);
        }) as any, []);
}
