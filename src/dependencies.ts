import bigjs from 'big.js';
import classnames from 'classnames';
import dayjs from 'dayjs';
import clonedeep from 'lodash.clonedeep';
import debounce from 'lodash.debounce';
import get from 'lodash.get';
import set from 'lodash.set';


export default {
    bigjs: bigjs,
    dayjs: dayjs,
    classnames: classnames,
    lodash: {
        get,
        set,
        debounce,
        clonedeep
    }
} as any;
