"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// meta.ts
var meta_exports = {};
__export(meta_exports, {
  SubjectTypeOriginal: () => SubjectType,
  jwks: () => jwks2,
  token: () => token2,
  tokenInfo: () => tokenInfo2,
  userInfo: () => userInfo2
});
module.exports = __toCommonJS(meta_exports);

// src/identity-oauth-v1-refresh-token-oauth.http.ts
var import_rest_modules = require("@wix/sdk-runtime/rest-modules");
var import_bytes = require("@wix/sdk-runtime/transformations/bytes");
var import_bytes2 = require("@wix/sdk-runtime/transformations/bytes");
var import_transform_paths = require("@wix/sdk-runtime/transformations/transform-paths");
var import_rest_modules2 = require("@wix/sdk-runtime/rest-modules");
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
  return (0, import_rest_modules2.resolveUrl)(Object.assign(opts, { domainToMappings }));
}
var PACKAGE_NAME = "@wix/auto_sdk_identity_oauth";
function token(payload) {
  function __token({ host }) {
    const serializedData = (0, import_transform_paths.transformPaths)(payload, [
      { transformFn: import_bytes.transformSDKBytesToRESTBytes, paths: [{ path: "body" }] }
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
      transformResponse: (payload2) => (0, import_transform_paths.transformPaths)(payload2, [
        {
          transformFn: import_bytes2.transformRESTBytesToSDKBytes,
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
      params: (0, import_rest_modules.toURLSearchParams)(payload),
      transformResponse: (payload2) => (0, import_transform_paths.transformPaths)(payload2, [
        {
          transformFn: import_bytes2.transformRESTBytesToSDKBytes,
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
    const serializedData = (0, import_transform_paths.transformPaths)(payload, [
      { transformFn: import_bytes.transformSDKBytesToRESTBytes, paths: [{ path: "body" }] }
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
      params: (0, import_rest_modules.toURLSearchParams)(payload)
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SubjectTypeOriginal,
  jwks,
  token,
  tokenInfo,
  userInfo
});
//# sourceMappingURL=meta.js.map