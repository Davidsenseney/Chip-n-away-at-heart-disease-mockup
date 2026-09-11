import { BuildDescriptors, Descriptors, Host } from './index.js';
export type WixContext = {
    initWixModules: <T extends Descriptors, H extends Host>(wixModules: T, elevated?: boolean) => BuildDescriptors<T, H>;
};
/**
 * Sets the Wix context globally.
 * @param wixContext The Wix context to set globally.
 * @param options Options for setting the context.
 * @param options.dangerouslyOverride If true, the context will be set even if it already exists.
 * @deprecated Use `WixClient.enableContext` instead.
 */
export declare function setGlobalWixContext(wixContext: WixContext, options?: {
    dangerouslyOverride?: boolean;
}): void;
