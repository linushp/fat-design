import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Button from '../button';
import Input from '../input';

const { TextArea } = Input;

/**
 * 默认的评论输入组件
 */
const CommentInput = ({ 
    value, 
    onChange, 
    onSubmit, 
    placeholder, 
    loading, 
    disabled, 
    showSubmitButton = true, 
    submitText = '发表评论',
    rows = 3,
    autoHeight = true,
    className,
    prefix = 'fat-',
    ...others 
}) => {
    const [inputValue, setInputValue] = useState(value || '');
    
    useEffect(() => {
        setInputValue(value || '');
    }, [value]);

    const handleChange = (v) => {
        setInputValue(v);
        onChange && onChange(v);
    };

    const handleSubmit = async () => {
        if (!inputValue.trim()) return;
        if (onSubmit) {
            try {
                await onSubmit(inputValue.trim());
                setInputValue('');
            } catch (error) {
                console.error('Submit comment error:', error);
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className={cx(`${prefix}comments-input`, className)} {...others}>
            <TextArea
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={disabled || loading}
                rows={rows}
                autoHeight={autoHeight ? { minRows: rows, maxRows: 8 } : false}
                className={`${prefix}comments-input-textarea`}
            />
            {showSubmitButton && (
                <div className={`${prefix}comments-input-actions`}>
                    <div className={`${prefix}comments-input-tip`}>
                        <span>Ctrl + Enter 快速发布</span>
                    </div>
                    <Button 
                        type="primary" 
                        size="small"
                        loading={loading}
                        disabled={disabled || !inputValue.trim()}
                        onClick={handleSubmit}
                    >
                        {submitText}
                    </Button>
                </div>
            )}
        </div>
    );
};

CommentInput.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    placeholder: PropTypes.string,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    showSubmitButton: PropTypes.bool,
    submitText: PropTypes.string,
    rows: PropTypes.number,
    autoHeight: PropTypes.bool,
    className: PropTypes.string,
    prefix: PropTypes.string
};

/**
 * 自定义比较函数，用于性能优化
 */
const arePropsEqual = (prevProps, nextProps) => {
    // 比较关键属性
    if (prevProps.value !== nextProps.value) return false;
    if (prevProps.loading !== nextProps.loading) return false;
    if (prevProps.disabled !== nextProps.disabled) return false;
    
    return true;
};

// 使用 React.memo 包装组件
export default memo(CommentInput, arePropsEqual);