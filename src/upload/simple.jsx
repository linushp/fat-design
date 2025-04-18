import {useMemo} from "react";
import Upload from './upload';
import {getByAny, parseJsonObject} from "../util/func";



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

function SimpleJSONUpload(props) {
    const {value, onChange, uploadComponent, ...otherProps} = props;

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


    const UploadImpl = uploadComponent || Upload;
    return <UploadImpl {...otherProps} value={newValue} onChange={handleOnChange}/>
}

export {
    SimpleJSONUpload
}