export type ValidationErrorResponse = {
    details: {
        validationError: {
            fieldViolations: {
                field: string;
                description: string;
            }[];
        };
    };
};
export type ApplicationErrorResponse = {
    message?: string;
    details: {
        applicationError?: {
            description?: string;
            code?: string;
            data?: unknown;
        };
    };
};
export type HTTPClientError<ErrorData = unknown> = {
    response?: {
        data?: ErrorData;
        status?: number;
        statusText?: string;
    };
    requestId?: string;
};
export interface BaseTransformedError {
    status: number | undefined;
    requestId: string | undefined;
}
export interface TransformedApplicationError extends BaseTransformedError {
    details: {
        applicationError: {
            description: string;
            code: string;
            data?: unknown;
        };
        validationError?: undefined;
        requestId?: string;
    };
}
export interface TransformedValidationError extends BaseTransformedError {
    details: {
        validationError: {
            fieldViolations: {
                field: string;
                description: string;
            }[];
        };
        applicationError?: undefined;
        requestId?: string;
    };
}
export interface TransformedSystemError extends BaseTransformedError {
    code?: string;
    runtimeError?: unknown;
    details?: undefined;
}
export interface TransformedClientError extends BaseTransformedError {
    details: {
        applicationError: {
            description: string;
            code: string;
            data?: unknown;
        };
        validationError?: undefined;
        requestId?: string;
    };
}
export type TransformedError = TransformedApplicationError | TransformedValidationError | TransformedSystemError | TransformedClientError;
export declare function transformError(httpClientError: unknown, pathsToArguments?: PathsToArguments, argumentNames?: string[]): TransformedError;
type PathsToArguments = {
    spreadPathsToArguments: Record<string, string>;
    explicitPathsToArguments: Record<string, string>;
    singleArgumentUnchanged: boolean;
};
export {};
