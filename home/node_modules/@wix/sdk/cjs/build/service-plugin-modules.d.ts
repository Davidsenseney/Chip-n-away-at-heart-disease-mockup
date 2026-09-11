import { AuthenticationStrategy, ServicePluginContract, ServicePluginDefinition } from '@wix/sdk-types';
import { Emitter } from './nanoevents.js';
export declare const isServicePluginModule: (val: any) => val is ServicePluginDefinition<ServicePluginContract>;
export type UnknownServicePluginResponse = unknown;
type ServicePluginRequestMetadata = {
    instanceId: string;
    appExtensionType: string;
};
type ServicePluginRequest = {
    metadata: ServicePluginRequestMetadata;
    request: unknown;
};
export type ServicePluginsClient = Emitter<{
    registered: (servicePluginDefinition: ServicePluginDefinition<ServicePluginContract>) => void;
}> & {
    getRegisteredServicePlugins(): Map<string, {
        servicePluginDefinition: ServicePluginDefinition<any>;
        implementation: ServicePluginContract;
    }[]>;
    process(request: {
        url: string;
        body: string;
    }): Promise<unknown>;
    processRequest(request: Request): Promise<Response>;
    parseJWT(jwt: string): Promise<ServicePluginRequest>;
    parseRequest(request: Request): Promise<ServicePluginRequest>;
    executeHandler(servicePluginRequest: ServicePluginRequest, url: string): Promise<UnknownServicePluginResponse>;
};
export declare function servicePluginsModules(getAuthStrategy: () => AuthenticationStrategy<any>): {
    initModule<T extends ServicePluginDefinition<any>>(servicePluginDefinition: T): (implementation: T["__contract"]) => void;
    client: ServicePluginsClient;
};
export {};
