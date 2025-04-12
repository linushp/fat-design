import SortableListImpl, {SortableKnob,SortableItem}  from "./sortable-list";
import {SortableTable} from "./sortable-table";
import {SortableEditableTable} from "./sortable-editable-table";

function SortableList(props:any){
    return <SortableListImpl {...props}/>;
}

SortableList.SortableKnob = SortableKnob;
SortableList.SortableItem = SortableItem;
SortableList.SortableList = SortableList;
SortableList.SortableTable = SortableTable;
SortableList.SortableEditableTable = SortableEditableTable;

// https://github.com/ValentinH/react-easy-sort
// https://valentinh.github.io/react-easy-sort/
export default SortableList;
