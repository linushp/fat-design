import {NotificationRender} from "./notification";
import ConfigProvider from "../config-provider/index";
import {PopManager} from "../pop-manager";


const NotificationRenderConfig = ConfigProvider.configFn(NotificationRender, {});

const Notification = new PopManager({
    maxCount: 999,
    Tag: NotificationRenderConfig,
    duration: 4500,

    notificationConfig: {
        offset: [30, 30],
        size: 'medium',
        placement: 'tr'
    }

}).createExports();

export default Notification;
