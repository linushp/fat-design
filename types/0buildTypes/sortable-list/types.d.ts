export type Point = {
    x: number;
    y: number;
};
export interface SortableTableProps {
    size: string;
    isZebra: boolean;
    prefix: string;
    dataSource: any[];
    columns: any[];
    onRowValueChange: any;
    actionEmitter?: any;
    onSortEnd?: any;
    onCreated?: any;
}
