import React, { useState } from 'react';
import { Card, Button, Switch, Input, Message } from '../src/index';

const sectionStyle: React.CSSProperties = {
    marginBottom: 32,
};

const titleStyle: React.CSSProperties = {
    margin: '0 0 8px',
    fontSize: 16,
    fontWeight: 500,
    color: '#333',
};

const descStyle: React.CSSProperties = {
    margin: '0 0 12px',
    fontSize: 13,
    color: '#888',
};

const cardWrapStyle: React.CSSProperties = {
    maxWidth: 640,
};

function DemoCardCollapsible() {
    const [collapsed, setCollapsed] = useState(false);
    const [log, setLog] = useState('尚未切换');

    return (
        <div>
            <div style={sectionStyle}>
                <h3 style={titleStyle}>基础用法</h3>
                <p style={descStyle}>设置 collapsible，点击标题栏即可收起 / 展开内容。标题前显示箭头，右侧追加「收起 / 展开」提示。</p>
                <div style={cardWrapStyle}>
                    <Card collapsible title="基本信息">
                        <Card.Content>
                            点击卡片标题栏，内容区域会收起或展开。收起时内容使用 display:none 隐藏，子组件不会卸载。
                        </Card.Content>
                    </Card>
                </div>
            </div>

            <div style={sectionStyle}>
                <h3 style={titleStyle}>默认收起</h3>
                <p style={descStyle}>非受控模式通过 defaultCollapsed 指定初始为收起状态。</p>
                <div style={cardWrapStyle}>
                    <Card collapsible defaultCollapsed title="物流信息" subTitle="默认收起">
                        <Card.Content>
                            快递单号：SF1234567890<br />
                            当前状态：运输中，预计明日送达。
                        </Card.Content>
                    </Card>
                </div>
            </div>

            <div style={sectionStyle}>
                <h3 style={titleStyle}>带 extra</h3>
                <p style={descStyle}>extra 会显示在标题右侧，「收起 / 展开」提示会自动追加在 extra 后面。</p>
                <div style={cardWrapStyle}>
                    <Card
                        collapsible
                        title="订单详情"
                        extra={
                            <Button
                                text
                                type="primary"
                                onClick={(e: React.MouseEvent) => {
                                    e.stopPropagation();
                                    Message.notice('点击 extra 不会切换收起状态');
                                }}
                            >
                                查看全部
                            </Button>
                        }
                    >
                        <Card.Content>
                            订单号：20260828001<br />
                            下单时间：2026-08-28 21:30<br />
                            实付金额：¥128.00
                        </Card.Content>
                    </Card>
                </div>
            </div>

            <div style={sectionStyle}>
                <h3 style={titleStyle}>受控模式</h3>
                <p style={descStyle}>传入 collapsed 后由外部完全控制收起状态，可通过 Switch 或点击标题栏切换。</p>
                <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Switch
                        checked={!collapsed}
                        onChange={(checked: boolean) => setCollapsed(!checked)}
                    />
                    <span style={{ fontSize: 13, color: '#666' }}>
                        {collapsed ? '已收起' : '已展开'}
                    </span>
                    <span style={{ fontSize: 12, color: '#999' }}>（{log}）</span>
                </div>
                <div style={cardWrapStyle}>
                    <Card
                        collapsible
                        collapsed={collapsed}
                        title="受控卡片"
                        onCollapsedChange={(next) => {
                            setCollapsed(next);
                            setLog(next ? '外部收起' : '外部展开');
                        }}
                    >
                        <Card.Content>
                            当前为受控模式。标题栏点击和外部 Switch 都会同步 collapsed 状态。
                        </Card.Content>
                    </Card>
                </div>
            </div>

            <div style={sectionStyle}>
                <h3 style={titleStyle}>收起不卸载</h3>
                <p style={descStyle}>收起时内容仅隐藏，输入框中的值会保留。展开后再看，输入内容仍在。</p>
                <div style={cardWrapStyle}>
                    <Card collapsible title="备注信息">
                        <Card.Content>
                            <Input placeholder="输入备注后收起卡片，展开后内容仍在" />
                        </Card.Content>
                    </Card>
                </div>
            </div>

            <div style={sectionStyle}>
                <h3 style={titleStyle}>底部操作区</h3>
                <p style={descStyle}>收起时 media、内容、底部 actions 都会一起隐藏。</p>
                <div style={cardWrapStyle}>
                    <Card
                        collapsible
                        title="审核意见"
                        actions={
                            <>
                                <Button type="primary" onClick={() => Message.success('已通过')}>
                                    通过
                                </Button>
                                <Button onClick={() => Message.warning('已驳回')}>驳回</Button>
                            </>
                        }
                    >
                        <Card.Content>
                            请核对资料完整性后再操作。收起后底部按钮会一并隐藏。
                        </Card.Content>
                    </Card>
                </div>
            </div>

            <div style={sectionStyle}>
                <h3 style={titleStyle}>多卡片组合</h3>
                <p style={descStyle}>详情页常见用法：多张可折叠卡片纵向排列，各自独立收起。</p>
                <div style={{ ...cardWrapStyle, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <Card collapsible title="基本信息">
                        <Card.Content>
                            姓名：张三<br />
                            手机：138****0000<br />
                            邮箱：zhangsan@example.com
                        </Card.Content>
                    </Card>
                    <Card collapsible defaultCollapsed title="收货地址">
                        <Card.Content>
                            浙江省杭州市西湖区文三路 100 号
                        </Card.Content>
                    </Card>
                    <Card collapsible title="发票信息" extra="普通发票">
                        <Card.Content>
                            抬头：杭州某某科技有限公司<br />
                            税号：91330100MA2XXXXXXX
                        </Card.Content>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export { DemoCardCollapsible };
