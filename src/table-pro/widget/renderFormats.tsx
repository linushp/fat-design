import React from 'react'
import { constants, datejs } from "../../util";
import { isNil } from "../../util/object";
import { logger } from "../../util/log";
import ConfigProvider from "../../config-provider";
import { parseJsonObject } from "../../util/func";
import { getDep } from "./deps";
import {
    IRenderCfg,
    renderFileDownload,
    renderFileImage
} from "../../previews/renderFileImage";
import { isNumeric } from "../../util/string";

const now = Date.now();


function objValueToString(value: any) {
    if (isNil(value)) {
        return null
    }
    if (typeof value === 'number' || typeof value === 'string') {
        return value
    }
    if (typeof value === 'object' && typeof value.label !== 'undefined') {
        return value.label
    }
    return JSON.stringify(value)
}

/**
 * 通用输出字符串形式的函数
 * @param value
 */
function renderString(value: any) {
    if (isNil(value)) {
        return constants.EMPTY_PLACEHOLDER;
    }

    if (typeof value === 'number' || typeof value === 'string') {
        return value
    }

    if (Array.isArray(value)) {
        return value.map((v) => {
            return objValueToString(v)
        }).filter((v) => {
            return !isNil(v)
        }).join(',')
    }
    // 兜底
    return JSON.stringify(value)
}


export interface IRenderStringExtOptions {
    /** 最大显示行数，超出部分显示省略号 */
    maxLines: number;
    triggerType?: 'hover' | 'click';
    tooltipContentStyle?: React.CSSProperties;
}

const RenderStringExtComponent = React.memo((props: any) => {
    const { value, maxLines, triggerType, prefix, tooltipContentStyle } = props;
    const textRef = React.useRef<HTMLDivElement>(null);
    const [isOverflow, setIsOverflow] = React.useState(false);

    const textContent = renderString(value);

    React.useEffect(() => {
        if (!maxLines || !textRef.current) {
            return;
        }
        setIsOverflow(textRef.current.scrollHeight > textRef.current.clientHeight);
    }, [textContent, maxLines]);

    // maxLines为零或未配置时，行为与renderString一致
    if (!maxLines) {
        return <>{textContent}</>;
    }

    const lineClampStyle: React.CSSProperties = {
        display: '-webkit-box',
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        wordBreak: 'break-all',
        cursor: isOverflow ? 'pointer' : 'auto',
    };

    const inner = (
        <div ref={textRef} style={lineClampStyle} className={`${prefix}render-string-ext`}>
            {textContent}
        </div>
    );

    // 确保 triggerTypeFixed 为 hover 或 click
    // 默认值为 hover
    const triggerTypeFixed = triggerType === 'click' ? 'click' : 'hover';

    if (isOverflow) {

        const contentStyle: React.CSSProperties = {
            maxHeight: 300, width: 350,
            overflow: 'auto', fontSize: '12px',
            lineHeight: '20px', whiteSpace: 'pre-wrap', wordBreak: 'break-all'
        };

        if(tooltipContentStyle) {
            Object.assign(contentStyle, tooltipContentStyle);
        }

        const Balloon = getDep('Balloon');
        const Tooltip = Balloon?.Tooltip;
        if (Tooltip) {
            return (
                <Tooltip v2 trigger={inner} align="t" triggerType={triggerTypeFixed} styleOption={'black'} popupStyle={{ maxWidth: 'none' }}>
                    <div style={contentStyle}>
                        {textContent}
                    </div>
                </Tooltip>
            );
        }
    }

    return inner;
});

/**
 * 增强版字符串渲染函数，支持最大行数限制
 * 超过最大行数时显示省略号，鼠标悬浮时显示Balloon提示
 * @param options 配置项
 * @param options.maxLines 最大显示行数
 * @returns ICellRenderFunc 渲染函数
 */
