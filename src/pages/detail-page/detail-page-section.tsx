import {DetailPageSectionProps} from "./types";
import React from "react";
import Form from "../../form2";
import {FormItemProps} from "../../form2/form-types";
import {inheritFormProps} from "../../form2/helper/fnInheritProps";
import {RGrid} from "../deps";

import ConfigProvider from "../../config-provider";
const defaultPrefix = ConfigProvider.defaultPrefix;

const FormItem = Form.Item;


function getNewChildren(children: any, sectionProps: DetailPageSectionProps): any {
    return React.Children.map(children, (child, index) => {
        const childProps = child.props as FormItemProps;
        const typeMark = "" + child.type._typeMark;

        if (typeMark === FormItem._typeMark) {
            const cellProps = childProps.cellProps || {};
            const newProps = {
                ...childProps,
                labelAlign: 'left',
                layout: 'responsive',
                cellProps: cellProps
            };
            inheritFormProps(newProps, sectionProps);
            return React.cloneElement(child, newProps);
        }
        return child;
    });
}


function DetailPageSection(props: DetailPageSectionProps) {
    const {title, toolbar, children, prefix, columns, gap} = props;

    const newChildren = getNewChildren(children, props);
    const thePrefix = `${prefix}detail-page-section`;

    return (
        <div className={`${thePrefix}`}>
            <div className={`${thePrefix}-row1`}>
                <div className={`${thePrefix}-title`}>{title}</div>

                {toolbar ? (
                    <div>{typeof toolbar === "function" ? toolbar() : toolbar}</div>
                ) : null}

            </div>
            <div className={`${thePrefix}-row2`}>
                <RGrid columns={columns} gap={gap}>
                    {newChildren}
                </RGrid>
            </div>
        </div>
    )
}


DetailPageSection._typeMark = 'DetailPageSection'
DetailPageSection.defaultProps = {
    prefix: defaultPrefix,
    columns: 3,
    gap: 8,
    labelCol: {
        fixedSpan: 10,
    },
    wrapperCol: {
        span: 14,
    },
    useElevator: true
}


export {
    DetailPageSection
}
