import {QueryForm} from '../src/index';
import {FormItemProps} from "../src/form2/form-types";


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
            required: true
        },

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


        username9: {label: '名字9'},
        username10: {label: '名字10'},
    },
};

const dataSource = () => {
    const result = [];
    for (let i = 0; i < 5; i++) {
        result.push({
            title: {
                name: `Quotation for 1PCS Nano ${3 + i}.0 controller compatible`
            },
            id: 100306660940 + i,
            time: 2000 + i
        });
    }
    return result;
};

const render = (value:any, index:any, record:any) => {
    return <a href="#">Remove({record.id})</a>;
};

function DemoQueryFormSimple() {

    const onSubmit = (a:any,b:any) => {
        debugger
    }

    return (
        <div style={{
            height: '1000px',
            background: '#f6f7f8',
            padding: '10px'
        }}>
                <QueryForm
                    defaultValues={initialValues}
                    onSubmit={onSubmit}
                    settings={true}
                    settingName="demoQueryFormSimple"
                    autoValidateOnCreated={false}
                    schema={schema}/>
        </div>
    );

}

export {
    DemoQueryFormSimple
}
