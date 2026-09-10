import { APIMetadata, PublicMetadata } from '@wix/sdk-types';
export declare const WixBIHeaderName = "x-wix-bi-gateway";
export type WixBIHeaderValues = {
    ['environment']: 'js-sdk' | string;
    ['package-name']?: string;
    ['method-fqn']?: string;
    ['entity']?: string;
};
export declare function biHeaderGenerator(apiMetadata: APIMetadata, publicMetadata?: PublicMetadata, environment?: string): {
    [WixBIHeaderName]: string;
};
