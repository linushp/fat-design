import * as ReactDOMClient from 'react-dom/client'
import * as ReactDOM from 'react-dom'
import { configReactDOM18 , logger } from "fat-design";
import 'fat-design/style.css'
function prepareLoadAssets() {
    configReactDOM18(ReactDOM, ReactDOMClient);
    logger.setLogEnable(false);
}
prepareLoadAssets();
