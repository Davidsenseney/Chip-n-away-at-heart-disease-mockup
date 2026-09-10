export const WixBIHeaderName = 'x-wix-bi-gateway';
export function biHeaderGenerator(apiMetadata, publicMetadata, environment) {
    return {
        [WixBIHeaderName]: objectToKeyValue({
            environment: `js-sdk${environment ? `-${environment}` : ``}`,
            'package-name': apiMetadata.packageName ?? publicMetadata?.PACKAGE_NAME,
            'method-fqn': apiMetadata.methodFqn,
            entity: apiMetadata.entityFqdn,
        }),
    };
}
function objectToKeyValue(input) {
    return Object.entries(input)
        .filter(([_, value]) => Boolean(value))
        .map(([key, value]) => `${key}=${value}`)
        .join(',');
}
