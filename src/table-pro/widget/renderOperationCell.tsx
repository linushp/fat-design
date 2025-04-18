import {useMemo, useState} from 'react';
import {OperateCellItemProps, OperateCellProps} from "../types";
import { getDep} from "./deps";
import ConfigProvider from "../../config-provider";
import classNames from "classnames";

const EMPTY_STR_ARRAY: string[] = [];


function isEmptyArray(arr: any) {
    return !arr || !Array.isArray(arr) || arr.length === 0;
}

function getChildren(operationItems: any[], max: number, operationPerms: string[]): any {

    if (isEmptyArray(operationItems)) {
        return {
            tileChildren: [],
            packChildren: []
        };
    }

    // 根据operationCode过滤
    const filteredItems = operationItems.filter((item) => {
        const operationCode = item.operationCode;
        if (!operationCode) {
            return true; // 没有operationCode，无需鉴权
        }
        if (isEmptyArray(operationItems)) {
            return false;
        }
        return Array.isArray(operationPerms) && operationPerms.indexOf(operationCode) >= 0;
    });


    // 分组
    const tileChildren: any[] = [];
    const packChildren: any[]  = [];
    const length = filteredItems.length;
    for (let i = 0; i < filteredItems.length; i++) {
        const child = filteredItems[i];
        if (length <= max || i + 1 < max) {
            tileChildren.push(child);
        } else {
            packChildren.push(child);
        }
    }
    return {
        tileChildren,
        packChildren
    }
}


function wrapOnClick(fn: any, btnItem: any) {
    return () => {
        if (typeof fn === "function") {
            fn(btnItem);
        }
    };
}

function OperateCell(props: OperateCellProps) {
    const Box = getDep('Box');
    const Button = getDep('Button');
    const Menu = getDep('Menu');
    const Icon = getDep('Icon');
    const Popup = getDep('Overlay.Popup');

    const {
        prefix,
        max = 3,
        operationItems = EMPTY_STR_ARRAY,
        size,
        direction = 'row',
        operationPerms = EMPTY_STR_ARRAY
    } = props;


    // 分割出平铺和收起的按钮组
    const {tileChildren, packChildren} = useMemo(() => {
        return getChildren(operationItems, max, operationPerms);
    }, [operationItems, max, operationPerms]);


    const [menuOpen, setMenuOpen] = useState(false);

    const cls = (txt: string) => {
        return `${prefix}query-form-table-operate-cell-${txt}`
    }

    return (
        <div className={classNames({
            [cls('wrapped')]: true,
            [cls(`wrapped-${direction}`)]: true,
        })}>

            {
                tileChildren.map((child: OperateCellItemProps, index: number) => {
                    const {title} = child;
                    return (
                        <span className={cls('button-wrapped')} key={title}>
                            <Button text type="primary" size={size}
                                    className={cls('btn')}
                                    onClick={wrapOnClick(child.onClick, child)}>
                                {title}
                            </Button>
                        </span>
                    )
                })
            }


            {
                packChildren.length > 0 ? (
                    <span className={cls('button-wrapped')}>
                      <Popup
                          triggerType="click"
                          align="tr br"
                          trigger={
                              <Button text
                                      className={cls('btn')}
                                      type="primary"
                                      size={size}>
                                  <span>更多</span>
                                  <Icon type={menuOpen ? 'arrow-up' : 'arrow-down'} size="inherit"/>
                              </Button>
                          }
                          onClose={() => setMenuOpen(false)}
                          onOpen={() => setMenuOpen(true)}
                      >
                        <Menu className={cls('menu')}>
                          {packChildren.map((child: OperateCellItemProps, index: number) => (
                              <Menu.Item key={index} className={cls('menu-item')}>
                                  <Button text type="primary" size={size}
                                          className={cls('btn')}
                                          onClick={wrapOnClick(child.onClick, child)}>
                                      {child.title}
                                  </Button>
                              </Menu.Item>
                          ))}
                        </Menu>
                      </Popup>
                </span>
                ) : null
            }

        </div>
    );
}

function renderOperationCell(operationItems: OperateCellItemProps[], others?: OperateCellProps) {
    if (Array.isArray(operationItems) && operationItems.length > 0) {
        const props: any = {operationItems: operationItems};
        if (others && typeof others === "object") {
            Object.assign(props, others);
        }
        const {prefix} = ConfigProvider.getContext();
        props.prefix = prefix;

        return (<OperateCell {...props} />);
    }
    return JSON.stringify(operationItems);
}


export {
    renderOperationCell
}
