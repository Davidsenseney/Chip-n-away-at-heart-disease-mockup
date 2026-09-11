import { DocumentNode, GraphQLFormattedError } from 'graphql';
import { RESTFunctionDescriptor } from '@wix/sdk-types';
export type TypedQueryInput<Result = {
    [key: string]: any;
}, Variables = {
    [key: string]: any;
}> = {
    /**
     * Type to support `@graphql-typed-document-node/core`
     * @internal
     */
    __apiType?: (variables: Variables) => Result;
    /**
     * Type to support `TypedQueryDocumentNode` from `graphql`
     * @internal
     */
    __ensureTypesOfVariablesAndResultMatching?: (variables: Variables) => Result;
};
export declare const graphql: (<Result, Variables>(query: string | String | DocumentNode | TypedQueryInput<Result, Variables>, variables?: Variables, opts?: {
    apiVersion: string;
}) => Promise<{
    data: Result;
    errors?: GraphQLFormattedError[];
}>) & RESTFunctionDescriptor<(<Result, Variables>(query: string | String | DocumentNode | TypedQueryInput<Result, Variables>, variables?: Variables, opts?: {
    apiVersion: string;
}) => Promise<{
    data: Result;
    errors?: GraphQLFormattedError[];
}>)>;
