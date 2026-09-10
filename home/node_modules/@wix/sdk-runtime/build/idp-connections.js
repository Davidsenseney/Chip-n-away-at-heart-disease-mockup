/**
 * Well-known IAM IdP connection ids for the social login providers.
 */
export const IDP_CONNECTION_IDS = {
    google: '0e6a50f5-b523-4e29-990d-f37fa2ffdd69',
    facebook: '3ecad13f-52c3-483d-911f-31dbcf2a6d23',
};
export const resolveIdpConnectionId = (idp) => {
    if (!idp) {
        return undefined;
    }
    return typeof idp === 'string' ? IDP_CONNECTION_IDS[idp] : idp.connectionId;
};
