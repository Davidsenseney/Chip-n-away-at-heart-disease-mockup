import { createRESTModule } from '@wix/sdk-runtime/rest-modules';
export function elevate(restModule) {
    return createRESTModule(restModule, true);
}
export const fetchWithAuth = createRESTModule((restModuleOpts) => {
    return ((url, options) => restModuleOpts.fetchWithAuth(url, options));
});
export { graphql } from './graphql.js';
export { setGlobalWixContext } from './wix-context.js';
export { enableContext } from './enable-context.js';
