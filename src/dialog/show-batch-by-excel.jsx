import dayjs from 'dayjs';
import {useState, useEffect} from 'react';
import Message from '../message';
import {ComponentsStore} from "../util/comp";
import './show-batch-by-excel.scss'

function formatTrimStr(str) {
    if (typeof str === 'string') {
        return str.trim();
    }
    if (typeof str === "undefined" || str == null) {
        return ''
    }
    return "" + str;
}


function formatCellTime(cell) {
    let date = 0;
    // Excel 日期可能是数字类型（从1900年1月1日开始的天数）
    if (typeof cell.v === 'number') {
        // 转换 Excel 数字日期为 JavaScript 时间戳（修正 Excel 1900年闰年bug）
        const excelTimestamp = cell.v - 25569; // 25569是1970-01-01到1900-01-01的天数
        date = new Date(excelTimestamp * 86400 * 1000); // 转换为毫秒
    } else {
        // 文本类型日期直接解析
        date = new Date(cell.v);
    }
    return dayjs(date).format('YYYY-MM-DD')
}


function removeSpecialCharacters(str) {
    return str.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '');
}

function useLoadExcelScript(loadExcelScriptFn) {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const XLSX = window.XLSX;
        if (XLSX) {
            setLoading(false);
            return;
        }

        setLoading(true);
        loadExcelScriptFn().then(() => {
            setLoading(false);
        }, err => {
            console.error('[loadExcelScriptFn]', err);
        })
    }, []);
    return [loading];
}


function BatchProcessByExcelForm({
                                     dialogRef,
                                     loadExcelScript,
                                     excelTemplateName,
                                     excelTemplateUrl,
                                 }) {
    const Loading = ComponentsStore.getBuildIn('Loading');
    const Upload = ComponentsStore.getBuildIn('Upload');

    const [fileList, setFileList] = useState([]);
    const [tick, setTick] = useState(0);

    const onChange = (value) => {
        dialogRef.currentFile = value;
        setFileList(value); // 虽然触发了，但可能是同一个list，不会导致页面渲染。
        setTick(Date.now());
    }

    const locale = {
        drag: {
            text: "点击或拖拽文件到此处上传",
            hint: "仅支持上传Excel文件 (.xlsx)",
        }
    }


    const [loading] = useLoadExcelScript(loadExcelScript);

    if (loading) {
        return (
            <div className='FatdBatchProcessByExcelForm'>
                <Loading/>
            </div>
        )
    }


    const renderDownloadTemplate = (tick) => {
        console.log('renderDownloadTemplate fileList', fileList, fileList.length)
        if (Array.isArray(fileList) && fileList.length > 0) {
            return null
        }
        return (
            <div style={{paddingTop: '5px'}} data-tick={tick}>
                <a href={excelTemplateUrl} target="_blank"
                   download={excelTemplateName}>点击下载模板 《{excelTemplateName}》</a>
            </div>
        )
    }

    return (
        <div className='FatdBatchProcessByExcelForm'>

            <Upload.Dragger
                accept=".xlsx"
                listType="text"
                autoUpload={false}
                limit={1}
                action="/demo"
                dragable={true}
                onChange={onChange}
                locale={locale}
            />
            {renderDownloadTemplate(tick)}
        </div>

    )
}


//
//
// const fieldMappingDemo = [
//     {
//         source: '姓名',
//         target: 'name',
//         type: 'string',
//     },
//     {
//         source: '出生日期',
//         target: 'birthday',
//         type: 'date',
//     },
//     {
//         source: '保持原状', // 在validate函数里可以自己处理。
//         target: 'origin',
//         type: 'origin',
//     },
// ];


function findFieldMappingObject(fieldMappingList, source) {
    return fieldMappingList.find(mapping => {
        return mapping.source === source;
    });
}


function toTableData(workbook, fieldMappingList) {
    const XLSX = window.XLSX;

    const sheetName = workbook.SheetNames[0]; // 获取第一个工作表的名称
    const worksheet = workbook.Sheets[sheetName]; // 获取对应的工作表
    const header = []; // 存储表头
    let range = XLSX.utils.decode_range(worksheet['!ref']); // 获取数据范围
    for (let col = range.s.c; col <= range.e.c; ++col) {
        const cell = worksheet[XLSX.utils.encode_cell({r: range.s.r, c: col})]; // 获取表头单元格
        if (cell && cell.v) {
            // 去除表头中的星号和空格，以实现容错匹配
            header.push(cell.v.toString().replace(/[* ]/g, ''));
        }
    }
    const data = []; // 存储转换后的数据
    for (let row = range.s.r + 1; row <= range.e.r; ++row) {
        const rowData = {};
        for (let col = range.s.c; col <= range.e.c; ++col) {
            const cell = worksheet[XLSX.utils.encode_cell({r: row, c: col})]; // 获取数据单元格
            if (cell) {
                const key = header[col];
                const fieldMapping = findFieldMappingObject(fieldMappingList, key);
                if (fieldMapping) {
                    if (fieldMapping.type === 'string') {
                        rowData[fieldMapping.target] = formatTrimStr(cell.v);
                    } else if (fieldMapping.type === 'date') {
                        rowData[fieldMapping.target] = formatCellTime(cell);
                    } else if (fieldMapping.type === 'origin') {
                        rowData[fieldMapping.target] = cell;
                    } else {
                        rowData[fieldMapping.target] = cell.v;
                    }
                }
            }
        }
        if (Object.keys(rowData).length > 0) {
            data.push(rowData);
        }
    }

    return data;
}


