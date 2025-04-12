import classnames from 'classnames';
import Dialog from '../dialog';
import addEventListener from './utils/addEventListener';
import KeyCode from '../util/keycode';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {PreviewGroupContext} from './context';
import type {TransformAction, TransformType} from './hooks/useImageTransform';
import useImageTransform from './hooks/useImageTransform';
import useMouseEvent from './hooks/useMouseEvent';
import useTouchEvent from './hooks/useTouchEvent';
import useStatus from './hooks/useStatus';
import Operations from './Operations';
import {BASE_SCALE_RATIO} from './previewConfig';


type IDialogPropTypes = any;

export type ToolbarRenderInfoType = {
    icons: {
        flipYIcon: React.ReactNode;
        flipXIcon: React.ReactNode;
        rotateLeftIcon: React.ReactNode;
        rotateRightIcon: React.ReactNode;
        zoomOutIcon: React.ReactNode;
        zoomInIcon: React.ReactNode;
    };
    actions: {
        onFlipY: () => void;
        onFlipX: () => void;
        onRotateLeft: () => void;
        onRotateRight: () => void;
        onZoomOut: () => void;
        onZoomIn: () => void;
    };
    transform: TransformType;
    current: number;
    total: number;
};

export interface PreviewProps extends Omit<IDialogPropTypes, 'onClose'> {
    imgCommonProps?: React.ImgHTMLAttributes<HTMLImageElement>;
    src?: string;
    alt?: string;
    fallback?: string;
    movable?: boolean;
    rootClassName?: string;
    icons?: {
        rotateLeft?: React.ReactNode;
        rotateRight?: React.ReactNode;
        zoomIn?: React.ReactNode;
        zoomOut?: React.ReactNode;
        close?: React.ReactNode;
        left?: React.ReactNode;
        right?: React.ReactNode;
        flipX?: React.ReactNode;
        flipY?: React.ReactNode;
    };
    current?: number;
    count?: number;
    closeIcon?: React.ReactNode;
    countRender?: (current: number, total: number) => React.ReactNode;
    scaleStep?: number;
    minScale?: number;
    maxScale?: number;
    imageRender?: (
        originalNode: React.ReactElement,
        info: { transform: TransformType; current?: number },
    ) => React.ReactNode;
    onClose?: () => void;
    onTransform?: (info: { transform: TransformType; action: TransformAction }) => void;
    toolbarRender?: (
        originalNode: React.ReactElement,
        info: ToolbarRenderInfoType,
    ) => React.ReactNode;
    onChange?: (current: any, prev: any) => void;
    visible: boolean;
}

interface PreviewImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallback?: string;
    imgRef: React.MutableRefObject<HTMLImageElement>;
}

const PreviewImage: React.FC<PreviewImageProps> = ({fallback, src, imgRef, ...props}) => {
    const [getImgRef, srcAndOnload] = useStatus({
        src,
        fallback,
    });

    return (
        <img
            ref={ref => {
                imgRef.current = ref as any;
                getImgRef(ref);
            }}
            {...props}
            {...srcAndOnload}
        />
    );
};

