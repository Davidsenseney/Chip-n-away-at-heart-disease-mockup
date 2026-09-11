"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformSDKBytesToRESTBytes = transformSDKBytesToRESTBytes;
exports.transformRESTBytesToSDKBytes = transformRESTBytesToSDKBytes;
function transformSDKBytesToRESTBytes(val) {
    const chars = val.reduce((res, c) => res + String.fromCharCode(c), '');
    return btoa(chars);
}
function transformRESTBytesToSDKBytes(val) {
    return Uint8Array.from(atob(val), (c) => c.charCodeAt(0));
}
