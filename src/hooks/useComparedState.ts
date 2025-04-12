import {useCallback, useRef, useState} from 'react';
import {isStateEquals} from "../util/isStateEquals";


function useComparedState(initialState: any, compare: any = 'shallowEqual') {
    const [state, setState] = useState(initialState);
    const stateRef = useRef(initialState);

    // 更新state：只有当nextState与当前state产生变化时才会触发渲染，优化性能
    const updateState = useCallback((nextState: any) => {
        if (isStateEquals(compare, stateRef.current, nextState)) {
            return;
        }
        setState(nextState);
    }, []);

    return [state, updateState];
}


export {
    useComparedState
}
