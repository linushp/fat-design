import {PageCardProps} from "./types";
import ConfigProvider from "../../config-provider";
import classNames from "classnames";
const defaultPrefix = ConfigProvider.defaultPrefix;


function PageCard(props: PageCardProps){
    const {prefix, children, title, mode} = props;

    const cls = classNames({
        [`${prefix}page-card`]: true,
        [`${prefix}page-card-${mode}`]: true,
    });

    return (
        <div className={cls}>
            <div className={`${prefix}page-card-inner`}>
                {children}
            </div>
        </div>
    );
}


function Divider(props: any){
    const {prefix} = props;
    return (
        <div className={`${prefix}page-card-divider`}/>
    );
}

Divider.defaultProps = {
    prefix: defaultPrefix,
}

PageCard.defaultProps = {
    prefix: defaultPrefix,
    mode: null, // 'nobg'
}

PageCard.Divider = Divider;

export default PageCard;
