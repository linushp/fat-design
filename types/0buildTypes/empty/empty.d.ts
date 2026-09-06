import React from 'react';
export interface EmptyProps extends Record<string, any> {
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
    imageStyle?: React.CSSProperties;
    image?: string;
    description?: React.ReactNode;
    locale?: any;
    children?: any;
    rtl?: boolean;
    imageNode?: any;
    prefix?: string;
}
declare const Empty: {
    (props: EmptyProps): import("react/jsx-runtime").JSX.Element;
    defaultProps: {
        prefix: string;
        locale: any;
    };
};
export default Empty;
