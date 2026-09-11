import { AuthenticationStrategy, BoundAuthenticationStrategy, BuildDescriptors, Descriptors, Host, HostModule, RESTFunctionDescriptor } from '@wix/sdk-types';
import { EmptyObject } from 'type-fest/source/empty-object.js';
import type { GraphQLFormattedError } from 'graphql';
import { EventHandlersClient } from './event-handlers-modules.js';
import { ServicePluginsClient } from './service-plugin-modules.js';
export type ContextType = 'global' | 'module';
type Headers = Record<string, string>;
export declare const X_WIX_CONSISTENT_HEADER = "X-Wix-Consistent";
/**
 * This type is used in `createClient` to ensure that the given host matches the host of the given descriptors.
 * If the host does not match, the descriptor is replaced with a host module that will throw an error when used.
 */
export type AssertHostMatches<T extends Descriptors, H extends Host<any>> = T extends HostModule<any, infer U> ? H extends undefined ? never : H extends U ? T : `The host of this module does not match host provided to createClient.` : T extends RESTFunctionDescriptor<any> ? T : {
    [Key in keyof T]: T[Key] extends Descriptors ? AssertHostMatches<T[Key], H> : T[Key];
};
type TypedQueryInput<Result = {
    [key: string]: any;
}, Variables = {
    [key: string]: any;
}> = {
    /**
     * Type to support `@graphql-typed-document-node/core`
     * @internal
     */
    __apiType?: (variables: Variables) => Result;
    /**
     * Type to support `TypedQueryDocumentNode` from `graphql`
     * @internal
     */
    __ensureTypesOfVariablesAndResultMatching?: (variables: Variables) => Result;
};
export type WixClient<H extends Host<any> | undefined = undefined, Z extends AuthenticationStrategy<H> = AuthenticationStrategy<H>, T extends Descriptors = {}> = {
    setHeaders(headers: Headers): void;
    auth: Omit<Z, 'getAuthHeaders'> & BoundAuthenticationStrategy;
    /**
     * @deprecated Use `fetchWithAuth` instead
     */
    fetch(relativeUrl: string, options: RequestInit): Promise<Response>;
    fetchWithAuth: typeof fetch;
    use<R extends Descriptors = EmptyObject>(modules: H extends Host<any> ? AssertHostMatches<R, H> : R): BuildDescriptors<R, H>;
    enableContext(contextType: ContextType, opts?: {
        elevated: boolean;
    }): void;
    graphql<Result, Variables>(query: string | ((string | String) & TypedQueryInput<Result, Variables>), variables?: Variables): Promise<{
        data: Result;
        errors?: GraphQLFormattedError[];
    }>;
    webhooks: EventHandlersClient;
    servicePlugins: ServicePluginsClient;
} & BuildDescriptors<T, H>;
export declare function createClient<H extends Host<any> | undefined = undefined, Z extends AuthenticationStrategy<H> = AuthenticationStrategy<H>, T extends Descriptors = EmptyObject>(config: {
    modules?: H extends Host<any> ? AssertHostMatches<T, H> : T;
    auth?: Z | (() => Z);
    fetch?: typeof fetch;
    headers?: Headers;
    host?: H;
    useCDN?: boolean;
    validateRequestSchema?: boolean;
}): WixClient<H, Z, T>;
export {};
