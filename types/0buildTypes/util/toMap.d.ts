/**
 * items的只能是value
 * @param items
 */
declare function valueListToMap(items: any[]): Record<string, any>;
declare const toMap: (items: any[], getKey: any) => any;
export { valueListToMap, toMap };
