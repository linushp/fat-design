import React from 'react'
import { Form, Input, PageCard, Message } from '../src/index';

const FormItem = Form.Item as any;

/**
 * Demo: Form Validation
 * 
 * This demo showcases various validation patterns:
 * - Built-in required validation
 * - Custom async validator with error message
 * - Custom validator returning JSX error
 * - Pattern validation
 * - maxLength/minLength validation
 */

export function DemoFormValidation() {

    const onSubmit = (values: any) => {
        Message.success('表单验证通过，提交成功！');
        console.log('Form values:', values);
    };

    return (
        <PageCard title="表单验证示例">
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <Form
                    labelAlign="left"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    onSubmit={onSubmit}
                    autoValidateOnCreated={false}
                >
                    {/* Basic required validation */}
                    <FormItem
                        label="必填字段"
                        name="requiredField"
                        component="Input"
                        required
                        xProps={{ placeholder: '这是必填项' }}
                    />

                    {/* Pattern validation - email */}
                    <FormItem
                        label="邮箱地址"
                        name="email"
                        component="Input"
                        required
                        pattern="^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$"
                        patternMessage="请输入有效的邮箱地址"
                        xProps={{ placeholder: 'example@domain.com' }}
                    />

                    {/* Length validation */}
                    <FormItem
                        label="用户名"
                        name="username"
                        component="Input"
                        required
                        minLength={3}
                        maxLength={20}
                        xProps={{ placeholder: '3-20个字符', hasClear: true }}
                    />

                    {/* Custom async validator */}
                    <FormItem
                        label="唯一标识"
                        name="uniqueId"
                        component="Input"
                        required
                        validator={async (value: string) => {
                            if (!value) {
                                return Promise.reject('请输入唯一标识');
                            }
                            // Simulate async check
                            await new Promise(resolve => setTimeout(resolve, 500));
                            if (value === 'admin' || value === 'root') {
                                return Promise.reject('该标识已被占用，请更换');
                            }
                            return Promise.resolve();
                        }}
                        xProps={{ placeholder: '不能为 admin 或 root' }}
                    />

                    {/* Custom validator with JSX error message */}
                    <FormItem
                        label="自定义验证"
                        name="customCheck"
                        component="Input"
                        validator={(value: string) => {
                            if (value === 'pass') {
                                return Promise.resolve();
                            }
                            // Return JSX as error message
                            return Promise.reject(
                                <span style={{ color: '#ff4d4f' }}>
                                    验证失败！请输入 <strong>"pass"</strong> 通过验证
                                </span>
                            );
                        }}
                        xProps={{ placeholder: '输入 "pass" 通过验证' }}
                    />

                    {/* Number range validation */}
                    <FormItem
                        label="年龄"
                        name="age"
                        component="NumberPicker"
                        required
                        min={18}
                        max={120}
                        xProps={{ placeholder: '18-120' }}
                    />

                    {/* Phone number pattern */}
                    <FormItem
                        label="手机号码"
                        name="phone"
                        component="Input"
                        required
                        pattern="^1[3-9]\d{9}$"
                        patternMessage="请输入有效的11位手机号码"
                        xProps={{ placeholder: '1xxxxxxxxxx' }}
                    />

                    <FormItem
                        label=" "
                        component="FormButtonGroup"
                        xProps={{
                            buttons: [
                                {
                                    component: 'FormSubmit',
                                    text: '提交验证',
                                    type: 'primary'
                                },
                                {
                                    component: 'FormReset',
                                    text: '重置表单'
                                }
                            ]
                        }}
                    />
                </Form>
            </div>
        </PageCard>
    );
}
