import {objectExtend} from "../../util/object";


const inheritFormPropsKeys = [
    'size',
    'layout',
    'labelCol',
    'wrapperCol',
    'labelAlign',
    'labelTextAlign',
    'device',
    'fullWidth',
    'isPreview',
    'renderPreview',
    'disabled',
    'display',
    'prefix',
    'colon',
    'useLabelForErrorMessage',
    'autoValidate',
    'helpPos',
    'previewPlaceholder'
];

function inheritFormProps(props: any, formProps: any) {
    return objectExtend(props, formProps, inheritFormPropsKeys);
}

export {
    inheritFormProps
}
