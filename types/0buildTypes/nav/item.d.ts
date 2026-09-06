import { Component } from 'react';
import type { ItemProps } from './types';
/**
 * Nav.Item
 * @remarks 继承自 `Menu.Item` 的能力请查看 `Menu.Item` 文档
 */
declare class Item extends Component<ItemProps> {
    static menuChildType: string;
    static propTypes: {
        /**
         * 自定义图标，可以使用 Icon 的 type，也可以使用组件 `<Icon type="icon type" />`
         */
        icon: any;
        /**
         * 导航内容
         */
        children: any;
        parentMode: any;
    };
    static contextTypes: {
        prefix: any;
        iconOnly: any;
        iconOnlyWidth: any;
        iconTextOnly: any;
        hasTooltip: any;
    };
    render(): import("react/jsx-runtime").JSX.Element;
}
export default Item;
