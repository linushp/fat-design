import React from "react";
import classnames from 'classnames';
import { ComponentsStore } from "../util/comp";
import { formatUrl, getLastFileNameFromUrl, isImageURL } from "../util/string.js";
import { parseJsonObject } from "../util/func";
import _get from "../util/lodash-get";
import ConfigProvider from "../config-provider";
import './renderFileImage.scss'

function getDep(name: string): any {
    return _get(ComponentsStore.buildInComponents, name);
}

interface IRenderProps {
    value: any;
    prefix?: string;
    isList?: boolean;
}

interface IRenderCfg {
    deep: number;
    index: number;
    prefix: string;
    isList?: boolean;
}

interface IRenderLinkFnProps extends IRenderCfg {
    downloadURL: string,
    imgURL?: string,
    url?: string,
    name?: string,
}

type IRenderLinkFn = (props: IRenderLinkFnProps) => any;


function renderCommonFileCell(value: any, cfg: IRenderCfg, renderLinkFn: IRenderLinkFn) {
    const className = 'fatd-previews-common-file-cell-array';
    const deep = cfg.deep || 0;
    if (!value || deep > 5) {
        return null;
    }

    if (Array.isArray(value) && value.length > 0) {
        const arrRendered = value.map((aa, index) => {
            return renderCommonFileCell(aa, { ...cfg, deep: deep + 1, index }, renderLinkFn);
        });
        return (<div className={className}>{arrRendered}</div>)
    }

    if (typeof value === 'string') {
        const strTrim = value.trim();

        if (strTrim.startsWith('{') && strTrim.endsWith('}')) {
            const obj = parseJsonObject(strTrim); // 是个对象
            return renderCommonFileCell(obj, { ...cfg, deep: deep + 1, index: 0 }, renderLinkFn);
        } else if (strTrim.startsWith('[') && strTrim.endsWith(']')) {
            const arr = parseJsonObject(strTrim) || []; // 可能是个数组
            if (Array.isArray(arr) && arr.length > 0) {
                const arrRendered = arr.map((aa, index) => {
                    return renderCommonFileCell(aa, { ...cfg, deep: deep + 1, index }, renderLinkFn);
                });
                return (<div className={className}>{arrRendered}</div>)
            }
        } else {
            return renderLinkFn({ ...cfg, downloadURL: strTrim });
        }
    }

    if (typeof value === 'object' && value.downloadURL) {
        return renderLinkFn({ ...cfg, ...value })
    }

    return null;
}


function innerRenderLinkFnPropsDownload(props: IRenderLinkFnProps) {
    const className = 'fatd-previews-formats-filedownload';

    const name = props.name;
    const downloadURL = formatUrl(props.downloadURL)
    if (downloadURL && downloadURL.length > 0) {
        if (name) {
            return (
                <a href={downloadURL}
                    key={`download_${props.deep}_${props.index}`}
                    className={className}
                    download={name}
                    target={'_blank'}> 📎{name}</a>
            )
        }
        return (
            <a href={downloadURL}
                key={`download_${props.deep}_${props.index}`}
                className={className}
                target={'_blank'}> 📎下载文件 </a>
        )
    }
    return null;
}


function getWebOfficeExtension() {
    // @ts-ignore
    const FatDesignWebOfficeExtension: any = window.FatDesignWebOfficeExtension
    if (Array.isArray(FatDesignWebOfficeExtension)) {
        return FatDesignWebOfficeExtension;
    }
    return ['xlsx', 'docx', 'pptx', 'pdf', 'json', 'xml', 'txt', 'js', 'css', 'html', 'md', 'csv'];
}



function getFileExtension(name2: string): string {
    const name2Arr = name2.split(".");
    const suffix = "" + (name2Arr[name2Arr.length - 1]);
    return suffix.toLowerCase();
}


function innerRenderFileWebOffice(props: IRenderLinkFnProps) {
    const className = 'fatd-previews-formats-filedownload';
    const webOfficeExtension = getWebOfficeExtension();

    const name = props.name;
    const downloadURL = formatUrl(props.downloadURL)
    if (downloadURL && downloadURL.length > 0) {
        const name2 = "" + (name || getLastFileNameFromUrl(downloadURL));
        const extension = getFileExtension(name2);

        if (webOfficeExtension.includes(extension)) {
            const webOfficeUrl = `/ns/app/weboffice?fileName=${encodeURIComponent(name2)}&fileUrl=${encodeURIComponent(downloadURL)}`
            if (name) {
                return (
                    <a href={webOfficeUrl}
                        key={`download_${props.deep}_${props.index}`}
                        className={className}
                        target={'_blank'}> 📎{name}</a>
                )
            }
            return (
                <a href={webOfficeUrl}
                    key={`download_${props.deep}_${props.index}`}
                    className={className}
                    target={'_blank'}> 📎查看文件 </a>
            )
        }
    }

    return null
}




