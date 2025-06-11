import React from "react";
import {getDeps} from "./deps";
import {IFormItemCardProps} from "./form-types";
import {defaultPrefix} from "../config-provider";

const DEFAULT_CARD_PROPS = {};
function FormItemCard(props: IFormItemCardProps) {
    const { title, children, prefix = defaultPrefix, cardProps = DEFAULT_CARD_PROPS } = props;
    const { Card } = getDeps();

    return (
        <Card {...cardProps} title={title} free className={`${prefix}form-item-card`}>
            <Card.Content className={`${prefix}form-item-card-content`}>
                {children}
            </Card.Content>
        </Card>
    );
}

export {
    FormItemCard
}
