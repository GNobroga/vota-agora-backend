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
        if (isNaN(pageParsed)) {
            this.page = Paginator.DEFAULT_PAGE;
        } else {
            this.page = Math.max(Paginator.DEFAULT_PAGE, pageParsed);
        }
        if (isNaN(sizeParsed) || sizeParsed < 1) {
            this.size = Paginator.MAX_PAGE_SIZE;
        } else {
            this.size = sizeParsed;
        }
        if (!props?.sort || 'asc' !== props.sort.toLowerCase() && 'desc' !== props.sort.toLowerCase()) {
            this.sort = 'asc';
        } else {
            this.sort = props.sort.toLowerCase();
        }
    }
};
Paginator.MAX_PAGE_SIZE = Number.MAX_SAFE_INTEGER;
Paginator.DEFAULT_SORT_DIRECTION = 'asc';
Paginator.DEFAULT_PAGE = 1;

//# sourceMappingURL=Paginator.js.map