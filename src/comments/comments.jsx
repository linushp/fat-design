import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ConfigProvider from '../config-provider';
import Pagination from '../pagination';
import Dialog from '../dialog';
import Message from '../message';
import CommentInput from './comment-input';
import MemoizedCommentItem from './comment-item';
import CommentsDialog from './comments-dialog';
import './main.scss';

/**
 * 评论组件
 * 开箱即用的评论解决方案，所有数据逻辑内部管理，只需提供 API 接口
 */
class Comments extends Component {
    static displayName = 'Comments';

    static propTypes = {
        prefix: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object,
        /** API 接口配置（必需） */
        apis: PropTypes.shape({
            loadComments: PropTypes.func.isRequired,
            submitComment: PropTypes.func.isRequired,
            submitReply: PropTypes.func.isRequired,
            likeComment: PropTypes.func,
            deleteComment: PropTypes.func,
            editComment: PropTypes.func,
            loadChildren: PropTypes.func
        }).isRequired,
        /** 每页评论数 */
        pageSize: PropTypes.number,
        /** 输入框位置 */
        inputPosition: PropTypes.oneOf(['top', 'bottom', 'none']),
        /** 默认显示的子评论数 */
        defaultChildrenCount: PropTypes.number,
        /** 最大显示的子评论数（超过则显示对话框） */
        maxChildrenCount: PropTypes.number,
        /** 是否显示分页 */
        showPagination: PropTypes.bool,
        /** 空状态提示 */
        emptyText: PropTypes.node,
        /** 主评论输入框占位符 */
        inputPlaceholder: PropTypes.string,
        /** 回复输入框占位符 */
        replyPlaceholder: PropTypes.string,
        /** 是否显示用户悬浮卡片 */
        showUserCard: PropTypes.bool,
        /** 错误处理回调 */
        onError: PropTypes.func,
    };

    static defaultProps = {
        prefix: 'fat-',
        pageSize: 10,
        inputPosition: 'top',
        defaultChildrenCount: 5,
        maxChildrenCount: 10,
        showPagination: true,
        emptyText: '暂无评论，快来发表第一条评论吧！',
        inputPlaceholder: '写下你的评论...',
        replyPlaceholder: '写下你的回复...',
        showUserCard: false,
        onError: (error) => {
            Message.error(error.message || '操作失败');
        }
    };

    constructor(props) {
        super(props);
        
        this.state = {
            comments: [],
            current: 1,
            total: 0,
            loading: false,
            submitLoading: false,
            childrenLoading: {}
        };
    }

    componentDidMount() {
        this.loadComments(1);
    }

    /**
     * 加载评论列表
     */
    loadComments = async (page = 1) => {
        const { apis, pageSize, onError } = this.props;
        
        this.setState({ loading: true });
        
        try {
            const result = await apis.loadComments(page, pageSize);
            this.setState({ 
                comments: result.list || result.data || [],
                total: result.total || 0,
                current: page
            });
        } catch (error) {
            console.error('Load comments error:', error);
            onError && onError(error);
        } finally {
            this.setState({ loading: false });
        }
    };

    /**
     * 提交主评论
     */
    handleCommentSubmit = async (content) => {
        const { apis, onError } = this.props;
        
        this.setState({ submitLoading: true });
        
        try {
            const newComment = await apis.submitComment(content);
            
            // 乐观更新：将新评论添加到列表顶部
            const newComments = [newComment, ...this.state.comments];
            this.setState({ 
                comments: newComments,
                total: this.state.total + 1
            });
            
        } catch (error) {
            console.error('Submit comment error:', error);
            onError && onError(error);
        } finally {
            this.setState({ submitLoading: false });
        }
    };

    /**
     * 提交回复
     */
    handleReply = async (parentId, content) => {
        const { apis, onError } = this.props;
        
        try {
            const newReply = await apis.submitReply(parentId, content);
            
            // 乐观更新
            const newComments = this.state.comments.map(comment => {
                if (comment.id === parentId) {
                    return {
                        ...comment,
                        children: [...(comment.children || []), newReply],
                        childrenTotal: (comment.childrenTotal || comment.children?.length || 0) + 1
                    };
                }
                return comment;
            });
            
            this.setState({ comments: newComments });
            
        } catch (error) {
            console.error('Submit reply error:', error);
            onError && onError(error);
        }
    };

