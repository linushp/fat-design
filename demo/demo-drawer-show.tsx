import {useState} from 'react'
import {Dialog, Drawer, Button, Message, Box, PageCard} from "../src";

function DemoDrawerShow() {

    const [isOpen, setOpen] = useState(false);


    return (
        <div>
            <PageCard>

                Drawer show 函数

                <Box direction="row" spacing={20}>
                    <Button onClick={() => {
                        Drawer.show({
                            title:"标题",
                            placement:"right",
                            content:'hello',
                            onClose:()=>{
                                console.log('Drawer onClose')
                            },
                            okText:'确认',
                            onOk:()=> {
                                console.log('ok')
                                return new Promise((resolve)=>{
                                    setTimeout(resolve, 1000)
                                })
                            }
                        });
                    }}>
                        right
                    </Button>

                    <Button onClick={() => {
                        Drawer.show({
                            title:"标题",
                            placement:"left",
                            content:'hello',
                            onClose:()=>{
                                console.log('Drawer onClose')
                            },
                            okText:'确认',
                            onOk:()=>{
                                console.log('ok')
                            }
                        });
                    }}>
                        left
                    </Button>

                    <Button onClick={() => {
                        Drawer.show({
                            title:"标题",
                            placement:"top",
                            content:'hello',
                            onClose:()=>{
                                console.log('Drawer onClose')
                            },
                            okText:'确认',
                            onOk:()=>{
                                console.log('ok')
                            }
                        });
                    }}>
                        top
                    </Button>


                    <Button onClick={() => {
                        Drawer.show({
                            title:"标题",
                            placement:"bottom",
                            content:'hello',
                            onClose:()=>{
                                console.log('Drawer onClose')
                            },
                            okText:'确认',
                            onOk:()=>{
                                console.log('ok')
                            }
                        });
                    }}>
                        bottom
                    </Button>
                </Box>
            </PageCard>


            <PageCard>
                Drawer 组件
                <Box direction="row" spacing={20}>
                    <Button onClick={() => {setOpen(true)}}>
                        setOpen(true)
                    </Button>
                </Box>
                <Drawer
                    title={'个性化设置'}
                    // closeMode={'mask'}
                    placement={'right'}
                    visible={isOpen}
                    onClose={()=>{
                        setOpen(false);
                    }}
                    okProps={{
                        children: '保存',
                        type:'primary',
                        text: true,
                        size: 'large',
                    }}
                    footerActions={['ok']}
                >
                    hello
                </Drawer>
            </PageCard>
        </div>


    )
}

export {
    DemoDrawerShow
}