const PreviewInner: React.FC<PreviewProps> = props => {
    const {
        prefixCls,
        src,
        alt,
        fallback,
        movable = true,
        onClose,
        visible,
        icons = {},
        rootClassName,
        closeIcon,
        getContainer,
        current = 0,
        count = 1,
        countRender,
        scaleStep = 0.5,
        minScale = 1,
        maxScale = 50,
        transitionName = 'zoom',
        maskTransitionName = 'fade',
        imageRender,
        imgCommonProps,
        toolbarRender,
        onTransform,
        onChange,
        ...restProps
    } = props;

    const imgRef = useRef<HTMLImageElement>();
    const groupContext = useContext(PreviewGroupContext);
    const showLeftOrRightSwitches = groupContext && count > 1;
    const showOperationsProgress = groupContext && count >= 1;
    const [enableTransition, setEnableTransition] = useState(true);
    const {transform, resetTransform, updateTransform, dispatchZoomChange} = useImageTransform(
        imgRef as any,
        minScale,
        maxScale,
        onTransform as any,
    );
    const {isMoving, onMouseDown, onWheel} = useMouseEvent(
        imgRef as any,
        movable,
        visible,
        scaleStep,
        transform,
        updateTransform,
        dispatchZoomChange,
    );
    const {isTouching, onTouchStart, onTouchMove, onTouchEnd} = useTouchEvent(
        imgRef as any,
        movable,
        visible,
        minScale,
        transform,
        updateTransform,
        dispatchZoomChange,
    );
    const {rotate, scale} = transform;

    const wrapClassName = classnames({
        [`${prefixCls}-moving`]: isMoving,
    });

    useEffect(() => {
        if (!enableTransition) {
            setEnableTransition(true);
        }
    }, [enableTransition]);

    const onAfterClose = () => {
        resetTransform('close');
    };

    const onZoomIn = () => {
        dispatchZoomChange(BASE_SCALE_RATIO + scaleStep, 'zoomIn');
    };

    const onZoomOut = () => {
        dispatchZoomChange(BASE_SCALE_RATIO / (BASE_SCALE_RATIO + scaleStep), 'zoomOut');
    };

    const onRotateRight = () => {
        updateTransform({rotate: rotate + 90}, 'rotateRight');
    };

    const onRotateLeft = () => {
        updateTransform({rotate: rotate - 90}, 'rotateLeft');
    };

    const onFlipX = () => {
        updateTransform({flipX: !transform.flipX}, 'flipX');
    };

    const onFlipY = () => {
        updateTransform({flipY: !transform.flipY}, 'flipY');
    };

    const onSwitchLeft = (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event?.preventDefault();
        event?.stopPropagation();
        if (current > 0) {
            setEnableTransition(false);
            resetTransform('prev');
            onChange?.(current - 1, current);
        }
    };

    const onSwitchRight = (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event?.preventDefault();
        event?.stopPropagation();
        if (current < count - 1) {
            setEnableTransition(false);
            resetTransform('next');
            onChange?.(current + 1, current);
        }
    };

    const onKeyDown = (event: KeyboardEvent) => {
        if (!visible || !showLeftOrRightSwitches) return;
        const keyCode = event.keyCode;
        if (keyCode === KeyCode.LEFT || keyCode === KeyCode.UP) {
            onSwitchLeft();
        } else if (keyCode === KeyCode.RIGHT || keyCode === KeyCode.DOWN) {
            onSwitchRight();
        }
    };

    const onDoubleClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if (visible) {
            if (scale !== 1) {
                updateTransform({x: 0, y: 0, scale: 1}, 'doubleClick');
            } else {
                dispatchZoomChange(
                    BASE_SCALE_RATIO + scaleStep,
                    'doubleClick',
                    event.clientX,
                    event.clientY,
                );
            }
        }
    };

    useEffect(() => {
        const onKeyDownListener = addEventListener(window, 'keydown', onKeyDown, false);

        return () => {
            onKeyDownListener.remove();
        };
    }, [visible, showLeftOrRightSwitches, current]);

    const styleObj = {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale3d(${
            transform.flipX ? '-' : ''
        }${scale}, ${transform.flipY ? '-' : ''}${scale}, 1) rotate(${rotate}deg)`,
        transitionDuration: (!enableTransition || isTouching) && '0s'
    }

    const clsImgWrapper = `${prefixCls}-img-wrapper`;

    const onClickImgWrapper = (e: any) => {
        if (e.target.className === clsImgWrapper && e.target.tagName === 'DIV') {
            if (typeof onClose === "function") {
                onClose();
            }
        }
    }


    const imgNode = (
        <PreviewImage
            {...imgCommonProps}
            width={props.width}
            height={props.height}
            imgRef={imgRef as any}
            className={`${prefixCls}-img`}
            alt={alt}
            style={styleObj as any}
            fallback={fallback}
            src={src}
            onWheel={onWheel}
            onMouseDown={onMouseDown}
            onDoubleClick={onDoubleClick}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchEnd}
        />
    );


    return (
        <Dialog
            closeable={true}
            onClose={onClose}
            visible={visible}
            footer={false}
            top={0}
            bottom={0}
            width={'100vw'}
            animation={false}
            minMargin={0}
            className={classnames({
                [`${prefixCls}-dialog`]: true,
                [`${rootClassName}`]: !!rootClassName,
            })}
            afterClose={onAfterClose}
        >
            <div className={`${prefixCls}-dialog-content ${wrapClassName}`}>

                <div className={clsImgWrapper} onClick={onClickImgWrapper}>
                    {imageRender
                        ? imageRender(imgNode, {transform, ...(groupContext ? {current} : {})})
                        : imgNode}
                </div>

                <Operations
                    visible={visible}
                    transform={transform}
                    maskTransitionName={maskTransitionName}
                    closeIcon={closeIcon}
                    getContainer={getContainer}
                    prefixCls={prefixCls}
                    rootClassName={rootClassName}
                    icons={icons}
                    countRender={countRender}
                    showSwitch={showLeftOrRightSwitches as any}
                    showProgress={showOperationsProgress as any}
                    current={current}
                    count={count}
                    scale={scale}
                    minScale={minScale}
                    maxScale={maxScale}
                    toolbarRender={toolbarRender as any}
                    onSwitchLeft={onSwitchLeft}
                    onSwitchRight={onSwitchRight}
                    onZoomIn={onZoomIn}
                    onZoomOut={onZoomOut}
                    onRotateRight={onRotateRight}
                    onRotateLeft={onRotateLeft}
                    onFlipX={onFlipX}
                    onFlipY={onFlipY}
                    onClose={onClose}
                    zIndex={restProps.zIndex !== undefined ? restProps.zIndex + 1 : undefined}
                />
            </div>
        </Dialog>
    );
};


function Preview(props: PreviewProps){
    if (!props.visible) {
        return null;
    }
    return <PreviewInner {...props} />
}


export default Preview;
