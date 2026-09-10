import { BuildRESTFunction, PublicMetadata, RESTFunctionDescriptor, WixClientErrorHandler } from '@wix/sdk-types';
export type RESTModuleOptions = {
    HTTPHost?: string;
};
export declare function buildRESTDescriptor<T extends RESTFunctionDescriptor>(origFunc: T, publicMetadata: PublicMetadata, boundFetch: typeof fetch, errorHandler: WixClientErrorHandler | undefined, wixAPIFetch: (relativeUrl: string, options: RequestInit) => Promise<Response>, getActiveToken?: () => string | undefined, getAuthHeaders?: () => Promise<{
    headers: Record<string, string>;
}>, options?: RESTModuleOptions, hostName?: string | undefined, useCDN?: boolean, validateRequestSchema?: boolean): BuildRESTFunction<T>;
