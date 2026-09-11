import { RESTResponseToSDKResponseRenameMap } from '@wix/sdk-runtime/rest-modules';
import { unflatten } from './flat-utils.js';
export class ModifiedFieldsManipulator {
    BRACKET_PATTERN = /\[(\d+)\]/g;
    NUMERIC_PATTERN = /^\d+$/;
    ESCAPED_DOT_PATTERN = /\\\./g;
    ESCAPED_LEFT_BRACKET_PATTERN = /\\\[/g;
    ESCAPED_RIGHT_BRACKET_PATTERN = /\\\]/g;
    SPLIT_PATTERN = /\.|\[(\d+)\]/g;
    DOT_BEFORE_BRACKET_PATTERN = /\.\[/g;
    ESCAPED_DOT_PLACEHOLDER = '__DOT__';
    ESCAPED_RIGHT_BRACKET_PLACEHOLDER = '__RB__';
    ESCAPED_LEFT_BRACKET_PLACEHOLDER = '__LB__';
    modifiedFields;
    cleanedModifiedFields;
    constructor(modifiedFields) {
        this.modifiedFields = modifiedFields;
    }
    replaceEscapedCharacters(key) {
        return key
            .replace(this.ESCAPED_DOT_PATTERN, this.ESCAPED_DOT_PLACEHOLDER)
            .replace(this.ESCAPED_LEFT_BRACKET_PATTERN, this.ESCAPED_LEFT_BRACKET_PLACEHOLDER)
            .replace(this.ESCAPED_RIGHT_BRACKET_PATTERN, this.ESCAPED_RIGHT_BRACKET_PLACEHOLDER);
    }
    restoreEscapedCharacters(key) {
        return key
            .replace(this.ESCAPED_DOT_PLACEHOLDER, '\\.')
            .replace(this.ESCAPED_RIGHT_BRACKET_PLACEHOLDER, '\\]')
            .replace(this.ESCAPED_LEFT_BRACKET_PLACEHOLDER, '\\[');
    }
    unflatten() {
        this.cleanedModifiedFields = Object.fromEntries(Object.entries(this.modifiedFields).map(([key, value]) => [
            this.replaceEscapedCharacters(this.bracketToDotNotation(key)),
            value,
        ]));
        return unflatten(this.cleanedModifiedFields);
    }
    flatten(transformedModifiedFields) {
        let result = {};
        for (const originalKey of Object.keys(this.cleanedModifiedFields)) {
            const pathParts = this.splitPath(originalKey);
            const value = this.navigatePath(transformedModifiedFields, pathParts);
            result = { ...result, ...value };
        }
        return Object.fromEntries(Object.entries(result).map(([key, value]) => [
            this.restoreEscapedCharacters(key),
            value,
        ]));
    }
    splitPath(path) {
        const parts = [];
        let lastIndex = 0;
        const matches = Array.from(path.matchAll(this.SPLIT_PATTERN));
        for (const match of matches) {
            if (match.index > lastIndex) {
                parts.push(path.substring(lastIndex, match.index));
            }
            if (match[1]) {
                parts.push(match[1]);
            }
            lastIndex = match.index + match[0].length;
        }
        if (lastIndex < path.length) {
            parts.push(path.substring(lastIndex));
        }
        return parts;
    }
    navigatePath(obj, pathParts) {
        let current = obj;
        const transformedPath = [];
        const handleArray = (part) => {
            if (!Array.isArray(current)) {
                throw new Error(`Expected array at path ${this.buildPathString(transformedPath)}, but got ${typeof current}`);
            }
            transformedPath.push(`[${part}]`);
            current = current[parseInt(part, 10)];
        };
        const handleTransformedKeyName = (part, currentObj) => {
            const transformedKey = part in RESTResponseToSDKResponseRenameMap
                ? RESTResponseToSDKResponseRenameMap[part]
                : undefined;
            if (transformedKey && transformedKey in currentObj) {
                transformedPath.push(transformedKey);
                current = currentObj[transformedKey];
                return;
            }
            const camelCaseKey = camelCase(part);
            if (camelCaseKey && camelCaseKey in currentObj) {
                transformedPath.push(camelCaseKey);
                current = currentObj[camelCaseKey];
                return;
            }
            throw new Error(`Cannot find key '${part}' or its transformations at path ${this.buildPathString(transformedPath)}`);
        };
        const handleObject = (part, currentObj) => {
            transformedPath.push(part);
            current = currentObj[part];
            return;
        };
        for (const part of pathParts) {
            if (this.NUMERIC_PATTERN.test(part)) {
                handleArray(part);
                continue;
            }
            if (current === null || typeof current !== 'object') {
                throw new Error(`Cannot access property '${part}' on ${typeof current} at path ${this.buildPathString(transformedPath)}`);
            }
            const currentObj = current;
            if (part in current) {
                handleObject(part, currentObj);
                continue;
            }
            handleTransformedKeyName(part, currentObj);
        }
        return { [this.buildPathString(transformedPath)]: current };
    }
    buildPathString(pathParts) {
        return pathParts.join('.').replace(this.DOT_BEFORE_BRACKET_PATTERN, '[');
    }
    bracketToDotNotation(key) {
        return key.replace(this.BRACKET_PATTERN, (match, number, offset) => {
            if (offset > 0 && key[offset - 1] === '\\') {
                return match;
            }
            return '.' + number;
        });
    }
}
/**
 * Transforms an envelope while preserving the structure of modifiedFields.
 *
 * Modified fields come as flattened objects, while transformations are applied to the nested object (e.g. "a.b.c" -> { a: { b: { c: 'value' } } }).
 * This function handles the transformation of envelopes that contain flattened modifiedFields.
 * It unflattens the modifiedFields, applies the transformation function, and then flattens
 * the modifiedFields back to their original format while preserving the transformation.
 * @param envelope - The envelope object containing flattened modifiedFields
 * @param transformFromRESTFn - Function to transform the envelope from REST format to SDK format
 * @returns The transformed envelope with flattened modifiedFields, or null if transformation fails
 */
export function attemptTransformationWithModifiedFields(envelope, transformFromRESTFn) {
    const modifiedFields = envelope?.modifiedFields;
    if (!modifiedFields) {
        return null;
    }
    const unflattenedResult = attemptUnflatten(modifiedFields);
    if (!unflattenedResult) {
        return null;
    }
    const { unflattenedModifiedFields, modifiedFieldsManipulator } = unflattenedResult;
    envelope = {
        ...envelope,
        modifiedFields: unflattenedModifiedFields,
    };
    const transformedEnvelope = transformFromRESTFn(envelope);
    const transformedModifiedFields = transformedEnvelope
        ?.modifiedFields;
    if (!transformedModifiedFields) {
        return null;
    }
    const flattened = attemptFlatten(transformedModifiedFields, modifiedFieldsManipulator);
    if (flattened !== null) {
        transformedEnvelope.modifiedFields = flattened;
        return transformedEnvelope;
    }
    return null;
}
function attemptUnflatten(modifiedFields) {
    if (typeof modifiedFields === 'object' &&
        modifiedFields !== null &&
        !Array.isArray(modifiedFields)) {
        try {
            const modifiedFieldsManipulator = new ModifiedFieldsManipulator(modifiedFields);
            const unflattened = modifiedFieldsManipulator.unflatten();
            return {
                unflattenedModifiedFields: unflattened,
                modifiedFieldsManipulator,
            };
        }
        catch (error) {
            return null;
        }
    }
    return null;
}
function attemptFlatten(transformedModifiedFields, modifiedFieldsManipulator) {
    if (typeof transformedModifiedFields === 'object' &&
        transformedModifiedFields !== null &&
        !Array.isArray(transformedModifiedFields)) {
        try {
            const flattened = modifiedFieldsManipulator.flatten(transformedModifiedFields);
            return flattened;
        }
        catch (error) {
            return null;
        }
    }
    return null;
}
// Simple camelCase implementation to avoid lodash (which uses `new Function()` internally
// and breaks Cloudflare Workers/Edge runtimes)
function camelCase(str) {
    return str
        .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
        .replace(/^./, (c) => c.toLowerCase());
}
