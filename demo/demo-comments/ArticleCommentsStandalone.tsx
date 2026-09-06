import React, { useState } from 'react';
import Comments from '../../src/comments';
import Message from '../../src/message';
import type { Database, CommentAuthor } from './types';
import { delay, createComment, createReply, initializeDatabase } from './utils';

// 当前登录用户
const currentUser: CommentAuthor = {
    id: 999,
    name: '当前用户',
    avatar: 'https://img.alicdn.com/tfs/TB1CiXKaijrK1RjSsplXXXHmVXa-60-60.png',
    title: '资深开发者',
    bio: '热爱技术分享，专注于前端开发'
};

/**
 * 文章评论区 - 独立版本（用于单独展示）
 */
export default function ArticleCommentsStandalone() {
    const [database, setDatabase] = useState<Database>(() => initializeDatabase());

    const apis = {
        loadComments: async (page: number, pageSize: number) => {
            await delay(400);
            const start = (page - 1) * pageSize;
            const end = start + pageSize;
            return {
                list: database.articleComments.slice(start, end),
                total: database.articleComments.length
            };
        },

        submitComment: async (content: string) => {
            await delay(600);
            const newComment = createComment(content, currentUser);
            setDatabase(prev => ({
                ...prev,
                articleComments: [newComment, ...prev.articleComments]
            }));
            Message.success('评论发表成功！');
            return newComment;
        },

        submitReply: async (parentId: string | number, content: string) => {
            await delay(600);
            const newReply = createReply(content, currentUser);
            setDatabase(prev => ({
                ...prev,
                articleComments: prev.articleComments.map(c => {
                    if (c.id === parentId) {
                        return {
                            ...c,
                            children: [...(c.children || []), newReply],
                            childrenTotal: (c.childrenTotal || 0) + 1
                        };
                    }
                    return c;
                })
            }));
            Message.success('回复发表成功！');
            return newReply;
        },

        likeComment: async (commentId: string | number) => {
            await delay(200);
            console.log('点赞:', commentId);
        },

        deleteComment: async (commentId: string | number) => {
            await delay(400);
            setDatabase(prev => {
                const isTop = prev.articleComments.some(c => c.id === commentId);
                return {
                    ...prev,
                    articleComments: isTop
                        ? prev.articleComments.filter(c => c.id !== commentId)
                        : prev.articleComments.map(c => {
                            if (!c.children) return c;
                            const newChildren = c.children.filter(child => child.id !== commentId);
                            if (newChildren.length === c.children.length) return c;
                            return {
                                ...c,
                                children: newChildren,
                                childrenTotal: (c.childrenTotal || 0) - 1
                            };
                        })
                };
            });
            Message.success('评论已删除');
        },

        editComment: async (commentId: string | number, content: string) => {
            await delay(400);
            setDatabase(prev => ({
                ...prev,
                articleComments: prev.articleComments.map(c => {
                    if (c.id === commentId) return { ...c, content };
                    if (c.children) {
                        const newChildren = c.children.map(child =>
                            child.id === commentId ? { ...child, content } : child
                        );
                        if (newChildren.some((child, i) => child !== c.children![i])) {
                            return { ...c, children: newChildren };
                        }
                    }
                    return c;
                })
            }));
            Message.success('评论已更新');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <section>
                <div style={{
                    background: 'linear-gradient(135deg, #1890ff 0%, #36cfc9 100%)',
                    borderRadius: '12px',
                    padding: '24px 28px',
                    marginBottom: '20px',
                    boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '20px'
                        }}>
                            💬
                        </div>
                        <h3 style={{ margin: 0, fontSize: '22px', color: '#fff', fontWeight: 600 }}>
                            场景一：文章评论区
                        </h3>
                    </div>
                    <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px', lineHeight: '1.6' }}>
                        技术博客、新闻文章、视频页面的典型评论场景
                        <span style={{ display: 'inline-block', margin: '0 8px', opacity: 0.6 }}>•</span>
                        支持两级评论、点赞、删除、编辑
                    </p>
                </div>

                <div style={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    padding: '28px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04)',
                    border: '1px solid #f0f0f0'
                }}>
                    {/* 模拟文章标题区域 */}
                    <div style={{
                        borderBottom: '1px solid #f0f0f0',
                        paddingBottom: '20px',
                        marginBottom: '24px'
                    }}>
                        <h4 style={{ margin: '0 0 12px 0', fontSize: '18px', color: '#262626', fontWeight: 600 }}>
                            📖 深入浅出 React 性能优化实战指南
                        </h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: '#8c8c8c' }}>
                            <span>👤 前端技术团队</span>
                            <span>📅 2024-01-15</span>
                            <span>👁 2.3k 阅读</span>
                            <span style={{
                                backgroundColor: '#e6f7ff',
                                color: '#1890ff',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                fontSize: '12px'
                            }}>
                                技术文章
                            </span>
                        </div>
                    </div>

                    <Comments
                        apis={apis}
                        pageSize={5}
                        showPagination={true}
                        emptyText="暂无评论，快来发表第一条评论吧！"
                        inputPlaceholder="💡 发表你的观点，参与讨论..."
                        replyPlaceholder="回复这条评论..."
                    />
                </div>
            </section>
        </div>
    );
}
