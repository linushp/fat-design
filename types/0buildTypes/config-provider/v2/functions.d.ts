import { IConfigValues, IGetContextProps } from "./types";
declare function getContext(): IConfigValues;
declare function setContext(updates: IConfigValues, justSetValue?: boolean): void;
declare function getLocale(): any;
declare function getLanguage(): string;
declare function getDirection(): boolean;
declare function getDisplayName(Component: any, options?: any): string;
/**
 * 合并组件props和context配置
 * @param args 参数支持两个或三个
 * props,contextValues,displayName
 * props,displayName
 */
declare function getContextProps(args: IGetContextProps): {
    prefix: any;
    locale: any;
    rtl: boolean;
    warning: boolean;
    defaultPropsConfig: any;
    device: any;
    popupContainer: any;
    errorBoundary: any;
};
/**
 * 设置所有文案。
 * @param globalLocales 所有语言下的所有文案。
 */
declare function initLocales(globalLocales: any): void;
/**
 * 当前语言类型：如：zh-cn / en-us
 * @param language
 */
declare function setLanguage(language: string): void;
declare function setLocale(locale: any): void;
declare function setDirection(dir: string): void;
declare const commonPropNames: string[];
declare const setMomentLocale: (locale: any) => void;
declare const setDateLocale: (locale: any) => void;
declare const getCommonPropTypes: () => {
    prefix: any;
    locale: any;
    defaultPropsConfig: any;
    errorBoundary: any;
    pure: any;
    warning: any;
    rtl: any;
    device: any;
    children: any;
    popupContainer: any;
};
declare const providerFunctions: {
    getContextProps: typeof getContextProps;
    getContext: typeof getContext;
    getLocale: typeof getLocale;
    getLanguage: typeof getLanguage;
    getDirection: typeof getDirection;
    initLocales: typeof initLocales;
    setLanguage: typeof setLanguage;
    setLocale: typeof setLocale;
    setDirection: typeof setDirection;
    setContext: typeof setContext;
    setMomentLocale: (locale: any) => void;
    setDateLocale: (locale: any) => void;
};
export { getCommonPropTypes, getDisplayName, setMomentLocale, setDateLocale, providerFunctions, commonPropNames };
