import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  cloneElement,
  useContext,
} from 'react';
import { findDOMNode, createPortal } from '../../util/react-dom';
import getPlacements from './placement';
import {
  useListener,
  getHTMLElement,
  getTargetNode,
  getStyle,
  setStyle,
  getRelativeContainer,
  throttle,
  callRef,
  getOverflowNodes,
  getScrollbarWidth,
  getFocusNodeList,
  isSameObject,
  useEvent,
} from './utils';
import OverlayContext from './overlay-context';

const isScrollDisplay = function (element) {
  try {
    const scrollbarStyle = window.getComputedStyle(element, '::-webkit-scrollbar');
    return !scrollbarStyle || scrollbarStyle.getPropertyValue('display') !== 'none';
  } catch (e) {
    // ignore error for firefox
  }

  return true;
};

const hasScroll = (containerNode) => {
  const overflow = getStyle(containerNode, 'overflow');
  if (overflow === 'hidden') {
    return false;
  }

  const parentNode = containerNode.parentNode;

  return (
    parentNode &&
    parentNode.scrollHeight > parentNode.clientHeight &&
    getScrollbarWidth() > 0 &&
    isScrollDisplay(parentNode) &&
    isScrollDisplay(containerNode)
  );
};

/**
 * 传入的组件可能是没有 forwardRef 包裹的 Functional Component, 会导致取不到 ref
 */
export class RefWrapper extends React.Component {
  render() {
    return this.props.children;
  }
}

const body = () => document.body;


