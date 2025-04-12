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
