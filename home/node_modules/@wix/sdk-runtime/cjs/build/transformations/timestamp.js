"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformSDKTimestampToRESTTimestamp = transformSDKTimestampToRESTTimestamp;
exports.transformRESTTimestampToSDKTimestamp = transformRESTTimestampToSDKTimestamp;
function transformSDKTimestampToRESTTimestamp(val) {
    return val?.toISOString();
}
function transformRESTTimestampToSDKTimestamp(val) {
    return val ? new Date(val) : undefined;
}
