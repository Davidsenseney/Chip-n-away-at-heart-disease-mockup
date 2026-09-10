import { RequestOptions } from './RequestOptions';
export interface HandleErrorOptions {
    requestOptions?: RequestOptions;
}
export interface ErrorHandlerInternalAPI {
    handleError: (error: unknown, options?: HandleErrorOptions) => void;
}
//# sourceMappingURL=ErrorHandlerInternalAPI.d.ts.map