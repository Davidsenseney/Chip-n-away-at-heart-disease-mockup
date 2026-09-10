export declare const getDefaultContentHeader: (options: RequestInit | undefined) => {
    "Content-Type"?: string;
};
export declare const isObject: (val: any) => val is Object;
export declare function parsePublicKeyIfEncoded(publicKey: string): string;
