import { CompareFn } from "../util/isStateEquals";
export type AnyType = any;
export declare const KEY_SAVED_TICK_COUNT = "KEY_SAVED_TICK_COUNT";
export type WatcherFn = (nextValue: any, preValue: any, storage: PreciseStore) => void;
export interface Watcher {
    watchPath: string;
    watcher: WatcherFn;
    preValue: any;
}
type UpdateFn<A> = (nextValue: A) => void;
type GetFn<A> = () => A;
declare class PreciseStore {
    readonly storeData: Record<string, any>;
    private watcherManager;
    private updatedBuffer;
    private tickCount;
    compareFn: CompareFn;
    linkageFn: any;
    extData1: any;
    extData2: any;
    constructor(initialValues: Record<any, any>, compareFn?: CompareFn, linkageFn?: any);
    getValue(path: string): any;
    setValue(path: string, value: any): void;
    commit(): void;
    setValueAndCommit(path: string, value: any): void;
    watch(path: string, watcher: WatcherFn): void;
    unwatch(path: string, watcher: WatcherFn): void;
    notifyWatcher(): void;
}
/**
 * 创建一个PreciseStore
 * @param initialValues
 * @param compareFn
 * @param linkageFn
 */
declare function useCreatePreciseStore(initialValues: any, compareFn?: CompareFn, linkageFn?: any): PreciseStore;
/**
 * 从Context中获取PreciseStore
 * @param context
 */
declare function useGetPreciseStore(context: any): PreciseStore;
/**
 * 订阅并获取value的变化
 * @param store
 * @param path
 */
declare function usePreciseValue(store: PreciseStore, path: string): [any, UpdateFn<AnyType>, GetFn<AnyType>, PreciseStore];
/**
 * 监听任何一次变更
 * @param store
 */
declare function usePreciseTick(store: PreciseStore): [AnyType, UpdateFn<AnyType>, GetFn<AnyType>, PreciseStore];
export { PreciseStore, useCreatePreciseStore, useGetPreciseStore, usePreciseValue, usePreciseTick, };
