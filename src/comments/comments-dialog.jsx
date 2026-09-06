import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from '../pagination';
import Message from '../message';
import MemoizedCommentItem from './comment-item';

/**
 * 对话框中的评论列表组件
 */
class CommentsDialog extends Component {
    static propTypes = {
        comments: PropTypes.array,
        total: PropTypes.number,
        parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        prefix: PropTypes.string,
        onLike: PropTypes.func,
        onDelete: PropTypes.func,
        onEdit: PropTypes.func,
        onAfterDelete: PropTypes.func,
        registerUpdater: PropTypes.func,
        replyPlaceholder: PropTypes.string,
        showUserCard: PropTypes.bool
    };

    static defaultProps = {
        comments: [],
        total: 0,
        prefix: 'fat-',
        replyPlaceholder: '写下你的回复...',
        showUserCard: false
    };

    constructor(props) {
        super(props);
        
        this.state = {
            comments: props.comments || [],
            current: 1,
            pageSize: 10,
            total: props.total || 0
        };
    }

    handlePageChange = (page) => {
        this.setState({ current: page });
    };

    componentDidMount() {
        const { registerUpdater } = this.props;
        if (registerUpdater) {
            registerUpdater((newChildren) => this.setState({ comments: newChildren }));
        }
    }

    render() {
        const { prefix, onLike, onDelete, onEdit, onAfterDelete, replyPlaceholder, showUserCard } = this.props;
        const { comments, current, total } = this.state;

        const wrappedOnDelete = onDelete && onAfterDelete
            ? (commentId) => Promise.resolve(onDelete(commentId)).then(onAfterDelete)
            : onDelete;
        
        return (
            <div className={`${prefix}comments-dialog-content`}>
                <div className={`${prefix}comments-list`}>
                    {comments.map(comment => (
                        <MemoizedCommentItem
                            key={`${comment.id}-${comment.likes || 0}-${comment.liked}`}
                            comment={comment}
                            isChild={true}
                            onLike={onLike}
                            onDelete={wrappedOnDelete}
                            onEdit={onEdit}
                            replyPlaceholder={replyPlaceholder}
                            prefix={prefix}
                            showUserCard={showUserCard}
                        />
                    ))}
                </div>
                
                {total > 10 && (
                    <div className={`${prefix}comments-pagination`}>
                        <Pagination
                            current={current}
                            total={total}
                            pageSize={this.state.pageSize}
                            onChange={this.handlePageChange}
                            size="small"
                            hideOnlyOnePage={true}
                        />
                    </div>
                )}
            </div>
        );
    }
}

export default CommentsDialog;
