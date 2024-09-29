import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import PageRequest, { SortType } from '../models/page-request';
import isNull from '../utils/is-null';

export const PaginatorDecorator = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    
    const { page = "1", size = "10", sort = "asc" } = request.query;

    const pageNumber = Math.max(1, Number(page)); 
    const sizeNumber = Math.max(1, Number(size)); 
    const sortParsed = (sort !== 'asc' && sort !== 'desc') || isNull(sort) ? 'asc' : sort.toLowerCase();

    return new PageRequest(
      pageNumber,
      sizeNumber,
      sortParsed as SortType
    );
  },
);
