// src/identity-oauth-v1-refresh-token-oauth.http.ts
import { toURLSearchParams } from "@wix/sdk-runtime/rest-modules";
import { transformSDKBytesToRESTBytes } from "@wix/sdk-runtime/transformations/bytes";
import { transformRESTBytesToSDKBytes } from "@wix/sdk-runtime/transformations/bytes";
import { transformPaths } from "@wix/sdk-runtime/transformations/transform-paths";
import { resolveUrl } from "@wix/sdk-runtime/rest-modules";
function resolveWixIdentityOauth2V1Oauth2NgUrl(opts) {
  const domainToMappings = {
    "manage._base_domain_": [
      {
        srcPath: "/oauth2",
        destPath: "/v1/oauth"
      }
    ],
    "www.wixapis.com": [
      {
        srcPath: "/oauth2",
        destPath: "/v1/oauth"
      },
      {
        srcPath: "/oauth2/token_info",
        destPath: "/v1/token_info"
      }
    ],
    "users._base_domain_": [
      {
        srcPath: "/v1/oauth/device/verify",
        destPath: "/v1/oauth/device/verify"
      },
      {
        srcPath: "/v1/oauth/manage/user-code",
        destPath: "/v1/oauth/manage/user-code"
      },
      {
        srcPath: "/v2/oauth/device/verify",
        destPath: "/v2/oauth/device/verify"
      },
      {
        srcPath: "/v1/oauth/authorize",
        destPath: "/v1/oauth/authorize"
      },
      {
        srcPath: "/oauth/device/authorize",
        destPath: "/v1/oauth/device/authorize"
      },
      {
        srcPath: "/oauth/device/authorization",
        destPath: "/v1/oauth/device/authorization"
      },
      {
        srcPath: "/oauth/token",
        destPath: "/v1/oauth/token"
      },
      {
        srcPath: "/oauth/jwks",
        destPath: "/v1/oauth/jwks"
      },
      {
        srcPath: "/oauth/user-info",
        destPath: "/v1/oauth/user-info"
      }
    ],
    _: [
      {
        srcPath: "/_api/oauth2",
        destPath: "/v1/oauth"
      }
    ],
    "platform.rise.ai": [
      {
        srcPath: "/oauth2",
        destPath: "/v1/oauth"
      }
    ],
    "api._api_base_domain_": [
      {
        srcPath: "/oauth2-ng",
        destPath: ""
      }
    ],
    "apps._base_domain_": [
      {
        srcPath: "/oauth2/callback",
        destPath: "/oauth2/callback"
      },
      {
        srcPath: "/oauth2",
        destPath: "/v1/oauth"
      },
      {
        srcPath: "/oauth2/user-authorized",
        destPath: "/oauth2/user-authorized"
      }
    ],
    "editor._base_domain_": [
      {
        srcPath: "/oauth2/callback",
        destPath: "/oauth2/callback"
      },
      {
        srcPath: "/oauth2/user-authorized",
        destPath: "/oauth2/user-authorized"
      }
    ],
    "blocks._base_domain_": [
      {
        srcPath: "/oauth2/callback",
        destPath: "/oauth2/callback"
      },
      {
        srcPath: "/oauth2/user-authorized",
        destPath: "/oauth2/user-authorized"
      }
    ],
    "create.editorx": [
      {
        srcPath: "/oauth2/callback",
        destPath: "/oauth2/callback"
      },
      {
        srcPath: "/oauth2/user-authorized",
        destPath: "/oauth2/user-authorized"
      }
    ]
  };
  return resolveUrl(Object.assign(opts, { domainToMappings }));
}
var PACKAGE_NAME = "@wix/auto_sdk_identity_oauth";
function token(payload) {
  function __token({ host }) {
    const serializedData = transformPaths(payload, [
      { transformFn: transformSDKBytesToRESTBytes, paths: [{ path: "body" }] }
    ]);
    const metadata = {
      entityFqdn: "wix.identity.oauth.v1.refresh_token",
      method: "POST",
      methodFqn: "wix.identity.oauth2.v1.Oauth2Ng.Token",
      packageName: PACKAGE_NAME,
      migrationOptions: {
        optInTransformResponse: true
      },
      url: resolveWixIdentityOauth2V1Oauth2NgUrl({
        protoPath: "/v1/oauth/token",
        data: serializedData,
        host
      }),
      data: serializedData,
      transformResponse: (payload2) => transformPaths(payload2, [
        {
          transformFn: transformRESTBytesToSDKBytes,
          paths: [{ path: "body" }]
        }
      ])
    };
    return metadata;
  }
  return __token;
}
function jwks(payload) {
  function __jwks({ host }) {
    const metadata = {
      entityFqdn: "wix.identity.oauth.v1.refresh_token",
      method: "GET",
      methodFqn: "wix.identity.oauth2.v1.Oauth2Ng.Jwks",
      packageName: PACKAGE_NAME,
      migrationOptions: {
        optInTransformResponse: true
      },
      url: resolveWixIdentityOauth2V1Oauth2NgUrl({
        protoPath: "/v1/oauth/jwks",
        data: payload,
        host
      }),
      params: toURLSearchParams(payload),
      transformResponse: (payload2) => transformPaths(payload2, [
        {
          transformFn: transformRESTBytesToSDKBytes,
          paths: [{ path: "body" }]
        }
      ])
    };
    return metadata;
  }
  return __jwks;
}
function tokenInfo(payload) {
  function __tokenInfo({ host }) {
    const serializedData = transformPaths(payload, [
      { transformFn: transformSDKBytesToRESTBytes, paths: [{ path: "body" }] }
    ]);
    const metadata = {
      entityFqdn: "wix.identity.oauth.v1.refresh_token",
      method: "POST",
      methodFqn: "wix.identity.oauth2.v1.Oauth2Ng.TokenInfo",
      packageName: PACKAGE_NAME,
      migrationOptions: {
        optInTransformResponse: true
      },
      url: resolveWixIdentityOauth2V1Oauth2NgUrl({
        protoPath: "/v1/oauth/token-info",
        data: serializedData,
        host
      }),
      data: serializedData
    };
    return metadata;
  }
  return __tokenInfo;
}
function userInfo(payload) {
  function __userInfo({ host }) {
    const metadata = {
      entityFqdn: "wix.identity.oauth.v1.refresh_token",
      method: "GET",
      methodFqn: "wix.identity.oauth2.v1.Oauth2Ng.UserInfo",
      packageName: PACKAGE_NAME,
      migrationOptions: {
        optInTransformResponse: true
      },
      url: resolveWixIdentityOauth2V1Oauth2NgUrl({
        protoPath: "/v1/oauth/user-info",
        data: payload,
        host
      }),
      params: toURLSearchParams(payload)
    };
    return metadata;
  }
  return __userInfo;
}

