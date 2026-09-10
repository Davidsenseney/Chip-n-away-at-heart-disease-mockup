import { AuthenticationStrategy } from '@wix/sdk-types';
export interface IApiKeyStrategy extends AuthenticationStrategy {
    setSiteId(siteId?: string): void;
    setAccountId(accountId?: string): void;
}
type Context = {
    siteId: string;
    accountId?: string;
} | {
    siteId?: string;
    accountId: string;
};
export declare function ApiKeyStrategy({ siteId, accountId, apiKey, }: {
    apiKey: string;
} & Context): IApiKeyStrategy;
export {};
