
export type SortType = 'asc' | 'desc';

export default class PageRequest {

    static readonly DEFAULT_PAGE_SIZE = Number.MAX_SAFE_INTEGER;
    static readonly DEFAULT_VALUE = 1;
    static readonly DEFAULT_SORT: SortType = 'asc';

    constructor(private _q: string, private _page: number, private _size: number, private _sort: SortType) {}

    get q() {
        return this._q;
    }

    get page() {
        return Math.max(PageRequest.DEFAULT_VALUE, this._page);
    }
    
    get size() {
        if (this._size > PageRequest.DEFAULT_PAGE_SIZE) {
            this._size = PageRequest.DEFAULT_PAGE_SIZE;
        }
        return Math.max(PageRequest.DEFAULT_VALUE, this._size);
    }

    get sort() {
        return this._sort;
    }
}