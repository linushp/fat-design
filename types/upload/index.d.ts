/// <reference types="react" />

import * as React from 'react';
import CommonProps from '../util';
import { ProgressProps } from '../progress';

interface HTMLAttributesWeak extends React.HTMLAttributes<HTMLElement> {
    onError?: any;
    onSelect?: any;
    defaultValue?: any;
    onChange?: any;
}

export interface UploadError extends Error {
    code?: string;
    status?: number;
    method?: string;
    url?: string;
}


export interface UploadProgressEvent extends ProgressEvent {
    percent?: number;
}

export interface UploadOptions {
    beforeUpload?: (file: UploadFile, data: unknown) => boolean | object | unknown;
    onProgress?: (e: UploadProgressEvent, file?: UploadFile) => void;
    onSuccess?: (ret: unknown, xhr?: XMLHttpRequest | UploadFile) => void;
    onError?: (err: ProgressEvent | UploadError, param: unknown, file?: UploadFile) => void;
    data?: UploadProps['data'];
    name?: string;
    method?: 'post' | 'put' | 'POST' | 'PUT';
    action?: string;
    headers?: { [key: string]: unknown; 'X-Requested-With'?: string | undefined };
    withCredentials?: boolean;
    request?: (option: object) => { abort?: (() => void) | undefined };
    file?: UploadFile;
    filename?: string;
    timeout?: number;
}


export interface CommonModifiedFile {
    uid?: string | number;
    error?: unknown;
    percent?: number;
    state?: string;
    lastModifiedDate?: Date;
    filename?: string;
    readonly name: string;
}

export type BeforeUploadOption = {
    action?: string;
    headers?: object;
    timeout?: number;
    withCredentials?: boolean;
    method?: string;
    data?: object;
};

export interface UploadFile extends CommonModifiedFile, File {
    url?: string;
}



export interface ObjectFile extends CommonModifiedFile {
    lastModified?: number;
    lastModifiedDate?: Date;
    size?: number;
    type?: string;
    originFileObj?: UploadFile;
    imgURL?: string;
    downloadURL?: string;
    url?: string;
    errorMsg?: string;
    errorText?: string;
    fileURL?: string;
    tempUrl?: string;
    alt?: string;
}



export interface CardProps extends HTMLAttributesWeak, CommonProps {
    /**
     * 上传的地址
     */
    action?: string;

    /**
     * 是否支持多选文件，`ie10+` 支持。开启后按住 ctrl 可选择多个文件
     */
    multiple?: boolean;

    /**
     * 展示下载按钮
     */
    showDownload?: boolean;

    /**
     * 接受上传的文件类型 (image/png, image/jpg, .doc, .ppt) 详见 [input accept attribute](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#attr-accept)
     */
    accept?: string;


    /**
     * 上传额外传参
     * @en Upload extra parameters
     */
    data?:
        | { [key: string]: string | Blob }
        | ((file: UploadFile) => { [key: string]: string | Blob });

    /**
     * 设置上传的请求头部
     */
    headers?: any;

    /**
     * 是否允许请求携带 cookie
     */
    withCredentials?: boolean;

    /**
     * 可选参数，详见 [beforeUpload](#beforeUpload)
     * @en Optional parameters, see [beforeUpload](#beforeUpload)
     * @param file - 所有文件 - all file
     * @param options - 参数 -  parameters
     * @defaultValue func.noop
     */
    beforeUpload?: (file: UploadFile, options: BeforeUploadOption) => boolean | object | unknown;


    /**
     * 上传中
     * @en onProgress Callback
     * @defaultValue func.noop
     */
    onProgress?: (file: ObjectFile[], e: ObjectFile) => void;

    /**
     * 可选参数，上传成功回调函数，参数为请求下响应信息以及文件
     * @en Optional parameters, upload success callback function, the parameter is the response information and file
     * @param file - 文件 - file
     * @param value - 值 - value
     * @defaultValue func.noop
     */
    onSuccess?: (file: ObjectFile, value?: ObjectFile[]) => void;

