# Form 表单组件使用文档

## 概述
Form 组件提供强大的表单功能，支持多种布局、验证、联动、Schema 配置等特性，是构建复杂表单的核心组件。

## 基础用法

### 简单表单
```jsx
import { Form, Button, Message } from "fat-design";

const FormItem = Form.Item;

function BasicForm() {
  const initialValues = {
    username: 'admin',
    email: 'admin@example.com'
  };

  const onSubmit = (values, { formActions }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        Message.success('提交成功');
        console.log('表单值:', values);
        resolve();
      }, 2000);
    });
  };

  return (
    <Form 
      defaultValues={initialValues}
      labelAlign="left"
      onSubmit={onSubmit}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 10 }}
    >
      <FormItem 
        label="用户名"
        name="username"
        component="Input"
        required
        maxLength={20}
        xProps={{ hasClear: true }}
      />
      
      <FormItem 
        label="邮箱"
        name="email"
        component="Input"
        required
        pattern="email"
        xProps={{ hasClear: true }}
      />

      <FormItem 
        label="描述"
        name="description"
        component="Input.TextArea"
        maxLength={200}
        xProps={{ 
          hasClear: true,
          showLimitHint: true 
        }}
      />

      <FormItem 
        label=" "
        component="FormButtonGroup"
        xProps={{
          buttons: [
            { component: 'FormSubmit', text: '提交' },
            { component: 'FormReset', text: '重置', toDefault: true }
          ]
        }}
      />
    </Form>
  );
}
```

### Schema 模式
```jsx
const schema = {
  type: 'object',
  properties: {
    username: {
      label: '用户名',
      component: 'Input',
      required: true,
      maxLength: 20,
      xProps: { hasClear: true }
    },
    password: {
      label: '密码',
      component: 'InputPassword',
      required: true,
      minLength: 6,
      xProps: { hasClear: false }
    },
    role: {
      label: '角色',
      component: 'Select',
      required: true,
      enums: [
        {label: '管理员', value: 'admin'},
        {label: '普通用户', value: 'user'}
      ],
      xProps: { hasClear: true }
    },
    birthday: {
      label: '生日',
      component: 'DatePicker',
      xProps: {
        format: 'YYYY-MM-DD'
      }
    }
  }
};

function SchemaForm() {
  const handleSubmit = (values) => {
    console.log('提交数据:', values);
    return Promise.resolve();
  };

  return (
    <Form 
      schema={schema} 
      onSubmit={handleSubmit}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
    />
  );
}
```

## 高级功能

### 表单联动
```jsx
function DynamicForm() {
  const onChange = (values, { formActions }) => {
    // 根据用户类型显示不同字段
    if (values.userType === 'admin') {
      formActions.setState('adminLevel', { display: true });
      formActions.setState('department', { display: false });
    } else {
      formActions.setState('adminLevel', { display: false });
      formActions.setState('department', { display: true });
    }
  };

  const onCreated = (values, { formActions }) => {
    // 表单创建后设置动态数据源
    setTimeout(() => {
      formActions.setState('department', {
        xProps: {
          dataSource: [
            {value: 'tech', label: '技术部'},
            {value: 'sales', label: '销售部'}
          ]
        }
      });
    }, 1000);
  };

  return (
    <Form onChange={onChange} onCreated={onCreated}>
      <FormItem 
        name="userType" 
        label="用户类型"
        component="Select"
        enums={[
          {label: '管理员', value: 'admin'},
          {label: '普通用户', value: 'user'}
        ]}
      />
      
      <FormItem 
        name="adminLevel" 
        label="管理员级别"
        component="Select"
        display={(values) => values.userType === 'admin'}
        enums={[
          {label: '超级管理员', value: 'super'},
          {label: '普通管理员', value: 'normal'}
        ]}
      />
      
      <FormItem 
        name="department" 
        label="部门"
        component="Select"
        display={(values) => values.userType === 'user'}
      />
    </Form>
  );
}
```

