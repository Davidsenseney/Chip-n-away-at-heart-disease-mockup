import { AccessToken } from './auth/oauth2/types.js';
export declare function getCurrentDate(): number;
export declare function isTokenExpired(token: AccessToken): boolean;
export declare function createAccessToken(accessToken: string, expiresIn: number): AccessToken;
