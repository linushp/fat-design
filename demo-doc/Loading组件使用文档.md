# Loading 加载组件使用文档

## 概述
Loading 组件用于页面和区块的加载中状态显示，提供全屏和局部加载效果。

## 基础用法

### 函数式调用
```jsx
import { Loading, Button, Box } from "fat-design";

function LoadingDemo() {
  const showLoading = () => {
    Loading.showLoading({ tip: "加载中..." });
    
    // 3秒后隐藏
    setTimeout(() => {
      Loading.hideLoading();
    }, 3000);
  };

  const showFullScreenLoading = () => {
    Loading.showLoading({ 
      tip: "全屏加载中...", 
      fullScreen: true 
    });
    
    setTimeout(() => {
      Loading.hideLoading();
    }, 3000);
  };

  return (
    <Box direction="row" spacing={20}>
      <Button type="primary" onClick={showLoading}>
        显示加载
      </Button>
      
      <Button type="primary" onClick={showFullScreenLoading}>
        全屏加载
      </Button>
      
      <Button onClick={() => Loading.hideLoading()}>
        隐藏加载
      </Button>
    </Box>
  );
}
```

### 组件包装方式
```jsx
function ComponentLoading() {
  const [loading, setLoading] = useState(false);

  const handleToggle = () => {
    setLoading(!loading);
    if (!loading) {
      setTimeout(() => setLoading(false), 3000);
    }
  };

  return (
    <div>
      <Button onClick={handleToggle}>
        {loading ? '停止加载' : '开始加载'}
      </Button>
      
      <Loading tip="加载中..." visible={loading}>
        <div style={{ 
          height: '200px', 
          background: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          这里是被加载遮罩覆盖的内容
        </div>
      </Loading>
    </div>
  );
}
```

## API

### Loading 静态方法

#### Loading.showLoading(config)
显示加载提示

#### Loading.hideLoading()
隐藏加载提示

### 配置项 (config)

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| tip | string | '加载中' | 加载提示文案 |
| fullScreen | boolean | false | 是否全屏显示 |

### Loading 组件 Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| visible | boolean | false | 是否显示加载状态 |
| tip | string | '加载中' | 加载提示文案 |
| size | `'large' \| 'medium'` | 'large' | 加载动画尺寸 |
| style | object | - | 自定义样式 |
| children | ReactNode | - | 被包装的内容 |

## 完整示例

