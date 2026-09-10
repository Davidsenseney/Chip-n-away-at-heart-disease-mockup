"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQueryOverloadRouter = createQueryOverloadRouter;
const query_type_guards_js_1 = require("./query-type-guards.js");
function createQueryOverloadRouter(options) {
    const { hasOptionsParameter } = options;
    return function queryOverloadRouter(...args) {
        return hasOptionsParameter
            ? routeComplexOverload(args, options)
            : routeSimpleOverload(args, options);
    };
}
function routeSimpleOverload(args, options) {
    if (args.length === 0) {
        return options.builderQueryFunction();
    }
    return options.typedQueryFunction(args[0]);
}
function routeComplexOverload(args, options) {
    switch (args.length) {
        case 0:
            return options.builderQueryFunction();
        case 1:
            return (0, query_type_guards_js_1.isCursorQuery)(args[0]) || (0, query_type_guards_js_1.isQueryV2)(args[0])
                ? options.typedQueryFunction(args[0])
                : options.builderQueryFunction(args[0]);
        default:
            return options.typedQueryFunction(args[0], args[1]);
    }
}
