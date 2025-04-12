import React from "react";
import {IFormSectionContext, IFormSectionProps} from "./form-types";
import {formSectionDef} from "./form-context";
import {FormLayout} from "./form-layout";
import {getDeps} from "./deps";
import {formDefaultProps} from "./helper/constants";


function FormSection(props: IFormSectionProps): React.JSX.Element {

    const {Card} = getDeps();

    const {children, title, useCard = false, ...otherProps} = props;

    const FormSectionProvider = formSectionDef.Provider;
    const sectionContext: IFormSectionContext = {
        sectionProps: props
    };

    const prefix = props.prefix;


    const renderContent = ()=>{
        return (
            <FormSectionProvider value={sectionContext}>
                <FormLayout {...otherProps} children={children}/>
            </FormSectionProvider>
        );
    }

    const classNameCard = `${prefix}form-section-card`;
    const classNameCardContent = `${prefix}form-section-card-content`;
    if (useCard) {
        return (
            <Card title={title} free className={classNameCard}>
                <Card.Content className={classNameCardContent}>
                    {renderContent()}
                </Card.Content>
            </Card>
        );
    }

    return renderContent();
}


FormSection.defaultProps = formDefaultProps;

export {
    FormSection
}
