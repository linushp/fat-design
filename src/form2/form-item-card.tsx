import React from "react";
import {getDeps} from "./deps";
import {IFormItemCardProps} from "./form-types";
import {defaultPrefix} from "../config-provider";

function FormItemCard(props: IFormItemCardProps) {
    const { title, children, prefix} = props;
    const { Card } = getDeps();

    return (
        <Card title={title} free className={`${prefix}form-item-card`}>
            <Card.Content className={`${prefix}form-item-card-content`}>
                {children}
            </Card.Content>
        </Card>
    );
}

FormItemCard.defaultProps = {
    prefix: defaultPrefix
}

export {
    FormItemCard
}
