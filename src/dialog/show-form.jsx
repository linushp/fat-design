import {useState} from 'react';
import {ComponentsStore} from "../util/comp";
import {get} from "../util";
import classNames from 'classnames';
import {defaultPrefix} from "../config-provider";
import Message from '../message';
import {MESSAGE_TYPE} from "./constants.jsx";

function getDep(name) {
    return get(ComponentsStore.buildInComponents, name);
}

function DialogFormWrapper(props) {

    const {bottomTips, topTips, onCreated, onChange, formProps = {}, contentStyle, contentClass, DialogForm, slots, prefix} = props;
    const Form = getDep('Form');
    const FormComp = DialogForm ? DialogForm : Form;

    const [tick, setTick] = useState(0);

    const handleCreated = (...args) => {
        if (typeof formProps.onCreated === "function") {
            formProps.onCreated(...args);
        }
        onCreated(...args);
    }

    const handleChange = (...args)=> {
        if (typeof formProps.onChange === "function") {
            formProps.onChange(...args);
        }

        // showForm参数中的onChange函数，返回值为true时，会强制更新。
        let needRender = false;
        if (typeof onChange === "function") {
            needRender = onChange(...args);
        }
        if (needRender === true) {
            setTick(Date.now() + "" + Math.random())
        }
    }

    const styleObject = {
        minHeight: 94,
        width: 600,
        maxHeight: 600,
        overflow: 'auto',
        paddingTop: 20
    };

    if (contentStyle) {
        Object.assign(styleObject, contentStyle);
    }


    const classNameMerge = classNames(`${prefix}dialog-show-form-content`, contentClass)

    return (
        <div className={classNameMerge} style={styleObject}>
            {topTips}

            {
                (slots && typeof slots.renderSlotTop === "function") ? slots.renderSlotTop(props, tick) : null
            }

            {
                <FormComp {...formProps} onCreated={handleCreated} onChange={handleChange}/>
            }

            {
                (slots && typeof slots.renderSlotBottom === "function") ? slots.renderSlotBottom(props, tick) : null
            }

            {bottomTips}

        </div>
    )
}

function buildShowForm(show) {

    return function showForm(config = {}) {

        let {
            bottomTips,
            topTips,
            title,
            type,
            size = 'medium',
            onOk,
            validate = true,
            formProps,
            DialogForm,  // 可以为空
            contentStyle,
            contentClass,
            className,
            slots,
            prefix = defaultPrefix,
            onChange,
            ...otherProps
        } = config;


        const onCreated = (values, {formStore, formActions}) => {
            config.currentFormStore = formStore;
            config.currentFormActions = formActions;
            if(typeof config.onCreated === "function") {
                config.onCreated(values, {formStore, formActions});
            }
        }

        let newTitle = title;
        if (type) {
            newTitle = (
                <Message
                    size="medium"
                    shape="addon"
                    title={title}
                    className={`${prefix}dialog-show-form-msg-title`}
                    type={MESSAGE_TYPE[type]}
                />
            );
        }

        return show({
            prefix,
            size,
            title: newTitle, // footerActions: ['ok', 'cancel'],
            content: (
                <DialogFormWrapper bottomTips={bottomTips}
                                   topTips={topTips}
                                   onCreated={onCreated}
                                   onChange={onChange}
                                   formProps={formProps}
                                   DialogForm={DialogForm}
                                   slots={slots}
                                   prefix={config.prefix}
                                   contentStyle={contentStyle}
                                   contentClass={contentClass}
                />
            ),
            onOk: async (event, ...args) => {

                const formActions = config.currentFormActions;
                const formStore = config.currentFormStore;
                const formValues = formStore.storeData.values;

                if (validate) {
                    await formActions.validateForm();
                    const errors = formActions.getErrors();
                    if (errors.length > 0) {
                        return false;
                    }
                }

                if (onOk) {
                    event.formActions = formActions;
                    event.formStore = formStore;
                    event.formValues = formValues;
                    return await onOk(event, ...args);
                }
            },
            messageProps: {
                size: size
            },
            noPadding: true,
            className: classNames(`${prefix}dialog-show-form`, className),
            ...otherProps
        });
    }
}


export {
    buildShowForm
}
