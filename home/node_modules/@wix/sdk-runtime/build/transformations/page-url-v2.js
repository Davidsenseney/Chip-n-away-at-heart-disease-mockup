export function transformSDKPageURLV2ToRESTPageURLV2(val) {
    if (!val) {
        return;
    }
    const { pathname } = new URL(val);
    return {
        relativePath: pathname, // (e.g /product-page/a-product)
        url: val, // (e.g https://mysite.com/product-page/a-product)
    };
}
export function transformRESTPageURLV2ToSDKPageURLV2(val) {
    if (!val) {
        return;
    }
    return val.url;
}
