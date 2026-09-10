import { isCursorQuery, isQueryV2 } from './query-type-guards.js';
export function createQueryOverloadRouter(options) {
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
            return isCursorQuery(args[0]) || isQueryV2(args[0])
                ? options.typedQueryFunction(args[0])
                : options.builderQueryFunction(args[0]);
        default:
            return options.typedQueryFunction(args[0], args[1]);
    }
}
