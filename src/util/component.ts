
export function assignSubComponent(Component: any, SubComponents: any){
    for (const key in SubComponents) {
        if (Object.prototype.hasOwnProperty.call(SubComponents, key)) {
            ((Component)[key] as unknown) = SubComponents[key];
        }
    }
    return Component;
}
