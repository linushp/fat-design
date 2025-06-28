import {str} from "../util";
import {buildShowForm} from "./show-form.jsx";
import classNames from 'classnames';
import {defaultPrefix} from "../config-provider";

const defaultSpecialReg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]",);

const SHOW_INPUT_MODE = {
    textareaMode: 'textareaMode',
    inputMode: 'inputMode',
};

function buildShowInput(show) {

    const showForm = buildShowForm(show);

    return function showInput(config) {

        let {
            title = 'title',
            label = 'label',
            placeholder,
            required = true,
            requiredMessage,
            validate = true,
            maxLength = 200,
            defaultValue = '',
            mode = SHOW_INPUT_MODE.inputMode,
            specialReg = defaultSpecialReg,
            onOk,
            locale = {},
            className,
            type,
            prefix = defaultPrefix,
            formProps: formPropsConfig,
            contentStyle = {},
            ...others
        } = config;

        const inputDialogLocale = locale.inputDialog || {};

        const newOnOk = (event, ...args) => {
            if (onOk) {
                const formValues = event.formValues || {};
                event.formInputValue = formValues.inputValue;
                return onOk(event, ...args);
            }
        }

        const validator = (rule, _value) => {
            if (_value && specialReg && _value.match(specialReg)) {
                return inputDialogLocale.noSpecialReg
            }
        };


        const formProps = {
            defaultValues: {
                inputValue: defaultValue
            },
            labelCol: {
                fixedSpan: 5,
            },
            wrapperCol: {
                span: 16,
            },
            schema: {
                type: 'object',
                properties: {
                    inputValue: {
                        label: label,
                        component: mode === SHOW_INPUT_MODE.textareaMode ? 'Input.TextArea' : 'Input',
                        required: required,
                        requiredMessage: requiredMessage || placeholder,
                        validator,
                        maxLength: maxLength,
                        xProps: {
                            showLimitHint: true,
                            trim: false,
                            hasClear: true,
                            placeholder: placeholder || title,
                            maxLength: maxLength
                        }
                    },
                }
            }
        };

        const classObj = {
            [`${prefix}dialog-show-input`]: true,
            [className]: !!className,
        };


        if (formPropsConfig && typeof formPropsConfig === "object") {
            Object.assign(formProps, formPropsConfig);
        }


        const contentStyle0 = {
            width: '430px',
            boxSizing: 'border-box'
        }


        if (mode === SHOW_INPUT_MODE.inputMode) {
            if ( formProps.labelAlign === 'top'){
                contentStyle0.padding = '10px 40px';
                contentStyle0.paddingBottom = '0';
                contentStyle0.minHeight = '115px';
            } else {
                contentStyle0.paddingTop = '20px';
            }
        }

        if (mode === SHOW_INPUT_MODE.textareaMode) {
            formProps.layout = 'null';
            formProps.labelAlign = 'top'
            delete formProps.labelCol;
            delete formProps.wrapperCol;
            contentStyle0.minHeight = '165px';
            contentStyle0.padding = '10px 30px';
            contentStyle0.paddingBottom = '0';
        }


        return showForm({
            ...others,
            type,
            prefix,
            validate,
            title,
            onOk: newOnOk,
            formProps,
            contentStyle: {
                ...contentStyle0,
                ...contentStyle,
            },
            className: classNames(classObj),
        });
    }
}


export {
    buildShowInput
}