function renderStringExt(value: any, options: IRenderStringExtOptions): React.JSX.Element {
    const { maxLines, triggerType, tooltipContentStyle } = options || {};
    const { prefix } = ConfigProvider.getContext();
    // maxLines为零或未配置时，行为与renderString一致
    if (!maxLines || typeof maxLines !== 'number') {
        return <>{renderString(value)}</>;
    }
    return <RenderStringExtComponent value={value} maxLines={maxLines} triggerType={triggerType} prefix={prefix || ''} tooltipContentStyle={tooltipContentStyle} />;
}



const maxSecond = new Date('2100-01-01').getTime() / 1000;
function isSecondTimestamp(value: number): boolean {
    return value > 0 && value < maxSecond;
}


/**
 *
 * @param value
 * @param formatter
 * @param isAutoSecond 自动识别以秒为单位的时间戳
 */
const renderDateTimeString = (value: any, formatter: string, isAutoSecond: boolean): string => {

    const tryFormat = (v: any): string => {
        if (!v) {
            return ''
        }
        // 以秒为单位的时间戳
        if (isAutoSecond && typeof v === 'number' && isSecondTimestamp(value)) {
            try {
                return datejs(v * 1000).format(formatter);
            } catch (e) {
                return 'AUTO FORMAT ERROR : ' + v;
            }
        }

        try {
            return datejs(v).format(formatter);
        } catch (e) {
            return 'AUTO FORMAT ERROR : ' + v;
        }
    }
    const tryFormatArray = (value: any[]): string => {
        const filtered = value.filter((aaa) => {
            return !!aaa;
        });
        if (filtered.length === 0) {
            return '';
        }
        return value.map((v) => {

            if (isNumeric(v)) {  // 纯数字的字符串类型
                return tryFormat(Number(v));
            }

            return tryFormat(v)
        }).join(' ~ ');
    }

    if (isNil(value)) {
        return constants.EMPTY_PLACEHOLDER;
    }

    if (Array.isArray(value)) {
        return tryFormatArray(value)
    }

    if (typeof value === 'string') {
        const valueTrim = value.trim();
        // 可能是数组。
        if (valueTrim.startsWith('[') || valueTrim.endsWith(']')) {
            const arr = parseJsonObject(valueTrim) || [];
            if (Array.isArray(arr)) {
                return tryFormatArray(arr)
            }
        }

        // 纯数字的字符串类型
        if (isNumeric(value)) {
            return tryFormat(Number(value));
        }

    }

    return tryFormat(value);
}


function renderTime(value: any) {
    return renderDateTimeString(value, 'YYYY-MM-DD HH:mm:ss', false)
}

function renderDay(value: any) {
    return renderDateTimeString(value, 'YYYY-MM-DD', false)
}

function renderTimeAuto(value: any) {
    return renderDateTimeString(value, 'YYYY-MM-DD HH:mm:ss', true)
}

function renderDayAuto(value: any) {
    return renderDateTimeString(value, 'YYYY-MM-DD', true)
}

function renderBoolean(value: any) {

    if (value === true || value === 'Y' || value === 1) {
        return '是'
    }

    if (value === false || value === 'N' || value === 0) {
        return '否'
    }

    if (typeof value === 'string') {
        const str = value.toUpperCase();
        if (str === 'YES' || str === 'TRUE') {
            return '是'
        }
        if (str === 'NO' || str === 'FALSE') {
            return '是'
        }
    }

    return value || constants.EMPTY_PLACEHOLDER;
}


/**
 * 直接输出HTML
 * @param value
 * @param cfg
 */
function renderHTML(value: any, cfg: IRenderCfg) {
    if (isNil(value)) {
        return constants.EMPTY_PLACEHOLDER;
    }
    return (
        <span dangerouslySetInnerHTML={{ __html: value }} className={`${cfg.prefix}render-formats-html`} />
    );
}


/**
 * 格式化千分位
 * @param value
 */
function renderThousands(value: any) {
    if (isNil(value)) {
        return constants.EMPTY_PLACEHOLDER;
    }
    const fixed = 2;
    try {
        const str = parseFloat(value).toLocaleString('en', {
            minimumFractionDigits: fixed, maximumFractionDigits: fixed
        });
        return str;
    } catch (e) {
        logger.error('renderThousands error value => ' + value)
    }
    return constants.EMPTY_PLACEHOLDER;
}


