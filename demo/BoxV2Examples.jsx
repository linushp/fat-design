import React from 'react';
import { Box, Button } from  "../src/index";

// 包装组件示例 - 这个组件故意不传递样式属性
const WrapperComponent = ({ children }) => {
    return <div className="wrapper">{children}</div>;
};

const BoxV2Examples = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Box V2 示例</h1>
            
            <section style={{ marginBottom: '40px' }}>
                <h2>问题演示：V1 vs V2 对比</h2>
                
                <h3>V1版本（原实现）- spacing可能失效</h3>
                <Box spacing={16} direction="row" style={{ marginBottom: '20px', border: '1px dashed #52c41a', padding: '10px' }}>
                    <WrapperComponent>
                        <Button type="primary">Button 1</Button>
                    </WrapperComponent>
                    <WrapperComponent>
                        <Button>Button 2</Button>
                    </WrapperComponent>
                    <WrapperComponent>
                        <Button type="secondary">Button 3</Button>
                    </WrapperComponent>
                </Box>
                <p style={{ color: '#ff4d4f', fontSize: '14px' }}>
                    ❌ 当Button外层有WrapperComponent时，spacing可能不生效，因为样式被应用到了wrapper上而不是button上
                </p>
                
                <h3>V2版本（新实现）- spacing始终生效</h3>
                <Box v2 spacing={16} direction="row" style={{ marginBottom: '20px', border: '1px dashed #1890ff', padding: '10px' }}>
                    <WrapperComponent>
                        <Button type="primary">Button 1</Button>
                    </WrapperComponent>
                    <WrapperComponent>
                        <Button>Button 2</Button>
                    </WrapperComponent>
                    <WrapperComponent>
                        <Button type="secondary">Button 3</Button>
                    </WrapperComponent>
                </Box>
                <p style={{ color: '#52c41a', fontSize: '14px' }}>
                    ✅ V2版本使用CSS gap属性，无论children外层有多少包装组件都能正常工作
                </p>
            </section>

            <section style={{ marginBottom: '40px' }}>
                <h2>V2版本功能特性</h2>
                
                <h3>1. 行布局 + 不同间距</h3>
                <Box v2 spacing={8} direction="row" style={{ marginBottom: '16px', border: '1px solid #d9d9d9', padding: '10px' }}>
                    <div style={{ background: '#f0f0f0', padding: '8px 16px', borderRadius: '4px' }}>Item 1</div>
                    <div style={{ background: '#f0f0f0', padding: '8px 16px', borderRadius: '4px' }}>Item 2</div>
                    <div style={{ background: '#f0f0f0', padding: '8px 16px', borderRadius: '4px' }}>Item 3</div>
                </Box>
                
                <Box v2 spacing={20} direction="row" style={{ marginBottom: '16px', border: '1px solid #d9d9d9', padding: '10px' }}>
                    <div style={{ background: '#e6f7ff', padding: '8px 16px', borderRadius: '4px' }}>Spacing 20</div>
                    <div style={{ background: '#e6f7ff', padding: '8px 16px', borderRadius: '4px' }}>Spacing 20</div>
                    <div style={{ background: '#e6f7ff', padding: '8px 16px', borderRadius: '4px' }}>Spacing 20</div>
                </Box>

                <h3>2. 列布局</h3>
                <Box v2 spacing={12} direction="column" style={{ marginBottom: '16px', border: '1px solid #d9d9d9', padding: '10px', maxWidth: '200px' }}>
                    <div style={{ background: '#f6ffed', padding: '12px', borderRadius: '4px', textAlign: 'center' }}>Column 1</div>
                    <div style={{ background: '#f6ffed', padding: '12px', borderRadius: '4px', textAlign: 'center' }}>Column 2</div>
                    <div style={{ background: '#f6ffed', padding: '12px', borderRadius: '4px', textAlign: 'center' }}>Column 3</div>
                </Box>

                <h3>3. 折行布局</h3>
                <Box v2 spacing={10} direction="row" wrap style={{ marginBottom: '16px', border: '1px solid #d9d9d9', padding: '10px', width: '300px' }}>
                    <div style={{ background: '#fff2e6', padding: '8px 12px', borderRadius: '4px' }}>Wrap 1</div>
                    <div style={{ background: '#fff2e6', padding: '8px 12px', borderRadius: '4px' }}>Wrap 2</div>
                    <div style={{ background: '#fff2e6', padding: '8px 12px', borderRadius: '4px' }}>Wrap 3</div>
                    <div style={{ background: '#fff2e6', padding: '8px 12px', borderRadius: '4px' }}>Wrap 4</div>
                    <div style={{ background: '#fff2e6', padding: '8px 12px', borderRadius: '4px' }}>Wrap 5</div>
                </Box>

                <h3>4. 对齐方式</h3>
                <Box v2 spacing={16} direction="row" justify="space-between" align="center" 
                     style={{ marginBottom: '16px', border: '1px solid #d9d9d9', padding: '10px', height: '80px' }}>
                    <div style={{ background: '#f9f0ff', padding: '12px', borderRadius: '4px' }}>Left</div>
                    <div style={{ background: '#f9f0ff', padding: '12px', borderRadius: '4px' }}>Center</div>
                    <div style={{ background: '#f9f0ff', padding: '12px', borderRadius: '4px' }}>Right</div>
                </Box>

                <h3>5. 数组形式的spacing [行间距, 列间距]</h3>
                <Box v2 spacing={[20, 10]} direction="row" wrap style={{ marginBottom: '16px', border: '1px solid #d9d9d9', padding: '10px', width: '250px' }}>
                    <div style={{ background: '#fff1f0', padding: '8px 12px', borderRadius: '4px' }}>Row 20</div>
                    <div style={{ background: '#fff1f0', padding: '8px 12px', borderRadius: '4px' }}>Col 10</div>
                    <div style={{ background: '#fff1f0', padding: '8px 12px', borderRadius: '4px' }}>Different</div>
                    <div style={{ background: '#fff1f0', padding: '8px 12px', borderRadius: '4px' }}>Spacing</div>
                </Box>
            </section>

            <section>
                <h2>迁移指南</h2>
                <div style={{ background: '#f6f8fa', padding: '16px', borderRadius: '6px' }}>
                    <h4>从V1迁移到V2：</h4>
                    <ol>
                        <li>在现有的Box组件上添加 <code>v2={`{true}`}</code> 属性</li>
                        <li>测试布局是否符合预期</li>
                        <li>如果遇到兼容性问题（老浏览器不支持gap），可以保持原版本</li>
                        <li>建议新项目直接使用V2版本</li>
                    </ol>
                    
                    <h4>浏览器兼容性：</h4>
                    <ul>
                        <li>✅ Chrome 84+ (2020年7月)</li>
                        <li>✅ Firefox 63+ (2018年10月)</li> 
                        <li>✅ Safari 14.1+ (2021年4月)</li>
                        <li>❌ IE 不支持gap属性</li>
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default BoxV2Examples;