    /**
     * 点赞
     */
    handleLike = async (commentId) => {
        const { apis, onError } = this.props;
        
        try {
            // 乐观更新
            const newComments = this.state.comments.map(comment => {
                if (comment.id === commentId) {
                    return {
                        ...comment,
                        liked: !comment.liked,
                        likes: (comment.likes || 0) + (comment.liked ? -1 : 1)
                    };
                }
                
                if (comment.children) {
                    const newChildren = comment.children.map(child => {
                        if (child.id === commentId) {
                            return {
                                ...child,
                                liked: !child.liked,
                                likes: (child.likes || 0) + (child.liked ? -1 : 1)
                            };
                        }
                        return child;
                    });
                    
                    if (newChildren !== comment.children) {
                        return { ...comment, children: newChildren };
                    }
                }
                
                return comment;
            });
            
            this.setState({ comments: newComments }, () => {
                // 若弹窗打开且更新的是当前父评论的子评论，同步弹窗内容
                const ref = this.openDialogRef;
                if (ref?.updateChildren) {
                    const parent = newComments.find(c => c.id === ref.parentId);
                    if (parent?.children?.some(child => child.id === commentId)) {
                        ref.updateChildren(parent.children || []);
                    }
                }
            });
            
            // 调用 API
            if (apis && apis.likeComment) {
                await apis.likeComment(commentId);
            }
            
        } catch (error) {
            console.error('Like comment error:', error);
            this.loadComments(this.state.current);
            onError && onError(error);
        }
    };

    /**
     * 删除评论（支持主评论和子评论）
     */
    handleDelete = async (commentId) => {
        const { apis, onError } = this.props;
        
        if (!apis || !apis.deleteComment) return;

        try {
            await apis.deleteComment(commentId);
            
            // 乐观更新 - 判断是主评论还是子评论
            const isTopLevel = this.state.comments.some(c => c.id === commentId);
            let newComments;
            
            if (isTopLevel) {
                newComments = this.state.comments.filter(c => c.id !== commentId);
                this.setState({ 
                    comments: newComments,
                    total: this.state.total - 1
                });
            } else {
                // 从父评论的 children 中移除
                newComments = this.state.comments.map(comment => {
                    if (!comment.children) return comment;
                    const newChildren = comment.children.filter(child => child.id !== commentId);
                    if (newChildren.length === comment.children.length) return comment;
                    return {
                        ...comment,
                        children: newChildren,
                        childrenTotal: (comment.childrenTotal || 0) - 1
                    };
                });
                this.setState({ comments: newComments });
            }
            
        } catch (error) {
            console.error('Delete comment error:', error);
            onError && onError(error);
        }
    };

    /**
     * 弹出编辑对话框，确认后调用 handleEdit
     */
    handleShowEditDialog = (commentId, currentContent) => {
        const { apis } = this.props;
        if (!apis?.editComment) return;

        Dialog.showInput({
            title: '编辑评论',
            label: '评论内容',
            placeholder: '请输入评论内容...',
            defaultValue: currentContent || '',
            mode: 'textareaMode',
            maxLength: 500,
            required: true,
            specialReg: null,
            onOk: async (event) => {
                const newContent = (event.formInputValue || '').trim();
                if (!newContent) return;
                return this.handleEdit(commentId, newContent);
            }
        });
    };

    /**
     * 编辑评论（提交到 API 并更新状态）
     */
    handleEdit = async (commentId, content) => {
        const { apis, onError } = this.props;
        
        if (!apis || !apis.editComment) return;

        try {
            await apis.editComment(commentId, content);
            
            // 乐观更新 - 处理主评论和子评论
            const newComments = this.state.comments.map(comment => {
                if (comment.id === commentId) {
                    return { ...comment, content };
                }
                // 检查是否是子评论
                if (comment.children) {
                    const newChildren = comment.children.map(child => {
                        if (child.id === commentId) {
                            return { ...child, content };
                        }
                        return child;
                    });
                    // 只有子评论发生变化时才更新
                    if (newChildren.some((child, index) => child !== comment.children[index])) {
                        return { ...comment, children: newChildren };
                    }
                }
                return comment;
            });
            
            this.setState({ comments: newComments }, () => {
                // 若弹窗打开且更新的是当前父评论的子评论，同步弹窗内容
                const ref = this.openDialogRef;
                if (ref?.updateChildren) {
                    const parent = newComments.find(c => c.id === ref.parentId);
                    if (parent?.children?.some(child => child.id === commentId)) {
                        ref.updateChildren(parent.children || []);
                    }
                }
            });
            
        } catch (error) {
            console.error('Edit comment error:', error);
            onError && onError(error);
        }
    };

    /**
     * 分页变化
     */
    handlePageChange = (page) => {
        this.loadComments(page);
    };

    /**
     * 加载更多子评论
     */
    handleLoadMoreChildren = async (parentId) => {
        const { apis, defaultChildrenCount, onError } = this.props;
        const { childrenPage = {}, comments } = this.state;
        
        if (!apis || !apis.loadChildren) return;

        const currentPage = childrenPage[parentId] || 1;
        const nextPage = currentPage + 1;

        this.setState(prev => ({
            childrenLoading: { ...prev.childrenLoading, [parentId]: true }
        }));

        try {
            const result = await apis.loadChildren(parentId, nextPage, defaultChildrenCount);
            
            const newComments = comments.map(comment => {
                if (comment.id === parentId) {
                    return {
                        ...comment,
                        children: [...(comment.children || []), ...(result.list || [])]
                    };
                }
                return comment;
            });

            this.setState({ 
                comments: newComments,
                childrenPage: { ...childrenPage, [parentId]: nextPage }
            });
            
        } catch (error) {
            console.error('Load children error:', error);
            onError && onError(error);
        } finally {
            this.setState(prev => ({
                childrenLoading: { ...prev.childrenLoading, [parentId]: false }
            }));
        }
    };

