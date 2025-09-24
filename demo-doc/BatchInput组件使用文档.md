# BatchInput 批量输入组件使用文档

## 概述
BatchInput 组件支持批量文本输入，可以处理多行文本的批量处理，常用于批量导入、标签输入等场景。

## 基础用法

### 简单使用
```jsx
import { BatchInput } from "fat-design";
import { useState } from "react";

function BasicBatchInput() {
  const [value, setValue] = useState("");

  return (
    <div style={{ width: '300px' }}>
      <BatchInput 
        value={value} 
        onChange={setValue}
        placeholder="请输入内容，每行一个"
      />
    </div>
  );
}
```

### 中文输入法支持
```jsx
function ChineseInputDemo() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  return (
    <div>
      {/* 开启中文输入法支持 */}
      <div style={{ width: '300px', marginBottom: '20px' }}>
        <h4>openChineseInput = true</h4>
        <BatchInput 
          value={value1} 
          onChange={setValue1}
          openChineseInput={true}
          composition={false}
          placeholder="支持中文输入法"
        />
      </div>

      {/* 关闭中文输入法支持 */}
      <div style={{ width: '300px' }}>
        <h4>openChineseInput = false</h4>
        <BatchInput 
          value={value2} 
          onChange={setValue2}
          openChineseInput={false}
          composition={false}
          placeholder="不支持中文输入法"
        />
      </div>
    </div>
  );
}
```

## 高级功能

### 长度限制和提示
```jsx
function LimitDemo() {
  const [value, setValue] = useState("");

  return (
    <div style={{ width: '400px' }}>
      <BatchInput 
        value={value} 
        onChange={setValue}
        maxLength={500}
        showLimitHint={true}
        placeholder="最多输入500个字符"
      />
    </div>
  );
}
```

### 数组值模式
```jsx
function ArrayValueDemo() {
  const [tags, setTags] = useState(['标签1', '标签2']);

  const handleChange = (value) => {
    // 如果是字符串，按行分割成数组
    if (typeof value === 'string') {
      const tagArray = value.split('\n').filter(tag => tag.trim());
      setTags(tagArray);
    } else {
      setTags(value);
    }
  };

  return (
    <div style={{ width: '300px' }}>
      <BatchInput 
        value={tags}
        onChange={handleChange}
        isArrayValue={true}
        placeholder="请输入标签，每行一个"
      />
      
      <div style={{ marginTop: '10px' }}>
        <strong>当前标签：</strong>
        {tags.map((tag, index) => (
          <span key={index} style={{ 
            display: 'inline-block', 
            background: '#f0f0f0', 
            padding: '2px 8px', 
            margin: '2px',
            borderRadius: '4px'
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
```

### 自动高度调整
```jsx
function AutoHeightDemo() {
  const [value, setValue] = useState("第一行\n第二行\n第三行");

  return (
    <div style={{ width: '400px' }}>
      <BatchInput 
        value={value} 
        onChange={setValue}
        autoHeight={{
          minRows: 3,
          maxRows: 10
        }}
        placeholder="输入框会根据内容自动调整高度"
      />
    </div>
  );
}
```

### 预览模式
```jsx
function PreviewDemo() {
  const [value, setValue] = useState("预览模式下的内容\n第二行内容");
  const [isPreview, setIsPreview] = useState(false);

  return (
    <div style={{ width: '400px' }}>
      <div style={{ marginBottom: '10px' }}>
        <label>
          <input 
            type="checkbox" 
            checked={isPreview}
            onChange={(e) => setIsPreview(e.target.checked)}
          />
          预览模式
        </label>
      </div>
      
      <BatchInput 
        value={value} 
        onChange={setValue}
        isPreview={isPreview}
        renderPreview={(value) => (
          <div style={{ 
            background: '#f5f5f5', 
            padding: '8px',
            borderRadius: '4px',
            whiteSpace: 'pre-wrap'
          }}>
            {value}
          </div>
        )}
        placeholder="在预览模式下将显示为只读"
      />
    </div>
  );
}
```

