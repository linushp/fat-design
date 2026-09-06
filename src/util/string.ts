import {logger} from './log';
import {typeOf} from './object';

function toArgWarningMsg(functionName, index, exceptType, realType) {
    return `[function ${functionName}] Expected arguments[${index}] to be ${exceptType} ,but got a ${realType}`
}

/**
 * 将字符串转化为驼峰式写法
 * @param  {String} str 例：-webkit-transition
 * @return {String}     例：WebkitTransition
 */
export function camelcase(str) {
    const strType = typeOf(str);
    if (strType !== 'String') {
        logger.warning(toArgWarningMsg('camelcase', 0, 'String', strType));
        return '';
    }
    if (!/-/.test(str)) {
        return str || '';
    }
    return str.toLowerCase().replace(/-([a-z])/g, ($0, $1) => $1.toUpperCase());
}

/**
 * 将驼峰式字符串转化为连字符写法
 * @param  {String} str 例：WebkitTransition
 * @return {String}     例：-webkit-transition
 */
export function hyphenate(str) {
    const strType = typeOf(str);
    if (strType !== 'String') {
        logger.warning(toArgWarningMsg('hyphenate', 0, 'String', strType));
        return '';
    }
    return str.replace(/([A-Z])/g, $0 => `-${$0.toLowerCase()}`);
}

/**
 * 将驼峰式字符串转化下划线
 * @param  {String} str 例：WebkitTransition
 * @return {String}     例：_webkit_transition
 */
export function camelToUnderscore(str) {
    const strType = typeOf(str);
    if (strType !== 'String') {
        logger.warning(toArgWarningMsg('camelToUnderscore', 0, 'String', strType));
        return '';
    }
    return str.replace(/([a-z])([A-Z])/g, function (_, lower, upper) {
        return lower + '_' + upper.toLowerCase();
    });
}

/**
 * 替换模板字符串
 * @param {String} tpl     例：当前{current}, 共{total}页
 * @param {Object} object  例：{current: 1, total: 9}
 * @return {String}        例：
 */
export function template(tpl, object = {}) {
    const tplType = typeOf(tpl);
    if (tplType !== 'String') {
        logger.warning(toArgWarningMsg('template', 0, 'String', tplType));
        return '';
    }

    return tpl.replace(/\{[a-z]*\}/g, str => {
        const key = str.substring(1, str.length - 1);
        return object[key] || '';
    });
}


export function formatUrl(url: any, baseUrl?: string): string {
    try {

        if (!url || typeof url !== 'string') {
            return ''
        }

        // 如果 URL 已经是以 http 或 https 开头，直接返回
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }

        // 如果没有提供 baseUrl，则使用当前页面的 URL 作为 baseUrl
        if (!baseUrl) {
            baseUrl = window.location.href;
        }

        // 创建一个 URL 对象用于处理 baseUrl
        const base = new URL(baseUrl);

        if (url.startsWith('//')) {
            // 如果 URL 以 // 开头，使用 baseUrl 的协议
            return `${base.protocol}${url}`;
        } else if (url.startsWith('/')) {
            // 如果 URL 以 / 开头，使用 baseUrl 的协议、主机和路径
            return `${base.origin}${url}`;
        } else if (url.startsWith('../') || url.startsWith('./')) {
            // 如果 URL 以 ../ 或 ./ 开头，使用 baseUrl 的路径进行拼接
            const basePath = base.pathname.endsWith('/') ? base.pathname : base.pathname + '/';
            const newUrl = new URL(url, base.origin + basePath);
            return newUrl.href;
        }

        // 如果以上条件都不满足，直接在 baseUrl 后面拼接 URL
        return `${base.href.replace(/\/+$/, '')}/${url}`;
    } catch (e){
        console.error("formatUrl", url, e);
    }
    return ''
}


const imageExtensions = [
    'apng', 'avif', 'bmp', 'gif', 'ico', 'jpeg',
    'jpg', 'png', 'svg', 'tif', 'tiff', 'webp'
];

export function isImageURL(url: string | any): boolean {
    if (typeof url!== "string") {
        return false
    }
    try {
        try {
            // 尝试解析完整URL
            const parsedUrl = new URL(url, window.location.href);
            const path = parsedUrl.pathname;
            const lastSegment = path.split('/').pop();
            if (typeof lastSegment === 'string') {
                // @ts-ignore
                const extension = lastSegment.split('.').pop().toLowerCase();
                return imageExtensions.includes(extension);
            }
            return false;
        } catch {
            // 处理相对路径或无协议URL
            const path = url.split('?')[0];
            const lastSegment = path.split('/').pop();
            if (typeof lastSegment === 'string') {
                // @ts-ignore
                const extension = lastSegment.split('.').pop().toLowerCase();
                return imageExtensions.includes(extension);
            }
            return false;
        }
    } catch (e){
        return false;
    }
}


/**
 * 判断一个字符串，是否只包含数字
 * @param str
 */
export function isNumeric(str: any) : boolean {
    if (!str) {
        return false;
    }
    if (typeof str === 'number') {
        return true;
    }

    if (typeof str === 'string') {
        const len = str.length;
        for (let i = 0; i < len; i++) {
            const code = str.charCodeAt(i);
            if (code < 48 || code > 57) {
                return false; // 非0-9字符码
            }
        }
    }
    return true;
}


/**
 * 根据URL获取文件名
 * @param url
 */
export function getLastFileNameFromUrl(url: any): string {
    try {
        // 处理空URL情况
        if (!url || typeof url!=='string') {
            return '';
        }
        // 分割URL，取最后一段非空内容
        const parts = url.split('/').filter(part => part);
        return parts.length > 0 ? parts[parts.length - 1] : '';
    } catch (err) {
        return ''
    }
}

export function isEmptyStr(value: any): boolean {
    return value === '' ||value === null || typeof value === 'undefined'
}