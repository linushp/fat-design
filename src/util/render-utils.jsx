import classNames from "classnames";
import React from "react";


function renderFormPreview({displayValue, className, style, prefix, previewPlaceholder}) {

    const previewCls = classNames({
        [`${prefix}form-preview`]: true,
        [className]: !!className,
    });

    let displayText = displayValue;
    if (displayValue === '' || typeof displayValue === 'undefined' || displayValue === null) {
        displayText = previewPlaceholder;
    }

    const divProps = {className: previewCls}
    if (style) {
        divProps.style = style;
    }

    if (displayText === '') {
        return (
            <div {...divProps}>&nbsp;</div>
        );
    }

    return (<div {...divProps}>{displayText}</div>);
}

export {
    renderFormPreview
}