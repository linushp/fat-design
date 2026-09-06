import {Dialog, Button, Message, Box, PageCard} from "../src";


function DemoDialogShowBatchProcessJsx1() {
    const handleBatchProcess = ()=>{
        const elementList = new Array(200).fill(0).fill(0).map((x,i)=>{
            return {
                index:i,
                name: Date.now()
            }
        });
        Dialog.showBatchProcess({

            elementDisplayKey: 'name',

            elementList: elementList,


            onBatchProcessDone: ()=>{
                Message.success('处理完成')
            }, // 函数：批量导入完成事件


            handleProcessElement: (elementObj, index)=>{
                return new Promise((resolve, reject)=>{
                    setTimeout(() => {


                        // 模拟处理失败
                        if (index % 2 ===0) {
                            reject({
                                success: false,
                                message: 'Demo页面，处理失败了，序号是' + index
                            });
                            return;
                        }

                        resolve({
                            success: true,
                        });
                    },5)
                })
            }, // 函数：执行单个导入
        })
    }
    return (
        <PageCard>
            <Button onClick={handleBatchProcess}>批量处理数据</Button>
        </PageCard>
    )
}

function DemoDialogShowBatchProcessJsx2ByExcel() {
    const handleBatchProcessByExcel = ()=>{

        // 员工工号	员工姓名	员工性别	出生日期	家庭住址 手机号	身份证号

        const fieldMappingList = [
            {
                source: '员工工号',
                target: 'empNo',
                type: 'string',
            },
            {
                source: '员工姓名',
                target: 'empName',
                type: 'string',
            },
            {
                source: '员工性别',
                target: 'empSexText',
                type: 'string',
            },
            {
                source: '出生日期',
                target: 'birthday',
                type: 'date',
            },
            {
                source: '家庭住址',
                target: 'homeAddress',
                type: 'string',
            },
            {
                source: '手机号',
                target: 'phoneNumber',
                type: 'string',
            },
            {
                source: '身份证号',
                target: 'idCardNumber',
                type: 'string',
            },
        ]

        Dialog.showBatchByExcel({

            /**
             * 字符串：excel导入模板的模板名称。 不能为空
             */
            excelTemplateName: '员工基本信息表.xlsx',

            /**
             * 字符串：excel导入模板的模板的下载地址URL。 不能为空
             */
            excelTemplateUrl: 'https://cdnjsx.oss-cn-shanghai.aliyuncs.com/xlsx/template/%E5%91%98%E5%B7%A5%E5%9F%BA%E6%9C%AC%E4%BF%A1%E6%81%AF%E8%A1%A8.xlsx',


            /**
             * 字段映射：表格中的表头和我们需要的结构化字段的映射关系
             */
            fieldMappingList,


            /**
             * 函数：加载window.XLSX使用的脚本文件, 不能为空
             * @returns {Promise<void>}
             */
            loadExcelScript: ()=> {
              const url = 'https://cdnjsx.oss-cn-shanghai.aliyuncs.com/xlsx/dist/xlsx.full.min.js';
              return new Promise((resolve, reject)=>{
                  const script = document.createElement('script');
                  script.type = 'text/javascript';
                  script.src = url;
                  script.onload = resolve
                  script.onerror = reject
                  document.body.appendChild(script);
              })
            },


            elementDisplayKey: 'empName',

            /**
             * 函数：导入前校验数据完整性，也可以对数据设置一些字段
             * @param tableData
             */
            preprocessTableData: (tableData)=>{
                for(let i=0;i<tableData.length;i++){
                    const row=tableData[i];
                    if (!row.idCardNumber) {
                        row['__import_error_message__'] = '身份证号不能为空';
                    }
                }
            },

            /**
             * 函数：批量导入完成事件
             */
            onBatchProcessDone: ()=>{
                Message.success('处理完成')
            },
            handleProcessElement: (elementObj, index)=>{
                return new Promise((resolve, reject)=>{
                    setTimeout(() => {



                        // 模拟处理失败
                        if (index % 2 ===0) {
                            reject({
                                success: false,
                                message: 'Demo页面，处理失败了，序号是' + index
                            });
                            return;
                        }

                        resolve({
                            success: true,
                        });


                    },50)
                })
            }, // 函数：执行单个导入
        })
    }
    return (
        <PageCard>
            <Button onClick={handleBatchProcessByExcel}>批量处理数据（通过Excel导入）</Button>
        </PageCard>
    )
}

function DemoDialogShowBatchProcessJsx() {
    return (
        <>
            <DemoDialogShowBatchProcessJsx1/>
            <DemoDialogShowBatchProcessJsx2ByExcel/>
        </>
    )
}

export {
    DemoDialogShowBatchProcessJsx
}