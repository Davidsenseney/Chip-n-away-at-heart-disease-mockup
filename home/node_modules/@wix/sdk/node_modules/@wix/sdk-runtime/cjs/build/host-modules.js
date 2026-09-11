"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHostModule = createHostModule;
const context_v2_js_1 = require("./context-v2.js");
function createHostModule(hostModuleAPI) {
    return (0, context_v2_js_1.contextualizeHostModuleV2)({
        __type: 'host',
        create: (host) => Object.entries(hostModuleAPI).reduce((acc, [key, fn]) => ({
            ...acc,
            [key]: fn(host),
        }), {}),
    }, Object.keys(hostModuleAPI));
}