    /**
     * 可选参数，上传失败回调函数，参数为上传失败的信息、响应信息以及文件
     * @en Optional parameters, upload failure callback function, the parameter is the upload failure information, response information and file
     * @param file - 出错的文件 - error file
     * @param value - 当前值 - current value
     * @defaultValue func.noop
     */
    onError?: (file: ObjectFile, value: ObjectFile[]) => void;

    /**
     * 子元素
     */
    children?: any;

    /**
     * 设置上传超时,单位ms
     */
    timeout?: number;

    /**
     * 上传方法
     * @en Upload method
     * @defaultValue 'post'
     */
    method?: 'post' | 'put' | 'POST' | 'PUT';

    /**
     * 自定义上传方法
     * @en Custom upload method
     * @param option - 参数 - parameters
     * @returns - 返回值 - object with abort method
     */
    request?: (option: any) => any;

    /**
     * 文件名字段
     */
    name?: string;


    /**
     * 选择文件回调
     * @en Select file callback
     * @defaultValue func.noop
     */
    onSelect?: (uploadFiles: any[]) => any;


    /**
     * 放文件
     * @en Drop file
     * @defaultValue func.noop
     */
    onDrop?: (files: UploadFile[]) => void;

    /**
     * 样式前缀
     */
    prefix?: string;

    /**
     * 文件列表
     * @en File list
     */
    value?: ObjectFile[] | ObjectFile;

    /**
     * 默认文件列表
     */
    defaultValue?: ObjectFile[] | ObjectFile;

    /**
     * 上传按钮形状
     */
    shape?: 'card';

    /**
     * 上传列表的样式
     */
    listType?: 'text' | 'image' | 'card';

    /**
     * 数据格式化函数，配合自定义 action 使用，参数为服务器的响应数据，详见 [formatter](#formater)
     */
    formatter?: (response: {}, file: any) => void;

    /**
     * 最大文件上传个数
     */
    limit?: number;

    /**
     * 可选参数，是否支持拖拽上传，`ie10+` 支持。
     */
    dragable?: boolean;

    /**
     * 可选参数，是否本地预览
     */
    useDataURL?: boolean;

    /**
     * 可选参数，是否禁用上传功能
     */
    disabled?: boolean;

    /**
     * 改变时候的回调
     */
    onChange?: (value: File[]) => void;

    /**
     * 可选参数, 用于校验文件,afterSelect仅在 autoUpload=false 的时候生效,autoUpload=true时,可以使用beforeUpload完全可以替代该功能.
     */
    afterSelect?: (file: {}) => boolean;

    /**
     * 点击移除的回调
     */
    onRemove?: () => void;

    /**
     * 自定义class
     */
    className?: string;

    /**
     * 自定义内联样式
     */
    style?: React.CSSProperties;

    /**
     * 自动上传
     */
    autoUpload?: boolean;

    /**
     * 透传给Progress props
     */
    progressProps?: ProgressProps;

    /**
     * 点击图片回调
     * @en Click image callback
     * @skip
     */
    onPreview?: (file: UploadFile, e?: MouseEvent<HTMLElement>) => void;

    /**
     * 取消上传的回调
     */
    onCancel?: () => void;
    /**
     * 调用系统设备媒体
     */
    capture?: string;

    /**
     * 自定义成功和失败的列表渲染方式
     */
    itemRender?: (file: UploadFile, obj: { remove?: () => void }) => React.ReactNode;

    /**
     * 选择新文件上传并替换
     */
    reUpload?: boolean;
}

export class Card extends React.Component<CardProps, any> {}

export interface SimpleJSONUploadProps extends UploadProps, CardProps {
    uploadComponent?: any; // 可以指定上传组件
    /**
     * 上传文件改变时的状态。两个参数的OnChange函数，可以接收最原始的返回值。
     */
    onChange2?: (value: File[], originNextValue: any) => void;
}

export class SimpleJSONUpload extends React.Component<SimpleJSONUploadProps, any> {} {

}


export interface DraggerProps extends UploadProps {

}

export class Dragger extends React.Component<DraggerProps, any> {}

export interface SelecterProps extends HTMLAttributesWeak, CommonProps {
    /**
     * 是否禁用上传功能
     */
    disabled?: boolean;