### 异步枚举数据
```jsx
function AsyncEnumForm() {
  const fetchCities = async (childProps, params) => {
    const { values } = params;
    if (!values.province) return [];
    
    // 模拟异步请求
    return new Promise((resolve) => {
      setTimeout(() => {
        const cityMap = {
          'beijing': [
            {label: '朝阳区', value: 'chaoyang'},
            {label: '海淀区', value: 'haidian'}
          ],
          'shanghai': [
            {label: '浦东新区', value: 'pudong'},
            {label: '黄浦区', value: 'huangpu'}
          ]
        };
        resolve(cityMap[values.province] || []);
      }, 500);
    });
  };

  return (
    <Form>
      <FormItem 
        name="province" 
        label="省份"
        component="Select"
        enums={[
          {label: '北京', value: 'beijing'},
          {label: '上海', value: 'shanghai'}
        ]}
        onChange={(value, { formActions }) => {
          // 省份变化时清空城市
          formActions.setValue('city', '');
        }}
      />
      
      <FormItem 
        name="city" 
        label="城市"
        component="Select"
        deps={['province']}
        enums={fetchCities}
        xProps={{ hasClear: true }}
      />
    </Form>
  );
}
```

### 复杂组件集成
```jsx
function ComplexForm() {
  const datePreset = {
    '今天': () => dayjs(),
    '昨天': () => dayjs().subtract(1, 'day'),
    '一周前': () => dayjs().subtract(7, 'day')
  };

  return (
    <Form>
      {/* 单选组 */}
      <FormItem 
        label="性别"
        name="gender"
        component="RadioGroup"
        enums={[
          {label: '男', value: 'male'},
          {label: '女', value: 'female'}
        ]}
      />

      {/* 多选组 */}
      <FormItem 
        label="兴趣爱好"
        name="hobbies"
        component="CheckboxGroup"
        enums={[
          {label: '读书', value: 'reading'},
          {label: '运动', value: 'sports'},
          {label: '音乐', value: 'music'}
        ]}
      />

      {/* 级联选择器 */}
      <FormItem 
        label="地区"
        name="region"
        component="CascaderSelect"
        enums={() => {
          return fetch("/api/regions").then(res => res.json());
        }}
      />

      {/* 开关 */}
      <FormItem 
        label="启用状态"
        name="enabled"
        component="Switch"
      />

      {/* 日期范围 */}
      <FormItem 
        label="日期范围"
        name="dateRange"
        component="DatePickerRangePicker"
      />

      {/* 带预设的日期时间 */}
      <FormItem 
        label="创建时间"
        name="createTime"
        component="DatePicker"
        xProps={{
          showTime: true,
          preset: datePreset
        }}
      />

      {/* 时间选择器 */}
      <FormItem 
        label="时间"
        name="time"
        component="TimePicker"
      />

      {/* 文件上传 */}
      <FormItem 
        label="头像"
        name="avatar"
        component="Upload"
        xProps={{
          action: "/api/upload",
          shape: "card",
          listType: "image"
        }}
      />

      {/* 批量输入 */}
      <FormItem 
        label="标签"
        name="tags"
        component="BatchInput"
      />
    </Form>
  );
}
```

### 自定义渲染
```jsx
function CustomRenderForm() {
  return (
    <Form>
      {/* 自定义渲染 */}
      <FormItem 
        label="自定义输入"
        name="custom"
        render={(value, childProps) => {
          return (
            <div>
              <Input {...childProps} />
              <Button size="small">自定义按钮</Button>
            </div>
          );
        }}
      />

      {/* 预览模式自定义渲染 */}
      <FormItem 
        label="状态"
        name="status"
        component="Select"
        enums={[
          {label: '启用', value: '1'},
          {label: '禁用', value: '0'}
        ]}
        renderPreview={(value) => {
          return (
            <span style={{
              color: value === '1' ? 'green' : 'red'
            }}>
              {value === '1' ? '启用' : '禁用'}
            </span>
          );
        }}
      />
    </Form>
  );
}
```

