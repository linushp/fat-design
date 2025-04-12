import React from 'react';
interface MultiFieldCellItem {
    content?: any;
    title?: any;
    display?: boolean;
}
type MultiFieldCellItem2 = MultiFieldCellItem | string | boolean | number;
declare const renderMultiFieldCell: (itemList: MultiFieldCellItem2[]) => React.JSX.Element;
export { renderMultiFieldCell };
