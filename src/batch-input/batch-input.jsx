import React, {useEffect, useRef, useState} from 'react';
import Button from '../button';
import TextArea from './textarea/textarea';
import Input from './textarea/input';
import zhCN from '../locale/zh-cn';
import ConfigProvider from "../config-provider";
const defaultPrefix = ConfigProvider.defaultPrefix;


function useMouseOver(options) {
    const {disabled} = options;
    const [over, setOver] = useState(false);

    const onMouseEnter = () => {
        if (disabled) return;
        setOver(true);
    };

    const onMouseLeave = () => {
        if (disabled) return;
        setOver(false);
    };

    return {
        over,
        mouseProps: {
            onMouseEnter,
            onMouseLeave,
        },
    };
}

function useGlobalEvent(options) {
    const {
        over,
        batch,
        overlay,
        textArea,
        input,
        setTextAreaVisible,
        container,
        textAreaVisible,
        hasRightIntersect,
    } = options;
    let _container = container;
    if (container) {
        _container = typeof container === 'function' ? container() : container;
    }
    const documentEventTag = _container || document.body;
    const windowEventTag = _container || window;
    useEffect(() => {
        const documentClickHook = () => {
            if (!over) setTextAreaVisible(false);
        };
        const renderTooltipPos = () => {
            const bound = batch.current.getBoundingClientRect();
            if (overlay.current) {
                const OPTIMIZE_HEIGHT = 1;
                if (hasRightIntersect) {
                    // 判断是否可视
                    const overlayWidth = parseInt(
                        window.getComputedStyle(overlay.current)?.width
                    );

                    overlay.current.style.left = `${
                        bound.x + bound.width - overlayWidth
                    }px`;
                } else {
                    overlay.current.style.left = `${bound.x}px`;
                }
                overlay.current.style.top = `${
                    bound.y + bound.height + OPTIMIZE_HEIGHT
                }px`;
            }
        };
        // 浏览器兼容性
        textArea.current.getInputNode().setAttribute('spellcheck', "false");
        input.current.getInputNode().setAttribute('spellcheck', "false");
        documentEventTag.addEventListener('click', documentClickHook);
        windowEventTag.addEventListener('scroll', renderTooltipPos, true);
        return () => {
            documentEventTag.removeEventListener('click', documentClickHook);
            windowEventTag.removeEventListener('scroll', renderTooltipPos, true);
        };
    }, [over, textAreaVisible]);
}

