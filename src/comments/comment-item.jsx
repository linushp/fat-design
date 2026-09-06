import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Button from '../button';
import CommentInput from './comment-input';
import UserAvatar from './user-avatar';

/**
 * 单个评论项组件
 */
const CommentItem = ({ 
    comment, 
    isChild = false, 
    onReply, 
    onLike, 
    onDelete, 
    onEdit,
    onLoadMoreChildren,
    onShowAllChildren,
    loadingChildren = false,
    replyPlaceholder = '写下你的回复...',
    prefix = 'fat-',
    defaultChildrenCount = 5,
    maxChildrenCount = 10,
    showUserCard = false,
    className,
    ...others
}) => {
    const children = comment.children || [];
    const childrenTotal = comment.childrenTotal || children.length;
    
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [replyLoading, setReplyLoading] = useState(false);
    
    const hasMoreChildren = children.length > defaultChildrenCount;
    const canShowMore = children.length > defaultChildrenCount && 
                        children.length <= maxChildrenCount;
    const shouldShowDialog = children.length > maxChildrenCount;

    const handleReply = async (content) => {
        setReplyLoading(true);
        try {
            if (onReply) {
                await onReply(comment.id, content);
                setShowReplyInput(false);
            }
        } finally {
            setReplyLoading(false);
        }
    };

    const handleLike = () => {
        if (onLike) {
            onLike(comment.id);
        }
    };

    const handleLoadMore = () => {
        if (shouldShowDialog) {
            onShowAllChildren && onShowAllChildren(comment.id);
        } else {
            onLoadMoreChildren && onLoadMoreChildren(comment.id);
        }
    };

    const formatTime = (time) => {
        if (!time) return '';
        const date = new Date(time);
        const now = new Date();
        const diff = now - date;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 30) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hour = String(date.getHours()).padStart(2, '0');
            const minute = String(date.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day} ${hour}:${minute}`;
        }
        
        if (days > 0) return `${days}天前`;
        if (hours > 0) return `${hours}小时前`;
        if (minutes > 0) return `${minutes}分钟前`;
        return '刚刚';
    };

    return (
        <div className={cx(`${prefix}comments-item`, {
            [`${prefix}comments-item-child`]: isChild
        }, className)} {...others}>
            <div className={`${prefix}comments-item-content`}>
                <UserAvatar
                    user={comment.author}
                    size={isChild ? 'small' : 'medium'}
                    showUserCard={showUserCard}
                    prefix={prefix}
                    className={`${prefix}comments-item-avatar`}
                />
                
                <div className={`${prefix}comments-item-main`}>
                    <div className={`${prefix}comments-item-header`}>
                        <span className={`${prefix}comments-item-author`}>
                            {comment.author.name}
                        </span>
                        {comment.author.title && (
                            <span className={`${prefix}comments-item-author-title`}>
                                {comment.author.title}
                            </span>
                        )}
                        <span className={`${prefix}comments-item-time`}>
                            {formatTime(comment.createdAt)}
                        </span>
                    </div>
                    
                    <div className={`${prefix}comments-item-text`}>
                        {comment.content}
                    </div>
                    
                    <div className={`${prefix}comments-item-actions`}>
                        <Button 
                            text 
                            size="small" 
                            onClick={handleLike}
                            className={cx(`${prefix}comments-item-like`, {
                                [`${prefix}comments-item-like-active`]: comment.liked
                            })}
                        >
                            <span className={`${prefix}comments-item-like-icon`}>
                                {comment.liked ? '👍' : '🤍'}
                            </span>
                            <span className={`${prefix}comments-item-like-count`}>
                                {comment.likes || 0}
                            </span>
                        </Button>
                        
                        {!isChild && (
                            <Button 
                                text 
                                size="small" 
                                onClick={() => setShowReplyInput(!showReplyInput)}
                                className={`${prefix}comments-item-reply`}
                            >
                                回复
                            </Button>
                        )}
                        
                        {onDelete && (
                            <Button 
                                text 
                                size="small" 
                                onClick={() => onDelete(comment.id)}
                                className={`${prefix}comments-item-delete`}
                            >
                                删除
                            </Button>
                        )}
                        
                        {onEdit && (
                            <Button 
                                text 
                                size="small" 
                                onClick={() => onEdit(comment.id, comment.content)}
                                className={`${prefix}comments-item-edit`}
                            >
                                编辑
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* 回复输入框 */}
            {showReplyInput && !isChild && (
                <div className={`${prefix}comments-item-reply-input`}>
                    <CommentInput
                        onSubmit={handleReply}
                        loading={replyLoading}
                        placeholder={`${replyPlaceholder}`}
                        submitText="回复"
                        rows={2}
                        autoHeight={false}
                        prefix={prefix}
                    />
                </div>
            )}

            {/* 子评论列表 */}
            {!isChild && children.length > 0 && (
                <div className={`${prefix}comments-item-children`}>
                    {children.slice(0, maxChildrenCount).map(child => (
                        <MemoizedCommentItem
                            key={`${child.id}-${child.likes || 0}-${child.liked}`}
                            comment={child}
                            isChild={true}
                            onLike={onLike}
                            onDelete={onDelete}
                            onEdit={onEdit}
                            replyPlaceholder={replyPlaceholder}
                            prefix={prefix}
                            showUserCard={showUserCard}
                        />
                    ))}
                    
                    {/* 查看更多按钮 */}
                    {hasMoreChildren && (
                        <div className={`${prefix}comments-item-load-more`}>
                            <Button 
                                text 
                                size="small" 
                                onClick={handleLoadMore}
                                loading={loadingChildren}
                                className={`${prefix}comments-item-load-more-btn`}
                            >
                                {shouldShowDialog ? 
                                    `查看全部 ${childrenTotal} 条回复` : 
                                    `查看更多回复 (${children.length - Math.min(children.length, maxChildrenCount)})`
                                }
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

CommentItem.propTypes = {
    comment: PropTypes.object.isRequired,
    isChild: PropTypes.bool,
    onReply: PropTypes.func,
    onLike: PropTypes.func,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onLoadMoreChildren: PropTypes.func,
    onShowAllChildren: PropTypes.func,
    loadingChildren: PropTypes.bool,
    replyPlaceholder: PropTypes.string,
    prefix: PropTypes.string,
    defaultChildrenCount: PropTypes.number,
    maxChildrenCount: PropTypes.number,
    showUserCard: PropTypes.bool,
    className: PropTypes.string
};

const MemoizedCommentItem = memo(CommentItem);

export default MemoizedCommentItem;
