/// <reference types="react" />
import { HTMLAttributes } from 'react';
import { EditableTableProps } from '../editable-table';
import { ColumnProps } from '../table';
import { TinyEmitter } from '../util';

export interface Point {
    x: number;
    y: number;
}

export interface SortableListProps<TTag extends keyof JSX.IntrinsicElements = 'div'> 
    extends HTMLAttributes<HTMLElement> {
    /**
     * 子元素，需要包装在 SortableItem 中
     */
    children: React.ReactNode;
    
    /**
     * 是否允许拖拽，默认为 true
     */
    allowDrag?: boolean;
    
    /**
     * 排序结束时的回调函数
     */
    onSortEnd: (oldIndex: number, newIndex: number) => void;
    
    /**
     * 拖拽时应用的 CSS 类名
     */
    draggedItemClassName?: string;
    
    /**
     * 容器元素类型
     */
    as?: TTag;
    
    /**
     * 锁定拖拽轴向
     */
    lockAxis?: 'x' | 'y';
    
    /**
     * 自定义拖拽容器引用
     */
    customHolderRef?: React.RefObject<HTMLElement | null>;
}

export interface SortableItemProps {
    /**
     * 单个可排序项的内容
     */
    children: React.ReactElement;
}

export interface SortableKnobProps {
    /**
     * 拖拽把手的内容
     */
    children: React.ReactElement;
}

export interface SortableTableProps {
    /**
     * 表格尺寸
     */
    size?: 'small' | 'medium' | 'large';
    
    /**
     * 是否显示斑马纹
     */
    isZebra?: boolean;
    
    /**
     * 样式前缀
     */
    prefix?: string;
    
    /**
     * 表格数据源
     */
    dataSource: any[];
    
    /**
     * 表格列配置，支持 draggable 属性指定拖拽列
     */
    columns: (ColumnProps & { draggable?: boolean })[];
    
    /**
     * 行数据变化回调函数
     */
    onRowValueChange?: (row: any, column: ColumnProps) => void;
    
    /**
     * 事件发射器
     */
    actionEmitter?: TinyEmitter;
    
    /**
     * 排序结束回调函数
     */
    onSortEnd?: (newDataSource: any[], oldIndex: number, newIndex: number) => void;
    
    /**
     * 表格创建完成回调
     */
    onCreated?: (actions: SortableTableActions) => void;
}

export interface SortableTableActions {
    /**
     * 事件发射器
     */
    actionEmitter?: TinyEmitter;
    
    /**
     * 设置数据源
     */
    setDataSource: (dataSource: any[]) => void;
    
    /**
     * 获取数据源
     */
    getDataSource: () => any[];
}

export interface SortableEditableTableProps extends EditableTableProps {
    /**
     * 排序结束回调函数
     */
    onSortEnd?: (newDataSource: any[], oldIndex: number, newIndex: number) => void;
}

declare const SortableList: {
    <TTag extends keyof JSX.IntrinsicElements = 'div'>(
        props: SortableListProps<TTag>
    ): React.JSX.Element;
    
    /**
     * 可排序项组件
     */
    SortableItem: React.ComponentType<SortableItemProps>;
    
    /**
     * 拖拽把手组件
     */
    SortableKnob: React.ComponentType<SortableKnobProps>;
    
    /**
     * 可排序列表（等同于默认导出）
     */
    SortableList: typeof SortableList;
    
    /**
     * 可排序表格组件
     */
    SortableTable: React.ComponentType<SortableTableProps>;
    
    /**
     * 可排序编辑表格组件
     */
    SortableEditableTable: React.ComponentType<SortableEditableTableProps>;
};

export default SortableList;