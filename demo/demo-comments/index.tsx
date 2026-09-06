import React, { useState } from 'react';
import DemoHeader from './DemoHeader';
import ArticleComments from './ArticleComments';
import SimpleComments from './SimpleComments';
import TicketComments from './TicketComments';
import ApiGuide from './ApiGuide';
import { initializeDatabase } from './utils';
import type { Database, CommentAuthor } from './types';

// 当前登录用户（实际项目从登录状态获取）
const currentUser: CommentAuthor = {
    id: 999,
    name: '当前用户',
    avatar: 'https://img.alicdn.com/tfs/TB1CiXKaijrK1RjSsplXXXHmVXa-60-60.png',
    title: '资深开发者',
    bio: '热爱技术分享，专注于前端开发'
};

/**
 * Comments 组件演示 - 模拟真实业务场景
 */
export default function DemoComments() {
    // 模拟后端数据库
    const [database, setDatabase] = useState<Database>(() => initializeDatabase());

    // 重置数据
    const handleReset = () => {
        setDatabase(initializeDatabase());
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <DemoHeader onReset={handleReset} />

            {/* 场景一：文章评论区 */}
            <ArticleComments
                database={database}
                setDatabase={setDatabase}
                currentUser={currentUser}
            />

            {/* 场景二：简单评论区 */}
            <SimpleComments
                database={database}
                setDatabase={setDatabase}
                currentUser={currentUser}
            />

            {/* 场景三：工单/客服系统 */}
            <TicketComments
                database={database}
                setDatabase={setDatabase}
                currentUser={currentUser}
            />

            {/* API 使用说明 */}
            <ApiGuide />
        </div>
    );
}

// 导出子组件和工具函数（方便单独使用）
export { default as ArticleComments } from './ArticleCommentsStandalone';
export { default as SimpleComments } from './SimpleCommentsStandalone';
export { default as TicketComments } from './TicketCommentsStandalone';
export { default as ApiGuide } from './ApiGuide';
export { initializeDatabase, createComment, createReply, delay } from './utils';
export type { Database, CommentItem, CommentAuthor } from './types';
