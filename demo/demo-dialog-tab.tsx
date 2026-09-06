import React, {useState} from 'react';
import {Dialog, Button, Box, PageCard, Tab, Message} from '../src/index';
import type {TypeShowTabCfgOnOKParams} from '../types/dialog';

const sectionTitle: React.CSSProperties = {
    lineHeight: '30px',
    marginTop: 16,
    marginBottom: 8,
    fontWeight: 600,
};

const tip: React.CSSProperties = {
    color: '#666',
    fontSize: 13,
    marginBottom: 12,
    lineHeight: 1.6,
};

const hideTabContent: React.CSSProperties = {
    display: 'none',
    height: 0,
    overflow: 'hidden',
    padding: 0,
    margin: 0,
};

const TAB_ITEMS = [
    {key: 'basic', title: '基本信息'},
    {key: 'advance', title: '高级设置'},
    {key: 'other', title: '其它'},
];

function TabPanel({activeKey}: {activeKey: string}) {
    if (activeKey === 'basic') {
        return <div>基本信息内容区（可放表单、说明等）</div>;
    }
    if (activeKey === 'advance') {
        return <div>高级设置内容区</div>;
    }
    return <div>其它说明、帮助文档等…</div>;
}

function HeaderOnlyTabs({
    activeKey,
    onChange,
}: {
    activeKey: string;
    onChange: (key: string) => void;
}) {
    return (
        <Tab
            shape="pure"
            size="small"
            activeKey={activeKey}
            onChange={(key: string | number) => onChange(String(key))}
            contentStyle={hideTabContent}
            style={{marginBottom: -1}}
        >
            {TAB_ITEMS.map((item) => (
                <Tab.Item key={item.key} title={item.title} />
            ))}
        </Tab>
    );
}

/** 声明式：与 showTab 同视觉，适合受控场景 */
function DialogWithTabsInHeader() {
    const [visible, setVisible] = useState(false);
    const [activeKey, setActiveKey] = useState('basic');

    return (
        <>
            <Button onClick={() => setVisible(true)}>声明式 Header Tab</Button>
            <Dialog
                v2
                width={560}
                visible={visible}
                headerStyle={{padding: '8px 8px', borderBottom: 'none'}}
                title={<HeaderOnlyTabs activeKey={activeKey} onChange={setActiveKey} />}
                onClose={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                onOk={() => {
                    Message.success(`当前 Tab: ${activeKey}`);
                    setVisible(false);
                }}
            >
                <TabPanel activeKey={activeKey} />
            </Dialog>
        </>
    );
}

/** 命令式：Dialog.showTab */
function openShowTab() {
    Dialog.showTab({
        items: [
            {key: 'basic', title: '基本信息', content: <div>基本信息内容区（可放表单、说明等）</div>},
            {key: 'advance', title: '高级设置', content: <div>高级设置内容区</div>},
            {key: 'other', title: '其它1', content: <div>其它说明、帮助文档等…</div>},
            {title: '其它2', content: <div>其它2说明、帮助文档等…</div>},
        ],
        onChange(key: string) {
            console.log('tab change:', key);
        },
        onOk(ctx: TypeShowTabCfgOnOKParams) {
            Message.success(`当前 Tab: ${ctx.activeKey}`);
        },
    });
}

function DemoDialogTab() {
    return (
        <PageCard>
            <div style={sectionTitle}>Dialog.showTab</div>
            <div style={tip}>
                Header 显示 Tab，body 切换内容。命令式用法与 showForm / showTable 同级。
            </div>

            <pre style={{background: '#f6f8fa', padding: 12, borderRadius: 4, fontSize: 12, overflow: 'auto'}}>
{`Dialog.showTab({
  items: [
    { key: 'basic', title: '基本信息', content: <BasicForm /> },
    { key: 'advance', title: '高级设置', content: <AdvanceForm /> },
  ],
  onOk: (ctx) => { /* ctx.activeKey */ },
})`}
            </pre>

            <Box direction="row" spacing={16} wrap style={{marginTop: 16}}>
                <Button type="primary" onClick={openShowTab}>
                    Dialog.showTab
                </Button>
            </Box>

            <Box direction="row" spacing={16} wrap style={{marginTop: 16}}>
                <DialogWithTabsInHeader />
            </Box>
        </PageCard>
    );
}

export {DemoDialogTab};
