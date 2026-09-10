import { wixContext } from '@wix/sdk-context';
import { SERVICE_PLUGIN_ERROR_TYPE, } from '@wix/sdk-types';
import { isAmbassadorModule, toHTTPModule } from './ambassador-modules.js';
import { DEFAULT_API_URL, PUBLIC_METADATA_KEY } from './common.js';
import { FetchErrorResponse } from './fetch-error.js';
import { getDefaultContentHeader, isObject } from './helpers.js';
import { buildHostModule, isHostModule } from './host-modules.js';
import { buildRESTDescriptor } from './rest-modules.js';
import { eventHandlersModules, isEventHandlerModule, } from './event-handlers-modules.js';
import { isServicePluginModule, servicePluginsModules, } from './service-plugin-modules.js';
import { runWithoutContext } from '@wix/sdk-runtime/context';
export const X_WIX_CONSISTENT_HEADER = 'X-Wix-Consistent';
export function createClient(config) {
    const _headers = config.headers || { Authorization: '' };
    const defaultStrategy = {
        getAuthHeaders: (_) => Promise.resolve({ headers: {} }),
    };
    const auth = config.auth;
    const getAuthStrategy = typeof auth === 'function' ? auth : () => auth ?? defaultStrategy;
    const boundGetAuthHeaders = () => {
        return getAuthStrategy().getAuthHeaders(config.host);
    };
    const getFetchFn = () => config.fetch ?? fetch;
    const fetchWithAuth = async (urlOrRequest, requestInit) => {
        const fetch = getFetchFn();
        const authHeaders = await boundGetAuthHeaders();
        const headers = {
            ...(requestInit?.headers ?? {}),
            ...authHeaders.headers,
            ...config.host?.essentials?.passThroughHeaders,
            ...(_headers[X_WIX_CONSISTENT_HEADER]
                ? { [X_WIX_CONSISTENT_HEADER]: _headers[X_WIX_CONSISTENT_HEADER] }
                : {}),
        };
        const errorHandler = config.host?.getErrorHandler?.();
        try {
            if (typeof urlOrRequest === 'string' || urlOrRequest instanceof URL) {
                const response = await fetch(urlOrRequest, {
                    ...requestInit,
                    headers,
                });
                errorHandler?.handleError(response, {
                    requestOptions: {
                        url: urlOrRequest.toString(),
                        method: requestInit?.method,
                    },
                });
                const consistentHeader = findConsistentHeader(response);
                if (consistentHeader) {
                    _headers[X_WIX_CONSISTENT_HEADER] = consistentHeader;
                }
                return response;
            }
            else {
                for (const [k, v] of Object.entries(headers)) {
                    if (typeof v === 'string') {
                        urlOrRequest.headers.set(k, v);
                    }
                }
                const response = await fetch(urlOrRequest, requestInit);
                errorHandler?.handleError(response, {
                    requestOptions: {
                        url: urlOrRequest.url,
                        method: requestInit?.method,
                    },
                });
                const consistentHeader = findConsistentHeader(response);
                if (consistentHeader) {
                    _headers[X_WIX_CONSISTENT_HEADER] = consistentHeader;
                }
                return response;
            }
        }
        catch (e) {
            errorHandler?.handleError(e, {
                requestOptions: {
                    url: typeof urlOrRequest === 'string' || urlOrRequest instanceof URL
                        ? urlOrRequest.toString()
                        : urlOrRequest.url,
                    method: requestInit?.method,
                },
            });
            throw e;
        }
    };
    const { client: servicePluginsClient, initModule: initServicePluginModule } = servicePluginsModules(getAuthStrategy);
    const { client: eventHandlersClient, initModule: initEventHandlerModule } = eventHandlersModules(getAuthStrategy);
    const boundFetch = async (url, options) => {
        const fetch = getFetchFn();
        const authHeaders = await boundGetAuthHeaders();
        const defaultContentTypeHeader = getDefaultContentHeader(options);
        const response = await fetch(url, {
            ...options,
            headers: {
                ...defaultContentTypeHeader,
                ..._headers,
                ...authHeaders?.headers,
                ...options?.headers,
                ...config.host?.essentials?.passThroughHeaders,
                // Ensure consistent header always takes precedence
                ...(_headers[X_WIX_CONSISTENT_HEADER]
                    ? { [X_WIX_CONSISTENT_HEADER]: _headers[X_WIX_CONSISTENT_HEADER] }
                    : {}),
            },
        });
        const consistentHeader = findConsistentHeader(response);
        if (consistentHeader) {
            _headers[X_WIX_CONSISTENT_HEADER] = consistentHeader;
        }
        return response;
    };
    // This is typed as `any` because when trying to properly type it as defined
    // on the WixClient, typescript starts failing with `Type instantiation is
    // excessively deep and possibly infinite.`
    const use = (modules, metadata) => {
        if (isEventHandlerModule(modules)) {
            return initEventHandlerModule(modules);
        }
        else if (isServicePluginModule(modules)) {
            return initServicePluginModule(modules);
        }
        else if (isHostModule(modules) && config.host) {
            return buildHostModule(modules, config.host);
        }
        else if (typeof modules === 'function') {
            // The generated namespaces all have the error classes on them and
            // a class is also a function, so we need to explicitly ignore these
            // error classes using a static field that exists on them.
            if ('__type' in modules && modules.__type === SERVICE_PLUGIN_ERROR_TYPE) {
                return modules;
            }
            const apiBaseUrl = config.host?.apiBaseUrl ?? DEFAULT_API_URL;
            const shouldUseCDN = config.useCDN === undefined
                ? getAuthStrategy().shouldUseCDN
                : config.useCDN;
            return buildRESTDescriptor(runWithoutContext(() => isAmbassadorModule(modules))
                ? toHTTPModule(modules)
                : modules, metadata ?? {}, boundFetch, config.host?.getErrorHandler?.(), (relativeUrl, fetchOptions) => {
                const finalUrl = new URL(relativeUrl, `https://${apiBaseUrl}`);
                finalUrl.host = apiBaseUrl;
                finalUrl.protocol = 'https';
                return boundFetch(finalUrl.toString(), fetchOptions);
            }, getAuthStrategy().getActiveToken, 
            // async wrapper normalizes the sync/async union from AuthenticationStrategy.getAuthHeaders
            async () => boundGetAuthHeaders(), { HTTPHost: apiBaseUrl }, config.host?.name, shouldUseCDN, config.validateRequestSchema);
        }
        else if (isObject(modules)) {
            return Object.fromEntries(Object.entries(modules).map(([key, value]) => {
                return [key, use(value, modules[PUBLIC_METADATA_KEY])];
            }));
        }
        else {
            return modules;
        }
    };
    const setHeaders = (headers) => {
        for (const k in headers) {
            _headers[k] = headers[k];
        }
    };
    const wrappedModules = config.modules
        ? use(config.modules)
        : {};
    return {
        ...wrappedModules,
        get auth() {
            const authStrategy = getAuthStrategy();
            const originalGetAuthHeaders = authStrategy.getAuthHeaders;
            authStrategy.getAuthHeaders = originalGetAuthHeaders.bind(undefined, config.host);
            return authStrategy;
        },
        setHeaders,
        use,
        enableContext(contextType, opts = { elevated: false }) {
            if (contextType === 'global') {
                if (globalThis.__wix_context__ != null) {
                    if (opts.elevated) {
                        globalThis.__wix_context__.elevatedClient = this;
                    }
                    else {
                        globalThis.__wix_context__.client = this;
                    }
                }
                else {
                    if (opts.elevated) {
                        globalThis.__wix_context__ = { elevatedClient: this };
                    }
                    else {
                        globalThis.__wix_context__ = { client: this };
                    }
                }
            }
            else {
                if (opts.elevated) {
                    wixContext.elevatedClient = this;
                }
                else {
                    wixContext.client = this;
                }
            }
        },
        /**
         * @param relativeUrl The URL to fetch relative to the API base URL
         * @param options The fetch options
         * @returns The fetch Response object
         * @deprecated Use `fetchWithAuth` instead
         */
        fetch: (relativeUrl, options) => {
            const apiBaseUrl = config.host?.apiBaseUrl ?? DEFAULT_API_URL;
            const finalUrl = new URL(relativeUrl, `https://${apiBaseUrl}`);
            finalUrl.host = apiBaseUrl;
            finalUrl.protocol = 'https';
            return boundFetch(finalUrl.toString(), options);
        },
        fetchWithAuth,
        async graphql(query, variables, opts = {
            apiVersion: 'alpha',
        }) {
            const apiBaseUrl = config?.host?.apiBaseUrl ?? DEFAULT_API_URL;
            const res = await boundFetch(`https://${apiBaseUrl}/graphql/${opts.apiVersion}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query, variables }),
            });
            if (res.status !== 200) {
                throw new FetchErrorResponse(`GraphQL request failed with status ${res.status}`, res);
            }
            const { data, errors } = await res.json();
            return { data: data ?? {}, errors };
        },
        webhooks: eventHandlersClient,
        servicePlugins: servicePluginsClient,
    };
}
function findConsistentHeader(response) {
    return (response.headers?.get(X_WIX_CONSISTENT_HEADER) ??
        response.headers?.get(X_WIX_CONSISTENT_HEADER.toLowerCase()));
}