// 处理Excel文件
function processExcelFile(file, fieldMappingList) {

    return new Promise((resolve, reject) => {

        Message.loading({content: 'Excel文件解析中...', duration: 0});

        const reader = new FileReader();

        reader.onload = function (e) {
            try {
                const XLSX = window.XLSX;

                if (!XLSX) {
                    const msg = "window.XLSX 不存在，解析Excel需要XLSX，请保证加载成功。loadExcelScript参数做为加载函数"
                    Message.destroy();
                    Message.error(msg);
                    console.error(msg);
                    reject(msg);
                }

                // 解析Excel文件
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, {type: 'array'});
                const tableData = toTableData(workbook, fieldMappingList);
                Message.destroy();
                resolve(tableData);
            } catch (error) {
                Message.destroy();
                console.error('解析Excel失败:', error);
                Message.error('解析文件失败，请确认文件格式正确');
                reject(error);
            } finally {

            }
        };

        reader.onerror = function () {
            Message.destroy();
            Message.error('读取文件时发生错误');
            reject(new Error('读取文件时发生错误'));
        };

        reader.readAsArrayBuffer(file);
    })
}


function startBatchImport(elementList, {onBatchProcessDone, handleProcessElement, elementDisplayKey, notifyOnError}) {

    const Dialog = ComponentsStore.getBuildIn('Dialog');

    const msgCfg = {
        processMsg: "正在导入中....",
        confirmMsg: `发现有${elementList.length}条数据可以导入。是否导入？`
    };


    Dialog.showBatchProcess({
        elementList,
        msgCfg,
        onBatchProcessDone,
        handleProcessElement,
        elementDisplayKey,
        notifyOnError
    });
}


function showParsedExcelTableData({
                                      tableData,
                                      fieldMappingList,
                                      onBatchProcessDone,
                                      handleProcessElement,
                                      elementDisplayKey,
                                      notifyOnError
                                  }) {
    const Dialog = ComponentsStore.getBuildIn('Dialog');
    const Tag = ComponentsStore.getBuildIn('Tag');

    const tableColumns0 = fieldMappingList.map((fieldMapping) => {
        const cell = (value, index, record) => {
            return (
                <div className={'FatdBatchProcessByExcelTableCell'}>{value}</div>
            )
        };
        return {title: fieldMapping.source, dataIndex: fieldMapping.target, width: '120px', cell}
    });

    const renderErrorMessageCell = (value) => {
        if (!value) {
            return (
                <Tag size="small" color={'green'}>检查正常</Tag>
            )
        }
        return (
            <div className={'FatdBatchProcessByExcelTableCell'} style={{color: 'red'}}>{value}</div>
        )
    }

    const tableColumns = [...tableColumns0, {
        title: '检查结果',
        dataIndex: '__import_error_message__',
        width: '120px',
        lock: 'right',
        cell: renderErrorMessageCell
    }];


    Dialog.showTable({
        title: '导入数据信息（数据完整性检查）',
        contentStyle: {
            width: 'calc(100vw - 200px)',
            height: 'calc(100vh - 300px)',
        },
        tableProProps: {
            isEnableRowSelection: false,
            initPaginationProps: null,
            initTableProps: {
                size: 'small',
                fixedHeader: true,
                columns: tableColumns,
            },
            onQuery: (formParams, otherParams) => {
                return new Promise((resolve) => {
                    resolve({
                        total: tableData.length,
                        dataSource: tableData
                    });
                });
            },
        },
        okText: '下一步(开始导入)',
        onOk: async () => {

            if (!tableData || tableData.length === 0) {
                Message.error('请检查导入数据，没有解析出正确的数据');
                return false;
            }

            const errorItems = tableData.filter(item => !!item['__import_error_message__']);
            if (errorItems.length > 0) {
                Message.error('存在错误信息，请检查导入的Excel文件数据，修改后再重新尝试导入');
                return false;
            }

            startBatchImport(tableData, {onBatchProcessDone, handleProcessElement, elementDisplayKey, notifyOnError});

            return true;
        },
    });

    return Promise.resolve();
}


function buildShowBatchByExcel(show) {
    return function showBatchByExcel(config = {}) {
        const {
            title,
            excelTemplateName, //字符串：excel导入模板的模板名称。 不能为空
            excelTemplateUrl, //字符串：excel导入模板的模板的下载地址URL。 不能为空
            fieldMappingList, // 字段映射：表格中的表头和我们需要的结构化字段的映射关系

            loadExcelScript, //函数：加载window.XLSX, 不能为空
            preprocessTableData, //函数：导入前校验数据完整性，也可以对数据设置一些字段

            onBatchProcessDone, // 函数：批量导入完成事件
            handleProcessElement, // 函数：执行单个导入
            elementDisplayKey,
            notifyOnError,

            ...otherProps
        } = config;

        const dialogRef = {
            currentFile: null,
        };

        return show({
            title: title || '使用Excel批量导入',
            content: (
                <BatchProcessByExcelForm dialogRef={dialogRef}
                                         loadExcelScript={loadExcelScript}
                                         excelTemplateName={excelTemplateName}
                                         excelTemplateUrl={excelTemplateUrl}/>),
            okText: '下一步(数据解析)',
            onOk: async () => {
                if (!dialogRef.currentFile || dialogRef.currentFile.length === 0) {
                    Message.error('请选择要导入的文件');
                    return false;
                }
                const currentFile = dialogRef.currentFile[0];
                const tableData = await processExcelFile(currentFile.originFileObj, fieldMappingList);
                // 在展示表格之前统一预处理一下数据
                if (typeof preprocessTableData === 'function') {
                    await preprocessTableData(tableData);
                }
                await showParsedExcelTableData({
                    tableData,
                    fieldMappingList,
                    onBatchProcessDone,
                    handleProcessElement,
                    elementDisplayKey,
                    notifyOnError
                });
                return true;
            },
            ...otherProps,
        })
    }
}

export {
    buildShowBatchByExcel
}