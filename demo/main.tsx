import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import * as ReactDOM from 'react-dom'

import {DemoLoading} from './demo-loading'
import {DemoTmp} from './demo-tmp'
import {DemoQueryForm} from './demo-query-form'
import {DemoQueryFormSimple} from './demo-query-form-simple'
import {DemoForm1} from './demo-form1'
import {DemoForm2} from './demo-form2'
import {DemoForm3} from './demo-form3'
import {DemoFormLayout} from './demo-form-layout'
import {DemoButtons} from './demo-buttons'
// import {DemoBatchInput} from './demo-batchinput'
import {DemoDetailPage} from './demo-detail-page'
import {DemoFormTable} from './demo-form-table'
import {DemoTablePro} from './demo-table-pro'
import './index.css'
import {DemoFilter} from "./demo-filter";
import {DemoImage} from "./demo-image";
import {DemoUpload} from "./demo-upload";
import {DemoMenuButton} from "./demo-menu-button";
import {DemoDialogShow} from "./demo-dialog-show";
import {DemoDrawerShow} from "./demo-drawer-show";
import {DemoSortableTable} from "./demo-sortable-table";
import {CurdApiDetail} from "./demo-crud-api/curd-api-detail";
import DemoMessage from "./demo-message";
// import DemoSetters from "./demo-setters";
import DemoIcons from "./demo-icons";
import {utils} from '../src/index'

const {pReactDOM,log} = utils;

log.setLogEnable({
    debug: false,
    error: false,
    info: false,
    log: false,
    deprecated: false,
    warning: false,
});

pReactDOM.configReactDOM18(ReactDOM, ReactDOMClient);

const root = pReactDOM.createRoot(document.getElementById('root') as HTMLElement);


root.render(
    // <React.StrictMode>
    <div>
        {/*<DemoBatchInput />*/}
        <DemoForm3 />
        {/*<DemoLoading />*/}
        {/*<DemoSortableTable />*/}
        {/*<DemoQueryFormSimple />*/}
        {/*<DemoTablePro />*/}
        {/*<DemoFormTable />*/}
        {/*<DemoButtons/>*/}
        {/*<DemoDialogShow/>*/}
        {/*<DemoUpload/>*/}
        {/*<DemoDrawerShow/>*/}
        {/*<DemoMenuButton/>*/}
        {/*<DemoFilter/>*/}
        {/*<DemoFormLayout />*/}
        {/*<DemoForm1/>*/}
        {/*<DemoForm2/>*/}
        {/*<DemoDetailPage/>*/}
        {/*<DemoQueryForm/>*/}
        {/*<DemoTmp/>*/}
        {/*<CurdApiDetail />*/}
        {/*<DemoImage />*/}
        {/*<DemoMessage />*/}
        {/*<DemoIcons />*/}
        {/*<DemoSetters />*/}
    </div>
     // </React.StrictMode>
)
