import React from 'react';
import ConfigProvider from '../config-provider';
import Animate from '../animate';
import Message from './message';
import classNames from 'classnames';
import {usePreciseValue} from "../hooks/usePreciseStore";

const MessageWrapper = (props, ref) => {

    const {prefix = ConfigProvider.defaultPrefix, store, managerConfig} = props;
    const [elementList] = usePreciseValue(store, 'elementList');

    const maxCount = managerConfig.maxCount;

    const tagProps = {
        animationAppear: true,
        animation: {
            appear: 'pulse',
            enter: 'pulse',
            leave: `${prefix}message-fade-leave`,
        },
        singleMode: false
    };

    const children = elementList.map(element => {
        const {key, xProps} = element;
        const {content, ...otherXProps} = xProps || {};

        return (
            <div className={`${prefix}message-list`} key={key}>
                <Message
                    prefix={prefix}
                    visible
                    shape="toast"
                    {...otherXProps}
                >
                    {content}
                </Message>
            </div>
        );
    });

    const className = classNames({
        [`${prefix}message-wrapper-v2`] : true,
        [`${prefix}message-wrapper-v2-single`] : maxCount === 1,
    })

    return (
        <div className={className} style={{top: managerConfig.top}}>
            <Animate {...tagProps} >
                {children}
            </Animate>
        </div>
    );
};


export {
    MessageWrapper
}
