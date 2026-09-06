import { IUseTableProParams } from "./types";
export interface IUseTableProProps {
    formProps: any;
    tableProps: any;
    paginationProps: any;
    filterProps: any;
    operationProps: any;
    actions: any;
}
declare function useTablePro(params: IUseTableProParams): IUseTableProProps;
export { useTablePro };
