interface ComponentsStoreProps {
    components: any;
}
declare class ComponentsStore {
    static buildInComponents: any;
    instanceComponents: any;
    mergedComponents: any;
    constructor(obj: ComponentsStoreProps);
    static configBuildIn(obj: ComponentsStoreProps): void;
    static getBuildIn(name: string): any;
    configInstance(obj: ComponentsStoreProps): void;
    private doMergeComponents;
    getComponentTag(component: any): any;
}
declare function isComponentsStoreEquals(a: ComponentsStore, b: ComponentsStore): boolean;
export { ComponentsStore, isComponentsStoreEquals };