const BatchInput = (props, ref)=> {

    const {
        locale,
        className,
        style = {},
        placeholder,
        disabled,
        formatter,
        onChange,
        isArrayValue,
        value,
        defaultValue,
        container,
        onOverlayDisappear,
        maxLength,
        isBtnPaste,
        target,
        size,
        inputCls,
        textAreaWidth,
        openChineseInput,
        prefix,
        state,
        ...otherProps
    } = props;

    const separatorArr = [',', '，'];
    const defaultSeparator = separatorArr[0];
    const isControl = ('value' in props);

    const {inputHolder, textAreaHolder, repeatLast, warningTips} = locale || {};

    const [textAreaVisible, _setTextAreaVisible] = useState(false);
    const [internalValue, setInternalValue] = useState(
        isControl ? value : defaultValue
    );
    const {over, mouseProps} = useMouseOver({disabled});
    const overlay = useRef(null);
    const batch = useRef(null);
    const textArea = useRef(null);
    const input = useRef(null);
    // const activeCls = over || textAreaVisible ? 'active' : '';

    const controlValue = isControl ? value : internalValue;
    const isArray = Array.isArray(controlValue);
    const inputValue = isArray
        ? controlValue.join(defaultSeparator)
        : controlValue;
    const [pasteText, setPasteText] = useState('');
    const [isMax, setIsMax] = useState(false);
    const [hasRightIntersect, setRightIntersectState] = useState(false);
    const textAreaValue = isArray
        ? controlValue.join('\n')
        : controlValue
            ? String(controlValue).split(defaultSeparator).join('\n')
            : controlValue;

    const isLastCommaOrEmptyStr = (controlValue) => {
        if (controlValue?.length > 0) {
            return (
                controlValue[controlValue.length - 1] ===
                (Array.isArray(controlValue) ? '' : ',')
            );
        }

        return false;
    };
    const removeLastCommaOrEmptyStr = (controlValue) => {
        return controlValue.slice(0, controlValue.length - 1);
    };
    const setTextAreaVisible = (visible) => {
        if (visible === false && textAreaVisible === true) {
            onOverlayDisappear && onOverlayDisappear(internalValue);
        }
        if (visible === false && isLastCommaOrEmptyStr(internalValue)) {
            updateState(removeLastCommaOrEmptyStr(internalValue));
        }
        _setTextAreaVisible(visible);
    };

    const format = (value) => {
        switch (formatter) {
            case 'number':
                return value.replace(/[^\d,\n]/g, '');
            default:
                return value;
        }
    };

    const solveActualInputValue = (value) => {
        return value
            .toString()
            .replace(/\s+/g, defaultSeparator)
            .replace(new RegExp(`${defaultSeparator}+`, 'g'), defaultSeparator)
            .replace(new RegExp(`^${defaultSeparator}`), '');
    };

    const handleValue = (inputValue) => {
        if (!inputValue) return inputValue;
        if (isArrayValue) {
            if (Array.isArray(inputValue)) {
                return inputValue;
            } else {
                return String(inputValue).split(',');
            }
        } else {
            return inputValue;
        }
    };

    const handleMax = (inputValue) => {
        if (!inputValue || !maxLength || typeof maxLength !== 'number') {
            setIsMax(false);
            return inputValue;
        }
        if (Array.isArray(inputValue)) {
            if (inputValue.length > maxLength) {
                setIsMax(true);
            } else {
                setIsMax(false);
            }
            return inputValue;
        } else {
            const newValue = String(inputValue).split(',');
            if (newValue.length > maxLength) {
                setIsMax(true);
            } else {
                setIsMax(false);
            }
            return newValue.join(',');
        }
    };


    const updateState = (inputValue) => {
        const newValue = handleValue(inputValue);
        const maxValue = handleMax(newValue);

        setInternalValue(maxValue);
        maxValue?.length > 0 && setPasteText(maxValue);

        if (typeof onChange === "function") {
            onChange(maxValue);
        }

    };

    const onActualInputChange = (value) => {
        if (/\S+ \S+/g.test(value)) return;
        value = solveActualInputValue(format(value));
        updateState(value);
    };

    // 计算宽度
    const countWidth = () => {
        // 基于设计稿优化宽度
        const OPTIMIZE_WIDTH = 88;
        const overlayWidth = parseInt(window.getComputedStyle(batch.current).width);
        return typeof textAreaWidth !== 'number'
            ? `${overlayWidth + OPTIMIZE_WIDTH}px`
            : `${textAreaWidth}px`;
    };
    const updateOverlayStyle = () => {
        if (overlay.current && batch.current) {
            overlay.current.style.width = countWidth();
        }
    };
    updateOverlayStyle();

    useEffect(() => {
        const visibleObserver = new IntersectionObserver((entries) => {
            if (overlay.current && batch.current && entries[0].rootBounds) {
                if (
                    entries[0].rootBounds?.width <
                    parseInt(countWidth()) + entries[0].boundingClientRect.x
                ) {
                    setRightIntersectState(true);
                }
            }
        });
        overlay.current && visibleObserver.observe(overlay.current);
        return () => {
            overlay.current && visibleObserver.disconnect();
        };
    }, []);

    const renderTooltipPos = () => {
        const bound = batch.current.getBoundingClientRect();
        // 基于设计稿优化高度
        const OPTIMIZE_HEIGHT = 1;
        const overlayCurrent = overlay.current;
        if (!overlayCurrent) {
            return;
        }

        if (hasRightIntersect) {
            // 判断是否可视
            const overlayWidth = parseInt(
                window.getComputedStyle(overlay.current).width
            );

            overlayCurrent.style.left = `${
                bound.x + bound.width - overlayWidth
            }px`;
        } else {
            overlayCurrent.style.left = `${bound.x}px`;
        }
        overlayCurrent.style.top = `${
            bound.height + bound.y + OPTIMIZE_HEIGHT
        }px`;
    };

    const onInputAreaClick = (e) => {
        renderTooltipPos();
        setTimeout(() => {
            if (textArea.current) textArea.current?.focus();
        }, 100);
        setTextAreaVisible(e.target.tagName !== 'I');
    };

    const solveTextAreaValue = (value) => {
        if (openChineseInput) {
            /**
             * /\s/    // 匹配任何空白字符，包括空格、制表符、换页符等等。等价于 [ \f\n\r\t\v]。
             * /\x20/    // 匹配一个空格。
             * /\f/    // 匹配一个换页符。
             * /\n/    // 匹配一个换行符。
             * /\r/    // 匹配一个回车符。
             */
            value = value
                .replace(/\f+/g, '\n')
                .replace(/\n+/g, '\n')
                .replace(/\r+/g, '\n');
        } else {
            value = value.replace(/\s+/g, '\n');
        }
        separatorArr.forEach((item) => {
            value = value.replace(new RegExp(`${item}+`, 'g'), '\n');
        });
        return value.replace(/\n+/g, '\n').replace(/^\n/g, '');
    };

    const onTextAreaChange = (value) => {
        value = solveTextAreaValue(format(value));

        updateState(value.split('\n').join(defaultSeparator));
    };

    const onTextAreaPaste = () => {
        updateState(pasteText);
    };

    useGlobalEvent({
        over,
        batch,
        overlay,
        textArea,
        input,
        setTextAreaVisible,
        container,
        textAreaVisible,
        hasRightIntersect,
    });



    return (
        <div className={`${prefix}batch-input-wrapper`}>
            <div
                style={{width: '100%', ...style}}
                className={className}
                ref={batch}
                {...mouseProps}
                onClick={onInputAreaClick}
            >
                <div className='actual-input-wrapper'>
                    <Input
                        className={`actual-input  ${inputCls || ''}`}
                        hasClear
                        style={{width: '100%'}}
                        placeholder={placeholder || inputHolder}
                        value={inputValue}
                        ref={input}
                        target={target}
                        size={size}
                        onChange={onActualInputChange}
                        cutString={false}
                        showLimitHint
                        maxLength={maxLength}
                        disabled={disabled}
                        state={state || `${isMax ? 'error' : ''}`}
                        prefix={prefix}
                        {...otherProps}
                    />
                </div>
                <div
                    className={`text-area-wrapper ${isMax ? 'error' : 'normal'} ${
                        textAreaVisible ? 'visible' : ''
                    }`}
                    ref={overlay}
                >
                    <div className='text-area-container'>
                        <div className='text-area-toolbar'>
                            <div className='text-area-toolbar-input-holder'>{inputHolder}</div>
                            <Button
                                type='primary'
                                className={`text-area-btn  ${isBtnPaste ? 'visible' : ''} `}
                                onClick={onTextAreaPaste}
                                text
                            >
                                {repeatLast}
                            </Button>
                        </div>
                        <TextArea
                            className={`${isMax ? 'error next-error' : ''}`}
                            value={textAreaValue}
                            cutString={false}
                            target={target}
                            ref={textArea}
                            placeholder={placeholder || textAreaHolder}
                            onChange={onTextAreaChange}
                            showLimitHint
                            maxLength={maxLength}
                            size='small'
                            prefix={prefix}
                        />
                        <div
                            className={`text-area-error-tips ${isMax ? 'error' : 'normal'}`}
                        >
                            {warningTips}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


BatchInput.defaultProps = {
    formatter: '',
    isArrayValue: false,
    maxLength: 1000,
    target: 'items',
    openChineseInput: false,
    locale: zhCN.BatchInput,
    prefix: defaultPrefix,
};

BatchInput.displayName = 'BatchInput';

export default BatchInput;
