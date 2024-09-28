"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return Paginator;
    }
});
let Paginator = class Paginator {
    constructor(props){
        const pageParsed = parseInt(props?.page);
        const sizeParsed = parseInt(props?.size);
        this.page = isNaN(pageParsed) ? Paginator.DEFAULT_PAGE : Math.max(Paginator.DEFAULT_PAGE, pageParsed);
        this.size = isNaN(sizeParsed) || sizeParsed < 1 ? Paginator.MAX_PAGE_SIZE : sizeParsed;
        this.sort = !props?.sort || 'asc' !== props.sort.toLowerCase() && 'desc' !== props.sort.toLowerCase() ? 'asc' : props.sort.toLowerCase();
    }
};
Paginator.MAX_PAGE_SIZE = Number.MAX_SAFE_INTEGER;
Paginator.DEFAULT_SORT_DIRECTION = 'asc';
Paginator.DEFAULT_PAGE = 1;

//# sourceMappingURL=Paginator.js.map