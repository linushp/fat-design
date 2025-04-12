
export interface ResponsiveGridProps {
    prefix?: string,
    className?: any,
    device?: string,
    rows?: number | string,
    columns?: number | string,
    gap?: number | number[],
    component?: any,
    dense?: boolean,
    style?: any
}

export interface ResponsiveGridCellProps {
    colIndex?: number,

    /**
     * 横向，占据几列
     */
    colSpan?:  number,

    /**
     * 纵向，占据几行
     */
    rowSpan?: number,
    /**
     * 设置标签类型
     */
    component?: any,

    style?: any
}
