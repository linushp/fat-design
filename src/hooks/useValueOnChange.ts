import {isNil} from "../util/object";
import {useState} from 'react';
import {usePersistFn} from "./usePersistFn";

function useValueOnChange(props: any) {
    const {defaultValue, value, onChange} = props;
    const isControl = !isNil(value);

    const [unControlValue, setUnControlValue] = useState(defaultValue);

    const nextChange = usePersistFn((newValue: any, b: any, c: any) => {
        if (typeof onChange === "function") {
            onChange(newValue, b, c);
        }

        // 非受控模式
        if (!isControl) {
            setUnControlValue(newValue);
        }

    });

    const nextValue = isControl ? value : unControlValue;

    return [
        nextValue,
        nextChange
    ]
}


export {
    useValueOnChange
}
