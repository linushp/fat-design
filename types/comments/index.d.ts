/// <reference types="react" />

import { ReactNode, Component } from 'react';
import CommonProps from '../util';

interface HTMLAttributesWeak extends React.HTMLAttributes<HTMLElement> {}

export interface CommentAuthor {
    /**
     * 作者ID
     */
    id?: string | number;
    /**
     * 作者名称
     */
    name: string;
    /**
     * 作者头像
     */
    avatar?: string;
    /**
     * 作者职称/职位
     */
    title?: string;
    /**
     * 作者简介
     */
    bio?: string;
    /**
     * 评论数（用于用户卡片）
     */
    commentCount?: number;
    /**
     * 获赞数（用于用户卡片）
     */
    likeCount?: number;
    /**
     * 加入时间（用于用户卡片）
     */
    joinDate?: string | Date;
    /**
     * 用户信息修改时间（可选，用于性能优化）
     */
    modifiedAt?: string | Date;
}

export interface CommentItem {
    /**
     * 评论唯一标识
     */
    id: string | number;
    /**
     * 评论内容
     */
    content: string;
    /**
     * 评论作者
     */
    author: CommentAuthor;
    /**
     * 评论时间
     */
    createdAt: string | Date;
    /**
     * 修改时间（可选，用于性能优化）
     */
    modifiedAt?: string | Date;
    /**
     * 点赞数
     */
    likes?: number;
    /**
     * 是否已点赞
     */
    liked?: boolean;
    /**
     * 二级评论列表
     */
    children?: CommentItem[];
    /**
     * 二级评论总数（用于分页）
     */
    childrenTotal?: number;
    /**
     * 自定义数据
     */
    [key: string]: any;
}

export interface CommentsAPIs {
    /**
     * 加载评论列表（必需）
     * @param page 页码
     * @param pageSize 每页数量
     * @returns 返回评论列表和总数
     */
    loadComments: (page: number, pageSize: number) => Promise<{
        list?: CommentItem[];
        data?: CommentItem[];
        total: number;
    }>;
    
    /**
     * 提交一级评论（必需）
     * @param content 评论内容
     * @returns 返回新创建的评论
     */
    submitComment: (content: string) => Promise<CommentItem>;
    
    /**
     * 提交二级评论/回复（必需）
     * @param parentId 父评论ID
     * @param content 回复内容
     * @returns 返回新创建的回复
     */
    submitReply: (parentId: string | number, content: string) => Promise<CommentItem>;
    
    /**
     * 点赞/取消点赞（可选）
     * @param commentId 评论ID
     */
    likeComment?: (commentId: string | number) => Promise<void>;
    
    /**
     * 删除评论（可选）
     * @param commentId 评论ID
     */
    deleteComment?: (commentId: string | number) => Promise<void>;
    
    /**
     * 编辑评论（可选）
     * @param commentId 评论ID
     * @param content 新内容
     */
    editComment?: (commentId: string | number, content: string) => Promise<void>;
    
    /**
     * 加载子评论（可选，用于分页加载更多子评论）
     * @param parentId 父评论ID
     * @param page 页码
     * @param pageSize 每页数量
     * @returns 返回子评论列表和总数
     */
    loadChildren?: (parentId: string | number, page: number, pageSize: number) => Promise<{
        list?: CommentItem[];
        data?: CommentItem[];
        total: number;
    }>;
}

export interface CommentsProps extends HTMLAttributesWeak, CommonProps {
    /**
     * API 接口配置（必需）
     * 包含所有数据操作的接口方法
     */
    apis: CommentsAPIs;
    
    /**
     * 每页评论数
     * @default 10
     */
    pageSize?: number;
    
    /**
     * 一级评论输入框位置
     * @default 'top'
     */
    inputPosition?: 'top' | 'bottom' | 'none';
    
    /**
     * 二级评论默认显示数量
     * @default 5
     */
    defaultChildrenCount?: number;
    
    /**
     * 二级评论最大显示数量（超过则显示对话框）
     * @default 10
     */
    maxChildrenCount?: number;
    
    /**
     * 是否显示分页
     * @default true
     */
    showPagination?: boolean;
    
    /**
     * 空状态提示
     * @default '暂无评论，快来发表第一条评论吧！'
     */
    emptyText?: ReactNode;
    
    /**
     * 主评论输入框占位符
     * @default '写下你的评论...'
     */
    inputPlaceholder?: string;
    
    /**
     * 回复输入框占位符
     * @default '写下你的回复...'
     */
    replyPlaceholder?: string;
    
    /**
     * 是否显示用户悬浮卡片
     * @default false
     */
    showUserCard?: boolean;
    
    /**
     * 错误处理回调
     * @default Message.error
     */
    onError?: (error: Error) => void;
}

export default class Comments extends Component<CommentsProps, any> {
    static displayName: 'Comments';
}
