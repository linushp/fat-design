import ConfigProvider from '../config-provider';
import NumberPicker from './number-picker';

export default ConfigProvider.config(NumberPicker, {
    transform: /* istanbul ignore next */ props => {
        if ('state' in props && props.state === 'success') {
            delete props.state;
        }

        return props;
    },
    exportNames: ['getInputNode'],
});
