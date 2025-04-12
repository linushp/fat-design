import {Component} from "react";
import {uniqueId} from './guid';


class ReactComponent extends Component{
    constructor(props) {
        super(props);
        this._GENERATED_INSTANCE_MAP_ = {}
        this.fatNodeInstance = null;
    }

    getOrGenerateInstanceId(name, id) {
        if (id) {
            return id;
        }
        if (!this._GENERATED_INSTANCE_MAP_[name]) {
            this._GENERATED_INSTANCE_MAP_[name] = uniqueId('id')
        }
        return this._GENERATED_INSTANCE_MAP_[name];
    }


    saveFatNodeInstance = fatNodeInstance => {
        this.fatNodeInstance = fatNodeInstance;
    };



}

export {
    ReactComponent
}
