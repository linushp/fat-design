import React,{useMemo} from "react";
import classnames from 'classnames';
import {datejs} from "../util";
import {MODE2FORMAT} from './constant';
import ConfigProvider from "../config-provider";
import {renderFormPreview} from "../util/render-utils.jsx";

const tryFormat = (v, formatter) => {
    if (!v) {
        return ''
    }
    try {
        return datejs(v).format(formatter);
    } catch (e) {
        console.error('FORMAT ERROR : ' + v, e)
        return v;
    }
}

function DatePickerPreview(props) {
    const { mode, value, format, showTime, className,prefix, previewPlaceholder} = props;
    const displayValue = useMemo(()=>{
        if (!value) {
            return null;
        }
        if (format && typeof format === 'string') {
            return tryFormat(value, format);
        }
        const defaultFormat = MODE2FORMAT[mode] + (showTime ? ' HH:mm:ss' : '');
        return tryFormat(value, defaultFormat);

    },[mode, value, format,showTime])

    return renderFormPreview({
        displayValue, className, prefix, previewPlaceholder
    });
}


DatePickerPreview.displayName = 'DatePickerPreview';
DatePickerPreview.defaultProps = {
    prefix: ConfigProvider.defaultPrefix
};


export default React.memo(DatePickerPreview);