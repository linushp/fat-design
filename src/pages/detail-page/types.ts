import {FormProps} from "../../form2/form-types";

export interface DetailPageCardFormProps extends FormProps {

}

export interface DetailPageProps {
    prefix: string;
    children: any;
    pageTitle?: string;
    className?: string;
}


export interface DetailPageSectionProps {
    prefix: string;
    title: any;
    children: any;
    toolbar?: any; // dom  or function
    columns: number;
    gap: number;
    useElevator: boolean;
}

export interface DetailPageSummaryItemProps {
    label: string;
    value: string;
    type?: string; //"primary",
    help?: string; //帮助提示
    prefix?: string;
}

export interface DetailPageSummaryProps {
    prefix: string;
    dataSource: DetailPageSummaryItemProps[]
}
