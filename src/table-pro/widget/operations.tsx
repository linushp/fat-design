import React, {useState} from "react";
import {OperationBtnItem, OperationsProps} from "../types";
import Box from "../../box";
import Button from '../../button';
import Icon from '../../icon';
import Balloon from '../../balloon';
import MenuButton from '../../menu-button';
import {deepEqual} from "../../util/shallowEqual";
import ConfigProvider from "../../config-provider";
import {executeOperationAction} from "./operationsActions";

const LoadingButton = Button.LoadingButton;
const ActionButton = Button.ActionButton;

const {Tooltip} = Balloon
const MenuButtonItem = MenuButton.Item


interface ButtonItemProps {
    prefix: string;
    btn: OperationBtnItem;
    index?: any;
    actions?: any;
}


function wrapOnClick(fn: any, btnItem: any, actions: any) {
    return () => {
        if (typeof fn === "function") {
            return fn(btnItem, actions);
        }
        if (typeof fn === 'string') {
            return executeOperationAction(fn, btnItem, actions);
        }
    };
}


function IconText(props: any) {
    const {icon, text, ...others} = props
    return (
        <Button {...others} text>
            <Icon type={icon}/>
            {text}
        </Button>
    )
}


function renderButtonItem(props: ButtonItemProps) {
    const {btn, prefix, index, actions} = props;
    const {text, size, onClick, icon, tooltip, type = 'normal', children, disabled = false} = btn;

    const key = btn.text + index;


    const cls = (txt: string) => {
        return `${prefix}query-form-table-${txt}`;
    }
    const renderIconText = (icon: any, text: any, loading: boolean) => {
        if (loading) {
            return (
                <span className={cls('operation-btn')}>
                    <span className={cls('operation-text')}>{text}</span>
                </span>
            )
        }
        return (
            <span className={cls('operation-btn')}>
                {icon ? (
                    <span className={cls('operation-icon')}><Icon type={icon} size={'xs'}/></span>
                ) : null}
                <span className={cls('operation-text')}>{text}</span>
            </span>
        );
    }

    const renderMultiBtn = () => {
        if (!children) {
            return null;
        }

        return (
            <MenuButton
                key={'menu_button' + key}
                type={type}
                size={size}
                arrowIconClassName={`${prefix}query-form-table-operations-menu-icon`}
                autoWidth={false}
                popupClassName={`${prefix}query-form-table-operations-menu-popup`}
                popupProps={{
                    cache: true,
                    shouldUpdatePosition: true,
                }}
                label={<IconText icon={icon} text={text} component="div"/>}
                followTrigger
            >
                {children.map((child, index) => {
                    let itemStyle = {}
                    let childOnClick = wrapOnClick(child.onClick, child, actions);
                    return (
                        <MenuButtonItem
                            onClick={childOnClick}
                            style={itemStyle}
                            key={index}>
                            {renderIconText(child.icon, child.text, false)}
                        </MenuButtonItem>
                    );
                })}
            </MenuButton>
        );
    }


    const renderSingleBtn = () => {

        const renderChildren = (loading: boolean) => {
            return renderIconText(icon, text, loading)
        }

        const element = (
            <LoadingButton key={'button_' + key}
                           type={type}
                           size={size}
                           iconSize={'xs'}
                           disabled={disabled}
                           tooltip={tooltip}
                           renderChildren={renderChildren}
                           onClick={wrapOnClick(onClick, btn, actions)}/>
        );
        return element;
        // return tooltip ? (
        //     <Tooltip
        //         key={'tooltip_' + key}
        //         trigger={element}
        //         align="t">
        //         {tooltip}
        //     </Tooltip>
        // ) : (
        //     element
        // )
    }


    if (children && children.length > 0) {
        return renderMultiBtn();
    }

    return renderSingleBtn();
}


function OperationsImpl(props: OperationsProps, ref: any) {
    const {prefix, spacing = 10, buttons = [], actions} = props;

    if (!buttons || buttons.length === 0) {
        return null;
    }

    return (
        <Box direction="row" spacing={spacing}>
            {
                buttons.map((btn, index) => {
                    return renderButtonItem({prefix, btn, index, actions})
                })
            }
        </Box>
    );
}


const Operations = React.memo(React.forwardRef(OperationsImpl), (prevProps, nextProps) => {
    return deepEqual(prevProps, nextProps);
});


const TableOperations = ConfigProvider.config<typeof OperationsImpl>(Operations, {
    componentName: 'TableOperations',
});

export {
    TableOperations
}
