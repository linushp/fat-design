import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { findDOMNode } from '../../util';

import Overlay, { RefWrapper } from './overlay';
import { makeChain, saveRef } from './utils';

/**
 * 弹窗内容
 */
const Popup = React.forwardRef((props, ref) => {
  const body = () => document.body;
  const {
    overlay,
    triggerType = 'click',
    triggerClickKeyCode,
    children,
    defaultVisible,
    className,
    onVisibleChange = () => {},
    container = body,
    style = {},
    placement = 'bl',
    canCloseByTrigger = true,
    delay = 200,
    mouseEnterDelay,
    mouseLeaveDelay,
    overlayProps = {},
    safeNode,
    followTrigger = false,
    target: otarget,
    disabled = false,
    ...others
  } = props;

  const [visible, setVisible] = useState(defaultVisible || props.visible);
  const triggerRef = useRef(null);
  const overlayRef = useRef(null);
  const mouseLeaveTimer = useRef(null);
  const mouseEnterTimer = useRef(null);
  const overlayClick = useRef(false);

  const child = children && React.Children.only(children);
  const overlayChild = React.Children.only(overlay);

  useEffect(() => {
    if ('visible' in props) {
      setVisible(props.visible);
    }
  }, [props.visible]);

  const handleVisibleChange = (visible, e, triggerType = 'fromTrigger') => {
    if (disabled) {
      return;
    }

    if (!('visible' in props)) {
      if (visible || overlayRef.current) {
        setVisible(visible);
      }
    }

    onVisibleChange(visible, triggerType, e);
  };

  const handleClick = (e) => {
    if (visible && !canCloseByTrigger) {
      return;
    }
    handleVisibleChange(!visible, e);
  };

  const handleKeyDown = (e) => {
    const keycodes = Array.isArray(triggerClickKeyCode)
      ? triggerClickKeyCode
      : [triggerClickKeyCode];
    if (keycodes.includes(e.keyCode)) {
      handleVisibleChange(!visible, e);
    }
  };

  const handleMouseEnter = (targetType) => {
    return (e) => {
      if (mouseLeaveTimer.current && visible) {
        clearTimeout(mouseLeaveTimer.current);
        mouseLeaveTimer.current = null;
        return;
      }

      if (!mouseEnterTimer.current && !visible) {
        mouseEnterTimer.current = setTimeout(() => {
          handleVisibleChange(true, e, targetType);
          mouseEnterTimer.current = null;
        }, mouseEnterDelay ?? delay);
      }
    };
  };

  const handleMouseLeave = (targetType) => {
    return (e) => {
      if (!mouseLeaveTimer.current && visible) {
        mouseLeaveTimer.current = setTimeout(() => {
          handleVisibleChange(false, e, targetType);
          mouseLeaveTimer.current = null;
        }, mouseLeaveDelay ?? delay);
      }

      if (mouseEnterTimer.current && !visible) {
        clearTimeout(mouseEnterTimer.current);
        mouseEnterTimer.current = null;
      }
    };
  };

  const handleFocus = (e) => {
    handleVisibleChange(true, e);
  };
  const handleBlur = (e) => {
    if (overlayClick.current) {
      overlayClick.current = false;
      return;
    }
    handleVisibleChange(false, e);
  };

  const handleOverlayClick = (e) => {
    overlayClick.current = true;
  };

  const handleRequestClose = (targetType, e) => {
    handleVisibleChange(false, e, targetType);
  };

  const triggerProps = {};
  const overlayOtherProps = {};
  const safeNodes = Array.isArray(safeNode) ? safeNode : [safeNode];

  if (child && !disabled) {
    const triggerTypeList =
      typeof triggerType === 'string' ? [triggerType] : triggerType;
    triggerTypeList.forEach((t) => {
      switch (t) {
        case 'click':
          triggerProps.onClick = makeChain(handleClick, child.props?.onClick);
          triggerProps.onKeyDown = makeChain(handleKeyDown, child.props?.onKeyDown);
          break;
        case 'hover':
          triggerProps.onMouseEnter = makeChain(
            handleMouseEnter('fromTrigger'),
            child.props?.onMouseEnter
          );
          triggerProps.onMouseLeave = makeChain(
            handleMouseLeave('fromTrigger'),
            child.props?.onMouseLeave
          );
          overlayOtherProps.onMouseEnter = makeChain(
            handleMouseEnter('overlay'),
            overlayProps.onMouseEnter
          );
          overlayOtherProps.onMouseLeave = makeChain(
            handleMouseLeave('overlay'),
            overlayProps.onMouseLeave
          );
          break;
        case 'focus':
          triggerProps.onFocus = makeChain(handleFocus, child.props?.onFocus);
          triggerProps.onBlur = makeChain(handleBlur, child.props?.onBlur);
          overlayOtherProps.onMouseDown = makeChain(handleOverlayClick, overlayProps.onMouseDown);
          break;
      }
    });

    // trigger 是安全节点
    safeNodes.push(() => findDOMNode(triggerRef.current));
  }

  const target = otarget || (child ? () => findDOMNode(triggerRef.current) : body);
  const getContainer =
    typeof container === 'string'
      ? () => document.getElementById(container)
      : typeof container !== 'function'
        ? () => container
        : () => container(findDOMNode(triggerRef.current));
  const overlayContainer = followTrigger
    ? () => findDOMNode(triggerRef.current)?.parentNode
    : getContainer;

  // triggerRef 可能会更新，等计算的时候再通过 findDOMNode 取真实值
  const refWrapperRef = useCallback((ref) => {
    triggerRef.current = ref;
  }, []);
  return (
    <>
      {child && (
        <RefWrapper ref={refWrapperRef}>{React.cloneElement(child, triggerProps)}</RefWrapper>
      )}
      <Overlay
        {...others}
        {...overlayOtherProps}
        placement={placement}
        container={overlayContainer}
        safeNode={safeNodes}
        visible={visible}
        target={target}
        onRequestClose={handleRequestClose}
        ref={useCallback(makeChain(saveRef(overlayRef), saveRef(ref)), [])}
      >
        {overlayChild}
      </Overlay>
    </>
  );
});

export default Popup;
