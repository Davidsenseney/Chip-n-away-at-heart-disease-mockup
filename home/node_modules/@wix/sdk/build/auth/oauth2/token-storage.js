import { TokenRole } from './types.js';
// These tokens are considered empty tokens, and can be used as a fallback when no tokens are available.
export const EMPTY_TOKENS = {
    accessToken: { value: '', expiresAt: 0 },
    refreshToken: { value: '', role: TokenRole.NONE },
};
export function createLocalTokenStorage(initialTokens) {
    let _tokens = initialTokens;
    return {
        getTokens: () => _tokens,
        setTokens: (tokens) => {
            _tokens = tokens;
        },
    };
}
