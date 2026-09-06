/**
 * 评论组件 Demo 类型定义
 */

export interface CommentAuthor {
    id: number;
    name: string;
    avatar?: string;
    title: string;
    bio: string;
    commentCount?: number;
    likeCount?: number;
    joinDate?: string;
}

export interface CommentItem {
    id: string;
    content: string;
    author: CommentAuthor;
    createdAt: string;
    likes: number;
    liked: boolean;
    children?: CommentItem[];
    childrenTotal?: number;
}

export interface Database {
    articleComments: CommentItem[];
    simpleComments: CommentItem[];
    ticketComments: CommentItem[];
}

export interface CurrentUser extends CommentAuthor {
    // 当前登录用户的额外信息
}
