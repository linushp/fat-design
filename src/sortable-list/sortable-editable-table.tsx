import ConfigProvider, {defaultPrefix} from "../config-provider";
import EditableTable from "../editable-table";
import {SortableTable} from "./sortable-table";

function SortableEditableTableImpl(props: any) {
    const components = props.components || {};

    const components1 = {
        ...components,
        Table: SortableTable
    };

    return (
        <EditableTable {...props} components={components1}/>
    )
}


SortableEditableTableImpl.defaultProps = {
    prefix: defaultPrefix,
};


const SortableEditableTable = ConfigProvider.configFn(SortableEditableTableImpl, {
    componentName: 'SortableEditableTable',
});

export {
    SortableEditableTable
}