    /**
     * 显示所有子评论对话框
     */
    handleShowAllChildren = (parentId) => {
        const { prefix, replyPlaceholder, showUserCard, apis } = this.props;
        const comment = this.state.comments.find(c => c.id === parentId);
        
        if (!comment) return;
        
        const children = comment.children || [];
        const childrenTotal = comment.childrenTotal || children.length;
        
        this.openDialogRef = { parentId, updateChildren: null };
        
        const dialogInstance = Dialog.show({
            title: `全部回复 (${childrenTotal})`,
            style: { width: '750px' },
            onClose: () => { this.openDialogRef = null; },
            content: (
                <div className={`${prefix}comments-dialog`}>
                    <CommentsDialog
                        comments={children}
                        total={childrenTotal}
                        parentId={parentId}
                        prefix={prefix}
                        replyPlaceholder={replyPlaceholder}
                        onLike={this.handleLike}
                        onDelete={apis?.deleteComment ? this.handleDelete : undefined}
                        onEdit={apis?.editComment ? this.handleShowEditDialog : undefined}
                        onAfterDelete={() => {
                            this.openDialogRef = null;
                            dialogInstance?.close?.();
                        }}
                        registerUpdater={(fn) => { this.openDialogRef && (this.openDialogRef.updateChildren = fn); }}
                        showUserCard={showUserCard}
                    />
                </div>
            ),
            width: 600,
            height: 500,
            footerActions: ['ok']
        });
    };

    render() {
        const {   
            prefix,
            className,
            style,
            inputPosition,
            inputPlaceholder,
            replyPlaceholder,
            showPagination,
            emptyText,
            defaultChildrenCount,
            maxChildrenCount,
            pageSize,
            showUserCard,
            apis,
            ...others
        } = this.props;
        
        // 过滤掉不应该传递给DOM的props
        const {
            onError,
            rtl,
            ...domProps
        } = others;
        
        const { comments, current, total, loading, submitLoading, childrenLoading } = this.state;
        
        const classes = cx(`${prefix}comments`, className);
        
        const renderCommentInput = () => {
            if (inputPosition === 'none') return null;
            
            return (
                <div className={`${prefix}comments-input-wrapper`}>
                    <CommentInput
                        onSubmit={this.handleCommentSubmit}
                        loading={submitLoading}
                        placeholder={inputPlaceholder}
                        prefix={prefix}
                        autoHeight={false}
                    />
                </div>
            );
        };
        
        const renderCommentList = () => {
            if (loading && comments.length === 0) {
                return (
                    <div className={`${prefix}comments-loading`}>
                        加载中...
                    </div>
                );
            }
            
            if (comments.length === 0) {
                return (
                    <div className={`${prefix}comments-empty`}>
                        {emptyText}
                    </div>
                );
            }
            
            return (
                <div className={`${prefix}comments-list`}>
                    {comments.map(comment => (
                        <MemoizedCommentItem
                            key={comment.id}
                            comment={comment}
                            onReply={this.handleReply}
                            onLike={this.handleLike}
                            onDelete={apis?.deleteComment ? this.handleDelete : undefined}
                            onEdit={apis?.editComment ? this.handleShowEditDialog : undefined}
                            onLoadMoreChildren={this.handleLoadMoreChildren}
                            onShowAllChildren={this.handleShowAllChildren}
                            loadingChildren={childrenLoading[comment.id]}
                            replyPlaceholder={replyPlaceholder}
                            prefix={prefix}
                            defaultChildrenCount={defaultChildrenCount}
                            maxChildrenCount={maxChildrenCount}
                            showUserCard={showUserCard}
                        />
                    ))}
                </div>
            );
        };
        
        const renderPagination = () => {
            if (!showPagination || total <= pageSize) {
                return null;
            }
            
            return (
                <div className={`${prefix}comments-pagination`}>
                    <Pagination
                        current={current}
                        total={total}
                        pageSize={pageSize}
                        onChange={this.handlePageChange}
                    />
                </div>
            );
        };
        
        return (
            <div className={classes} style={style} {...domProps}>
                {inputPosition === 'top' && renderCommentInput()}
                {renderCommentList()}
                {renderPagination()}
                {inputPosition === 'bottom' && renderCommentInput()}
            </div>
        );
    }
}

export default ConfigProvider.config(Comments, {
    transform: (props) => props,
});
