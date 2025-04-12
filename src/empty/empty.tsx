import React from 'react'
import classNames from 'classnames'
import DefaultEmptyImg from './img/default'
import SimpleEmptyImg from './img/simple'
import {defaultPrefix} from "../config-provider";
import zhCN from "../locale/zh-cn";

const EMPTY_TYPE = {
    'DEFAULT' : 'DEFAULT',
    'SIMPLE' : 'SIMPLE',
};


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


function getImageNode(props: EmptyProps){
    const {imageNode, image} = props;
    if (imageNode) {
        return imageNode;
    }
    if (image === EMPTY_TYPE.SIMPLE) {
        return <SimpleEmptyImg />;
    }
    return <DefaultEmptyImg />;
}

function getDescription(props: EmptyProps){
    if ( typeof props.description !== 'undefined') {
        return props.description;
    }
    if (props.locale && props.locale.description){
        return props.locale.description;
    }
    return zhCN.Empty.description
}

const Empty = (props: EmptyProps) => {
    const {
        locale,
        className,
        image = EMPTY_TYPE.DEFAULT,
        description,
        children,
        imageStyle,
        rtl,
        prefix,
        ...restProps
    } = props;

    const prefixCls = `${prefix}empty`
    const des = getDescription(props);

    const imageNode = getImageNode(props);

    return (
        <div
            className={classNames(
                prefixCls,
                {
                    [`${prefixCls}-normal`]: image === EMPTY_TYPE.SIMPLE,
                    [`${prefixCls}-rtl`]: rtl,
                },
                className,
            )}
            {...restProps}
        >
            <div className={`${prefixCls}-image`} style={imageStyle}>
                {imageNode}
            </div>
            {des && <div className={`${prefixCls}-description`}>{des}</div>}
            {children && <div className={`${prefixCls}-footer`}>{children}</div>}
        </div>
    )
}

Empty.defaultProps = {
    prefix: defaultPrefix,
    locale: zhCN.Empty,
};

export default Empty
