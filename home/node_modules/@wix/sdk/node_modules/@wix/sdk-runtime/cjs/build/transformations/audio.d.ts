export interface Audio {
    id?: string | null;
    url?: string | null;
    urlExpirationDate?: Date | null;
    sizeInBytes?: string | null;
    filename?: string | null;
    duration?: number | null;
    private?: boolean | null;
    assetKey?: string | null;
    format?: string | null;
    quality?: string | null;
}
export declare function transformSDKAudioToRESTAudio(val: string): Audio;
export declare function transformRESTAudioToSDKAudio(val: Audio): string | undefined;
