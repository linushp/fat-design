import React, { useState } from 'react';
import { Input } from '../src';

const DemoColorPicker = () => {
    const [color1, setColor1] = useState('#ff0000');
    const [color2, setColor2] = useState('#00ff00');
    const [color3, setColor3] = useState('#0000ff');

    return (
        <div style={{ padding: '20px' }}>
            <h2>ColorPicker 颜色选择器演示</h2>
            
            <div style={{ marginBottom: '20px' }}>
                <h3>基础用法</h3>
                <div style={{ marginBottom: '10px' }}>
                    <label>基础颜色选择器：</label>
                    <Input.ColorPicker 
                        value={color1}
                        onChange={(value) => {
                            console.log('颜色变化:', value);
                            setColor1(value);
                        }}
                        style={{ marginLeft: '10px', width: '200px' }}
                    />
                </div>
                <div>当前颜色: {color1}</div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>不同尺寸</h3>
                <div style={{ marginBottom: '10px' }}>
                    <label>小尺寸：</label>
                    <Input.ColorPicker 
                        size="small"
                        value={color2}
                        onChange={setColor2}
                        style={{ marginLeft: '10px', width: '150px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>中尺寸：</label>
                    <Input.ColorPicker 
                        size="medium"
                        value={color2}
                        onChange={setColor2}
                        style={{ marginLeft: '10px', width: '180px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>大尺寸：</label>
                    <Input.ColorPicker 
                        size="large"
                        value={color2}
                        onChange={setColor2}
                        style={{ marginLeft: '10px', width: '220px' }}
                    />
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>颜色文本位置</h3>
                <div style={{ marginBottom: '10px' }}>
                    <label>文本在左侧：</label>
                    <Input.ColorPicker 
                        value={color3}
                        onChange={setColor3}
                        colorTextPosition="left"
                        style={{ marginLeft: '10px', width: '200px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>文本在右侧：</label>
                    <Input.ColorPicker 
                        value={color3}
                        onChange={setColor3}
                        colorTextPosition="right"
                        style={{ marginLeft: '10px', width: '200px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>不显示文本：</label>
                    <Input.ColorPicker 
                        value={color3}
                        onChange={setColor3}
                        showColorText={false}
                        style={{ marginLeft: '10px', width: '100px' }}
                    />
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>不同状态</h3>
                <div style={{ marginBottom: '10px' }}>
                    <label>禁用状态：</label>
                    <Input.ColorPicker 
                        value="#cccccc"
                        disabled
                        style={{ marginLeft: '10px', width: '200px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>只读状态：</label>
                    <Input.ColorPicker 
                        value="#888888"
                        readOnly
                        style={{ marginLeft: '10px', width: '200px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>错误状态：</label>
                    <Input.ColorPicker 
                        value="#ff4d4f"
                        state="error"
                        style={{ marginLeft: '10px', width: '200px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>成功状态：</label>
                    <Input.ColorPicker 
                        value="#52c41a"
                        state="success"
                        style={{ marginLeft: '10px', width: '200px' }}
                    />
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>无边框</h3>
                <div style={{ marginBottom: '10px' }}>
                    <label>无边框样式：</label>
                    <Input.ColorPicker 
                        value="#1890ff"
                        hasBorder={false}
                        style={{ marginLeft: '10px', width: '200px' }}
                    />
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>预览模式</h3>
                <div style={{ marginBottom: '10px' }}>
                    <label>预览模式：</label>
                    <Input.ColorPicker 
                        value="#722ed1"
                        isPreview
                        style={{ marginLeft: '10px' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default DemoColorPicker;