import { Host, HostModule } from '@wix/sdk-types';
export declare const isHostModule: (val: any) => val is HostModule<unknown, Host>;
export declare function buildHostModule(val: HostModule<unknown, Host>, host: Host): unknown;
