import { AuthenticationStrategy, BuildDescriptors, BuildEventDefinition, BuildRESTFunction, BuildServicePluginDefinition, Descriptors, EventDefinition, Host, HostModule, HostModuleAPI, RESTFunctionDescriptor, ServicePluginDefinition } from '@wix/sdk-types';
export type WixContext = {
    initWixModules: <T extends Descriptors, H extends Host | undefined>(wixModules: T, elevated?: boolean) => BuildDescriptors<T, H>;
    fetchWithAuth: (urlOrRequest: string | URL | Request, requestInit?: RequestInit) => Promise<Response>;
    getAuth<T extends AuthenticationStrategy>(): T;
    graphql<Result, Variables>(query: any, variables?: Variables, opts?: {
        apiVersion: string;
    }): Promise<{
        data: Result;
        errors?: any[];
    }>;
};
export declare function resolveContext(): WixContext | undefined;
export declare function contextualizeHostModule<T extends HostModule<any, any>, P extends keyof HostModuleAPI<T>>(hostModule: T, prop: P): HostModuleAPI<T>[P];
export declare function getContextualAuth<T extends AuthenticationStrategy>(): T;
export declare function contextualizeRESTModule<T extends RESTFunctionDescriptor<any>>(restModule: T, expectedArgsLength: number): BuildRESTFunction<T>;
export declare function contextualizeEventDefinitionModule<T extends EventDefinition<any>>(eventDefinition: T): BuildEventDefinition<T>;
export declare function contextualizeSerivcePluginModule<T extends ServicePluginDefinition<any>>(servicePlugin: T): BuildServicePluginDefinition<T>;
export * from './context-v2.js';
export declare function runWithoutContext<T extends () => any>(fn: T): ReturnType<T>;
