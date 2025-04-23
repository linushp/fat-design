import React from 'react';
import classnames from "classnames";
import Icon from '../../icon';
import Balloon from '../../balloon';

function HeaderTips(props) {
    const {tips, prefix} = props
    const cls = classnames({
        [`${prefix}table-header-tips`]: true,
    });
    const trigger = (
        <div className={cls}>
            <Icon type={'help'} size="xs"/>
        </div>
    );

    if (typeof tips === 'object' && (tips.title || tips.content)) {
        const {content, component, triggerType = 'hover', align = 't', title, style, ...otherTipsProps} = tips;
        const Comp = component === 'Balloon.Tooltip' ? Balloon.Tooltip : Balloon;
        return (
            <Comp
                {...otherTipsProps}
                trigger={trigger}
                align={align}
                triggerType={triggerType}
                title={title}
                style={style}
            >
                {content}
            </Comp>
        )
    }

    if (typeof tips === 'function') {
        return tips()
    }


    return (
        <Balloon
                 trigger={trigger}
                 align={'t'}
                 triggerType={'hover'}>
            {tips}
        </Balloon>
    )
}


function renderHeaderTips({tips, prefix}) {
    if (!tips) {
        return null;
    }
    return (
        <HeaderTips tips={tips} prefix={prefix}/>
    )
}


export {
    renderHeaderTips
}
