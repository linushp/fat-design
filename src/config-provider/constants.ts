import {IConfigValues} from "./v2/types";
import zhCn from "../locale/zh-cn";

// export const defaultPrefix = 'next-';
export const defaultPrefix = 'fatd-';

export const defaultConfigValues: IConfigValues = {
    prefix: defaultPrefix,
    locale: zhCn,
    defaultPropsConfig: null,
    warning: false,
    rtl: false,
    device: 'desktop', //'tablet', 'desktop', 'phone'
    popupContainer: null,
    errorBoundary: true,
    globalLocales: {
        'zh-cn': zhCn
    },
    currentGlobalLanguage: 'zh-cn',
    currentGlobalRtl: false
};
