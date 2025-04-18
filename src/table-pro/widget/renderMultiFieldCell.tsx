import React from 'react';
import {constants} from "../../util";
import ConfigProvider from "../../config-provider";
import {MultiFieldCellItem, MultiFieldCellItem2, MultiFieldCellProps} from "../types";


function isNil(item: any): boolean {
    return typeof item === "undefined" || item === null;
}

const renderItemContent = (item: MultiFieldCellItem) => {
    if (isNil(item.content)) {
        return constants.EMPTY_PLACEHOLDER;
    }
    return item.content;
}


const doFilterItemList = (itemList: MultiFieldCellItem2[]) => {
    if (!itemList || itemList.length === 0) {
        return [];
    }
    return itemList.filter((item) => {
        if (item === null || typeof item === "undefined") {
            return false;
        }
        if (typeof item === "object") {
            if (typeof item.display === "undefined") {
                return true;
            }
            return item.display;
        }
        return true;
    });
}

const MultiFieldCell = React.memo((props: MultiFieldCellProps) => {
    const {prefix} = props
    const itemList = doFilterItemList(props.itemList);

    if (!itemList || itemList.length === 0) {
        return (
            <span>{constants.EMPTY_PLACEHOLDER}</span>
        );
    }

    const cls = (txt?: any) => {
        const itemCls = `${prefix}multi-field-cell-item`
        if (!txt) {
            return itemCls;
        }
        return `${itemCls}-${txt}`
    }


    return (
        <>
            {itemList.map((item, index) => {

                if (isNil(item)) {
                    return (
                        <div className={cls()} key={index}>
                            <span className={cls('content')}>
                                {constants.EMPTY_PLACEHOLDER}
                             </span>
                        </div>
                    )
                }


                if (typeof item === "string" || typeof item === "boolean" || typeof item === "number") {
                    return (
                        <div className={cls()} key={index}>
                            <span className={cls('content')}>
                                  {item}
                             </span>
                        </div>
                    )
                }

                return (
                    <div className={cls()} key={index}>
                        {
                            item.title ? (
                                <>
                                    <span className={cls('title')}>{item.title}</span>
                                    <span className={cls('split')}>:</span>
                                </>
                            ) : null
                        }
                        <span className={cls('content')}>
                            {renderItemContent(item)}
                        </span>
                    </div>
                );

            })}
        </>
    )
});


const renderMultiFieldCell = (itemList: MultiFieldCellItem2[]) => {
    const {prefix} = ConfigProvider.getContext();
    return <MultiFieldCell itemList={itemList} prefix={prefix}/>
}

export {
    renderMultiFieldCell
}

