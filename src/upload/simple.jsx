import React, {useMemo} from "react";
import Upload from './upload';
import {getByAny, parseJsonObject} from "../util/func";
import classnames from "classnames";
import ConfigProvider from "../config-provider";
import {RenderFileAutoBySuffix} from "../previews/renderFileImage";

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


const SimpleJSONUploadPreview = React.memo( (props)=> {
    const {value} = props;
    if (!value || typeof value !== "string") {
        return (<span />)
    }
    return <RenderFileAutoBySuffix value={value} />
});


function SimpleJSONUpload(props) {
    let {
        isPreview,
        isAutoStylePreview,
        prefix,
        value,
        onChange,
        onChange2,
        className,
        uploadComponent,
        ...otherProps
    } = props;

    if (!prefix) {
        prefix =  defaultPrefix;
    }

    const newValue = useMemo(() => {
        if (typeof value === "string") {
            return parseJsonObject(value) || []
        }
        return value;
    }, [value])


    const handleOnChange2 = (value, uploadFiles, originNextValue) => {
        if (typeof onChange === "function") {
            onChange(value, uploadFiles)
        }
        if (typeof onChange2 === "string") {
            onChange2(value, { uploadFiles, originNextValue } )
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
        if (!isAutoStylePreview) {
            return (<div className={cls}>{value}</div>)
        }
        return (
            <SimpleJSONUploadPreview className={cls} value={value} />
        );
    }


    const UploadImpl = uploadComponent || Upload;
    return (
        <UploadImpl {...otherProps}
                    className={className}
                    prefix={prefix}
                    value={newValue}
                    onChange={handleOnChange} />
    );
}

SimpleJSONUpload._supportPreview = true;
SimpleJSONUpload.displayName = 'SimpleJSONUpload';

export {
    SimpleJSONUpload
}