type ImageStatus = 'normal' | 'error' | 'loading';
export interface IUseStateParam {
    src?: string;
    isCustomPlaceholder?: any;
    fallback?: string;
}
export default function useStatus({ src, isCustomPlaceholder, fallback, }: IUseStateParam): readonly [(img?: HTMLImageElement | null) => void, {
    src: string;
    onLoad?: undefined;
} | {
    onLoad: () => void;
    src: string;
}, ImageStatus];
export {};
