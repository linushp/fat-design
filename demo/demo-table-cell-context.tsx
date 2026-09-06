import { Table, Button, Message, PageCard } from '../src/index';

const dataSource = [
    { id: 1, name: '张三', amount: 1280 },
    { id: 2, name: '李四', amount: 3600 },
    { id: 3, name: '王五', amount: 520 },
];

export function DemoTableCellContext() {
    const pageContext = {
        currency: '¥',
        onView: (record: any) => {
            Message.notice(`查看：${record.name}`);
        },
        onDelete: (record: any) => {
            Message.warning(`删除：${record.name}`);
        },
    };

    return (
        <PageCard>
            <p style={{ marginBottom: 12, color: '#666' }}>
                cell 函数签名：<code>(value, index, record, context)</code>。
                第 4 个参数会带上单元格信息（value / rowIndex / record / dataIndex / title），以及列上透传的 context。
            </p>
            <Table
                primaryKey="id"
                dataSource={dataSource}
                columns={[
                    { title: '姓名', dataIndex: 'name' },
                    {
                        title: '金额',
                        dataIndex: 'amount',
                        context: pageContext,
                        cell: (value: any, _index: number, _record: any, ctx: any) => {
                            return `${ctx.currency}${value}`;
                        },
                    },
                    {
                        title: '单元格信息',
                        dataIndex: 'name',
                        cell: (_value: any, _index: number, _record: any, ctx: any) => {
                            return `${ctx.title} / ${ctx.dataIndex} / 第 ${ctx.rowIndex + 1} 行`;
                        },
                    },
                    {
                        title: '操作',
                        dataIndex: 'id',
                        width: 140,
                        context: pageContext,
                        cell: (_value: any, _index: number, record: any, ctx: any) => {
                            return (
                                <>
                                    <Button text type="primary" onClick={() => ctx.onView(record)}>
                                        查看
                                    </Button>
                                    <Button text type="primary" onClick={() => ctx.onDelete(record)}>
                                        删除
                                    </Button>
                                </>
                            );
                        },
                    },
                ]}
            />
        </PageCard>
    );
}