### 表单验证
```jsx
function ValidationForm() {
  const customValidator = (rule, value) => {
    if (!value) {
      return Promise.resolve();
    }
    if (value.length < 6) {
      return Promise.reject('密码至少6位');
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      return Promise.reject('密码必须包含大小写字母和数字');
    }
    return Promise.resolve();
  };

  return (
    <Form autoValidate={true}>
      <FormItem 
        name="email"
        label="邮箱"
        component="Input"
        required
        rules={[
          {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: '请输入有效的邮箱地址'
          }
        ]}
      />

      <FormItem 
        name="password"
        label="密码"
        component="InputPassword"
        required
        validator={customValidator}
      />

      <FormItem 
        name="confirmPassword"
        label="确认密码"
        component="InputPassword"
        required
        validator={(rule, value, formValues) => {
          if (value !== formValues.password) {
            return Promise.reject('两次密码输入不一致');
          }
          return Promise.resolve();
        }}
      />

      <FormItem 
        name="age"
        label="年龄"
        component="NumberPicker"
        min={18}
        max={100}
        required
      />
    </Form>
  );
}
```

## API

### Form Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| schema | object | - | 表单 Schema 配置 |
| defaultValues | object | - | 默认值 |
| labelAlign | `'top' \| 'left' \| 'inset'` | 'left' | 标签对齐方式 |
| labelTextAlign | `'left' \| 'right'` | 'left' | 标签文本对齐 |
| labelCol | object | - | 标签栅格配置 |
| wrapperCol | object | - | 控件栅格配置 |
| size | `'small' \| 'medium' \| 'large'` | 'medium' | 表单尺寸 |
| fullWidth | boolean | false | 组件宽度是否100% |
| inline | boolean | false | 是否内联表单 |
| colon | boolean | true | 是否显示冒号 |
| disabled | boolean \| function | false | 是否禁用 |
| isPreview | boolean \| function | false | 是否预览模式 |
| autoValidate | boolean | true | 自动校验 |
| autoValidateOnCreated | boolean | false | 创建后自动校验 |
| submitter | boolean | false | 是否显示默认提交按钮 |
| onSubmit | function | - | 提交回调 |
| onChange | function | - | 变化回调 |
| onCreated | function | - | 创建完成回调 |
| onReset | function | - | 重置回调 |

### FormItem Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| name | string | - | 字段名（必填） |
| label | ReactNode | - | 标签文本 |
| component | string \| Component | - | 组件类型 |
| required | boolean \| function | false | 是否必填 |
| display | boolean \| function | true | 是否显示 |
| disabled | boolean \| function | false | 是否禁用 |
| isPreview | boolean \| function | false | 是否预览模式 |
| xProps | object \| function | - | 传递给组件的 props |
| enums | array \| function | - | 选项数据 |
| deps | string[] | - | 依赖字段 |
| validator | function | - | 自定义校验函数 |
| rules | array | - | 校验规则数组 |
| min | number | - | 最小值 |
| max | number | - | 最大值 |
| minLength | number | - | 最小长度 |
| maxLength | number | - | 最大长度 |
| pattern | string \| RegExp | - | 正则校验 |
| onChange | function | - | 变化回调 |
| render | function | - | 自定义渲染 |
| renderPreview | function | - | 预览模式渲染 |

### 回调函数参数

#### onChange / onSubmit 回调参数
```jsx
(values, {
  formActions,    // 表单操作方法
  formStore,      // 表单状态存储
  stateMap,       // 字段状态映射
  defaultValues,  // 默认值
  valuesOfOnSearch // 搜索值
}) => {
  // 处理逻辑
}
```

#### formActions 方法
- `setValue(name, value)` - 设置字段值
- `getValue(name)` - 获取字段值
- `setState(name, state)` - 设置字段状态
- `getState(name)` - 获取字段状态
- `validate(names?)` - 校验表单
- `reset(names?)` - 重置表单
- `submit()` - 提交表单

