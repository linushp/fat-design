import {useCallback, useRef, useState} from 'react';


/**
 * state 可以是任何值
 * @param initialState
 */
function useCurrentState(initialState: any) {
    const [state, setState] = useState(initialState);
    const ref = useRef(initialState);
    ref.current = state;

    const updateState = useCallback((nextState: any) => {
        ref.current = nextState;
        setState(nextState);
    }, []);


    const getCurrent = useCallback(() => {
        return ref.current;
    }, []);

    return [state, updateState, getCurrent]
}


/**
 * state 必须是个对象
 * @param initialState
 */
function useCurrentState2(initialState: any = {}) {
    const [state, setState] = useState(initialState);
    const ref = useRef(initialState);
    ref.current = state;

    const updateState = useCallback((nextState0: any) => {
        if (!nextState0 || typeof nextState0 !== "object"){
            //  参数必须是一个对象类型
            return;
        }
        const nextState = {...ref.current, ...nextState0};
        ref.current = nextState;
        setState(nextState);
    }, []);

    const getCurrent = useCallback(() => {
        return ref.current;
    }, []);

    return [state, updateState, getCurrent]
}

export {
    useCurrentState,
    useCurrentState2,
}
　　

