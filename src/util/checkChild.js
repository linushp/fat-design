// `React.forwardRef(render)` returns a forwarding
// object that includes `render` method, and the specific
// `child.type` will be an object instead of a class or
// function.
function isChildTypeComp(child) {
    if (!child || !child.type) {
        return false;
    }
    const type = child.type;
    return typeof type === 'function' || typeof type === 'object';
}


export {
    isChildTypeComp
}
