import React from "react";
import { FormProps } from "../form-types";
declare function schemaToFormItems(schema: any, FormItem: any): React.JSX.Element[];
declare function useFormChildren(props: FormProps, FormItem: any): any[];
export { useFormChildren, schemaToFormItems };
