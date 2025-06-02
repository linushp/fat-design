import React, {useMemo} from "react";
import Upload from './upload';
import {getByAny, parseJsonObject} from "../util/func";
import classnames from "classnames";
import ConfigProvider from "../config-provider";
import {RenderFileAutoBySuffix} from "../previews/renderFileImage";





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
        url,
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
    const {
        isPreview,
        isAutoStylePreview,
        prefix,
        value,
        onChange,
        className,
        uploadComponent,
        ...otherProps
    } = props;

    const newValue = useMemo(() => {
        if (typeof value === "string") {
            return parseJsonObject(value) || []
        }
        return value;
    }, [value])

    const handleOnChange = (nextValue) => {
        if (!nextValue) {
            onChange([])
            return;
        }

        if (Array.isArray(nextValue)) {
            const nextValueArray = nextValue.map((item) => {
                return formatItem(item)
            })
            onChange(nextValueArray);
            return;
        }

        if (typeof nextValue === "object" && nextValue.name && nextValue.size) {
            const newObj = formatItem(nextValue);
            onChange(newObj);
            return;
        }

        console.error("SimpleJSONUpload unknown nextValue type ", nextValue)
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
                    onChange={handleOnChange}/>
    );
}

SimpleJSONUpload._supportPreview = true;
SimpleJSONUpload.displayName = 'SimpleJSONUpload';
SimpleJSONUpload.defaultProps = {
    prefix: ConfigProvider.defaultPrefix
};

export {
    SimpleJSONUpload
}