export interface Document {
    id?: string | null;
    url?: string | null;
    urlExpirationDate?: Date | null;
    sizeInBytes?: string | null;
    filename?: string | null;
}
export declare function transformSDKDocumentToRESTDocument(val: string): Document;
export declare function transformRESTDocumentToSDKDocument(payload: Document): string | null | undefined;
