"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renameAllNestedKeys = renameAllNestedKeys;
exports.renameKeysFromSDKRequestToRESTRequest = renameKeysFromSDKRequestToRESTRequest;
exports.renameKeysFromRESTResponseToSDKResponse = renameKeysFromRESTResponseToSDKResponse;
const constants_js_1 = require("./constants.js");
/**
 * Recursively rename nested keys provided in `renameMap` in the given object.
 * Providing a list of paths to ignore will prevent renaming of keys in nested objects.
 *
 * Paths are provided in the format of 'path.to.nested.field'
 * @param payload The object to rename keys for
 * @param renameMap A map of keys to rename, where the key is the original key and the value is the new key
 * @param ignorePaths Paths of nested fields to ignore while traversing the object
 * @returns The object with renamed keys
 */
function renameAllNestedKeys(payload, renameMap, ignorePaths) {
    const isIgnored = (path) => ignorePaths.includes(path);
    const traverse = (obj, path) => {
        if (Array.isArray(obj)) {
            obj.forEach((item) => {
                traverse(item, path);
            });
        }
        else if (typeof obj === 'object' && obj !== null) {
            const objAsRecord = obj;
            Object.keys(objAsRecord).forEach((key) => {
                const newPath = path === '' ? key : `${path}.${key}`;
                if (isIgnored(newPath)) {
                    return;
                }
                const transformedKey = renameKey(key, renameMap);
                if (transformedKey !== key && !(transformedKey in objAsRecord)) {
                    objAsRecord[transformedKey] = objAsRecord[key];
                    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                    delete objAsRecord[key];
                }
                traverse(objAsRecord[transformedKey], newPath);
            });
        }
    };
    traverse(payload, '');
    return payload;
}
function renameKey(key, renameMap) {
    let transformedKey;
    if (key.includes('.')) {
        const parts = key.split('.');
        const transformedParts = parts.map((part) => renameMap[part] ?? part);
        transformedKey = transformedParts.join('.');
    }
    else {
        transformedKey = renameMap[key] ?? key;
    }
    return transformedKey;
}
function renameKeysFromSDKRequestToRESTRequest(payload, ignorePaths = []) {
    return renameAllNestedKeys(payload, constants_js_1.SDKRequestToRESTRequestRenameMap, ignorePaths);
}
function renameKeysFromRESTResponseToSDKResponse(payload, ignorePaths = []) {
    return renameAllNestedKeys(payload, constants_js_1.RESTResponseToSDKResponseRenameMap, ignorePaths);
}