### 事件处理
```jsx
function EventDemo() {
  const [value, setValue] = useState("");
  const [log, setLog] = useState([]);

  const addLog = (message) => {
    setLog(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleFocus = (e) => {
    addLog('获得焦点');
  };

  const handleBlur = (e) => {
    addLog('失去焦点');
  };

  const handleKeyDown = (e, opts) => {
    addLog(`按键: ${e.key}`);
  };

  return (
    <div style={{ width: '400px' }}>
      <BatchInput 
        value={value} 
        onChange={setValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder="查看下方的事件日志"
      />
      
      <div style={{ 
        marginTop: '10px', 
        padding: '8px', 
        background: '#f9f9f9',
        borderRadius: '4px',
        fontSize: '12px'
      }}>
        <strong>事件日志：</strong>
        {log.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
  );
}
```

## API

### BatchInput Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| value | string \| string[] | - | 当前值 |
| defaultValue | string \| string[] | - | 默认值 |
| onChange | function | - | 变化回调 `(value: string \| string[]) => void` |
| isArrayValue | boolean | false | 值是否为数组类型 |
| placeholder | string | - | 输入提示 |
| disabled | boolean | false | 是否禁用 |
| maxLength | number | - | 最大长度（字符数） |
| showLimitHint | boolean | false | 是否显示长度提示 |
| hasLimitHint | boolean | false | 是否展现最大长度样式（已废弃，使用 showLimitHint） |
| openChineseInput | boolean | false | 是否支持中文输入法 |
| composition | boolean | true | 是否开启输入法中间状态过滤 |
| trim | boolean | false | onChange 返回时是否自动去除头尾空字符 |
| autoHeight | boolean \| object | false | 自动高度，可设置 `{minRows: 2, maxRows: 6}` |
| rows | number | - | 多行文本框行数 |
| hasBorder | boolean | true | 是否有边框 |
| state | `'error' \| 'warning'` | - | 输入框状态 |
| size | string | 'medium' | 输入框尺寸 |
| isPreview | boolean | false | 是否为预览态 |
| renderPreview | function | - | 预览态自定义渲染 |
| className | string | - | 自定义类名 |
| style | object | - | 自定义样式 |

### 事件回调

| 事件 | 类型 | 描述 |
|------|------|------|
| onFocus | `(e: FocusEvent) => void` | 获得焦点时触发 |
| onBlur | `(e: FocusEvent) => void` | 失去焦点时触发 |
| onKeyDown | `(e: KeyboardEvent, opts: {}) => void` | 键盘按下时触发 |
| getValueLength | `(value: string) => number` | 自定义字符串长度计算方式 |

## 完整示例

