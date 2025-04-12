import React, {useState} from 'react'
import {Form, Input, PageCard, Select, Button, Message} from '../src/index';
import './index.css'
import dayjs from 'dayjs';
import {FnFormOnChangeParams} from "../src/form2/form-types";
const FormItem = Form.Item as any;
const FormSubmit = Form.Submit as any;

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
        // fixedSpan: 10, // 10 * 20px
        span: 4, // 4/24 %
    },
    wrapperCol: {
        span: 10,
    },
};

const arr: any = [];
for (let i = 0; i < 3; i++) {
    arr.push({});
}
const datePreset = {
    此刻: () => dayjs()
};

const Option = Select.Option;

export function DemoForm1() {


    const [state, setState] = useState(0);

    const onSubmit = (values: any, stateMap: any) => {
        return new Promise((resolve:any)=>{
            setTimeout(()=>{
                Message.success('OK')
                resolve();
            }, 3000)
        })
    }

    const onCreated = (values, {formStore, formActions}: any) => {
        window.xx_formStore = formStore;
        window.xx_formActions = formActions;
    }


    return (
        <PageCard>
            {/*<div style={{width: '600px', marginLeft: '30px'}}>*/}

            <Button onClick={() => {
                setState(Date.now());
            }}>A
            </Button>

            <Form defaultValues={initialValues}
                  labelAlign={'left'}
                  components={{}}
                  {...formItemLayout}
                  isPreview={false}
                  onSubmit={onSubmit}
                  onCreated={onCreated}
                  autoValidateOnCreated={false}
            >

                <FormItem label={'编号'}
                          name={'name1'}
                          component={'Input'}
                          description={'确认后，会在下方展示所有货品，请基于货品进行相关激活'}
                          length={7}
                          required
                          xProps={{
                              hasClear: true
                          }}
                />

                <FormItem label={'描述'}
                          name={'desc1'}
                          component={'Input.TextArea'}
                          maxLength={10}
                          xProps={{
                              hasClear: true,
                              showLimitHint: true,
                              // maxLength:10
                          }}
                />


                <FormItem label={'BatchInput'}
                          name={'BatchInput1'}
                          component={'BatchInput'}
                />

                <FormItem label={'RadioGroup'}
                          name={'radiogroup1'}
                          component={'RadioGroup'}
                          enums={() => {
                              return Promise.resolve([
                                  {label: 'Label A', value: 'A'},
                                  {label: 'Label B', value: 'B'},
                                  {label: 'Label C', value: 'C'},
                              ])
                          }}
                />

                <FormItem label={'CheckboxGroup'}
                          name={'checkboxgroup1'}
                          component={'CheckboxGroup'}
                          enums={() => {
                              return Promise.resolve([
                                  {label: 'Label A', value: 'A'},
                                  {label: 'Label B', value: 'B'},
                                  {label: 'Label C', value: 'C'},
                              ])
                          }}
                />



                <FormItem label={'CascaderSelect'}
                          name={'CascaderSelect'}
                          component={'CascaderSelect'}
                          enums={() => {
                              return fetch("https://os.alipayobjects.com/rmsportal/ODDwqcDFTLAguOvWEolX.json").then(response => response.json());
                          }}
                />

                <FormItem label={'Switch'}
                          name={'Switch'}
                          component={'Switch'}
                          xProps={{
                              // size: 'small'
                          }}
                />

                <FormItem label={'密码'}
                          name={'name1_Password'}
                          component={'InputPassword'}
                          xProps={{
                              hasClear: false,
                              className: 'xxxx_password'
                          }}
                />

                <FormItem label={'日期范围'} name={'date1'}
                          component={'DatePickerRangePicker'}
                />

                <FormItem label={'日期date2'} name={'date2'}
                          component={'DatePicker'}
                          onChange={(value: any, {formActions}: FnFormOnChangeParams) => {
                              formActions.setValue('date3', value)
                          }}
                />

                <FormItem label={'日期showTime'} name={'date3'}
                          component={'DatePicker'}
                          xProps={{
                              showTime: true,
                              preset:datePreset
                          }}
                />

                <FormItem label={'日期-周'} name={'date4'}
                          component={'DatePickerWeekPicker'}
                />

                <FormItem label={'日期-月'} name={'date5'}
                          component={'DatePickerMonthPicker'}
                />

                <FormItem label={'日期-季度'} name={'date6'}
                          component={'DatePicker.QuarterPicker'}
                />


                <FormItem label={'日期-季度范围'} name={'date7'}
                          component={'DatePicker.RangePicker'}
                          xProps={{
                              mode:"quarter",
                          }}
                />


                <FormItem label={'时间'} name={'time1'}
                          component={'TimePicker'}
                />

                <FormItem label={'时间范围'} name={'time2'}
                          component={'TimePickerRangePicker'}
                />




                <FormItem label={'运单号'}
                          name={'name000'}
                          id={'sdsd'}
                          render={(value: any, childProps: any) => {
                              return (
                                  <div>
                                      <Input {...childProps} />
                                  </div>
                              )
                          }}
                />


                <FormItem label={'名字2'}
                          name={'name2'}
                          component={'Input'}
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
                />

                <FormItem label={'名字4'}
                          name={'name4'}
                          component={'Input'}
                />

                <FormItem label={'Select1'}
                          name={'Select1'}
                          component={'Select'}
                          xProps={{
                              // mode:"multiple",
                              hasClear: true
                          }}
                          isPreview={(values: any) => {
                              return false
                          }}
                          enums={() => {
                              return Promise.resolve([
                                  {label: 'Label A', value: 'A'},
                                  {label: 'Label B', value: 'B'},
                                  {label: 'Label C', value: 'C'},
                              ])
                          }}
                />

                <FormItem label={'Select2'}
                          name={'Select2'}
                          component={'Select'}
                          xProps={{
                              mode: "multiple",
                              hasClear: true
                          }}
                          isPreview={(values: any) => {
                              return false
                          }}
                          enums={() => {
                              return Promise.resolve([
                                  {label: 'Label A', value: 'A'},
                                  {label: 'Label B', value: 'B'},
                                  {label: 'Label C', value: 'C'},
                              ])
                          }}
                />



                <FormItem label={'Upload1'}
                          name={'Upload1'}
                          component={'Upload'}
                          xProps={{
                              action:"https://www.easy-mock.com/mock/5b713974309d0d7d107a74a3/alifd/upload",
                              shape:"card"
                          }}
                />



                {/*<FormItem label={'FormSubmit'}*/}
                {/*          name={'button2'}*/}
                {/*          component={'FormSubmit'}*/}
                {/*/>*/}

                {/*<FormItem label={'FormReset toDefault'} component={'FormReset'} xProps={{*/}
                {/*    toDefault: true,*/}
                {/*    children: 'FormReset toDefault'*/}
                {/*}}/>*/}

                {/*<FormItem label={' '} name={'button43434'} component={'FormReset'} xProps={{*/}
                {/*    toDefault: false*/}
                {/*}}/>*/}

                <FormItem label={' '}
                          component={'FormButtonGroup'}
                          xProps={{
                              buttons: [
                                  {
                                      component: 'FormSubmit',
                                      text:'提交',
                                      showToast: true,
                                      xProps: {
                                          iconType:'smile',
                                      },
                                  },
                                  {
                                      component: 'FormReset',
                                      toDefault: true
                                  }
                              ]
                          }}
                />
            </Form>
        </PageCard>
    );
}
