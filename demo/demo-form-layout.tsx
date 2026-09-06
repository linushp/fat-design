import React, {useState} from 'react'
import {Form, Input, Select, PageCard, Button} from '../src/index';
import './index.css'

const FormItem = Form.Item as any;
const FormSubmit = Form.Submit as any;

const initialValues = {
    name0: 'name0',
    name1: 'preview',
    name2: '222',
    name3: '333',
    name4: '444',
    Select1: 'AAA'
};


const formItemLayout = {
    wrapperCol: {
        columns: 3
    },
};

const arr: any = [];
for (let i = 0; i < 3; i++) {
    arr.push({});
}

const Option = Select.Option;

export function DemoFormLayout() {


    const [state, setState] = useState(0);

    const onSubmit = (values: any, stateMap: any) => {
        debugger;
    }

    const onCreated = (values, {formStore, formActions}: any) => {
        window.xx_formStore = formStore;
        window.xx_formActions = formActions;
    }


    return (
        <PageCard>

            <div style={{width: '600px', marginLeft: '30px'}}>
                <Button onClick={() => {
                    setState(Date.now());
                }}>A
                </Button>

                <Form defaultValues={initialValues}
                      labelAlign={'top'}
                      components={{}}
                      layout={'responsive'}
                      layoutProps={{
                          columns: 3
                      }}
                      onSubmit={onSubmit}
                      onCreated={onCreated}
                      autoValidateOnCreated={true}
                >

                    <table>
                        <tr>
                            <td>
                                <FormItem label={'名字1'} name={'name1'}
                                          component={'Input'}
                                          length={7}
                                          required
                                />
                            </td>

                            <td>
                                <FormItem label={'名字0'}
                                          name={'name0'}
                                          component={'Input'}
                                          validator={(rule: any, value: string) => {
                                              if (value === 'name0') {
                                                  return Promise.resolve()
                                              }
                                              return Promise.reject(<a href={'xx'}>error</a>)
                                          }}
                                />
                            </td>

                            <td>
                                <FormItem label={'名字992'}
                                          name={'name992'}
                                          component={'Input'}
                                          rules={[
                                              {
                                                  message: 'xxx错误',
                                                  validator: (rule: any, value: string)=>{
                                                      if (value === 'name0') {
                                                          return Promise.resolve()
                                                      }
                                                      return Promise.reject(<a href={'xx'}>error</a>)
                                                  }
                                              },

                                              {
                                                  message: 'xxx错误',
                                                  validator: (rule: any, value: string)=>{
                                                      if (value === 'name0') {
                                                          return
                                                      }
                                                      return "出错了。。。"
                                                  }
                                              }
                                          ]}
                                />
                            </td>

                        </tr>

                    </table>





                    <FormItem label={'名字2'}
                              name={'name2'}
                              component={'Input'}
                              required
                              display={(values: any) => {
                                  return values.name1 === '222'
                              }}
                    />

                    <FormItem label={'名字3'}
                              name={'name3'}
                              component={'Input'}
                              disabled={(values: any) => {
                                  return values.name1 === '333'
                              }}
                              isPreview={(values: any) => {
                                  return values.name1 === 'preview'
                              }}
                    />

                    <FormItem label={'名字4'}
                              name={'name4'}
                              component={'Input'}
                              isPreview={(values: any) => {
                                  return values.name1 === 'preview'
                              }}
                    />

                    <FormItem label={'Select1'}
                              name={'Select1'}
                              component={'Select'}
                              enums={() => {
                                  return Promise.resolve([
                                      {label: 'Label A', value: 'AAA'},
                                      {label: 'Label B', value: 'BBB'}
                                  ])
                              }}
                              isPreview={(values: any) => {
                                  return values.name1 === 'preview'
                              }}
                    />

                    <FormItem label={'Select1-value'}
                              name={'Select1'}
                              component={'Input'}
                              isPreview={(values: any) => {
                                  return values.name1 === 'preview'
                              }}
                    />

                    <FormItem label={'Select2'}
                              name={'Select2'}
                              component={'Select'}
                              enums={() => {
                                  return [
                                      {label: 'Label A', value: 'AAA'},
                                      {label: 'Label B', value: 'BBB'}
                                  ]
                              }}
                    />


                    <FormItem label={' '}
                              component={'FormButtonGroup'}
                              xProps={{
                                  buttons: [
                                      {
                                          component: 'FormSubmit',
                                          children: 'FormSubmit'
                                      },
                                      {
                                          component: 'FormReset',
                                          children: 'FormReset',
                                          toDefault: true
                                      }
                                  ]
                              }}/>

                </Form>
            </div>
        </PageCard>
    );
}
