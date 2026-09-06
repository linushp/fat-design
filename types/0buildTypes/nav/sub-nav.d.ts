import { Component } from 'react';
import type { SubNavProps } from './types';
/**
 * Nav.SubNav
 * @remarks 继承自 `Menu.SubMenu` 的能力请查看 `Menu.SubMenu` 文档
 */
declare class SubNav extends Component<SubNavProps> {
    static menuChildType: string;
    static propTypes: {
        className: any;
        icon: any;
        label: any;
        selectable: any;
        children: any;
        noIcon: any;
    };
    static defaultProps: {
        selectable: boolean;
    };
    static contextTypes: {
        prefix: any;
        mode: any;
        iconOnly: any;
        iconOnlyWidth: any;
        hasArrow: any;
    };
    render(): import("react/jsx-runtime").JSX.Element;
}
export default SubNav;
