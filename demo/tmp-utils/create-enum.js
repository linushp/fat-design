function createEnumItem(label, value, ...others) {
    if (others && others.length > 0) {
        return {label, value, others};
    }
    return {label, value};
}

function formatEnumObject(originEnumObject) {

    if (!originEnumObject) {
        return {};
    }

    if (Array.isArray(originEnumObject)) {
        const enumObject = {};
        for (let i = 0; i < originEnumObject.length; i++) {
            const item = originEnumObject[i];
            if (typeof item === "string" || typeof item === "number" || typeof item === 'boolean') {
                enumObject[i] = createEnumItem(item, item);
            } else if (typeof item === "object") {
                enumObject[i] = item;
            }
        }
        return enumObject;
    }

    if (typeof originEnumObject === "object") {
        const enumObject = {};
        const keys = Object.keys(originEnumObject);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const item = originEnumObject[key];
            if (typeof item === "string") {
                enumObject[key] = createEnumItem(item, key);
            } else if (typeof item === "object") {
                enumObject[key] = item;
            }
        }
        return enumObject;
    }

    return {};
}

function createEnum(originEnumObject) {

    const enumObject = formatEnumObject(originEnumObject);

    const NAMES = {
        KEY: '@@key',
        ITEM: '@@@item',
    };

    const getItemAttr = (item, key, attrName) => {
        if (attrName === NAMES.KEY) {
            return key;
        }
        if (attrName === NAMES.ITEM) {
            return item;
        }
        return item[attrName];
    }

    const getMapInner = (keyName, valueName) => {
        const map = {};
        const keys = Object.keys(enumObject);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const item = enumObject[key] || {};
            const mapKeyPt = getItemAttr(item, key, keyName);
            map[mapKeyPt] = getItemAttr(item, key, valueName);
        }
        return map;
    }


    // 自带缓存，避免重复计算。
    const cacheObject = {};
    const getMap = (keyName = 'value', valueName = 'label') => {
        const cacheKey = `${keyName}_${valueName}`;
        if (!cacheObject[cacheKey]) {
            cacheObject[cacheKey] = getMapInner(keyName, valueName);
        }
        return cacheObject[cacheKey];
    }

    const getArray = ()=>{
        return Object.values(enumObject);
    }

    return {
        getValueKeyMap: () => getMap('value', NAMES.KEY),
        getValueLabelMap: () => getMap('value', 'label'),
        getValueItemMap: () => getMap('value', NAMES.ITEM),

        getLabelValueMap: () => getMap('label', 'value'),
        getLabelKeyMap: () => getMap('label', NAMES.KEY),
        getLabelItemMap: () => getMap('label', NAMES.ITEM),

        getKeyValueMap: () => getMap(NAMES.KEY, 'value'),
        getKeyLabelMap: () => getMap(NAMES.KEY, 'label'),
        getKeyItemMap: () => enumObject,
        getMap,
        getArray,
    };
}


var demo1 = createEnum({
    PENDING: createEnumItem("处理中", "1"),
    AGREE: createEnumItem("已同意", "2"),
    REJECT: createEnumItem("已拒绝", "3"),
    FINISH: createEnumItem("已完成", "4"),
    CLOSED: createEnumItem("已关闭", "5"),
});


var demo2 = createEnum({
    PENDING: "处理中",
    AGREE: "已同意",
    REJECT: "已拒绝",
    FINISH: "已完成",
    CLOSED: "已关闭",
});


var demo3 = createEnum({
    PENDING1: {aa: "处理中1", bb: '1'},
    PENDING2: {aa: "处理中2", bb: '2'},
    PENDING3: {aa: "处理中3", bb: '3'},
    PENDING4: {aa: "处理中4", bb: '4'},
});

demo3.getMap('bb', 'aa');
demo3.getMap('@@key', 'aa');

var demo4 = createEnum([
    {aa: "处理中1", bb: '1'},
    {aa: "处理中2", bb: '2'},
    {aa: "处理中3", bb: '3'},
    {aa: "处理中4", bb: '4'},
]);

demo4.getMap('aa','bb');
demo4.getMap('bb','aa');

var demo5 = createEnum([
    '1','2','3','4'
]);
demo5.getArray();
demo5.getMap();
