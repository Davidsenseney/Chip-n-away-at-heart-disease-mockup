export function transformSDKFieldMaskToRESTFieldMask(val) {
    if (!val) {
        return val;
    }
    return val.join(',');
}
export function transformRESTFieldMaskToSDKFieldMask(val) {
    if (!val) {
        return val;
    }
    /**
     * Support Scala FW JSON mapping bug, for more details see:
     *
     * https://github.com/wix-private/server-infra/issues/17953
     */
    if (typeof val === 'object') {
        return val.paths;
    }
    return val.split(',');
}
