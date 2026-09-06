import {TinyEmitter} from "../util/tiny-emitter";

export interface ResponsiveGridProps {
    prefix?: string,
    className?: any,
    device?: string,
    rows?: number | string,
    columns?: number | string,
    gap?: number | number[],
    component?: any,
    dense?: boolean,
    style?: any
}


export interface FloatLayoutProps {
    className?: any,
    itemWidth: number,
}

type IFunc = (e: any, e2?: any) => any;
type IReactElement = any;
type IReactComponent = any;
type IObject = any;

export enum SizeEnum {
    large = "large",
    small = "small",
    medium = "medium",
}

export enum LayoutEnum {
    responsive = 'responsive',
    float = 'float',
    custom = 'custom',
    null = 'null' // 没有布局
}

export enum LabelAlignEnum {
    top = 'top',
    left = 'left',
    inset = 'inset'
}

export enum LabelTextAlignEnum {
    left = 'left',
    right = 'right'
}

export enum FormItemStateEnum {
    error = 'error',
    warning = 'warning',
    ok = 'ok'
}

export interface ILabelValue {
    label: string;
    value: string;
}

export interface IItemState {
    errors: IValidateStateError[],
    display: boolean;
    disabled: boolean;
    isPreview: boolean;

}

/**
 * 存储在Store中的
 */
export interface FormItemStateSaved {
    errors?: any[], // 错误信息
    required: boolean; // 是否必填
    display: boolean; // 是否显示
    disabled: boolean; // 是否禁用状态
    isPreview: boolean; // 是否只读
    label: string; // 前面显示的标签名
    xProps?: any; // 使用的表单组件属性
    forceUpdateTick?: number
}

/**
 * 数据计算使用的
 */
export interface FormItemState extends FormItemStateSaved{
    value: any;
    state?: string,
    stateMessage?: string;
}


/**
 * 校验规则
 */
export interface FormItemValidateRule {
    message?: string; // 校验错误时的提示信息
    trigger?: string;
    validator?: FnValidator; // 自定义函数
    pattern?: RegExp | string; // 正则表达式 或 字符串形式的正则表达式
    minLength?: number; // 字符串 最小长度
    maxLength?: number; // 字符串 最大长度
    min?: number, // 数字 最小值
    max?: number, // 数字 最大值
}

export interface CustomLayoutProps {
    layoutComponent: any;
}


export interface TableLayoutCellProps {
    rowSpan: number;
    colSpan: number;
    children: any;
}

export interface FnFormOnChangeParams {
    values : any,
    stateMap : any,
    storeData : any,
    formStore : any,
    formActions : any,
    defaultValues: any,
    runtimeParams: any,
    valuesOfOnSearch: any,
    eventArgs?: any[] // onChange事件本身的参数。
}

export interface FnValidatorObjRes {
    message: string
}

export type FnGetStateBool = (values: any, storeData: any) => boolean;
export type FnGetXProps = (values: any, storeData: any) => any;
export type FnGetEnums = (childProps: any, params: FnFormOnChangeParams) => ILabelValue[] | Promise<ILabelValue[]>;
export type FnValidator = (rule: FormItemValidateRule, value: any) => Promise<string | FnValidatorObjRes> | string | FnValidatorObjRes | null;

export type FnFormOnCreated = (values, params: FnFormOnChangeParams) => any;
export type FnFormOnChange = (values: any, params: FnFormOnChangeParams) => any;
export type FnFormItemOnChange = (value: any, params: FnFormOnChangeParams) => any;
export type FnFormOnSubmit = (values: any, params: FnFormOnChangeParams) => any;

export type TypeHelpPos  = "tip" | 'always' | 'bottom'


export type TypeFormItemSchemaFormat = 'number' | 'tel' | 'url'  | 'email';


export interface FormItemSchema {
    id?: string;
    label?: string | IReactElement;
    size?: SizeEnum | string,
    labelCol?: any;
    wrapperCol?: any;
    hasFeedback?: boolean;
    help?: IFunc; //return dom
    component?: string | IReactComponent;
    labelAlign?: LabelAlignEnum;
    labelTextAlign?: LabelTextAlignEnum;
    labelWidth?: number;
    device?: string;
    colon?: boolean;
    children?: any;

