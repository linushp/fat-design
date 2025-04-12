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
    }


    const onChange = (values: any, {stateMap, formActions}: FnFormOnChangeParams) => {
        if (values.name1 === 'z') {
            formActions.setValue('name2','zzzzz')
            // formActions.setValue('name3','zzzzz')
            formActions.setState('name4',{display:false})
            formActions.setState('name5',{disabled:false})
            // values.name2 === 'zzzzz';
            // values.name3 === 'zzzzz';
            // stateMap.name4.display = false;
            // stateMap.name5.disabled = false;
        } else {
            // formActions.setValue('name2','aaaaa')
            // formActions.setValue('name3','aaaaa')
            formActions.setState('name4',{display:true})
            formActions.setState('name5',{disabled:true})
            // stateMap.name4.display = true;
            // stateMap.name5.disabled = true;
        }
        console.info('stateMap.name4', stateMap.name4)
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
                      submitter={true}
                      {...formItemLayout}
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


                </Form>
            </div>
        </PageCard>
    );
}
