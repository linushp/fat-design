import Animate from "../animate/index.jsx";
import Message from "../message/index.jsx";
import React from "react";
import {usePreciseValue} from "../hooks/usePreciseStore";

const getAnimation = placement => {
    switch (placement) {
        case 'tl':
        case 'bl':
            return 'slideInLeft';
        case 'tr':
        case 'br':
            return 'slideInRight';
        default:
            return null;
    }
};

const NotificationRender = (props, ref) => {

    const {prefix, store, managerConfig} = props;
    const [elementList] = usePreciseValue(store, 'elementList');
    const config = managerConfig.notificationConfig || {};

    return (
        <div
            className={`${prefix}notification`}
            style={{
                [config.placement.indexOf('b') === 0
                    ? 'bottom'
                    : 'top']: config.offset[1],
                [config.placement.indexOf('l') !== -1
                    ? 'left'
                    : 'right']: config.offset[0],
            }}
        >
            <Animate
                animationAppear
                animation={{
                    enter: getAnimation(config.placement),
                    leave: `${prefix}notification-fade-leave`,
                }}
                singleMode={false}
            >
                {elementList.map(({key, close, xProps}) => {
                        const {
                            type,
                            title,
                            content,
                            icon,
                            onClick,
                            style,
                            className
                        } = xProps;

                        return (
                            <Message
                                key={key}
                                shape="toast"
                                type={type}
                                title={title}
                                iconType={icon}
                                closeable
                                animation={false}
                                size={config.size}
                                visible
                                style={style}
                                className={className}
                                onClick={onClick}
                                onClose={() => {
                                    close()
                                }}
                            >
                                {content}
                            </Message>
                        )
                    }
                )}
            </Animate>
        </div>
    );
};

export {
    NotificationRender
}
