# Comments 评论组件

开箱即用的评论组件，所有数据管理和业务逻辑都在组件内部完成，只需提供 API 接口即可。

## 功能特性

- ✅ **开箱即用**：只需提供 APIs 对象，无需管理状态
- ✅ **两级评论**：支持主评论和回复的两级结构
- ✅ **完整交互**：发表评论、回复、点赞、删除、编辑
- ✅ **分页加载**：主评论分页，子评论支持展开更多
- ✅ **乐观更新**：提交后立即更新 UI，提升用户体验
- ✅ **智能时间**：30天内显示相对时间，超过显示完整日期

## 快速开始

```jsx
import { Comments } from 'fat-design';

function MyPage() {
  const apis = {
    // 加载评论列表（必需）
    loadComments: async (page, pageSize) => {
      const res = await fetch(`/api/comments?page=${page}&pageSize=${pageSize}`);
      return res.json(); // { list: CommentItem[], total: number }
    },

    // 提交评论（必需）
    submitComment: async (content) => {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });
      return res.json(); // CommentItem
    },

    // 提交回复（必需）
    submitReply: async (parentId, content) => {
      const res = await fetch(`/api/comments/${parentId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });
      return res.json(); // CommentItem
    },

    // 可选功能（提供后才显示对应按钮）
    likeComment: async (commentId) => {
      await fetch(`/api/comments/${commentId}/like`, { method: 'POST' });
    },

    deleteComment: async (commentId) => {
      await fetch(`/api/comments/${commentId}`, { method: 'DELETE' });
    },

    editComment: async (commentId, content) => {
      await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });
    },

    loadChildren: async (parentId, page, pageSize) => {
      const res = await fetch(`/api/comments/${parentId}/children?page=${page}`);
      return res.json();
    }
  };

  return <Comments apis={apis} />;
}
```

## Props 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| **apis** | `CommentsAPIs` | **必填** | API 接口对象 |
| pageSize | `number` | 10 | 每页评论数 |
| inputPosition | `'top' \| 'bottom' \| 'none'` | 'top' | 输入框位置 |
| defaultChildrenCount | `number` | 5 | 默认显示子评论数 |
| maxChildrenCount | `number` | 10 | 最大显示子评论数 |
| showPagination | `boolean` | true | 是否显示分页 |
| emptyText | `ReactNode` | '暂无评论...' | 空状态提示 |
| inputPlaceholder | `string` | '写下你的评论...' | 主评论占位符 |
| replyPlaceholder | `string` | '写下你的回复...' | 回复占位符 |
| showUserCard | `boolean` | false | 显示用户悬浮卡片 |
| onError | `(error) => void` | Message.error | 错误处理 |

## APIs 接口

### 必需接口

```typescript
interface CommentsAPIs {
  // 加载评论列表
  loadComments: (page: number, pageSize: number) => Promise<{
    list?: CommentItem[];
    data?: CommentItem[];
    total: number;
  }>;

  // 提交一级评论
  submitComment: (content: string) => Promise<CommentItem>;

  // 提交二级评论/回复
  submitReply: (parentId: string | number, content: string) => Promise<CommentItem>;
}
```

### 可选接口

提供后自动显示对应功能按钮：

```typescript
interface CommentsAPIs {
  // 点赞/取消点赞
  likeComment?: (commentId: string | number) => Promise<void>;

  // 删除评论
  deleteComment?: (commentId: string | number) => Promise<void>;

  // 编辑评论
  editComment?: (commentId: string | number, content: string) => Promise<void>;

  // 分页加载子评论
  loadChildren?: (parentId: string | number, page: number, pageSize: number) => Promise<{
    list?: CommentItem[];
    data?: CommentItem[];
    total: number;
  }>;
}
```

## 数据结构

```typescript
interface CommentItem {
  id: string | number;
  content: string;
  author: {
    id?: string | number;
    name: string;
    avatar?: string;
    title?: string;
    bio?: string;
    commentCount?: number;
    likeCount?: number;
    joinDate?: string | Date;
  };
  createdAt: string | Date;
  likes?: number;
  liked?: boolean;
  children?: CommentItem[];
  childrenTotal?: number;
}
```

## 快捷键

- `Ctrl + Enter` - 快速提交评论

## 性能优化

- 使用 `React.memo` 减少不必要渲染
- 支持 `modifiedAt` 字段进行快速比较
- 乐观更新策略，提升用户体验

## 注意事项

1. `apis` 是**必需**的参数
2. 可选 API（delete、edit、loadChildren）只在提供时才显示对应按钮
3. 子评论超过 `maxChildrenCount` 时会弹出对话框显示全部
4. 时间显示：30天内显示相对时间，超过30天显示 `YYYY-MM-DD HH:mm`
