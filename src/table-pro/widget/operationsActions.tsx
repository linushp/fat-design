import React from "react";
import { showColumnSettingDialog } from "./column-setting";


function executeOperationAction(fn: string, btnItem: any, actions: any) {
    if (fn === 'setting') {
        // 点击设置按钮
        showColumnSettingDialog({ btnItem: btnItem, actions: actions });
    }
}

export {
    executeOperationAction
}
