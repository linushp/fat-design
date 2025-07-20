import ConfigProvider from '../config-provider';
import Select from './select';
import AutoComplete from './auto-complete';
import { NativeSelect } from './native-select';
import Option from './option';
import OptionGroup from './option-group';

Select.AutoComplete = ConfigProvider.config(AutoComplete, {
    componentName: 'AutoComplete',
    _typeMark: 'FORM_COMP_AUTO_COMPLETE',
});

Select.Option = Option;
Select.OptionGroup = OptionGroup;
Select.NativeSelect = NativeSelect;

// compatible with 0.x version
/* istanbul ignore next */
function transform(props, deprecated) {
    const {
        shape,
        container,
        multiple,
        filterBy,
        overlay,
        safeNode,
        noFoundContent,
        ...others
    } = props;

    const newprops = others;
    if (shape === 'arrow-only') {
        deprecated('shape=arrow-only', 'hasBorder=false', 'Select');
        newprops.hasBorder = false;
    }
    if (container) {
        deprecated('container', 'popupContainer', 'Select');
        newprops.popupContainer = container;
    }
    if (multiple) {
        deprecated('multiple', 'mode=multiple', 'Select');
        newprops.mode = 'multiple';
    }
    if (filterBy) {
        deprecated('filterBy', 'filter', 'Select');
        newprops.filter = filterBy;
    }
    if (overlay) {
        deprecated('overlay', 'popupContent', 'Select');
        newprops.popupContent = overlay;
        newprops.autoWidth = false;
    }

    if (noFoundContent) {
        deprecated('noFoundContent', 'notFoundContent', 'Select');
        newprops.notFoundContent = noFoundContent;
    }

    if (safeNode) {
        deprecated('safeNode', 'popupProps={safeNode}', 'Select');
        newprops.popupProps = {
            safeNode,
        };
    }

    return newprops;
}


export default ConfigProvider.config(Select, {
    transform,
    _typeMark: 'FORM_COMP_SELECT',
    _supportPreview: true,
    exportNames: ['focusInput', 'handleSearchClear'],
});
