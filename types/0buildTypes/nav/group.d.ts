import { Component } from 'react';
import type { GroupProps } from './types';
/**
 * Nav.Group
 * @remarks 继承自 `Menu.Group` 的能力请查看 `Menu.Group` 文档
 */
declare class Group extends Component<GroupProps> {
    static menuChildType: string;
    static propTypes: {
        /**
         * 自定义类名
         */
        className: any;
        /**
         * 标签内容
         */
        label: any;
        /**
         * 导航项和子导航
         */
        children: any;
    };
    static contextTypes: {
        prefix: any;
        iconOnly: any;
    };
    render(): import("react/jsx-runtime").JSX.Element;
}
export default Group;
