import React, { useRef } from 'react'
import { Form, Input, PageCard, Message, Button } from '../src/index';

const FormItem = Form.Item as any;

/**
 * Demo: Form Buttons
 * 
 * This demo showcases various button configurations:
 * - FormSubmit with different props
 * - FormReset with toDefault option
 * - FormButtonGroup with custom buttons
 * - Manual form control buttons
 */

export function DemoFormButtons() {
    const formActionsRef = useRef<any>(null);

    const onSubmit = (values: any) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                Message.success('提交成功！');
                resolve(undefined);
            }, 1000);
        });
    };

    const onCreated = (values: any, { formActions }: any) => {
        formActionsRef.current = formActions;
    };

    const handleManualValidate = async () => {
        const errors = await formActionsRef.current.validate();
        if (errors.length === 0) {
            Message.success('验证通过！');
        } else {
            Message.error(`验证失败: ${errors.length} 个错误`);
        }
    };

    const handleGetValues = () => {
        const values = formActionsRef.current.getValues();
        Message.success('值已输出到控制台');
        console.log('Current form values:', values);
    };

    return (
        <PageCard title="表单按钮配置示例">
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                <Form
                    defaultValues={{
                        name: '示例名称',
                        description: '示例描述',
                        email: 'user@example.com'
                    }}
                    labelAlign="left"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    onSubmit={onSubmit}
                    onCreated={onCreated}
                >
                    <FormItem
                        label="名称"
                        name="name"
                        component="Input"
                        required
                        xProps={{ hasClear: true }}
                    />

                    <FormItem
                        label="邮箱"
                        name="email"
                        component="Input"
                        required
                        xProps={{ hasClear: true }}
                    />

                    <FormItem
                        label="描述"
                        name="description"
                        component="Input.TextArea"
                        xProps={{ rows: 3, showLimitHint: true, maxLength: 100 }}
                    />

                    {/* Section 1: Basic FormButtonGroup */}
                    <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                        <h4 style={{ margin: '0 0 16px' }}>1. 基础按钮组</h4>
                        <FormItem
                            label=" "
                            component="FormButtonGroup"
                            xProps={{
                                buttons: [
                                    {
                                        component: 'FormSubmit',
                                        text: '提交表单',
                                        type: 'primary',
                                        showToast: true,
                                        xProps: {
                                            iconType: 'success'
                                        }
                                    },
                                    {
                                        component: 'FormReset',
                                        text: '重置',
                                        toDefault: false
                                    }
                                ]
                            }}
                        />
                    </div>

                    {/* Section 2: Reset to Default */}
                    <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                        <h4 style={{ margin: '0 0 16px' }}>2. 重置到默认值</h4>
                        <FormItem
                            label=" "
                            component="FormButtonGroup"
                            xProps={{
                                buttons: [
                                    {
                                        component: 'FormReset',
                                        text: '清空表单 (toDefault: false)',
                                        toDefault: false
                                    },
                                    {
                                        component: 'FormReset',
                                        text: '恢复默认值 (toDefault: true)',
                                        toDefault: true,
                                        xProps: {
                                            type: 'secondary'
                                        }
                                    }
                                ]
                            }}
                        />
                    </div>

                    {/* Section 3: Custom styled buttons */}
                    <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                        <h4 style={{ margin: '0 0 16px' }}>3. 自定义样式按钮</h4>
                        <FormItem
                            label=" "
                            component="FormButtonGroup"
                            xProps={{
                                buttons: [
                                    {
                                        component: 'FormSubmit',
                                        text: '主要操作',
                                        type: 'primary',
                                        xProps: {
                                            size: 'large'
                                        }
                                    },
                                    {
                                        component: 'FormSubmit',
                                        text: '次要操作',
                                        type: 'secondary',
                                        xProps: {
                                            size: 'medium'
                                        }
                                    },
                                    {
                                        component: 'FormReset',
                                        text: '普通操作',
                                        xProps: {
                                            type: 'normal',
                                            size: 'small'
                                        }
                                    }
                                ]
                            }}
                        />
                    </div>

                    {/* Section 4: Manual control buttons */}
                    <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                        <h4 style={{ margin: '0 0 16px' }}>4. 手动控制按钮</h4>
                        <FormItem label=" " wrapperCol={{ span: 16 }}>
                            <Button
                                type="primary"
                                onClick={handleManualValidate}
                                style={{ marginRight: '8px', marginBottom: '8px' }}
                            >
                                手动验证
                            </Button>
                            <Button
                                onClick={handleGetValues}
                                style={{ marginRight: '8px', marginBottom: '8px' }}
                            >
                                获取值
                            </Button>
                            <Button
                                warning
                                onClick={() => {
                                    formActionsRef.current.reset();
                                    Message.success('表单已清空');
                                }}
                                style={{ marginRight: '8px', marginBottom: '8px' }}
                            >
                                手动清空
                            </Button>
                            <Button
                                onClick={() => {
                                    formActionsRef.current.resetToDefault();
                                    Message.success('已恢复默认值');
                                }}
                                style={{ marginBottom: '8px' }}
                            >
                                恢复默认
                            </Button>
                        </FormItem>
                    </div>
                </Form>
            </div>
        </PageCard>
    );
}
