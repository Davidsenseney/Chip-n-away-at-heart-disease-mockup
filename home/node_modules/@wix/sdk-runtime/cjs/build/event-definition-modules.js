"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventModule = createEventModule;
const context_v2_js_1 = require("./context-v2.js");
function createEventModule(eventDefinition) {
    return (0, context_v2_js_1.contextualizeEventDefinitionModuleV2)(eventDefinition);
}