    /**
     * 是否支持多选文件，`ie10+` 支持。开启后按住 ctrl 可选择多个文件
     */
    multiple?: boolean;

    /**
     * 是否支持拖拽上传，`ie10+` 支持。
     */
    dragable?: boolean;

    /**
     * 接受上传的文件类型 (image/png, image/jpg, .doc, .ppt) 详见 [input accept attribute](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#attr-accept)
     */
    accept?: string;

    /**
     * 文件选择回调
     */
    onSelect?: (e: React.ChangeEvent<HTMLInputElement>) => void;

    /**
     * 拖拽经过回调
     */
    onDragOver?: () => void;

    /**
     * 拖拽离开回调
     */
    onDragLeave?: () => void;

    /**
     * 拖拽完成回调
     */
    onDrop?: () => void;

    /**
     * 是否支持上传文件夹，仅在 chorme 下生效
     */
    webkitdirectory?: boolean;
}

export class Selecter extends React.Component<SelecterProps, any> {}

export class Uploader {
    /**
     * @param options 配置
     */
    constructor(options?: any);

    /**
     * 配置选项
     * @param options 配置
     */
    setOptions(options: any): void;
    /**
     * 开始上传
     * @param files 文件列表
     */
    startUpload(files: Array<any>): void;
    /**
     * 中断某个文件上传
     * @param file 文件
     */
    abort(file: any): void;
}


export interface UploadProps extends HTMLAttributesWeak, CommonProps {
    /**
     * 上传的地址
     */
    action?: string;

    /**
     * 接受上传的文件类型 (image/png, image/jpg, .doc, .ppt) 详见 [input accept attribute](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#attr-accept)
     */
    accept?: string;

    /**
     * 上传额外传参
     */
    data?: any | (() => void);

    /**
     * 是否支持多选文件，`ie10+` 支持。开启后按住 ctrl 可选择多个文件
     */
    multiple?: boolean;

    /**
     * 设置上传的请求头部
     */
    headers?: any;

    /**
     * 是否允许请求携带 cookie
     */
    withCredentials?: boolean;


    /**
     * 可选参数，详见 [beforeUpload](#beforeUpload)
     * @en Optional parameters, see [beforeUpload](#beforeUpload)
     * @param file - 所有文件 - all file
     * @param options - 参数 -  parameters
     * @defaultValue func.noop
     */
    beforeUpload?: (file: UploadFile, options: BeforeUploadOption) => boolean | object | unknown;


    /**
     * 上传中
     * @en onProgress Callback
     * @defaultValue func.noop
     */
    onProgress?: (file: ObjectFile[], e: ObjectFile) => void;

    /**
     * 可选参数，上传成功回调函数，参数为请求下响应信息以及文件
     * @en Optional parameters, upload success callback function, the parameter is the response information and file
     * @param file - 文件 - file
     * @param value - 值 - value
     * @defaultValue func.noop
     */
    onSuccess?: (file: ObjectFile, value?: ObjectFile[]) => void;

    /**
     * 可选参数，上传失败回调函数，参数为上传失败的信息、响应信息以及文件
     * @en Optional parameters, upload failure callback function, the parameter is the upload failure information, response information and file
     * @param file - 出错的文件 - error file
     * @param value - 当前值 - current value
     * @defaultValue func.noop
     */
    onError?: (error: UploadError, res?:any, file?:any) => void;


    /**
     * 子元素
     */
    children?: React.ReactNode;

    /**
     * 设置上传超时,单位ms
     */
    timeout?: number;

    /**
     * 上传方法
     */
    method?: 'post' | 'put';

    /**
     * 自定义上传方法
     */
    request?: (option: any) => any;

    /**
     * 文件名字段
     */
    name?: string;


    /**
     * 选择文件回调
     * @en Select file callback
     * @defaultValue func.noop
     */
    onSelect?: (uploadFiles: any[]) => any;

    /**
     * 放文件
     * @en Drop file
     * @defaultValue func.noop
     */
    onDrop?: (files: UploadFile[]) => void;


    /**
     * 样式前缀
     */
    prefix?: string;

