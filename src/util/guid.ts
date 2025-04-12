let timestamp = Date.now();
let uniqueIdIndex = 0;


export function uniqueId(prefix?: string): string {
    prefix = prefix || '';
    uniqueIdIndex++;
    return prefix + (timestamp++).toString(36) + "_" + uniqueIdIndex.toString(36);
}


/**
 * 生成全局唯一的id
 * @param  {String} [prefix=''] 前缀字符串
 * @return {String}
 *
 * @example
 * guid(); // j7jv509c
 * guid('prefix-'); // prefix-j7jv509d
 */
export default function (prefix?: string): string {
    return uniqueId(prefix);
}


