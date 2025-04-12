const cache = new WeakMap();

/**
 * items的只能是value
 * @param items
 */
function valueListToMap(items: any[]): Record<string, any> {
    if (!items || items.length === 0) {
        return {};
    }

    const oldData = cache.get(items);
    if (oldData) {
        return oldData;
    }

    const map: any = {};
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        map[item.value] = item;
    }
    cache.set(items, map);
    return map;
}



const toMap = (items: any[], getKey: any): any => {
    if (!items || items.length === 0) {
        return {};
    }
    const map: any = {};
    for (let i = 0; i < items.length; i++) {
        const e = items[i];
        const key = getKey(e, i);
        map[key] = e;
    }
    return map;
};



export {
    valueListToMap,
    toMap
}
