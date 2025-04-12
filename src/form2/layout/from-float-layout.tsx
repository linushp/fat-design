import React from "react";
import classnames from 'classnames';
import {FloatLayoutProps} from "../form-types";

function FromFloatLayout(props: any) {
    const {prefix, children} = props;
    const floatProps = (props.floatProps || {}) as FloatLayoutProps

    const {className,itemWidth} = floatProps;

    const compCls = classnames({
        [`${prefix}from-float-layout`]: true,
        [`${prefix}from-float-layout-w-${itemWidth}`]: !!itemWidth,
        [className]: !!className
    });

    return (
        <div className={compCls}>
            {children}
        </div>
    )
}

export {
    FromFloatLayout
}
