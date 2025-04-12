export type Point = {
  x: number
  y: number
}


export interface SortableTableProps {
  size: string, //small,
  isZebra: boolean, //small,
  prefix: string,
  dataSource: any[],
  columns: any[],
  onRowValueChange: any; // 函数
  actionEmitter?: any;
  onSortEnd?: any;
  onCreated?: any
}
