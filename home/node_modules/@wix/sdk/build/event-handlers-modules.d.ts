import { AuthenticationStrategy, EventDefinition, EventHandler, EventIdentity, AccountInfo } from '@wix/sdk-types';
import { Emitter } from './nanoevents.js';
export declare const isEventHandlerModule: (val: any) => val is EventDefinition<unknown, string>;
export declare function buildEventDefinition<T extends EventDefinition<any, string>>(eventDefinition: T, registerHandler: (eventDefinition: T, handler: EventHandler<T>) => void): (handler: EventHandler<T>) => void;
type ResolvePossibleEvents<T extends EventDefinition<any>[]> = {
    [K in keyof T]: T[K] extends EventDefinition<any> ? {
        eventType: T[K]['type'];
        payload: T[K]['__payload'];
    } : never;
} extends (infer U)[] ? U : never;
export type ProcessedEvent<T extends EventDefinition<any>[] = []> = {
    instanceId: string;
    identity?: EventIdentity;
    accountInfo?: AccountInfo;
} & (T['length'] extends 0 ? {
    eventType: string;
    payload: unknown;
} : ResolvePossibleEvents<T>);
export type EventHandlersClient = Emitter<{
    registered: (event: EventDefinition<any>) => void;
}> & {
    getRegisteredEvents(): Map<string, {
        eventDefinition: EventDefinition;
        handler: EventHandler<EventDefinition>;
    }[]>;
    process<ExpectedEvents extends EventDefinition<any>[] = []>(jwt: string, opts?: {
        expectedEvents: ExpectedEvents;
    }): Promise<ProcessedEvent<ExpectedEvents>>;
    processRequest<ExpectedEvents extends EventDefinition<any>[] = []>(request: Request, opts?: {
        expectedEvents: ExpectedEvents;
    }): Promise<ProcessedEvent<ExpectedEvents>>;
    parseJWT(jwt: string): Promise<ProcessedEvent>;
    parseRequest(request: Request): Promise<ProcessedEvent>;
    executeHandlers(event: ProcessedEvent): Promise<void>;
    apps: {
        /**
         * @deprecated Use [onAppInstanceInstalled](https://dev.wix.com/docs/sdk/backend-modules/app-management/app-instances/on-app-instance-installed) instead
         */
        AppInstalled: EventDefinition<{
            appId: string;
            originInstanceId: string;
        }, 'AppInstalled'>;
        /**
         * @deprecated Use [onAppInstanceRemoved](https://dev.wix.com/docs/sdk/backend-modules/app-management/app-instances/on-app-instance-removed) instead
         */
        AppRemoved: EventDefinition<{
            appId: string;
        }, 'AppRemoved'>;
    };
};
export declare function eventHandlersModules(getAuthStrategy: () => AuthenticationStrategy<any>): {
    initModule(eventDefinition: EventDefinition<any, string>): (handler: EventHandler<EventDefinition<any, string>>) => void;
    client: EventHandlersClient;
};
export {};
