import React from 'react'
import {constants, datejs} from "../../util";
import {isNil} from "../../util/object";
import {logger} from "../../util/log";
import ConfigProvider from "../../config-provider";
import {parseJsonObject} from "../../util/func";
import {getDep} from "./deps";
import {
    IRenderCfg,
    renderFileDownload,
    renderFileImage
} from "../../previews/renderFileImage";
import {isNumeric} from "../../util/string";

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


const renderDateTimeString = (value: any, formatter: string): string => {

    const tryFormat = (v): string => {
        if (!v) {
            return ''
        }
        try {
            return datejs(v).format(formatter);
        } catch (e) {
            return 'FORMAT ERROR : ' + v;
        }
    }
    const tryFormatArray = (value:any[]): string => {
        const filtered = value.filter((aaa)=>{
            return !!aaa;
        });
        if (filtered.length === 0) {
            return '';
        }
        return value.map(tryFormat).join(' ~ ');
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
    return renderDateTimeString(value, 'YYYY-MM-DD HH:mm:ss')
}

function renderDay(value: any) {
    return renderDateTimeString(value, 'YYYY-MM-DD')
}

function renderBoolean(value: any) {

    if (value === true || value === 'Y' || value === 1 ) {
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
        <span dangerouslySetInnerHTML={{__html: value}} className={`${cfg.prefix}render-formats-html`}/>
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
        <pre dangerouslySetInnerHTML={{__html: html}} className={`${cfg.prefix}render-formats-json`}/>
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
            return renderEnumTag(aa, {...cfg, deep: deep + 1});
        })
    }

    if (typeof value === 'string') {
        const strTrim = value.trim();
        if (strTrim.startsWith('[') && strTrim.endsWith(']')) {
            const arr = parseJsonObject(strTrim) || []; // 可能是个数组
            if (Array.isArray(arr)) {
                return arr.map((aa) => {
                    return renderEnumTag(aa, {...cfg, deep: deep + 1});
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
    const {value, render, prefix} = props;
    return render(value, {prefix, deep: 0});
});


function buildRender(render: any) {
    return (value: any) => {
        const {prefix} = ConfigProvider.getContext()
        return <RenderComponent value={value} render={render} prefix={prefix}/>
    }
}



const renderFormats = {
    renderString: buildRender(renderString),
    renderJSON: buildRender(renderJSON),
    renderDay: buildRender(renderDay), // 支持单个、多个、JSON字符串
    renderTime: buildRender(renderTime), // 支持单个、多个、JSON字符串
    renderThousands: buildRender(renderThousands),
    renderHTML: buildRender(renderHTML),
    renderBoolean: buildRender(renderBoolean),
    renderRelativeTime: buildRender(renderRelativeTime),
    renderFileDownload: buildRender(renderFileDownload), // 支持单个、多个、JSON字符串
    renderFileImage: buildRender(renderFileImage), // 支持单个、多个、JSON字符串
    renderEnumTag: buildRender(renderEnumTag), // 支持单个、多个、JSON字符串
}

export {
    renderFormats
}
