"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isServicePluginModule = void 0;
exports.servicePluginsModules = servicePluginsModules;
const nanoevents_js_1 = require("./nanoevents.js");
const isServicePluginModule = (val) => val.__type === 'service-plugin-definition';
exports.isServicePluginModule = isServicePluginModule;
function servicePluginsModules(getAuthStrategy) {
    const servicePluginsImplementations = new Map();
    const servicePluginsEmitter = (0, nanoevents_js_1.createNanoEvents)();
    const client = {
        ...servicePluginsEmitter,
        getRegisteredServicePlugins: () => servicePluginsImplementations,
        async parseJWT(jwt) {
            const authStrategy = getAuthStrategy();
            if (!authStrategy.decodeJWT) {
                throw new Error('decodeJWT is not supported by the authentication strategy');
            }
            const { decoded, valid } = await authStrategy.decodeJWT(jwt, true);
            if (!valid) {
                throw new Error('JWT is not valid');
            }
            if (typeof decoded.data !== 'object' ||
                decoded.data === null ||
                !('metadata' in decoded.data) ||
                typeof decoded.data.metadata !== 'object' ||
                decoded.data.metadata === null ||
                !('appExtensionType' in decoded.data.metadata) ||
                typeof decoded.data.metadata.appExtensionType !== 'string') {
                throw new Error('Unexpected JWT data: expected object with metadata.appExtensionType string');
            }
            return decoded.data;
        },
        async process(request) {
            const servicePluginRequest = await this.parseJWT(request.body);
            return this.executeHandler(servicePluginRequest, request.url);
        },
        async parseRequest(request) {
            const body = await request.text();
            return this.parseJWT(body);
        },
        async processRequest(request) {
            const url = request.url;
            const body = await request.text();
            try {
                const implMethodResult = await this.process({ url, body });
                return Response.json(implMethodResult);
            }
            catch (err) {
                if (err.errorType === 'SPI' && err.applicationCode && err.httpCode) {
                    return Response.json({ applicationError: { code: err.applicationCode, data: err.data } }, { status: err.httpCode });
                }
                throw err;
            }
        },
        async executeHandler(servicePluginRequest, url) {
            const componentType = servicePluginRequest.metadata.appExtensionType.toLowerCase();
            const implementations = servicePluginsImplementations.get(componentType) ?? [];
            if (implementations.length === 0) {
                throw new Error(`No service plugin implementations found for component type ${componentType}`);
            }
            else if (implementations.length > 1) {
                throw new Error(`Multiple service plugin implementations found for component type ${componentType}. This is currently not supported`);
            }
            const { implementation: impl, servicePluginDefinition } = implementations[0];
            const method = servicePluginDefinition.methods.find((m) => url.endsWith(m.primaryHttpMappingPath));
            if (!method) {
                throw new Error('Unexpect request: request url did not match any method: ' + url);
            }
            const implMethod = impl[method.name];
            if (!implMethod) {
                throw new Error(`Got request for service plugin method ${method.name} but no implementation was provided. Available methods: ${Object.keys(impl).join(', ')}`);
            }
            return method.transformations.toREST(await implMethod(method.transformations.fromREST(servicePluginRequest)));
        },
    };
    return {
        initModule(servicePluginDefinition) {
            return (implementation) => {
                const implementations = servicePluginsImplementations.get(servicePluginDefinition.componentType.toLowerCase()) ?? [];
                implementations.push({ servicePluginDefinition, implementation });
                servicePluginsImplementations.set(servicePluginDefinition.componentType.toLowerCase(), implementations);
                servicePluginsEmitter.emit('registered', servicePluginDefinition);
            };
        },
        client,
    };
}
