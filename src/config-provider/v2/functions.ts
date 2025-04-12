import {configStore, CONFIG_VALUES_PATH} from "./context.js";
import {IConfigValues, IGetContextProps} from "./types";
import {obj} from "../../util";
import zhCNLocale from "../../locale/zh-cn";
import datejs from "../../util/date";
import PropTypes from "prop-types";
import {defaultConfigValues} from "../constants";

const zhCN = zhCNLocale as any;

function getContext(): IConfigValues {
    const contextValues = configStore.getValue(CONFIG_VALUES_PATH);
    if (!contextValues) {
        configStore.setValue(CONFIG_VALUES_PATH, defaultConfigValues);
        return defaultConfigValues
    }
    return contextValues;
}

function setContext(updates: IConfigValues, justSetValue: boolean = false) {
    const oldValues = configStore.getValue(CONFIG_VALUES_PATH);
    const nextValues = {...oldValues, ...updates};
    if (justSetValue) {
        return configStore.setValue(CONFIG_VALUES_PATH, nextValues);
    } else {
        return configStore.setValueAndCommit(CONFIG_VALUES_PATH, nextValues);
    }
}


const parseBoundary = (input: any) => {
    let obj;
    if (input === undefined || input === null) {
        return {};
    } else if (typeof input === 'boolean') {
        obj = {open: input};
    } else {
        obj = {open: true, ...input};
    }

    return obj;
};


function getLocale(): any {
    return getContext().locale;
}

function getLanguage(): string {
    return getContext().currentGlobalLanguage as any;
}

function getDirection(): boolean {
    return getContext().currentGlobalRtl as any;
}

function getDisplayName(Component: any, options: any = {}): string {
    return options.componentName || options.displayName || Component.displayName || Component.name || 'Component';
}



/**
 * 合并组件props和context配置
 * @param args 参数支持两个或三个
 * props,contextValues,displayName
 * props,displayName
 */
function getContextProps(args: IGetContextProps) {

    let {props, contextValues, displayName} = args;

    if (!contextValues) {
        contextValues = getContext();
    }
    if (!props) {
        props = {};
    }
    if (!displayName) {
        throw new Error('displayName must not empty')
    }


    const {prefix, locale, rtl, device, popupContainer, errorBoundary} = props;

    const newPrefix = prefix || contextValues.prefix;

    let localeFromContext;
    let newDisplayName = displayName;

    switch (displayName) {
        case 'DatePicker2':
            newDisplayName = 'DatePicker';
            break;
        case 'Calendar2':
            newDisplayName = 'Calendar';
            break;
        case 'TimePicker2':
            newDisplayName = 'TimePicker';
            break;
        default:
            break;
    }

    if (contextValues.locale) {
        localeFromContext = contextValues.locale[newDisplayName];
        if (localeFromContext && contextValues.locale.momentLocale) {
            localeFromContext.momentLocale = contextValues.locale.momentLocale;
        }
    }


    const newLocale = obj.deepMerge({},
        zhCN[newDisplayName],
        localeFromContext,
        locale
    );

    const newRtl = typeof rtl === 'boolean' ? rtl : contextValues.rtl;

    // ProtoType of [nextE|e]rrorBoundary can be one of [boolean, object]
    // but typeof newErrorBoundary === 'object'
    // newErrorBoundary should always have the key 'open', which indicates ErrorBoundary on or off
    const newErrorBoundary = {
        ...parseBoundary(contextValues.errorBoundary),
        ...parseBoundary(errorBoundary),
    };

    if (!('open' in newErrorBoundary)) {
        newErrorBoundary.open = false;
    }

    return {
        prefix: newPrefix,
        locale: newLocale,
        rtl: !!newRtl,
        warning: contextValues.warning,
        defaultPropsConfig: contextValues.defaultPropsConfig || {},
        device: device || contextValues.device || undefined,
        popupContainer: popupContainer || contextValues.popupContainer,
        errorBoundary: newErrorBoundary,
    };
}


/**
 * 设置所有文案。
 * @param globalLocales 所有语言下的所有文案。
 */
function initLocales(globalLocales: any) {
    if (!globalLocales) {
        return;
    }

    const currentGlobalLanguage = getLanguage();
    const updates: IConfigValues = {};
    if (globalLocales[currentGlobalLanguage]) {
        updates.locale = globalLocales[currentGlobalLanguage]
    }

    updates.globalLocales = globalLocales;
    setContext(updates);
}


/**
 * 当前语言类型：如：zh-cn / en-us
 * @param language
 */
function setLanguage(language: string) {
    if (language) {
        const oldConfig = getContext();
        const updates: IConfigValues = {};

        const newLocale = {};
        if (oldConfig.locale) {
            Object.assign(newLocale, oldConfig.locale)
        }
        if (oldConfig.globalLocales && oldConfig.globalLocales[language]) {
            Object.assign(newLocale, oldConfig.globalLocales[language])
        }

        updates.locale = newLocale;
        updates.currentGlobalLanguage = language;
        setContext(updates);
    }
}

function setLocale(locale: any) {
    return setContext({locale});
}

function setDirection(dir: string) {
    const currentGlobalRtl = dir === 'rtl';
    return setContext({currentGlobalRtl})
}

const commonPropNames = [
    'prefix',
    'locale',
    'rtl',
    'device',
    'popupContainer'
];


const setMomentLocale = (locale: any) => {
    let moment;
    try {
        if (typeof window !== "undefined") {
            const w = window as any;
            moment = w.moment;
        }
        if (moment && moment.default && moment.default.isMoment) {
            moment = moment.default;
        }
    } catch (e) {
        // ignore
    }
    if (moment && locale && locale.momentLocale) {
        moment.locale(locale.momentLocale);
    }
};

const setDateLocale = (locale: any) => {
    if (locale) {
        if (locale.dateLocale || locale.momentLocale) {
            datejs.locale(locale.dateLocale || locale.momentLocale);
        }
    }
};


const getCommonPropTypes = ()=>{
    return {
        prefix: PropTypes.string,
        locale: PropTypes.object,
        defaultPropsConfig: PropTypes.object,
        errorBoundary: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
        pure: PropTypes.bool,
        warning: PropTypes.bool,
        rtl: PropTypes.bool,
        device: PropTypes.oneOf(['tablet', 'desktop', 'phone']),
        children: PropTypes.any,
        popupContainer: PropTypes.any,
    };
}


const providerFunctions = {
    getContextProps,
    getContext,
    getLocale,
    getLanguage,
    getDirection,
    initLocales,
    setLanguage,
    setLocale,
    setDirection,
    setContext,
    setMomentLocale,
    setDateLocale,
}


export {
    getCommonPropTypes,
    getDisplayName,
    setMomentLocale,
    setDateLocale,
    providerFunctions,
    commonPropNames
}
