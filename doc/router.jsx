import React, {useState} from 'react';
import {
    Outlet,
    Link,
    RouterProvider,
    createBrowserRouter
} from "react-router-dom";

import {appContext} from "./context.js";
import {DialogDoc} from "./comp-docs/dialog-doc/index.jsx";

window.showErrorMessage = function (txt) {
}

function BasicLayout(){

}

const routerConfig = [
    {
        path: "/fat-design",
        Component: BasicLayout,
        children: [
            {path: "dialog", Component: DialogDoc},
            {path: "button", Component: ()=>{ return null},},
            {path: "form", Component: ()=>{ return null}},
            {path: "table-pro", Component: ()=>{ return null},}
        ]
    }
]


let router = createBrowserRouter(routerConfig);
if (import.meta.hot) {
    import.meta.hot.dispose(() => router.dispose());
}



function Router() {
    const AppProvider = appContext.Provider;
    const crossedStore = hooks.useCreateCrossedStore({
        currentPageInfo: null
    });
    return (
        <AppProvider value={crossedStore}>
            <RouterProvider router={router} fallbackElement={<Fallback />} />
        </AppProvider>
    )
}


function Fallback() {
    return <p>Performing initial data load</p>;
}



function NoMatch() {
    return (
        <div>
            <h2>Nothing to see here!</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    );
}


export {
    Router
}
