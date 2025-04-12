import React from 'react';
import { Point } from './types';
export type OnStartArgs = {
    point: Point;
    pointInWindow: Point;
};
export type OnMoveArgs = {
    point: Point;
    pointInWindow: Point;
};
type UseDragProps = {
    onStart?: (args: OnStartArgs) => void;
    onMove?: (args: OnMoveArgs) => void;
    onEnd?: () => void;
    allowDrag?: boolean;
    containerRef: React.MutableRefObject<HTMLElement | null>;
    knobs?: HTMLElement[];
};
export declare const useDrag: ({ onStart, onMove, onEnd, allowDrag, containerRef, knobs, }: UseDragProps) => {
    onMouseDown?: undefined;
} | {
    onMouseDown: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};
export {};
