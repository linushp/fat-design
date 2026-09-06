import {buildShowForm} from "./show-form.jsx";

function buildShowAudit(show) {

    const showForm = buildShowForm(show);

    return function showAudit(config) {
        let {
            title,
            enums,
            defaultValues,
            defaultValue,
            ...otherConfig
        } = config;

        const defaultEnums = [
            {label: '同意', value: 'ok',},
            {label: '拒绝', value: 'reject'},
        ]

        const defaultValues0 = {};
        if (defaultValues) {
            Object.assign(defaultValues0, defaultValues);
        }
        if (defaultValue) {
            Object.assign(defaultValues0, defaultValue);
        }


        const formProps = {
            defaultValues: defaultValues0 || {},
            labelCol: {
                fixedSpan: 8,
            },
            wrapperCol: {
                span: 14,
            },
            schema: {
                type: 'object',
                properties: {
                    auditResult: {
                        label: '审批结论',
                        component: 'Select',
                        required: true,
                        enums: Array.isArray(enums) ? enums : defaultEnums
                    },
                    auditMark: {
                        label: '审批备注',
                        component: 'Input.TextArea',
                        deps: ['auditResult'],
                        required: (values) => {
                            return values.auditResult === 'reject';
                        },
                        maxLength: 200,
                        minLength: 1,
                        xProps: {
                            placeholder: '请简单说明一下审批意见',
                        }
                    },
                }
            }
        };


        return showForm({
            title: '请审批',
            formProps,
            contentStyle: {
                width: '600px',
            },
            ...otherConfig
        });
    }
}


export {
    buildShowAudit
}
