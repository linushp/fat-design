import { QueryFormProps } from "./types";
import Form from '../form2'
import { TinyEmitter } from "../util/tiny-emitter";
import { showFormSettingDialog } from "./form-setting";

const {
    useFormChildren,
    Item: FormItem
} = Form;


function createButtonGroup(props: QueryFormProps, queryFormEventBus: TinyEmitter, originalSchema?: any, originalDefaultValues?: any) {
    const { prefix } = props;

    const formButtonGroupProps = {
        label: ' ',
        key: 'FormButtonGroup',
        component: 'FormButtonGroup',
        name: 'QueryFormButtonGroup',
        cellProps: {
            colSpan: 1
        },
        xProps: {
            className: `${prefix}query-form-button-group`,
            buttons: [
                {
                    component: 'FormSubmit',
                    text: '查询'
                },
                {
                    component: 'FormReset',
                    text: '重置',
                    toDefault: true
                },
                {
                    component: 'FormButton',
                    text: '展开更多',
                    xProps: {
                        text: true,
                        type: 'primary',
                        className: `${prefix}query-form-button-expand-more1`,
                        onClick: () => {
                            console.log('展开更多');
                            queryFormEventBus.emit('toggleExpand');
                        }
                    }
                },
                {
                    component: 'FormButton',
                    text: '收起',
                    xProps: {
                        text: true,
                        type: 'primary',
                        className: `${prefix}query-form-button-expand-more2`,
                        onClick: () => {
                            console.log('收起');
                            queryFormEventBus.emit('toggleExpand');
                        }
                    }
                },
                ...(props.settings ? [{
                    component: 'FormButton',
                    text: '设置',
                    xProps: {
                        text: true,
                        type: 'primary',
                        onClick: () => {
                            showFormSettingDialog({
                                schema: originalSchema || props.schema,
                                defaultValues: originalDefaultValues || props.defaultValues,
                                settingName: props.settingName,
                                queryFormEventBus,
                            });
                        }
                    }
                }] : []),
            ]
        }
    };

    return (
        <FormItem {...formButtonGroupProps} />
    );
}


function useQueryFormItems(props: QueryFormProps, queryFormEventBus: TinyEmitter, originalSchema?: any, originalDefaultValues?: any) {
    const items = useFormChildren(props);
    const btnGroup = createButtonGroup(props, queryFormEventBus, originalSchema, originalDefaultValues);

    return [...items, btnGroup];
}


export {
    useQueryFormItems
}
