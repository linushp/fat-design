# StorageInstance 存储实例

StorageInstance 是 Fat Design 提供的灵活存储解决方案，采用插件化设计，允许开发者根据需要选择或定制存储引擎。

## 设计理念

StorageInstance 基于**插件化架构**设计，支持任意存储引擎的注入和切换：

- **默认引擎**：localStorage（浏览器原生存储）
- **可选增强**：LocalForage（支持 IndexedDB、WebSQL、localStorage）
- **自定义引擎**：远程 API、加密存储、内存存储等任意实现

### 存储引擎接口要求

任何存储引擎只需实现以下三个方法即可：

```typescript
interface StorageEngine {
  getItem(key: string): Promise<string | null> | string | null;
  setItem(key: string, value: string): Promise<void> | void;
  removeItem(key: string): Promise<void> | void;
}
```

## 工作原理

StorageInstance 的工作流程：

1. **默认策略**：内部默认使用 localStorage 作为存储引擎
2. **自动检测**：如果全局存在 LocalForage 库，会自动创建 LocalForage 实例
3. **手动配置**：通过 `useForage` 方法可以注入任何自定义存储引擎
4. **优先级**：自定义配置 > LocalForage 自动检测 > localStorage 默认

```javascript
// 核心实现逻辑
class StorageInstance {
  getInstance() {
    // 1. 优先使用通过 useForage 注入的自定义引擎
    if (this.forageInstance) {
      return this.forageInstance
    }
    
    // 2. 自动检测 LocalForage
    const localforage = window.localforage
    if (localforage && localforage.createInstance) {
      this.forageInstance = localforage.createInstance({ name: "fat-design" })
      return this.forageInstance
    }
    
    // 3. 默认使用 localStorage
    return localStorage
  }
}
```

## 🔧 存储引擎配置

### 1. 使用 LocalForage

**通过 npm 安装：**

```bash
npm install localforage
```

```javascript
import localforage from 'localforage'
import { storageInstance } from 'fat-design'

// 创建自定义 LocalForage 实例
const customForage = localforage.createInstance({
  name: 'MyApp',
  version: 1.0,
  size: 4980736, // 大小，单位字节，仅 WebSQL 使用
  storeName: 'app_data', // 数据库表名
  description: '应用数据存储'
})

// 配置 StorageInstance 使用自定义实例
storageInstance.useForage(customForage)
```

**通过 CDN 引入：**

```html
<!-- 在 HTML 中引入 LocalForage -->
<script src="https://cdn.jsdelivr.net/npm/localforage@1.10.0/dist/localforage.min.js"></script>

<script>
// StorageInstance 会自动检测并使用 window.localforage
console.log('LocalForage 可用:', !!window.localforage)
</script>
```

### 2. 远程 API 存储

