import {getDisplayName, providerFunctions} from "./functions";
import React, {useImperativeHandle, useContext, useRef} from "react";
import {configContext} from "./context";

import {pickOthers, pickProps} from "../../util/object";
import ErrorBoundary from "./error-boundary";
import hoistNonReactStatic from "hoist-non-react-statics";
import {log} from "../../util";


function hoistOptionMarks(NewComp: any, options: any) {
    if (!options) {
        return;
    }
    if (options._typeMark) {
        NewComp._typeMark = options._typeMark;
    }
    if (options._supportPreview) {
        NewComp._supportPreview = options._supportPreview;
    }
}

function withConsumer(Component: any, options: any = {}) {
    const displayName = getDisplayName(Component, options);
    const newCompPropTypes = {...Component.propTypes};

    const NewComp = React.forwardRef((props: any, ref: any) => {

        const instanceRef = useRef(null);
        const contextValues = useContext(configContext);
        const contextProps = providerFunctions.getContextProps({props, contextValues, displayName});

        const holdProps =  ['prefix', 'locale', 'rtl', 'device', 'popupContainer'];
        const contextCommonProps = pickProps(holdProps, contextProps);
        const others = pickOthers(holdProps, props);

        const defaultProps = contextProps.defaultPropsConfig[displayName] || {};

        const newOthers = options.transform ? options.transform(others, log.deprecated) : others;

        const compProps = {
            ...defaultProps,
            ...contextCommonProps,
            ...newOthers
        }

        if (['Overlay', 'Popup'].indexOf(displayName) < 0) {
            delete compProps.popupContainer;
        }


        useImperativeHandle(ref, () => {
            const instance = instanceRef.current as any;
            if (!instance) {
                return instance;
            }
            instance.getInstance = ()=> {
                return instance;
            }
            return instance;
        });


        const content = (
            <Component ref={instanceRef} {...compProps} />
        );

        const {open, ...othersBoundary} = contextProps.errorBoundary as any;
        return open ? <ErrorBoundary {...othersBoundary} componentName={displayName}>{content}</ErrorBoundary> : content;
    });

    NewComp.displayName = `WithConsumer(${displayName})`;
    NewComp.propTypes = newCompPropTypes;

    hoistNonReactStatic(NewComp, Component);
    hoistOptionMarks(NewComp, options);

    //
    // const NewComp2 = React.memo(NewComp);
    // NewComp2.displayName = `WithConsumer2(${displayName})`;
    //
    // hoistNonReactStatic(NewComp2, Component);
    // hoistOptionMarks(NewComp2, options);

    return NewComp;
}


export {
    withConsumer
}
