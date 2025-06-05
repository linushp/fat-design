import {useEffect} from "react";
import {useCurrentState} from "../../hooks/useCurrentState";
import {FnGetEnums, IFormContext} from "../form-types";
import {buildFnFormOnChangeParams} from "./buildParams";
import {isNil} from "../../util/object";
import {usePersistFn} from "../../hooks/usePersistFn";
import {pickResArray} from "../../util/pick-res-data";


function isNotEmptyArray(arr: any): boolean {
    return arr && Array.isArray(arr) && arr.length > 0;
}


/**
 * dataSource 字段数据来源：
 *  1. enums 是一个异步函数，可以异步返回
 *  2. enums 是一个同步函数，可以直接返回
 *  3. enums 是一个数组
 * @param enums
 * @param childProps
 * @param xProps
 * @param formContext
 * @param forceUpdateTick
 */
function useDataSource(enums: any, childProps: any, xProps: any, formContext: IFormContext, forceUpdateTick: number = 0) {
    const [_, setDataSource, getDataSource] = useCurrentState([]);


    const getAsyncEnum = usePersistFn( (enums: any) => {

        //1.  xProps.dataSource字段存在; 利用此方法可实现下拉选项的联动。
        if (xProps && isNotEmptyArray(xProps.dataSource)) {
            setDataSource(xProps.dataSource);
            return;
        }

        //2. enums 是一个数组
        if (enums && isNotEmptyArray(enums)) {
            setDataSource(enums);
            return;
        }

        // 3. enum是个函数
        if (typeof enums !== "function") {
            return;
        }

        const enumsFn = enums as FnGetEnums;

        const params2 = buildFnFormOnChangeParams(formContext.formStore, formContext.formActions);

        const enumsRes = enumsFn(childProps, params2);

        if (isNil(enumsRes)) {
            return;
        }

        // 3.1 enum是个同步函数
        if (Array.isArray(enumsRes)) {
            setDataSource(enumsRes);
            return;
        }

        // 3.2 enums 是一个异步函数
        if (typeof enumsRes.then == "function") {
            enumsRes.then((asyncEnumsResult: any) => {
                const enumArray = pickResArray(asyncEnumsResult);
                if (Array.isArray(enumArray)) {

                    setDataSource(enumArray);
                    if (typeof formContext.formProps.onAsyncEnums === "function") {
                        childProps.dataSource = enumArray;
                        formContext.formProps.onAsyncEnums(childProps, params2);
                    }
                }
            });
        }
    });


    /**
     * 当filterLocal === false && showSearch === true，
     * 自动添加onSearch函数，通过forceUpdateTick变更自动调用getAsyncEnum
     */
    useEffect(() => {
        getAsyncEnum(enums);
    }, [forceUpdateTick]);



    // 为什么使用useCurrentState？因为enums可以是一个同步函数，同步函数的数据可以立即返回。避免二次渲染。
    const dataSource = getDataSource();
    if (dataSource && Array.isArray(dataSource) && dataSource.length > 0) {
        return dataSource;
    }

    return null;
}

export {
    useDataSource
}
