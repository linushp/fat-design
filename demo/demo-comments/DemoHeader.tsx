import React from 'react';
import Button from '../../src/button';
import Dialog from '../../src/dialog';
import Message from '../../src/message';

interface DemoHeaderProps {
    onReset: () => void;
}

/**
 * Demo 头部区域
 */
export default function DemoHeader({ onReset }: DemoHeaderProps) {
    const handleReset = () => {
        Dialog.confirm({
            title: '确认清空',
            content: '确定要清空所有演示数据吗？',
            onOk: () => {
                onReset();
                Message.success('数据已重置');
            }
        });
    };

    return (
        <div style={{
            backgroundColor: '#e6f7ff',
            border: '1px solid #91d5ff',
            padding: '20px 24px',
            borderRadius: '12px',
            marginBottom: '28px'
        }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                    <h2 style={{ margin: '0 0 8px 0', fontSize: '20px', color: '#096dd9' }}>
                        评论组件演示
                    </h2>
                    <p style={{ margin: 0, color: '#595959', fontSize: '14px' }}>
                        下方展示了三种典型业务场景的使用方式，每种场景根据需求配置不同的 APIs
                    </p>
                </div>
                <Button size="small" onClick={handleReset}>
                    重置所有数据
                </Button>
            </div>
        </div>
    );
}
