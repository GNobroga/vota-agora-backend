

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
        
        if (!props?.sort || ('asc' !== props.sort.toLowerCase() && 'desc' !== props.sort.toLowerCase())) {
            this.sort = 'asc';
        } else {
            this.sort = props.sort.toLowerCase();
        }
    }
}