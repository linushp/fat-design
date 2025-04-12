import {QueryForm, Table, Pagination, PageCard, TablePro, Dialog, SortableList} from '../src/index';

const SortableEditableTable = SortableList.SortableEditableTable;

function DemoSortableTable() {
    return (
        <PageCard>
            <SortableEditableTable
                onRowValueChange={(row: any, column: any) => {

                    if (column.dataIndex === 'lockLeft') {
                        if (row.lockLeft) {
                            row.lockRight = false;
                        }
                    }

                    if (column.dataIndex === 'lockRight') {
                        if (row.lockRight) {
                            row.lockLeft = false;
                        }
                    }
                }}

                columns={[
                    {
                        title: '拖动排序',
                        dataIndex: 'display',
                        width: '74px',
                        component: 'Icon',
                        draggable: true,
                        xProps: {
                            type: 'list'
                        },
                    },

                    {
                        title: '字段名',
                        dataIndex: 'title',
                    },
                    {
                        title: '是否显示',
                        dataIndex: 'display',
                        width: '74px',
                        component: 'Switch',
                    },
                    {
                        title: '左锁列',
                        dataIndex: 'lockLeft',
                        width: '74px',
                        component: 'Switch',
                    },
                    {
                        title: '右锁列',
                        dataIndex: 'lockRight',
                        width: '74px',
                        component: 'Switch',
                    },
                ]}

                dataSource={[
                    {
                        title: '姓名1',
                        dataIndex: 'name1',
                    },
                    {
                        title: '姓名2',
                        dataIndex: 'name2',
                    },
                    {
                        title: '姓名3',
                        dataIndex: 'name3',
                    },
                    {
                        title: '姓名4',
                        dataIndex: 'name4',
                    },
                    {
                        title: '姓名5',
                        dataIndex: 'name5',
                    }
                ]}

            />
        </PageCard>
    )
}

export {
    DemoSortableTable
}
