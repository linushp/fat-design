export type CompareFn1 = (current: any, nextState: any) => boolean;
export type CompareFn = string | boolean | CompareFn1;
declare function isStateEquals(compareFn: CompareFn, current: any, nextState: any): boolean;
export { isStateEquals };
