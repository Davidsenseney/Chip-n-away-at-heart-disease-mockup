import { ShowErrorProps } from './ShowError';
import { ErrorCodesMap } from './ErrorCodesMap';
export interface ErrorHandlerState {
    sessionId?: string;
    resolvedError?: ShowErrorProps | null;
    errorCodesMap?: ErrorCodesMap | null;
    responseData?: {} | null;
}
export interface ErrorHandlerError {
    _errorHandlerState?: ErrorHandlerState | null;
}
//# sourceMappingURL=ErrorHandlerError.d.ts.map