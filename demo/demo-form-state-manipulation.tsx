import React from 'react'
import { Form, Input, PageCard, Message, Box } from '../src/index';

const FormItem = Form.Item as any;

/**
 * Demo: Form State Manipulation
 * 
 * This demo showcases programmatic form control:
 * - setValue: Setting field values programmatically
 * - setState: Changing field state (display, disabled, isPreview)
 * - Cascading field updates based on changes
 * - Conditional field states
 */

export function DemoFormStateManipulation() {

    const onChange = (values: any, { formActions }: any) => {
        console.log('Form changed:', values);

        // When name1 is 'z', perform cascading updates
        if (values.name1 === 'z') {
            // Set other field values
            formActions.setValue('name2', '由 z 联动设置');
            formActions.setValue('name3', 'zzzzz');

            // Hide name4 field
            formActions.setState('name4', { display: false });

            // Enable name5 field
            formActions.setState('name5', { disabled: false });

            // Make name6 read-only
            formActions.setState('name6', { isPreview: true });

            // Update name7's options (xProps dataSource)
            formActions.setState('name7', {
                xProps: {
                    dataSource: [
                        { value: 'z1', label: 'Z 选项 1' },
                        { value: 'z2', label: 'Z 选项 2' },
                    ]
                }
            });
            formActions.forceUpdate('name7');

            Message.notice('检测到输入 "z"，已联动更新其他字段');
        } else if (values.name1 && values.name1 !== 'z') {
            // Reset to normal state when name1 is not 'z'
            formActions.setValue('name2', '');
            formActions.setValue('name3', '');

            // Show name4
            formActions.setState('name4', { display: true });

            // Disable name5
            formActions.setState('name5', { disabled: true });

            // Make name6 editable
            formActions.setState('name6', { isPreview: false });

            // Reset name7's options
            formActions.setState('name7', {
                xProps: {
                    dataSource: [
                        { value: 'a', label: '选项 A' },
                        { value: 'b', label: '选项 B' },
                    ]
                }
            });
            formActions.forceUpdate('name7');
        }
    };

    const onSubmit = (values: any) => {
        Message.success('提交成功！');
        console.log('Submitted values:', values);
    };

    return (
        <PageCard title="表单状态联动操作">
            <Box direction="row" spacing={20}>
                {/* Left: The Form */}
                <div style={{ flex: 1, maxWidth: '500px' }}>
                    <Form
                        defaultValues={{
                            name1: '',
                            name2: '',
                            name3: '',
                            name4: '显示/隐藏',
                            name5: '启用/禁用',
                            name6: '编辑/只读',
                            name7: 'a'
                        }}
                        labelAlign="top"
                        onSubmit={onSubmit}
                        onChange={onChange}
                    >
                        <div style={{
                            padding: '12px',
                            backgroundColor: '#e6f7ff',
                            border: '1px solid #91d5ff',
                            borderRadius: '4px',
                            marginBottom: '16px'
                        }}>
                            <strong>提示：</strong>在"控制字段"中输入 <code>z</code> 触发联动效果
                        </div>

                        <FormItem
                            label="控制字段 (输入 'z' 触发)"
                            name="name1"
                            component="Input"
                            description="输入 'z' 查看其他字段的变化"
                            xProps={{ placeholder: '试试输入 z' }}
                        />

                        <FormItem
                            label="联动设置值字段1"
                            name="name2"
                            component="Input"
                            description="当控制字段为 'z' 时会被设置值"
                            xProps={{ placeholder: '等待联动...' }}
                        />

                        <FormItem
                            label="联动设置值字段2"
                            name="name3"
                            component="Input"
                            xProps={{ placeholder: '等待联动...' }}
                        />

                        <FormItem
                            label="显示/隐藏字段"
                            name="name4"
                            component="Input"
                            defaultValue="我可以被隐藏"
                        />

                        <FormItem
                            label="启用/禁用字段"
                            name="name5"
                            component="Input"
                            defaultValue="我可以被禁用"
                            disabled={true}
                        />

                        <FormItem
                            label="编辑/只读字段"
                            name="name6"
                            component="Input"
                            defaultValue="我可以变成只读"
                        />

                        <FormItem
                            label="动态选项字段"
                            name="name7"
                            component="Select"
                            description="选项会根据控制字段变化"
                            enums={[
                                { value: 'a', label: '选项 A' },
                                { value: 'b', label: '选项 B' },
                            ]}
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

                {/* Right: Effect Description */}
                <div style={{ flex: 1, maxWidth: '400px' }}>
                    <div style={{
                        padding: '20px',
                        backgroundColor: '#f6ffed',
                        border: '1px solid #b7eb8f',
                        borderRadius: '4px'
                    }}>
                        <h4 style={{ margin: '0 0 16px', color: '#52c41a' }}>联动效果说明</h4>

                        <div style={{ marginBottom: '16px' }}>
                            <h5 style={{ margin: '0 0 8px' }}>当控制字段输入 "z" 时：</h5>
                            <ul style={{ margin: 0, paddingLeft: '20px', color: '#666' }}>
                                <li>name2, name3 会被自动设置值</li>
                                <li>name4 会被隐藏 (display: false)</li>
                                <li>name5 会被启用 (disabled: false)</li>
                                <li>name6 会变成只读 (isPreview: true)</li>
                                <li>name7 的选项会变为 Z 相关选项</li>
                            </ul>
                        </div>

                        <div>
                            <h5 style={{ margin: '0 0 8px' }}>输入其他内容时：</h5>
                            <ul style={{ margin: 0, paddingLeft: '20px', color: '#666' }}>
                                <li>所有字段恢复初始状态</li>
                                <li>name2, name3 被清空</li>
                                <li>name4 重新显示</li>
                                <li>name5 恢复禁用</li>
                                <li>name6 恢复可编辑</li>
                                <li>name7 选项恢复默认值</li>
                            </ul>
                        </div>
                    </div>

                    <div style={{
                        marginTop: '16px',
                        padding: '16px',
                        backgroundColor: '#fff2f0',
                        border: '1px solid #ffccc7',
                        borderRadius: '4px'
                    }}>
                        <h4 style={{ margin: '0 0 8px', color: '#ff4d4f' }}>API 使用</h4>
                        <code style={{
                            display: 'block',
                            fontSize: '12px',
                            backgroundColor: '#fff',
                            padding: '8px',
                            borderRadius: '4px',
                            overflow: 'auto'
                        }}>
                            {`formActions.setValue(name, value)
formActions.setState(name, {
  display: false,
  disabled: true,
  isPreview: true,
  xProps: {...}
})
formActions.forceUpdate(name)`}
                        </code>
                    </div>
                </div>
            </Box>
        </PageCard>
    );
}