```javascript
// 实现远程 API 存储引擎
class RemoteStorage {
  constructor(apiUrl, token) {
    this.apiUrl = apiUrl
    this.token = token
  }

  async getItem(key) {
    try {
      const response = await fetch(`${this.apiUrl}/storage/${key}`, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        return data.value
      }
      return null
    } catch (error) {
      console.error('远程获取失败:', error)
      return null
    }
  }

  async setItem(key, value) {
    try {
      await fetch(`${this.apiUrl}/storage/${key}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify({ value })
      })
    } catch (error) {
      console.error('远程保存失败:', error)
      throw error
    }
  }

  async removeItem(key) {
    try {
      await fetch(`${this.apiUrl}/storage/${key}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      })
    } catch (error) {
      console.error('远程删除失败:', error)
      throw error
    }
  }
}

// 使用远程存储
const remoteStorage = new RemoteStorage('https://api.example.com', 'your-token')
storageInstance.useForage(remoteStorage)
```

### 3. 加密存储

```javascript
// 实现加密存储引擎
class EncryptedStorage {
  constructor(encryptionKey) {
    this.encryptionKey = encryptionKey
  }

  // 简单的加密函数（实际使用中建议使用更安全的加密方法）
  encrypt(text) {
    // 这里只是示例，实际应用中请使用 crypto-js 等专业库
    return btoa(text + this.encryptionKey)
  }

  decrypt(encryptedText) {
    try {
      const decoded = atob(encryptedText)
      return decoded.replace(this.encryptionKey, '')
    } catch (error) {
      return null
    }
  }

  async getItem(key) {
    const encryptedValue = localStorage.getItem(key)
    if (encryptedValue) {
      return this.decrypt(encryptedValue)
    }
    return null
  }

  async setItem(key, value) {
    const encryptedValue = this.encrypt(value)
    localStorage.setItem(key, encryptedValue)
  }

  async removeItem(key) {
    localStorage.removeItem(key)
  }
}

// 使用加密存储
const encryptedStorage = new EncryptedStorage('my-secret-key')
storageInstance.useForage(encryptedStorage)
```

### 4. 内存存储

```javascript
// 实现内存存储引擎（用于临时数据或测试）
class MemoryStorage {
  constructor() {
    this.data = new Map()
  }

  async getItem(key) {
    return this.data.get(key) || null
  }

  async setItem(key, value) {
    this.data.set(key, value)
  }

  async removeItem(key) {
    this.data.delete(key)
  }

  // 额外方法：清空所有数据
  clear() {
    this.data.clear()
  }

  // 额外方法：获取所有键
  keys() {
    return Array.from(this.data.keys())
  }
}

// 使用内存存储
const memoryStorage = new MemoryStorage()
storageInstance.useForage(memoryStorage)
```

## 📦 基本使用

### 导入方式

```javascript 
import { storageInstance } from 'fat-design'
// 或
import { storageInstance } from 'fat-design/dist/others'
```

### 基础操作

```javascript
import React, { useEffect, useState } from 'react'
import { storageInstance, Button, Card } from 'fat-design'

function BasicStorageExample() {
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(false)

  // 保存用户配置
  const saveUserProfile = async () => {
    setLoading(true)
    try {
      const profile = {
        name: '张三',
        preferences: {
          theme: 'dark',
          language: 'zh-CN'
        },
        lastLogin: new Date().toISOString()
      }
      
      await storageInstance.setItem('userProfile', JSON.stringify(profile))
      setUserProfile(profile)
      console.log('用户配置保存成功')
    } catch (error) {
      console.error('保存失败:', error)
    } finally {
      setLoading(false)
    }
  }

  // 加载用户配置
  const loadUserProfile = async () => {
    setLoading(true)
    try {
      const profileStr = await storageInstance.getItem('userProfile')
      if (profileStr) {
        const profile = JSON.parse(profileStr)
        setUserProfile(profile)
        console.log('用户配置加载成功:', profile)
      }
    } catch (error) {
      console.error('加载失败:', error)
    } finally {
      setLoading(false)
    }
  }

  // 清除用户配置
  const clearUserProfile = async () => {
    setLoading(true)
    try {
      await storageInstance.removeItem('userProfile')
      setUserProfile(null)
      console.log('用户配置已清除')
    } catch (error) {
      console.error('清除失败:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUserProfile()
  }, [])

  return (
    <Card title="基础存储示例" style={{ maxWidth: 600 }}>
      <div style={{ marginBottom: 16 }}>
        <Button onClick={saveUserProfile} loading={loading} style={{ marginRight: 8 }}>
          保存配置
        </Button>
        <Button onClick={loadUserProfile} loading={loading} style={{ marginRight: 8 }}>
          加载配置
        </Button>
        <Button onClick={clearUserProfile} loading={loading}>
          清除配置
        </Button>
      </div>
      
      {userProfile && (
        <div style={{ background: '#f5f5f5', padding: 12, borderRadius: 4 }}>
          <pre>{JSON.stringify(userProfile, null, 2)}</pre>
        </div>
      )}
    </Card>
  )
}
```



## 🎯 实际应用场景

### 1. TablePro 列设置持久化

TablePro 组件使用 StorageInstance 来持久化用户的列设置：

```javascript
import React, { useRef } from 'react'
import { TablePro, storageInstance } from 'fat-design'

const { useTablePro } = TablePro

function TableWithColumnSettings() {
  const propsRef = useRef()

  // TablePro 内部使用 storageInstance 保存列设置
  propsRef.current = useTablePro({
    initTableProps: {
      columns: [
        { title: 'ID', dataIndex: 'id', width: '100px' },
        { title: '姓名', dataIndex: 'name', width: '120px' },
        { title: '邮箱', dataIndex: 'email', width: '200px' }
      ]
    },
    onQuery: async () => {
      // 模拟数据查询
      return { total: 100, dataSource: [] }
    }
  })

  return (
    <TablePro
      {...propsRef.current}
      settingName="UserManagementTable" // 设置存储键名
    />
  )
}
```

### 2. 表单草稿保存

```javascript
import React, { useEffect, useState } from 'react'
import { Form, storageInstance, Message } from 'fat-design'

const FormItem = Form.Item

function FormWithDraftSave() {
  const [formValues, setFormValues] = useState({})
  const DRAFT_KEY = 'form_draft_user_info'

  // 保存草稿
  const saveDraft = async (values) => {
    try {
      await storageInstance.setItem(DRAFT_KEY, JSON.stringify(values))
      Message.success('草稿已保存')
    } catch (error) {
      Message.error('草稿保存失败')
    }
  }

  // 加载草稿
  const loadDraft = async () => {
    try {
      const draftStr = await storageInstance.getItem(DRAFT_KEY)
      if (draftStr) {
        const draft = JSON.parse(draftStr)
        setFormValues(draft)
        Message.info('已恢复草稿')
      }
    } catch (error) {
      console.error('草稿加载失败:', error)
    }
  }

  // 清除草稿
  const clearDraft = async () => {
    try {
      await storageInstance.removeItem(DRAFT_KEY)
      Message.success('草稿已清除')
    } catch (error) {
      Message.error('草稿清除失败')
    }
  }

  const handleFormChange = (values) => {
    setFormValues(values)
    // 自动保存草稿（防抖）
    setTimeout(() => saveDraft(values), 1000)
  }

  const handleSubmit = async (values) => {
    // 提交成功后清除草稿
    try {
      // 模拟提交
      console.log('提交表单:', values)
      await clearDraft()
      Message.success('提交成功')
    } catch (error) {
      Message.error('提交失败')
    }
  }

  useEffect(() => {
    loadDraft()
  }, [])

  return (
    <Form
      defaultValues={formValues}
      onChange={handleFormChange}
      onSubmit={handleSubmit}
    >
      <FormItem
        label="姓名"
        name="name"
        component="Input"
        required
      />
      <FormItem
        label="邮箱"
        name="email"
        component="Input"
        required
      />
      <FormItem
        label="备注"
        name="note"
        component="Input.TextArea"
      />
      
      <FormItem
        label=" "
        component="FormButtonGroup"
        xProps={{
          buttons: [
            { component: 'FormSubmit', children: '提交' },
            { 
              component: 'Button', 
              children: '加载草稿', 
              onClick: loadDraft 
            },
            { 
              component: 'Button', 
              children: '清除草稿', 
              onClick: clearDraft 
            }
          ]
        }}
      />
    </Form>
  )
}
```

### 3. 用户偏好设置

```javascript
import React, { useState, useEffect } from 'react'
import { Card, Select, Switch, storageInstance } from 'fat-design'

const { Option } = Select

function UserPreferences() {
  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'zh-CN',
    notifications: true,
    autoSave: false
  })

  const PREFERENCES_KEY = 'user_preferences'

  // 保存偏好设置
  const savePreferences = async (newPrefs) => {
    try {
      await storageInstance.setItem(PREFERENCES_KEY, JSON.stringify(newPrefs))
      setPreferences(newPrefs)
      console.log('偏好设置已保存')
    } catch (error) {
      console.error('保存偏好设置失败:', error)
    }
  }

  // 加载偏好设置
  const loadPreferences = async () => {
    try {
      const prefsStr = await storageInstance.getItem(PREFERENCES_KEY)
      if (prefsStr) {
        const prefs = JSON.parse(prefsStr)
        setPreferences(prefs)
        // 应用主题
        document.body.className = `theme-${prefs.theme}`
      }
    } catch (error) {
      console.error('加载偏好设置失败:', error)
    }
  }

  // 更改设置
  const updatePreference = (key, value) => {
    const newPrefs = { ...preferences, [key]: value }
    savePreferences(newPrefs)
  }

  useEffect(() => {
    loadPreferences()
  }, [])

  return (
    <Card title="用户偏好设置" style={{ maxWidth: 400 }}>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 8 }}>主题</label>
        <Select
          value={preferences.theme}
          onChange={(value) => updatePreference('theme', value)}
          style={{ width: '100%' }}
        >
          <Option value="light">浅色主题</Option>
          <Option value="dark">深色主题</Option>
          <Option value="auto">跟随系统</Option>
        </Select>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 8 }}>语言</label>
        <Select
          value={preferences.language}
          onChange={(value) => updatePreference('language', value)}
          style={{ width: '100%' }}
        >
          <Option value="zh-CN">简体中文</Option>
          <Option value="en-US">English</Option>
          <Option value="ja-JP">日本語</Option>
        </Select>
      </div>

      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <label>通知提醒</label>
        <Switch
          checked={preferences.notifications}
          onChange={(checked) => updatePreference('notifications', checked)}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <label>自动保存</label>
        <Switch
          checked={preferences.autoSave}
          onChange={(checked) => updatePreference('autoSave', checked)}
        />
      </div>
    </Card>
  )
}
```

### 4. 购物车数据持久化

```javascript
import React, { useState, useEffect } from 'react'
import { Card, Table, Button, NumberPicker, storageInstance, Message } from 'fat-design'

function PersistentShoppingCart() {
  const [cartItems, setCartItems] = useState([])
  const CART_KEY = 'shopping_cart'

  // 保存购物车
  const saveCart = async (items) => {
    try {
      await storageInstance.setItem(CART_KEY, JSON.stringify(items))
      setCartItems(items)
    } catch (error) {
      Message.error('购物车保存失败')
    }
  }

  // 加载购物车
  const loadCart = async () => {
    try {
      const cartStr = await storageInstance.getItem(CART_KEY)
      if (cartStr) {
        const items = JSON.parse(cartStr)
        setCartItems(items)
        Message.success(`购物车已恢复，共 ${items.length} 件商品`)
      }
    } catch (error) {
      console.error('购物车加载失败:', error)
    }
  }

  // 添加商品
  const addItem = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id)
    let newItems
    
    if (existingItem) {
      newItems = cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    } else {
      newItems = [...cartItems, { ...product, quantity: 1 }]
    }
    
    saveCart(newItems)
    Message.success('商品已添加到购物车')
  }

  // 更新数量
  const updateQuantity = (id, quantity) => {
    const newItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    )
    saveCart(newItems)
  }

  // 移除商品
  const removeItem = (id) => {
    const newItems = cartItems.filter(item => item.id !== id)
    saveCart(newItems)
    Message.success('商品已移除')
  }

  // 清空购物车
  const clearCart = async () => {
    try {
      await storageInstance.removeItem(CART_KEY)
      setCartItems([])
      Message.success('购物车已清空')
    } catch (error) {
      Message.error('清空失败')
    }
  }

  const columns = [
    { title: '商品名称', dataIndex: 'name', width: '200px' },
    { title: '单价', dataIndex: 'price', width: '100px', cell: v => `¥${v}` },
    {
      title: '数量',
      width: '120px',
      cell: (_, __, record) => (
        <NumberPicker
          value={record.quantity}
          min={1}
          onChange={(val) => updateQuantity(record.id, val)}
        />
      )
    },
    {
      title: '小计',
      width: '100px',
      cell: (_, __, record) => `¥${record.price * record.quantity}`
    },
    {
      title: '操作',
      width: '80px',
      cell: (_, __, record) => (
        <Button size="small" onClick={() => removeItem(record.id)}>
          移除
        </Button>
      )
    }
  ]

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  useEffect(() => {
    loadCart()
  }, [])

  return (
    <div>
      <Card title="商品列表" style={{ marginBottom: 16 }}>
        <Button
          onClick={() => addItem({ id: Date.now(), name: '示例商品', price: 99 })}
          style={{ marginBottom: 16 }}
        >
          添加商品到购物车
        </Button>
      </Card>

      <Card 
        title="购物车" 
        extra={
          <Button onClick={clearCart} disabled={cartItems.length === 0}>
            清空购物车
          </Button>
        }
      >
        <Table
          dataSource={cartItems}
          columns={columns}
          pagination={false}
          emptyContent="购物车为空"
        />
        
        {cartItems.length > 0 && (
          <div style={{ textAlign: 'right', marginTop: 16, fontSize: 16 }}>
            <strong>总计：¥{total}</strong>
          </div>
        )}
      </Card>
    </div>
  )
}
```

## 🔍 高级用法

### 存储监听器

```javascript
// 自定义存储监听器
class StorageWatcher {
  constructor() {
    this.listeners = new Map()
  }

  // 监听存储变化
  watch(key, callback) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, [])
    }
    this.listeners.get(key).push(callback)
  }

  // 取消监听
  unwatch(key, callback) {
    if (this.listeners.has(key)) {
      const callbacks = this.listeners.get(key)
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  // 通知监听器
  async notify(key, newValue, oldValue) {
    if (this.listeners.has(key)) {
      const callbacks = this.listeners.get(key)
      callbacks.forEach(callback => callback(newValue, oldValue, key))
    }
  }

  // 包装 storageInstance 方法
  async setItem(key, value) {
    const oldValue = await storageInstance.getItem(key)
    await storageInstance.setItem(key, value)
    await this.notify(key, value, oldValue)
  }

  async getItem(key) {
    return await storageInstance.getItem(key)
  }

  async removeItem(key) {
    const oldValue = await storageInstance.getItem(key)
    await storageInstance.removeItem(key)
    await this.notify(key, null, oldValue)
  }
}

// 使用示例
const storageWatcher = new StorageWatcher()

// 监听用户设置变化
storageWatcher.watch('user_settings', (newValue, oldValue) => {
  console.log('用户设置已更改:', { newValue, oldValue })
  // 更新UI或执行其他操作
})
```

### 数据序列化工具

```javascript
// 智能序列化工具
class SmartStorage {
  constructor(storageInstance) {
    this.storage = storageInstance
  }

  // 智能保存（自动序列化）
  async set(key, value) {
    const serialized = this.serialize(value)
    await this.storage.setItem(key, serialized)
  }

  // 智能获取（自动反序列化）
  async get(key, defaultValue = null) {
    try {
      const serialized = await this.storage.getItem(key)
      if (serialized === null) return defaultValue
      return this.deserialize(serialized)
    } catch (error) {
      console.error(`获取 ${key} 失败:`, error)
      return defaultValue
    }
  }

  // 序列化数据
  serialize(value) {
    return JSON.stringify({
      type: typeof value,
      data: value,
      timestamp: Date.now()
    })
  }

  // 反序列化数据
  deserialize(serialized) {
    try {
      const parsed = JSON.parse(serialized)
      // 可以在这里添加版本检查、数据迁移等逻辑
      return parsed.data
    } catch (error) {
      // 如果不是 JSON 格式，直接返回原始字符串
      return serialized
    }
  }

  // 批量操作
  async setMultiple(items) {
    const promises = Object.entries(items).map(([key, value]) =>
      this.set(key, value)
    )
    await Promise.all(promises)
  }

  async getMultiple(keys) {
    const promises = keys.map(key => this.get(key))
    const values = await Promise.all(promises)
    return keys.reduce((result, key, index) => {
      result[key] = values[index]
      return result
    }, {})
  }
}

// 使用示例
const smartStorage = new SmartStorage(storageInstance)

// 保存各种类型的数据
await smartStorage.set('user', { name: '张三', age: 25 })
await smartStorage.set('settings', { theme: 'dark', lang: 'zh' })
await smartStorage.set('count', 42)
await smartStorage.set('isActive', true)

// 获取数据（自动恢复原始类型）
const user = await smartStorage.get('user')
const settings = await smartStorage.get('settings')
const count = await smartStorage.get('count')
const isActive = await smartStorage.get('isActive')
```

## 📚 API 参考

### StorageInstance 类

| 方法 | 类型 | 说明 |
|------|------|------|
| `getItem(key)` | `Promise<string \| null>` | 获取存储的值 |
| `setItem(key, value)` | `Promise<any>` | 设置存储的值 |
| `removeItem(key)` | `Promise<any>` | 删除存储的值 |
| `useForage(forageInstance)` | `void` | 注入自定义存储引擎 |
| `getInstance()` | `any` | 获取当前使用的存储实例 |

### 工作流程

1. **初始化检查**：
   - 检查是否通过 `useForage` 配置了自定义存储引擎
   - 如果有，优先使用自定义引擎

2. **LocalForage 检测**：
   - 检查 `window.localforage` 是否存在
   - 如果存在，自动创建实例（命名空间："fat-design"）

3. **默认降级**：
   - 如果没有自定义引擎且 LocalForage 不可用
   - 使用浏览器原生 localStorage

4. **一致性保证**：
   - 所有操作都通过统一的异步接口进行
   - 不管底层使用什么存储引擎，使用方式保持一致

## ⚠️ 注意事项

### 1. 异步操作
所有存储操作都是异步的，必须使用 `await` 或 `.then()`：

```javascript
// ✅ 正确
const value = await storageInstance.getItem('key')

// ❌ 错误
const value = storageInstance.getItem('key') // 这是一个 Promise
```

### 2. 数据序列化
存储的值必须是字符串，复杂对象需要序列化：

```javascript
// ✅ 正确
await storageInstance.setItem('user', JSON.stringify(userObj))
const user = JSON.parse(await storageInstance.getItem('user'))

// ❌ 错误
await storageInstance.setItem('user', userObj) // 对象会被转换为 [object Object]
```

### 3. 错误处理
存储操作可能失败，应该适当处理错误：

```javascript
try {
  await storageInstance.setItem('key', 'value')
} catch (error) {
  console.error('存储失败:', error)
  // 提供降级方案或用户提示
}
```

### 4. 存储限制
- **localStorage**: 通常 5-10MB 限制
- **IndexedDB**: 更大的存储空间，但受浏览器限制
- **私有模式**: 某些浏览器的私有模式下存储可能受限

### 5. 性能考虑
- 避免频繁的大数据量存储操作
- 考虑使用节流/防抖来优化存储频率
- 大型数据建议分批存储

## 🔗 相关资源

- [LocalForage 官方文档](https://localforage.github.io/localForage/)
- [Web Storage API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API)
- [IndexedDB API](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)

StorageInstance 为 Fat Design 应用提供了灵活、可扩展的客户端存储解决方案。通过插件化设计，它默认使用 localStorage，同时支持注入任意符合接口要求的存储引擎，包括 LocalForage、远程 API、加密存储等，特别适合需要持久化用户数据的后台管理系统场景。