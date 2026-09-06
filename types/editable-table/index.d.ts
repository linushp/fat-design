/// <reference types="react" />
import { TableProps, ColumnProps } from '../table';
import { TinyEmitter } from '../util';

export interface EditableTableProps extends Omit<TableProps, 'columns'> {
    /**
     * 样式前缀
     */
    prefix?: string;
    
    /**
     * 表格列配置，支持可编辑组件配置
     */
    columns?: EditableColumnProps[];
    
    /**
     * 表格数据源
     */
    dataSource?: any[];
    
    /**
     * 自定义组件映射，用于扩展可编辑组件类型
     */
    components?: Record<string, React.ComponentType<any>>;
    
    /**
     * 行数据变化回调函数
     */
    onRowValueChange?: (row: any, column: EditableColumnProps) => void;
    
    /**
     * 事件发射器，用于组件间通信
     */
    actionEmitter?: TinyEmitter;
    
    /**
     * 是否显示添加行功能
     */
    isShowAddRow?: boolean;

    /**
     * 表格创建完成回调
     */
    onCreated?: (params: { actions: EditableTableActions }) => void;
}

export interface EditableColumnProps extends ColumnProps {
    /**
     * 可编辑组件类型
     */
    component?: string | React.ComponentType<any>;
    
    /**
     * 传递给可编辑组件的属性
     */
    xProps?: Record<string, any>;
    
    /**
     * 值变化时是否强制更新整行
     */
    forceUpdateRow?: boolean;
    
    /**
     * 值变化时是否强制更新整个表格
     */
    forceUpdateTable?: boolean;
}

export interface SettingTableProps {
    /**
     * 样式前缀
     */
    prefix?: string;
    
    /**
     * 表格列配置
     */
    columns?: ColumnProps[];
    
    /**
     * 表格数据源
     */
    dataSource?: any[];
    
    /**
     * 自定义组件映射
     */
    components?: Record<string, React.ComponentType<any>>;
    
    /**
     * 添加数据回调函数
     */
    onAddData?: (newRow?: any) => void;
}

interface SettingTableStatic {
    /**
     * 注册组件
     */
    registerComponents: (components: Record<string, React.ComponentType<any>>) => void;
}

export interface EditableTableActions {
    /**
     * 强制更新整个表格
     */
    forceUpdateTable: () => void;
    
    /**
     * 强制更新指定行
     */
    forceUpdateRow: (row: any, column: EditableColumnProps) => void;
}

declare const EditableTable: React.ForwardRefExoticComponent<EditableTableProps & React.RefAttributes<any>> & {
    /**
     * 配置表格组件，专门用于配置管理场景
     */
    SettingTable: React.ComponentType<SettingTableProps> & SettingTableStatic;
};

export default EditableTable;