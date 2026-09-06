import { SkeletonBase } from './skeleton-base'
import React from "react";
import { SkeletonProps } from './interface';
import Box from '../box'


function ListSkeleton(props: SkeletonProps) {
    const arr = [0, 1, 2];
    return (
        <div className={'fatd-skeleton-pro-list'}>
            <SkeletonBase
                animation
                text={{ width: '60%' }}
                loading={true} />
            <div style={{borderBottom: '1px dashed #CCC', margin: '0 16px 20px 0', height: '20px'}} />
            {
                arr.map((item, i) => {
                    return (
                        <div style={{marginBottom: '40px'}} key={i}>
                            <SkeletonBase
                                animation
                                text={{ width: '60%' }}
                                image={{ shape: 'square' }}
                                loading={true} />
                        </div>
                    )
                })
            }
        </div>
    )
}

function ColumnSkeleton(props: SkeletonProps) {
    const arr = [0, 1, 2];
    const renderSkeleton = () => {
        return (
            <div style={{width:'33.333%'}}>
                <SkeletonBase
                    animation
                    text={{ width: '60%' }}
                    loading={true} />
            </div>
        )
    }
    const renderRow = ()=>{
        return (
            <>
                <Box direction={'row'} spacing={30} v2={true}>
                    {renderSkeleton()}
                    {renderSkeleton()}
                    {renderSkeleton()}
                </Box>
                <div style={{height:'40px'}}/>
            </>
        )
    }
    return (
        <div className={'fatd-skeleton-pro-column'}>
            {renderRow()}
            {renderRow()}
            {renderRow()}
        </div>
    )
}


function SkeletonComponent(props: SkeletonProps) {
    const { loading = true, children, mode } = props;

    if (!loading) {
        return children;
    }

    if (mode === 'list') {
        return (<ListSkeleton />)
    }

    if (mode === 'column') {
        return (<ColumnSkeleton />)
    }

    return <SkeletonBase {...props} />
}

export default SkeletonComponent;