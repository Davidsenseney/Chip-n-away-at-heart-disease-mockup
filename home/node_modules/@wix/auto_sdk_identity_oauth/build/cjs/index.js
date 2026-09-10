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

// index.ts
var index_exports = {};
__export(index_exports, {
  SubjectType: () => SubjectType,
  jwks: () => jwks4,
  token: () => token4,
  tokenInfo: () => tokenInfo4,
  userInfo: () => userInfo4
});
module.exports = __toCommonJS(index_exports);

// src/identity-oauth-v1-refresh-token-oauth.universal.ts
var import_transform_error = require("@wix/sdk-runtime/transform-error");
var import_rename_all_nested_keys = require("@wix/sdk-runtime/rename-all-nested-keys");

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

// src/identity-oauth-v1-refresh-token-oauth.universal.ts
var SubjectType = /* @__PURE__ */ ((SubjectType2) => {
  SubjectType2["UNKNOWN"] = "UNKNOWN";
  SubjectType2["USER"] = "USER";
  SubjectType2["VISITOR"] = "VISITOR";
  SubjectType2["MEMBER"] = "MEMBER";
  SubjectType2["APP"] = "APP";
  return SubjectType2;
})(SubjectType || {});
async function token2(options) {
  const { httpClient, sideEffects } = arguments[1];
  const payload = (0, import_rename_all_nested_keys.renameKeysFromSDKRequestToRESTRequest)({
    body: options?.body,
    pathParams: options?.pathParams,
    queryParams: options?.queryParams,
    headers: options?.headers,
    method: options?.method,
    rawPath: options?.rawPath,
    rawQuery: options?.rawQuery
  });
  const reqOpts = token(payload);
  sideEffects?.onSiteCall?.();
  try {
    const result = await httpClient.request(reqOpts);
    sideEffects?.onSuccess?.(result);
    return (0, import_rename_all_nested_keys.renameKeysFromRESTResponseToSDKResponse)(result.data);
  } catch (err) {
    const transformedError = (0, import_transform_error.transformError)(
      err,
      {
        spreadPathsToArguments: {},
        explicitPathsToArguments: {
          body: "$[0].body",
          pathParams: "$[0].pathParams",
          queryParams: "$[0].queryParams",
          headers: "$[0].headers",
          method: "$[0].method",
          rawPath: "$[0].rawPath",
          rawQuery: "$[0].rawQuery"
        },
        singleArgumentUnchanged: false
      },
      ["options"]
    );
    sideEffects?.onError?.(err);
    throw transformedError;
  }
}
async function jwks2() {
  const { httpClient, sideEffects } = arguments[0];
  const payload = (0, import_rename_all_nested_keys.renameKeysFromSDKRequestToRESTRequest)({});
  const reqOpts = jwks(payload);
  sideEffects?.onSiteCall?.();
  try {
    const result = await httpClient.request(reqOpts);
    sideEffects?.onSuccess?.(result);
    return (0, import_rename_all_nested_keys.renameKeysFromRESTResponseToSDKResponse)(result.data);
  } catch (err) {
    const transformedError = (0, import_transform_error.transformError)(
      err,
      {
        spreadPathsToArguments: {},
        explicitPathsToArguments: {},
        singleArgumentUnchanged: false
      },
      []
    );
    sideEffects?.onError?.(err);
    throw transformedError;
  }
}
async function tokenInfo2(options) {
  const { httpClient, sideEffects } = arguments[1];
  const payload = (0, import_rename_all_nested_keys.renameKeysFromSDKRequestToRESTRequest)({
    body: options?.body,
    pathParams: options?.pathParams,
    queryParams: options?.queryParams,
    headers: options?.headers,
    method: options?.method,
    rawPath: options?.rawPath,
    rawQuery: options?.rawQuery
  });
  const reqOpts = tokenInfo(payload);
  sideEffects?.onSiteCall?.();
  try {
    const result = await httpClient.request(reqOpts);
    sideEffects?.onSuccess?.(result);
    return (0, import_rename_all_nested_keys.renameKeysFromRESTResponseToSDKResponse)(result.data);
  } catch (err) {
    const transformedError = (0, import_transform_error.transformError)(
      err,
      {
        spreadPathsToArguments: {},
        explicitPathsToArguments: {
          body: "$[0].body",
          pathParams: "$[0].pathParams",
          queryParams: "$[0].queryParams",
          headers: "$[0].headers",
          method: "$[0].method",
          rawPath: "$[0].rawPath",
          rawQuery: "$[0].rawQuery"
        },
        singleArgumentUnchanged: false
      },
      ["options"]
    );
    sideEffects?.onError?.(err);
    throw transformedError;
  }
}
async function userInfo2() {
  const { httpClient, sideEffects } = arguments[0];
  const payload = (0, import_rename_all_nested_keys.renameKeysFromSDKRequestToRESTRequest)({});
  const reqOpts = userInfo(payload);
  sideEffects?.onSiteCall?.();
  try {
    const result = await httpClient.request(reqOpts);
    sideEffects?.onSuccess?.(result);
    return (0, import_rename_all_nested_keys.renameKeysFromRESTResponseToSDKResponse)(result.data);
  } catch (err) {
    const transformedError = (0, import_transform_error.transformError)(
      err,
      {
        spreadPathsToArguments: {},
        explicitPathsToArguments: {},
        singleArgumentUnchanged: false
      },
      []
    );
    sideEffects?.onError?.(err);
    throw transformedError;
  }
}

// src/identity-oauth-v1-refresh-token-oauth.public.ts
function token3(httpClient) {
  return (options) => token2(
    options,
    // @ts-ignore
    { httpClient }
  );
}
function jwks3(httpClient) {
  return () => jwks2(
    // @ts-ignore
    { httpClient }
  );
}
function tokenInfo3(httpClient) {
  return (options) => tokenInfo2(
    options,
    // @ts-ignore
    { httpClient }
  );
}
function userInfo3(httpClient) {
  return () => userInfo2(
    // @ts-ignore
    { httpClient }
  );
}

// src/identity-oauth-v1-refresh-token-oauth.context.ts
var import_rest_modules3 = require("@wix/sdk-runtime/rest-modules");
var token4 = /* @__PURE__ */ (0, import_rest_modules3.createRESTModule)(token3);
var jwks4 = /* @__PURE__ */ (0, import_rest_modules3.createRESTModule)(jwks3);
var tokenInfo4 = /* @__PURE__ */ (0, import_rest_modules3.createRESTModule)(tokenInfo3);
var userInfo4 = /* @__PURE__ */ (0, import_rest_modules3.createRESTModule)(userInfo3);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SubjectType,
  jwks,
  token,
  tokenInfo,
  userInfo
});
//# sourceMappingURL=index.js.map