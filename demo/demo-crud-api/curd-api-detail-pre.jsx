import {
    QueryForm,
    Form,
    Table,
    Pagination,
    PageCard,
    TablePro,
    Dialog,
    Message,
    Card,
    Button,
    Input, Select,
    Tab,
    utils,
    EditableTable
} from '../../src/index';
import React, {useState} from "react";
import './curd-api-detail.css';
import {
    databaseMap,
    sqlSimpleNameOptions,
    yesOrNoOptions,
    preHandleOptions,
    postHandleOptions
} from './curd-api-config.jsx';

const {ComponentsStore} = utils;
import {PreciseStore, useCreatePreciseStore, usePreciseValue} from "../../src/hooks/usePreciseStore";


const FormItem = Form.Item;
const FormSubmit = Form.Submit;
const FormSection = Form.Section;

//
// export interface HandlePreSetting {
//     handleMethod: string;
//     handleParam1: string;
//     handleParam2: string;
//     handleParam3: string;
// }


const paramUpdateTableSchema = {
    columns: [
        {
            dataIndex: 'key',
            title: '参数路径',
            component: 'Input',
            xProps: {
                placeholder: '如：data.name'
            }
        },
        {
            dataIndex: 'value',
            title: '参数设置',
            component: 'Input',
            xProps: {
                placeholder: '参考：IFuncCfgModel'
            }
        }
    ]
};


const paramValidateTableSchema = {

    columns: [
        {
            dataIndex: 'key',
            title: '参数路径',
            component: 'Input',
            xProps: {
                placeholder: '如：data.name'
            }
        },
        {
            dataIndex: 'required',
            title: '是否必填',
            component: 'Switch',
            width: '80px'
        },
        {
            dataIndex: 'type',
            title: '常用校验器',
            component: 'Select',
            width: '300px',
            xProps: {
                mode: "multiple",
                hasClear: true,
                filterLocal: false,
                showSearch: true,
                style:{
                    maxWidth:'300px'
                },
                dataSource: [
                    {label: '字符串类型', value: 'string'},
                    {label: '数字类型', value: 'number'},
                    {label: '数字类型(允许字符串类型)', value: 'numeric'},
                    {label: '整数类型', value: 'integer'},
                    {label: '布尔值类型', value: 'boolean'},
                    {label: '名字(仅包含:字母/数字/下划线)', value: 'name'},
                    {label: '中国11位手机号', value: 'phone:cn'},
                    {label: '电子邮箱', value: 'email'},
                    {label: '日期字符串(YYYY-MM-DD)', value: 'moment:YYYY-MM-DD'},
                    {label: '时间字符串(YYYY-MM-DD HH:mm:ss)', value: 'moment:YYYY-MM-DD HH:mm:ss'},
                    {label: '数组', value: 'array'},
                    {label: '对象', value: 'object'},
                ]
            }
        },

        {
            dataIndex: 'length',
            title: '字符长度校验',
            component: 'Input',
            tips: '如：(1,5)、[1,5]、(1,5]、[1,5) ',
            xProps: {
                placeholder: '如：(1,5)、[1,5]、(1,5]、[1,5)'
            }
        },

        {
            dataIndex: 'scale',
            title: '数值大小校验',
            component: 'Input',
            tips: '如：(1,5)、[1,5]、(1,5]、[1,5) ',
            xProps: {
                placeholder: '如：(1,5)、[1,5]、(1,5]、[1,5)'
            }
        },

        {
            dataIndex: 'regexp',
            title: '正则校验',
            component: 'Input',
        },

        {
            dataIndex: 'enum',
            title: '枚举值校验',
            component: 'BatchInput',
        },


    ]
};


const paramAllowTableSchema = {
    columns: [
        {
            dataIndex: 'objName',
            title: '参数对象',
            component: 'Input',
            xProps: {
                placeholder: '如：data 或 condition'
            }
        },
        {
            dataIndex: 'allowList',
            title: '参数白名单',
            component: 'BatchInput',
        },
    ]
};


const paramRejectTableSchema = {
    columns: [
        {
            dataIndex: 'objName',
            title: '参数对象',
            component: 'Input',
            xProps: {
                placeholder: '如：data 或 condition'
            }
        },
        {
            dataIndex: 'rejectList',
            title: '参数黑名单',
            component: 'BatchInput',
        },
    ]
};


function SettingTable({tableSchema}) {
    const {columns} = tableSchema;
    const [dataSource, setDataSource] = useState([{}, {}]);
    return (
        <div className={'crud-api-detail-card-setting-table'}>
            <EditableTable columns={columns} size={'small'} dataSource={dataSource}/>
            <Button type={'secondary'}
                    className={'crud-api-detail-card-setting-table-add'}
                    onClick={() => {
                setDataSource([...dataSource, {}])
            }}>添加设置</Button>
        </div>
    );
}


function CurdApiDetailPre(props) {

    const {crossedStore} = props;
    const [preHandleList, updatePreHandleList] = usePreciseValue(crossedStore, 'preHandleList');
    const [tick, setTick] = useState(0);

    const forceUpdate = () => {
        setTick(Date.now());
    }

    return (
        <>
            <Tab>
                <Tab.Item title={'参数校验'}>
                    <SettingTable tableSchema={paramValidateTableSchema}/>
                </Tab.Item>
                <Tab.Item title={'参数设置'}>
                    <SettingTable tableSchema={paramUpdateTableSchema}/>
                </Tab.Item>
                <Tab.Item title={'参数白名单'}>
                    <SettingTable tableSchema={paramAllowTableSchema}/>
                </Tab.Item>
                <Tab.Item title={'参数黑名单'}>
                    <SettingTable tableSchema={paramRejectTableSchema}/>
                </Tab.Item>
                <Tab.Item title={'权限校验'}>
                    <div className={'crud-api-detail-card-setting-tab-formitems'}>
                        <FormItem label={'校验方式'}
                                  name={'auth_type'}
                                  required={false}
                                  component={'Select'}
                                  enums={(item, {values}) => {
                                      return [
                                          {label: '无需鉴权', value: 'free'},
                                          {label: '仅登录即可', value: 'login'},
                                          {label: '校验角色', value: 'byRoleCode'},
                                          {label: '校验功能点', value: 'byFuncCode'},
                                      ]
                                  }}
                                  xProps={{
                                      hasClear: true,
                                      filterLocal: true,
                                      showSearch: true,
                                  }}
                        />

                        <FormItem name={'auth_config'}
                                  deps={['auth_type']}
                                  label={(a, {values}) => {
                                      const auth_type = values['auth_type'];
                                      console.log('auth_type', auth_type);
                                      if (auth_type === 'byRoleCode') {
                                          return '选择角色'
                                      }
                                      if (auth_type === 'byFuncCode') {
                                          return '选择功能点'
                                      }
                                      return '校验参数'
                                  }}
                                  component={'BatchInput'}
                                  display={(values) => {
                                      const auth_type = values['auth_type'];
                                      const ss = [
                                          'byRoleCode',
                                          'byFuncCode'
                                      ];
                                      return ss.indexOf(auth_type) >= 0;
                                  }}
                                  required={(values) => {
                                      const auth_type = values['auth_type'];
                                      const ss = [
                                          'byRoleCode',
                                          'byFuncCode'
                                      ];
                                      return ss.indexOf(auth_type) >= 0;
                                  }}
                        />

                    </div>

                </Tab.Item>
            </Tab>
        </>
    )
}

export {
    CurdApiDetailPre
}
