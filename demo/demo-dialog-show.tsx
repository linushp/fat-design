import {Dialog, Button, Message, Box, PageCard} from "../src";


const dataSource = (formParams: any, otherParams: any = {}) => {
    const username1 = formParams.username1;
    const {current, pageSize, filterValue} = otherParams;
    const result: any[] = [];
    for (let i = 0; i < pageSize; i++) {
        result.push({
            title: {
                name: ` ${3 + i}.0 ${username1} === ${filterValue}`
            },
            id: Date.now() + current + '' + i,
            time: Date.now() + 200 * i,
            yes: i % 2 === 0
        });
    }
    return result;
};

const sectionTitle = {
    lineHeight: '30px'
};


const MyComp = ({fnRef, a})=>{

    fnRef.setFn('onOk',()=>{
        console.log('fnRef.onOk')
        return false;
    });

    fnRef.setFn('onFormat',()=>{
        console.log('fnRef.onFormat')
        return false;
    });


    return (
        <div>{a}</div>
    )
}


function DemoDialogShow() {

    return (
        <PageCard>

            <div style={sectionTitle}>
                showInput
            </div>

            <Box direction="row" spacing={20}>

                <Button onClick={() => {
                    Dialog.showInput({
                        title: '确认审批通过',
                        label: '意见',
                        onOk(v: any) {
                            return new Promise((resolve) => {
                                setTimeout(() => {
                                    Message.success('OK')
                                    resolve('');
                                }, 3000)
                            })
                        }
                    });
                }}>
                    单行输入
                </Button>

                <Button onClick={() => {
                    Dialog.showInput({
                        title: '确认审批通过',
                        label: '确认审批通过(Are you sure ?)',
                        formProps: {
                            labelAlign: 'top',
                        },
                        onOk(v: any) {
                            return new Promise((resolve) => {
                                setTimeout(() => {
                                    Message.success('OK')
                                    resolve('');
                                }, 3000)
                            })
                        }
                    });
                }}>
                    单行输入 labelAlign:'top'
                </Button>

                <Button onClick={() => {
                    Dialog.showInput({
                        type: 'notice',
                        title: '确认审批通过',
                        label: '审批意见',
                        placeholder: '请输入审批意见?',
                        onOk(v: any) {
                            return new Promise((resolve) => {
                                setTimeout(() => {
                                    Message.success('OK')
                                    resolve('');
                                }, 3000)
                            })
                        }
                    });
                }}>
                    单行输入notice
                </Button>

                <Button onClick={() => {
                    Dialog.showInput({
                        mode: 'textareaMode',
                        title: '确认审批通过',
                        label: '请输入审批意见',
                        okText: '审批通过',
                        deleteText: '删除',
                        footerActions: ['ok', 'cancel', 'delete'],
                        onOk(v: any) {
                            debugger
                            return new Promise((resolve) => {
                                setTimeout(() => {
                                    Message.success('OK')
                                    resolve('');
                                }, 3000)
                            })
                        }
                    });
                }}>
                    多行输入
                </Button>

                <Button onClick={() => {
                    Dialog.showInput({
                        type: 'confirm',
                        title: '确认审批通过',
                        mode: 'textareaMode',
                        label: '请输入审批意见',
                        placeholder: '请输入审批意见??',
                        onOk(v: any) {
                            return new Promise((resolve) => {
                                setTimeout(() => {
                                    Message.success('OK')
                                    resolve('');
                                }, 3000)
                            })
                        }
                    });
                }}>
                    多行输入confirm
                </Button>

                <Button onClick={() => {
                    Dialog.showInput({
                        title: '确认审批通过',
                        mode: 'textareaMode',
                        label: '请输入审批意见',
                        placeholder: '请输入审批意见??',
                        bottomTips: '下方提示信息',
                        topTips: '上方提示文案',
                        // required:false,
                        onOk(v: any) {
                            return new Promise((resolve) => {
                                setTimeout(() => {
                                    Message.success('OK')
                                    resolve('');
                                }, 3000)
                            })
                        }
                    });
                }}>
                    多行输入Tips
                </Button>
                <Button onClick={() => {
                    Dialog.showInput({
                        type: 'confirm',
                        title: '确认审批通过',
                        mode: 'textareaMode',
                        label: '请输入审批意见',
                        placeholder: '请输入审批意见??',
                        bottomTips: '下方提示信息',
                        topTips: '上方提示文案',
                        // required:false,
                        onOk(v: any) {
                            return new Promise((resolve) => {
                                setTimeout(() => {
                                    Message.success('OK')
                                    resolve('');
                                }, 3000)
                            })
                        }
                    });
                }}>
                    多行输入confirm Tips
                </Button>


            </Box>

            <div style={sectionTitle}>
                showBatchInput
            </div>

            <Box direction="row" spacing={20}>

                <div style={sectionTitle}>
                    <Button onClick={() => {
                        Dialog.showBatchInput({
                            onOk(v: any) {
                                console.log(v);
                                return new Promise((resolve) => {
                                    setTimeout(() => {
                                        Message.success('OK')
                                        resolve('');
                                    }, 3000)
                                })
                            }
                        });
                    }}>
                        showBatchInput
                    </Button>
                </div>

            </Box>


            <div style={sectionTitle}>
                show
            </div>

            <Box direction="row" spacing={20}>

                <Button onClick={() => {
                    window.confirmRef = Dialog.confirm({
                        title: '请确认标题',
                        content: '请确认的内容',
                        footerActions: ['ok', 'cancel'],
                        onOk(v: any) {
                            return new Promise((resolve) => {
                                setTimeout(() => {
                                    Message.success('OK')
                                    resolve();
                                }, 300)
                            })
                        }
                    });
                }}>
                    confirm
                </Button>


                <Button onClick={() => {
                    window.confirmRef = Dialog.alert({
                        title: '请确认标题',
                        content: '请确认的内容',
                        onOk(v: any) {
                            return new Promise((resolve) => {
                                setTimeout(() => {
                                    Message.success('OK')
                                    resolve(null);
                                }, 300)
                            })
                        }
                    });
                }}>
                    alert
                </Button>

                <Button onClick={() => {
                    window.confirmRef = Dialog.success({
                        title: '请确认标题',
                        content: '请确认的内容',
                        onOk(v: any) {
                            return new Promise((resolve) => {
                                setTimeout(() => {
                                    Message.success('OK')
                                    resolve();
                                }, 300)
                            })
                        }
                    });
                }}>
                    success
                </Button>

                <Button onClick={() => {
                    window.confirmRef = Dialog.error({
                        title: '请确认标题',
                        content: '请确认的内容',
                        onOk(v: any) {
                            return new Promise((resolve) => {
                                setTimeout(() => {
                                    Message.success('OK')
                                    resolve();
                                }, 300)
                            })
                        }
                    });
                }}>
                    error
                </Button>

                <Button onClick={() => {
                    window.confirmRef = Dialog.warning({
                        title: '请确认标题',
                        content: '请确认的内容',
                        onOk(v: any) {
                            return new Promise((resolve) => {
                                setTimeout(() => {
                                    Message.success('OK')
                                    resolve();
                                }, 300)
                            })
                        }
                    });
                }}>
                    warning
                </Button>


                <Button onClick={() => {
                    window.confirmRef = Dialog.notice({
                        title: '请确认标题',
                        content: '请确认的内容',
                        onOk(v: any) {
                            return new Promise((resolve) => {
                                setTimeout(() => {
                                    Message.success('OK')
                                    resolve();
                                }, 300)
                            })
                        }
                    });
                }}>
                    notice
                </Button>


                <Button onClick={() => {
                    window.confirmRef = Dialog.help({
                        title: '请确认标题',
                        content: '请确认的内容',
                        onOk(v: any) {
                            return new Promise((resolve) => {
                                setTimeout(() => {
                                    Message.success('OK')
                                    resolve();
                                }, 300)
                            })
                        }
                    });
                }}>
                    help
                </Button>


            </Box>

            <div style={sectionTitle}>
                showTable
            </div>

            <Box direction="row" spacing={20}>


                <Button onClick={() => {
                    Dialog.showTable({
                        title: '查看日志',
                        contentStyle: {
                            width: 700,
                        },
                        tableProProps: {
                            isEnableRowSelection: false,
                            initPaginationProps: {
                                pageSize: 10
                            }, //显示分页
                            initTableProps: {
                                size: 'small',
                                fixedHeader: true,
                                columns: [
                                    {title: '姓名', dataIndex: 'id', width: '150px'},
                                    {title: '姓名', dataIndex: 'id', width: '150px'},
                                    {title: '标题', dataIndex: 'title.name', width: '180px'},
                                ]
                            },
                            onQuery: (formParams: any, otherParams: any) => {
                                return new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        resolve({
                                            total: 100,
                                            dataSource: dataSource(formParams, otherParams)
                                        })
                                    }, 500)
                                })
                            },
                        },
                    })


                }}>
                    showTable small
                </Button>


                <Button onClick={() => {


                    const schema = {
                        type: 'object',
                        properties: {
                            username1: {
                                label: '名字1',
                                component: 'Input',
                                required: true,
                                xProps: {
                                    hasClear: true,
                                    // style: {width: 200}
                                }
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
                            },
                        },
                    };

                    Dialog.showTable({
                        title: '查看日志',
                        contentStyle: {
                            width: 900,
                        },
                        tableProProps: {
                            isEnableRowSelection: false, // 关闭行选择
                            initPaginationProps: {}, //显示分页
                            initTableProps: {
                                size: 'medium',
                                fixedHeader: true,
                                columns: [
                                    {title: '姓名', dataIndex: 'id', width: '150px'},
                                    {title: '姓名', dataIndex: 'id', width: '150px'},
                                    {title: '标题', dataIndex: 'title.name', width: '180px'},
                                ]
                            },
                            onQuery: (formParams: any, otherParams: any) => {
                                return new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        resolve({
                                            total: 100,
                                            dataSource: dataSource(formParams, otherParams)
                                        })
                                    }, 500)
                                })
                            },
                        },
                    })


                }}>
                    showTable medium
                </Button>


            </Box>

            <div style={sectionTitle}>
                showDialogForm
            </div>

            <Box direction="row" spacing={20}>
                <Button onClick={() => {
                    const formProps = {
                        defaultValues: {
                            dict_type: '1'
                        },
                        labelCol: {
                            span: 6,
                        },
                        wrapperCol: {
                            span: 15,
                        },
                        schema: {
                            type: 'object',
                            properties: {
                                dict_code: {
                                    label: '字典编码',
                                    component: 'Input',
                                    maxLength: 100,
                                    required: true,
                                    isPreview: false,
                                    xProps: {
                                        hasClear: true
                                    }
                                },
                                dict_name: {
                                    label: '字典名称',
                                    component: 'Input',
                                    maxLength: 100,
                                    required: true,
                                    xProps: {
                                        hasClear: true
                                    }
                                },
                                dict_type: {
                                    label: '字典类型',
                                    component: 'Select',
                                    required: true,
                                    enums(a: any, b: any) {
                                        return [
                                            {label: '普通', value: '1'},
                                            {label: '树状', value: '2'}
                                        ]
                                    },
                                    xProps: {
                                        hasClear: true
                                    }
                                },

                                dict_desc: {
                                    label: '描述',
                                    component: 'Input.TextArea',
                                    maxLength: 200,
                                    xProps: {
                                        maxLength: 200,
                                        showLimitHint: true,
                                        hasClear: true
                                    }
                                },

                                ext_info_desc: {
                                    label: '扩展字段编辑器',
                                    component: 'Input.TextArea',
                                    maxLength: 2000,
                                    xProps: {
                                        maxLength: 2000,
                                        showLimitHint: true,
                                        hasClear: true
                                    }
                                }
                            }
                        }

                    }
                    Dialog.showForm({
                        title: '数据字典创建',
                        formProps,
                        contentStyle: {minHeight: 280}
                    })
                }}> showForm </Button>
            </Box>


            <div style={sectionTitle}>
                noPadding
            </div>

            <Box direction="row" spacing={20}>
                <Button onClick={() => {
                    Dialog.show({
                        noPadding: true,
                        needWrapper: false,
                        footer: false,
                        style: {width: '500px', height: '300px', border: 'none'},
                        closeMode: ['close', 'mask', 'esc'],
                        onClose: () => {
                            // debugger;
                        },
                        content: (
                            <img style={{width: '500px', height: '300px'}}
                                 src={'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'}/>
                        )
                    })
                }}>无边框</Button>
            </Box>


            <div style={sectionTitle}>
                showComp
            </div>

            <Box direction="row" spacing={20}>
                <Button onClick={() => {
                    Dialog.showComp({
                        xProps: {a:1,b:2},
                        component: MyComp,
                        footerActions: ['ok', 'cancel', 'format'],
                        formatProps: {children:'格式化'},
                    })
                }}>showComp</Button>
            </Box>


        </PageCard>

    )
}

export {
    DemoDialogShow
}
