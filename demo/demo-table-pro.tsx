import {QueryForm, Table, Pagination, PageCard, TablePro, Dialog} from '../src/index';
import {FormItemProps} from "../src/form2/form-types";
import {useRef} from "react";

const {
    renderOperationCell,
    renderMultiFieldCell,
    renderTime,
    renderBoolean,
    useTablePro,
} = TablePro;

const initialValues = {
    username1: 'hello1',
    username2: 'AAA',
};

const schema = {
    type: 'object',
    properties: {
        username1: {
            label: '名字1',
            component: 'Input',
            required: true,
            xProps: {
                hasClear: true,
                // style: {width: 200}
            }
        },
        // username112: {
        //     label: '名字123',
        //     component: 'Input.TextArea',
        //     required: true,
        //     xProps: {
        //         hasClear: true,
        //         // style: {width: 200}
        //     }
        // },

        username2: {
            label: '下拉框2',
            component: 'Select',
            enums(a: any, b: any) {
                return [
                    {label: 'Label A', value: 'AAA'},
                    {label: 'Label B', value: 'BBB'}
                ]
            },
            // onChange(a: any, b: any) {
            //     // 强制username3重新渲染
            //     delete b.values.username3
            //     b.formActions.updateItem('username3');
            // }
        },


        username3: {
            label: '下拉框3',
            component: 'Select',
            xProps: {
                hasClear: true,
                filterLocal: false,
                showSearch: true,
                mode: "multiple",
            },
            deps: ["username2"],
            enums(a: any, b: any) {

                const key = b.valuesOfOnSearch.username3;
                delete b.valuesOfOnSearch.username3;

                if (key) {
                    return [
                        {label: 'Label KKK1 ' + key, value: 'KKK1 ' + key},
                        {label: 'Label KKK2 ' + key, value: 'KKK2 ' + key}
                    ]
                }

                if (b.values.username2 === 'AAA') {
                    return [
                        {label: 'Label AAA1', value: 'AAA1'},
                        {label: 'Label AAA2', value: 'AAA2'}
                    ]
                }
                return [
                    {label: 'Label BBB1', value: 'BBB1'},
                    {label: 'Label BBB2', value: 'BBB2'}
                ]
            },
        },

        username4: {
            label: '下拉框4',
            component: 'Select',
            enums: [
                {label: 'Label A', value: 'AAA'},
                {label: 'Label B', value: 'BBB'}
            ]
        },


        username5: {
            label: '名字2',
            component: 'TimePicker'
        },

        username6: {
            label: '名字2',
            component: 'DatePicker'
        },

        username7: {
            label: '名字7',
            component: 'DatePickerRangePicker'
        },


        // username9: {label: '名字9'},
        // username10: {label: '名字10'},
    },
};

const dataSource = (formParams: any, otherParams: any = {}, ) => {
    const username1 = formParams.username1;
    const {current, pageSize = 10, filterValue} = otherParams;
    const result: any = [];
    for (let i = 0; i < pageSize; i++) {
        result.push({
            title: {
                name: ` ${3 + i}.0 ${username1} === ${filterValue}`
            },
            id: current + '' + i,
            time: Date.now() + 200 * i,
            yes: i % 2 === 0
        });
    }
    return result;
};
const render = (value: any, index: any, record: any) => {
    return <a href="#">Remove({record.id})</a>;
};




