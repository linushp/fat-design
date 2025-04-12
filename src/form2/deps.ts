import {ComponentsStore} from "../util/comp";

const getDeps = ()=> {
    const {
        Message,
        Button,
        Icon,
        Grid,
        ResponsiveGrid,
        Card
    } = ComponentsStore.buildInComponents;

    return {
        Message,
        Button,
        Icon,
        Grid,
        ResponsiveGrid,
        Card,
        RGrid: ResponsiveGrid,
    };
}

export {
    getDeps
}
