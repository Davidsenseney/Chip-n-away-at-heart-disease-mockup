import { ResolvedError } from './ResolvedError';
import { ShowErrorOverrideProps } from './ShowError';
import { ErrorCodesMap, ShowErrorMapFunction, StatusCodeMap } from './ErrorCodesMap';
export interface WithErrorHandlerOptions {
    /**
     * Overrides for specific HTTP status codes
     */
    statusCodesOverrides?: StatusCodeMap;
    /**
     * Override for all server errors (5xx)
     */
    serverErrorOverride?: ShowErrorMapFunction;
}
export interface ErrorHandlerPublicAPI {
    withErrorHandler: <T>(fn: () => Promise<T>, 
    /**
     * Mappings of error codes unique to this request (e.g. validation errors, application errors)
     */
    errorCodesMap: ErrorCodesMap<T>, options?: WithErrorHandlerOptions) => Promise<T>;
    getResolvedError: <T>(error: unknown) => ResolvedError & Partial<T>;
    reportRetryAttempt: (error: unknown) => void;
    showError: (error: unknown, props?: Partial<ShowErrorOverrideProps> | null) => void;
}
//# sourceMappingURL=ErrorHandlerPublicAPI.d.ts.map