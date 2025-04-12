import {
    Button,
    PageCard,
    PopConfirm,
    Message,
    Box,
    Notification,
    BalloonConfirm,
    Loading,
    Balloon,
    Icon
} from "../src/index";

const Message2 = Message.Message2;

const SaveButton = Button.SaveButton;
const ActionButton = Button.ActionButton;

function DemoButtons() {


    const handleSave = () => {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 2000)
        });
    }

    return (
        <PageCard>

            <div>
                <Box direction="row" spacing={20}>
                    <Button type="normal">Normal</Button>
                    <Button type="primary">primary</Button>
                    <Button type="secondary">Secondary</Button>
                </Box>
                <br/>
                <Box direction="row" spacing={20}>
                    <Button type="normal" text>
                        Normal
                    </Button>
                    <Button type="primary" text>
                        Primary
                    </Button>
                    <Button type="secondary" text>
                        Secondary
                    </Button>
                </Box>
                <br/>
                <Box direction="row" spacing={20}>
                    <Button type="normal" warning>
                        Normal
                    </Button>
                    <Button type="primary" warning>
                        Primary
                    </Button>
                </Box>
            </div>

            <PageCard.Divider/>


            ActionButton

            <Box direction="row" spacing={20}>
                <ActionButton type={'primary'}
                              doubleConfirm
                              onClick={handleSave}> 二次确认（对话框）</ActionButton>
                <ActionButton type={'secondary'}
                              doubleConfirm
                              doubleConfirmConfig={{type: 'balloon'}}
                              onClick={handleSave}> 二次确认</ActionButton>
                <ActionButton type={'primary'} onClick={handleSave}> 无确认</ActionButton>
                <SaveButton type={'secondary'} onClick={handleSave}> 保存按钮</SaveButton>
                <SaveButton type={'secondary'} onClick={handleSave}> 保存按钮2</SaveButton>
            </Box>

            <PageCard.Divider/>


            Message

            <Box direction="row" spacing={20}>

                <Button type={'primary'} onClick={() => {
                    Message.info({
                        title: 'Hello, Fat Design!',
                        duration: 1000 * 3600
                    });
                }}>
                    info
                </Button>

                <Button type={'primary'} onClick={() => {
                    Message.success('Hello, Fat Design!');
                }}>
                    success
                </Button>

                <Button type={'primary'} onClick={() => {
                    Message.error('Hello, Fat Design!');
                }}>
                    error
                </Button>


                <Button type={'primary'} onClick={() => {
                    Message.warning('Hello, Fat Design!');
                }}>
                    warning
                </Button>


                <Button type={'primary'} onClick={() => {
                    Message.loading('Hello, Fat Design!');
                }}>
                    loading
                </Button>

                <Button type={'primary'} onClick={() => {
                    Message.notice('Hello, Fat Design!');
                }}>
                    notice
                </Button>

                <Button type={'primary'} onClick={() => {
                    Message.open({
                        type: 'success',
                        iconType: 'smile',
                        title: 'hello open success'
                    });
                }}>
                    open
                </Button>

                <Button type={'primary'} onClick={() => {
                    Message.close();
                }}>
                    close
                </Button>


                <Button type={'primary'} onClick={() => {
                    Message.destroy();
                }}>
                    destroy
                </Button>

            </Box>


            <PageCard.Divider/>
            Message2

            <Box direction="row" spacing={20}>

                <Button type={'primary'} onClick={() => {
                    Message2.info('Hello, Fat Design!');
                }}>
                    info
                </Button>

                <Button type={'primary'} onClick={() => {
                    Message2.success('Hello, Fat Design!');
                }}>
                    success
                </Button>

                <Button type={'primary'} onClick={() => {
                    Message2.error('Hello, Fat Design!');
                }}>
                    error
                </Button>


                <Button type={'primary'} onClick={() => {
                    Message2.warning('Hello, Fat Design!');
                }}>
                    warning
                </Button>


                <Button type={'primary'} onClick={() => {
                    Message2.loading('Hello, Fat Design!');
                }}>
                    loading
                </Button>

                <Button type={'primary'} onClick={() => {
                    Message2.notice('Hello, Fat Design!');
                }}>
                    notice
                </Button>

                <Button type={'primary'} onClick={() => {
                    Message2.open({
                        type: 'error',
                        iconType: 'smile',
                        title: 'hello open success'
                    });
                }}>
                    open
                </Button>

                <Button type={'primary'} onClick={() => {
                    Message2.close();
                }}>
                    close
                </Button>


                <Button type={'primary'} onClick={() => {
                    Message2.destroy();
                }}>
                    destroy
                </Button>

            </Box>


            <PageCard.Divider/>

            Notification

            <Box direction="row" spacing={20}>
                <Button type={'primary'} onClick={() => {
                    Notification.info(
                        {
                            title: 'Hello, Fat Design!',
                            content: 'Hello, Fat Design! content'
                        }
                    );
                }}>
                    info
                </Button>


                <Button type={'primary'} onClick={() => {
                    Notification.success(
                        {
                            title: 'Hello, Fat Design!',
                            content: 'Hello, Fat Design! content'
                        }
                    );
                }}>
                    success
                </Button>


                <Button type={'primary'} onClick={() => {
                    Notification.error(
                        {
                            title: 'Hello, Fat Design!',
                            content: 'Hello, Fat Design! content'
                        }
                    );
                }}>
                    error
                </Button>


                <Button type={'primary'} onClick={() => {
                    Notification.warning(
                        {
                            title: 'Hello, Fat Design!',
                            content: 'Hello, Fat Design! content'
                        }
                    );
                }}>
                    warning
                </Button>


                <Button type={'primary'} onClick={() => {
                    Notification.loading(
                        {
                            title: 'Hello, Fat Design!',
                            content: 'Hello, Fat Design! content'
                        }
                    );
                }}>
                    loading
                </Button>

                <Button type={'primary'} onClick={() => {

                    Notification.notice(
                        {
                            title: 'Hello, Fat Design!',
                            content: 'Hello, Fat Design! content'
                        }
                    );
                }}>
                    notice
                </Button>

                <Button type={'primary'} onClick={() => {
                    Notification.open({
                        type: 'error',
                        iconType: 'smile',
                        title: 'hello open success',
                        content: 'Hello, Fat Design! content'
                    });
                }}>
                    open
                </Button>

                <Button type={'primary'} onClick={() => {
                    Notification.close();
                }}>
                    close
                </Button>


                <Button type={'primary'} onClick={() => {
                    Notification.destroy();
                }}>
                    destroy
                </Button>


            </Box>


            <PageCard.Divider/>

            BalloonConfirm

            <Box direction="row" spacing={20}>


                <BalloonConfirm
                    title={'hello'}
                    trigger={<Button>BalloonConfirm</Button>}
                    onOk={() => {
                        return new Promise((resolve, reject) => {
                            setTimeout(resolve, 1000)
                        })
                    }}
                >
                    是否确定删除订单呢？
                </BalloonConfirm>


                <PopConfirm
                    title={"是否确定删除订单呢？"}
                    onOk={() => {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                reject({success: false, message: 'aa'})
                            }, 1000)
                        })
                    }}
                >
                    <Button>PopConfirm</Button>
                </PopConfirm>


            </Box>


            <PageCard.Divider/>

            Balloon

            <div direction="row" spacing={20}>


                <Balloon
                    title={'hello'}
                    align={'r'}
                    trigger={<Icon type={'help'} size={'small'}/>}
                >
                    这是是一段文字描述
                </Balloon>


                <Balloon
                    align={'r'}
                    trigger={<Icon type={'help'} size={'small'}/>}
                >
                    这是是一段文字描述
                </Balloon>


            </div>


            {/*<PageCard.Divider />*/}

            {/*Loading*/}

            {/*<div>*/}
            {/*    <Loading tip="large" size="large" style={{width:'100%', height: 200}}>*/}
            {/*        <div className="demo-size" style={{width:'100%'}}>test</div>*/}
            {/*    </Loading>*/}
            {/*</div>*/}


        </PageCard>
    )
}

export {
    DemoButtons
}
