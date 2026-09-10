import { contextualizeHostModuleV2 } from './context-v2.js';
export function createHostModule(hostModuleAPI) {
    return contextualizeHostModuleV2({
        __type: 'host',
        create: (host) => Object.entries(hostModuleAPI).reduce((acc, [key, fn]) => ({
            ...acc,
            [key]: fn(host),
        }), {}),
    }, Object.keys(hostModuleAPI));
}
