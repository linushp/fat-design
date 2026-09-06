import React from "react";
import './renderFileImage.scss';
interface IRenderProps {
    value: any;
    prefix?: string;
    isList?: boolean;
}
interface IRenderCfg {
    deep: number;
    index: number;
    prefix: string;
    isList?: boolean;
}
interface IRenderLinkFnProps extends IRenderCfg {
    downloadURL: string;
    imgURL?: string;
    url?: string;
    name?: string;
}
type IRenderLinkFn = (props: IRenderLinkFnProps) => any;
declare function renderFileWebOffice(value: any, cfg: IRenderCfg): any;
declare function renderFileDownload(value: any, cfg: IRenderCfg): any;
declare function renderFileImage(value: any, cfg: IRenderCfg): any;
declare function renderFileAutoBySuffix(value: any, cfg: IRenderCfg): import("react/jsx-runtime").JSX.Element;
declare const RenderFileDownload: React.MemoExoticComponent<{
    (props: IRenderProps): any;
    displayName: string;
}>;
declare const RenderFileImage: React.MemoExoticComponent<{
    (props: IRenderProps): any;
    displayName: string;
}>;
declare const RenderFileAutoBySuffix: React.MemoExoticComponent<{
    (props: IRenderProps): any;
    displayName: string;
}>;
declare const RenderFileWebOffice: React.MemoExoticComponent<{
    (props: IRenderProps): any;
    displayName: string;
}>;
export { RenderFileImage, renderFileImage, renderFileDownload, RenderFileDownload, renderFileAutoBySuffix, RenderFileAutoBySuffix, renderFileWebOffice, RenderFileWebOffice, };
export type { IRenderProps, IRenderCfg, IRenderLinkFnProps, IRenderLinkFn };
