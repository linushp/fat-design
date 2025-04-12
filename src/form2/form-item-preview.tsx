import React from "react";
import {FormItemProps} from "./form-types";
import classNames from "classnames";
import {isNil} from "../util/object";
import {valueListToMap} from "../util/toMap";

function toPreviewStr(childProps: any, previewPlaceholder: string): string {
    const {value, dataSource} = childProps;
    if (isNil(value)) {
        return previewPlaceholder;
    }

    const valueArr = Array.isArray(value) ? value : [value];

    if (dataSource && dataSource.length > 0) {
        const map = valueListToMap(dataSource);
        return valueArr.map((a: any) => {
            const valueObj = map[a];

            if (isNil(valueObj)) {
                return a;
            }

            if (typeof valueObj === 'object' && valueObj.label) {
                return valueObj.label;
            }

            return valueObj;

        }).join(',');
    }

    return valueArr.join(',')
}

function renderWrapPreview(childProps: any, formItemProps: FormItemProps) {
    const {renderPreview, prefix} = formItemProps;
    const {label} = childProps;

    const valueStr = toPreviewStr(childProps, formItemProps.previewPlaceholder as any);

    const previewCls = classNames({
        [`${prefix}form-preview-default`]: true,
        [`${prefix}form-preview`]: true,
    });

    let ele;
    if (typeof renderPreview === "function") {
        childProps.prefix = prefix;
        ele = renderPreview(valueStr, childProps);
    } else {
        ele = (
            <span className={`${prefix}form-preview-value`}>{valueStr}</span>
        )
    }

    return (
        <div className={previewCls}>
            {label}
            {ele}
        </div>
    );
}


export {
    renderWrapPreview
}