```jsx
import React, { useState } from 'react';
import { BatchInput, Button, Box, PageCard, Switch } from 'fat-design';

function CompleteBatchInputDemo() {
  const [basicValue, setBasicValue] = useState("苹果\n香蕉\n橙子");
  const [arrayValue, setArrayValue] = useState(['标签1', '标签2', '标签3']);
  const [isPreview, setIsPreview] = useState(false);
  const [chineseInputEnabled, setChineseInputEnabled] = useState(true);

  const handleArrayChange = (value) => {
    if (typeof value === 'string') {
      // 字符串转数组
      const items = value.split('\n').filter(item => item.trim());
      setArrayValue(items);
    } else {
      setArrayValue(value);
    }
  };

  const clearAll = () => {
    setBasicValue("");
    setArrayValue([]);
  };

  const loadSample = () => {
    setBasicValue("示例数据1\n示例数据2\n示例数据3\n示例数据4");
    setArrayValue(['示例标签1', '示例标签2', '示例标签3']);
  };

  return (
    <PageCard title="BatchInput 批量输入示例">
      <Box direction="row" spacing={20} style={{ marginBottom: 20 }}>
        <Button onClick={loadSample} type="primary">
          加载示例数据
        </Button>
        <Button onClick={clearAll}>
          清空所有
        </Button>
      </Box>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* 基础文本输入 */}
        <div>
          <h3>基础文本输入</h3>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Switch 
                checked={chineseInputEnabled}
                onChange={setChineseInputEnabled}
              />
              中文输入法支持
            </label>
          </div>
          <BatchInput 
            value={basicValue}
            onChange={setBasicValue}
            placeholder="请输入内容，每行一个"
            maxLength={200}
            showLimitHint={true}
            openChineseInput={chineseInputEnabled}
            autoHeight={{
              minRows: 4,
              maxRows: 8
            }}
            onFocus={() => console.log('基础输入框获得焦点')}
            onBlur={() => console.log('基础输入框失去焦点')}
          />
          <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            当前行数: {basicValue.split('\n').length}
          </div>
        </div>

        {/* 数组值输入 */}
        <div>
          <h3>标签输入（数组模式）</h3>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Switch 
                checked={isPreview}
                onChange={setIsPreview}
              />
              预览模式
            </label>
          </div>
          <BatchInput 
            value={arrayValue}
            onChange={handleArrayChange}
            isArrayValue={true}
            placeholder="请输入标签，每行一个"
            maxLength={100}
            showLimitHint={true}
            isPreview={isPreview}
            renderPreview={(value) => (
              <div style={{ 
                background: '#f5f5f5', 
                padding: '8px',
                borderRadius: '4px',
                minHeight: '100px'
              }}>
                {Array.isArray(value) ? value.map((item, index) => (
                  <span key={index} style={{
                    display: 'inline-block',
                    background: '#1890ff',
                    color: 'white',
                    padding: '2px 6px',
                    margin: '2px',
                    borderRadius: '2px',
                    fontSize: '12px'
                  }}>
                    {item}
                  </span>
                )) : value}
              </div>
            )}
            autoHeight={{
              minRows: 4,
              maxRows: 8
            }}
          />
          <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            标签数量: {Array.isArray(arrayValue) ? arrayValue.length : 0}
          </div>
        </div>
      </div>

      {/* 输出结果 */}
      <div style={{ marginTop: '30px' }}>
        <h3>当前值</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h4>基础文本值：</h4>
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '10px', 
              borderRadius: '4px',
              fontSize: '12px',
              maxHeight: '150px',
              overflow: 'auto'
            }}>
              {JSON.stringify(basicValue, null, 2)}
            </pre>
          </div>
          <div>
            <h4>数组值：</h4>
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '10px', 
              borderRadius: '4px',
              fontSize: '12px',
              maxHeight: '150px',
              overflow: 'auto'
            }}>
              {JSON.stringify(arrayValue, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </PageCard>
  );
}

export default CompleteBatchInputDemo;
```

## 使用场景

### 批量导入数据
```jsx
function ImportDemo() {
  const [importData, setImportData] = useState("");

  const handleImport = () => {
    const lines = importData.split('\n').filter(line => line.trim());
    console.log('导入数据:', lines);
    // 处理导入逻辑
  };

  return (
    <div>
      <BatchInput 
        value={importData}
        onChange={setImportData}
        placeholder="请粘贴要导入的数据，每行一个"
        autoHeight={{ minRows: 5, maxRows: 15 }}
        maxLength={10000}
        showLimitHint={true}
      />
      <Button onClick={handleImport} type="primary">
        导入数据 ({importData.split('\n').filter(line => line.trim()).length} 条)
      </Button>
    </div>
  );
}
```

### 标签管理
```jsx
function TagManager() {
  const [tags, setTags] = useState(['React', 'Vue', 'Angular']);

  const addTag = (newTag) => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div>
      <BatchInput 
        value={tags}
        onChange={setTags}
        isArrayValue={true}
        placeholder="输入标签，每行一个"
      />
      
      <div style={{ marginTop: '10px' }}>
        {tags.map((tag, index) => (
          <span key={index} style={{
            display: 'inline-block',
            background: '#f0f0f0',
            padding: '4px 8px',
            margin: '2px',
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            {tag}
            <button 
              onClick={() => removeTag(tag)}
              style={{ marginLeft: '4px', background: 'none', border: 'none' }}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
```

## 注意事项

1. **中文输入法**：openChineseInput 为 true 时才能正确处理中文输入
2. **数据格式**：isArrayValue 为 true 时，value 应为数组类型
3. **性能考虑**：大量数据时建议设置合理的 maxLength 限制
4. **用户体验**：提供清晰的输入提示和格式说明
5. **数据验证**：onChange 时应进行必要的数据验证和清理