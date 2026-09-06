import { useState } from 'react';
import {
  Drawer,
  Button,
  PageCard,
  Table,
  DetailPage,
} from '../src/index';

const CardForm = DetailPage.CardForm;
const FormItem = DetailPage.FormItem;
const Section = DetailPage.Section;
const Summary = DetailPage.Summary;

/** 模拟列表数据 */
const mockList = [
  {
    id: 'ORD-202401001',
    title: 'React 性能优化实战',
    status: '已完成',
    amount: 299,
    createTime: '2024-01-15 10:30:00',
    author: '张三',
    category: '技术文章',
  },
  {
    id: 'ORD-202401002',
    title: 'Vue 3 组合式 API 精讲',
    status: '进行中',
    amount: 199,
    createTime: '2024-01-16 14:20:00',
    author: '李四',
    category: '技术文章',
  },
  {
    id: 'ORD-202401003',
    title: 'TypeScript 进阶技巧',
    status: '待审核',
    amount: 159,
    createTime: '2024-01-17 09:15:00',
    author: '王五',
    category: '技术文章',
  },
  {
    id: 'ORD-202401004',
    title: 'Node.js 服务端开发',
    status: '已完成',
    amount: 399,
    createTime: '2024-01-18 16:45:00',
    author: '赵六',
    category: '实战课程',
  },
  {
    id: 'ORD-202401005',
    title: '前端工程化实践',
    status: '进行中',
    amount: 249,
    createTime: '2024-01-19 11:00:00',
    author: '张三',
    category: '技术文章',
  },
];

const formItemLayout = {
  labelCol: { fixedSpan: 10 },
  wrapperCol: { span: 14 },
};

function DemoDrawerDetail() {
  const [visible, setVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<typeof mockList[0] | null>(null);

  const handleViewDetail = (record: typeof mockList[0]) => {
    setCurrentItem(record);
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
    setCurrentItem(null);
  };

  const columns = [
    { dataIndex: 'id', title: '单号', width: 140 },
    { dataIndex: 'title', title: '标题', width: 200 },
    {
      dataIndex: 'status',
      title: '状态',
      width: 100,
      cell: (val: string) => (
        <span
          style={{
            color: val === '已完成' ? '#52c41a' : val === '进行中' ? '#1890ff' : '#faad14',
          }}
        >
          {val}
        </span>
      ),
    },
    { dataIndex: 'amount', title: '金额', width: 80 },
    { dataIndex: 'createTime', title: '创建时间', width: 180 },
    {
      dataIndex: 'id',
      title: '操作',
      width: 120,
      cell: (_: unknown, __: number, record: typeof mockList[0]) => (
        <Button type="primary" text size="small" onClick={() => handleViewDetail(record)}>
          查看详情
        </Button>
      ),
    },
  ];

  return (
    <PageCard title="Drawer 右滑详情页" description="点击「查看详情」从右侧滑出详情面板">
      <Table dataSource={mockList} columns={columns} hasBorder={false} primaryKey="id" />

      <Drawer
        title={currentItem ? `详情 - ${currentItem.title}` : '详情'}
        placement="right"
        visible={visible}
        onClose={handleClose}
        width={720}
        footer={false}
      >
        {currentItem && (
          <DetailPage>
            <Summary
              dataSource={[
                { label: '状态', value: currentItem.status, type: 'primary' },
                { label: '单号', value: currentItem.id },
                { label: '创建时间', value: currentItem.createTime },
                { label: '金额', value: `¥${currentItem.amount}` },
              ]}
            />
            <CardForm
              defaultValues={{
                title: currentItem.title,
                author: currentItem.author,
                category: currentItem.category,
                amount: currentItem.amount,
                createTime: currentItem.createTime,
              }}
              isPreview={true}
              {...formItemLayout}
            >
              <FormItem name="title" label="标题" />
              <FormItem name="author" label="作者" />
              <FormItem name="category" label="分类" />
              <FormItem name="amount" label="金额" />
              <FormItem name="createTime" label="创建时间" />

              <Section title="补充信息" labelCol={{}} wrapperCol={{}}>
                <FormItem name="title" label="完整标题" component="Input" />
              </Section>
            </CardForm>
          </DetailPage>
        )}
      </Drawer>
    </PageCard>
  );
}

export { DemoDrawerDetail };
