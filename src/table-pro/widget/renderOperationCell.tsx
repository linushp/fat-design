import { useMemo, useState } from 'react';
import { OperateCellItemProps, OperateCellProps } from "../types";
import { getDep } from "./deps";
import ConfigProvider from "../../config-provider";
import classNames from "classnames";

const EMPTY_STR_ARRAY: string[] = [];


function isEmptyArray(arr: any) {
    return !arr || !Array.isArray(arr) || arr.length === 0;
}


/**
 * 根据操作权限过滤操作按钮
 * @param operationItems 操作按钮配置
 * @param max 最大显示数量
 * @param operationPerms 操作权限
 * @returns 
 */
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
        // 需要鉴权，但是没有权限
        if (isEmptyArray(operationPerms)) {
            return false;
        }
        return Array.isArray(operationPerms) && operationPerms.indexOf(operationCode) >= 0;
    });


    // 分组
    const tileChildren: any[] = [];
    const packChildren: any[] = [];
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


function ButtonWithTooltip(props: any) {
    const Button = getDep('Button');
    const Balloon = getDep('Balloon');
    const Tooltip = Balloon?.Tooltip;
    const { tooltip, ...otherProps } = props;

    const buttonElement = (<Button {...otherProps} />)

    if (tooltip && Tooltip) {
        return (
            <Tooltip v2 trigger={buttonElement} align="l" arrowPointToCenter>
                {tooltip}
            </Tooltip>
        );
    }
    return buttonElement;
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
    const { tileChildren, packChildren } = useMemo(() => {
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
                    const { title, disabled, tooltip } = child;
                    return (
                        <span className={cls('button-wrapped')} key={title}>
                            <ButtonWithTooltip text type="primary" size={size}
                                className={cls('btn')}
                                disabled={disabled}
                                tooltip={tooltip}
                                onClick={wrapOnClick(child.onClick, child)}>
                                {title}
                            </ButtonWithTooltip>
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
                                    <Icon type={menuOpen ? 'arrow-up' : 'arrow-down'} size="inherit" />
                                </Button>
                            }
                            onClose={() => setMenuOpen(false)}
                            onOpen={() => setMenuOpen(true)}
                        >
                            <Menu className={cls('menu')}>
                                {packChildren.map((child: OperateCellItemProps, index: number) => (
                                    <Menu.Item key={index} className={cls('menu-item')}>
                                        <ButtonWithTooltip text type="primary" size={size}
                                            tooltip={child.tooltip}
                                            className={cls('btn')}
                                            disabled={child.disabled}
                                            onClick={wrapOnClick(child.onClick, child)}>
                                            {child.title}
                                        </ButtonWithTooltip>
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
    if (Array.isArray(operationItems)) {

        // 有可能因为没有权限，导致数组为空
        if (operationItems.length === 0) {
            return null;
        }

        const props: any = {
            operationItems: operationItems
        };

        if (others && typeof others === "object") {
            Object.assign(props, others);
        }
        const { prefix } = ConfigProvider.getContext();
        props.prefix = prefix;

        return (<OperateCell {...props} />);
    }
    return JSON.stringify(operationItems);
}


export {
    renderOperationCell
}
