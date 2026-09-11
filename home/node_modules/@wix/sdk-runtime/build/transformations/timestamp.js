export function transformSDKTimestampToRESTTimestamp(val) {
    return val?.toISOString();
}
export function transformRESTTimestampToSDKTimestamp(val) {
    return val ? new Date(val) : undefined;
}
