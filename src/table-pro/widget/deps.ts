import _get from "lodash.get";
import {ComponentsStore} from "../../util/comp";

function getDep(name: string): any {
    return _get(ComponentsStore.buildInComponents, name);
}

export {
    getDep
}
