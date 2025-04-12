import {useEffect} from 'react';
import {usePersistFn} from "./usePersistFn";
import {env} from "../util";

/**
 * 响应键盘 Ctrl + XXXX 事件
 * @param fn
 * @param keyCode
 */
function useOnKeyPressCtrl(fn: any, keyCode: number) {

    const fn2 = usePersistFn(fn);

    useEffect(() => {
        const onKeyDown = (e: any) => {
            if (e.keyCode === keyCode && (env.isMacOS ? e.metaKey : e.ctrlKey)) {
                e.preventDefault();
                fn2();
            }
        }
        window.addEventListener('keydown', onKeyDown, false);
        return () => {
            window.removeEventListener('keydown', onKeyDown, false);
        }

    }, [keyCode, fn2])
}


/**
 * 响应键盘 Ctrl + S 事件
 * @param fn
 */
function useOnKeyPressSave(fn: any) {
    return useOnKeyPressCtrl(fn, 83);
}

export {
    useOnKeyPressCtrl,
    useOnKeyPressSave
}
