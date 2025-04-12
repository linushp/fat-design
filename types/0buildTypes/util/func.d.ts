/**
 * 一个空方法，返回入参本身或空对象
 */
export declare const noop: () => void;
/**
 * 一个空方法，返回false
 */
export declare const prevent: () => boolean;
/**
 * 将N个方法合并为一个链式调用的方法
 * @return {Function}     合并后的方法
 * 参考 https://github.com/react-component/util/
 *
 * @example
 * func.makeChain(this.handleChange, this.props.onChange);
 */
export declare function makeChain(...fns: any[]): any;
/**
 * 批量改变方法的上下文
 * 此方法在react组件中很有用，在constructor中批量将组件上的方法执行上下文绑定到组件本身
 * 注意：用bind改变函数运行的上下文只会生效一次
 * @param  {Object} ctx 方法挂载的对象以及执行的上下文
 * @param  {Array<String>} fns 方法名列表
 *
 * @example
 * func.bindCtx(this, ['handleClick', 'handleChange']);
 */
export declare function bindCtx(ctx: any, fns: any, ns: any): void;
/**
 * 用于执行回调方法后的逻辑
 * @param  {*} ret            回调方法执行结果
 * @param  {Function} success 执行结果返回非false的回调
 * @param  {Function} [failure=noop] 执行结果返回false的回调
 */
export declare function promiseCall(ret: any, success: any, failure?: any): any;
/**
 * 方法调用，如果obj对象中存在名为method的方法则调用该方法
 * @param {Object} target 目标对象
 * @param {string} method 方法名
 * @param {Array} args 函数参数列表
 * @returns {*} 函数返回值 如果不存在返回undefined
 */
export declare function invoke(target: any, method: any, args: any): any;
export declare function renderNode(render: any, defaultRender: any, renderProps?: any[]): any;
/**
 * 日期检验：无效值返回 null
 * @param {dayjs.ConfigType} value
 * @returns {Dayjs | null}
 */
export declare function checkDate(value: any): any;
/**
 * Range 日期检验
 * @param {dayjs.ConfigType[]} value 日期值
 * @param {number} inputType 输入框类型：开始时间输入框/结束时间输入框
 * @param {boolean} disabled 是否禁用
 * @param {boolean} strictly 是否严格校验：严格模式下不允许开始时间大于结束时间，在显示确认按键的，用户输入过程可不严格校验
 * @returns {Dayjs[] | null[]}
 */
export declare function checkRangeDate(value: any, inputType: any, disabled: any, strictly?: boolean): any[];
export declare function pickerDefined(obj: any): any;
export declare function preventDefault(e: any): void;
/**
 * 判断首字母大写
 * @param str
 * @returns {boolean}
 */
export declare function isStartUpper(str: string): boolean;
export declare function toNumber(obj: any, defaultNum: number): number;
export declare function wrapperFn(fn: any, setLoading: any, callback: any, originalInstance: any): (event: any, ...args: any[]) => any;
export declare function isEmpty(obj: any): boolean;
export declare function isNotEmpty(obj: any): boolean;
export declare function parseJsonObject(str: any): any;
