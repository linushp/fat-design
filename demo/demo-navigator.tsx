import React, { useState } from 'react';
import { Box, Card } from '../src/index';
import { demoRegistry, DemoItem } from './demo-registry';

interface DemoNavigatorProps {
  activeDemoId: string;
  onSelectDemo: (demo: DemoItem) => void;
}

export function DemoNavigator({ activeDemoId, onSelectDemo }: DemoNavigatorProps) {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(() => {
    // Expand the category containing the active demo by default
    const initial: Record<string, boolean> = {};
    demoRegistry.forEach(cat => {
      initial[cat.id] = cat.demos.some(d => d.id === activeDemoId);
    });
    return initial;
  });

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  return (
    <Card style={{ height: '100%', overflow: 'auto' }} >
      <Box direction="column" spacing={8}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #e8e8e8' }}>
          <h2 style={{ margin: 0, fontSize: '18px', color: '#333' }}>Demo 示例目录</h2>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#666' }}>
            点击切换不同组件示例
          </p>
        </div>

        <Box direction="column" spacing={4} style={{ padding: '8px' }}>
          {demoRegistry.map(category => (
            <div key={category.id}>
              {/* Category Header */}
              <div
                onClick={() => toggleCategory(category.id)}
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontWeight: 600,
                  fontSize: '14px',
                  color: '#333',
                  backgroundColor: expandedCategories[category.id] ? '#f0f0f0' : 'transparent',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (!expandedCategories[category.id]) {
                    e.currentTarget.style.backgroundColor = '#f5f5f5';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!expandedCategories[category.id]) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span>{category.title}</span>
                <span style={{
                  transform: expandedCategories[category.id] ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                  fontSize: '12px'
                }}>
                  ▶
                </span>
              </div>

              {/* Demo Items */}
              {expandedCategories[category.id] && (
                <Box direction="column" spacing={2} style={{ marginTop: '4px', paddingLeft: '12px' }}>
                  {category.demos.map(demo => {
                    const isActive = demo.id === activeDemoId;
                    return (
                      <div
                        key={demo.id}
                        onClick={() => onSelectDemo(demo)}
                        style={{
                          padding: '8px 12px',
                          cursor: 'pointer',
                          borderRadius: '4px',
                          fontSize: '13px',
                          color: isActive ? '#fff' : '#555',
                          backgroundColor: isActive ? '#1890ff' : 'transparent',
                          transition: 'all 0.2s',
                          borderLeft: isActive ? '3px solid #096dd9' : '3px solid transparent'
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = '#e6f7ff';
                            e.currentTarget.style.color = '#1890ff';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#555';
                          }
                        }}
                      >
                        <div style={{ fontWeight: isActive ? 500 : 400 }}>{demo.title}</div>
                        {demo.description && (
                          <div style={{
                            fontSize: '11px',
                            color: isActive ? 'rgba(255,255,255,0.8)' : '#999',
                            marginTop: '2px'
                          }}>
                            {demo.description}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </Box>
              )}
            </div>
          ))}
        </Box>

        {/* Footer Info */}
        <div style={{
          marginTop: 'auto',
          padding: '12px 16px',
          borderTop: '1px solid #e8e8e8',
          fontSize: '11px',
          color: '#999'
        }}>
          <div>共 {demoRegistry.reduce((sum, cat) => sum + cat.demos.length, 0)} 个示例</div>
          <div style={{ marginTop: '4px' }}>fat-design component library</div>
        </div>
      </Box>
    </Card>
  );
}
