import React, {useMemo} from 'react';
import classNames from 'classnames';
import {FilterItemData, FilterItemProps, FilterProps} from "./filter-types";
import {usePersistFn} from "../hooks/usePersistFn";
import {useValueOnChange} from "../hooks/useValueOnChange";
import {isNil} from "../util/object";
import ConfigProvider from "../config-provider";
import {log} from "../util";

const defaultPrefix = ConfigProvider.defaultPrefix;

const renderFilterItem = (props: FilterItemProps) => {
    const {prefix, label, count} = props;

    return (
        <span className={`${prefix}filter-item-title`}>
                <span className={`${prefix}filter-item-label`}>
                    {label}
                </span>

            {
                (!isNil(count)) ? (
                    <span className={`${prefix}filter-item-count-wrap`}>
                        <span className={`${prefix}filter-item-count-lr`}>(</span>
                        <span className={`${prefix}filter-item-count`}>{count}</span>
                        <span className={`${prefix}filter-item-count-lr`}>)</span>
                    </span>
                ) : null
            }

            </span>
    );
}


const FilterItem = React.memo((props: FilterItemProps) => {
    const {render, prefix, label, count, value, onClick, isActive, className} = props;

    const handleClick = () => {
        onClick({label, count, value});
    }

    const cls = classNames({
        [`${prefix}filter-item`]: true,
        [`${prefix}filter-item-active`]: isActive,
        [`${className}`]: !!className,
    });

    return (
        <span className={cls} onClick={handleClick}>
            {typeof render === "function" ? render(props) : renderFilterItem(props)}
        </span>
    );
});


function useAppendAllTag(props: FilterProps) {
    const {appendAllTag, dataSource} = props;
    return useMemo(() => {
        if (!dataSource || dataSource.length === 0) {
            return [];
        }

        const allItem = dataSource.find((item)=>{
            return item.value === 'ALL';
        })

        if (appendAllTag === true && !allItem) {
            const tagAllItem = {...dataSource[0]};
            tagAllItem.count = 0;
            tagAllItem.label = '全部';
            tagAllItem.value = 'ALL';
            for (let i = 0; i < dataSource.length; i++) {
                const dsItem = dataSource[i];
                tagAllItem.count = tagAllItem.count + parseInt(dsItem.count)
            }
            return [tagAllItem, ...dataSource];
        }
        return dataSource;
    }, [appendAllTag, appendAllTag]);
}


const FilterImpl = (props: FilterProps, ref: any) => {

    log.debug('render FilterImpl');


    const {prefix, dataSource, appendAllTag} = props;

    const [active, setActive] = useValueOnChange(props);

    const onClickItem = usePersistFn((d: FilterItemData) => {
        setActive(d.value, d);
    });

    const dataSource2 = useAppendAllTag(props);

    if (!dataSource2 || dataSource2.length === 0) {
        return null;
    }

    return (
        <div className={`${prefix}filter`}>
            <div className={`${prefix}filter-inner`}>
                {
                    dataSource2.map((itemData) => {
                        return (
                            <FilterItem
                                {...itemData}
                                key={itemData.value + itemData.label}
                                prefix={prefix}
                                onClick={onClickItem}
                                isActive={active === itemData.value}
                            />);
                    })
                }
            </div>
        </div>
    );
};


FilterImpl.defaultProps = {
    prefix: defaultPrefix
}

FilterImpl.displayName = 'FilterImpl';


export {
    FilterImpl
}
