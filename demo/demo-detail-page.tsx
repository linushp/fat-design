import {DetailPage} from '../src/index';

const CardForm = DetailPage.CardForm;
const FormItem = DetailPage.FormItem;
const Section = DetailPage.Section;
const Summary = DetailPage.Summary;

const formItemLayout = {
    labelCol: {
        fixedSpan: 10,
    },
    wrapperCol: {
        span: 14,
    },
};

const formItemLayout2 = {
    labelCol: {
    },
    wrapperCol: {
    },
};


function DemoDetailPage(){
    return (
        <DetailPage useElevator={true} >

            <Summary dataSource={[
                {
                    label: '状态',
                    value: '良好',
                    type: 'primary'
                },
                {
                    label: '单号',
                    help:'hello',
                    value: '1223892398'
                },
                {
                    label: '下单时间',
                    value: '2023-04-20 19:59:01'
                },
                {
                    label: '支付时间',
                    value: '2023-04-20 19:59:54'
                },
            ]}/>

            <CardForm defaultValues={{name1:'1'}} isPreview={true} {...formItemLayout} >
                    <FormItem name={'name1'}
                              cellProps={{colSpan: 1}}
                              label={'基本信息'}  />
                    <FormItem name={'name2'}
                              label={'name2'} />
                    <FormItem name={'name3'} label={'name3'} component={'Input'} />
                    <FormItem name={'name4'} label={'基本信息基本信息'} component={'Input'} />
                    <FormItem name={'name5'} label={'name5'} component={'Input'} />


                <Section title={'详细信息'} {...formItemLayout2}>
                    <FormItem name={'name11'} label={'name11'} component={'Input'} />
                    <FormItem name={'name21'} label={'name21'} component={'Input'} />
                    <FormItem name={'name31'} label={'name31'} component={'Input'} />
                    <FormItem name={'name41'} label={'name41'} component={'Input'} />
                    <FormItem name={'name51'} label={'name51'} component={'Input'} />
                </Section>

                <Section title={'详细信息'} {...formItemLayout2}>
                    <FormItem name={'name11'} label={'name11'} component={'Input'} />
                    <FormItem name={'name21'} label={'name21'} component={'Input'} />
                    <FormItem name={'name31'} label={'name31'} component={'Input'} />
                    <FormItem name={'name41'} label={'name41'} component={'Input'} />
                    <FormItem name={'name51'} label={'name51'} component={'Input'} />
                </Section>

                <Section title={'详细信息'} {...formItemLayout2}>
                    <FormItem name={'name11'} label={'name11'} component={'Input'} />
                    <FormItem name={'name21'} label={'name21'} component={'Input'} />
                    <FormItem name={'name31'} label={'name31'} component={'Input'} />
                    <FormItem name={'name41'} label={'name41'} component={'Input'} />
                    <FormItem name={'name51'} label={'name51'} component={'Input'} />
                </Section>

            </CardForm>
        </DetailPage>
    );
}

export {
    DemoDetailPage
}
