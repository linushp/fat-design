import {useState, useEffect} from 'react';
import {getTargetElement} from "../util/react-dom";

export interface UseSizeRes {
    width: number;
    height: number;
}


function useSize(target: any): UseSizeRes {

    const [state, setState] = useState({
        width: 0,
        height: 0
    });

    useEffect(() => {

        const el = getTargetElement(target);
        if (!el) {
            return;
        }

        const resizeObserver = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                const {clientWidth, clientHeight} = entry.target;
                setState({width: clientWidth, height: clientHeight});
            });
        });

        resizeObserver.observe(el);
        return () => {
            resizeObserver.disconnect();
        };

    }, [])

    return state;
}

export {
    useSize
}
