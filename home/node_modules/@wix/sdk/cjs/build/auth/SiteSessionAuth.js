"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteSessionAuth = SiteSessionAuth;
const biHeaderGenerator_js_1 = require("../bi/biHeaderGenerator.js");
const common_js_1 = require("../common.js");
const tokenHelpers_js_1 = require("../tokenHelpers.js");
const types_js_1 = require("./oauth2/types.js");
const token_storage_js_1 = require("./oauth2/token-storage.js");
const pre_warm_cookie_js_1 = require("./pre-warm-cookie.js");
/**
 * Site session authentication strategy for Wix SDK.
 * @param config - Configuration object
 * @param config.clientId - The OAuth client ID
 * @param config.publicKey - Optional public key for token verification
 * @param config.tokens - Initial tokens for in-memory storage (mutually exclusive with `tokenStorage`)
 * @param config.tokenStorage - Custom storage implementation (mutually exclusive with `tokens`).
 *   When provided, the strategy delegates all token persistence to this storage.
 *   The storage's `getTokens()` must always return `Tokens` (use `EMPTY_TOKENS` as fallback).
 * @returns Site session auth instance
 * @example
 * // Default in-memory storage with initial tokens
 * SiteSessionAuth({ clientId: 'xxx', tokens: myTokens })
 * @example
 * // Custom storage (e.g., cookies)
 * SiteSessionAuth({ clientId: 'xxx', tokenStorage: myCookieStorage })
 */
function SiteSessionAuth(config) {
    const _tokenStorage = config.tokenStorage ??
        (0, token_storage_js_1.createLocalTokenStorage)(config.tokens ?? token_storage_js_1.EMPTY_TOKENS);
    const getTokens = () => _tokenStorage.getTokens();
    const setTokens = (tokens) => {
        _tokenStorage.setTokens(tokens);
    };
    const getAuthHeaders = async () => {
        const currentTokens = getTokens();
        if (!currentTokens.accessToken?.value ||
            (0, tokenHelpers_js_1.isTokenExpired)(currentTokens.accessToken)) {
            const newTokens = await generateVisitorTokens({
                refreshToken: currentTokens.refreshToken,
            });
            setTokens(newTokens);
        }
        return Promise.resolve({
            headers: { Authorization: getTokens().accessToken.value },
        });
    };
    /**
     * Name is misleading, it should be called generateTokens. Ensures valid tokens are available, refreshing or generating new ones as needed.
     *
     * Scenarios:
     * 1. If valid (non-expired) access and refresh tokens are provided, returns them as-is.
     * 2. If a refresh token is provided but access token is missing/expired, attempts to renew using the refresh token.
     * 3. If renewal fails or no refresh token exists, generates new anonymous visitor tokens.
     * @param tokens - Optional partial tokens (accessToken and/or refreshToken)
     * @returns Valid tokens (accessToken + refreshToken)
     */
    const generateVisitorTokens = async (tokens) => {
        if (tokens?.accessToken?.value &&
            tokens?.refreshToken?.value &&
            !(0, tokenHelpers_js_1.isTokenExpired)(tokens.accessToken)) {
            return tokens;
        }
        if (tokens?.refreshToken?.value) {
            try {
                const newTokens = await renewToken(tokens.refreshToken);
                return newTokens;
            }
            catch (e) {
                // just continue and create a visitor one
            }
        }
        const tokensResponse = await fetchTokens({
            clientId: config.clientId,
            grantType: 'anonymous',
        });
        return {
            accessToken: (0, tokenHelpers_js_1.createAccessToken)(tokensResponse.access_token, tokensResponse.expires_in),
            refreshToken: {
                value: tokensResponse.refresh_token,
                role: types_js_1.TokenRole.VISITOR,
            },
        };
    };
    const renewToken = async (refreshToken) => {
        const tokensResponse = await fetchTokens({
            refreshToken: refreshToken.value,
            grantType: 'refresh_token',
        });
        const accessToken = (0, tokenHelpers_js_1.createAccessToken)(tokensResponse.access_token, tokensResponse.expires_in);
        return {
            accessToken,
            refreshToken,
        };
    };
    const loggedIn = () => {
        return getTokens().refreshToken.role === types_js_1.TokenRole.MEMBER;
    };
    return {
        generateVisitorTokens,
        renewToken,
        getAuthHeaders,
        setTokens,
        loggedIn,
        getTokens,
        isSessionSynced: pre_warm_cookie_js_1.isVisitorCookieWarmedUp,
        syncToWixPages: pre_warm_cookie_js_1.preWarmVisitorCookie,
        shouldUseCDN: true,
    };
}
const fetchTokens = async (payload, headers = {}) => {
    const res = await fetch(`https://${common_js_1.DEFAULT_API_URL}/oauth2/token`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            ...(0, biHeaderGenerator_js_1.biHeaderGenerator)({
                entityFqdn: 'wix.identity.oauth.v1.refresh_token',
                methodFqn: 'wix.identity.oauth2.v1.Oauth2Ng.Token',
                packageName: '@wix/sdk',
            }),
            'Content-Type': 'application/json',
            ...headers,
        },
    });
    if (res.status !== 200) {
        let responseJson;
        try {
            responseJson = await res.json();
        }
        catch { }
        throw new Error(`Failed to fetch tokens from OAuth API: ${res.statusText}. request id: ${res.headers.get('x-wix-request-id')}. ${responseJson ? `Response: ${JSON.stringify(responseJson)}` : ''}`);
    }
    const json = await res.json();
    return json;
};
