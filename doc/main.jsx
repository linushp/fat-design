import React, {useEffect, useState, useRef} from 'react'
import * as ReactDOM1 from 'react-dom/client'
import {Router} from "./router.jsx";
import './main.less'



const AppLoader = () => {
    return <Router />
}



const root = ReactDOM1.createRoot(document.getElementById('root'));
root.render(<AppLoader/>);
