# 主题系统

Fat Design 提供了强大而灵活的主题系统，包含 11 套精美的预设主题，同时支持自定义主题开发。

## 🎨 预设主题

Fat Design 内置了 11 套精美主题，涵盖不同的设计风格和应用场景：

### 主题列表

| 主题名称 | 主色调 | 适用场景 | 预览 |
|---------|--------|----------|------|
| `theme-default.css` | 蓝紫色 | 通用场景，默认推荐 | ![#5263ff](https://via.placeholder.com/15/5263ff/000000?text=+) |
| `theme-blue1.css` | 蓝色系1 | 商务、科技类应用 | ![#4169e1](https://via.placeholder.com/15/4169e1/000000?text=+) |
| `theme-blue2.css` | 蓝色系2 | 清新、现代风格 | ![#1890ff](https://via.placeholder.com/15/1890ff/000000?text=+) |
| `theme-blue3.css` | 蓝色系3 | 专业、稳重风格 | ![#2f54eb](https://via.placeholder.com/15/2f54eb/000000?text=+) |
| `theme-blue4.css` | 蓝色系4 | 深邃、高端风格 | ![#1d39c4](https://via.placeholder.com/15/1d39c4/000000?text=+) |
| `theme-green.css` | 绿色系 | 自然、环保类应用 | ![#52c41a](https://via.placeholder.com/15/52c41a/000000?text=+) |
| `theme-green2.css` | 绿色系2 | 清新、活力风格 | ![#00b853](https://via.placeholder.com/15/00b853/000000?text=+) |
| `theme-orange.css` | 橙色系 | 温暖、活跃风格 | ![#ff9f00](https://via.placeholder.com/15/ff9f00/000000?text=+) |
| `theme-pink.css` | 粉色系 | 温柔、浪漫风格 | ![#eb2f96](https://via.placeholder.com/15/eb2f96/000000?text=+) |
| `theme-purple.css` | 紫色系 | 神秘、优雅风格 | ![#722ed1](https://via.placeholder.com/15/722ed1/000000?text=+) |
| `theme-red.css` | 红色系 | 热情、醒目风格 | ![#f5222d](https://via.placeholder.com/15/f5222d/000000?text=+) |

## 📥 使用预设主题

### 静态引入

在项目入口文件中直接引入主题文件：

```javascript
// src/index.js 或 src/main.js
import 'fat-design/dist/theme-default.css'

// 或选择其他主题
import 'fat-design/dist/theme-blue1.css'
import 'fat-design/dist/theme-green.css'
```

### 在 HTML 中引入

```html
<!-- 在 public/index.html 中引入 -->
<link rel="stylesheet" href="/node_modules/fat-design/dist/theme-default.css">

<!-- 或使用 CDN -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fat-design/dist/theme-default.css">
```

### 构建工具配置

#### Vite 配置

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "fat-design/dist/variables.scss";`
      }
    }
  }
})
```

#### Webpack 配置

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
```

## 🔄 动态切换主题

### 基本实现

```javascript
// 主题切换函数
function changeTheme(themeName) {
  const link = document.getElementById('fat-design-theme')
  
  if (link) {
    link.href = `/node_modules/fat-design/dist/${themeName}.css`
  } else {
    const newLink = document.createElement('link')
    newLink.id = 'fat-design-theme'
    newLink.rel = 'stylesheet'
    newLink.href = `/node_modules/fat-design/dist/${themeName}.css`
    document.head.appendChild(newLink)
  }
}

// 使用示例
changeTheme('theme-blue1')
changeTheme('theme-green')
```

### React 主题切换组件

```javascript
import React, { useState, useEffect } from 'react'
import { Select, Card } from 'fat-design'

const { Option } = Select

const themes = [
  { label: '默认主题', value: 'theme-default', color: '#5263ff' },
  { label: '蓝色主题1', value: 'theme-blue1', color: '#4169e1' },
  { label: '蓝色主题2', value: 'theme-blue2', color: '#1890ff' },
  { label: '蓝色主题3', value: 'theme-blue3', color: '#2f54eb' },
  { label: '蓝色主题4', value: 'theme-blue4', color: '#1d39c4' },
  { label: '绿色主题', value: 'theme-green', color: '#52c41a' },
  { label: '绿色主题2', value: 'theme-green2', color: '#00b853' },
  { label: '橙色主题', value: 'theme-orange', color: '#ff9f00' },
  { label: '粉色主题', value: 'theme-pink', color: '#eb2f96' },
  { label: '紫色主题', value: 'theme-purple', color: '#722ed1' },
  { label: '红色主题', value: 'theme-red', color: '#f5222d' }
]

function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState('theme-default')

  const changeTheme = (themeName) => {
    const link = document.getElementById('fat-design-theme')
    
    if (link) {
      link.href = `/node_modules/fat-design/dist/${themeName}.css`
    } else {
      const newLink = document.createElement('link')
      newLink.id = 'fat-design-theme'
      newLink.rel = 'stylesheet'
      newLink.href = `/node_modules/fat-design/dist/${themeName}.css`
      document.head.appendChild(newLink)
    }
    
    setCurrentTheme(themeName)
    
    // 保存到本地存储
    localStorage.setItem('fat-design-theme', themeName)
  }

  useEffect(() => {
    // 从本地存储恢复主题
    const savedTheme = localStorage.getItem('fat-design-theme')
    if (savedTheme) {
      changeTheme(savedTheme)
    }
  }, [])

  return (
    <Card title="主题切换" style={{ maxWidth: 400 }}>
      <Select
        value={currentTheme}
        onChange={changeTheme}
        style={{ width: '100%' }}
        placeholder="选择主题"
      >
        {themes.map(theme => (
          <Option key={theme.value} value={theme.value}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: 16,
                  height: 16,
                  backgroundColor: theme.color,
                  borderRadius: 2,
                  marginRight: 8
                }}
              />
              {theme.label}
            </div>
          </Option>
        ))}
      </Select>
    </Card>
  )
}

export default ThemeSwitcher
```

### 高级主题管理

```javascript
import React, { createContext, useContext, useState, useEffect } from 'react'

// 主题上下文
const ThemeContext = createContext()

// 主题管理器
export const ThemeProvider = ({ children, defaultTheme = 'theme-default' }) => {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme)
  const [loading, setLoading] = useState(false)

  const changeTheme = async (themeName) => {
    setLoading(true)
    
    try {
      // 预加载主题文件
      await loadThemeCSS(themeName)
      
      // 移除旧主题
      const oldLink = document.getElementById('fat-design-theme')
      if (oldLink) {
        oldLink.remove()
      }
      
      // 添加新主题
      const newLink = document.createElement('link')
      newLink.id = 'fat-design-theme'
      newLink.rel = 'stylesheet'
      newLink.href = `/node_modules/fat-design/dist/${themeName}.css`
      document.head.appendChild(newLink)
      
      setCurrentTheme(themeName)
      localStorage.setItem('fat-design-theme', themeName)
      
      // 触发主题变更事件
      window.dispatchEvent(new CustomEvent('themeChange', { 
        detail: { theme: themeName } 
      }))
    } catch (error) {
      console.error('主题切换失败:', error)
    } finally {
      setLoading(false)
    }
  }

  // 预加载主题CSS
  const loadThemeCSS = (themeName) => {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = `/node_modules/fat-design/dist/${themeName}.css`
      link.onload = resolve
      link.onerror = reject
      document.head.appendChild(link)
    })
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('fat-design-theme')
    if (savedTheme && savedTheme !== currentTheme) {
      changeTheme(savedTheme)
    }
  }, [])

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      changeTheme,
      loading,
      themes
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

// 主题Hook
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
```

## 🎨 自定义主题

### CSS 变量覆盖

Fat Design 使用 CSS 变量定义主题，你可以通过覆盖这些变量来自定义主题：

```css
/* 自定义主题 custom-theme.css */
.fatd-theme-custom {
  /* 品牌色 */
  --color-brand1-1: #e6f7ff;
  --color-brand1-6: #1890ff;
  --color-brand1-9: #0050b3;
  
  /* 文本色 */
  --color-text1-1: #bfbfbf;
  --color-text1-2: #8c8c8c;
  --color-text1-3: #595959;
  --color-text1-4: #262626;
  
  /* 边框色 */
  --color-line1-1: #f0f0f0;
  --color-line1-2: #e8e8e8;
  --color-line1-3: #d9d9d9;
  --color-line1-4: #bfbfbf;
  
  /* 背景色 */
  --color-bg1-1: #fafafa;
  --color-bg1-2: #f5f5f5;
  
  /* 功能色 */
  --color-success-3: #52c41a;
  --color-warning-3: #faad14;
  --color-error-3: #f5222d;
  --color-notice-3: #1890ff;
}
```

### 主题生成器

```javascript
// theme-generator.js
export function generateTheme(options) {
  const {
    primary = '#1890ff',
    success = '#52c41a',
    warning = '#faad14',
    error = '#f5222d',
    textPrimary = '#262626',
    textSecondary = '#595959',
    borderColor = '#d9d9d9',
    backgroundColor = '#fafafa'
  } = options

  return {
    '--color-brand1-6': primary,
    '--color-brand1-1': lighten(primary, 0.9),
    '--color-brand1-9': darken(primary, 0.2),
    
    '--color-success-3': success,
    '--color-warning-3': warning,
    '--color-error-3': error,
    
    '--color-text1-4': textPrimary,
    '--color-text1-3': textSecondary,
    '--color-line1-3': borderColor,
    '--color-bg1-1': backgroundColor
  }
}

// 颜色处理函数
function lighten(color, amount) {
  // 实现颜色变亮逻辑
}

function darken(color, amount) {
  // 实现颜色变暗逻辑
}

// 使用示例
const customTheme = generateTheme({
  primary: '#722ed1',
  success: '#13c2c2',
  warning: '#faad14',
  error: '#f5222d'
})

// 应用自定义主题
function applyCustomTheme(themeVars) {
  const style = document.createElement('style')
  style.innerHTML = `
    :root {
      ${Object.entries(themeVars)
        .map(([key, value]) => `${key}: ${value};`)
        .join('\n')}
    }
  `
  document.head.appendChild(style)
}

applyCustomTheme(customTheme)
```

### SCSS 主题定制

```scss
// custom-theme.scss
@import "fat-design/dist/variables.scss";

// 覆盖主题变量
$brand-primary: #722ed1;
$success-color: #13c2c2;
$warning-color: #faad14;
$error-color: #f5222d;

// 生成自定义主题
.fatd-theme-custom {
  --color-brand1-6: #{$brand-primary};
  --color-brand1-1: #{lighten($brand-primary, 45%)};
  --color-brand1-9: #{darken($brand-primary, 15%)};
  
  --color-success-3: #{$success-color};
  --color-warning-3: #{$warning-color};
  --color-error-3: #{$error-color};
}
```

## 🔧 主题配置

### 全局主题配置

```javascript
import React from 'react'
import { ConfigProvider } from 'fat-design'

function App() {
  return (
    <ConfigProvider
      theme={{
        // 主题配置
        algorithm: 'default', // 主题算法
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 4,
          wireframe: false
        }
      }}
    >
      <YourApp />
    </ConfigProvider>
  )
}
```

### 组件级主题定制

```javascript
import React from 'react'
import { Button, ConfigProvider } from 'fat-design'

function ThemedButton() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: '#722ed1',
            borderRadius: 8
          }
        }
      }}
    >
      <Button type="primary">自定义样式按钮</Button>
    </ConfigProvider>
  )
}
```

## 📱 响应式主题

### 媒体查询支持

```css
/* 响应式主题变量 */
@media (max-width: 768px) {
  :root {
    --component-size: small;
    --font-size-base: 14px;
    --padding-base: 8px;
  }
}

