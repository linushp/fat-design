declare class Logger {
    private name;
    private prefix;
    private logFnMap;
    private logColorMap;
    constructor(name: string, prefix?: string);
    setLogEnable: (obj: any) => void;
    printLog: (level: any, ...args: any[]) => void;
    debug: (...args: any[]) => void;
    error: (...args: any[]) => void;
    info: (...args: any[]) => void;
    log: (...args: any[]) => void;
    deprecated: (...args: any[]) => void;
    warning: (...args: any[]) => void;
    createLogger(name: any, prefix: any): Logger;
}
declare const logger: Logger;
export { logger, Logger };
