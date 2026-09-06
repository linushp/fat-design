import React from "react";
import { TableProProps } from "./types";
interface TableProState {
    columns: any[] | null;
}
declare class TableProImpl extends React.Component<TableProProps, TableProState> {
    static defaultProps: {};
    static displayName: string;
    constructor(props: any);
    updateColumns: () => Promise<void>;
    applyStyleSetting: () => Promise<void>;
    componentDidMount(): void;
    paginationTotalRender: (total: string) => import("react/jsx-runtime").JSX.Element;
    rowSelectedMsgRender: (tableProps: any) => import("react/jsx-runtime").JSX.Element;
    render(): import("react/jsx-runtime").JSX.Element;
}
declare const TableProInner: typeof TableProImpl;
export { TableProInner };
