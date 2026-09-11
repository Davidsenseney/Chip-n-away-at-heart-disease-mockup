export interface Image {
    id?: string | null;
    url?: string | null;
    height?: number | null;
    width?: number | null;
    altText?: string | null;
    urlExpirationDate?: Date | null;
    filename?: string | null;
    sizeInBytes?: string | null;
}
export declare function transformSDKImageToRESTImage(val: string): {
    id: string;
    height: number;
    width: number;
} | {
    altText: string;
    filename: string;
    url: string;
    id: string;
    height: number;
    width: number;
} | {
    url: string;
} | undefined;
export declare function transformRESTImageToSDKImage(payload: Image): string | null | undefined;
