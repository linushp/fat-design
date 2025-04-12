import React from "react";
import {DetailPageSummaryItemProps, DetailPageSummaryProps} from "./types";
import classNames from "classnames";
import {Balloon, Icon} from '../deps';
import ConfigProvider from "../../config-provider";

const defaultPrefix = ConfigProvider.defaultPrefix;

function DetailPageSummaryItem(props: DetailPageSummaryItemProps) {
    const {prefix, label, value, type, help} = props;

    const thePrefix = `${prefix}detail-page-summary-item`;

    const itemClassName = classNames({
        [thePrefix]: true,
        [`${thePrefix}-${type}`]: !!type
    });

    if (!label) {
        return null;
    }

    return (
        <div className={itemClassName}>
            <span className={`${thePrefix}-label`}>
                {label}
                {
                    help ? (
                        <Balloon closable={false}
                                 align="b"
                                 trigger={<Icon className={`${thePrefix}-help`} type="help" size="xs"/>}>
                            {help}
                        </Balloon>
                    ) : null
                }
            </span>
            <span className={`${thePrefix}-value`}>{value}</span>
        </div>
    );
}


function DetailPageSummary(props: DetailPageSummaryProps) {
    const {dataSource, prefix} = props;
    return (
        <div className={`${prefix}detail-page-summary`}>
            {dataSource ? (
                dataSource.map((item) => {
                    return (
                        <DetailPageSummaryItem
                            {...item}
                            prefix={item.prefix || prefix}
                            key={item.label}
                        />);
                })
            ) : null}
        </div>
    );
}


DetailPageSummary.defaultProps = {
    prefix: defaultPrefix
}

export {
    DetailPageSummary
}
