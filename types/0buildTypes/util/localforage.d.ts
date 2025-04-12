declare class StorageInstance {
    private forageInstance;
    constructor();
    getInstance(): any;
    getItem(key: string): Promise<string | null>;
    setItem(key: string, value: string): Promise<any>;
    removeItem(key: string): Promise<any>;
    useForage(forageInstance: any): void;
}
declare const storageInstance: StorageInstance;
export { storageInstance };
