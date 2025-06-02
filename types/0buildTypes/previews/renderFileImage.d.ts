import React from "react";
interface IRenderProps {
    value: any;
    prefix?: string;
}
interface IRenderCfg {
    deep: number;
    index: number;
    prefix: string;
}
interface IRenderLinkFnProps extends IRenderCfg {
    downloadURL: string;
    imgURL?: string;
    url?: string;
    name?: string;
}
type IRenderLinkFn = (props: IRenderLinkFnProps) => any;
declare function renderFileDownload(value: any, cfg: IRenderCfg): any;
declare function renderFileImage(value: any, cfg: IRenderCfg): any;
declare function renderFileAutoBySuffix(value: any, cfg: IRenderCfg): any;
declare const RenderFileDownload: React.MemoExoticComponent<{
    (props: IRenderProps): any;
    displayName: string;
    defaultProps: {
        prefix: string;
    };
}>;
declare const RenderFileImage: React.MemoExoticComponent<{
    (props: IRenderProps): any;
    displayName: string;
    defaultProps: {
        prefix: string;
    };
}>;
declare const RenderFileAutoBySuffix: React.MemoExoticComponent<{
    (props: IRenderProps): any;
    displayName: string;
    defaultProps: {
        prefix: string;
    };
}>;
export { RenderFileImage, renderFileImage, renderFileDownload, RenderFileDownload, renderFileAutoBySuffix, RenderFileAutoBySuffix, };
export type { IRenderProps, IRenderCfg, IRenderLinkFnProps, IRenderLinkFn };
