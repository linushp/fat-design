import {useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import _get from "lodash.get";
import _set from "lodash.set";
import {CompareFn, isStateEquals} from "../util/isStateEquals";
import {logger} from "../util/log";

export type AnyType = any;

export const KEY_SAVED_TICK_COUNT = 'KEY_SAVED_TICK_COUNT';

export type WatcherFn = (nextValue: any, preValue: any, storage: PreciseStore) => void;

const WATCHER_PATH_SUFFIX = 'WATCHERDD960D42BB47DA21'

const DEFAULT_COMPARE_FN = 'equal';

export interface Watcher {
    watchPath: string,
    watcher: WatcherFn,
    preValue: any
}

type UpdateFn<A> = (nextValue: A) => void;
type GetFn<A> = () => A;


function travelWatchersMap(s: any, result: Watcher[]) {
    if (!s) {
        return;
    }
    if (Array.isArray(s)) {
        result.push(...s);
        return;
    }
    if (typeof s === "object") {
        const values = Object.values(s);
        for (let i = 0; i < values.length; i++) {
            const value = values[i];
            travelWatchersMap(value, result);
        }
    }
}


class WatcherManager {
    private watchersMap: any = {};

    addWatcher(path: string, watcherFn: WatcherFn) {
        this.getWatcherList(path).push({watcher: watcherFn, watchPath: path, preValue: undefined})
    }

    removeWatcher(path: string, watcherFn: WatcherFn) {
        const list = this.getWatcherList(path).filter((w) => {
            return w.watcher !== watcherFn;
        });
        this.setWatcherList(path, list);
    }

    getWatcherList(path: string): Watcher[] {
        const watcherListPath = `${path}.${WATCHER_PATH_SUFFIX}`
        let watcherList = _get(this.watchersMap, watcherListPath);
        if (!watcherList) {
            watcherList = [];
            _set(this.watchersMap, watcherListPath, watcherList);
        }
        return watcherList;
    }

    setWatcherList(path: string, watcherList: Watcher[]) {
        const watcherListPath = `${path}.${WATCHER_PATH_SUFFIX}`
        _set(this.watchersMap, watcherListPath, watcherList);
    }


    getWatcherDeepList(path: string): Watcher[] {
        // msg = {user: {name: sss}}
        // path: 'user.name' ==> wathersMap = {user: {name: {"WATCHERD3FB9EA5F933D":[]}}}
        // path: 'user' ==> wathersMap = {user: {WATCHERD3FB9EA5F933D: [], name: {"WATCHERD3FB9EA5F933D":[], firstName:{WATCHERD3FB9EA5F933D:[]}}}}
        const s = _get(this.watchersMap, path);
        if (!s) {
            return [];
        }
        const result: Watcher[] = [];
        travelWatchersMap(s, result);
        return result;
    }

}


class PreciseStore {
    public readonly storeData: Record<string, any> = {};
    private watcherManager: WatcherManager = new WatcherManager(); // {path, watcher, preValue}
    private updatedBuffer: string[] = []; // 发生过数据更新的路径。
    private tickCount = 0;
    public compareFn: CompareFn;
    public linkageFn: any;

    public extData1: any; // 随意扩展
    public extData2: any; // 随意扩展

    constructor(initialValues: Record<any, any>, compareFn?: CompareFn, linkageFn?: any) {
        this.storeData = initialValues || {};
        this.compareFn = compareFn || DEFAULT_COMPARE_FN;
        this.linkageFn = linkageFn;
        this.updatedBuffer = [];
    }


    getValue(path: string) {
        return _get(this.storeData, path);
    }


    setValue(path: string, value: any) {
        _set(this.storeData, path, value);
        this.updatedBuffer.push(path);
    }

    commit() {
        this.tickCount = this.tickCount + 1;
        _set(this.storeData, KEY_SAVED_TICK_COUNT, this.tickCount);
        if (typeof this.linkageFn === "function") {
            this.linkageFn(this.storeData, this);
        }
        this.notifyWatcher();
    }

    setValueAndCommit(path: string, value: any) {
        this.setValue(path, value);
        this.commit();
    }

    watch(path: string, watcher: WatcherFn) {
        if (typeof watcher !== "function") {
            throw 'watcher must function';
        }
        this.watcherManager.addWatcher(path, watcher)
        // this.watcherList.push({path, watcher, preValue: undefined});
    }

    unwatch(path: string, watcher: WatcherFn) {
        this.watcherManager.removeWatcher(path, watcher)
    }


    notifyWatcher() {
        const updatedPathList = this.updatedBuffer;
        for (let i = 0; i < updatedPathList.length; i++) {
            const updatedPath = updatedPathList[i];
            const watcherList = this.watcherManager.getWatcherDeepList(updatedPath);
            for (let j = 0; j < watcherList.length; j++) {
                try {
                    const {watcher, preValue, watchPath} = watcherList[j];
                    const nextValue = this.getValue(watchPath);
                    if (typeof preValue === "undefined" || !isStateEquals(this.compareFn, preValue, nextValue)) {
                        watcher(nextValue, preValue, this);
                        watcherList[j].preValue = nextValue;
                    }
                } catch (e) {
                    logger.error("notifyWatcher", e, watcherList[j])
                }
            }
        }
        this.updatedBuffer = [];
    }
}


/**
 * 创建一个PreciseStore
 * @param initialValues
 * @param compareFn
 * @param linkageFn
 */
function useCreatePreciseStore(initialValues: any, compareFn: CompareFn = DEFAULT_COMPARE_FN, linkageFn?: any): PreciseStore {
    return useMemo(() => {

        let initialValuesObj;
        if (typeof initialValues === "function") {
            initialValuesObj = initialValues();
        } else {
            initialValuesObj = initialValues || {};
        }

        return new PreciseStore(initialValuesObj, compareFn, linkageFn);
    }, []);
}


/**
 * 从Context中获取PreciseStore
 * @param context
 */
function useGetPreciseStore(context: any): PreciseStore {

    const contextValues = useContext(context) as any; // as PreciseStore;

    if (contextValues instanceof PreciseStore) {
        return contextValues;
    }

    if (typeof contextValues === "object") {
        const keys = Object.keys(contextValues as any);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const v = contextValues[key];
            if (v instanceof PreciseStore) {
                return v as PreciseStore;
            }
        }
    }

    throw "useGetPreciseStore is null";
}


