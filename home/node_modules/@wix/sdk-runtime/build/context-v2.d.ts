import { BuildEventDefinition, BuildRESTFunction, BuildServicePluginDefinition, EventDefinition, Host, HostModule, HostModuleAPI, RESTFunctionDescriptor, ServicePluginDefinition } from '@wix/sdk-types';
export { HostModuleAPI, HostModule, RESTFunctionDescriptor, EventDefinition, ServicePluginDefinition, BuildRESTFunction, BuildEventDefinition, BuildServicePluginDefinition, };
export declare function contextualizeHostModuleV2<THost extends Host, TAPI extends Record<string, (...args: any[]) => any>>(hostModule: HostModule<TAPI, THost>, props: (keyof TAPI)[]): TAPI & HostModule<TAPI, THost>;
export declare function contextualizeRESTModuleV2<T extends RESTFunctionDescriptor<any>>(restModule: T, elevated: boolean): BuildRESTFunction<T> & T;
export declare function contextualizeEventDefinitionModuleV2<T extends EventDefinition<any>>(eventDefinition: T): BuildEventDefinition<T> & T;
export declare function contextualizeSerivcePluginModuleV2<T extends ServicePluginDefinition<any>>(servicePlugin: T): BuildServicePluginDefinition<T> & T;
