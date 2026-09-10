import { set, toPathObject } from './object-utils.js';
export function unflatten(flatObject) {
    const result = {};
    for (const [flatKey, value] of Object.entries(flatObject)) {
        // Skip prototype pollution keys
        if (isPrototypePollutionKey(flatKey)) {
            continue;
        }
        const path = toPathObject(flatKey);
        set(result, path, value);
    }
    return result;
}
function isPrototypePollutionKey(key) {
    return key === '__proto__' || key === 'constructor' || key === 'prototype';
}
