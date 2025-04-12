/**
 * 将字符串转化为驼峰式写法
 * @param  {String} str 例：-webkit-transition
 * @return {String}     例：WebkitTransition
 */
export declare function camelcase(str: any): any;
/**
 * 将驼峰式字符串转化为连字符写法
 * @param  {String} str 例：WebkitTransition
 * @return {String}     例：-webkit-transition
 */
export declare function hyphenate(str: any): any;
/**
 * 将驼峰式字符串转化下划线
 * @param  {String} str 例：WebkitTransition
 * @return {String}     例：_webkit_transition
 */
export declare function camelToUnderscore(str: any): any;
/**
 * 替换模板字符串
 * @param {String} tpl     例：当前{current}, 共{total}页
 * @param {Object} object  例：{current: 1, total: 9}
 * @return {String}        例：
 */
export declare function template(tpl: any, object?: {}): any;
