import Component from "./component.jsx";
import Balloon from "../balloon/index.jsx";
import PropTypes from 'prop-types';
import ConfigProvider from "../config-provider";


const BalloonConfirm = ConfigProvider.configFn(Component, {});

const PopConfirmInner = (props, ref) => {
    const {children, title, content, ...others} = props;
    return (
        <BalloonConfirm {...others} trigger={children}>
            {title}
            {content}
        </BalloonConfirm>
    )
};

PopConfirmInner.propTypes = {
    ...Balloon.propTypes,
    title: PropTypes.any.isRequired,
    children: PropTypes.any.isRequired,
};
PopConfirmInner.displayName = 'PopConfirm';

const PopConfirm = ConfigProvider.configFn(PopConfirmInner, {});

// antd 的 PopConfirm 风格的API
BalloonConfirm.PopConfirm = PopConfirm;

export {
    PopConfirm
}
export default BalloonConfirm;