```jsx
import React, { useState } from 'react';
import { Loading, Button, Box, PageCard } from 'fat-design';

function CompleteLoadingDemo() {
  const [componentLoading, setComponentLoading] = useState(false);

  const showTimedLoading = (tip, fullScreen = false, duration = 3000) => {
    Loading.showLoading({ tip, fullScreen });
    setTimeout(() => {
      Loading.hideLoading();
    }, duration);
  };

  const simulateAsyncOperation = () => {
    setComponentLoading(true);
    
    // 模拟异步操作
    setTimeout(() => {
      setComponentLoading(false);
    }, 3000);
  };

  const showSequentialLoading = () => {
    Loading.showLoading({ tip: "第一步：初始化..." });
    
    setTimeout(() => {
      Loading.hideLoading();
      Loading.showLoading({ tip: "第二步：处理数据..." });
    }, 1500);
    
    setTimeout(() => {
      Loading.hideLoading();
      Loading.showLoading({ tip: "第三步：完成操作...", fullScreen: true });
    }, 3000);
    
    setTimeout(() => {
      Loading.hideLoading();
    }, 4500);
  };

  return (
    <PageCard title="Loading 加载组件示例">
      <h3>函数式调用</h3>
      <Box direction="row" spacing={20} style={{ marginBottom: 30 }}>
        <Button 
          type="primary" 
          onClick={() => showTimedLoading("加载中...")}
        >
          普通加载
        </Button>
        
        <Button 
          type="primary" 
          onClick={() => showTimedLoading("全屏加载中...", true)}
        >
          全屏加载
        </Button>
        
        <Button 
          type="secondary" 
          onClick={() => showTimedLoading("长时间加载...", false, 5000)}
        >
          长时间加载
        </Button>
        
        <Button onClick={showSequentialLoading}>
          顺序加载
        </Button>
        
        <Button 
          onClick={() => Loading.hideLoading()}
          warning
        >
          强制隐藏
        </Button>
      </Box>

      <h3>组件包装</h3>
      <div style={{ marginBottom: 30 }}>
        <Button 
          type="primary" 
          onClick={simulateAsyncOperation}
          disabled={componentLoading}
        >
          {componentLoading ? '加载中...' : '模拟异步操作'}
        </Button>
        
        <div style={{ marginTop: 20 }}>
          <Loading 
            visible={componentLoading} 
            tip="正在处理数据..."
            size="large"
          >
            <div style={{ 
              height: '200px', 
              background: '#f5f5f5',
              border: '1px dashed #ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '6px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <h4>内容区域</h4>
                <p>这里是会被加载遮罩覆盖的内容</p>
                <p>当加载状态为 true 时，此区域会显示加载动画</p>
              </div>
            </div>
          </Loading>
        </div>
      </div>

      <h3>不同尺寸</h3>
      <Box direction="row" spacing={20}>
        <div>
          <h4>Medium 尺寸</h4>
          <Loading visible={true} tip="加载中..." size="medium">
            <div style={{ 
              width: 150, 
              height: 100, 
              background: '#f0f0f0',
              border: '1px solid #ddd'
            }} />
          </Loading>
        </div>
        
        <div>
          <h4>Large 尺寸</h4>
          <Loading visible={true} tip="加载中..." size="large">
            <div style={{ 
              width: 150, 
              height: 100, 
              background: '#f0f0f0',
              border: '1px solid #ddd'
            }} />
          </Loading>
        </div>
      </Box>
    </PageCard>
  );
}

export default CompleteLoadingDemo;
```

## 使用场景

### 异步操作加载
```jsx
function AsyncOperationExample() {
  const handleAsyncOperation = async () => {
    Loading.showLoading({ tip: "处理中，请稍候..." });
    
    try {
      await someAsyncOperation();
      Loading.hideLoading();
      Message.success('操作成功');
    } catch (error) {
      Loading.hideLoading();
      Message.error('操作失败：' + error.message);
    }
  };

  return (
    <Button onClick={handleAsyncOperation}>
      执行异步操作
    </Button>
  );
}
```

### 页面初始化加载
```jsx
function PageInitExample() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchPageData();
        setData(result);
      } catch (error) {
        console.error('加载失败:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <Loading 
        visible={true} 
        tip="正在加载页面数据..."
        style={{ height: '100vh' }}
      >
        <div />
      </Loading>
    );
  }

  return (
    <div>
      {/* 页面内容 */}
      {data && <PageContent data={data} />}
    </div>
  );
}
```

### 表格数据加载
```jsx
function TableLoadingExample() {
  const [tableLoading, setTableLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  const loadTableData = async () => {
    setTableLoading(true);
    try {
      const data = await fetchTableData();
      setTableData(data);
    } catch (error) {
      Message.error('数据加载失败');
    } finally {
      setTableLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={loadTableData}>刷新数据</Button>
      
      <Loading visible={tableLoading} tip="正在加载数据...">
        <Table dataSource={tableData} />
      </Loading>
    </div>
  );
}
```

## 注意事项

1. **全屏加载**：fullScreen 为 true 时会覆盖整个屏幕
2. **嵌套使用**：避免多层 Loading 嵌套，可能导致显示异常
3. **及时隐藏**：确保在适当的时机调用 hideLoading() 隐藏加载状态
4. **用户体验**：长时间加载建议提供取消操作或进度提示
5. **性能考虑**：避免频繁显示/隐藏加载状态