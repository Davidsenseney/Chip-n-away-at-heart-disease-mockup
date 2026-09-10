"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObject = exports.getDefaultContentHeader = void 0;
exports.parsePublicKeyIfEncoded = parsePublicKeyIfEncoded;
// we follow a simplified version of the axios convention
// https://github.com/axios/axios/blob/649d739288c8e2c55829ac60e2345a0f3439c730/lib/defaults/index.js#L65
const getDefaultContentHeader = (options) => {
    if (options?.method &&
        ['post', 'put', 'patch'].includes(options.method.toLocaleLowerCase()) &&
        options.body) {
        return { 'Content-Type': 'application/json' };
    }
    return {};
};
exports.getDefaultContentHeader = getDefaultContentHeader;
const isObject = (val) => val && typeof val === 'object' && !Array.isArray(val);
exports.isObject = isObject;
function parsePublicKeyIfEncoded(publicKey) {
    if (publicKey.includes('\n') || publicKey.includes('\r')) {
        // publicKey is multi-line string, can be used as is
        return publicKey.trim();
    }
    else {
        // publicKey is base64 encoded
        return typeof atob !== 'undefined'
            ? atob(publicKey)
            : Buffer.from(publicKey, 'base64').toString('utf-8');
    }
}
