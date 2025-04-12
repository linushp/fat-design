/**
 * Checks if a given element has a CSS class.
 *
 * @param element the element
 * @param className the CSS class name
 */
function hasClass(element, className) {
    if (element.classList) return !!className && element.classList.contains(className);
    return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
}

/**
 * Adds a CSS class to a given element.
 *
 * @param element the element
 * @param className the CSS class name
 */

function addClass(element, className) {
    if (element.classList) element.classList.add(className); else if (!hasClass(element, className)) if (typeof element.className === 'string') element.className = element.className + " " + className; else element.setAttribute('class', (element.className && element.className.baseVal || '') + " " + className);
}

function replaceClassName(origClass, classToRemove) {
    return origClass.replace(new RegExp("(^|\\s)" + classToRemove + "(?:\\s|$)", 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
}

/**
 * Removes a CSS class from a given element.
 *
 * @param element the element
 * @param className the CSS class name
 */


function removeClass(element, className) {
    if (element.classList) {
        element.classList.remove(className);
    } else if (typeof element.className === 'string') {
        element.className = replaceClassName(element.className, className);
    } else {
        element.setAttribute('class', replaceClassName(element.className && element.className.baseVal || '', className));
    }
}

function addOneClass(element, className){
    return addClass(element, className)
}

function removeOneClass(element, className){
    return removeClass(element, className)
}

export {
    hasClass,
    addClass,
    addOneClass,
    removeClass,
    removeOneClass
}
