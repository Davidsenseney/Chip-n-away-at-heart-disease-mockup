import type { WQLSpec, FilterFactory, SortFactory } from '@wix/sdk-types';
/**
 * Creates the Filter factory with field selector and logical operators
 * @returns A FilterFactory with field selector and logical operators (and, or, not)
 */
export declare function createFilterFactory<T, S extends WQLSpec>(): FilterFactory<T, S>;
/**
 * Creates the Sort factory
 * @returns A SortFactory for creating sort expressions
 */
export declare function createSortFactory<S extends WQLSpec>(): SortFactory<S>;
