import {Dialog, Drawer, Button, Message, Box, PageCard} from "../src";

function DemoDrawerShow() {

    return (
        <PageCard>

            Drawer

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

    )
}

export {
    DemoDrawerShow
}
