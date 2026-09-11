// eslint-disable-next-line @typescript-eslint/no-redeclare
export function VeloAuthStrategy() {
    return {
        getAuthHeaders: async () => {
            let authHeader;
            if (globalThis.origin) {
                authHeader =
                    // @ts-expect-error $ns is available in the closure created by Velo
                    $ns['wix-elementorySupport'].getRequestOptions().headers
                        .Authorization;
            }
            else {
                authHeader =
                    // @ts-expect-error
                    process.domain.webMethodInfo.request.headers['x-wix-authorization'];
            }
            return { headers: { Authorization: authHeader } };
        },
    };
}