## 完整示例

```jsx
import React, { useState } from 'react';
import { Form, PageCard, Message } from 'fat-design';
import dayjs from 'dayjs';

const FormItem = Form.Item;

function CompleteFormDemo() {
  const [formRef, setFormRef] = useState(null);

  const initialValues = {
    userType: 'user',
    gender: 'male',
    hobbies: ['reading'],
    enabled: true
  };

  const onSubmit = (values, { formActions }) => {
    console.log('提交数据:', values);
    return new Promise((resolve) => {
      setTimeout(() => {
        Message.success('保存成功');
        resolve();
      }, 2000);
    });
  };

  const onCreated = (values, { formActions }) => {
    setFormRef({ formActions });
  };

  const onChange = (values, { formActions }) => {
    // 动态显示管理员级别
    if (values.userType === 'admin') {
      formActions.setState('adminLevel', { display: true });
    } else {
      formActions.setState('adminLevel', { display: false });
      formActions.setValue('adminLevel', '');
    }
  };

  const handleReset = () => {
    if (formRef) {
      formRef.formActions.reset();
    }
  };

  return (
    <PageCard title="完整表单示例">
      <Form
        defaultValues={initialValues}
        labelAlign="left"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        onSubmit={onSubmit}
        onCreated={onCreated}
        onChange={onChange}
        autoValidate={true}
      >
        <FormItem
          label="用户类型"
          name="userType"
          component="RadioGroup"
          required
          enums={[
            {label: '普通用户', value: 'user'},
            {label: '管理员', value: 'admin'}
          ]}
        />

        <FormItem
          label="管理员级别"
          name="adminLevel"
          component="Select"
          display={false}
          enums={[
            {label: '超级管理员', value: 'super'},
            {label: '普通管理员', value: 'normal'}
          ]}
        />

        <FormItem
          label="用户名"
          name="username"
          component="Input"
          required
          maxLength={20}
          xProps={{ hasClear: true }}
        />

        <FormItem
          label="邮箱"
          name="email"
          component="Input"
          required
          rules={[
            {
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '请输入有效的邮箱地址'
            }
          ]}
          xProps={{ hasClear: true }}
        />

        <FormItem
          label="性别"
          name="gender"
          component="RadioGroup"
          enums={[
            {label: '男', value: 'male'},
            {label: '女', value: 'female'}
          ]}
        />

        <FormItem
          label="兴趣爱好"
          name="hobbies"
          component="CheckboxGroup"
          enums={[
            {label: '读书', value: 'reading'},
            {label: '运动', value: 'sports'},
            {label: '音乐', value: 'music'},
            {label: '旅游', value: 'travel'}
          ]}
        />

        <FormItem
          label="生日"
          name="birthday"
          component="DatePicker"
          xProps={{
            format: 'YYYY-MM-DD'
          }}
        />

        <FormItem
          label="启用状态"
          name="enabled"
          component="Switch"
        />

        <FormItem
          label="备注"
          name="remark"
          component="Input.TextArea"
          maxLength={500}
          xProps={{
            showLimitHint: true,
            autoHeight: { minRows: 3, maxRows: 6 }
          }}
        />

        <FormItem
          label=" "
          component="FormButtonGroup"
          xProps={{
            buttons: [
              {
                component: 'FormSubmit',
                text: '保存',
                type: 'primary',
                showToast: true
              },
              {
                component: 'Button',
                text: '重置',
                onClick: handleReset
              }
            ]
          }}
        />
      </Form>
    </PageCard>
  );
}

export default CompleteFormDemo;
```

## 注意事项

1. **性能优化**：使用 `deps` 属性控制字段重新渲染时机
2. **异步校验**：validator 函数支持返回 Promise
3. **状态管理**：通过 formActions 统一管理表单状态
4. **组件扩展**：可以通过 components 属性注册自定义组件
5. **国际化**：支持通过 locale 属性配置多语言