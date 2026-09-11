import type { Image } from './image.js';
export interface VideoResolution {
    url?: string | null;
    height?: number | null;
    width?: number | null;
    poster?: Image | null;
    format?: string | null;
    urlExpirationDate?: Date | null;
    sizeInBytes?: string | null;
    quality?: string | null;
    filename?: string | null;
    durationInSeconds?: number | null;
    private?: boolean | null;
    assetKey?: string | null;
}
export interface VideoV2 {
    id?: string | null;
    url?: string | null;
    resolutions?: VideoResolution[] | null;
    filename?: string | null;
    posters?: Image[] | null;
    sizeInBytes?: string | null;
    urlExpirationDate?: Date | null;
}
export declare function transformSDKVideoV2ToRESTVideoV2(val: string): VideoV2 | undefined;
export declare function transformRESTVideoV2ToSDKVideoV2(val: VideoV2): string | null | undefined;
