import {isNil} from "./object";
import {isStartUpper} from "./func";
import React from "react";
import get from 'lodash.get';
import {shallowEqual} from "./shallowEqual";


function flatComponents(components: any) {

    if (isNil(components) || typeof components !== "object") {
        return {};
    }

    const result = {...components};
    const names = Object.keys(components);
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const compSub = components[name];
        if (compSub) {
            const names2 = Object.keys(compSub);
            for (let j = 0; j < names2.length; j++) {
                const name2 = names2[j];
                const comp2 = compSub[name2];
                if (comp2 && isStartUpper(name2)) {
                    result[`${name}${name2}`] = comp2;
                }
            }
        }
    }
    return result;
}


function buildEmptyComponent(component: string) {
    return () => {
        return (
            <div>Component Not Found : {component}</div>
        );
    }
}


interface ComponentsStoreProps {
    components: any;
}


class ComponentsStore {

    // 静态变量：内置组件，全局的
    public static buildInComponents: any = {};

    // 本次运行时，临时的组件
    public instanceComponents: any = {};

    public mergedComponents: any = null;

    constructor(obj: ComponentsStoreProps) {
        this.configInstance(obj);
    }

    public static configBuildIn(obj: ComponentsStoreProps) {
        Object.assign(ComponentsStore.buildInComponents, flatComponents(obj.components));
    }

    public static getBuildIn(name: string){
        return get(ComponentsStore.buildInComponents, name);
    }

    public configInstance(obj: ComponentsStoreProps) {
        Object.assign(this.instanceComponents, flatComponents(obj.components));
        this.doMergeComponents();
    }


    private doMergeComponents(): any {
        this.mergedComponents = {};
        Object.assign(this.mergedComponents, ComponentsStore.buildInComponents);
        Object.assign(this.mergedComponents, this.instanceComponents);
    }


    public getComponentTag(component: any): any {
        if (isNil(component) || !component) {
            return null;
        }
        if (typeof component !== "string") {
            return component;
        }

        const components = this.mergedComponents;

        // 两种形式：
        //      1. DatePicker.WeekPicker
        //      2. DatePickerWeekPicker
        let comp = get(components, component);
        if (comp) {
            return comp;
        }

        return buildEmptyComponent(component);
    }


}


function isComponentsStoreEquals(a: ComponentsStore, b: ComponentsStore) {
    if (a === b) {
        return true;
    }
    if (!a && !b) {
        return true;
    }
    //mergedComponents 为最终生效的组件库。
    return shallowEqual(a?.mergedComponents, b?.mergedComponents);
}



export {
    ComponentsStore,
    isComponentsStoreEquals
}
