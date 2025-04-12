import React, {useState} from 'react'
import {Form, Input, Select} from '../src/index';
import './index.css'

const FormItem = Form.Item as any;
const FormSubmit = Form.Submit as any;

const initialValues = {
    name1: 'preview',
    name2: '222',
    name3: '333',
    name4: '444',
    Select1: 'AAA'
};


const arr: any = [];
for (let i = 0; i < 1; i++) {
    arr.push({});
}

const Option = Select.Option;

export function DemoFormTable() {


    const [state, setState] = useState(0);

    const onSubmit = (values: any, stateMap: any) => {
        debugger;
    }

    const onCreated = (values, {formStore, formActions}: any) => {
        window.xx_formStore = formStore;
        window.xx_formActions = formActions;
    }


    return (
        <div style={{width: '500px', marginLeft: '30px'}}>

            <button onClick={() => {
                setState(Date.now());
            }}>A
            </button>

            <Form defaultValues={initialValues}
                  labelAlign={'left'}
                  useLabelForErrorMessage
                  components={{}}
                  onSubmit={onSubmit}
                  onCreated={onCreated}
                  helpPos={'tip'}
            >
                <div>

                    <table>

                        <tr>
                            <td>
                                <FormItem name={'name1'}
                                          component={'Input'}
                                          length={11}
                                          required
                                />
                            </td>

                            <td>
                                <FormItem  name={'name2'}
                                          component={'Input'}
                                          length={11}
                                          required
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <FormItem name={'name3'}
                                          component={'Input'}
                                          length={11}
                                          required
                                />
                            </td>

                            <td>
                                <FormItem  name={'name4'}
                                          component={'Input'}
                                          length={11}
                                          required
                                />
                            </td>
                        </tr>


                    </table>


                </div>
            </Form>
        </div>
    );
}
