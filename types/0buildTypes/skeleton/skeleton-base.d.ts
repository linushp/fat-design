import React from 'react';
import { SkeletonProps } from './interface';
import './style/index';
declare const SkeletonBase: React.ForwardRefExoticComponent<SkeletonProps & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>>;
export { SkeletonBase };
