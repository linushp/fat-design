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

export function DemoForm2() {


    const [state, setState] = useState(0);

    const onSubmit = (values: any, {formActions}: any) => {
        console.log('Form submitted:', values);
    }

    const onCreated = (values, {formStore, formActions}: any) => {
        window.xx_formStore = formStore;
        window.xx_formActions = formActions;
    }


    const onChange = (values: any, {stateMap, formActions}: FnFormOnChangeParams) => {
        if (values.name1 === 'z') {
            formActions.setValue('name2','zzzzz')
            formActions.setState('name4',{display:false})
            formActions.setState('name5',{disabled:false})
        } else {
            formActions.setState('name4',{display:true})
            formActions.setState('name5',{disabled:true})
        }
        console.info('stateMap.name4', stateMap.name4)
    }


    return (
        <PageCard>

            <div style={{width: '600px', marginLeft: '30px'}}>
                <Button onClick={() => {
                    setState(Date.now());
                }}>A
                </Button>

                <Form defaultValues={initialValues}
                      labelAlign={'left'}
                      components={{}}
                      onSubmit={onSubmit}
                      onCreated={onCreated}
                      onChange={onChange}
                      autoValidate={true}
                      autoValidateOnCreated={true}
                >
                    <FormItem label={'名字1'}
                              name={'name1'}
                              component={'Input'}
                              length={7}
                              required
                    />

                    <FormItem label={'名字2'}
                              name={'name2'}
                              component={'Input'}
                    />


                    <FormItem label={'颜色'}
                              name={'color1'}
                              component={'ColorPicker'}
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
                              disabled={(values: any) => {
                                  return values.name1 === '444'
                              }}
                              isPreview={(values: any) => {
                                  return values.name1 === 'preview'
                              }}
                    />

                    <FormItem label={'名字5'}
                              name={'name5'}
                              component={'Input'}
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

                    {arr.map((a: any, index: number) => {
                        return <FormItem key={'名字_index_' + index} label={'名字_index_' + index}
                                         name={'name_index_' + index}
                                         component={'Input'}
                                         isPreview={(values: any) => {
                                             return values.name1 === 'preview'
                                         }}
                        />
                    })}


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
