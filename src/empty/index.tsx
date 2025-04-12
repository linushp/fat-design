import Component from './empty';
import ConfigProvider from '../config-provider';

const Empty = ConfigProvider.configFn(Component, {});

export default Empty;
