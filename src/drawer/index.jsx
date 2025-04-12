import React from 'react';
import ConfigProvider from '../config-provider';
import Drawer from './drawer';
import Inner from './inner';
import {showManager} from './show';


Drawer.Inner = Inner;
Drawer.show = (...args) => {
    return showManager.show(...args);
};

export default ConfigProvider.config(Drawer, {});