/**
 * 使用JSON格式输出
 * @param value
 * @param cfg
 */
const renderJSON = (value: any, cfg: IRenderCfg) => {
    if (isNil(value)) {
        return constants.EMPTY_PLACEHOLDER;
    }

    let html = '';

    const content = value;

    if (typeof content === "string") {
        try {
            const obj = JSON.parse(content)
            html = JSON.stringify(obj, null, 2);
        } catch (e) {
            html = content;
            console.info('renderJSON Parse Exception:', content)
        }
    } else {
        html = JSON.stringify(content, null, 2);
    }

    return (
        <pre dangerouslySetInnerHTML={{ __html: html }} className={`${cfg.prefix}render-formats-json`} />
    )
}


function renderRelativeTime(value: any): string {
    if (isNil(value)) {
        return constants.EMPTY_PLACEHOLDER;
    }

    try {
        const targetDate = datejs(value).toDate().getTime();
        const diff = now - targetDate;

        const second = 1000;
        const minute = 60 * second;
        const hour = 60 * minute;
        const day = 24 * hour;
        const month = 30 * day; // 简单以每月30天计算，实际会有差异
        const year = 365 * day;

        if (diff < minute) {
            const seconds = Math.floor(diff / second);
            return `${seconds} 秒前`;
        } else if (diff < hour) {
            const minutes = Math.floor(diff / minute);
            return `${minutes} 分钟前`;
        } else if (diff < day) {
            const hours = Math.floor(diff / hour);
            return `${hours} 小时前`;
        } else if (diff < month) {
            const days = Math.floor(diff / day);
            return `${days} 天前`;
        } else if (diff < year) {
            const months = Math.floor(diff / month);
            return `${months} 个月前`;
        } else {
            const years = Math.floor(diff / year);
            return `${years} 年前`;
        }
    } catch (e) {
        return 'FORMAT ERROR : ' + value;
    }

}


type TimeDurationUnit = 'ms' | 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year';

export interface IRenderTimeDurationOptions {
    /** 时长原数据格式 */
    timeDurationSource?: 'ms' | 'second' | 'minute';
    /** 时长显示格式 */
    timeDurationFormatter?: 'auto' | TimeDurationUnit;
    /** 是否显示单位 */
    isDisplayUnit?: boolean;
}

const TIME_DURATION_UNIT_MS: Record<TimeDurationUnit, number> = {
    ms: 1,
    second: 1000,
    minute: 60 * 1000,
    hour: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    year: 365 * 24 * 60 * 60 * 1000,
};

const TIME_DURATION_UNIT_LABEL: Record<TimeDurationUnit, string> = {
    ms: '毫秒',
    second: '秒',
    minute: '分',
    hour: '时',
    day: '天',
    month: '月',
    year: '年',
};

const TIME_DURATION_AUTO_UNITS: TimeDurationUnit[] = ['year', 'month', 'day', 'hour', 'minute', 'second', 'ms'];

function parseTimeDurationValue(value: any): number | null {
    if (value === null || value === undefined || value === '') {
        return null;
    }
    if (typeof value === 'number' && !Number.isNaN(value)) {
        return value;
    }
    if (typeof value === 'string' && isNumeric(value)) {
        return Number(value);
    }
    return null;
}

function toTimeDurationMilliseconds(value: number, sourceUnit: string): number {
    const multiplier = TIME_DURATION_UNIT_MS[sourceUnit as TimeDurationUnit] || TIME_DURATION_UNIT_MS.ms;
    return value * multiplier;
}

function pickAutoTimeDurationUnit(milliseconds: number): TimeDurationUnit {
    for (const unit of TIME_DURATION_AUTO_UNITS) {
        if (milliseconds >= TIME_DURATION_UNIT_MS[unit]) {
            return unit;
        }
    }
    return 'ms';
}

