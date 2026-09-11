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
export {
  EventDefinition,
  SERVICE_PLUGIN_ERROR_TYPE,
  SORT_CAPABILITIES,
  SORT_DIRECTIONS,
  ServicePluginDefinition
};
