import { DetailPageSectionProps } from "./types";
import React from "react";
declare function DetailPageSection(props: DetailPageSectionProps): React.JSX.Element;
declare namespace DetailPageSection {
    var _typeMark: string;
    var defaultProps: {
        prefix: string;
        columns: number;
        gap: number;
        labelCol: {
            fixedSpan: number;
        };
        wrapperCol: {
            span: number;
        };
        useElevator: boolean;
    };
}
export { DetailPageSection };
