import {useRef} from "react";
import _set from "lodash.set";
import {QueryFormProps} from "./types";
import Form from '../form2'
import classNames from 'classnames';
import {useQueryFormItems} from "./query-form-items";

import ConfigProvider from "../config-provider";
import {useQueryFormLayout} from "./query-form-layout";
const defaultPrefix = ConfigProvider.defaultPrefix;

function QueryForm(props: QueryFormProps) {
    const {prefix, isUseCard, initialFormWidth, labelAlign, ...otherProps} = props;

    const children = useQueryFormItems(props);

    const fixProps = {
        ...otherProps,
        labelAlign,
        prefix,
        schema: null,
        children: children
    };

    if (labelAlign === 'inset' || labelAlign === 'left') {
        _set(fixProps, 'layoutProps.gap', '8px 8px')
    }

    const ref = useRef(null);

    const fixLayoutProps = useQueryFormLayout(ref, fixProps, initialFormWidth);

    const className = classNames({
        [`${prefix}query-form`]: true,
        [`${prefix}query-form-card`]: isUseCard,
    });

    return (
        <div className={className} ref={ref} >
            {
                fixLayoutProps ? <Form {...fixLayoutProps} /> : null
            }
        </div>
    );
}


QueryForm.defaultProps = {
    prefix: defaultPrefix,
    isUseCard: false,
    isPreview: false,
    labelAlign: 'top',
    // labelAlign: 'inset',
    // layout: 'float',
    layout: 'responsive',
    layoutProps: {
        gap: [0, 8],
        columns: 0 ,// 为0时会自动计算
    }
};




export {
    QueryForm
}
