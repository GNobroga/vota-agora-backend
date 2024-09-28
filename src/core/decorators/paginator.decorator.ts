import { createParamDecorator } from "@nestjs/common";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";
import { Request } from "express";
import Paginator from "../models/Paginator";

export const PaginatorDecorator = createParamDecorator(((data: any, context: ExecutionContextHost) => {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const { page = "", size = "", sort = ""} = request.query;
    return new Paginator({
        page: page as string,
        size: size as string,
        sort: sort as string,
    });
}));
