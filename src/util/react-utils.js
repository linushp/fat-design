import _get from './lodash-get.js';

function getElementTextDeep(obj, buf ,deep) {

    // 避免死递归
    if (deep > 10) {
        return;
    }

    if (!obj) {
        return;
    }

    if (typeof obj === "string") {
        buf.push(obj);
        return;
    }

    const children = _get(obj, 'props.children')
    if (typeof children === "string") {
        buf.push(children);
        return;
    }

    if (Array.isArray(children)) {
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (typeof child === "string") {
                buf.push(child);
            } else if (typeof child === "object") {
                getElementTextDeep(child, buf, deep + 1);
            }
        }
        return;
    }
    if (typeof children === "object") {
        getElementTextDeep(children, buf, deep + 1);
    }
}


function getElementText(obj) {
    const buf = [];
    getElementTextDeep(obj, buf, 0);
    return buf.join('');
}


export {
    getElementText
}
