import ConfigProvider from '../config-provider';
import Message from './message';
import {MessageWrapper} from './message-wrapper';
import {PopManager} from '../pop-manager';

const MessageWrapperConfig = ConfigProvider.configFn(MessageWrapper, {});


const toast1 = new PopManager({maxCount: 1, Tag: MessageWrapperConfig}).createExports();
const toast2 = new PopManager({maxCount: 999, Tag: MessageWrapperConfig}).createExports();


const MessageProvider = ConfigProvider.config(Message, {
    componentName: 'Message',
});

MessageProvider.Message1 = toast1;
MessageProvider.Message2 = toast2;

// 只要使用了 config 就是 v2 版本
toast1.config = (cfg)=>{
    if (toast2.config) {
        toast2.config(cfg);
    }
    MessageProvider.useV2();
}

MessageProvider.useV1 = () => {
    Object.assign(MessageProvider, toast1);
}

MessageProvider.useV2 = () => {
    Object.assign(MessageProvider, toast2);
}

MessageProvider.useV1();

export default MessageProvider;
