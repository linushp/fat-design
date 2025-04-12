

const document: any = window.document;
const navigator = window.navigator;



function getIsMacOS() {
    const userAgent = navigator.userAgent.toLowerCase();
    return /macintosh|mac os x/i.test(userAgent);
}

function createEnv(){
    /**
     * IE浏览器的渲染引擎版本号
     * 注意：此属性与浏览器版本号不同，IE的渲染引擎版本号是可以通过HTML header或手动设置去更改的
     * @type {Number} 6 ~ 11
     */
    const ieVersion = typeof document !== 'undefined' ? document.documentMode : undefined;

    const isMacOS = getIsMacOS();

    return {
        ieVersion,
        isMacOS
    }
}


const envObject = createEnv();


export const ieVersion = envObject.ieVersion;
export const isMacOS = envObject.isMacOS;

export default {
    ieVersion,
    isMacOS
};
