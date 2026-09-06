/// <reference types="react" />
declare function SortableList(props: any): import("react/jsx-runtime").JSX.Element;
declare namespace SortableList {
    var SortableKnob: ({ children }: {
        children: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
    }) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
    var SortableItem: ({ children }: {
        children: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
    }) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
    var SortableList: typeof import(".").default;
    var SortableTable: unknown;
    var SortableEditableTable: unknown;
}
export default SortableList;
