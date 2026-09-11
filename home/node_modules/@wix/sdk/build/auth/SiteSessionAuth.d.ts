import { RefreshToken, Tokens, TokenStorage } from './oauth2/types.js';
import { isVisitorCookieWarmedUp, preWarmVisitorCookie } from './pre-warm-cookie.js';
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
export declare function SiteSessionAuth(config: {
    clientId: string;
    publicKey?: string;
} & ({
    tokens?: Tokens;
    tokenStorage?: never;
} | {
    tokenStorage: TokenStorage;
    tokens?: never;
})): {
    generateVisitorTokens: (tokens?: Partial<Tokens>) => Promise<Tokens>;
    renewToken: (refreshToken: RefreshToken) => Promise<Tokens>;
    getAuthHeaders: () => Promise<{
        headers: {
            Authorization: string;
        };
    }>;
    setTokens: (tokens: Tokens) => void;
    loggedIn: () => boolean;
    getTokens: () => Tokens;
    isSessionSynced: typeof isVisitorCookieWarmedUp;
    syncToWixPages: typeof preWarmVisitorCookie;
    shouldUseCDN: boolean;
};
export interface TokenResponse {
    access_token: string;
    expires_in: number;
    refresh_token: string | null;
    token_type: string;
    scope?: string | null;
}
