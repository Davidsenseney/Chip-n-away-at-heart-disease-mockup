export interface FieldViolationBase<TRuleName extends string = string> {
    ruleName?: TRuleName | null;
}
export interface FieldViolation extends FieldViolationBase {
    field?: string;
    description?: string;
    violatedRule?: string;
    /** applicable when violated_rule=OTHER */
    ruleName?: string | null;
    data?: Record<string, any> | null;
}
export interface ValidationError {
    fieldViolations?: FieldViolation[];
}
//# sourceMappingURL=ValidationError.d.ts.map