function formatTimeDurationNumber(num: number): string {
    if (Number.isInteger(num) || Math.abs(num - Math.round(num)) < 0.001) {
        return String(Math.round(num));
    }
    return String(parseFloat(num.toFixed(2)));
}

/**
 * 渲染时长
 * 将数值按原数据单位换算后，格式化为指定单位的时长字符串
 * @param value 时长数值
 * @param options 配置项
 */
function renderTimeDuration(value: any, {
    timeDurationSource = 'ms',
    timeDurationFormatter = 'auto',
    isDisplayUnit = true,
}: IRenderTimeDurationOptions = {}): string {
    const numValue = parseTimeDurationValue(value);
    if (numValue === null) {
        return '';
    }

    const milliseconds = toTimeDurationMilliseconds(numValue, timeDurationSource);
    const displayUnit: TimeDurationUnit = timeDurationFormatter === 'auto'
        ? pickAutoTimeDurationUnit(milliseconds)
        : timeDurationFormatter;
    const unitMs = TIME_DURATION_UNIT_MS[displayUnit] || TIME_DURATION_UNIT_MS.ms;
    const displayValue = formatTimeDurationNumber(milliseconds / unitMs);

    if (isDisplayUnit === false) {
        return displayValue;
    }
    return `${displayValue} ${TIME_DURATION_UNIT_LABEL[displayUnit] || ''}`;
}


/**
 * 支持单个，多个，JSON
 * @param value
 * @param cfg
 */
function renderEnumTag(value: any, cfg: IRenderCfg) {
    const deep = cfg.deep || 0;
    if (!value || deep > 5) {
        return null;
    }

    if (Array.isArray(value)) {
        return value.map((aa) => {
            return renderEnumTag(aa, { ...cfg, deep: deep + 1 });
        })
    }

    if (typeof value === 'string') {
        const strTrim = value.trim();
        if (strTrim.startsWith('[') && strTrim.endsWith(']')) {
            const arr = parseJsonObject(strTrim) || []; // 可能是个数组
            if (Array.isArray(arr)) {
                return arr.map((aa) => {
                    return renderEnumTag(aa, { ...cfg, deep: deep + 1 });
                })
            }
        }
    }

    if (typeof value === "object" && value.label && value.style) {
        const Tag = getDep('Tag');
        if (Tag) {
            const className = `${cfg.prefix}render-formats-enumtag`;
            return (<Tag type="normal" color={value.style} size={'small'} className={className}>{value.label}</Tag>)
        } else {
            return value.label;
        }
    }

    if (typeof value === "string") {
        return value;
    }
    return null;
}


const RenderComponent = React.memo((props: any) => {
    const { value, render, prefix } = props;
    return render(value, { prefix, deep: 0 });
});


function buildRender(render: any) {
    return (value: any) => {
        const { prefix } = ConfigProvider.getContext()
        return <RenderComponent value={value} render={render} prefix={prefix} />
    }
}



const renderFormats = {
    renderString: buildRender(renderString),
    renderStringExt: renderStringExt,
    renderJSON: buildRender(renderJSON),
    renderDay: buildRender(renderDay), // 支持单个、多个、JSON字符串
    renderDayAuto: buildRender(renderDayAuto), // 支持单个、多个、JSON字符串
    renderTime: buildRender(renderTime), // 支持单个、多个、JSON字符串
    renderTimeAuto: buildRender(renderTimeAuto), // 支持单个、多个、JSON字符串
    renderThousands: buildRender(renderThousands),
    renderHTML: buildRender(renderHTML),
    renderBoolean: buildRender(renderBoolean),
    renderRelativeTime: buildRender(renderRelativeTime),
    renderTimeDuration: renderTimeDuration,
    renderFileDownload: buildRender(renderFileDownload), // 支持单个、多个、JSON字符串
    renderFileImage: buildRender(renderFileImage), // 支持单个、多个、JSON字符串
    renderEnumTag: buildRender(renderEnumTag), // 支持单个、多个、JSON字符串
}

export {
    renderFormats,
    renderTimeDuration,
}
