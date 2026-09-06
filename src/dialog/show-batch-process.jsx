import { useMemo } from 'react'
import { ComponentsStore } from "../util/comp";
import { PreciseStore, usePreciseValue } from "../hooks/usePreciseStore";
import { pickErrorMessage } from "../util/pick-res-data";


const STATE = {
    NOT_START: 'NOT_START',
    PROCESSING: 'PROCESSING',
    DONE: 'DONE',
}

const dialogStyle = {
    paddingTop: '8px',
    width: '350px',
    height: '90px'
}

const totalCountStyle = {
    marginTop: '10px'
}

const noticeTitleStyle = {
    paddingTop: '2px'
}

function ShowErrorsTable({store, elementDisplayKey}){
    const [elementResultList] = usePreciseValue(store, 'elementResultList');
    const Table = ComponentsStore.getBuildIn('Table');
    const errors = elementResultList.filter(item => !!item.errorMsg);



    const columns = useMemo(() => {
        if (elementDisplayKey) {
            return [
                {
                    dataIndex: `element.${elementDisplayKey}`,
                    title: '数据项',
                    width: '120px',
                },
                {
                    dataIndex: 'errorMsg',
                    title: '错误信息',
                }
            ];
        }

        return [
            {
                dataIndex: 'index',
                title: '序号',
                width: '60px',
            },
            {
                dataIndex: 'errorMsg',
                title: '错误信息',
            }
        ];

    }, [elementDisplayKey]);

    return (
        <div style={{width:'600px'}}>
            <Table
                dataSource={errors}
                columns={columns} size={'small'}  />
        </div>
    )
}

function handleShowError(store, elementDisplayKey) {

    const Dialog = ComponentsStore.getBuildIn('Dialog');

    Dialog.show({
        title:'异常信息',
        content: (  <ShowErrorsTable store={store} elementDisplayKey={elementDisplayKey} />   )
    })
}

function BatchProcessDialog({store, msgCfg, elementDisplayKey}) {

    const Message = ComponentsStore.getBuildIn('Message');
    const Button = ComponentsStore.getBuildIn('Button');

    const [state] = usePreciseValue(store, 'state');
    const [total] = usePreciseValue(store, 'total');
    const [success] = usePreciseValue(store, 'success');
    const [error] = usePreciseValue(store, 'error');

    if (state === STATE.NOT_START) {
        return (
            <div style={dialogStyle}>
                <Message type={'notice'}>
                    <div style={noticeTitleStyle}>
                        请确认：
                    </div>
                    <div style={totalCountStyle}>
                        {msgCfg.confirmMsg || `是否要处理选中的${total}个对象？`}
                    </div>
                </Message>
            </div>
        )
    }
    if (state === STATE.PROCESSING) {
        return (
            <div style={dialogStyle}>
                <Message type={'loading'}>
                    <div style={noticeTitleStyle}>
                        {msgCfg.processMsg || `正在处理中....`}
                    </div>
                    <div style={totalCountStyle}>
                        总量：{total} &nbsp;&nbsp;&nbsp;
                        成功：{success} &nbsp;&nbsp;&nbsp;
                        失败：{error}
                    </div>
                </Message>
            </div>
        )
    }
    if (state === STATE.DONE) {
        return (
            <div style={dialogStyle}>
                <Message type={(error > 0) ? 'error' : 'success'}>
                    <div style={noticeTitleStyle}>任务已结束</div>
                    <div style={totalCountStyle}>
                        总量：{total} &nbsp;&nbsp;&nbsp;
                        成功：{success} &nbsp;&nbsp;&nbsp;
                        {
                            error > 0 ? (
                                <span style={{color:'blue', cursor:'pointer'}}
                                      onClick={()=>{
                                            handleShowError(store, elementDisplayKey)
                                      }}
                                >查看失败：{error}</span>) :
                                (<>失败：{error}</>)
                        }
                    </div>
                </Message>
            </div>
        )
    }
    return null;
}



function buildShowBatchProcess(show) {

    function showBatchProcess({elementList, msgCfg, notifyOnError, onBatchProcessDone, handleProcessElement, elementDisplayKey}) {

        const Message = ComponentsStore.getBuildIn('Message');
        const Notification = ComponentsStore.getBuildIn('Notification');

        if (!elementList || elementList.length === 0) {
            Message.notice("没有待处理数据")
            return;
        }

        const store = new PreciseStore({
            total: elementList.length,
            success: 0,
            error: 0,
            state: STATE.NOT_START
        }, 'equal');


        const onCancel = () => {
            const state = store.getValue('state');
            if (state === STATE.PROCESSING) {
                Message.warning('任务处理中, 请等待...')
                return false;
            }
            return true;
        }

        const notifyMsg = (errorMsg)=>{
            if (notifyOnError) {
                Notification.error({type: 'error', content: errorMsg});
            }
        }

        show({
            content: (
                <BatchProcessDialog store={store} msgCfg={msgCfg || {}} elementDisplayKey={elementDisplayKey}/>
            ),
            onClose:  onCancel,
            onCancel: onCancel,
            onOk: async () => {
                const state = store.getValue('state');

                if (state === STATE.PROCESSING) {
                    return false;
                }

                if (state === STATE.DONE) {
                    return true;
                }

                if (state === STATE.NOT_START) {
                    store.setValueAndCommit('state', STATE.PROCESSING);
                    let errorCount = 0;
                    let successCount = 0;
                    let elementResultList = [];
                    for (let i = 0; i < elementList.length; i++) {
                        const elementObj = elementList[i];
                        try {
                            const res2 = await handleProcessElement(elementObj, i);
                            if (res2.success) {
                                successCount++;
                                elementResultList.push({ element: elementObj, index: i,  result: res2 });
                            } else {
                                errorCount++
                                const errorMsg = pickErrorMessage(res2) || `出错了。任务序号为${i}`;
                                elementResultList.push({ element: elementObj, index: i, result: res2, errorMsg });
                                notifyMsg(errorMsg);
                            }
                        } catch (e) {
                            const errorMsg = pickErrorMessage(e);
                            errorCount++;
                            elementResultList.push({ element: elementObj, index: i,  errorMsg });
                            notifyMsg(errorMsg);
                        }
                        store.setValueAndCommit('error', errorCount);
                        store.setValueAndCommit('success', successCount);
                    }

                    store.setValueAndCommit('state', STATE.DONE);
                    store.setValueAndCommit('elementResultList', elementResultList);

                    if (typeof onBatchProcessDone === 'function') {
                        await onBatchProcessDone({errorCount, successCount, elementResultList });
                    }

                    return false;
                }
            }
        })
    }

    return showBatchProcess
}

export {
    buildShowBatchProcess
}
