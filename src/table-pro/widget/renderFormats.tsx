import React from 'react'
import {datejs, constants} from "../../util";
import {isNil} from "../../util/object";
import {logger} from "../../util/log";
import ConfigProvider from "../../config-provider";
import {parseJsonObject} from "../../util/func";



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

const getDateTimeString = (value:any, formatter: string): string => {

    if (isNil(value)) {
        return constants.EMPTY_PLACEHOLDER;
    }

    if (typeof value === 'string') {
        const valueTrim = value.trim();
        // 可能是数组。
        if (valueTrim.startsWith('[') || valueTrim.endsWith(']')) {
            const arr = parseJsonObject(valueTrim) || [];
            return arr.map((v) => {
                try {
                    return datejs(v).format(formatter);
                } catch (e) {
                    return 'FORMAT ERROR'
                }
            }).join(' ~ ');
        }
    }
    try {
        return datejs(value).format(formatter);
    } catch (e) {
        return 'FORMAT ERROR'
    }
}

const RenderDateTimeImpl = React.memo((props: any)=>{
    const {value, formatter} = props;
    return (<span>{getDateTimeString(value, formatter)}</span>)
})

function renderTime(value: any) {
    return <RenderDateTimeImpl value={value} formatter={'YYYY-MM-DD HH:mm:ss'}/>
}

function renderDay(value: any) {
    return <RenderDateTimeImpl value={value} formatter={'YYYY-MM-DD'}/>
}

function renderBoolean(value: any) {
    if (value === true || value === 'N' || value === 0) {
        return '是'
    }
    if (value === false || value === 'Y' || value === 1) {
        return '否'
    }
    return constants.EMPTY_PLACEHOLDER;
}


/**
 * 直接输出HTML
 * @param value
 * @param prefix
 */
function renderHTML(value: any, prefix: string) {
    if (isNil(value)) {
        return constants.EMPTY_PLACEHOLDER;
    }
    return (
        <span dangerouslySetInnerHTML={{__html: value}} className={`${prefix}render-formats-html`}/>
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
 * @param prefix
 */
const renderJSON = (value: any, prefix: string) => {
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
        <pre dangerouslySetInnerHTML={{__html: html}} className={`${prefix}render-formats-json`}/>
    )
}


const RenderComponent = React.memo((props: any) => {
    const {value, render, prefix} = props;
    return render(value, prefix);
});


function buildRender(render: any) {
    return (value: any) => {
        const {prefix} = ConfigProvider.getContext()
        return <RenderComponent value={value} render={render} prefix={prefix}/>
    }
}


const renderFormats = {
    renderJSON: buildRender(renderJSON),
    renderString: buildRender(renderString),
    renderDay: buildRender(renderDay),
    renderTime: buildRender(renderTime),
    renderThousands: buildRender(renderThousands),
    renderHTML: buildRender(renderHTML),
    renderBoolean: buildRender(renderBoolean),
}

export {
    renderFormats
}
