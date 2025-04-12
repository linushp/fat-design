import {ComponentsStore} from "../../util/comp";


function buildIcons(icons: any) {

    const Icon = ComponentsStore.getBuildIn('Icon');

    const defaultIcons = {
        // rotateLeft: <Icon type="rotate-left"/>,
        // rotateRight: <Icon type="rotate-right"/>,
        // zoomIn: <Icon type="zoom-out"/>,
        // zoomOut: <Icon type="zoom-in"/>,
        // close: <Icon type="close"/>,
        // left: <Icon type="arrow-left"/>,
        // right: <Icon type="arrow-right"/>,
        rotateLeft: <Icon type="refresh"/>,
        rotateRight: <Icon type="refresh"/>,
        zoomOut: <Icon type="minus"/>,
        zoomIn: <Icon type="add"/>,
        close: <Icon type="close"/>,
        left: <Icon type="arrow-left"/>,
        right: <Icon type="arrow-right"/>,
        flipX: <Icon type="switch"/>,
        flipY: <Icon type="switch"/>,
    }

    // rotateLeft, rotateRight, zoomIn, zoomOut, close, left, right, flipX, flipY

    if (!icons || typeof icons !== 'object') {
        return defaultIcons;
    }

    return Object.assign(defaultIcons, icons);

}


export {
    buildIcons
}