    xProps?: any | FnGetXProps;

    /**
     * 布局方式
     */
    layout?: LayoutEnum | string;

    cellProps?: any | TableLayoutCellProps;

    className?: string;
    style?: any;
    prefix?: string;
    fullWidth?: boolean;

    render?: (value: any, childProps: any) => any;
    renderPreview?: (value: any, childProps: any) => any;
    renderExtra?: (value: any, wrapFormItemProps: any) => any;

    previewPlaceholder?: string;

    isPreview?: boolean | FnGetStateBool;  // 状态相关：是否只用来显示，不可编辑
    display?: boolean | FnGetStateBool;  // 状态相关：是否显示
    disabled?: boolean | FnGetStateBool;  // 状态相关：是否不可编辑

    deps?: string[], // 依赖其他values，当其他values变化时，此组件强制render


    // 枚举值
    enums?: ILabelValue[] | FnGetEnums,

    // 校验相关的参数
    autoValidate?: boolean;
    max?: number; // 用于校验：校验数字类型的最大值
    min?: number; // 用于校验：校验数字类型的最小值
    format?: TypeFormItemSchemaFormat; // 用于校验：一些常见的固定格式
    pattern?: RegExp | string; // 用于校验：正则表达式 或 字符串形式的正则表达式
    required?: boolean | FnGetStateBool; // 用于校验：是否必填
    requiredMessage?: string; // 用于校验：必填条件不满足时的错误信息
    length?: number; // 用于校验：校验字符串长度只能是这个值
    maxLength?: number;  // 用于校验：校验字符串类型的最小长度
    minLength?: number; // 用于校验：校验字符串类型的最大长度
    validator?: FnValidator; // 用于校验：自定义的校验函数
    errorMessageName?: string;
    useLabelForErrorMessage?: boolean;
    rules?: FormItemValidateRule[]; // 用于校验：【高级用法】多个校验规则可以组合使用。
    helpPos?: TypeHelpPos; // 错误提示显示位置： tip，bottom（default）
    onChange?: FnFormItemOnChange,
    description?: string;
}


export interface FormItemProps extends FormItemSchema {
    /**
     * 字段名。RangePicker 等范围组件可使用复合语法 `[startField,endField]`，
     * 将组件的数组值分别映射到 values 中的多个字段。
     */
    name: string;
    extItemClassName?: string;
}



export interface FormSchema {
    type: string; // object
    properties: Record<string, FormItemSchema>;
}


/**
 * 表单Props
 */
export interface FormProps {

    /**
     * 是否显示默认的提交按钮。默认 false
     */
    submitter?: boolean,

    /**
     * 样式前缀
     */
    prefix?: string,

    /**
     * 内联表单
     */
    inline?: boolean,

    /**
     * 单个 Item 的 size 自定义，优先级高于 Form 的 size, 并且当组件与 Item 一起使用时，组件自身设置 size 属性无效。
     * @enumdesc 大, 中, 小
     */
    size?: string | SizeEnum,

    /**
     * 单个 Item 中表单类组件宽度是否是100%
     */
    fullWidth?: boolean,

    /**
     * 标签的位置, 如果不设置 labelCol 和 wrapperCol 那么默认是标签在上
     * @enumdesc 上, 左, 内
     */
    labelAlign?: string | LabelAlignEnum,

    /**
     * 标签的左右对齐方式
     * @enumdesc 左, 右
     */
    labelTextAlign?: string | LabelTextAlignEnum,

    /**
     * 控制第一级 Item 的 labelCol
     */
    labelCol?: IObject,

    /**
     * 控制第一级 Item 的 wrapperCol
     */
    wrapperCol?: IObject,

    /**
     * FormSubmit按钮会触发
     */
    onSubmit?: FnFormOnSubmit,

    /**
     * FormSubmit按钮会触发
     */
    onReset?: FnFormOnSubmit,

