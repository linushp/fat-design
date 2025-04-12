import React, {useMemo} from "react";
import {FormProps} from "../form-types";

function mergeArray(arr1: any, arr2: any[]): any[] {
    if (!arr2) {
        return arr1;
    }
    if (Array.isArray(arr2)) {
        return arr1.concat(arr2);
    }
    return arr1.concat([arr2]);
}

function schemaToFormItems(schema: any, FormItem: any) {
    if (schema && schema.properties && typeof schema.properties === "object") {
        const properties = schema.properties;
        const keys = Object.keys(properties);
        if (keys.length > 0) {
            return keys.map((key) => {
                const formItemConfig = properties[key];
                formItemConfig.name = key;
                return (
                    <FormItem key={`schema_${key}`} {...formItemConfig} />
                );
            });
        }
    }
    return null;
}

function createDefaultSubmitter(FormItem) {
    const formItemConfig = {
        label: ' ',
        component: 'FormButtonGroup',
        name: '_FormDefaultSubmitter_',
        cellProps: {
            colSpan: 1
        },
        xProps: {
            buttons: [
                {component: 'FormSubmit',},
                {component: 'FormReset', toDefault: true},
            ]
        }
    };
    return (<FormItem key={formItemConfig.name} {...formItemConfig} />)
}

function useFormChildren(props: FormProps, FormItem: any) {
    const {children, schema, submitter} = props;

    let result: any[] = [];

    const schemaChildren: any = useMemo(() => {
        return schemaToFormItems(schema, FormItem);
    }, [schema]);

    result = mergeArray(result, schemaChildren);
    result = mergeArray(result, children);

    if (submitter === true) {
        result.push(createDefaultSubmitter(FormItem));
    }
    return result;
}


export {
    useFormChildren,
    schemaToFormItems
}
