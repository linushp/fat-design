import React from 'react';
declare const renderFormats: {
    renderJSON: (value: any) => React.JSX.Element;
    renderString: (value: any) => React.JSX.Element;
    renderDay: (value: any) => React.JSX.Element;
    renderTime: (value: any) => React.JSX.Element;
    renderThousands: (value: any) => React.JSX.Element;
    renderHTML: (value: any) => React.JSX.Element;
    renderBoolean: (value: any) => React.JSX.Element;
};
export { renderFormats };
