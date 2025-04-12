export interface IConfigValues {
    prefix?: string | null,
    locale?: any | null, // 单一语言下的所有文案。
    defaultPropsConfig?: any | null, // 适用所有组件
    warning?: boolean | null,
    rtl?: boolean | null,
    device?: string | null,
    popupContainer?: any | null,
    errorBoundary?: any | null,
    globalLocales?: any | null, // 所有语言下的所有文案。
    currentGlobalLanguage?: string | null, // 当前语言类型：如：zh-cn / en-us
    currentGlobalRtl?: boolean | null,
    providerTick?: number,
}

export interface IConfigProviderProps extends IConfigValues{
    children?: any;
}


export interface IGetContextProps {
    props: any ; // 组件自己的props，不能为空
    displayName: string; // 组件名称，不能为空
    contextValues?: IConfigValues; // Context的配置，可以为空
}
