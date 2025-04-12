function toDeprecatedMsg(props: any, instead: any, component: any) {
    return `Warning: [ ${props} ] is deprecated at [ ${component} ], use [ ${instead} ] instead of it.`;
}


const enableMap = {
    debug: false,
    error: true,
    info: true,
    log: true,
    deprecated: true,
    warning: true,
}


class Logger {
    private name: string;
    private prefix: string;
    private logFnMap: any;
    private logColorMap: any;

    constructor(name: string, prefix: string = '') {

        const console = window.console || {};


        this.name = name;
        this.prefix = prefix;

        this.logFnMap = {
            debug: console.info,
            error: console.error,
            info: console.info,
            log: console.info,
            deprecated: console.error,
            warning: console.debug
        }

        this.logColorMap = {
            debug: "#2ecc71",
            error: "#CE184C",
            info: "#9081ee",
            log: "#56dbf5",
            deprecated: "#5663f5",
            warning: "#f5c856",
        };
    }

    setLogEnable = (obj) => {
        if (obj === false || obj === true) {
            Object.assign(enableMap, {
                debug: obj,
                error: obj,
                info: obj,
                log: obj,
                deprecated: obj,
                warning: obj,
            });
            return;
        }

        if (typeof obj === "object") {
            Object.assign(enableMap, obj);
        }
    };


    printLog = (level, ...args) => {

        const that = this;
        const name = that.name;
        const prefix = that.prefix;

        if (enableMap && !enableMap[level]) {
            return;
        }

        const background = that.logColorMap[level];
        const fn = that.logFnMap[level];

        const styles = [
            `background: ${background}`,
            'border-radius: 0.5em',
            'color: white',
            'font-weight: bold',
            'padding: 2px 0.5em',
        ];
        const logPrefix = ['%c' + prefix, styles.join(';')];
        if (fn) {
            if (level === 'deprecated') {
                // @ts-ignore
                fn(...logPrefix, name, toDeprecatedMsg(...args));
            } else {
                fn(...logPrefix, name, ...args);
            }
        }
    }

    debug = (...args) => {
        return this.printLog('debug', ...args);
    }
    error = (...args) => {
        return this.printLog('error', ...args);
    }
    info = (...args) => {
        return this.printLog('info', ...args);
    }
    log = (...args) => {
        return this.printLog('log', ...args);
    }
    deprecated = (...args) => {
        return this.printLog('deprecated', ...args);
    }
    warning = (...args) => {
        return this.printLog('warning', ...args);
    }

    createLogger(name, prefix): Logger {
        return new Logger(name, prefix)
    }
}


const logger = new Logger("", 'fat-design');

export {
    logger,
    Logger
}
