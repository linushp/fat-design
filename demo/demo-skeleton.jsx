import React from 'react'
import {Skeleton} from '../src/libs';
import './index.css'

export function DemoSkeleton(){
    return (
        <div style={{ width: '80%', margin: '0 auto' , paddingTop: '50px' }}>
            {/*<div style={{width: '60%'}}>*/}
            {/*    <Skeleton*/}
            {/*        animation*/}
            {/*        text={{ width: '90%' }}*/}
            {/*        image={{ shape: 'square' }}*/}
            {/*        loading={true} />*/}
            {/*</div>*/}

            <h1></h1>

            <Skeleton mode={'column'} />
            {/*<Skeleton mode={'column'} />*/}
            <div>

            </div>


        </div>

    );
}
