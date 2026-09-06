import React from 'react';
import classNames from 'classnames';
import {ComponentsStore} from '../util/comp';
import {get} from '../util';
import {isEmptyStr} from '../util/string';
import {defaultPrefix} from '../config-provider';
import {PreciseStore, usePreciseValue} from '../hooks/usePreciseStore';

function getDep(name) {
    return get(ComponentsStore.buildInComponents, name);
}

const hideTabContentStyle = {
    display: 'none',
    height: 0,
    overflow: 'hidden',
    padding: 0,
    margin: 0,
};

const defaultHeaderStyle = {
    padding: '8px 8px',
    borderBottom: 'none',
};

const ACTIVE_KEY_PATH = 'activeKey';

/**
 * 未传 key 时用 index{索引}，例如 index0、index1
 */
function resolveItemKey(item, index) {
    if (item && !isEmptyStr(item.key)) {
        return String(item.key);
    }
    return `index${index}`;
}

/**
 * 规范化 items，补齐 key
 */
function normalizeItems(items) {
    return (items || []).map((item, index) => ({
        ...item,
        key: resolveItemKey(item, index),
    }));
}

function HeaderOnlyTabs({store, items, tabProps, onChange}) {
    const Tab = getDep('Tab');
    const [activeKey, setActiveKey] = usePreciseValue(store, ACTIVE_KEY_PATH);

    return (
        <Tab
            shape="pure"
            size="small"
            {...tabProps}
            activeKey={activeKey}
            onChange={(key) => {
                const next = String(key);
                setActiveKey(next);
                if (typeof onChange === 'function') {
                    onChange(next);
                }
            }}
            contentStyle={hideTabContentStyle}
            style={{marginBottom: -1, ...(tabProps && tabProps.style)}}
        >
            {items.map((item) => (
                <Tab.Item key={item.key} title={item.title} disabled={item.disabled} />
            ))}
        </Tab>
    );
}

function TabBody({store, items, contentStyle, contentClassName, prefix, keepAlive}) {
    const [activeKey] = usePreciseValue(store, ACTIVE_KEY_PATH);

    return (
        <div
            className={classNames(`${prefix}dialog-show-tab-content`, contentClassName)}
            style={contentStyle}
        >
            {items.map((item) => {
                const active = String(item.key) === String(activeKey);
                if (!keepAlive && !active) {
                    return null;
                }
                return (
                    <div
                        key={item.key}
                        style={keepAlive && !active ? {display: 'none'} : undefined}
                        className={`${prefix}dialog-show-tab-pane`}
                    >
                        {item.content}
                    </div>
                );
            })}
        </div>
    );
}

function resolveDefaultActiveKey(items, defaultActiveKey) {
    if (!isEmptyStr(defaultActiveKey)) {
        return String(defaultActiveKey);
    }
    const firstEnabled = (items || []).find((item) => item && !item.disabled);
    return firstEnabled ? String(firstEnabled.key) : undefined;
}

/**
 * Dialog.showTab — header 显示 Tab，body 切换内容。
 *
 * @example
 * Dialog.showTab({
 *   items: [
 *     { title: '基本信息', content: <BasicForm /> },
 *     { title: '高级设置', content: <AdvanceForm /> },
 *   ],
 *   onOk: (ctx) => { console.log(ctx.activeKey); }, // 未传 key 时为 index0 / index1
 * })
 */
function buildShowTab(show) {
    return function showTab(config = {}) {
        const {
            items = [],
            defaultActiveKey,
            onChange,
            onOk,
            tabProps,
            headerStyle,
            headerClassName,
            bodyStyle,
            contentStyle,
            contentClassName,
            className,
            prefix = defaultPrefix,
            keepAlive = true,
            v2 = true,
            needWrapper = false,
            width = 560,
            ...otherProps
        } = config;

        const normalizedItems = normalizeItems(items);

        const store = new PreciseStore({
            [ACTIVE_KEY_PATH]: resolveDefaultActiveKey(normalizedItems, defaultActiveKey),
        });

        const mergedHeaderStyle = {
            ...defaultHeaderStyle,
            ...(headerStyle || {}),
        };

        const mergedBodyStyle = {
            padding: 0,
            ...(bodyStyle || {}),
        };

        const mergedContentStyle = {
            padding: '10px 20px',
            ...(contentStyle || {}),
        };

        return show({
            prefix,
            v2,
            needWrapper,
            width,
            className: classNames(`${prefix}dialog-show-tab`, className),
            headerStyle: mergedHeaderStyle,
            headerClassName,
            bodyStyle: mergedBodyStyle,
            title: (
                <HeaderOnlyTabs
                    store={store}
                    items={normalizedItems}
                    tabProps={tabProps}
                    onChange={onChange}
                />
            ),
            content: (
                <TabBody
                    store={store}
                    items={normalizedItems}
                    contentStyle={mergedContentStyle}
                    contentClassName={contentClassName}
                    prefix={prefix}
                    keepAlive={keepAlive}
                />
            ),
            onOk: async (event, ...args) => {
                if (typeof onOk === 'function') {
                    event.activeKey = store.getValue(ACTIVE_KEY_PATH);
                    event.items = normalizedItems;
                    return await onOk(event, ...args);
                }
            },
            ...otherProps,
        });
    };
}

export {buildShowTab};
