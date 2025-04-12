import React from 'react';
import { DetailPageProps } from "./types";
declare function DetailPage(props: DetailPageProps): React.JSX.Element;
declare namespace DetailPage {
    var defaultProps: {
        prefix: string;
        useElevator: boolean;
    };
    var CardForm: any;
    var FormItem: any;
    var Section: any;
    var Summary: any;
}
export default DetailPage;
