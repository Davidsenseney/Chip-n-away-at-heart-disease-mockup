import { RESTFunctionDescriptor } from '@wix/sdk-types';
export { RESTResponseToSDKResponseRenameMap } from './constants.js';
export declare function createRESTModule<T extends RESTFunctionDescriptor>(descriptor: T, elevated?: boolean): import("@wix/sdk-types").BuildRESTFunction<T> & T;
export declare function toURLSearchParams(params: any, isComplexRequest?: boolean): URLSearchParams;
type Mapping = {
    srcPath: string;
    destPath: string;
};
type DomainToMappings = Record<string, Mapping[]>;
export type ResolveUrlOpts = {
    protoPath: string;
    domainToMappings: DomainToMappings;
    data?: object;
    host: string;
};
export declare function resolveUrl(opts: ResolveUrlOpts): string;
