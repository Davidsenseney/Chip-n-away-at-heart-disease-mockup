"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setGlobalWixContext = setGlobalWixContext;
/**
 * Sets the Wix context globally.
 * @param wixContext The Wix context to set globally.
 * @param options Options for setting the context.
 * @param options.dangerouslyOverride If true, the context will be set even if it already exists.
 * @deprecated Use `WixClient.enableContext` instead.
 */
function setGlobalWixContext(wixContext, options = {}) {
    if (!globalThis.__wix_context__ || options.dangerouslyOverride) {
        globalThis.__wix_context__ = wixContext;
    }
}
