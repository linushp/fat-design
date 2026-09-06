import React, {useContext} from "react";
import {
    FormItemProps,
    IFormContext, IFormSectionContext,
    LayoutEnum,
    WrapFormItemProps
} from "./form-types";
import classNames from "classnames";
import {formContextDef, formSectionDef} from "./form-context";
import {getDeps} from "./deps";
import {useUniqueId} from "../hooks/useUniqueId";
import {FormItemComp} from "./form-item-comp";
import {deepEqual} from "../util/shallowEqual";
import {FormError} from "./form-error";
import {getFormItemLabel} from "./form-item-label";
import {useFormItemState} from "./helper/useFormItemState";
import {log} from "../util";
import {isComponentsStoreEquals} from "../util/comp";
import {fixItemPropsByInherit} from "./helper/fixItemProps";
import {FORM_ITEM_TYPE_MARK} from "./helper/constants";


function getExtra(props: WrapFormItemProps) {
    const {formItemProps, formItemState} = props;
    const renderExtra = formItemProps.renderExtra;
    if (renderExtra && typeof renderExtra === "function") {
        const value = formItemState.value;
        return renderExtra(value, props);
    }
    return null;
}


function comparePropsFormItemImpl(prevProps: WrapFormItemProps, nextProps: WrapFormItemProps) {
    const formItemProps = prevProps.formItemProps;
    const formItemState = prevProps.formItemState;
    const formComponents = prevProps.formContext.formComponents;

    const formItemProps2 = nextProps.formItemProps;
    const formItemState2 = nextProps.formItemState;
    const formComponents2 = nextProps.formContext.formComponents;

    return deepEqual(formItemProps, formItemProps2, true) &&
        deepEqual(formItemState, formItemState2) &&
        isComponentsStoreEquals(formComponents, formComponents2);
}



const getFormItemTag = (formItemProps: FormItemProps) => {
    const {RGrid,Grid} = getDeps();

    const {Row} = Grid;

    const {
        layout,
        wrapperCol,
        labelCol,
        labelAlign,
    } = formItemProps;

    if (layout === LayoutEnum.responsive) {
        return RGrid.Cell;
    }

    if ((wrapperCol || labelCol) && labelAlign !== 'top') {
        return Row;
    }

    return 'div';
}


function getDesc(formItemProps: FormItemProps) {
    if (!formItemProps) {
        return null;
    }
    if (!formItemProps.description) {
        return null;
    }
    const prefix = formItemProps.prefix;
    return (
        <div className={`${prefix}form-item-control-description`}>
            {formItemProps.description}
        </div>
    )
}

const getFormItemElement = (props: WrapFormItemProps) => {
    const {formItemProps} = props;
    const {Grid} = getDeps();
    const {Col} = Grid;

    const {
        labelCol,
        wrapperCol,
        prefix,
        labelAlign,
    } = formItemProps;

    const extra = getExtra(props);

    const ele = (<FormItemComp {...props} />);

    const help = (<FormError {...props} />);

    const desc = getDesc(props.formItemProps);

    if ((wrapperCol || labelCol) && labelAlign !== 'top') {
        return (
            <Col {...wrapperCol} className={`${prefix}form-item-control`} key="item">
                {ele} {help} {extra} {desc}
            </Col>
        );
    }

    return (
        <div className={`${prefix}form-item-control`}>
            {ele} {help} {extra} {desc}
        </div>
    );
}


const FormItemImpl = React.memo((props: WrapFormItemProps) => {
    const {formItemProps, formItemState} = props;
    log.debug('render FormItemImpl : ' + formItemProps.name);


    const {
        className,
        style = {},
        prefix,
        cellProps = {},
        labelAlign,
        size,
        fullWidth,
        helpPos,
        extItemClassName,
    } = formItemProps;

    const { state, isPreview, display } = formItemState;

    if (display === false) {
        return null;
    }

    // 垂直模式并且左对齐才用到
    const FormItemTag = getFormItemTag(formItemProps);

    const itemClassName = classNames({
        [`${prefix}form-item`]: true,
        [`${prefix}${labelAlign}`]: labelAlign,
        [`has-${state}`]: !!state,
        [`use-tip-help`]: helpPos === 'tip',
        [`${prefix}${size}`]: !!size,
        [`${prefix}form-item-fullwidth`]: fullWidth,
        [`${extItemClassName}`]: !!extItemClassName,
        [`${className}`]: !!className,
        [`${prefix}form-preview`]: isPreview,
    });



    return (
        <FormItemTag {...cellProps} className={itemClassName} style={style}>
            {
                labelAlign === 'inset' ? null : getFormItemLabel(formItemProps, formItemState)
            }
            {getFormItemElement(props)}
        </FormItemTag>
    );

}, comparePropsFormItemImpl);


function FormItem(props: FormItemProps) {
    const formContext = useContext(formContextDef) as IFormContext;
    const formSectionContext = useContext(formSectionDef) as IFormSectionContext;
    const runtimeId = useUniqueId();
    const formItemProps = fixItemPropsByInherit(props, formContext, formSectionContext, runtimeId);
    const formItemState = useFormItemState(formItemProps, formContext);

    // 全局存储
    formContext.formStore.extData1.propsMap[`${formItemProps.name}`] = formItemProps;

    return <FormItemImpl formItemProps={formItemProps} formItemState={formItemState} formContext={formContext}/>
}


FormItem._typeMark = FORM_ITEM_TYPE_MARK;

export default FormItem;