    /**
     * 文件列表
     */
    value?: Array<any>;

    /**
     * 默认文件列表
     */
    defaultValue?: Array<any>;

    /**
     * 上传按钮形状
     */
    shape?: 'card';

    /**
     * 上传列表的样式
     */
    listType?: 'text' | 'image' | 'card';

    /**
     * 数据格式化函数，配合自定义 action 使用，参数为服务器的响应数据，详见 [formatter](#formater)
     */
    formatter?: (response: any, file: any) => void;

    /**
     * 自定义渲染List的图标
     * @param img
     * @param imgURL
     * @param file
     */
    thumbnailRender?: (img:any, imgURL:any, file:any)=> any;

    /**
     * 最大文件上传个数
     */
    limit?: number;

    /**
     * 可选参数，是否支持拖拽上传，`ie10+` 支持。
     */
    dragable?: boolean;

    /**
     * 可选参数，是否本地预览
     */
    useDataURL?: boolean;

    /**
     * 可选参数，是否禁用上传功能
     */
    disabled?: boolean;

    /**
     * 上传文件改变时的状态
     */
    onChange?: (value: File[]) => void;

    /**
     * 可选参数, 用于校验文件,afterSelect仅在 autoUpload=false 的时候生效,autoUpload=true时,可以使用beforeUpload完全可以替代该功能.
     */
    afterSelect?: (file: any) => boolean;

    /**
     * 移除文件回调函数
     */
    onRemove?: (file: any) => boolean | any;

    /**
     * 自定义额外渲染
     */
    extraRender?: (file: File) => any;
    /**
     * 自定义文件名渲染
     */
    fileNameRender?: (file: File) => any;
    /**
     * 自定义操作区域渲染
     */
    actionRender?: (file: ObjectFile) => any;
    /**
     * 自定义class
     */
    className?: string;

    /**
     * 自定义内联样式
     */
    style?: React.CSSProperties;

    /**
     * 自动上传
     */
    autoUpload?: boolean;

    /**
     * 透传给Progress props
     */
    progressProps?: ProgressProps;

    /**
     * 是否为预览态
     */
    isPreview?: boolean;

    /**
     * 预览态模式下渲染的内容
     */
    renderPreview?: (value: number) => void;

    /**
     * 文件对象的 key name
     */
    fileKeyName?: string;

    /**
     * 点击图片回调
     * @en Click image callback
     * @skip
     */
    onPreview?: (file: UploadFile, e?: MouseEvent<HTMLElement>) => void;

    /**
     * 点击文件名时触发 onPreview
     * @version 1.24
     */
    previewOnFileName?: boolean;

    /**
     * 自定义成功和失败的列表渲染方式，仅在 listType 是 card/image 时生效
     * @en Customize success and failure list rendering, only in listType is card or image
     */
    itemRender?: (file: UploadFile, action?: { remove?: () => void }) => ReactNode;

    /**
     * 选择新文件上传并替换
     */
    reUpload?: boolean;
    webkitdirectory?: boolean;
}

export enum ErrorCode {
    EXCEED_LIMIT = 'EXCEED_LIMIT',
    BEFOREUPLOAD_REJECT = 'BEFOREUPLOAD_REJECT',
    RESPONSE_FAIL = 'RESPONSE_FAIL',
}

export default class Upload extends React.Component<UploadProps, any> {
    static Card: typeof Card;
    static Dragger: typeof Dragger;
    static Selecter: typeof Selecter;
    static Uploader: typeof Uploader;
    static SimpleJSONUpload: typeof SimpleJSONUpload;
    static ErrorCode: typeof ErrorCode;

    /**
     * 添加文件
     * @param files
     */
    selectFiles: (file: File) => void;
    /**
     * 控制文件上传
     */
    startUpload: () => void;
    /**
     * 控制文件上传
     * @param file 文件
     */
    uploadFiles: (file: File) => void;
    /**
     * 替换文件
     */
    replaceFiles: (old: object, current: object) => void;
    /**
     * 上传状态
     */
    isUploading: () => boolean;
    /**
     * 中断某个文件上传
     * @param file 文件
     */
    abort: (file: File) => void;
}
