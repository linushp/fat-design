/**
 * state 可以是任何值
 * @param initialState
 */
declare function useCurrentState(initialState: any): any[];
/**
 * state 必须是个对象
 * @param initialState
 */
declare function useCurrentState2(initialState?: any): any[];
export { useCurrentState, useCurrentState2, };
