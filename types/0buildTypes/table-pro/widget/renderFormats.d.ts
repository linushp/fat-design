import React from 'react';
declare const renderFormats: {
    renderString: (value: any) => React.JSX.Element;
    renderJSON: (value: any) => React.JSX.Element;
    renderDay: (value: any) => React.JSX.Element;
    renderTime: (value: any) => React.JSX.Element;
    renderThousands: (value: any) => React.JSX.Element;
    renderHTML: (value: any) => React.JSX.Element;
    renderBoolean: (value: any) => React.JSX.Element;
    renderRelativeTime: (value: any) => React.JSX.Element;
    renderFileDownload: (value: any) => React.JSX.Element;
    renderFileImage: (value: any) => React.JSX.Element;
    renderEnumTag: (value: any) => React.JSX.Element;
};
export { renderFormats };
