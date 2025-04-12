export interface FilterItemData {
    label: string;
    value: string;
    count: any;
    render?: any;
    className?: string;
}
export interface FilterItemProps extends FilterItemData {
    prefix?: string;
    isActive: boolean;
    onClick: any;
}
export type FnOnFilterChange = (value: string, b: FilterItemData) => {};
export interface FilterProps {
    appendAllTag?: boolean;
    prefix?: string;
    defaultValue?: string;
    dataSource: FilterItemData[];
    value?: string;
    onChange?: FnOnFilterChange;
}
