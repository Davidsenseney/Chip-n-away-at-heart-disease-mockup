import { IOAuthStrategy, TokenRequestOptions, Tokens, TokenStorage } from './types.js';
/**
 * OAuth authentication strategy for Wix SDK.
 * @param config - Configuration object
 * @param config.clientId - The OAuth client ID
 * @param config.publicKey - Optional public key for token verification
 * @param config.tokens - Initial tokens for in-memory storage (mutually exclusive with `tokenStorage`)
 * @param config.tokenStorage - Custom storage implementation (mutually exclusive with `tokens`).
 *   When provided, the strategy delegates all token persistence to this storage.
 *   The storage's `getTokens()` must always return `Tokens` (use `EMPTY_TOKENS` as fallback).
 * @param config.tokenRequestOptions - Optional request options (e.g., custom headers) for all token requests.
 *   Useful for passing 'client-binding' header in public rendering flows.
 * @returns OAuth strategy instance
 * @example
 * // Default in-memory storage with initial tokens
 * OAuthStrategy({ clientId: 'xxx', tokens: myTokens })
 * @example
 * // Custom storage (e.g., cookies)
 * OAuthStrategy({ clientId: 'xxx', tokenStorage: myCookieStorage })
 * @example
 * // With custom headers for all token requests
 * OAuthStrategy({ clientId: 'xxx', tokenRequestOptions: { headers: { 'client-binding': '...' } } })
 */
export declare function OAuthStrategy(config: {
    clientId: string;
    publicKey?: string;
    tokenRequestOptions?: TokenRequestOptions;
} & ({
    tokens?: Tokens;
    tokenStorage?: never;
} | {
    tokenStorage: TokenStorage;
    tokens?: never;
})): IOAuthStrategy;
export interface TokenResponse {
    access_token: string;
    expires_in: number;
    refresh_token: string | null;
    token_type: string;
    scope?: string | null;
}
