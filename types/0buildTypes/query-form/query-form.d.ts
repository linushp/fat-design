/// <reference types="react" />
import { QueryFormProps } from "./types";
declare function QueryForm(props: QueryFormProps): import("react").JSX.Element;
declare namespace QueryForm {
    var defaultProps: {
        prefix: string;
        isUseCard: boolean;
        isPreview: boolean;
        labelAlign: string;
        layout: string;
        layoutProps: {
            gap: number[];
            columns: number;
        };
    };
}
export { QueryForm };
