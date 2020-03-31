export = index;
declare class index {
    static defaultOptions: {
        compression: string;
        density: number;
        format: string;
        quality: number;
        savedir: string;
        savename: string;
        size: string;
    };
    constructor(...args: any[]);
    options: any;
    convert(e: any, ...args: any[]): any;
    convertBulk(e: any, ...args: any[]): any;
    convertToBase64(e: any, ...args: any[]): any;
    convertToBase64Bulk(e: any, ...args: any[]): any;
    fileExists(e: any): any;
    getFilePath(e: any): any;
    getOption(e: any): any;
    getPage(e: any, ...args: any[]): any;
    getPageCount(e: any, ...args: any[]): any;
    graphicMagickBaseCommand(e: any, t: any): any;
    identify(e: any, t: any): any;
    isValidPDF(e: any): any;
    setOption(e: any, t: any): any;
    streamToBase64(e: any, ...args: any[]): any;
    toBase64(e: any, t: any, a: any): any;
    toImage(e: any, ...args: any[]): any;
    writeImage(e: any, n: any, a: any, i: any): any;
}
