export function transformSDKBytesToRESTBytes(val) {
    const chars = val.reduce((res, c) => res + String.fromCharCode(c), '');
    return btoa(chars);
}
export function transformRESTBytesToSDKBytes(val) {
    return Uint8Array.from(atob(val), (c) => c.charCodeAt(0));
}
