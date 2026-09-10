export type Filter = LogicalOperator | FieldFilter;
export type LogicalOperator = AndOperator | OrOperator | NotOperator;
export type AndOperator = {
    $and: Filter[];
};
export type OrOperator = {
    $or: Filter[];
};
type NotOperator = {
    $not: Filter;
};
export type FieldFilter = {
    [fieldName: string]: FieldOperator;
};
type FieldOperator = EqOperator | NeOperator | GeOperator | GtOperator | LeOperator | LtOperator | StartsWithOperator | EndsWithOperator | ContainsOperator | HasSomeOperator | HasAllOperator | InOperator | ExistsOperator;
type EqOperator<T = {}> = T | null;
type NeOperator<T = unknown> = {
    $ne: T;
};
type GeOperator<T extends string | number | Date = string | number | Date> = {
    $gte: T;
};
type GtOperator<T extends string | number | Date = string | number | Date> = {
    $gt: T;
};
type LeOperator<T extends string | number | Date = string | number | Date> = {
    $lte: T;
};
type LtOperator<T extends string | number | Date = string | number | Date> = {
    $lt: T;
};
type StartsWithOperator<T extends string = string> = {
    $startsWith: T;
};
type EndsWithOperator<T extends string = string> = {
    $endsWith: T;
};
type ContainsOperator<T extends string = string> = {
    $contains: T;
};
type HasSomeOperator<T extends string | number | Date = string | number | Date> = {
    $hasSome: T[];
};
type HasAllOperator<T extends string | number | Date = string | number | Date> = {
    $hasAll: T[];
};
type InOperator<T extends string | number | Date = string | number | Date> = {
    $in: T[];
};
type ExistsOperator = {
    $exists: boolean;
};
export declare function isLogicalOperator(filter: Filter): filter is LogicalOperator;
export declare function isAndOperator(filter: Filter): filter is AndOperator;
export declare function isOrOperator(filter: Filter): filter is OrOperator;
export declare function isNotOperator(filter: Filter): filter is NotOperator;
export declare function and(a?: Filter, b?: Filter): Filter | undefined;
export declare function or(a?: Filter, b?: Filter): Filter | undefined;
export declare function not(a?: Filter): Filter | undefined;
export {};
