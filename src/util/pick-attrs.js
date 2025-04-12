const attributes = `accept acceptCharset accessKey action allowFullScreen allowTransparency
alt async autoComplete autoFocus autoPlay capture cellPadding cellSpacing challenge
charSet checked classID class className colSpan cols content contentEditable contextMenu
controls coords crossOrigin data dateTime default defer dir disabled download draggable
encType form formAction formEncType formMethod formNoValidate formTarget frameBorder
headers height hidden high href hrefLang htmlFor httpEquiv icon id inputMode integrity
is keyParams keyType kind label lang list loop low manifest marginHeight marginWidth max maxLength media
mediaGroup method min minLength multiple muted name noValidate nonce open
optimum pattern placeholder poster preload radioGroup readOnly rel required
reversed role rowSpan rows sandbox scope scoped scrolling seamless selected
shape size sizes span spellCheck src srcDoc srcLang srcSet start step style
summary tabIndex target title type useMap value width wmode wrap`
    .replace(/\s+/g, ' ')
    .replace(/\t|\n|\r/g, '')
    .split(' ');

const eventsName = `onCopy onCut onPaste onCompositionEnd onCompositionStart onCompositionUpdate onKeyDown
    onKeyPress onKeyUp onFocus onBlur onChange onInput onSubmit onClick onContextMenu onDoubleClick
    onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown
    onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onSelect onTouchCancel
    onTouchEnd onTouchMove onTouchStart onScroll onWheel onAbort onCanPlay onCanPlayThrough
    onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata
    onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting onLoad onError`
    .replace(/\s+/g, ' ')
    .replace(/\t|\n|\r/g, '')
    .split(' ');

const attrsPrefix = ['data-', 'aria-'];


const attributesSet = new Set(attributes);
const eventsNameSet = new Set(eventsName);

function pickAttrs(props){
    if (!props) {
        return {};
    }
    const keys = Object.keys(props);
    const attrs = {};
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (attributesSet.has(key) || eventsNameSet.has(key)) {
            attrs[key] = props[key];
        } else if (key.startsWith('data-') || key.startsWith('aria-')) {
            attrs[key] = props[key];
        }
    }
    return attrs;
}

//
// /**
//  * 过滤掉无效的透传到 DOM 属性
//  */
// export default props => {
//     const attrs = {};
//     for (const key in props) {
//         if (attributes.indexOf(key) > -1 || eventsName.indexOf(key) > -1) {
//             attrs[key] = props[key];
//         } else if (attrsPrefix.map(prefix => new RegExp(`^${prefix}`)).some(reg => key.replace(reg, '') !== key)) {
//             attrs[key] = props[key];
//         }
//     }
//     return attrs;
// };


export default pickAttrs;
