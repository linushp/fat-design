import React from 'react';
import ConfigProvider from '../config-provider';
import Picker from './picker';
import {DATE_PICKER_MODE} from './constant';

const {DATE, WEEK, MONTH, QUARTER, YEAR} = DATE_PICKER_MODE;
const MODE2FORMAT = {
    [DATE]: 'YYYY-MM-DD',
    [WEEK]: 'YYYY-wo',
    [MONTH]: 'YYYY-MM',
    [QUARTER]: 'YYYY-[Q]Q',
    [YEAR]: 'YYYY',
};

/* istanbul ignore next */
const transform = (props, deprecated) => {
    const {footerRender, onVisibleMonthChange, defaultVisibleMonth, ranges, ...newProps} = props;
    const mode = props.mode || DATE;

    if ('footerRender' in props) {
        deprecated('footerRender', 'extraFooterRender', 'DatePicker');
        newProps.extraFooterRender = footerRender;
    }

    if (onVisibleMonthChange) {
        deprecated('onVisibleMonthChange', 'onPanelChange', 'DatePicker');
        newProps.onPanelChange = onVisibleMonthChange;
    }

    if (defaultVisibleMonth) {
        deprecated('defaultVisibleMonth', 'defaultPanelValue', 'DatePicker');
        newProps.defaultPanelValue = onVisibleMonthChange;
    }

    if ('ranges' in props) {
        deprecated('ranges', 'preset: PT.oneOfType([PT.array, PT.object])', 'DatePicker');
        newProps.preset = ranges;
    }

    if ([WEEK, MONTH, QUARTER, YEAR].includes(mode)) {
        delete newProps.showTime;
    } else if (typeof props.showTime === 'object') {
        deprecated('showTime: object', 'showTime && timePanelProps', 'DatePicker');
        newProps.timePanelProps = props.showTime;
        newProps.showTime = true;
    }

    if (!newProps.format) {
        newProps.format = MODE2FORMAT[mode] + (newProps.showTime ? ' HH:mm:ss' : '');
    }

    return newProps;
};

const ConfigPicker = ConfigProvider.config(Picker, {
    componentName: 'DatePicker',
    transform,
});
const generatePicker = (mode, displayName, type = 'date') => {
    const PickerComponent = React.forwardRef((props, ref) => {
        return <ConfigPicker ref={ref} mode={mode} type={type} {...props}/>
    });
    PickerComponent.displayName = displayName;
    return PickerComponent;
};


const DatePicker = generatePicker(DATE, 'DatePicker');
DatePicker.MonthPicker = generatePicker(MONTH, 'MonthPicker');
DatePicker.YearPicker = generatePicker(YEAR, 'YearPicker');
DatePicker.WeekPicker = generatePicker(WEEK, 'WeekPicker');
DatePicker.QuarterPicker = generatePicker(QUARTER, 'QuarterPicker');
DatePicker.RangePicker = generatePicker(DATE, 'RangePicker', 'range');


export default DatePicker;
