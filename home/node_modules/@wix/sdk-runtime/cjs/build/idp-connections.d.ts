import type { IdentityProvider } from '@wix/sdk-types';
/**
 * Well-known IAM IdP connection ids for the social login providers.
 */
export declare const IDP_CONNECTION_IDS: {
    readonly google: "0e6a50f5-b523-4e29-990d-f37fa2ffdd69";
    readonly facebook: "3ecad13f-52c3-483d-911f-31dbcf2a6d23";
};
export declare const resolveIdpConnectionId: (idp?: IdentityProvider) => string | undefined;
