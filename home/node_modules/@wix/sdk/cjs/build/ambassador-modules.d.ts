import type { HttpClient as SDKHttpClient, AmbassadorFactory } from '@wix/sdk-types';
export declare const toHTTPModule: <Request, Response>(factory: AmbassadorFactory<Request, Response>) => (httpClient: SDKHttpClient) => (payload: Request) => Promise<Response>;
export declare const isAmbassadorModule: (module: any) => boolean;
