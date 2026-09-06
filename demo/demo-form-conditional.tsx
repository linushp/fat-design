import React from 'react'
import { Form, Input, Select, PageCard, Message } from '../src/index';

const FormItem = Form.Item as any;

/**
 * Demo: Conditional Fields
 * 
 * This demo showcases conditional field behaviors:
 * - Conditional display (show/hide fields)
 * - Conditional disable (enable/disable fields)
 * - Conditional read-only (preview mode)
 * - Field linkage based on other field values
 */

export function DemoFormConditional() {

    const onSubmit = (values: any) => {
        Message.success('提交成功！');
        console.log('Form values:', values);
    };

    return (
        <PageCard title="表单条件渲染示例">
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <Form
                    defaultValues={{
                        triggerField: '',
                        conditionalField: '',
                        disableField: '',
                        previewMode: 'edit'
                    }}
                    labelAlign="left"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    onSubmit={onSubmit}
                >
                    {/* Field that triggers conditional display */}
                    <FormItem
                        label="触发字段"
                        name="triggerField"
                        component="Input"
                        description="输入 'show' 显示下方字段，输入 'hide' 隐藏"
                        xProps={{ placeholder: '输入 show 或 hide' }}
                    />

                    {/* Conditionally displayed field */}
                    <FormItem
                        label="条件显示字段"
                        name="conditionalField"
                        component="Input"
                        description="仅当触发字段为 'show' 时显示"
                        display={(values: any) => values.triggerField === 'show'}
                        xProps={{ placeholder: '我是条件显示的字段' }}
                    />

                    {/* Field that controls disable state */}
                    <FormItem
                        label="控制禁用"
                        name="disableTrigger"
                        component="Select"
                        enums={[
                            { label: '启用下方字段', value: 'enable' },
                            { label: '禁用下方字段', value: 'disable' }
                        ]}
                    />

                    {/* Conditionally disabled field */}
                    <FormItem
                        label="条件禁用字段"
                        name="disableField"
                        component="Input"
                        description="根据上方选择启用或禁用"
                        disabled={(values: any) => values.disableTrigger === 'disable'}
                        xProps={{ placeholder: '我可以被禁用' }}
                    />

                    {/* Preview mode toggle */}
                    <FormItem
                        label="预览模式"
                        name="previewMode"
                        component="Select"
                        enums={[
                            { label: '编辑模式', value: 'edit' },
                            { label: '预览模式', value: 'preview' }
                        ]}
                    />

                    {/* Fields with conditional preview mode */}
                    <FormItem
                        label="只读字段1"
                        name="previewField1"
                        component="Input"
                        defaultValue="我是预览值1"
                        isPreview={(values: any) => values.previewMode === 'preview'}
                    />

                    <FormItem
                        label="只读字段2"
                        name="previewField2"
                        component="Input"
                        defaultValue="我是预览值2"
                        isPreview={(values: any) => values.previewMode === 'preview'}
                    />

                    <FormItem
                        label="选择器"
                        name="previewSelect"
                        component="Select"
                        defaultValue="option1"
                        enums={[
                            { label: '选项1', value: 'option1' },
                            { label: '选项2', value: 'option2' }
                        ]}
                        isPreview={(values: any) => values.previewMode === 'preview'}
                    />

                    {/* Complex condition: show only when multiple conditions met */}
                    <FormItem
                        label="复杂条件字段"
                        name="complexField"
                        component="Input"
                        description="仅当触发字段为'show'且预览模式为'edit'时显示"
                        display={(values: any) => {
                            return values.triggerField === 'show' && values.previewMode === 'edit';
                        }}
                        xProps={{ placeholder: '满足复合条件才显示' }}
                    />

                    <FormItem
                        label=" "
                        component="FormButtonGroup"
                        xProps={{
                            buttons: [
                                {
                                    component: 'FormSubmit',
                                    text: '提交',
                                    type: 'primary'
                                },
                                {
                                    component: 'FormReset',
                                    text: '重置'
                                }
                            ]
                        }}
                    />
                </Form>
            </div>
        </PageCard>
    );
}
