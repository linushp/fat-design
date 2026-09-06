import React, {useState} from 'react'
import {Form, Input, Select, PageCard, Button} from '../src/index';
import './index.css'
import {FnFormOnChangeParams} from "../src/form2/form-types";

const FormItem = Form.Item as any;
const FormSubmit = Form.Submit as any;

const initialValues = {
    name0: 'name0',
    name1: 'preview',
    name2: '222',
    name3: '333',
    name4: '444',
    Select1: 'AAA',
    time1: '2025-06-02T05:43:35.000Z',
    ColorPicker111: "#ce6969",
    Select999: ['111'],
    Input111:'111',
    NativeSelect:'111',
};


const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 15,
    },
};

const arr: any = [];
for (let i = 0; i < 3; i++) {
    arr.push({});
}

const Option = Select.Option;




const datetimeFormat = "YYYY-MM-DD HH:mm:ss";
const dateFormat = "YYYY-MM-DD";



export function DemoForm3() {


    const [state, setState] = useState(0);

    const onSubmit = (values: any, {formActions}: FnFormOnChangeParams) => {
        return new Promise((resolve)=>{
            setTimeout(resolve, 3000)
        });
    }

    const onCreated = (values, {formStore, formActions}: any) => {
        window.xx_formStore = formStore;
        window.xx_formActions = formActions;

        setTimeout(()=>{
            formActions.setState('name2', {xProps: {dataSource: [
                        {value:"222",label:"222"},
                    ]}});
            formActions.forceUpdate('name2')

        },1000)
    }


    const onChange = (values: any, {stateMap, formActions}: FnFormOnChangeParams) => {
        console.log('onChange', values);
    }


    return (
        <PageCard>

            <div style={{width: '600px', marginLeft: '30px'}}>

                <Form defaultValues={initialValues}
                      labelAlign={'left'}
                      onSubmit={onSubmit}
                      onCreated={onCreated}
                      onChange={onChange}
                      autoValidate={true}
                      submitter={false}
                      isPreview={true}
                      {...formItemLayout}
                      autoValidateOnCreated={true}
                >

                    <FormItem label={'名字1'}
                              name={'name1'}
                              component={'Input'}
                              length={7}
                    />

                    <FormItem label={'时间'}
                              name={'time1'}
                              component={'DatePicker'}
                              isPreview
                              xProps={{
                                  showTime: true,
                                  format: datetimeFormat,
                              }}
                    />


                    <FormItem label={'名字2'}
                              name={'name2'}
                              isPreview={true}
                              component={'Select'}
                    />

                    <FormItem label={'TimePicker'}
                              name={'TimePicker'}
                              component={'TimePicker'}
                              xProps={{
                                  showHour: true,
                              }}
                    />

                    <FormItem label={'TimePicker.RangePicker'}
                              name={'TimePicker2222'}
                              component={'TimePicker.RangePicker'}
                    />

                    <FormItem label={'Input.ColorPicker'}
                              name={'ColorPicker111'}
                              component={'Input.ColorPicker'}
                              xProps={{
                                  placeholder:'请选择颜色'
                              }}
                    />



                    <FormItem label={'NativeSelect'}
                              name={'NativeSelect'}
                              enums={[
                                  {label: '111', value: '111'},
                                  {label: '222', value: '222'},
                                  {label: '333', value: '333'},
                              ]}
                              component={'Select.NativeSelect'}
                    />

                    <FormItem label={'Input111'}
                              name={'Input111'}
                              component={'Input'}
                    />

                    <FormItem label={'Select999'}
                              name={'Select999'}
                              enums={[
                                  {label: '111', value: '111'},
                                  {label: '222', value: '222'},
                                  {label: '333', value: '333'},
                              ]}
                              xProps={{
                                  mode:'multiple',
                              }}
                              component={'Select'}
                    />



                </Form>
            </div>
        </PageCard>
    );
}
