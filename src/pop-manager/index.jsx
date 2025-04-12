import React from 'react';
import ConfigProvider from '../config-provider';
import {obj, guid, pReactDOM} from '../util';
import {PreciseStore, usePreciseValue} from "../hooks/usePreciseStore";

const defaultConfig = {
    top: 30,
    maxCount: 0,
    duration: 3000,
    title: '',
    content: null,
    className: undefined
};


const MAX_DURATION = 1000 * 3600 * 24 * 365;

const KEY_ELEMENT_LIST = 'elementList';

function handleConfig(config, type) {
    let newConfig = {...defaultConfig};
    if (typeof config === 'string' || React.isValidElement(config)) {
        newConfig.title = config;
    } else if (obj.typeOf(config) === 'Object') {
        newConfig = {...config};
    }
    if (type) {
        newConfig.type = type;
    }
    return newConfig;
}


function clearTimeoutId(item) {

    if (item && item.timeoutId) {
        clearTimeout(item.timeoutId);
        item.timeoutId = null;
    }

    // 保证onClose只会被调用一次
    if (item && typeof item.onClose === 'function') {
        item.onClose();
        item.onClose = null;
    }
}

class PopManager {

    constructor(config = {}) {
        this.root = null;
        this.isInitialized = false;
        this.store = new PreciseStore({
            elementList: []
        }, "equal", null);
        this.managerConfig = {...defaultConfig, ...config};
    }

    getRoot() {
        if (!this.root) {
            const div = document.createElement('div');
            document.body.appendChild(div);
            this.root = pReactDOM.createRoot(div);
        }
        return this.root;
    }


    initialize() {
        if (this.isInitialized) {
            return;
        }
        this.isInitialized = true;
        const Tag = this.managerConfig.Tag;

        this.getRoot().render(
            <ConfigProvider {...ConfigProvider.getContext()}>
                <Tag store={this.store} managerConfig={this.managerConfig}/>
            </ConfigProvider>
        );
    }


    close(key) {

        if (key) {
            const elementList = this.store.getValue(KEY_ELEMENT_LIST);
            const idx = elementList.findIndex((item) => {
                return item.key === key;
            });
            if (idx > -1) {
                const item = elementList[idx];
                clearTimeoutId(item);
                elementList.splice(idx, 1);
                this.store.setValueAndCommit(KEY_ELEMENT_LIST, [...elementList]);
            }
        } else {
            const elementList = this.store.getValue(KEY_ELEMENT_LIST);
            for (let i = 0; i < elementList.length; i++) {
                const item = elementList[i];
                clearTimeoutId(item);
            }
            this.store.setValueAndCommit(KEY_ELEMENT_LIST, []);
        }
    }


    create(props) {

        this.initialize();
        const {maxCount} = this.managerConfig;

        const key = props.key || guid('message-');
        const duration = props.duration || this.managerConfig.duration;

        const item = {
            key,
            close: null,
            timeoutId: 0,
            duration,
            xProps: props
        };


        item.close = () => {
            clearTimeoutId(item);
            this.close(key);
        }

        item.hide = () => {
            item.close();
        }


        // 显示持续时间，0表示一直存在，以毫秒为单位
        if (typeof duration === "number" && duration > 0 && duration < MAX_DURATION) {
            item.timeoutId = setTimeout(() => {
                item.close();
            }, duration);
        }


        const elementList = this.store.getValue(KEY_ELEMENT_LIST);

        elementList.push(item);
        if (maxCount && elementList.length > maxCount) {
            const oldItem = elementList.shift();
            clearTimeoutId(oldItem);
        }

        this.store.setValueAndCommit(KEY_ELEMENT_LIST, [...elementList]);
        return item;
    }


    destroy() {
        this.close();
        if (this.root) {
            this.root.unmountWithContainer();
            this.root = null;
        }
        if (this.isInitialized) {
            this.isInitialized = false;
        }
    }


    createExports() {

        const that = this;
        const createMethod = (type) => {
            return config => {
                config = handleConfig(config, type);
                return that.create(config);
            };
        }


        const exports = {};
        exports.open = createMethod();
        exports.show = createMethod();
        exports.success = createMethod('success');
        exports.warning = createMethod('warning');
        exports.alert = createMethod('warning');
        exports.error = createMethod('error');
        exports.loading = createMethod('loading');
        exports.help = createMethod('help');
        exports.confirm = createMethod('help');
        exports.notice = createMethod('notice');
        exports.info = createMethod('notice');

        exports.close = (key) => {
            return this.close(key);
        }
        exports.hide = (key) => {
            return this.close(key);
        }
        exports.destroy = () => {
            return this.destroy();
        }

        exports.config = (cfg) => {
            if (cfg) {
                Object.assign(this.managerConfig, cfg);
            }
            return this.managerConfig;
        }
        return exports;
    }


}


function buildModalList(ModalComponent, isSingleton = false) {
    function ModalList(props) {
        const {store} = props;
        const [elementList] = usePreciseValue(store, KEY_ELEMENT_LIST);
        if (!elementList || elementList.length === 0) {
            return null;
        }

        // 单例模式: 参考Loading.showLoading的实现
        if (isSingleton) {
            const element = elementList[elementList.length - 1];
            const xProps = element.xProps;
            return <ModalComponent {...xProps} popManagerElement={element}/>
        }

        // 多例模式
        return elementList.map((element) => {
            const xProps = element.xProps;
            return <ModalComponent {...xProps} key={element.key} popManagerElement={element}/>
        });
    }

    return ModalList;
}

PopManager.buildModalList = buildModalList;
PopManager.MAX_DURATION = MAX_DURATION;

export {
    PopManager
}
