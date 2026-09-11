import { EventDefinition } from '@wix/sdk-types';
export declare function createEventModule<T extends EventDefinition<any, string>>(eventDefinition: T): import("@wix/sdk-types").BuildEventDefinition<T> & T;
