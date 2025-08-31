import React, { Component } from 'react';
import type { PopupItemProps } from './types';
/**
 * Nav.PopupItem
 * @remarks 继承自 `Menu.PopupItem` 的能力请查看 `Menu.PopupItem` 文档
 */
declare class PopupItem extends Component<PopupItemProps> {
    static menuChildType: string;
    static propTypes: {
        className: any;
        icon: any;
        label: any;
        children: any;
    };
    static contextTypes: {
        prefix: any;
        iconOnly: any;
        iconOnlyWidth: any;
        hasArrow: any;
    };
    render(): React.JSX.Element;
}
export default PopupItem;
