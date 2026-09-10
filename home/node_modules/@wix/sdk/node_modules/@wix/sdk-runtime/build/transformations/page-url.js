export function transformSDKPageURLToRESTPageURL(val) {
    const { host, pathname } = new URL(val);
    return {
        base: host, // (e.g mysite.wixsite.com/mysite)
        path: pathname, // (e.g /product-page/a-product)
    };
}
export function transformRESTPageURLToSDKPageURL(val) {
    if (!val) {
        return;
    }
    if (['http://', 'https://'].some((protocol) => val.base?.startsWith(protocol))) {
        return `${val.base}${val.path}`;
    }
    return `http://${val.base}${val.path}`;
}
