/// <reference types="prop-types" />
import React from "react";
import { IConfigProviderProps, IGetContextProps } from "./types";
declare class ConfigProvider extends React.Component<IConfigProviderProps, any> {
    static defaultPrefix: string;
    static propTypes: {
        prefix: import("prop-types").Requireable<string>;
        locale: import("prop-types").Requireable<object>;
        defaultPropsConfig: import("prop-types").Requireable<object>;
        errorBoundary: import("prop-types").Requireable<NonNullable<boolean | object>>;
        pure: import("prop-types").Requireable<boolean>;
        warning: import("prop-types").Requireable<boolean>;
        rtl: import("prop-types").Requireable<boolean>;
        device: import("prop-types").Requireable<string>;
        children: import("prop-types").Requireable<any>;
        popupContainer: import("prop-types").Requireable<any>;
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
        (props: any): import("react/jsx-runtime").JSX.Element;
        displayName: string;
    };
    constructor(props: IConfigProviderProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export { ConfigProvider };
