import { polyfill } from 'react-lifecycles-compat';
import * as _dom from './dom';
import * as _env from './env';
import * as _events from './events';
import * as _func from './func';
import * as _object from './object';
import * as _string from './string';
import * as _support from './support';
import * as _focus from './focus';
import * as _htmlId from './htmlId';
import {get} from './lodash-get';
import {logger} from './log';
import _guid from './guid';
import _KEYCODE from './keycode';
import datejs from './date';
import {constants} from './constants'
import pickAttrs from './pick-attrs';
import {wrapAutoMessage as _wrapAutoMessage} from './func-wrapper';
import {createPortal as _createPortal, findDOMNode as _findDOMNode, pReactDOM as _pReactDOM} from './react-dom'
import {ComponentsStore as _ComponentsStore} from './comp'
import {shallowElementEquals} from './shallow-element-equals'
import {ReactComponent} from './react-adaptor'

const ComponentsStore = _ComponentsStore;
const pReactDOM = _pReactDOM;
const wrapAutoMessage = _wrapAutoMessage;
const findDOMNode = _findDOMNode;
const createPortal = _createPortal;
const dom = _dom;
const env = _env;
const events = _events;
const func = _func;
const log = logger;
const obj = _object;
const str = _string;
const support = _support;
const focus = _focus;
const guid = _guid;
const KEYCODE = _KEYCODE;
const htmlId = _htmlId;

export {
    get,
    support,
    str,
    obj,
    log,
    func,
    events,
    env,
    dom,
    createPortal,
    findDOMNode,
    wrapAutoMessage,
    shallowElementEquals,
    ComponentsStore,
    constants,
    pReactDOM,
    pickAttrs,
    datejs,
    htmlId,
    KEYCODE,
    guid,
    focus,
    polyfill,
    ReactComponent
}
