import React from 'react';
import Comments from '../../src/comments';
import Message from '../../src/message';
import type { Database, CommentAuthor } from './types';
import { delay, createComment, createReply } from './utils';

interface TicketCommentsProps {
    database: Database;
    setDatabase: React.Dispatch<React.SetStateAction<Database>>;
    currentUser: CommentAuthor;
}

/**
 * 场景三：工单/客服系统
 * 倒序展示，底部输入，强调时间线
 */
export default function TicketComments({ database, setDatabase, currentUser }: TicketCommentsProps) {
    const apis = {
        loadComments: async (page: number, pageSize: number) => {
            await delay(400);
            // 倒序排列，最新的在最后（时间线顺序）
            const list = [...database.ticketComments].reverse();
            const start = (page - 1) * pageSize;
            const end = start + pageSize;
            return {
                list: list.slice(start, end),
                total: list.length
            };
        },

        submitComment: async (content: string) => {
            await delay(600);
            const newComment = {
                ...createComment(content, {
                    ...currentUser,
                    title: '用户',
                })
            };
            setDatabase(prev => ({
                ...prev,
                ticketComments: [...prev.ticketComments, newComment]
            }));
            Message.success('留言已提交');
            return newComment;
        },

        submitReply: async (parentId: string | number, content: string) => {
            await delay(600);
            const newReply = createReply(content, {
                ...currentUser,
                name: '客服小明',
                title: '客服专员',
                avatar: ''
            });
            
            setDatabase(prev => ({
                ...prev,
                ticketComments: prev.ticketComments.map(c => {
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
            
            Message.success('回复已发送');
            return newReply;
        }
    };

    return (
        <section style={{ marginBottom: '48px' }}>
            <div style={{
                background: 'linear-gradient(135deg, #fa8c16 0%, #ffc53d 100%)',
                borderRadius: '12px',
                padding: '24px 28px',
                marginBottom: '20px',
                boxShadow: '0 4px 12px rgba(250, 140, 22, 0.3)'
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
                        🎧
                    </div>
                    <h3 style={{ margin: 0, fontSize: '22px', color: '#fff', fontWeight: 600 }}>
                        场景三：工单留言/客服对话
                    </h3>
                </div>
                <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px', lineHeight: '1.6' }}>
                    客服工单、用户反馈、内部沟通场景
                    <span style={{ display: 'inline-block', margin: '0 8px', opacity: 0.6 }}>•</span>
                    底部输入、强调时间线、支持客服回复
                </p>
            </div>

            <div style={{
                backgroundColor: '#fff7e6',
                borderRadius: '12px',
                padding: '28px',
                boxShadow: '0 2px 8px rgba(250, 140, 22, 0.08)',
                border: '1px solid #ffd591'
            }}>
                {/* 模拟工单信息区域 */}
                <div style={{
                    borderBottom: '1px solid #ffe7ba',
                    paddingBottom: '20px',
                    marginBottom: '24px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <h4 style={{ margin: 0, fontSize: '18px', color: '#611f00', fontWeight: 600 }}>
                            #TK-2024-0115 登录异常问题
                        </h4>
                        <span style={{
                            backgroundColor: '#fff',
                            color: '#fa8c16',
                            padding: '2px 10px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            border: '1px solid #ffd591',
                            fontWeight: 500
                        }}>
                            处理中
                        </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: '#873800' }}>
                        <span>👤 用户小王</span>
                        <span>📅 创建于 2天前</span>
                        <span>👁 客服小明、技术小李</span>
                    </div>
                </div>

                <Comments
                    apis={apis}
                    pageSize={10}
                    showPagination={false}
                    inputPosition="bottom"
                    emptyText="暂无留言记录"
                    inputPlaceholder="添加新的留言..."
                    replyPlaceholder="回复这条留言..."
                />
            </div>
        </section>
    );
}
