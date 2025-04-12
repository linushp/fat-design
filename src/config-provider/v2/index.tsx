import React from "react";
import {getCommonPropTypes, providerFunctions} from "./functions";
import {withConsumer} from "./consumer";
import {ConfigProvider as ConfigProviderV2} from "./provider";
import {defaultPrefix} from "../constants";
import {IConfigProviderProps, IGetContextProps} from "./types";


class ConfigProvider extends React.Component<IConfigProviderProps, any> {

    static defaultPrefix = defaultPrefix;

    static propTypes = getCommonPropTypes();

    static config<T>(Component: any, options?: any): T {
        return withConsumer(Component, options) as T;
    }

    static configFn<T>(Component: any, options?: any): T {

        const defaultProps = Component.defaultProps;
        const propTypes = Component.propTypes;
        if (defaultProps || propTypes) {
            delete Component.defaultProps;
            delete Component.propTypes;
        }

        const Component1 = React.forwardRef((props,ref)=>{
            return <Component {...props} />
        });

        if (defaultProps) {
            Component1.defaultProps = defaultProps;
            Component1.propTypes = propTypes;
        }

        const Component2 = React.memo(Component1);

        if (!options) {
            options = {};
        }
        if (!options.displayName && Component.displayName) {
            options.displayName = Component.displayName;
        }

        return withConsumer(Component2, options) as T;
    }

    static getContext() {
        return providerFunctions.getContext();
    }

    static getContextProps(args: IGetContextProps): any {
        return providerFunctions.getContextProps(args);
    }

    static initLocales(locales: any) {
        return providerFunctions.initLocales(locales);
    }

    static setLanguage(language: string) {
        return providerFunctions.setLanguage(language);
    }

    static setLocale(locale: any) {
        return providerFunctions.setLocale(locale);
    }

    static setDirection(dir: string): any {
        return providerFunctions.setDirection(dir);
    }

    static getLocale(): any {
        return providerFunctions.getLocale();
    }

    static getLanguage(): string {
        return "" + providerFunctions.getLanguage();
    }

    static getDirection(): string {
        return "" + providerFunctions.getDirection();
    }

    static getPrefix(): string {
        return "" + providerFunctions.getContext().prefix;
    }


    static createBoolComponent(Component: any, displayName?: string) {
        const BoolComponent = (props: any) => {
            const {value, ...otherProps} = props;
            if (typeof value === 'boolean') {
                otherProps.checked = value;
            }
            return <Component {...otherProps}/>
        }
        if (displayName) {
            BoolComponent.displayName = displayName;
            Component[displayName] = BoolComponent;
        }
        return BoolComponent;
    }


    constructor(props: IConfigProviderProps) {
        super(props);
    }

    render() {
        const props = this.props;
        return (
            <ConfigProviderV2 {...props} />
        )
    }
}


export {
    ConfigProvider
}
