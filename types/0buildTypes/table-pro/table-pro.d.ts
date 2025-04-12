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
    componentDidMount(): void;
    paginationTotalRender: (total: string) => React.JSX.Element;
    rowSelectedMsgRender: (tableProps: any) => React.JSX.Element;
    render(): React.JSX.Element;
}
declare const TableProInner: typeof TableProImpl;
export { TableProInner };
