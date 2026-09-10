import type { DeferUsage, GroupedFieldSet } from "../collectFields.mjs";
/** @internal */
export type DeferUsageSet = ReadonlySet<DeferUsage>;
/** @internal */
export interface ExecutionPlan {
    groupedFieldSet: GroupedFieldSet;
    newGroupedFieldSets: Map<DeferUsageSet, GroupedFieldSet>;
}
/** @internal */
export declare function buildExecutionPlan(originalGroupedFieldSet: GroupedFieldSet, parentDeferUsages?: DeferUsageSet): ExecutionPlan;
