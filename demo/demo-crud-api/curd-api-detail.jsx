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
    Input, Select
} from '../../src/index';
import React from "react";
import './curd-api-detail.css';
import {
    databaseMap,
    sqlSimpleNameOptions,
    yesOrNoOptions,
    preHandleOptions,
    postHandleOptions
}  from './curd-api-config.jsx';
import {PreciseStore, useCreatePreciseStore} from "../../src/hooks/usePreciseStore";
import {deepClone} from "../../src/util/object.js";
import {CurdApiDetailPre} from './curd-api-detail-pre.jsx'

const FormItem = Form.Item;
const FormSubmit = Form.Submit;
const FormSection = Form.Section;


const initialValues = {
    radiogroup1: 'A',
    checkboxgroup1: ['A', 'B'],
    name1: 'name1',
    name2: '222',
    name3: '333',
    name4: '444',
    Select1: 'A',
    Select2: ['A', 'B']
};


const formItemLayout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 10,
    },
};



function FormItemCard(props){
    const {title, children} = props;
    return (
        <Card title={title} free className={'crud-api-detail-card'}>
            <Card.Content className={'crud-api-detail-card-content'}>
                {children}
            </Card.Content>
        </Card>
    );
}

function CurdApiDetail() {
    const onSubmit = (values, stateMap) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                Message.success('OK')
                resolve();
            }, 3000)
        })
    }

    const onCreated = (values, {formStore, formActions}) => {
        window.xx_formStore = formStore;
        window.xx_formActions = formActions;
    }


    const crossedStore = useCreatePreciseStore(() => {
        return {
            preHandleList: [],
            postHandleList: [],
        }
    });


    return (
        <PageCard>
            <Form defaultValues={initialValues}
                  labelAlign={'left'}
                  components={{}}
                  {...formItemLayout}
                  isPreview={false}
                  onSubmit={onSubmit}
                  onCreated={onCreated}
                  autoValidateOnCreated={false}
            >
                <FormItemCard title={'基本信息'} >
                        <FormItem label={'接口标识'} name={'method'} required component={'Input'} maxLength={120}/>
                        <FormItem label={'接口名称'}
                                  name={'method_name'}
                                  required
                                  component={'Input'}
                                  maxLength={120}
                        />
                        <FormItem label={'接口备注'}
                                  name={'method_desc'}
                                  component={'Input.TextArea'}
                                  maxLength={240}
                        />
                </FormItemCard>
                <FormItemCard >
                        <FormItem label={'查询语句'}
                                  name={'sql_simple_name'}
                                  required
                                  component={'Select'}
                                  enums={sqlSimpleNameOptions}
                                  xProps = {{
                                      hasClear: true,
                                      filterLocal: false,
                                      showSearch: true,
                                  }}
                        />
                        <FormItem label={'自定义查询语句'}
                                  name={'sql_cfg_list_str'}
                                  component={'Input.TextArea'}
                                  required={(values) => {
                                      return values['sql_simple_name'] === 'CUSTOM'
                                  }}
                                  display={(values) => {
                                      return values['sql_simple_name'] === 'CUSTOM'
                                  }}
                        />
                        <FormItem label={'返回字段'}
                                  name={'columns'}
                                  component={'BatchInput'}
                                  xProps={{
                                      max: 200
                                  }}
                                  display={(values) => {
                                      const sql_simple_name = values['sql_simple_name'];
                                      const ss = [
                                          'SIMPLE_QUERY',
                                          'SIMPLE_QUERY_ONE',
                                          'SIMPLE_QUERY_PAGE'
                                      ];
                                      return ss.indexOf(sql_simple_name) >=0;
                                  }}
                        />
                        <FormItem label={'最多返回条数'}
                                  name={'max_limit'}
                                  component={'NumberPicker'}
                                  display={(values) => {
                                      const sql_simple_name = values['sql_simple_name'];
                                      const ss = [
                                          'SIMPLE_QUERY',
                                          'SIMPLE_QUERY_ONE',
                                          'SIMPLE_QUERY_PAGE'
                                      ];
                                      return ss.indexOf(sql_simple_name) >=0;
                                  }}
                        />
                </FormItemCard>

                <FormItemCard title={'数据库配置'} >

                        <FormItem label={'数据库'}
                                  name={'sql_database'}
                                  required
                                  component={'Select'}
                                  enums={()=> {
                                      const databaseKeys = Object.keys(databaseMap);
                                      return databaseKeys.map((a)=>{
                                          return {"label": a, "value": a};
                                      });
                                  }}
                                  onChange={(value, storeData) => {
                                      delete storeData.values.sql_schema;
                                      delete storeData.values.sql_table;
                                  }}
                                  xProps={{
                                      hasClear: true,
                                      filterLocal: true,
                                      showSearch: true,
                                  }}
                        />
                        <FormItem label={'Schema'}
                                  name={'sql_schema'}
                                  required
                                  component={'Select'}
                                  deps={["sql_database"]}
                                  enums={(item, {values})=>{
                                      const sql_database = values['sql_database'] || '';
                                      const schemaKeys = Object.keys(databaseMap[sql_database] || {});
                                      return schemaKeys.map((a)=>{
                                          return {"label": a, "value": a};
                                      });
                                  }}
                                  onChange={(value, storeData) => {
                                      delete storeData.values.sql_table;
                                  }}
                                  xProps={{
                                      hasClear: true,
                                      filterLocal: true,
                                      showSearch: true,
                                  }}
                        />
                        <FormItem label={'Table'}
                                  name={'sql_table'}
                                  required
                                  deps={["sql_schema",'sql_database']}
                                  component={'Select'}
                                  enums={(item, {values}) => {
                                      const sql_database = values['sql_database'] || '';
                                      const sql_schema = values['sql_schema'] || '';
                                      const obj1 = databaseMap[sql_database] || {};
                                      const obj2 = obj1[sql_schema] || [];
                                      return obj2.map((a)=> {
                                          return {"label": a, "value": a};
                                      });
                                  }}
                                  xProps={{
                                      hasClear: true,
                                      filterLocal: true,
                                      showSearch: true,
                                  }}
                        />
                        <FormItem label={'是否开启事务'}
                                  name={'transaction_enable'}
                                  component={'Select'}
                                  enums={[
                                      {"label": '不开启', "value": 0},
                                      {"label": '开启', "value": 1}
                                  ]}
                        />
                </FormItemCard>

                <FormItemCard title={'前置处理'} >
                    <CurdApiDetailPre crossedStore={crossedStore} />
                </FormItemCard>

                <Card title={'后置处理'} free className={'crud-api-detail-card'}>
                    <Card.Content className={'crud-api-detail-card-content'}>
                        <Table size={'small'} dataSource={[{}, {}]}>
                            <Table.Column name={'处理方式'} title={'处理方式'} cell={() => {
                                return <Select dataSource={postHandleOptions}/>
                            }}/>
                            <Table.Column name={'处理字段'} title={'处理字段'}/>
                            <Table.Column name={'处理设置'} title={'处理设置'}/>
                            <Table.Column name={'操作'} title={'操作'}/>
                        </Table>
                        <Button type={'secondary'} className={'crud-api-detail-card-prehandle-button'}>
                            添加后置处理
                        </Button>
                    </Card.Content>
                </Card>


            </Form>
        </PageCard>
    )
}

export {
    CurdApiDetail
}
