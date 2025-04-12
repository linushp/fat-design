import './libs.scss';
import * as libs from './libs';
import {ComponentsStore} from "./util";

ComponentsStore.configBuildIn({
    components: libs
});


export * as utils from "./util";
export * from './libs';
export * from './others'
