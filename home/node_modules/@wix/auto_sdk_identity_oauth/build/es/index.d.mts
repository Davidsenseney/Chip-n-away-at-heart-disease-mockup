import { HttpClient, NonNullablePaths, MaybeContext, BuildRESTFunction } from '@wix/sdk-types';
import { TokenOptions, RawHttpResponse, TokenInfoOptions, TokenInfoResponse, UserInfoResponse } from './index.typings.mjs';
export { ActionEvent, AuthorizeRequest, DeviceAuthorizationInfoRequest, DeviceAuthorizationInfoResponse, DeviceAuthorizeRequest, DeviceAuthorizeResponse, DeviceCodeRequest, DeviceCodeResponse, DeviceVerifyRequest, DeviceVerifyResponse, DeviceVerifyV2Request, DeviceVerifyV2Response, DomainEvent, DomainEventBodyOneOf, Empty, EntityCreatedEvent, EntityDeletedEvent, EntityUpdatedEvent, HeadersEntry, InvalidateUserCodeRequest, InvalidateUserCodeResponse, JwksRequest, PathParametersEntry, QueryParametersEntry, RawHttpRequest, RefreshToken, RestoreInfo, RevokeRefreshTokenRequest, RevokeRefreshTokenResponse, SubjectType, SubjectTypeWithLiterals, UserBlockedEvent, UserDeletedEvent, UserInfoRequest } from './index.typings.mjs';

declare function token$1(httpClient: HttpClient): TokenSignature;
interface TokenSignature {
    /**
     * Creates an access token.
     *
     *
     * The endpoint accepts raw HTTP requests. You must pass the request's body
     * parameters formatted as bytes in the raw HTTP request's `body` field,
     * following this template:
     * `{"grantType": "client_credentials", "client_id": "<APP_ID>", "client_secret": "<APP_SECRET_KEY>", "instance_id": "<INSTANCE_ID>"}`.
     *
     * When the call succeeds, Wix returns `{"statusCode": 200}` and the created access
     * token in the `body` field of the raw HTTP response.
     *
     * In case the call fails, Wix returns the relevant `4XX` error code in the raw
     * HTTP response's `statusCode` field and details
     * about the error in `body`. Error details follow the
     * [conventions of the Internet Engineering Task Force (IETF)](https://datatracker.ietf.org/doc/html/rfc6749#appendix-A.7).
     */
    (options?: TokenOptions): Promise<NonNullablePaths<RawHttpResponse, `body` | `headers` | `headers.${number}.key` | `headers.${number}.value`, 4>>;
}
declare function jwks$1(httpClient: HttpClient): JwksSignature;
interface JwksSignature {
    /**
     * Returns the JWKS (JSON Web Key Set) with the RSA public key used to verify asymmetrically-signed
     * tokens (e.g. OIDC id_token). Required by external OIDC relying parties.
     * Serves a non-secret public key.
     */
    (): Promise<NonNullablePaths<RawHttpResponse, `body` | `headers` | `headers.${number}.key` | `headers.${number}.value`, 4>>;
}
declare function tokenInfo$1(httpClient: HttpClient): TokenInfoSignature;
interface TokenInfoSignature {
    /**
     * Token Introspection Endpoint.
     */
    (options?: TokenInfoOptions): Promise<NonNullablePaths<TokenInfoResponse, `active` | `subjectType` | `subjectId` | `clientId`, 2>>;
}
declare function userInfo$1(httpClient: HttpClient): UserInfoSignature;
interface UserInfoSignature {
    /**
     * OpenID Connect UserInfo endpoint
     * Should be called with user access token obtained in OIDC flow as Authorization header
     * @returns UserInfo endpoint response for OpenID Connect
     */
    (): Promise<NonNullablePaths<UserInfoResponse, `sub`, 2>>;
}

declare const token: MaybeContext<BuildRESTFunction<typeof token$1> & typeof token$1>;
declare const jwks: MaybeContext<BuildRESTFunction<typeof jwks$1> & typeof jwks$1>;
declare const tokenInfo: MaybeContext<BuildRESTFunction<typeof tokenInfo$1> & typeof tokenInfo$1>;
declare const userInfo: MaybeContext<BuildRESTFunction<typeof userInfo$1> & typeof userInfo$1>;

export { RawHttpResponse, TokenInfoOptions, TokenInfoResponse, TokenOptions, UserInfoResponse, jwks, token, tokenInfo, userInfo };
