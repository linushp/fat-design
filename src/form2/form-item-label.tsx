import React from "react";
import {FormItemProps, FormItemState, LayoutEnum,} from "./form-types";
import classNames from "classnames";
import {getDeps} from "./deps";
import {deepEqual} from "../util/shallowEqual";
import {fixItemPropsByState} from "./helper/fixItemProps";


function isEmptyLabel(label: any) : boolean {
    if (typeof label === "string") {
        return label.trim().length === 0 ;
    }
    return false;
}

const ItemLabel = React.memo((props: FormItemProps) => {

    const {Grid} = getDeps();
    const {Col} = Grid;

    const {
        id,
        required,
        label,
        labelCol,
        wrapperCol,
        prefix,
        layout,
        labelWidth,
        labelTextAlign,
        labelAlign,
        colon,
    } = props;


    if (!label) {
        return null;
    }


    const ele = (
        <label htmlFor={id} data-required={required === true ? 'true': undefined} key="label">
            {label}
        </label>
    );

    const cls = classNames({
        [`${prefix}form-item-label`]: true,
        'has-colon': colon && !isEmptyLabel(label),
        [`${prefix}left`]: labelTextAlign === 'left',
    });

    if (layout === LayoutEnum.responsive && labelWidth && labelAlign !== 'top') {
        return (
            <div className={cls} style={{width: labelWidth}}>
                {ele}
            </div>
        );
    }

    if ((wrapperCol || labelCol) && labelAlign !== 'top') {
        return (
            <Col {...labelCol} className={cls}>
                {ele}
            </Col>
        );
    }

    return <div className={cls}>{ele}</div>;
}, (prevProps: FormItemProps, nextProps: FormItemProps) => {
    return deepEqual(prevProps, nextProps, true);
});


function getFormItemLabel(formItemProps: FormItemProps, formItemState: FormItemState) {
    const fixedProps = fixItemPropsByState(formItemProps, formItemState);
    const cloneProps = {...formItemProps, ...fixedProps};
    return <ItemLabel {...cloneProps} />;
}


export {
    getFormItemLabel
}
