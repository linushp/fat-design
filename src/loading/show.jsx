import {PopManager} from '../pop-manager';
import Loading from './main.jsx';


function LoadingTag(props) {

    const {tip, fullScreen, style} = props;
    if (fullScreen) {
        return (
            <Loading tip={tip} style={style} fullScreen={fullScreen}/>
        )
    }

    return (
        <div style={{
            position: "fixed",
            zIndex: 999,
            top: '100px',
            left: 'calc(50vw - 100px)',
            width: '200px',
            height: '200px'
        }}>
            <Loading tip={tip} style={{width: '200px', height: '200px', ...style}}/>
        </div>
    )
}

const loadingPopManager = new PopManager({
    maxCount: 1,
    Tag: PopManager.buildModalList(LoadingTag , true),
    duration: PopManager.MAX_DURATION,
}).createExports();


function showLoading({tip, fullScreen, style}) {
    loadingPopManager.show({tip, fullScreen, style})
}


function hideLoading() {
    return loadingPopManager.destroy()
}


export {
    showLoading,
    hideLoading
}
