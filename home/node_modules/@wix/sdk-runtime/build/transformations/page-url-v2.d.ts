export interface PageUrlV2 {
    relativePath?: string | null;
    url?: string | null;
}
export declare function transformSDKPageURLV2ToRESTPageURLV2(val: string): {
    relativePath: string;
    url: string;
} | undefined;
export declare function transformRESTPageURLV2ToSDKPageURLV2(val: PageUrlV2): string | null | undefined;
