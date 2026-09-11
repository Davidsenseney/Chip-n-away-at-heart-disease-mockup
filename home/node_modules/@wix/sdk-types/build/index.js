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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  EventDefinition: () => EventDefinition,
  SERVICE_PLUGIN_ERROR_TYPE: () => SERVICE_PLUGIN_ERROR_TYPE,
  SORT_CAPABILITIES: () => SORT_CAPABILITIES,
  SORT_DIRECTIONS: () => SORT_DIRECTIONS,
  ServicePluginDefinition: () => ServicePluginDefinition
});
module.exports = __toCommonJS(src_exports);

// src/event-handlers-modules.ts
function EventDefinition(type, isDomainEvent = false, transformations = (x) => x) {
  return () => ({
    __type: "event-definition",
    type,
    isDomainEvent,
    transformations
  });
}

// src/service-plugins.ts
function ServicePluginDefinition(componentType, methods) {
  return {
    __type: "service-plugin-definition",
    componentType,
    methods
  };
}
var SERVICE_PLUGIN_ERROR_TYPE = "wix_spi_error";

// src/common/sort.ts
var SORT_DIRECTIONS = {
  ASC: "ASC",
  DESC: "DESC"
};
var SORT_CAPABILITIES = {
  ...SORT_DIRECTIONS,
  BOTH: "BOTH",
  NONE: "NONE"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EventDefinition,
  SERVICE_PLUGIN_ERROR_TYPE,
  SORT_CAPABILITIES,
  SORT_DIRECTIONS,
  ServicePluginDefinition
});
