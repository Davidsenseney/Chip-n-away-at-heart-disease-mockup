"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCursorQuery = isCursorQuery;
exports.isQueryV2 = isQueryV2;
const FILTER = 'filter';
const SORT = 'sort';
const CURSOR_PAGING = 'cursorPaging';
const PAGING = 'paging';
const CURSOR_QUERY_KEYS = [FILTER, SORT, CURSOR_PAGING];
const QUERY_V2_KEYS = [FILTER, SORT, PAGING];
function hasQueryProperties(obj, queryKeys) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }
    const hasQueryProps = queryKeys.some((key) => obj.hasOwnProperty(key));
    const isEmpty = Object.keys(obj).length === 0;
    return hasQueryProps || isEmpty;
}
function isCursorQuery(obj) {
    return hasQueryProperties(obj, CURSOR_QUERY_KEYS);
}
function isQueryV2(obj) {
    return hasQueryProperties(obj, QUERY_V2_KEYS);
}
