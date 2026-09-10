export function ApiKeyStrategy({ siteId, accountId, apiKey, }) {
    const headers = { Authorization: apiKey };
    if (siteId) {
        headers['wix-site-id'] = siteId;
    }
    if (accountId) {
        headers['wix-account-id'] = accountId;
    }
    return {
        setSiteId(_siteId) {
            headers['wix-site-id'] = _siteId;
        },
        setAccountId(_accountId) {
            headers['wix-account-id'] = _accountId;
        },
        async getAuthHeaders() {
            return {
                headers,
            };
        },
    };
}
