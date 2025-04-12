import {FormItemProps, FormItemState, IFormContext} from "../form-types";
import {buildFnFormOnChangeParams} from "./buildParams";
import {FormActions} from "../form-actions";


function getXprops(formItemProps: FormItemProps, formItemState: FormItemState) {
    const xProps = formItemProps.xProps;
    if (!xProps) {
        return {};
    }

    if (typeof xProps === "object") {
        return xProps;
    }

    if (typeof xProps === "function" && formItemState.xProps) {
        return formItemState.xProps || {};
    }

    return {};
}


function useGetXProps(formItemProps: FormItemProps, formItemState: FormItemState, formContext: IFormContext): any {
    const formStore = formContext.formStore;
    const formActions = formContext.formActions as FormActions;

    const xProps = getXprops(formItemProps, formItemState);
    const {filterLocal, showSearch} = xProps;

    const xPropsClone = {...xProps};

    // 需要onSearch函数出现。不管用户有没有设置onSearch函数
    if (filterLocal === false && showSearch === true) {
        xPropsClone.onSearch = (value: any, event: any) => {
            const params = buildFnFormOnChangeParams(formStore, formActions);

            params.valuesOfOnSearch[formItemProps.name] = value;

            if (typeof xProps.onSearch === "function") {
                xProps.onSearch(value, {
                    event: event,
                    xProps: xPropsClone,
                    ...params,
                });
            }

            formActions.forceUpdate(formItemProps.name);
        }
    }

    return xPropsClone;
}


export {
    useGetXProps
}
