import _get from "../../util/lodash-get";
import {ComponentsStore} from "../../util/comp";

function getDep(name: string): any {
    return _get(ComponentsStore.buildInComponents, name);
}

export {
    getDep
}
