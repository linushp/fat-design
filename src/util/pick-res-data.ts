
function isArray(arr: any): boolean {
    return Array.isArray(arr);
}

/**
 * 从res对象中，提取数组字段
 * @param obj
 * @param defaultValue
 */
function pickResArray(obj: any, defaultValue: any = []): any[] {

    if (!obj) {
        return defaultValue;
    }

    // 本身就是一个数组
    if (isArray(obj)) {
        return obj;
    }

    // 里面的：data字段是一个数组。
    if (typeof obj === "object") {
        const keys = ['dataSource', 'data_source', 'data', 'rows', 'result', 'enums'];
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const dataValue = obj[key];
            if (isArray(dataValue)) {
                return dataValue
            }
        }
    }

    return defaultValue;
}

/**
 * 从res对象中，提取数量字段
 * @param obj
 * @param defaultValue
 */
function pickTotalCount(obj: any, defaultValue: any = 0): number | null {
    if (!obj) {
        return defaultValue;
    }

    // 里面的：data字段是一个数组。
    if (typeof obj === "object") {
        const keys = ['total', 'totalCount', 'total_count', 'result_count', 'resultCount'];
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const dataValue = obj[key];
            if (typeof dataValue === "number") {
                return dataValue
            }
        }
    }
    return defaultValue;
}


const errorMessageKeys = [
    'errors',
    'error',
    'failure',
    'exception',
    'fault',
    'warning',
    'warnings',
    'errorMsg',
    'error_msg',
    'errorMessage',
    'error_message',
    'errMsg',
    'err_msg',
    'errorDescription',
    'error_description',
    'errorDesc',
    'error_desc',
    'errDesc',
    'err_desc',
    'errorDetail',
    'error_detail',
    'errorInfo',
    'error_info',
    'message',
];

/**
 * 提取报错信息字段
 * @param e
 */
function pickErrorMessage(e: any): string | null{
    if (!e) {
        return null;
    }
    if (typeof e === "string") {
        return e;
    }

    if (typeof e === "object") {
        for (let i = 0; i < errorMessageKeys.length; i++) {
            const key = errorMessageKeys[i];
            const errValue = e[key];
            if (errValue) {
                if (typeof errValue === "string" && errValue.length > 0) {
                    return errValue;
                }
                if (typeof errValue === "object") {
                    return JSON.stringify(errValue);
                }
            }
        }
        return JSON.stringify(e);
    }
    return "" + e;
}


/**
 * {
 *    data:[],
 *    total:999 ,
 *    success: true,
 *    message: '',
 *    errorMessage: '',
 *    errorCode: 1001,
 * }
 */
export {
    pickResArray,
    pickTotalCount,
    pickErrorMessage
}
