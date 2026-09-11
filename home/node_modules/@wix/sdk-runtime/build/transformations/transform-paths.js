function transformPath(obj, { path, isRepeated, isMap, }, transformFn) {
    const pathParts = path.split('.');
    if (pathParts.length === 1 && path in obj) {
        obj[path] = isRepeated
            ? obj[path].map(transformFn)
            : isMap
                ? Object.fromEntries(Object.entries(obj[path]).map(([key, value]) => [key, transformFn(value)]))
                : transformFn(obj[path]);
        return obj;
    }
    const [first, ...rest] = pathParts;
    if (first.endsWith('{}')) {
        const cleanPath = first.slice(0, -2);
        obj[cleanPath] = Object.fromEntries(Object.entries(obj[cleanPath]).map(([key, value]) => [
            key,
            transformPath(value, { path: rest.join('.'), isRepeated, isMap }, transformFn),
        ]));
    }
    else if (Array.isArray(obj[first])) {
        obj[first] = obj[first].map((item) => transformPath(item, { path: rest.join('.'), isRepeated, isMap }, transformFn));
    }
    else if (first in obj &&
        typeof obj[first] === 'object' &&
        obj[first] !== null) {
        obj[first] = transformPath(obj[first], { path: rest.join('.'), isRepeated, isMap }, transformFn);
    }
    else if (first === '*') {
        Object.keys(obj).reduce((acc, curr) => {
            acc[curr] = transformPath(obj[curr], { path: rest.join('.'), isRepeated, isMap }, transformFn);
            return acc;
        }, obj);
    }
    return obj;
}
export function transformPaths(obj, transformations) {
    return transformations.reduce((acc, { paths, transformFn }) => paths.reduce((transformerAcc, path) => transformPath(transformerAcc, path, transformFn), acc), obj);
}
