import React, { useState } from 'react';
import Comments from '../../src/comments';
import Message from '../../src/message';
import type { Database, CommentAuthor } from './types';
import { delay, createComment, initializeDatabase } from './utils';

// 当前登录用户
const currentUser: CommentAuthor = {
    id: 999,
    name: '当前用户',
    avatar: 'https://img.alicdn.com/tfs/TB1CiXKaijrK1RjSsplXXXHmVXa-60-60.png',
    title: '资深开发者',
    bio: '热爱技术分享，专注于前端开发'
};

/**
 * 简单评论区 - 独立版本（用于单独展示）
 */
export default function SimpleCommentsStandalone() {
    const [database, setDatabase] = useState<Database>(() => initializeDatabase());

    const apis = {
        loadComments: async (page: number, pageSize: number) => {
            await delay(300);
            const start = (page - 1) * pageSize;
            const end = start + pageSize;
            return {
                list: database.simpleComments.slice(start, end),
                total: database.simpleComments.length
            };
        },

        submitComment: async (content: string) => {
            await delay(500);
            const newComment = createComment(content, currentUser);
            setDatabase(prev => ({
                ...prev,
                simpleComments: [newComment, ...prev.simpleComments]
            }));
            Message.success('评论发表成功！');
            return newComment;
        },

        // 不提供 submitReply，就没有回复功能
        submitReply: async () => {
            throw new Error('该场景不支持回复功能');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <section>
                <div style={{
                    background: 'linear-gradient(135deg, #52c41a 0%, #95de64 100%)',
                    borderRadius: '12px',
                    padding: '24px 28px',
                    marginBottom: '20px',
                    boxShadow: '0 4px 12px rgba(82, 196, 26, 0.3)'
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
                            📢
                        </div>
                        <h3 style={{ margin: 0, fontSize: '22px', color: '#fff', fontWeight: 600 }}>
                            场景二：公告/新闻评论区
                        </h3>
                    </div>
                    <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px', lineHeight: '1.6' }}>
                        企业公告、新闻资讯、简单留言场景
                        <span style={{ display: 'inline-block', margin: '0 8px', opacity: 0.6 }}>•</span>
                        仅支持一级评论（无回复功能）、仅查看和发表
                    </p>
                </div>

                <div style={{
                    backgroundColor: '#f6ffed',
                    borderRadius: '12px',
                    padding: '28px',
                    boxShadow: '0 2px 8px rgba(82, 196, 26, 0.08)',
                    border: '1px solid #b7eb8f'
                }}>
                    {/* 模拟公告区域 */}
                    <div style={{
                        borderBottom: '1px solid #d9f7be',
                        paddingBottom: '20px',
                        marginBottom: '24px'
                    }}>
                        <h4 style={{ margin: '0 0 12px 0', fontSize: '18px', color: '#135200', fontWeight: 600 }}>
                            📢 关于2024年春节放假安排的通知
                        </h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: '#389e0d' }}>
                            <span>👤 行政部</span>
                            <span>📅 2024-01-10</span>
                            <span style={{
                                backgroundColor: '#fff',
                                color: '#52c41a',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                border: '1px solid #b7eb8f'
                            }}>
                                重要通知
                            </span>
                        </div>
                    </div>

                    <Comments
                        apis={apis}
                        pageSize={5}
                        showPagination={true}
                        inputPosition="bottom"
                        emptyText="暂无留言"
                        inputPlaceholder="发表留言..."
                    />
                </div>
            </section>
        </div>
    );
}
