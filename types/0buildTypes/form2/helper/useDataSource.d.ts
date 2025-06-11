import { IFormContext } from "../form-types";
/**
 * dataSource 字段数据来源：
 *  1. enums 是一个异步函数，可以异步返回
 *  2. enums 是一个同步函数，可以直接返回
 *  3. enums 是一个数组
 * @param enums
 * @param childProps
 * @param xProps
 * @param formContext
 * @param forceUpdateTick
 */
declare function useDataSource(enums: any, childProps: any, xProps: any, formContext: IFormContext, forceUpdateTick?: number): any[];
export { useDataSource };
