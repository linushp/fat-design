import React from 'react'
import {Loading, Button} from '../src/libs';
import './index.css'


export function DemoLoading(){
    return (
        <div>
            <div>
                <Button type={'primary'} onClick={() => {
                    Loading.showLoading({tip: "加载中" + Date.now()});
                }}>showLoading</Button>

                <Button type={'primary'} onClick={() => {
                    Loading.hideLoading();
                }}>hideLoading</Button>
            </div>

            <div>
                <Button type={'primary'} onClick={() => {
                    Loading.showLoading({tip: "加载中" + Date.now(), fullScreen: true});
                }}>showLoading fullScreen</Button>

                <Button type={'primary'} onClick={() => {
                    Loading.hideLoading();
                }}>hideLoading</Button>
            </div>

            {/*<Loading>*/}
            {/*    <div style={{height: '100px'}}>*/}
            {/*        hello*/}
            {/*    </div>*/}
            {/*</Loading>*/}
        </div>

    );
}
