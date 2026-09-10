import { wixContext } from '@wix/sdk-context';
export function resolveContext() {
    const oldContext = typeof $wixContext !== 'undefined' && $wixContext.initWixModules
        ? $wixContext.initWixModules
        : typeof globalThis.__wix_context__ !== 'undefined' &&
            globalThis.__wix_context__.initWixModules
            ? globalThis.__wix_context__.initWixModules
            : undefined;
    if (oldContext) {
        return {
            // @ts-expect-error
            initWixModules(modules, elevated) {
                return runWithoutContext(() => oldContext(modules, elevated));
            },
            fetchWithAuth() {
                throw new Error('fetchWithAuth is not available in this context');
            },
            graphql() {
                throw new Error('graphql is not available in this context');
            },
        };
    }
    const contextualClient = typeof $wixContext !== 'undefined'
        ? $wixContext.client
        : typeof wixContext.client !== 'undefined'
            ? wixContext.client
            : typeof globalThis.__wix_context__ !== 'undefined'
                ? globalThis.__wix_context__.client
                : undefined;
    const elevatedClient = typeof $wixContext !== 'undefined'
        ? $wixContext.elevatedClient
        : typeof wixContext.elevatedClient !== 'undefined'
            ? wixContext.elevatedClient
            : typeof globalThis.__wix_context__ !== 'undefined'
                ? globalThis.__wix_context__.elevatedClient
                : undefined;
    if (!contextualClient && !elevatedClient) {
        return;
    }
    return {
        initWixModules(wixModules, elevated) {
            if (elevated) {
                if (!elevatedClient) {
                    throw new Error('An elevated client is required to use elevated modules. Make sure to initialize the Wix context with an elevated client before using elevated SDK modules');
                }
                return runWithoutContext(() => elevatedClient.use(wixModules));
            }
            if (!contextualClient) {
                throw new Error('Wix context is not available. Make sure to initialize the Wix context before using SDK modules');
            }
            return runWithoutContext(() => contextualClient.use(wixModules));
        },
        fetchWithAuth: (urlOrRequest, requestInit) => {
            if (!contextualClient) {
                throw new Error('Wix context is not available. Make sure to initialize the Wix context before using SDK modules');
            }
            return contextualClient.fetchWithAuth(urlOrRequest, requestInit);
        },
        getAuth() {
            if (!contextualClient) {
                throw new Error('Wix context is not available. Make sure to initialize the Wix context before using SDK modules');
            }
            return contextualClient.auth;
        },
        async graphql(query, variables, opts) {
            if (!contextualClient) {
                throw new Error('Wix context is not available. Make sure to initialize the Wix context before using SDK modules');
            }
            return contextualClient.graphql(query, variables, opts);
        },
    };
}
export function contextualizeHostModule(hostModule, prop) {
    return (...args) => {
        const context = resolveContext();
        if (!context) {
            throw new Error('Wix context is not available. Make sure to initialize the Wix context before using SDK modules');
        }
        return context.initWixModules(hostModule)[prop].apply(undefined, args);
    };
}
export function getContextualAuth() {
    const context = resolveContext();
    if (!context) {
        throw new Error('Wix context is not available. Make sure to initialize the Wix context before using SDK modules');
    }
    return context.getAuth();
}
export function contextualizeRESTModule(restModule, expectedArgsLength) {
    return ((...args) => {
        const context = resolveContext();
        if (!context) {
            throw new Error('Wix context is not available. Make sure to initialize the Wix context before using SDK modules');
        }
        return context
            .initWixModules(restModule, args[expectedArgsLength]?.suppressAuth ? true : false)
            .apply(undefined, args);
    });
}
export function contextualizeEventDefinitionModule(eventDefinition) {
    return ((...args) => {
        const context = resolveContext();
        if (!context) {
            throw new Error('Wix context is not available. Make sure to initialize the Wix context before using SDK modules');
        }
        return context.initWixModules(eventDefinition).apply(undefined, args);
    });
}
export function contextualizeSerivcePluginModule(servicePlugin) {
    return ((...args) => {
        const context = resolveContext();
        if (!context) {
            throw new Error('Wix context is not available. Make sure to initialize the Wix context before using SDK modules');
        }
        return context.initWixModules(servicePlugin).apply(undefined, args);
    });
}
export * from './context-v2.js';
export function runWithoutContext(fn) {
    const globalContext = globalThis.__wix_context__;
    const moduleContext = {
        client: wixContext.client,
        elevatedClient: wixContext.elevatedClient,
    };
    let closureContext;
    globalThis.__wix_context__ = undefined;
    wixContext.client = undefined;
    wixContext.elevatedClient = undefined;
    if (typeof $wixContext !== 'undefined') {
        closureContext = {
            client: $wixContext?.client,
            elevatedClient: $wixContext?.elevatedClient,
        };
        delete $wixContext.client;
        delete $wixContext.elevatedClient;
    }
    try {
        return fn();
    }
    finally {
        globalThis.__wix_context__ = globalContext;
        wixContext.client = moduleContext.client;
        wixContext.elevatedClient = moduleContext.elevatedClient;
        if (typeof $wixContext !== 'undefined') {
            $wixContext.client = closureContext.client;
            $wixContext.elevatedClient = closureContext.elevatedClient;
        }
    }
}
