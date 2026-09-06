import ConfigProvider from '../config-provider';
import Input from './input';
import Password from './password';
import TextArea from './textarea';
import ColorPicker from './colorpicker.jsx';
import Group from './group';

Input.Password = ConfigProvider.config(Password, {
    exportNames: ['getInputNode', 'focus'],
    _typeMark: 'FORM_COMP_PASSWORD',
    _supportPreview: true,
    transform: /* istanbul ignore next */ (props, deprecated) => {
        if ('hasLimitHint' in props) {
            deprecated('hasLimitHint', 'showLimitHint', 'Input');
            const { hasLimitHint, ...others } = props;

            props = { showLimitHint: hasLimitHint, ...others };
        }
        return props;
    },
});

Input.TextArea = ConfigProvider.config(TextArea, {
    exportNames: ['getInputNode', 'focus'],
    _typeMark: 'FORM_COMP_TEXT_AREA',
    _supportPreview: true,
    transform: /* istanbul ignore next */ (props, deprecated) => {
        if ('hasLimitHint' in props) {
            deprecated('hasLimitHint', 'showLimitHint', 'Input');
            const { hasLimitHint, ...others } = props;

            props = { showLimitHint: hasLimitHint, ...others };
        }

        return props;
    },
});


Input.ColorPicker = ConfigProvider.config(ColorPicker, {
    exportNames: ['getInputNode', 'focus'],
    _typeMark: 'FORM_COMP_COLOR_PICKER',
    _supportPreview: true,
    transform: /* istanbul ignore next */ (props, deprecated) => {
        if ('hasLimitHint' in props) {
            deprecated('hasLimitHint', 'showLimitHint', 'Input');
            const { hasLimitHint, ...others } = props;
            props = { showLimitHint: hasLimitHint, ...others };
        }

        return props;
    },
});



Input.Group = Group;

// 用来自动生成文档的工具底层依赖的 react-docgen，无法解析生成 HOC 的方法中存在第二个参数的情况
// 所以不能在 input.jsx／textarea.jsx 中生成 HOC

export default ConfigProvider.config(Input, {
    exportNames: ['getInputNode', 'focus'],
    _typeMark: 'FORM_COMP_INPUT',
    _supportPreview: true,
    transform: /* istanbul ignore next */ (props, deprecated) => {
        if ('hasLimitHint' in props) {
            deprecated('hasLimitHint', 'showLimitHint', 'Input');
            const { hasLimitHint, ...others } = props;

            props = { showLimitHint: hasLimitHint, ...others };
        }
        return props;
    },
});
