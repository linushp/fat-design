import React from "react";
import { IConfigProviderProps, IGetContextProps } from "./types";
declare class ConfigProvider extends React.Component<IConfigProviderProps, any> {
    static defaultPrefix: string;
    static propTypes: {
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
    static config<T>(Component: any, options?: any): T;
    static configFn<T>(Component: any, options?: any): T;
    static getContext(): import("./types").IConfigValues;
    static getContextProps(args: IGetContextProps): any;
    static initLocales(locales: any): void;
    static setLanguage(language: string): void;
    static setLocale(locale: any): void;
    static setDirection(dir: string): any;
    static getLocale(): any;
    static getLanguage(): string;
    static getDirection(): string;
    static getPrefix(): string;
    static createBoolComponent(Component: any, displayName?: string): {
        (props: any): React.JSX.Element;
        displayName: string;
    };
    constructor(props: IConfigProviderProps);
    render(): React.JSX.Element;
}
export { ConfigProvider };
