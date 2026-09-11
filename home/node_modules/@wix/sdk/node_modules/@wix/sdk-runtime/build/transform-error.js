import { constantCase } from './utils.js';
const isValidationError = (httpClientError) => 'validationError' in (httpClientError.response?.data?.details ?? {});
const isApplicationError = (httpClientError) => 'applicationError' in
    (httpClientError.response?.data?.details ?? {});
const isClientError = (httpClientError) => (httpClientError.response?.status ?? -1) >= 400 &&
    (httpClientError.response?.status ?? -1) < 500;
export function transformError(httpClientError, pathsToArguments = {
    explicitPathsToArguments: {},
    spreadPathsToArguments: {},
    singleArgumentUnchanged: false,
}, argumentNames = []) {
    if (typeof httpClientError !== 'object' || httpClientError === null) {
        throw httpClientError;
    }
    if (isValidationError(httpClientError)) {
        return buildValidationError(httpClientError, pathsToArguments, argumentNames);
    }
    if (isApplicationError(httpClientError)) {
        return buildApplicationError(httpClientError);
    }
    if (isClientError(httpClientError)) {
        const status = httpClientError.response?.status;
        const statusText = httpClientError.response?.statusText ?? 'UNKNOWN';
        const message = httpClientError.response?.data?.message ?? statusText;
        const details = {
            applicationError: {
                description: statusText,
                code: constantCase(statusText),
                data: {},
            },
            requestId: httpClientError.requestId,
        };
        return wrapError(httpClientError, {
            message: JSON.stringify({
                message,
                details,
            }, null, 2),
            extraProperties: {
                details,
                status,
            },
        });
    }
    return buildSystemError(httpClientError);
}
const buildValidationError = (httpClientError, pathsToArguments, argumentNames) => {
    const validationErrorResponse = httpClientError.response
        ?.data;
    const requestId = httpClientError.requestId;
    const { fieldViolations } = validationErrorResponse.details.validationError;
    const transformedFieldViolations = violationsWithRenamedFields(pathsToArguments, fieldViolations, argumentNames)?.sort((a, b) => (a.field < b.field ? -1 : 1));
    const message = `INVALID_ARGUMENT: ${transformedFieldViolations
        ?.map(({ field, description }) => `"${field}" ${description}`)
        ?.join(', ')}`;
    const details = {
        validationError: { fieldViolations: transformedFieldViolations },
        requestId,
    };
    return wrapError(httpClientError, {
        message: JSON.stringify({ message, details }, null, 2),
        extraProperties: {
            details,
            status: httpClientError.response?.status,
            requestId,
        },
    });
};
const wrapError = (baseError, { message, extraProperties, }) => {
    return Object.assign(baseError, {
        ...extraProperties,
        message,
    });
};
const buildApplicationError = (httpClientError) => {
    const status = httpClientError.response?.status;
    const statusText = httpClientError.response?.statusText ?? 'UNKNOWN';
    const message = httpClientError.response?.data?.message ?? statusText;
    const description = httpClientError.response?.data?.details?.applicationError?.description ??
        statusText;
    const code = httpClientError.response?.data?.details?.applicationError?.code ??
        constantCase(statusText);
    const data = httpClientError.response?.data?.details?.applicationError?.data ?? {};
    const combinedMessage = message === description ? message : `${message}: ${description}`;
    const details = {
        applicationError: {
            description,
            code,
            data,
        },
        requestId: httpClientError.requestId,
    };
    return wrapError(httpClientError, {
        message: JSON.stringify({ message: combinedMessage, details }, null, 2),
        extraProperties: {
            details,
            status,
            requestId: httpClientError.requestId,
        },
    });
};
const buildSystemError = (httpClientError) => {
    const message = httpClientError.requestId
        ? `System error occurred, request-id: ${httpClientError.requestId}`
        : `System error occurred: ${JSON.stringify(httpClientError)}`;
    return wrapError(httpClientError, {
        message,
        extraProperties: {
            requestId: httpClientError.requestId,
            status: httpClientError.response?.status,
            code: constantCase(httpClientError.response?.statusText ?? 'UNKNOWN'),
            ...(!httpClientError.response && {
                runtimeError: httpClientError,
            }),
        },
    });
};
const violationsWithRenamedFields = ({ spreadPathsToArguments, explicitPathsToArguments, singleArgumentUnchanged, }, fieldViolations, argumentNames) => {
    const allPathsToArguments = {
        ...spreadPathsToArguments,
        ...explicitPathsToArguments,
    };
    const allPathsToArgumentsKeys = Object.keys(allPathsToArguments);
    return fieldViolations
        ?.filter((fieldViolation) => {
        // In some cases, the violations error will include both some.nested and some.nested.path,
        // so we'll pick the more specific one if it's covered by the paths in the transformation.
        const containedInAMoreSpecificViolationField = fieldViolations.some((anotherViolation) => anotherViolation.field.length > fieldViolation.field.length &&
            anotherViolation.field.startsWith(fieldViolation.field) &&
            allPathsToArgumentsKeys.includes(anotherViolation.field));
        return !containedInAMoreSpecificViolationField;
    })
        .map((fieldViolation) => {
        // This means we've got some.nested.field in the violation,
        // matched against { some: { nested: { field: $[0].a.b.c } } } in the transformation.
        // some.nested.field is replaced entirely with $[0].a.b.c, with $[0] replaced with the name of argument 0
        const exactMatchArgumentExpression = explicitPathsToArguments[fieldViolation.field];
        if (exactMatchArgumentExpression) {
            return {
                ...fieldViolation,
                field: withRenamedArgument(exactMatchArgumentExpression, argumentNames),
            };
        }
        const longestPartialPathMatch = allPathsToArgumentsKeys
            ?.sort((a, b) => b.length - a.length)
            ?.find((path) => fieldViolation.field.startsWith(path));
        if (longestPartialPathMatch) {
            // This means we've got some.nested.field in the violation,
            // matched against { some: { nested: { *: $[0].a.b.c } } } in the transformation.
            // Only the prefix some.nested is replaced with $[0].a.b.c, with $[0] replaced with the name of argument 0
            // This can also happen in the case where the #wrap function is used.
            const partialMatchArgumentExpression = allPathsToArguments[longestPartialPathMatch];
            if (partialMatchArgumentExpression) {
                return {
                    ...fieldViolation,
                    field: fieldViolation.field.replace(longestPartialPathMatch, withRenamedArgument(partialMatchArgumentExpression, argumentNames)),
                };
            }
        }
        if (singleArgumentUnchanged) {
            return {
                ...fieldViolation,
                field: `${argumentNames[0]}.${fieldViolation.field}`,
            };
        }
        return fieldViolation;
    });
};
const withRenamedArgument = (fieldValue, argumentNames) => {
    const argIndex = getArgumentIndex(fieldValue);
    if (argIndex !== null && typeof argIndex !== 'undefined') {
        return fieldValue.replace(`$[${argIndex}]`, argumentNames[argIndex]);
    }
    return fieldValue;
};
const getArgumentIndex = (s) => {
    const match = s.match(/\$\[(?<argIndex>\d+)\]/);
    return match && match.groups && Number(match.groups.argIndex);
};