// src/identity-oauth-v1-refresh-token-oauth.types.ts
var SubjectType = /* @__PURE__ */ ((SubjectType2) => {
  SubjectType2["UNKNOWN"] = "UNKNOWN";
  SubjectType2["USER"] = "USER";
  SubjectType2["VISITOR"] = "VISITOR";
  SubjectType2["MEMBER"] = "MEMBER";
  SubjectType2["APP"] = "APP";
  return SubjectType2;
})(SubjectType || {});

// src/identity-oauth-v1-refresh-token-oauth.meta.ts
function token2() {
  const payload = {};
  const getRequestOptions = token(payload);
  const getUrl = (context) => {
    const { url } = getRequestOptions(context);
    return url;
  };
  return {
    getUrl,
    httpMethod: "POST",
    path: "/v1/oauth/token",
    pathParams: {},
    __requestType: null,
    __originalRequestType: null,
    __responseType: null,
    __originalResponseType: null
  };
}
function jwks2() {
  const payload = {};
  const getRequestOptions = jwks(payload);
  const getUrl = (context) => {
    const { url } = getRequestOptions(context);
    return url;
  };
  return {
    getUrl,
    httpMethod: "GET",
    path: "/v1/oauth/jwks",
    pathParams: {},
    __requestType: null,
    __originalRequestType: null,
    __responseType: null,
    __originalResponseType: null
  };
}
function tokenInfo2() {
  const payload = {};
  const getRequestOptions = tokenInfo(payload);
  const getUrl = (context) => {
    const { url } = getRequestOptions(context);
    return url;
  };
  return {
    getUrl,
    httpMethod: "POST",
    path: "/v1/oauth/token-info",
    pathParams: {},
    __requestType: null,
    __originalRequestType: null,
    __responseType: null,
    __originalResponseType: null
  };
}
function userInfo2() {
  const payload = {};
  const getRequestOptions = userInfo(payload);
  const getUrl = (context) => {
    const { url } = getRequestOptions(context);
    return url;
  };
  return {
    getUrl,
    httpMethod: "GET",
    path: "/v1/oauth/user-info",
    pathParams: {},
    __requestType: null,
    __originalRequestType: null,
    __responseType: null,
    __originalResponseType: null
  };
}
export {
  SubjectType as SubjectTypeOriginal,
  jwks2 as jwks,
  token2 as token,
  tokenInfo2 as tokenInfo,
  userInfo2 as userInfo
};
//# sourceMappingURL=meta.mjs.map