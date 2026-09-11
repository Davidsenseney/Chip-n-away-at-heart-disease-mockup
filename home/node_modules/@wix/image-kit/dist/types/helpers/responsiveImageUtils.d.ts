import type { Sources } from '../types';
export declare const getResponsiveImageProps: (imageProps: Record<string, any>, targetWidth: number, targetHeight: number) => {
    fallbackSrc: string;
    srcset: string;
    css: {
        img?: {
            top?: string | number | undefined;
            bottom?: string | number | undefined;
            left?: string | number | undefined;
            right?: string | number | undefined;
            width?: string | number | undefined;
            height?: string | number | undefined;
            objectFit?: string | undefined;
        } | undefined;
        container?: {
            backgroundSize?: string | undefined;
            backgroundRepeat?: string | undefined;
            backgroundPosition?: string | undefined;
        } | undefined;
    } | undefined;
    sources?: undefined;
} | {
    fallbackSrc: string;
    sources: Sources[];
    css: Record<string, any>;
    srcset?: undefined;
};
//# sourceMappingURL=responsiveImageUtils.d.ts.map