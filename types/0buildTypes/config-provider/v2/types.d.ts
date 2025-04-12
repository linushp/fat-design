export interface IConfigValues {
    prefix?: string | null;
    locale?: any | null;
    defaultPropsConfig?: any | null;
    warning?: boolean | null;
    rtl?: boolean | null;
    device?: string | null;
    popupContainer?: any | null;
    errorBoundary?: any | null;
    globalLocales?: any | null;
    currentGlobalLanguage?: string | null;
    currentGlobalRtl?: boolean | null;
    providerTick?: number;
}
export interface IConfigProviderProps extends IConfigValues {
    children?: any;
}
export interface IGetContextProps {
    props: any;
    displayName: string;
    contextValues?: IConfigValues;
}
