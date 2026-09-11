export type GoogleProtoDuration = {
    seconds?: string;
    nanos?: number;
};
export declare function transformSDKDurationToRESTDuration(duration: GoogleProtoDuration): string;
export declare function transformRESTDurationToSDKDuration(val: string): {
    seconds: string;
    nanos: number;
};
