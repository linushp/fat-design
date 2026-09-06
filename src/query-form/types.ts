import {FormProps} from "../form2/form-types";


export interface QueryFormProps extends FormProps {
    isUseCard?: boolean;

    /**
     * 初始宽度。对于一些特殊场景，可以提前设置宽度，减少一次渲染，默认： 0
     */
    initialFormWidth?: number;

    /**
     * 初始显示行数
     */
    initialRowCount?: number;

    /**
     * 是否开启表单设置功能（拖拽排序、显示/隐藏、默认值），默认：false
     */
    settings?: boolean;

    /**
     * 设置名称，用于本地存储标识。当 settings 为 true 时必填
     */
    settingName?: string;
}