@media (min-width: 1200px) {
  :root {
    --component-size: large;
    --font-size-base: 16px;
    --padding-base: 16px;
  }
}
```

### 暗色主题

```css
/* 暗色主题 theme-dark.css */
.fatd-theme-dark {
  --color-bg1-1: #141414;
  --color-bg1-2: #1f1f1f;
  
  --color-text1-1: #595959;
  --color-text1-2: #8c8c8c;
  --color-text1-3: #bfbfbf;
  --color-text1-4: #f0f0f0;
  
  --color-line1-1: #262626;
  --color-line1-2: #303030;
  --color-line1-3: #434343;
  --color-line1-4: #595959;
  
  --color-fill1-1: #1f1f1f;
  --color-fill1-2: #262626;
  --color-fill1-3: #303030;
  --color-fill1-4: #434343;
}
```

### 自动暗色主题切换

```javascript
import React, { useState, useEffect } from 'react'

function useSystemTheme() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDark(mediaQuery.matches)

    const handleChange = (e) => {
      setIsDark(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return isDark
}

function AutoTheme() {
  const isDarkMode = useSystemTheme()
  const [manualTheme, setManualTheme] = useState(null)

  useEffect(() => {
    const theme = manualTheme || (isDarkMode ? 'theme-dark' : 'theme-default')
    changeTheme(theme)
  }, [isDarkMode, manualTheme])

  return (
    <div>
      <button onClick={() => setManualTheme('theme-dark')}>
        暗色主题
      </button>
      <button onClick={() => setManualTheme('theme-default')}>
        明亮主题
      </button>
      <button onClick={() => setManualTheme(null)}>
        跟随系统
      </button>
    </div>
  )
}
```

## 📋 主题变量参考

### 色彩变量

```css
/* 品牌色 */
--color-brand1-1: 最浅品牌色
--color-brand1-6: 主品牌色
--color-brand1-9: 最深品牌色

/* 文本色 */
--color-text1-1: 禁用文本色
--color-text1-2: 辅助文本色
--color-text1-3: 次要文本色
--color-text1-4: 主要文本色

/* 边框色 */
--color-line1-1: 最浅边框色
--color-line1-2: 浅边框色
--color-line1-3: 一般边框色
--color-line1-4: 深边框色

/* 背景色 */
--color-bg1-1: 页面背景色
--color-bg1-2: 容器背景色

/* 功能色 */
--color-success-1: 成功浅色
--color-success-3: 成功主色
--color-warning-1: 警告浅色
--color-warning-3: 警告主色
--color-error-1: 错误浅色
--color-error-3: 错误主色
--color-notice-1: 信息浅色
--color-notice-3: 信息主色
```

### 尺寸变量

```css
/* 组件尺寸 */
--size-small: 24px
--size-medium: 32px
--size-large: 40px

/* 边框圆角 */
--border-radius-small: 2px
--border-radius-medium: 4px
--border-radius-large: 6px

/* 间距 */
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 16px
--spacing-lg: 24px
--spacing-xl: 32px
```

## 🔍 调试和测试

### 主题调试工具

```javascript
// 主题调试器
function ThemeDebugger() {
  const [selectedVar, setSelectedVar] = useState('')
  const [value, setValue] = useState('')

  const cssVars = [
    '--color-brand1-6',
    '--color-text1-4',
    '--color-line1-3',
    '--color-bg1-1'
  ]

  const updateCSSVar = (varName, newValue) => {
    document.documentElement.style.setProperty(varName, newValue)
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd' }}>
      <h3>主题调试器</h3>
      <select 
        value={selectedVar} 
        onChange={(e) => setSelectedVar(e.target.value)}
      >
        <option value="">选择CSS变量</option>
        {cssVars.map(varName => (
          <option key={varName} value={varName}>{varName}</option>
        ))}
      </select>
      
      <input
        type="color"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          if (selectedVar) {
            updateCSSVar(selectedVar, e.target.value)
          }
        }}
      />
      
      <button onClick={() => {
        if (selectedVar && value) {
          updateCSSVar(selectedVar, value)
        }
      }}>
        应用
      </button>
    </div>
  )
}
```

## 🚀 最佳实践

### 1. 主题文件管理

```
themes/
├── index.js          # 主题入口
├── default.css       # 默认主题
├── dark.css          # 暗色主题
├── custom/           # 自定义主题
│   ├── company.css   # 企业主题
│   └── holiday.css   # 节日主题
└── utils/
    ├── generator.js  # 主题生成器
    └── validator.js  # 主题验证器
```

### 2. 主题切换性能优化

- 预加载主题文件
- 使用CSS变量减少重绘
- 缓存主题配置
- 避免频繁切换

### 3. 主题一致性

- 遵循设计规范
- 保持色彩对比度
- 考虑无障碍访问
- 测试不同设备

### 4. 主题维护

- 定期更新主题变量
- 文档化自定义主题
- 版本控制主题文件
- 测试主题兼容性