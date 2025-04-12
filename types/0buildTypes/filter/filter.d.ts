import React from 'react';
import { FilterProps } from "./filter-types";
declare const FilterImpl: {
    (props: FilterProps, ref: any): React.JSX.Element;
    defaultProps: {
        prefix: string;
    };
    displayName: string;
};
export { FilterImpl };
