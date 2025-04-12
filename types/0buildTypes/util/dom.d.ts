/**
 * 是否能使用 DOM 方法
 * @type {Boolean}
 */
export declare const hasDOM: boolean;
/**
 * 节点是否包含指定 className
 * @param  {Element}  node
 * @param  {String}  className
 * @return {Boolean}
 *
 * @example
 * dom.hasClass(document.body, 'foo');
 */
export declare function hasClass(node: any, className: any): any;
/**
 * 添加 className
 * @param {Element} node
 * @param {String} className
 *
 * @example
 * dom.addClass(document.body, 'foo');
 */
export declare function addClass(node: any, className: any, _force: any): void;
/**
 * 移除 className
 * @param  {Element} node
 * @param  {String} className
 *
 * @example
 * dom.removeClass(document.body, 'foo');
 */
export declare function removeClass(node: any, className: any, _force: any): void;
/**
 * 切换 className
 * @param  {Element} node
 * @param  {String} className
 * @return {Boolean}           执行后节点上是否还有此 className
 *
 * @example
 * dom.toggleClass(document.body, 'foo');
 */
export declare function toggleClass(node: any, className: any): any;
/**
 * 元素是否匹配 CSS 选择器
 * @param  {Element} node       DOM 节点
 * @param  {String}  selector   CSS 选择器
 * @return {Boolean}
 *
 * @example
 * dom.matches(mountNode, '.container'); // boolean
 */
export declare const matches: (node: any, selector: any) => any;
export declare function getNodeHozWhitespace(node: any): any;
/**
 * 获取元素计算后的样式
 * @param  {Element} node DOM 节点
 * @param  {String} name 属性名
 * @return {Number|Object}
 */
export declare function getStyle(node: any, name: any): any;
/**
 * 设置元素的样式
 * @param {Element} node  DOM 节点
 * @param {Object|String} name  属性名，或者是一个对象，包含多个属性
 * @param {Number|String} value 属性值
 *
 * @example
 * // 设置单个属性值
 * dom.setStyle(mountNode, 'width', 100);
 * // 设置多条属性值
 * dom.setStyle(mountNode, {
 *     width: 100,
 *     height: 200
 * });
 */
export declare function setStyle(node: any, name: any, value?: any): boolean;
/**
 * 获取默认的滚动条大小（通过创造一个滚动元素，读取滚动元素的滚动条信息）
 * @return {Object} width, height
 */
export declare function scrollbar(): {
    width: number;
    height: number;
};
export declare function hasScroll(containerNode: any): boolean;
/**
 * 获取元素距离视口顶部和左边的偏移距离
 * @return {Object} top, left
 */
export declare function getOffset(node: any): {
    top: any;
    left: any;
};
/**
 * 获取不同单位转为 number 的长度
 * @param {string|number} len 传入的长度
 * @return {number} pixels
 */
export declare function getPixels(len: string | number): number;
/**
 * 匹配特定选择器且离当前元素最近的祖先元素（也可以是当前元素本身），如果匹配不到，则返回 null
 * @param {element} dom 待匹配的元素
 * @param {string} selecotr 选择器
 * @return {element} parent
 */
export declare function getClosest(dom: any, selector: any): any;
/**
 * 如果元素被指定的选择器字符串选择，getMatches()  方法返回true; 否则返回false
 * @param {element} dom 待匹配的元素
 * @param {string} selecotr 选择器
 * @return {element} parent
 */
export declare function getMatches(dom: any, selector: any): any;
export declare function callRef(ref: any, element: any): void;
export declare function saveRef(ref: any): (element: any) => void;
