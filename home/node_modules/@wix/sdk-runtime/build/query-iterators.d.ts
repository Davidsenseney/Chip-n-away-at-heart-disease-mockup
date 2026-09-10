import type { QueryBuilder } from './query-builder.js';
export declare abstract class Iterator<T, SubIterator extends Iterator<T, any, any>, TQueryBuilder extends QueryBuilder<T, any>> {
    protected readonly _items: T[];
    protected readonly _fetchNextPage: () => Promise<SubIterator>;
    protected readonly _fetchPrevPage: () => Promise<SubIterator>;
    protected readonly _originQuery: TQueryBuilder;
    protected readonly _limit: number;
    protected constructor({ items, originQuery, fetchNextPage, fetchPrevPage, limit, }: {
        items: T[];
        originQuery: TQueryBuilder;
        fetchNextPage: () => Promise<SubIterator>;
        fetchPrevPage: () => Promise<SubIterator>;
        limit: number;
    });
    abstract hasNext(): boolean;
    abstract hasPrev(): boolean;
    get items(): T[];
    get length(): number;
    get pageSize(): number;
    get query(): TQueryBuilder;
    next(): Promise<SubIterator>;
    prev(): Promise<SubIterator>;
}
export declare class CursorBasedIterator<T> extends Iterator<T, CursorBasedIterator<T>, QueryBuilder<T, 'CURSOR'>> {
    private readonly _nextCursor?;
    private readonly _prevCursor?;
    readonly cursors: {
        next?: string | null;
        prev?: string | null;
    };
    constructor({ items, originQuery, fetchNextPage, fetchPrevPage, limit, nextCursor, prevCursor, }: {
        items: T[];
        originQuery: QueryBuilder<T, 'CURSOR'>;
        fetchNextPage: () => Promise<CursorBasedIterator<T>>;
        fetchPrevPage: () => Promise<CursorBasedIterator<T>>;
        limit: number;
        nextCursor?: string | null;
        prevCursor?: string | null;
    });
    hasNext(): boolean;
    hasPrev(): boolean;
}
export declare class OffsetBasedIterator<T> extends Iterator<T, OffsetBasedIterator<T>, QueryBuilder<T, 'OFFSET'>> {
    private _totalCount;
    private _offset;
    private _tooManyToCount;
    constructor({ items, fetchNextPage, fetchPrevPage, offset, originQuery, limit, totalCount, tooManyToCount, }: {
        items: T[];
        fetchNextPage: () => Promise<OffsetBasedIterator<T>>;
        fetchPrevPage: () => Promise<OffsetBasedIterator<T>>;
        offset: number;
        originQuery: QueryBuilder<T, 'OFFSET'>;
        limit: number;
        totalCount?: number | null;
        tooManyToCount?: boolean | null;
    });
    get currentPage(): number | undefined;
    get totalPages(): number | undefined;
    get totalCount(): number | undefined;
    hasNext(): boolean;
    hasPrev(): boolean;
}
