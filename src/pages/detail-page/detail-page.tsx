import React from 'react';
import classNames from "classnames";
import {DetailPageProps} from "./types";
import ConfigProvider from "../../config-provider";

const defaultPrefix = ConfigProvider.defaultPrefix;


function DetailPage(props: DetailPageProps) {
    const {children, prefix, pageTitle, className} = props;
    const thePrefix = `${prefix}detail-page`;

    return (
        <div className={classNames({
            [thePrefix]: true,
            [`${className}`]: !!className
        })}>

            {
                pageTitle ? (
                    <div className={`${thePrefix}-title`}>{pageTitle}</div>
                ) : null
            }

            {
                children ? (
                    <div className={`${thePrefix}-inner`}>
                        {children}
                    </div>
                ) : null
            }

        </div>
    )
}


DetailPage.defaultProps = {
    prefix: defaultPrefix,
    useElevator: true, // TODO
}

DetailPage.CardForm = null as any;
DetailPage.FormItem = null as any;
DetailPage.Section = null as any;
DetailPage.Summary = null as any;

export default DetailPage;
