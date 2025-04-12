// import localforage from "localforage";
//
// const storageInstance = localforage.createInstance({
//     name: "fat-design"
// });


class StorageInstance {
    private forageInstance: any = null;

    constructor() {
        this.forageInstance = null;
    }

    getInstance() {
        if (this.forageInstance) {
            return this.forageInstance
        }

        // @ts-ignore
        const localforage = window.localforage;
        if (localforage && localforage.createInstance) {
            this.forageInstance = localforage.createInstance({name: "fat-design"});
            return this.forageInstance
        }

        console.warn("建议使用localforage: storageInstance.useForage, 也可以通过script标签引入localforage库")
        return localStorage;
    }

    async getItem(key: string): Promise<string | null> {
        return this.getInstance().getItem(key)
    }

    async setItem(key: string, value: string) {
        return this.getInstance().setItem(key, value)
    }

    async removeItem(key: string) {
        return this.getInstance().removeItem(key)
    }

    useForage(forageInstance: any) {
        this.forageInstance = forageInstance;
    }
}


const storageInstance = new StorageInstance();
export {
    storageInstance
}
