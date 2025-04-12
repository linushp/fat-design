import React, {useMemo} from "react";
import {configContext} from "./context.js";
import {providerFunctions} from "./functions.js";
import {IConfigProviderProps, IConfigValues} from "./types";
import {pickProps} from "../../util/object";
import {shallowEqual} from "../../util/shallowEqual";
import {logger} from "../../util/log";

const Provider = configContext.Provider;


const ConfigProviderImpl: any = React.memo<any>(function (props: any) {
    const {configValues, children} = props;
    logger.debug("ConfigProviderImpl render");
    return (
        <Provider value={configValues}>
            {children}
        </Provider>
    );
}, (prevProps: any, nextProps: any) => {
    return shallowEqual(prevProps.configValues, nextProps.configValues) && prevProps.children === nextProps.children;
});


const configProviderPropsName = [
    'prefix',
    'locale',
    'defaultPropsConfig',
    'warning',
    'rtl',
    'device',
    'popupContainer',
    'errorBoundary',
    'globalLocales',
    'currentGlobalLanguage',
    'currentGlobalRtl',
    'providerTick',
];

function ConfigProvider(props: IConfigProviderProps) {
    const {children, ...otherProps} = props;

    const propValues = configProviderPropsName.map((name) => {
        const propsAny = props as any;
        return "" + propsAny[name];
    });


    // 只有内容发生变化时，configValues对象才会更新。
    const configValues: IConfigValues = useMemo(() => {
        const valueNames = configProviderPropsName.filter((name) => {
            const propsAny = props as any;
            return typeof propsAny[name] !== "undefined";
        });
        const nextProps = pickProps(valueNames, props);
        providerFunctions.setContext(nextProps, true);
        return nextProps;
    }, [propValues.join('-')]);


    const locale = configValues.locale;

    useMemo(() => {
        if (locale) {
            providerFunctions.setMomentLocale(locale);
            providerFunctions.setDateLocale(locale);
        }
    }, [locale]);


    return (<ConfigProviderImpl configValues={configValues} children={children}/>);
}


export {
    ConfigProvider
}
