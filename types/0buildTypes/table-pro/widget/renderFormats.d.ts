import React from 'react';
export interface IRenderStringExtOptions {
    /** 最大显示行数，超出部分显示省略号 */
    maxLines: number;
    triggerType?: 'hover' | 'click';
    tooltipContentStyle?: React.CSSProperties;
}
/**
 * 增强版字符串渲染函数，支持最大行数限制
 * 超过最大行数时显示省略号，鼠标悬浮时显示Balloon提示
 * @param options 配置项
 * @param options.maxLines 最大显示行数
 * @returns ICellRenderFunc 渲染函数
 */
declare function renderStringExt(value: any, options: IRenderStringExtOptions): React.JSX.Element;
type TimeDurationUnit = 'ms' | 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year';
export interface IRenderTimeDurationOptions {
    /** 时长原数据格式 */
    timeDurationSource?: 'ms' | 'second' | 'minute';
    /** 时长显示格式 */
    timeDurationFormatter?: 'auto' | TimeDurationUnit;
    /** 是否显示单位 */
    isDisplayUnit?: boolean;
}
/**
 * 渲染时长
 * 将数值按原数据单位换算后，格式化为指定单位的时长字符串
 * @param value 时长数值
 * @param options 配置项
 */
declare function renderTimeDuration(value: any, { timeDurationSource, timeDurationFormatter, isDisplayUnit, }?: IRenderTimeDurationOptions): string;
declare const renderFormats: {
    renderString: (value: any) => import("react/jsx-runtime").JSX.Element;
    renderStringExt: typeof renderStringExt;
    renderJSON: (value: any) => import("react/jsx-runtime").JSX.Element;
    renderDay: (value: any) => import("react/jsx-runtime").JSX.Element;
    renderDayAuto: (value: any) => import("react/jsx-runtime").JSX.Element;
    renderTime: (value: any) => import("react/jsx-runtime").JSX.Element;
    renderTimeAuto: (value: any) => import("react/jsx-runtime").JSX.Element;
    renderThousands: (value: any) => import("react/jsx-runtime").JSX.Element;
    renderHTML: (value: any) => import("react/jsx-runtime").JSX.Element;
    renderBoolean: (value: any) => import("react/jsx-runtime").JSX.Element;
    renderRelativeTime: (value: any) => import("react/jsx-runtime").JSX.Element;
    renderTimeDuration: typeof renderTimeDuration;
    renderFileDownload: (value: any) => import("react/jsx-runtime").JSX.Element;
    renderFileImage: (value: any) => import("react/jsx-runtime").JSX.Element;
    renderEnumTag: (value: any) => import("react/jsx-runtime").JSX.Element;
};
export { renderFormats, renderTimeDuration, };
