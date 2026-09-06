import React, {useMemo} from "react";
import Upload from './upload';
import {getByAny, parseJsonObject} from "../util/func";
import classnames from "classnames";
import ConfigProvider from "../config-provider";
import {RenderFileAutoBySuffix, RenderFileDownload, RenderFileImage, RenderFileWebOffice} from "../previews/renderFileImage";
import {getLastFileNameFromUrl} from "../util/string";

const defaultPrefix = ConfigProvider.defaultPrefix;


const formatItem = (item) => {
    const state = item.state;
    const name = item.name;
    const size = item.size;
    const downloadURL = getByAny(item, [
        'downloadURL',
        'response.downloadURL',
        'response.data.downloadURL',
    ]);
    const imgURL = getByAny(item, [
        'imgURL',
        'response.imgURL',
        'response.data.imgURL',
        'response.thumbnailURL',
        'response.data.thumbnailURL',
    ]);
    const url = getByAny(item, [
        'url',
        'response.url',
        'response.data.url',
    ]);
    return {
        name,
        state,
        size,
        downloadURL,
        imgURL,
        url
    }
}


const PreviewModeAutoBySuffix = React.memo((props) => {
    const {value, isList} = props;
    if (!value) {
        return (<span/>)
    }
    return <RenderFileAutoBySuffix value={value} isList={isList}/>
});


const PreviewModeDownload = React.memo((props) => {
    const {value} = props;
    if (!value) {
        return (<span/>)
    }
    return <RenderFileDownload value={value}/>
});

const PreviewModeImage = React.memo((props) => {
    const {value} = props;
    if (!value) {
        return (<span/>)
    }
    return <RenderFileImage value={value}/>
});

const PreviewModeWebOffice = React.memo((props) => {
    const {value} = props;
    if (!value) {
        return (<span/>)
    }
    return <RenderFileWebOffice value={value}/>
});



const parseValueObject = (value, deep) => {
    if (deep > 5) {
        return [];
    }

    if(!value) {
        return [];
    }

    if (typeof value === "string") {
        if (value.startsWith('http://') || value.startsWith('https://') || value.startsWith('/')) {
            const name = getLastFileNameFromUrl(value) || 'File';
            return [
                {
                    name: name,
                    state: 'done',
                    url: value,
                    downloadURL: value,
                    imgURL: value,
                }
            ]
        }
        const obj = parseJsonObject(value) || [];
        if (Array.isArray(obj)) {
            return obj.map(item => {
                const arr = parseValueObject(item, deep + 1) || [];
                return arr[0];
            });
        }
        return parseValueObject(obj, deep + 1)
    }

    if (Array.isArray(value)) {
        return value.map(item => {
            const arr = parseValueObject(item, deep + 1) || [];
            return arr[0];
        });
    }

    if (typeof value === "object" && value.downloadURL) {
        if (!value.imgURL) {
            value.imgURL = value.downloadURL
        }
        if (!value.name) {
            value.name = getLastFileNameFromUrl(value.downloadURL) || 'File';
        }
        return [value];
    }

    return [];
}


function SimpleJSONUpload(props) {
    let {
        isPreview,
        previewMode = 'default',
        prefix,
        value,
        onChange,
        onChange2,
        className,
        listType = 'image',
        uploadComponent,
        ...otherProps
    } = props;

    if (!prefix) {
        prefix = defaultPrefix;
    }

    const UploadImpl = uploadComponent || Upload;

    const newValue = useMemo(() => {
        const arr = parseValueObject(value, 0);
        return arr.filter(Boolean);
    }, [value])


    const handleOnChange2 = (value, uploadFiles, originNextValue) => {
        if (typeof onChange === "function") {
            onChange(value, uploadFiles)
        }
        if (typeof onChange2 === "function") {
            onChange2(value, {uploadFiles, originNextValue})
        }
    }

    const handleOnChange = (originNextValue, uploadFiles) => {
        if (!originNextValue) {
            handleOnChange2([], uploadFiles, originNextValue)
            return;
        }

        if (Array.isArray(originNextValue)) {
            const nextValueArray = originNextValue.map((item) => {
                return formatItem(item)
            })
            handleOnChange2(nextValueArray, uploadFiles, originNextValue);
            return;
        }

        if (typeof originNextValue === "object" && originNextValue.name && originNextValue.size) {
            const newObj = formatItem(originNextValue);
            handleOnChange2(newObj, uploadFiles, originNextValue);
            return;
        }

        console.error("SimpleJSONUpload unknown originNextValue type ", originNextValue)
    }

    if (isPreview) {
        const cls = classnames(`${prefix}simple-json-upload-preview`, className);
        if (previewMode === 'auto') {
            return (
                <PreviewModeAutoBySuffix className={cls} value={value}/>
            );
        }
        if (previewMode === 'auto-list') {
            return (
                <PreviewModeAutoBySuffix className={cls} value={value} isList={true}/>
            );
        }
        if (previewMode === 'download') {
            return (
                <PreviewModeDownload className={cls} value={value} />
            );
        }
        if (previewMode === 'image') {
            return (
                <PreviewModeImage className={cls} value={value}/>
            );
        }
        if (previewMode === 'weboffice') {
            return (
                <PreviewModeWebOffice className={cls} value={value}/>
            );
        }
    }

    // previewMode = default
    return (
        <UploadImpl {...otherProps}
                    className={className}
                    prefix={prefix}
                    value={newValue}
                    isPreview={isPreview}
                    listType={listType}
                    onChange={handleOnChange}/>
    );
}

SimpleJSONUpload._supportPreview = true;
SimpleJSONUpload.displayName = 'SimpleJSONUpload';

export {
    SimpleJSONUpload
}