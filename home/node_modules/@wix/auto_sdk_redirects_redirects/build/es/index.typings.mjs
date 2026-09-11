// src/headless-v1-redirect-session-redirects.universal.ts
import { transformError as sdkTransformError } from "@wix/sdk-runtime/transform-error";
import {
  renameKeysFromSDKRequestToRESTRequest,
  renameKeysFromRESTResponseToSDKResponse
} from "@wix/sdk-runtime/rename-all-nested-keys";

// src/headless-v1-redirect-session-redirects.http.ts
import { resolveUrl } from "@wix/sdk-runtime/rest-modules";
function resolveWixHeadlessV1RedirectSessionServiceUrl(opts) {
  const domainToMappings = {
    "www._base_domain_": [
      {
        srcPath: "/_api/redirects-api",
        destPath: ""
      }
    ],
    "www.wixapis.com": [
      {
        srcPath: "/_api/redirects-api",
        destPath: ""
      },
      {
        srcPath: "/redirect-session",
        destPath: ""
      },
      {
        srcPath: "/headless/v1/redirect-session",
        destPath: "/v1/redirect-session"
      }
    ],
    "*.dev.wix-code.com": [
      {
        srcPath: "/headless/v1/redirect-session",
        destPath: "/v1/redirect-session"
      }
    ],
    _: [
      {
        srcPath: "/headless/v1/redirect-session",
        destPath: "/v1/redirect-session"
      }
    ]
  };
  return resolveUrl(Object.assign(opts, { domainToMappings }));
}
var PACKAGE_NAME = "@wix/auto_sdk_redirects_redirects";
function createRedirectSession(payload) {
  function __createRedirectSession({ host }) {
    const metadata = {
      entityFqdn: "wix.headless.v1.redirect_session",
      method: "POST",
      methodFqn: "wix.headless.v1.RedirectSessionService.CreateRedirectSession",
      packageName: PACKAGE_NAME,
      migrationOptions: {
        optInTransformResponse: true
      },
      url: resolveWixHeadlessV1RedirectSessionServiceUrl({
        protoPath: "/v1/redirect-session",
        data: payload,
        host
      }),
      data: payload
    };
    return metadata;
  }
  return __createRedirectSession;
}

// src/headless-v1-redirect-session-redirects.universal.ts
var LocationType = /* @__PURE__ */ ((LocationType2) => {
  LocationType2["UNDEFINED"] = "UNDEFINED";
  LocationType2["OWNER_BUSINESS"] = "OWNER_BUSINESS";
  LocationType2["OWNER_CUSTOM"] = "OWNER_CUSTOM";
  LocationType2["CUSTOM"] = "CUSTOM";
  return LocationType2;
})(LocationType || {});
var Prompt = /* @__PURE__ */ ((Prompt2) => {
  Prompt2["login"] = "login";
  Prompt2["none"] = "none";
  Prompt2["consent"] = "consent";
  Prompt2["select_account"] = "select_account";
  return Prompt2;
})(Prompt || {});
var MembersAccountSection = /* @__PURE__ */ ((MembersAccountSection2) => {
  MembersAccountSection2["ACCOUNT_INFO"] = "ACCOUNT_INFO";
  MembersAccountSection2["BOOKINGS"] = "BOOKINGS";
  MembersAccountSection2["ORDERS"] = "ORDERS";
  MembersAccountSection2["SUBSCRIPTIONS"] = "SUBSCRIPTIONS";
  MembersAccountSection2["EVENTS"] = "EVENTS";
  return MembersAccountSection2;
})(MembersAccountSection || {});
var AttachPagesResponseStatus = /* @__PURE__ */ ((AttachPagesResponseStatus2) => {
  AttachPagesResponseStatus2["UNKNOWN"] = "UNKNOWN";
  AttachPagesResponseStatus2["SUCCESS"] = "SUCCESS";
  AttachPagesResponseStatus2["NO_ACTION"] = "NO_ACTION";
  AttachPagesResponseStatus2["ERROR"] = "ERROR";
  return AttachPagesResponseStatus2;
})(AttachPagesResponseStatus || {});
var CallbackType = /* @__PURE__ */ ((CallbackType2) => {
  CallbackType2["UNKNOWN"] = "UNKNOWN";
  CallbackType2["LOGOUT"] = "LOGOUT";
  CallbackType2["CHECKOUT"] = "CHECKOUT";
  CallbackType2["AUTHORIZE"] = "AUTHORIZE";
  return CallbackType2;
})(CallbackType || {});
var Status = /* @__PURE__ */ ((Status2) => {
  Status2["UNKNOWN"] = "UNKNOWN";
  Status2["SUCCESS"] = "SUCCESS";
  Status2["ERROR"] = "ERROR";
  return Status2;
})(Status || {});
var WebhookIdentityType = /* @__PURE__ */ ((WebhookIdentityType2) => {
  WebhookIdentityType2["UNKNOWN"] = "UNKNOWN";
  WebhookIdentityType2["ANONYMOUS_VISITOR"] = "ANONYMOUS_VISITOR";
  WebhookIdentityType2["MEMBER"] = "MEMBER";
  WebhookIdentityType2["WIX_USER"] = "WIX_USER";
  WebhookIdentityType2["APP"] = "APP";
  return WebhookIdentityType2;
})(WebhookIdentityType || {});
async function createRedirectSession2(options) {
  const { httpClient, sideEffects } = arguments[1];
  const payload = renameKeysFromSDKRequestToRESTRequest({
    bookingsCheckout: options?.bookingsCheckout,
    ecomCheckout: options?.ecomCheckout,
    eventsCheckout: options?.eventsCheckout,
    paidPlansCheckout: options?.paidPlansCheckout,
    login: options?.login,
    logout: options?.logout,
    auth: options?.auth,
    storesProduct: options?.storesProduct,
    bookingsBook: options?.bookingsBook,
    ecomOrderPaymentRequest: options?.ecomOrderPaymentRequest,
    callbacks: options?.callbacks,
    preferences: options?.preferences,
    origin: options?.origin
  });
  const reqOpts = createRedirectSession(payload);
  sideEffects?.onSiteCall?.();
  try {
    const result = await httpClient.request(reqOpts);
    sideEffects?.onSuccess?.(result);
    return renameKeysFromRESTResponseToSDKResponse(result.data);
  } catch (err) {
    const transformedError = sdkTransformError(
      err,
      {
        spreadPathsToArguments: {},
        explicitPathsToArguments: {
          bookingsCheckout: "$[0].bookingsCheckout",
          ecomCheckout: "$[0].ecomCheckout",
          eventsCheckout: "$[0].eventsCheckout",
          paidPlansCheckout: "$[0].paidPlansCheckout",
          login: "$[0].login",
          logout: "$[0].logout",
          auth: "$[0].auth",
          storesProduct: "$[0].storesProduct",
          bookingsBook: "$[0].bookingsBook",
          ecomOrderPaymentRequest: "$[0].ecomOrderPaymentRequest",
          callbacks: "$[0].callbacks",
          preferences: "$[0].preferences",
          origin: "$[0].origin"
        },
        singleArgumentUnchanged: false
      },
      ["options"]
    );
    sideEffects?.onError?.(err);
    throw transformedError;
  }
}
export {
  AttachPagesResponseStatus,
  CallbackType,
  LocationType,
  MembersAccountSection,
  Prompt,
  Status,
  WebhookIdentityType,
  createRedirectSession2 as createRedirectSession
};
//# sourceMappingURL=index.typings.mjs.map