

interface PaginatorProps {
    page?: string;
    size?: string;
    sort?: string;
}

export default class Paginator {
    page: number;
    size: number;
    sort: string;

    static readonly MAX_PAGE_SIZE = Number.MAX_SAFE_INTEGER;

    static readonly DEFAULT_SORT_DIRECTION = 'asc';

    static readonly DEFAULT_PAGE = 1;

    constructor(props: PaginatorProps) {
        const pageParsed = parseInt(props?.page);
        const sizeParsed = parseInt(props?.size);
        this.page = isNaN(pageParsed) ? Paginator.DEFAULT_PAGE : Math.max(Paginator.DEFAULT_PAGE, pageParsed);
        this.size = (isNaN(sizeParsed) || sizeParsed < 1) ? Paginator.MAX_PAGE_SIZE : sizeParsed;
        this.sort = (!props?.sort || ('asc' !== props.sort.toLowerCase() && 'desc' !== props.sort.toLowerCase())) ?
            'asc' : props.sort.toLowerCase();
    }
}