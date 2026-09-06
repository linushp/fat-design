import React, { forwardRef, PropsWithChildren } from 'react';
import cs from 'classnames';
import { isObject } from "../util/object";
import { SkeletonProps } from './interface';
import Text from './text';
import Image from './image';
import { pickAttrs } from '../util';
import './style/index';

function getComponentProps(prop) {
  return isObject(prop) ? prop : {};
}

const defaultProps: SkeletonProps = {
  text: true,
  loading: true,
};

const prefixCls = 'fatd-skeleton';

function Skeleton(baseProps: PropsWithChildren<SkeletonProps>, ref) {
  const props: SkeletonProps = Object.assign({}, defaultProps, baseProps);

  const { style, className, animation, loading, image, text, children } = props;

  const imageProps = getComponentProps(image);
  const textProps = getComponentProps(text);
  const classNames = cs(
    prefixCls,
    {
      [`${prefixCls}-animate`]: animation,
      [`${prefixCls}-rtl`]: false,
    },
    className
  );

  function renderImage() {
    return (
      image && (
        <div className={`${prefixCls}-header`}>
          <Image prefixCls={prefixCls} {...imageProps} />
        </div>
      )
    );
  }

  function renderText() {
    return (
      text && (
        <div className={`${prefixCls}-content`}>
          <Text prefixCls={prefixCls} {...textProps} />
        </div>
      )
    );
  }

  return (
    <React.Fragment>
      {loading ? (
        <div {...pickAttrs(props)} className={classNames} style={style} ref={ref}>
          {imageProps.position !== 'right' && renderImage()}
          {renderText()}
          {imageProps.position === 'right' && renderImage()}
        </div>
      ) : (
        children
      )}
    </React.Fragment>
  );
}

const SkeletonBase = forwardRef<unknown, PropsWithChildren<SkeletonProps>>(Skeleton);

SkeletonBase.displayName = 'SkeletonBase';

export {
    SkeletonBase
};

