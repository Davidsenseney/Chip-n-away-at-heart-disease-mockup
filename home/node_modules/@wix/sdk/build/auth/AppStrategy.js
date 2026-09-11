import { parsePublicKeyIfEncoded } from '../helpers.js';
import { getTokenInfo } from '../get-token-info.js';
/**
 * Creates an authentication strategy for Wix Apps OAuth installation process.
 * Use this authentication strategy when making requests to Wix APIs from your Wix App backend.
 * @param opts Options for initializing the authentication strategy
 * @param opts.appId The Wix App ID
 * @param opts.appSecret The Wix App Secret
 * @param opts.refreshToken An optional refresh token previously retrieved from Wix OAuth API
 * @param opts.instanceId An optional instance ID of the Wix App instance the client is making requests on behalf of
 * @param opts.accessToken An optional access token previously retrieved from a client Wix Extension
 * @param opts.publicKey An optional public key for validating webhook requests (supports both PEM and base64 encoded keys)
 * @returns An authentication strategy that can be used with WixClient
 * @example
 * ```ts
 * import { AppStrategy, createClient } from '@wix/sdk';
 * import { products } from '@wix/stores';
 *
 * const client = createClient({
 *  auth: AppStrategy({
 *   appId: 'appId',
 *   appSecret: 'appSecret',
 *  }),
 *  modules: { products },
 * });
 *
 * const installUrl = client.auth.getInstallUrl({ redirectUrl: 'https://example.com' });
 * // Redirect the user to the installUrl
 *
 * ...
 *
 * // in the callback handler of your http server
 * // req.url is the url of the callback request
 * const { instanceId, refreshToken } = await client.auth.handleOAuthCallback(req.url);
 *
 * // store the instanceId and refreshToken in your database
 * // use the authorized client
 * const products = await client.products.queryProducts().find();
 *
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare
export function AppStrategy(opts) {
    let refreshToken = 'refreshToken' in opts ? opts.refreshToken : undefined;
    let cachedToken;
    return {
        getInstallUrl({ redirectUrl, token, state }) {
            const params = new URLSearchParams();
            params.set('redirectUrl', redirectUrl);
            params.set('appId', opts.appId);
            if (state) {
                params.set('state', state);
            }
            if (token) {
                params.set('token', token);
            }
            return `https://www.wix.com/installer/install?${params.toString()}`;
        },
        async handleOAuthCallback(url, oauthOpts) {
            if (!opts.appSecret) {
                throw new Error('App secret is required for handling OAuth callback. Make sure to pass it to the AppStrategy');
            }
            const params = new URLSearchParams(new URL(url).search);
            const state = params.get('state');
            if (state && oauthOpts?.state && state !== oauthOpts.state) {
                throw new Error(`Invalid OAuth callback URL. Expected state to be "${oauthOpts.state}" but got "${state}"`);
            }
            const code = params.get('code');
            const instanceId = params.get('instanceId');
            if (!code || !instanceId) {
                throw new Error('Invalid OAuth callback URL. Make sure you pass the url including the code and instanceId query params.');
            }
            const tokensRes = await fetch('https://www.wixapis.com/oauth/access', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code,
                    client_id: opts.appId,
                    client_secret: opts.appSecret,
                    grant_type: 'authorization_code',
                }),
            });
            if (tokensRes.status !== 200) {
                throw new Error(`Failed to exchange authorization code for refresh token. Unexpected status code from Wix OAuth API: ${tokensRes.status}, request id: ${tokensRes.headers.get('x-wix-request-id')}`);
            }
            const tokens = await tokensRes.json();
            refreshToken = tokens.refresh_token;
            return {
                instanceId,
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token,
            };
        },
        async getAuthHeaders() {
            if (cachedToken && cachedToken.expiresAt > Date.now()) {
                return {
                    headers: {
                        Authorization: cachedToken.token,
                    },
                };
            }
            if ('refreshToken' in opts || refreshToken) {
                if (!opts.appSecret) {
                    throw new Error('App secret is required for retrieving app-level access tokens. Make sure to pass it to the AppStrategy');
                }
                const tokensRes = await fetch('https://www.wixapis.com/oauth/access', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        refresh_token: refreshToken,
                        client_id: opts.appId,
                        client_secret: opts.appSecret,
                        grant_type: 'refresh_token',
                    }),
                });
                if (tokensRes.status !== 200) {
                    throw new Error(`Failed to exchange refresh token for access token. Unexpected status code from Wix OAuth API: ${tokensRes.status}, request id: ${tokensRes.headers.get('x-wix-request-id')}`);
                }
                const tokens = (await tokensRes.json());
                refreshToken = tokens.refresh_token;
                return {
                    headers: {
                        Authorization: tokens.access_token,
                    },
                };
            }
            else if ('instanceId' in opts) {
                if (!opts.appSecret) {
                    throw new Error('App secret is required for retrieving app-level access tokens. Make sure to pass it to the AppStrategy');
                }
                const tokensRes = await fetch('https://www.wixapis.com/oauth2/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        instance_id: opts.instanceId,
                        client_id: opts.appId,
                        client_secret: opts.appSecret,
                        grant_type: 'client_credentials',
                    }),
                });
                if (tokensRes.status !== 200) {
                    throw new Error(`Failed to exchange instance ID for access token. Unexpected status code from Wix OAuth API: ${tokensRes.status}, request id: ${tokensRes.headers.get('x-wix-request-id')}`);
                }
                const tokens = (await tokensRes.json());
                cachedToken = {
                    token: tokens.access_token,
                    expiresAt: Date.now() + tokens.expires_in * 1000,
                };
                return {
                    headers: {
                        Authorization: tokens.access_token,
                    },
                };
            }
            else if ('accessToken' in opts && opts.accessToken) {
                const tokenRes = await fetch('https://www.wixapis.com/oauth2/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        grant_type: 'strip_bound_session',
                        client_secret: opts.appSecret,
                        access_token: opts.accessToken,
                    }),
                });
                if (tokenRes.status !== 200) {
                    throw new Error(`Failed to get unbound token. Unexpected status code from Wix OAuth API: ${tokenRes.status}, request id: ${tokenRes.headers.get('x-wix-request-id')}`);
                }
                const { access_token, expires_in } = (await tokenRes.json());
                cachedToken = {
                    token: access_token,
                    expiresAt: Date.now() + expires_in * 1000,
                };
                return {
                    headers: {
                        Authorization: access_token,
                    },
                };
            }
            else {
                throw new Error('Missing refresh token or instance ID. Either one is needed to get app level access tokens. Make sure to pass one of them to the AppStrategy');
            }
        },
        async elevated() {
            if ('accessToken' in opts && opts.accessToken) {
                const tokenInfo = await getTokenInfo(opts.accessToken);
                if (tokenInfo.clientId !== opts.appId) {
                    throw new Error(`Invalid access token. The token is not issued for the app with ID "${opts.appId}"`);
                }
                if (!tokenInfo.instanceId) {
                    throw new Error('Unexpected token info. The token does not contain instance ID');
                }
                return AppStrategy({
                    appId: opts.appId,
                    appSecret: opts.appSecret,
                    publicKey: opts.publicKey,
                    instanceId: tokenInfo.instanceId,
                });
            }
            else {
                throw new Error('Providing an access token is required to perform elevation. Make sure to pass it to the AppStrategy');
            }
        },
        async decodeJWT(token, verifyCallerClaims = false) {
            if (!opts.publicKey) {
                throw new Error('Missing public key. Make sure to pass it to the AppStrategy');
            }
            const { jwtVerify, importSPKI } = await import('jose');
            const publicKey = await importSPKI(parsePublicKeyIfEncoded(opts.publicKey), 'RS256');
            const decoded = await jwtVerify(token, publicKey, verifyCallerClaims
                ? {
                    issuer: 'wix.com',
                    audience: opts.appId,
                }
                : undefined);
            return {
                decoded: {
                    data: decoded.payload.data,
                },
                valid: true,
            };
        },
        async getTokenInfo() {
            const tokenToCheck = refreshToken ?? ('accessToken' in opts ? opts.accessToken : undefined);
            if (!tokenToCheck) {
                throw new Error('Missing token to get info for. Either pass the token as an argument or provide it when initializing the AppStrategy');
            }
            return getTokenInfo(tokenToCheck);
        },
        getActiveToken() {
            return 'accessToken' in opts ? opts.accessToken : refreshToken;
        },
    };
}