    /**
     * 组件创建完毕
     */
    onCreated?: FnFormOnCreated,

    /**
     * 表单变化回调
     */
    onChange?: FnFormOnChange,


    /**
     * 异步枚举值加载完成
     */
    onAsyncEnums?: FnGetEnums,

    /**
     * 子元素
     */
    children?: any,

    /**
     * 子元素schema模式
     */
    schema?: FormSchema | null,

    /**
     * 扩展class
     */
    className?: string,

    /**
     * 自定义内联样式
     */
    style?: IObject,


    /**
     * 是否是从从右往左的布局样式
     */
    rtl?: boolean,

    /**
     * 布局方式
     */
    layout?: LayoutEnum | null;

    /**
     * 布局组件使用的参数
     */
    layoutProps?: ResponsiveGridProps | CustomLayoutProps | FloatLayoutProps | null;


    /**
     * 是否使用 label 替换校验信息的 name 字段
     */
    useLabelForErrorMessage?: boolean,

    /**
     * 表示是否显示 label 后面的冒号
     */
    colon?: boolean,

    /**
     * 渲染设备。可选值：phone、desktop
     */
    device?: string,

    /**
     * 表单默认值
     */
    defaultValues?: any;

    /**
     * Form内可以使用的组件定义components
     */
    components?: Record<string, IReactComponent>;

    /**
     * 是否处于预览状态， 默认： false
     */
    isPreview?: boolean | FnGetStateBool;

    /**
     * 是否处于禁用状态，默认：false
     */
    disabled?: boolean | FnGetStateBool;

    /**
     * 是否处于显示状态，默认 true
     */
    display?: boolean | FnGetStateBool;

    /**
     * 自定义预览状态渲染
     */
    renderPreview?: IFunc;

    /**
     * 在预览状态下，对于空值的占位符，默认： --
     */
    previewPlaceholder?: string;

    /**
     * 错误提示显示位置： tip，bottom（default）
     */
    helpPos?: string;

    /**
     * 是否表单创建完成后，自动触发校验。
     */
    autoValidateOnCreated?: boolean;

    /**
     * 自动校验
     */
    autoValidate?: boolean;

    /**
     * 表单内部的多语言配置对象
     */
    locale?: any;
}


export interface IValidateStateError {
    message: string;
}


export interface IFormStoreValues {
    stateMap: Record<string, IItemState>;
    defaultValues: Record<string, any>; // 默认值
    values: Record<string, any>; // 当前值
    runtimeParams: any,
    valuesOfOnSearch: any,
}

export interface IFormContext {
    formProps: FormProps;
    formStore: any;
    formActions: any; // FormActions
    formComponents: any; //所有可用的组件
    formOnChange: any; // 参数是：formStore
    formEventBus: TinyEmitter; //TinyEmitter
}

export interface WrapFormItemProps {
    formItemProps: FormItemProps,
    formItemState: FormItemState,
    formContext: IFormContext,
}

export interface FormStoreExtData1 {
    propsMap: Record<string, any>  // key -> id
}

export interface IFormSectionProps extends FormProps {
    useCard?: boolean,
    title?: string,
}

export interface IFormSectionContext {
    sectionProps: IFormSectionProps,
}


export interface BaseBtnProps {
    type?: any;
    onClick?: any;
    children?: any;
    text?: string;
    bizCallback?: any;
    localKey: string;
    xProps?: any
    htmlType?: string
}

export interface ResetProps extends BaseBtnProps {
    toDefault?: boolean;
    names?: string[] | string,
    exclude?: string[],
}


export interface SubmitProps extends BaseBtnProps {
    validate?: boolean;
    showToast?: boolean;
}

export interface FormButtonGroupBtn extends Record<string, any> {
    component: string | any;
}


export interface FormButtonGroupProps {
    id: string;
    buttons: FormButtonGroupBtn[];
    className?: string;
}


export interface IFormItemCardProps {
    title?: string;
    children?:any;
    prefix?: string;
    cardProps?:any;
}
