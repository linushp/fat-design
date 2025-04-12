/**
 * 响应键盘 Ctrl + XXXX 事件
 * @param fn
 * @param keyCode
 */
declare function useOnKeyPressCtrl(fn: any, keyCode: number): void;
/**
 * 响应键盘 Ctrl + S 事件
 * @param fn
 */
declare function useOnKeyPressSave(fn: any): void;
export { useOnKeyPressCtrl, useOnKeyPressSave };
