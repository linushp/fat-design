let now = +new Date();

/**
 * 生成唯一的id
 * @return {String} uid
 */
export function uid() {
    return (now++).toString(36);
}

export function fileToObject(file) {
    if (!file.uid) {
        file.uid = uid();
    }

    return {
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate,
        name: file.filename || file.name,
        size: file.size,
        type: file.type,
        uid: file.uid,
        error: file.error,
        percent: 0,
        originFileObj: file,
    };
}

export function getFileItem(file, fileList) {
    const matchKey = file.uid !== undefined ? 'uid' : 'name';
    return fileList.filter(item => item[matchKey] === file[matchKey])[0];
}

export function removeFileItem(file, fileList) {
    const matchKey = file.uid !== undefined ? 'uid' : 'name';
    const removed = fileList.filter(item => item[matchKey] !== file[matchKey]);
    if (removed.length === fileList.length) {
        return null;
    }
    return removed;
}

function getFileSuffix(fileName) {
    if (fileName) {
        fileName = fileName.toLowerCase();
        const indexOf = fileName.lastIndexOf('.');
        if (indexOf > 0) {
            return fileName.substring(indexOf); //'.jpg'
        }
    }
    return '';
}

function isImageFile(fileName) {
    const fileKey1 = fileName.toLowerCase();
    const suffix = ['.jpg', '.jpeg', '.png', '.bmp', '.gif', '.webp', '.tiff'];
    for (let i = 0; i < suffix.length; i++) {
        const suffix1 = suffix[i];
        if (fileKey1.endsWith(suffix1)) {
            return true;
        }
    }
    return false;
}

// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
export function previewFile(file, callback) {

    if (!isImageFile(file.name)) {
        const fileSuffix = getFileSuffix(file.name);
        callback({fileSuffix});
        return;
    }

    const reader = new FileReader();
    reader.onloadend = () => callback(reader.result);
    reader.readAsDataURL(file);
}

export const errorCode = {
    EXCEED_LIMIT: 'EXCEED_LIMIT',
    BEFOREUPLOAD_REJECT: 'BEFOREUPLOAD_REJECT',
    RESPONSE_FAIL: 'RESPONSE_FAIL',
};
