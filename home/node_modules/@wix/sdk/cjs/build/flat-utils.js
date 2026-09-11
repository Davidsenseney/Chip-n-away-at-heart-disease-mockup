"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unflatten = unflatten;
const object_utils_js_1 = require("./object-utils.js");
function unflatten(flatObject) {
    const result = {};
    for (const [flatKey, value] of Object.entries(flatObject)) {
        // Skip prototype pollution keys
        if (isPrototypePollutionKey(flatKey)) {
            continue;
        }
        const path = (0, object_utils_js_1.toPathObject)(flatKey);
        (0, object_utils_js_1.set)(result, path, value);
    }
    return result;
}
function isPrototypePollutionKey(key) {
    return key === '__proto__' || key === 'constructor' || key === 'prototype';
}
