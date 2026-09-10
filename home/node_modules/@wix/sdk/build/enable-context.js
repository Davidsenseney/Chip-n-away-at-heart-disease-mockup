import { wixContext } from '@wix/sdk-context';
export function enableContext(wixClient, contextType) {
    if (contextType === 'global') {
        if (globalThis.__wix_context__ != null) {
            globalThis.__wix_context__.client = wixClient;
        }
        else {
            globalThis.__wix_context__ = { client: wixClient };
        }
    }
    else {
        wixContext.client = wixClient;
    }
}