function DemoTablePro() {


    const propsRef = useRef<any>(null);

    propsRef.current = useTablePro({

        // 开启跨页选择
        isEnableCrossPageRowSelection: true,

        initFormProps: {
            labelAlign: 'top',
            defaultValues: {
                username1: 'AAA',
            },
            schema
        },

        initPaginationProps:{
            // size:'small'
            pageSize: 10,
            pageSizeList: [10, 20, 50, 100, 200, 500,1000,2000, 3000, 4000],
        },

        initTableProps: {
            title: '审批任务列表',
            primaryKey: 'id',
            // fixedHeader:true,
            columns: [
                {title: (
                    <span style={{color:'red'}}>
                        姓名
                        <span>111</span>
                    </span>
                    ), dataIndex: 'id', width: '150px', lock: 'left'},
                {title: '标题', dataIndex: 'title.name', width: '180px' ,tips: "hello", sortable:true},
                {title: '入职日期1', dataIndex: 'time', width: '200px', cell: renderTime},
                {title: '是否', dataIndex: 'yes', width: '120px', cell: renderBoolean},
                {title: '入职日期2', dataIndex: 'time', width: '320px',cell: (value:any,b:any,record:any)=>{

                        return renderMultiFieldCell([
                            {content: '建议内容,建议内容,建议内容,建议内容',},
                            {title: '建议内容', content: record.xxxxxx,},
                            {title: '建议原因', content: record.xxxxxx,},
                            {title: '状态', content: record.xxxxxx,},
                            {title: '连续次数', content: record.xxxxxx,},
                        ]);


                    }},
                {title: '入职日期3', dataIndex: 'time', width: '120px', display: false},
                {title: '入职日期4', dataIndex: 'time', width: '120px'},
                {title: '入职日期5', dataIndex: 'time', width: '120px'},
                {title: '入职日期6', dataIndex: 'time', width: '120px'},
                {title: '入职日期7', dataIndex: 'time', width: '120px'},
                {title: '入职日期8', dataIndex: 'time', width: '120px'},
                {title: '入职日期9', dataIndex: 'time', width: '120px'},
                {title: '入职日期10', dataIndex: 'time', width: '200px', cell: renderTime},
                {title: '入职日期11', dataIndex: 'time', width: '120px'},
                {title: '入职日期12', dataIndex: 'time', width: '120px'},
                {
                    title: '操作', dataIndex: 'time', width: '160px', lock: 'right',
                    cell: (a: any, b: any, record: any) => {
                        return renderOperationCell([
                            {
                                title: '日志', onClick: () => {
                                    Dialog.showTable({
                                        title: '查看日志',
                                        tableProProps: {
                                            isEnableRowSelection: false,
                                            initPaginationProps:{
                                                size: 'small'
                                            },
                                            initTableProps: {
                                                size:'small',
                                                fixedHeader: true,
                                                columns: [
                                                    {title: '姓名', dataIndex: 'id', width: '150px'},
                                                    {title: '姓名', dataIndex: 'id', width: '150px'},
                                                    {title: '标题', dataIndex: 'title.name', width: '180px'},
                                                    {title: '标题', dataIndex: 'title.name', width: '180px'},
                                                    {title: '标题', dataIndex: 'title.name', width: '180px'},
                                                    {title: '标题', dataIndex: 'title.name', width: '180px'},
                                                    {title: '标题', dataIndex: 'title.name', width: '180px'},
                                                ]
                                            },
                                            onQuery: (formParams: any, otherParams: any) => {
                                                return new Promise((resolve, reject) => {
                                                    setTimeout(() => {
                                                        resolve({
                                                            total: 100,
                                                            dataSource: dataSource(formParams, otherParams)
                                                        })
                                                    }, 0)
                                                })
                                            },
                                        },
                                    })
                                },
                            },
                            {
                                title: '查看', 
                                disabled: true,
                                tooltip:'123',
                                onClick: () => {
                                    propsRef.current.actions.doQuery();
                                },
                            },
                            {
                                title: '编辑',
                                disabled: true,
                                onClick: () => {},
                            },
                            {
                                title: '删除', onClick: () => {},
                            },

                        ],);
                    }
                },
            ]
        },

        initFilterProps: {
            defaultValue: 'ALL',
            value: 'ALL',
            dataSource: [
                {label: '全部', value: 'ALL', count: 50},
                {label: '良品', value: 'good', count: 20},
                {label: '次品', value: 'bad', count: 30},
            ],
        },


        initOperationProps: {
            buttons: [
                {text: '操作一', icon: "smile", type: 'primary'},
                {text: '操作二'},
                {text: '操作三'},
                {
                    text: '操作四',
                    icon: "smile",
                    children: [
                        {text: '操作一', icon: "smile"},
                        {text: '操作二'},
                        {text: '操作三'},
                    ]
                },
                {text: '设置', onClick:'setting', icon: 'set'},
            ]
        },


        onQuery: (formParams: any, otherParams: any) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({
                        total: 100,
                        dataSource: dataSource(formParams, otherParams)
                    })
                }, 0)
            })
        },
    });

    window.demoTableProRef = propsRef.current;

    return (
        <PageCard mode={'nobg'}>
            <TablePro {...propsRef.current} settingName={'TableProDemo'}/>
        </PageCard>
    );

}




var observer = new PerformanceObserver(function (list) {
    list.getEntries().forEach(function (entry) {
        requestIdleCallback(function () {

            console.log('longtask', {
                // 开始时间
                startTime: entry.startTime,
                // 持续时间
                duration: entry.duration,
            });
        });
    });
});
observer.observe({
    entryTypes: ["longtask"]
});


export {
    DemoTablePro
}