/**
 * 订阅并获取value的变化
 * @param store
 * @param path
 */
function usePreciseValue(store: PreciseStore, path: string): [any, UpdateFn<AnyType>, GetFn<AnyType>, PreciseStore] {

    const valueRef = useRef<any>();

    const [value, setValue] = useState(() => {
        const nowValue = store.getValue(path);
        valueRef.current = nowValue;
        return nowValue;
    });


    useEffect(() => {

        const init = () => {
            const nextValue = store.getValue(path);
            if (valueRef.current !== nextValue) {
                valueRef.current = nextValue;
                setValue(nextValue);
            }
        }

        init();

        const watcher = (nextValue: any) => {
            if (valueRef.current !== nextValue) {
                valueRef.current = nextValue;
                setValue(nextValue);
            }
        };

        store.watch(path, watcher);

        return () => {
            logger.debug("unwatch", path)
            store.unwatch(path, watcher);
        }

    }, [store, path]);


    /**
     * 更新值
     */
    const updateValue = useCallback((nextValue: any) => {
        store.setValueAndCommit(path, nextValue);
    }, [store, path]);


    /**
     * 在Render之前获取最新值
     */
    const getCurrent = useCallback(() => {
        return valueRef.current;
    }, [[store, path]]);


    return [value, updateValue, getCurrent as any, store];
}


/**
 * 监听任何一次变更
 * @param store
 */
function usePreciseTick(store: PreciseStore): [AnyType, UpdateFn<AnyType>, GetFn<AnyType>, PreciseStore] {
    return usePreciseValue(store, KEY_SAVED_TICK_COUNT);
}


export {
    PreciseStore,
    useCreatePreciseStore,
    useGetPreciseStore,
    usePreciseValue,
    usePreciseTick,
}
