export declare function alignIfLegacy(url: string, type: string): string;
type RemoveUndefinedKeys<T> = T extends Record<string, unknown> ? {
    [K in keyof T]: T[K] extends undefined ? never : T[K];
} : T;
export declare function removeUndefinedKeys<T extends Record<string, unknown>>(obj: T): RemoveUndefinedKeys<T>;
export declare function constantCase(input: string): string;
export declare function split(value: string): string[];
export {};
