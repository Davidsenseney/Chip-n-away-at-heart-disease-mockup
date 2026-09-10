"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VeloAuthStrategy = VeloAuthStrategy;
// eslint-disable-next-line @typescript-eslint/no-redeclare
function VeloAuthStrategy() {
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