function innerRenderLinkFnPropsImage(props: IRenderLinkFnProps) {
    const className = `${props.prefix}render-formats-image`;
    const Image = getDep('Image');

    const renderOssImage = (theUrl: string) => {
        if (!theUrl) {
            return null;
        }
        if (!isImageURL(theUrl)) {
            return null;
        }
        //OSS 文件图片文件
        if (theUrl.includes('.aliyuncs.com/') && theUrl.includes('.oss-')) {
            const src = theUrl + "?x-oss-process=image/resize,w_200,p_10/quality,q_60";
            return (
                <Image src={src}
                    key={`img_${props.deep}_${props.index}`}
                    preview={{ icons: {}, src: theUrl, }}
                    width={60}
                    style={{ paddingRight: 5 }}
                    className={className} />
            )
        }
        return null;
    }

    const renderImage = (theUrl: string, thePreviewUrl: string) => {
        if (!theUrl) {
            return null;
        }
        if (!isImageURL(theUrl)) {
            return null;
        }
        return (
            <Image src={theUrl}
                key={`img_${props.deep}_${props.index}`}
                preview={{ icons: {}, src: thePreviewUrl, }}
                width={60}
                style={{ paddingRight: 5 }}
                className={className} />
        )
    }


    const downloadURL = formatUrl(props.downloadURL)
    const imgURL = formatUrl(props.imgURL)
    const url = formatUrl(props.url)
    const previewSrc = url || downloadURL || imgURL;

    const byOssList = [url, imgURL, downloadURL];
    for (let i = 0; i < byOssList.length; i++) {
        const byOssUrl = byOssList[i];
        let ossImage = renderOssImage(byOssUrl);
        if (ossImage) {
            return ossImage;
        }
    }

    const imtUrlList = [imgURL, url, downloadURL];
    for (let i = 0; i < imtUrlList.length; i++) {
        const imtUrl = imtUrlList[i];
        const img = renderImage(imtUrl, previewSrc);
        if (img) {
            return img;
        }
    }

    return null;
}



function renderFileWebOffice(value: any, cfg: IRenderCfg) {
    return renderCommonFileCell(value, cfg, innerRenderFileWebOffice)
}

function renderFileDownload(value: any, cfg: IRenderCfg) {
    return renderCommonFileCell(value, cfg, innerRenderLinkFnPropsDownload)
}

function renderFileImage(value: any, cfg: IRenderCfg) {
    return renderCommonFileCell(value, cfg, innerRenderLinkFnPropsImage);
}

function renderFileAutoBySuffix(value: any, cfg: IRenderCfg) {
    const rendered = renderCommonFileCell(value, cfg, (props: IRenderLinkFnProps) => {
        // 如果是图片
        const imageObj = innerRenderLinkFnPropsImage(props)
        if (imageObj) {
            return imageObj;
        }
        // 如果是word、ppt、excel、pdf等
        const webOfficeObj = innerRenderFileWebOffice(props);
        if (webOfficeObj) {
            return webOfficeObj;
        }
        return innerRenderLinkFnPropsDownload(props);
    });
    const className = classnames({
        ['fatd-previews-auto-suffix']: true,
        ['fatd-previews-auto-suffix-list']: cfg.isList,
    });
    return (<div className={className}>{rendered}</div>)
}

function createComponent(render: any, displayName: string) {
    const RenderFileDownloadImpl = (props: IRenderProps) => {
        const { value, isList } = props;
        const prefix = props.prefix || ConfigProvider.defaultPrefix;
        return render(value, { deep: 0, prefix: prefix, isList });
    };
    RenderFileDownloadImpl.displayName = displayName;
    return React.memo(RenderFileDownloadImpl)
}



const RenderFileDownload = createComponent(renderFileDownload, 'RenderFileDownload')
const RenderFileImage = createComponent(renderFileImage, 'RenderFileImage')
const RenderFileAutoBySuffix = createComponent(renderFileAutoBySuffix, 'RenderFileAutoBySuffix')
const RenderFileWebOffice = createComponent(renderFileWebOffice, 'RenderFileWebOffice')

export {
    RenderFileImage,
    renderFileImage,
    renderFileDownload,
    RenderFileDownload,
    renderFileAutoBySuffix,
    RenderFileAutoBySuffix,
    renderFileWebOffice,
    RenderFileWebOffice,
};

export type {
    IRenderProps,
    IRenderCfg,
    IRenderLinkFnProps,
    IRenderLinkFn
};
