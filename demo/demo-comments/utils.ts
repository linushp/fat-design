import type { CommentAuthor, CommentItem, Database } from './types';

/**
 * 延迟函数
 */
export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 创建新评论
 */
export function createComment(content: string, author: CommentAuthor): CommentItem {
    return {
        id: `comment_${Date.now()}`,
        content,
        author,
        createdAt: new Date().toISOString(),
        likes: 0,
        liked: false,
        children: [],
        childrenTotal: 0
    };
}

/**
 * 创建新回复
 */
export function createReply(content: string, author: CommentAuthor): CommentItem {
    return {
        id: `reply_${Date.now()}`,
        content,
        author,
        createdAt: new Date().toISOString(),
        likes: 0,
        liked: false
    };
}

/**
 * 初始化模拟数据库
 */
export function initializeDatabase(): Database {
    const authors: CommentAuthor[] = [
        { id: 1, name: '张三', title: '前端开发工程师', bio: '热爱前端技术', commentCount: 128, likeCount: 520 },
        { id: 2, name: '李四', title: 'UI设计师', bio: '专注用户体验设计', commentCount: 89, likeCount: 234 },
        { id: 3, name: '王五', title: '后端开发工程师', bio: '专攻Java和Spring框架', commentCount: 67, likeCount: 189 },
        { id: 4, name: '赵六', title: '测试工程师', bio: '专业软件测试', commentCount: 45, likeCount: 123 },
    ];

    const contents = [
        '写得非常好，解决了我的困惑！',
        '有一个问题想请教，第三部分的代码能否再详细解释一下？',
        '实战性很强，已经推荐给团队学习了。',
        '代码示例非常清晰，对我帮助很大，感谢分享！',
        '希望能看到更多这样的技术文章，持续关注中。',
        '已经在项目中使用了，效果很不错，性能也很棒。',
        '这篇文章解决了我困扰很久的问题，太感谢了！',
        '作者的思路很清晰，学习了，收藏了！'
    ];

    const replies = [
        '确实如此，我也遇到了同样的问题。',
        '感谢分享，很有参考价值。',
        '已经收藏，后面会仔细研究。',
        '这个方案很优雅，学习了。'
    ];

    // 生成文章评论数据（标准两级结构）
    const articleComments: CommentItem[] = [];
    const now = new Date();

    for (let i = 0; i < 18; i++) {
        const author = authors[i % authors.length];
        const createdAt = new Date(now.getTime() - i * 3600000 * 3).toISOString();
        
        const children: CommentItem[] = [];
        const childCount = Math.floor(Math.random() * 6);
        
        for (let j = 0; j < childCount; j++) {
            const replyAuthor = authors[(i + j + 1) % authors.length];
            children.push({
                id: `reply_${i}_${j}`,
                content: replies[Math.floor(Math.random() * replies.length)],
                author: replyAuthor,
                createdAt: new Date(now.getTime() - i * 3600000 * 3 - j * 600000).toISOString(),
                likes: Math.floor(Math.random() * 15),
                liked: Math.random() > 0.85
            });
        }

        articleComments.push({
            id: `article_comment_${i}`,
            content: contents[i % contents.length],
            author: {
                ...author,
                avatar: i === 0 ? 'https://img.alicdn.com/tfs/TB1CiXKaijrK1RjSsplXXXHmVXa-60-60.png' : ''
            },
            createdAt,
            likes: Math.floor(Math.random() * 50),
            liked: i === 2,
            children,
            childrenTotal: children.length
        });
    }

    // 生成简单评论数据（仅一级）
    const simpleComments: CommentItem[] = [];
    for (let i = 0; i < 8; i++) {
        const author = authors[i % authors.length];
        simpleComments.push({
            id: `simple_comment_${i}`,
            content: `这条是简单留言，仅支持一级评论。${i + 1}`,
            author,
            createdAt: new Date(now.getTime() - i * 3600000 * 5).toISOString(),
            likes: 0,
            liked: false,
            children: [],
            childrenTotal: 0
        });
    }

    // 生成工单留言数据（强调时间线）
    const ticketComments: CommentItem[] = [
        {
            id: 'ticket_1',
            content: '你好，我遇到了一个登录问题，每次输入密码后页面都会自动刷新。',
            author: { id: 100, name: '用户小王', title: '普通用户', bio: '' },
            createdAt: new Date(now.getTime() - 86400000 * 2).toISOString(),
            likes: 0,
            liked: false,
            children: [
                {
                    id: 'ticket_reply_1',
                    content: '您好，请问您使用的是什么浏览器？建议清除缓存后重试。',
                    author: { id: 200, name: '客服小明', title: '客服专员', bio: '' },
                    createdAt: new Date(now.getTime() - 86400000 * 2 + 1800000).toISOString(),
                    likes: 0,
                    liked: false
                }
            ],
            childrenTotal: 1
        },
        {
            id: 'ticket_2',
            content: '我使用的是 Chrome 浏览器，已经清除缓存了，但问题还是存在。',
            author: { id: 100, name: '用户小王', title: '普通用户', bio: '' },
            createdAt: new Date(now.getTime() - 86400000).toISOString(),
            likes: 0,
            liked: false,
            children: [
                {
                    id: 'ticket_reply_2',
                    content: '感谢您的反馈，我们已经记录了这个问题，技术团队正在排查。您可以尝试使用 Firefox 浏览器临时解决。',
                    author: { id: 201, name: '技术小李', title: '技术支持', bio: '' },
                    createdAt: new Date(now.getTime() - 86400000 + 3600000).toISOString(),
                    likes: 0,
                    liked: false
                }
            ],
            childrenTotal: 1
        },
        {
            id: 'ticket_3',
            content: '好的，换浏览器后可以正常登录了，谢谢！',
            author: { id: 100, name: '用户小王', title: '普通用户', bio: '' },
            createdAt: new Date(now.getTime() - 43200000).toISOString(),
            likes: 0,
            liked: false,
            children: [],
            childrenTotal: 0
        }
    ];

    return {
        articleComments,
        simpleComments,
        ticketComments
    };
}