const Overlay = React.forwardRef((props, ref) => {
  const {
    target,
    children,
    wrapperClassName,
    maskClassName,
    maskStyle,
    hasMask,
    canCloseByMask = true,
    maskRender,
    points,
    offset,
    fixed,
    visible,
    onRequestClose = () => {},
    onOpen,
    onClose,
    container: popupContainer = body,
    placement,
    placementOffset,
    disableScroll = false,
    canCloseByOutSideClick = true,
    canCloseByEsc = true,
    safeNode,
    /**
     * 弹窗
     */
    beforePosition,
    onPosition,
    cache = false,
    autoAdjust,
    autoFocus = false,
    isAnimationEnd = true,
    rtl,
    wrapperStyle: owrapperStyle,
    ...others
  } = props;

  const position = fixed ? 'fixed' : 'absolute';

  const [firstVisible, setFirst] = useState(visible);
  const [, forceUpdate] = useState(null);
  const positionStyleRef = useRef({ position });
  const getContainer =
    typeof popupContainer === 'string'
      ? () => document.getElementById(popupContainer)
      : typeof popupContainer !== 'function'
        ? () => popupContainer
        : popupContainer;
  const [container, setContainer] = useState(null);
  const targetRef = useRef(null);
  const preTarget = useRef(target);
  const overlayRef = useRef(null);
  const containerRef = useRef(null);
  const maskRef = useRef(null);
  const overflowRef = useRef([]);
  const lastFocus = useRef(null);
  const ro = useRef(null);
  const [uuid] = useState(Date.now().toString(36));
  const { setVisibleOverlayToParent, ...otherContext } = useContext(OverlayContext);
  const childIDMap = useRef(new Map());

  const handleOpen = (node) => {
    setVisibleOverlayToParent(uuid, node);
    onOpen?.(node);
  };
  const handleClose = () => {
    positionStyleRef.current = null;
    setVisibleOverlayToParent(uuid, null);
    onClose?.();
  };

  const getVisibleOverlayFromChild = (id, node) => {
    if (node) {
      childIDMap.current.set(id, node);
    } else {
      childIDMap.current.delete(id);
    }
    // 让父级也感知
    setVisibleOverlayToParent(id, node);
  };

  const child = React.Children.only(children);
  if (typeof child.ref === 'string') {
    throw new Error('Can not set ref by string in Overlay, use function instead.');
  }

  const updatePosition = useEvent(() => {
    const overlayNode = overlayRef.current;
    const containerNode = containerRef.current;
    const targetNode = targetRef.current;

    if (!overlayNode || !containerNode || !targetNode) {
      return;
    }

    const placements = getPlacements({
      target: targetNode,
      overlay: overlayNode,
      container: containerNode,
      scrollNode: overflowRef.current,
      points,
      offset,
      position,
      placement,
      placementOffset,
      beforePosition,
      autoAdjust,
      rtl,
      autoHideScrollOverflow: others.autoHideScrollOverflow,
    });

    if (!isSameObject(positionStyleRef.current, placements.style)) {
      positionStyleRef.current = placements.style;
      setStyle(overlayNode, placements.style);
      typeof onPosition === 'function' && onPosition(placements);
    }
  });

  // 弹窗挂载
  const overlayRefCallback = useCallback(
    (nodeRef) => {
      const node = findDOMNode(nodeRef);
      overlayRef.current = node;
      callRef(ref, node);
      if (node !== null && container) {
        const containerNode = getRelativeContainer(getHTMLElement(container));
        containerRef.current = containerNode;

        const targetElement =
          target === 'viewport'
            ? hasMask
              ? maskRef.current
              : body()
            : getTargetNode(target) || body();
        const targetNode = getHTMLElement(targetElement);
        targetRef.current = targetNode;

        overflowRef.current = getOverflowNodes(targetNode, containerNode);

        // fixme: 在followTrigger且空间受限且overlay自动宽度情况下，overlay宽度会跟随left设定自动撑满containing block最右侧，这里建议手动设定overlay宽度或拥有固定内容宽度的overlay来解决，这里暂时使用原来的-1000位置的方案隐藏overlay并不影响容器宽高
        setStyle(node, {
          position: fixed ? 'fixed' : 'absolute',
          top: -1000,
          left: -1000,
        });

        const waitTime = 100;
        const throttledUpdatePosition = throttle(updatePosition, waitTime);
        ro.current = new ResizeObserver(throttledUpdatePosition);
        ro.current.observe(containerNode);
        ro.current.observe(node);
        // fist call, 不依赖 ResizeObserver observe时的首次执行(测试环境不会执行)，因为 throttle 原因也不会执行两次
        throttledUpdatePosition();

        forceUpdate({});

        if (autoFocus) {
          // 这里setTimeout是等弹窗位置计算完成再进行 focus，否则弹窗还在页面最低端，会出现突然滚动到页面最下方的情况
          setTimeout(() => {
            const focusableNodes = getFocusNodeList(node);
            if (focusableNodes.length > 0 && focusableNodes[0]) {
              lastFocus.current = document.activeElement;
              focusableNodes[0].focus();
            }
          }, waitTime);
        }

        !cache && handleOpen(node);
      } else {
        !cache && handleClose();
        if (ro.current) {
          ro.current.disconnect();
          ro.current = null;
        }
      }
    },
    [container]
  );

  const clickEvent = (e) => {
    // 点击在子元素上面，则忽略。为了兼容 react16，这里用 contains 判断而不利用 e.stopPropagation() 阻止冒泡的特性来处理
    for (const [, oNode] of childIDMap.current.entries()) {
      const node = getHTMLElement(oNode);
      if (node && (node === e.target || node.contains(e.target))) {
        return;
      }
    }

    if (!visible) {
      return;
    }

    // 点击遮罩关闭
    if (hasMask && maskRef.current === e.target) {
      if (canCloseByMask) {
        onRequestClose('maskClick', e); // TODO: will rename to `mask` in 1.0
      }
      return;
    }

    const safeNodeList = Array.isArray(safeNode) ? safeNode : [safeNode];

    // 弹层默认是安全节点
    if (overlayRef.current) {
      safeNodeList.push(() => overlayRef.current);
    }

    // 安全节点不关闭
    for (let i = 0; i < safeNodeList.length; i++) {
      const safeNode = getTargetNode(safeNodeList[i]);
      const node = getHTMLElement(safeNode);

      if (node && (node === e.target || node.contains(e.target))) {
        return;
      }
    }

    if (canCloseByOutSideClick) {
      onRequestClose('docClick', e);
    }
  };


  useListener(
    typeof document !== 'undefined' ? document : null,
    'mousedown',
    clickEvent,
    false,
    !!(visible && overlayRef.current && (canCloseByOutSideClick || (hasMask && canCloseByMask)))
  );

  const keydownEvent = (e) => {
    if (!visible) {
      return;
    }

    // 无子元素才能 esc 取消关闭
    if (e.keyCode === 27 && canCloseByEsc && !childIDMap.current.size) {
      onRequestClose('esc', e);
    }
  };
  useListener(
    typeof document !== 'undefined' ? document : null,
    'keydown',
    keydownEvent,
    false,
    !!(visible && overlayRef.current && canCloseByEsc)
  );

  const scrollEvent = (e) => {
    if (!visible) {
      return;
    }
    updatePosition();
  };
  useListener(
    typeof document !== 'undefined'
      ? overflowRef.current?.map((t) => (t === document.documentElement ? document : t))
      : null,
    'scroll',
    scrollEvent,
    false,
    !!(visible && overlayRef.current && overflowRef.current?.length)
  );

  // 有弹窗情况下在 body 增加 overflow:hidden，两个弹窗同时存在也没问题，会按照堆的方式依次 pop
  useEffect(() => {
    if (visible && disableScroll) {
      const originStyle = document.body.getAttribute('style');
      setStyle(document.body, 'overflow', 'hidden');

      if (hasScroll(document.body)) {
        const scrollWidth = getScrollbarWidth();
        if (scrollWidth) {
          setStyle(
            document.body,
            'padding-right',
            `calc(${getStyle(document.body, 'padding-right')} + ${scrollWidth}px)`
          );
        }
      }

      return () => {
        document.body.setAttribute('style', originStyle || '');
      };
    }

    return undefined;
  }, [visible && disableScroll]);

  // 第一次加载并且 visible=false 的情况不挂载弹窗
  useEffect(() => {
    if (!firstVisible && visible) {
      setFirst(true);
    }
  }, [visible]);

  // cache 情况下的模拟 onOpen/onClose
  const overlayNode = overlayRef.current; // overlayRef.current 可能会异步变化，所以要先接下
  useEffect(() => {
    if (cache && overlayNode) {
      if (visible) {
        updatePosition();
        handleOpen(overlayNode);
      } else {
        handleClose();
      }
    }
  }, [visible, cache && overlayNode]);

  // target 动态更新则重新刷新定位
  useEffect(() => {
    if (visible && overlayNode) {
      if (target && targetRef.current && preTarget.current !== target) {
        const targetElement =
          target === 'viewport'
            ? hasMask
              ? maskRef.current
              : body()
            : getTargetNode(target) || body();
        const targetNode = getHTMLElement(targetElement);
        if (targetNode && targetRef.current !== targetNode) {
          targetRef.current = targetNode;
          updatePosition();
        }
        preTarget.current = target;
      }
    }
  }, [target]);

  useEffect(() => {
    if (visible && overlayNode) {
      updatePosition();
    }
  }, [offset, placement, placementOffset, points, autoAdjust, rtl]);

  // autoFocus 弹窗关闭后回到触发点
  useEffect(() => {
    if (!visible && autoFocus && lastFocus.current) {
      lastFocus.current.focus();
      lastFocus.current = null;
    }
  }, [!visible && autoFocus && lastFocus.current]);

  // container 异步加载, 因为 container 很可能还没渲染完成，所以 visible 后这里异步设置下
  useEffect(() => {
    if (visible) {
      // 首次更新
      if (!container) {
        setContainer(getContainer());
      } else if (getContainer() !== container) {
        setContainer(getContainer());
      }
    }
  }, [visible, popupContainer]);

  if (firstVisible === false || !container) {
    return null;
  }

  if (!visible && !cache && isAnimationEnd) {
    return null;
  }

  const newChildren = child ? (
    <RefWrapper ref={overlayRefCallback}>
      {cloneElement(child, {
        ...others,
        style: { top: 0, left: 0, ...child.props.style, ...positionStyleRef.current },
      })}
    </RefWrapper>
  ) : null;

  const wrapperStyle = { ...owrapperStyle };
  if (cache && !visible && isAnimationEnd) {
    wrapperStyle.display = 'none';
  }

  const maskNode = <div className={maskClassName} style={maskStyle} ref={maskRef} />;

  const content = (
    <div className={wrapperClassName} style={wrapperStyle}>
      {hasMask ? (maskRender ? maskRender(maskNode) : maskNode) : null}
      {newChildren}
    </div>
  );

  return (
    <OverlayContext.Provider
      value={{
        ...otherContext,
        setVisibleOverlayToParent: getVisibleOverlayFromChild,
      }}
    >
      {createPortal(content, container)}
    </OverlayContext.Provider>
  );
});

export default Overlay;
