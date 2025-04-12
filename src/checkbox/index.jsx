import Checkbox from './checkbox';
import Group from './checkbox-group';
import ConfigProvider from '../config-provider';

Checkbox.Group = ConfigProvider.config(Group, {
    transform: /* istanbul ignore next */ (props, deprecated) => {
        if ('itemDirection' in props) {
            deprecated('itemDirection', 'direction', 'Checkbox');
            const { itemDirection, ...others } = props;

            props = { direction: itemDirection, ...others };
        }

        return props;
    },
});

// 解决在Form表单情况下标准value，onChange协议的问题
Checkbox.BoolCheckbox = ConfigProvider.createBoolComponent(Checkbox, 'BoolCheckbox');


export default Checkbox;
