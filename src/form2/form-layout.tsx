import {CustomLayoutProps, FloatLayoutProps, FormProps, LayoutEnum, ResponsiveGridProps} from "./form-types";
import {getDeps} from "./deps";
import React from "react";
import {FromFloatLayout} from "./layout/from-float-layout";


function FormLayout(props: FormProps) {
    const {RGrid} = getDeps();
    const {children, layout, prefix, layoutProps = {}} = props;

    if (!children) {
        return null;
    }

    if (layout === LayoutEnum.responsive) {

        const responsiveGridProps = layoutProps as ResponsiveGridProps;
        const gridProps: ResponsiveGridProps = {
            gap: 8,
            columns: 3,
        };
        if (responsiveGridProps) {
            Object.assign(gridProps, responsiveGridProps);
        }

        if (!RGrid) {
            return (
                <div>RGrid is not found</div>
            )
        }

        return (
            <RGrid {...gridProps}>{children}</RGrid>
        )
    }


    if (layout === LayoutEnum.float) {
        const floatProps = layoutProps as FloatLayoutProps;
        return (
            <FromFloatLayout prefix={prefix} floatProps={floatProps}>{children}</FromFloatLayout>
        );
    }


    if (layout === LayoutEnum.custom) {
        const s = layoutProps as CustomLayoutProps;
        if (s && s.layoutComponent) {
            const LayoutComponent = s.layoutComponent;
            return <LayoutComponent {...layoutProps}>{children}</LayoutComponent>
        }
        return children
    }

    return children;
}

export {
    FormLayout
}

