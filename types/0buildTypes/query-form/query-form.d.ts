import { QueryFormProps } from "./types";
declare function QueryForm(props: QueryFormProps): import("react/jsx-runtime").JSX.Element;
declare namespace QueryForm {
    var defaultProps: {
        prefix: string;
        isUseCard: boolean;
        isPreview: boolean;
        labelAlign: string;
        layout: string;
        initialFormWidth: number;
        initialRowCount: number;
        settings: boolean;
        layoutProps: {
            gap: number[];
            columns: number;
        };
    };
    var Item: typeof import("../form2/form-item").default;
}
export { QueryForm };
