"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRESTDescriptor = buildRESTDescriptor;
const biHeaderGenerator_js_1 = require("./bi/biHeaderGenerator.js");
const common_js_1 = require("./common.js");
const context_1 = require("@wix/sdk-runtime/context");
const transform_error_1 = require("@wix/sdk-runtime/transform-error");
function buildRESTDescriptor(origFunc, publicMetadata, boundFetch, errorHandler, wixAPIFetch, getActiveToken, getAuthHeaders, options, hostName, useCDN, validateRequestSchema) {
    return (0, context_1.runWithoutContext)(() => origFunc({
        request: async (factory) => {
            const requestOptions = factory({
                host: options?.HTTPHost || common_js_1.DEFAULT_API_URL,
            });
            let request = requestOptions;
            if (request.method === 'GET' &&
                request.fallback?.length &&
                (request.params?.toString().length ?? 0) > 4000) {
                request = requestOptions.fallback[0];
            }
            const domain = options?.HTTPHost ?? common_js_1.DEFAULT_API_URL;
            let url = `https://${useCDN ? common_js_1.DEFAULT_EDGE_API_URL : domain}${request.url}`;
            if (request.params && request.params.toString()) {
                url += `?${request.params.toString()}`;
            }
            try {
                const biHeader = (0, biHeaderGenerator_js_1.biHeaderGenerator)(requestOptions, publicMetadata, hostName);
                const requestOptionsInit = {
                    method: request.method,
                    ...(request.data && {
                        body: JSON.stringify(request.data),
                    }),
                    headers: {
                        ...biHeader,
                    },
                };
                const res = await boundFetch(url, requestOptionsInit);
                if (res.status !== 200) {
                    let dataError = null;
                    try {
                        dataError = await res.json();
                    }
                    catch (e) {
                        //
                    }
                    const error = errorBuilder(res.status, dataError?.message ?? res.statusText, dataError?.details, {
                        requestId: res.headers.get('X-Wix-Request-Id'),
                        details: dataError,
                    });
                    const transformedError = (0, transform_error_1.transformError)(error);
                    errorHandler?.handleError(transformedError, {
                        requestOptions: {
                            url: request.url,
                            method: request.method,
                            entityFqdn: requestOptions.entityFqdn,
                            methodFqn: requestOptions.methodFqn,
                        },
                    });
                    throw error;
                }
                const rawData = await res.json();
                const data = 
                // we only transform the response if the optInTransformResponse flag is set
                // this is for backwards compatibility as some users might rely on not transforming the response
                // in older modules. In that case the modules would not have the optInTransformResponse flag set
                request.migrationOptions?.optInTransformResponse &&
                    request.transformResponse
                    ? Array.isArray(request.transformResponse)
                        ? request.transformResponse[0](rawData)
                        : request.transformResponse(rawData)
                    : rawData;
                return {
                    data,
                    headers: res.headers,
                    status: res.status,
                    statusText: res.statusText,
                };
            }
            catch (e) {
                if (e.message?.includes('fetch is not defined')) {
                    console.error('Node.js v18+ is required');
                }
                throw e;
            }
        },
        fetchWithAuth: boundFetch,
        wixAPIFetch,
        getActiveToken,
        getAuthHeaders,
    }, { validateRequestSchema }));
}
class SDKError extends Error {
    response;
    requestId;
    constructor(params) {
        super();
        this.response = params.response;
        this.requestId = params.requestId;
    }
}
const errorBuilder = (code, description, details, data) => {
    return new SDKError({
        response: {
            data: {
                details: {
                    ...(!details?.validationError && {
                        applicationError: {
                            description,
                            code,
                            data,
                        },
                    }),
                    ...details,
                },
                message: description,
            },
            status: code,
        },
        requestId: data?.requestId,
    });
};
