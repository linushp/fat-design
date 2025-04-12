import {FormItemProps} from "./form-types";

function getCfgFromProps(props: any, type: string) {
    if (type in props) {
        return props[type];
    }
    return undefined;
}

function getRule(ruleName: string, props: any) {
    return {
        [ruleName]: props[ruleName],
        message: getCfgFromProps(props, `${ruleName}Message`),
        trigger: getCfgFromProps(props, `${ruleName}Trigger`),
    };
}


function getLabelForErrorMessage(props: FormItemProps) {
    const {errorMessageName, label, useLabelForErrorMessage} = props;

    if (errorMessageName) {
        return errorMessageName;
    }

    if (!label || typeof label !== 'string') {
        return null;
    }

    const newLabel = label.replace(':', '').replace('：', '');

    if (useLabelForErrorMessage && newLabel) {
        return newLabel;
    }

    return null;
}


function buildValidateRules(props: FormItemProps): any[] {
    const result: any = [];

    // required
    if (props.required) {
        const requiredRule = getRule('required', props);
        result.push(requiredRule);
    }

    const maxLength = Number(props.maxLength);
    const minLength = Number(props.minLength);
    if (minLength || maxLength) {
        result.push({
            minLength,
            maxLength,
            // minLengthMessage maxLengthMessage had been deprected, please use minmaxLength. TODO: removed in 2.0
            message:
                getCfgFromProps(props, 'minmaxLengthMessage') ||
                getCfgFromProps(props, 'minLengthMessage') ||
                getCfgFromProps(props, 'maxLengthMessage'),
            trigger:
                getCfgFromProps(props, 'minmaxLengthTrigger') ||
                getCfgFromProps(props, 'minLengthTrigger') ||
                getCfgFromProps(props, 'maxLengthTrigger'),
        });
    }

    // length
    if (props.length) {
        result.push(getRule('length', props));
    }

    // pattern
    if (props.pattern) {
        result.push(getRule('pattern', props));
    }

    // format
    if (props.format) {
        if (['number', 'tel', 'url', 'email'].indexOf(props.format) > -1) {
            result.push(getRule('format', props));
        }
    }

    const max = Number(props.max);
    const min = Number(props.min);
    // max min
    if (max || min) {
        result.push({
            min,
            max,
            // minMessage maxMessage had been deprected, please use minmaxLength. TODO: removed in 2.0
            message:
                getCfgFromProps(props, 'minmaxMessage') ||
                getCfgFromProps(props, 'minMessage') ||
                getCfgFromProps(props, 'maxMessage'),
            trigger:
                getCfgFromProps(props, 'minmaxTrigger') ||
                getCfgFromProps(props, 'minTrigger') ||
                getCfgFromProps(props, 'maxTrigger'),
        });
    }

    if (props.validator && typeof props.validator === 'function') {
        result.push({
            validator: props.validator,
            trigger: getCfgFromProps(props, 'validatorTrigger'),
        });
    }



    if (props.rules && props.rules.length > 0){
        for (let i = 0; i < props.rules.length; i++) {
            const rule = props.rules[i];
            if (typeof rule === "object"){
                result.push(rule);
            }
        }
    }


    const labelForErrorMessage = getLabelForErrorMessage(props);

    if (labelForErrorMessage) {
        result.forEach((r: any) => {
            r.aliasName = labelForErrorMessage;
        });
    }

    return result;
}


export {
    buildValidateRules
}
