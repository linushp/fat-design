import React from 'react';
import ConfigProvider from '../config-provider';
import Dialog1 from './dialog';
import Dialog2 from './dialog-v2';
import Inner from './inner';
import { showManager  } from './show';

class Dialog extends React.Component {
    static displayName = 'Dialog';
    render() {
        const { v2, ...others } = this.props;
        if (v2) {
            return <Dialog2 {...others} />;
        } else {
            return <Dialog1 {...others} />;
        }
    }
}


Dialog.Inner = Inner;
Object.assign(Dialog, showManager);



function processProps(props, deprecated) {
    if ('closable' in props) {
        deprecated('closable', 'closeable', 'Dialog');
        const { closable, ...others } = props;
        props = { closeable: closable, ...others };
    }

    const overlayPropNames = [
        'target',
        'offset',
        'beforeOpen',
        'onOpen',
        'afterOpen',
        'beforePosition',
        'onPosition',
        'cache',
        'safeNode',
        'wrapperClassName',
        'container',
    ];
    overlayPropNames.forEach(name => {
        if (name in props) {
            deprecated(name, `overlayProps.${name}`, 'Dialog');
            const { overlayProps, ...others } = props;
            const newOverlayProps = {
                [name]: props[name],
                ...(overlayProps || {}),
            };
            delete others[name];
            props = { overlayProps: newOverlayProps, ...others };
        }
    });

    return props;
}

export default ConfigProvider.config(Dialog, {
    transform: (props, deprecated) => {
        return processProps(props, deprecated);
    },
});
