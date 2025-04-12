import {pickErrorMessage} from "./pick-res-data";
import {ComponentsStore} from "./index";


export function wrapAutoMessage(requestFn: any, autoOnOkMessage: boolean) {

    if (!autoOnOkMessage) {
        return requestFn;
    }

    if (typeof requestFn !== "function") {
        return requestFn;
    }

    return async function (...args: any[]) {
        const Message = ComponentsStore.getBuildIn('Message');

        try {
            const onOkResult = await requestFn(...args);

            if (onOkResult && typeof onOkResult === "object") {

                if (onOkResult.message && onOkResult.success === false) {
                    Message.error(onOkResult.message);
                    return false;
                }

                if (onOkResult.message && onOkResult.success === true) {
                    Message.success(onOkResult.message);
                    return true;
                }
            }

            return onOkResult;

        } catch (e) {
            Message.error(pickErrorMessage(e));
            return false;
        }
    }
}
