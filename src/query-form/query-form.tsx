import { useRef, useMemo, useState, useEffect } from "react";
import _set from "lodash.set";
import _get from '../util/lodash-get';
import { TinyEmitter } from "../util/tiny-emitter";
import { QueryFormProps } from "./types";
import Form from '../form2'
import classNames from 'classnames';
import { useQueryFormItems } from "./query-form-items";
import ConfigProvider from "../config-provider";
import { useQueryFormLayout } from "./query-form-layout";
import { useCurrentState } from "../hooks/useCurrentState";
import { loadFormSetting, applySettingToSchema, getDefaultValuesFromSetting } from "./form-default-values";


const defaultPrefix = ConfigProvider.defaultPrefix;

function QueryForm(props: QueryFormProps) {


    const { prefix, isUseCard, initialFormWidth, initialRowCount, labelAlign, settings, settingName, schema, defaultValues, ...otherProps } = props;

    const [ expand , setExpand, getExpand ] = useCurrentState(false);

    const queryFormEventBus = useMemo(() => {
        return new TinyEmitter();
    }, []);

    // 表单设置状态
    const [formSetting, setFormSetting] = useState<any>(null);

    // 组件挂载时读取已保存的表单设置
    useEffect(() => {
        if (!settings || !settingName) return;
        loadFormSetting(settingName).then((settingArray) => {
            if (settingArray) {
                setFormSetting(settingArray);
            }
        });
    }, [settings, settingName]);

    useEffect(() => {
        queryFormEventBus.on('toggleExpand', () => {
            const expand0 = getExpand();
            setExpand(!expand0);
        });
        queryFormEventBus.on('formSettingChange', (settingArray: any) => {
            setFormSetting(settingArray);
        });
        return () => {
            queryFormEventBus.clear();
        }
    }, [queryFormEventBus])

    // 根据设置调整 schema 和 defaultValues
    const modifiedSchema = useMemo(() => {
        if (!formSetting || !schema) return schema;
        return applySettingToSchema(schema, formSetting);
    }, [schema, formSetting]);

    const modifiedDefaultValues = useMemo(() => {
        if (!formSetting) return defaultValues;
        return getDefaultValuesFromSetting(formSetting, defaultValues);
    }, [defaultValues, formSetting]);

    // 当 formSetting 变化时，通过 key 强制 Form 重新挂载
    // 因为 form store 的 values 只在挂载时从 defaultValues 初始化一次
    const formKey = useMemo(() => {
        return JSON.stringify(formSetting) || 'no-setting';
    }, [formSetting]);

    const modifiedProps = {
        ...props,
        schema: modifiedSchema,
        defaultValues: modifiedDefaultValues,
    };

    const children = useQueryFormItems(modifiedProps, queryFormEventBus, schema, defaultValues);

    const fixProps = {
        ...otherProps,
        defaultValues: modifiedDefaultValues,
        labelAlign,
        prefix,
        schema: null,
        children: children
    };

    if (labelAlign === 'inset' || labelAlign === 'left') {
        _set(fixProps, 'layoutProps.gap', '8px 8px')
    }

    const ref = useRef(null);

    const fixLayoutProps = useQueryFormLayout(ref, fixProps, initialFormWidth, initialRowCount);

    const moreVisibleCount = _get(fixLayoutProps, `moreVisibleCount`);

    const hasMoreVisibleCount: boolean = (typeof moreVisibleCount === 'number' && moreVisibleCount > 0);

    const className = classNames({
        [`${prefix}query-form`]: true,
        [`${prefix}query-form-card`]: isUseCard,
        [`${prefix}query-form-has-more-visible`]: hasMoreVisibleCount,
        [`${prefix}query-form-more-expand`]: expand,
    });

    return (
        <div className={className} ref={ref} >
            {
                fixLayoutProps ? <Form key={formKey} {...fixLayoutProps} /> : null
            }
        </div>
    );
}


QueryForm.defaultProps = {
    prefix: defaultPrefix,
    isUseCard: false,
    isPreview: false,
    labelAlign: 'top',
    // labelAlign: 'inset',
    // layout: 'float',
    layout: 'responsive',
    initialFormWidth: 0,
    initialRowCount: 2,
    settings: false,
    layoutProps: {
        gap: [0, 8],
        columns: 0,// 为0时会自动计算
    }
};

QueryForm.Item = Form.Item;



export {
    QueryForm
}
