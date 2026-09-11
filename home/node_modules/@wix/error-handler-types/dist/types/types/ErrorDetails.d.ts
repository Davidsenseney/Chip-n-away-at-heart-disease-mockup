import { ApplicationError } from './ApplicationError';
import { ValidationError } from './ValidationError';
interface SystemError {
    /** Error code. */
    errorCode?: string | null;
}
interface DetailsKindOneOf {
    applicationError?: ApplicationError;
    validationError?: ValidationError;
    systemError?: SystemError;
}
export interface ErrorDetails extends DetailsKindOneOf {
    applicationError?: ApplicationError;
    validationError?: ValidationError;
    systemError?: SystemError;
}
export interface ErrorResponseMessage {
    message: string;
}
export interface ErrorResponseDetails {
    details: ErrorDetails;
}
export {};
//# sourceMappingURL=ErrorDetails.d.ts.map