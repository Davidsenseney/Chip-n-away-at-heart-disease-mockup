import { StatusCode } from './StatusCode';
import { ShowErrorProps } from './ShowError';
import { ApplicationError } from './ApplicationError';
import { ApplicationErrorResponse } from './ApplicationErrorResponse';
import { FieldViolationBase } from './ValidationError';
export type ApplicationErrorsShowErrorMapFunction = (applicationError: ApplicationError, error: Error | null) => ShowErrorProps;
export type ValidationErrorsShowErrorMapFunction = (error: Error | null) => ShowErrorProps;
export type RuleName = string;
export type ApplicationErrorsMap<TApplicationError extends ApplicationError = ApplicationError> = {
    [K in NonNullable<TApplicationError['code']>]?: ApplicationErrorsShowErrorMapFunction | false;
} & {
    [key: string]: ApplicationErrorsShowErrorMapFunction | false;
};
export type ValidationErrorsMap<TFieldViolation extends FieldViolationBase = FieldViolationBase> = {
    [K in NonNullable<TFieldViolation['ruleName']>]?: ValidationErrorsShowErrorMapFunction | false;
} & {
    [key: string]: ValidationErrorsShowErrorMapFunction | false;
};
export type StatusCodeMap = Partial<Record<StatusCode, (error: Error | null) => ShowErrorProps>>;
export interface ErrorCodesMapBase {
    /**
     * When the error is not a validation error or an application error
     */
    statusCodeError?: StatusCodeMap;
    /**
     * When the error is a server error (5xx)
     */
    serverError?: (error: Error | null) => ShowErrorProps;
}
export interface ErrorCodesMapRequiredApplicationError<TApplicationError extends ApplicationError> extends ErrorCodesMapBase {
    /**
     * When the response contains an application error (WixApplicationRuntimeException) - can be any status code (defined in proto)
     */
    applicationError?: ApplicationErrorsMap<TApplicationError>;
}
export interface ErrorCodesMapRequiredValidationError<TFieldViolation extends FieldViolationBase> extends ErrorCodesMapBase {
    /**
     * When the response contains a validation error (WixValidationRuntimeException) - can be any status code (defined in proto)
     */
    validationError?: ValidationErrorsMap<TFieldViolation>;
}
export type ErrorCodesMapConditionalEnforcement<T> = T extends ApplicationErrorResponse ? ErrorCodesMapConditionalApplicationErrorEnforcement<T> & ErrorCodesMapConditionalValidationErrorEnforcement<T> : ErrorCodesMap;
export type ErrorCodesMapConditionalApplicationErrorEnforcement<T extends ApplicationErrorResponse> = NonNullable<NonNullable<T['data']['__applicationErrorsType']>['code']> extends string ? ErrorCodesMapRequiredApplicationError<NonNullable<T['data']['__applicationErrorsType']>> : ErrorCodesMap;
export type ErrorCodesMapConditionalValidationErrorEnforcement<T extends ApplicationErrorResponse> = NonNullable<NonNullable<T['data']['__validationErrorsType']>['ruleName']> extends string ? ErrorCodesMapRequiredValidationError<NonNullable<T['data']['__validationErrorsType']>> : ErrorCodesMap;
export interface ErrorCodesMap<TApplicationError extends ApplicationError = ApplicationError, TFieldViolation extends FieldViolationBase = FieldViolationBase> extends ErrorCodesMapBase {
    /**
     * When the response contains an application error (WixApplicationRuntimeException) - can be any status code (defined in proto)
     */
    applicationError?: ApplicationErrorsMap<TApplicationError>;
    /**
     * When the response contains a validation error (WixValidationRuntimeException) - can be any status code (defined in proto)
     */
    validationError?: ValidationErrorsMap<TFieldViolation>;
}
//# sourceMappingURL=ErrorCodesMap.d.ts.map