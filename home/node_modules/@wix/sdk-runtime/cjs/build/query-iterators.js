"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffsetBasedIterator = exports.CursorBasedIterator = exports.Iterator = void 0;
class Iterator {
    _items;
    _fetchNextPage;
    _fetchPrevPage;
    _originQuery;
    _limit;
    constructor({ items, originQuery, fetchNextPage, fetchPrevPage, limit, }) {
        this._items = items;
        this._fetchNextPage = fetchNextPage;
        this._fetchPrevPage = fetchPrevPage;
        this._originQuery = originQuery;
        this._limit = limit;
    }
    get items() {
        return this._items;
    }
    get length() {
        return this._items.length;
    }
    get pageSize() {
        return this._limit;
    }
    get query() {
        return this._originQuery;
    }
    async next() {
        if (!this.hasNext()) {
            throw new Error('No next page to fetch');
        }
        const nextPageIterator = await this._fetchNextPage();
        return nextPageIterator;
    }
    async prev() {
        if (!this.hasPrev()) {
            throw new Error('No previous page to fetch');
        }
        const previousPageIterator = await this._fetchPrevPage();
        return previousPageIterator;
    }
}
exports.Iterator = Iterator;
class CursorBasedIterator extends Iterator {
    _nextCursor;
    _prevCursor;
    cursors;
    constructor({ items, originQuery, fetchNextPage, fetchPrevPage, limit, nextCursor, prevCursor, }) {
        super({ items, originQuery, fetchNextPage, fetchPrevPage, limit });
        this._nextCursor = nextCursor;
        this._prevCursor = prevCursor;
        this.cursors = {
            next: nextCursor,
            prev: prevCursor,
        };
    }
    hasNext() {
        return !!this._nextCursor;
    }
    hasPrev() {
        return !!this._prevCursor;
    }
}
exports.CursorBasedIterator = CursorBasedIterator;
class OffsetBasedIterator extends Iterator {
    _totalCount;
    _offset;
    _tooManyToCount;
    constructor({ items, fetchNextPage, fetchPrevPage, offset, originQuery, limit, totalCount, tooManyToCount, }) {
        super({ items, fetchNextPage, fetchPrevPage, originQuery, limit });
        this._totalCount = totalCount;
        this._offset = offset;
        this._tooManyToCount = tooManyToCount;
    }
    get currentPage() {
        return this._limit === 0
            ? undefined
            : Math.floor(this._offset / this._limit);
    }
    get totalPages() {
        return this._tooManyToCount || this._limit === 0
            ? undefined
            : Math.ceil(this._totalCount / this._limit);
    }
    get totalCount() {
        return this._tooManyToCount ? undefined : this._totalCount;
    }
    hasNext() {
        return Boolean(this._limit !== 0 &&
            this.currentPage !== undefined && // currentPage 0 is the first page
            this.totalPages !== undefined &&
            this.currentPage < this.totalPages - 1);
    }
    hasPrev() {
        return Boolean(this._limit !== 0 && this.currentPage && this.currentPage > 0);
    }
}
exports.OffsetBasedIterator = OffsetBasedIterator;
