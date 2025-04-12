/**
 * 从res对象中，提取数组字段
 * @param obj
 * @param defaultValue
 */
declare function pickResArray(obj: any, defaultValue?: any): any[];
/**
 * 从res对象中，提取数量字段
 * @param obj
 * @param defaultValue
 */
declare function pickTotalCount(obj: any, defaultValue?: any): number | null;
/**
 * 提取报错信息字段
 * @param e
 */
declare function pickErrorMessage(e: any): string | null;
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
export { pickResArray, pickTotalCount, pickErrorMessage };
