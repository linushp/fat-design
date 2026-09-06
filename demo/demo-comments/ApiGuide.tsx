import React from 'react';

/**
 * API 使用指南
 */
export default function ApiGuide() {
    return (
        <section style={{
            backgroundColor: '#f5f5f5',
            padding: '24px',
            borderRadius: '12px',
            lineHeight: '1.8'
        }}>
            <h3 style={{ marginTop: 0, fontSize: '18px', color: '#262626' }}>API 使用指南</h3>

            <div style={{ marginBottom: '20px' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#1890ff', fontSize: '15px' }}>
                    必需接口（所有场景都需要）
                </h4>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#595959' }}>
                    <li><code style={{ backgroundColor: '#fff', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>loadComments(page, pageSize)</code> - 加载评论列表，返回 {'{ list, total }'}</li>
                    <li><code style={{ backgroundColor: '#fff', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>submitComment(content)</code> - 提交一级评论，返回新创建的 CommentItem</li>
                    <li><code style={{ backgroundColor: '#fff', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>submitReply(parentId, content)</code> - 提交回复，返回新创建的 CommentItem</li>
                </ul>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#52c41a', fontSize: '15px' }}>
                    可选接口（提供后才显示对应功能）
                </h4>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#595959' }}>
                    <li><code style={{ backgroundColor: '#fff', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>likeComment(commentId)</code> - 点赞功能，提供后显示点赞按钮</li>
                    <li><code style={{ backgroundColor: '#fff', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>deleteComment(commentId)</code> - 删除功能，提供后显示删除按钮</li>
                    <li><code style={{ backgroundColor: '#fff', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>editComment(commentId, content)</code> - 编辑功能，提供后显示编辑按钮</li>
                    <li><code style={{ backgroundColor: '#fff', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>loadChildren(parentId, page, pageSize)</code> - 分页加载子评论</li>
                </ul>
            </div>

            <div>
                <h4 style={{ margin: '0 0 10px 0', color: '#fa8c16', fontSize: '15px' }}>
                    快速上手
                </h4>
                <pre style={{
                    backgroundColor: '#fff',
                    padding: '16px',
                    borderRadius: '8px',
                    overflow: 'auto',
                    fontSize: '13px',
                    color: '#595959',
                    border: '1px solid #d9d9d9',
                    margin: 0
                }}>
{`<Comments
  apis={{
    loadComments: async (page, pageSize) => {
      const res = await fetch(\`/api/comments?page=\${page}\`);
      return res.json(); // { list: [], total: 0 }
    },
    submitComment: async (content) => {
      const res = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ content })
      });
      return res.json(); // CommentItem
    },
    submitReply: async (parentId, content) => {
      const res = await fetch(\`/api/comments/\${parentId}/reply\`, {
        method: 'POST',
        body: JSON.stringify({ content })
      });
      return res.json(); // CommentItem
    }
  }}
/>`}
                </pre>
            </div>
        </section>
    );
}
