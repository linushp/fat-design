import React from 'react';
export default class ErrorBoundary extends React.Component<any, any> {
    static propTypes: {
        children: any;
        /**
         * 捕获错误后的自定义处理, 比如埋点上传
         * @param {Object} error 错误
         * @param {Object} errorInfo 错误详细信息
         */
        afterCatch: any;
        /**
         * 捕获错误后的展现 自定义组件
         * @param {Object} error 错误
         * @param {Object} errorInfo 错误详细信息
         * @returns {Element} 捕获错误后的处理
         */
        fallbackUI: any;
        /**
         * 被捕获的组件名
         */
        componentName: any;
    };
    constructor(props: any);
    componentDidCatch(error: any, errorInfo: any): void;
    render(): any;
}
