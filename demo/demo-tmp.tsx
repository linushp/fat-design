import React from 'react'
import ReactDOM from 'react-dom/client'
import {Button,Calendar,Input, Select,BatchInput,DatePicker} from '../src/libs';
import './index.css'


function DemoTmp1(props:any){
    const {children} = props;
    console.log('DemoTmp1', children)
    return (
        <div style={{width: '500px',marginLeft:'30px'}}>
            <div>
                Array.isArray: {""+Array.isArray(children)}
            </div>
            <div>
                typeof children: {typeof children}
            </div>
            {children}
        </div>
    );
}

export function DemoTmp(){
    return (
        <DemoTmp1>
            <>
            1
            </>
        </DemoTmp1>
    );
}
