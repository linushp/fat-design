import {QueryFormProps} from "./types";
import Form from '../form2'

const {
    useFormChildren,
    Item: FormItem
} = Form;


function createButtonGroup(props: QueryFormProps) {
    const {prefix} = props;

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
            ]
        }
    };

    return (
        <FormItem {...formButtonGroupProps} />
    );
}


function useQueryFormItems(props: QueryFormProps) {
    const items = useFormChildren(props);
    const btnGroup = createButtonGroup(props);

    return [...items, btnGroup];
}


export {
    useQueryFormItems
}
