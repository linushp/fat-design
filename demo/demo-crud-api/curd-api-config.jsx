const databaseMap = {
    fatcms: {
        fatcms: [
            'sys_configs',
            'sys_crud_methods',
            'sys_data_dict',
            'sys_data_dict_item',
            'sys_lowcode_app',
            'sys_lowcode_app_history',
            'sys_perm_func',
            'sys_perm_role',
            'sys_perm_role_func',
            'sys_perm_user_role',
            'sys_user_basic',
            'sys_user_privacy',
        ]
    }
};





const preHandleOptions = [
    {
        label: '权限校验',
        value: 'authValidate',
        handleParam1: {
            title:'鉴权方法',
            component:'Select',
            xProps: {
                dataSource: [ //free无需鉴权，login仅登录即可，byRoleCode校验角色，byFuncCode校验功能点
                    {label: '无需鉴权', value: 'free'},
                    {label: '仅登录即可', value: 'login'},
                    {label: '校验角色', value: 'byRoleCode'},
                    {label: '校验功能点', value: 'byFuncCode'},
                ]
            }
        },
        handleParam2: {
            title:'鉴权参数',
            component: 'BatchInput',
        }
    },

    {
        label: '参数校验',
        value: 'paramValidate',
        handleParam1: {
            title:'参数名',
            component:'Input',
            xProps: {
                placeholder:'如：data.name, condtion.name'
            }
        },
        handleParam2: {
            title: '校验规则',
            component:'Select',
            xProps: {
                dataSource: [
                    {label: '必填字段', value: 'required'},
                    {label: '字符串', value: 'string'},
                    {label: '数字', value: 'number'},
                    {label: '整数', value: 'integer'},
                    {label: '布尔值', value: 'boolean'},
                    {label: 'name类型', value: 'name'},
                    {label: '最大长度', value: 'maxLength:', handleParam3: {
                            title:'校验规则参数',
                            component:'NumberPicker',
                        }},
                    {label: '最小长度', value: 'minLength:'},
                    {label: '最大值', value: 'maxValue:'},
                    {label: '最小值', value: 'minValue:'},
                    {label: '正则', value: 'regexp:'},
                    {label: '枚举值', value: 'enum:'},
                ]
            }
        },
        handleParam3: {
            title:'校验规则参数',
            component:'Input',
            xProps: {
                placeholder:''
            }
        }
    },
    {label: '参数设置', value: 'paramSetting'},
    {label: '参数白名单', value: 'paramAllow'},
    {label: '参数黑名单', value: 'paramReject'},
];

//
// REQUIRED = 'required',
//     BOOLEAN = 'boolean', // 布尔值类型
//     STRING = 'string', // 字符串类型
//     EMAIL = 'email',
//     NAME = 'name', //必须以字母开头,只能包含：字母/数字/下划线
//     PHONE_CN = 'phone:cn', // 中国手机号：11位
//     INTEGER = 'integer', // long,int,short,bigInteger
//     NUMBER = 'number', // long,int,short,float,double
//     NUMERIC = 'numeric', //long,int,short,float,double或只包含数字的字符串
//     SCALE = 'scale:', // 判断参数是否位于这个区间：scale:[1,3] ; scale:(1,3) ; scale:(1,3] ;
//     LENGTH = 'length:', // length:1,5 ; length >=1 and length <=5
//     REG_EXP = 'regexp:', // regexp:[a-zA-Z-_.]
//     ENUM = 'enum:', // enum : 1,2,3,4,5,6,aa,bb,cc ：比较时用字符串比较

const postHandleOptions = [
    {label: '关联数据字典', value: '关联数据字典'},
    {label: '关联系统配置', value: '关联系统配置'},
    {label: '关联用户信息', value: '关联用户信息'},
];


const yesOrNoOptions = [
    {label: '是', value: true},
    {label: '否', value: false},
];

const sqlSimpleNameOptions = [
    {
        "label": "简单查询",
        "value": "SIMPLE_QUERY"
    },
    {
        "label": "简单单个查询",
        "value": "SIMPLE_QUERY_ONE"
    },
    {
        "label": "简单分页查询",
        "value": "SIMPLE_QUERY_PAGE"
    },
    {
        "label": "简单查询数量",
        "value": "SIMPLE_QUERY_COUNT"
    },
    {
        "label": "简单更新操作",
        "value": "SIMPLE_UPDATE"
    },
    {
        "label": "简单插入操作",
        "value": "SIMPLE_INSERT"
    },
    {
        "label": "简单删除操作",
        "value": "SIMPLE_DELETE"
    },
    {
        "label": "简单插入或更新",
        "value": "SIMPLE_INSERT_OR_UPDATE"
    },
    {
        "label": "简单插入或更新(ON_DUPLICATE)",
        "value": "SIMPLE_INSERT_ON_DUPLICATE_UPDATE"
    },
    {
        "label": "自定义查询语句",
        "value": "CUSTOM"
    }
];



export {
    databaseMap,
    sqlSimpleNameOptions,
    yesOrNoOptions,
    preHandleOptions,
    postHandleOptions
}
