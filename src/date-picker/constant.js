export const DATE_PICKER_TYPE = {
    DATE: 'date',
    RANGE: 'range',
};

export const DATE_INPUT_TYPE = {
    BEGIN: 0,
    END: 1,
};

export const DATE_PICKER_MODE = {
    DATE: 'date',
    MONTH: 'month',
    WEEK: 'week',
    QUARTER: 'quarter',
    YEAR: 'year',
};


export const MODE2FORMAT = {
    [DATE_PICKER_MODE.DATE]: 'YYYY-MM-DD',
    [DATE_PICKER_MODE.WEEK]: 'YYYY-wo',
    [DATE_PICKER_MODE.MONTH]: 'YYYY-MM',
    [DATE_PICKER_MODE.QUARTER]: 'YYYY-[Q]Q',
    [DATE_PICKER_MODE.YEAR]: 'YYYY',
};