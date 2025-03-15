import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from "@nestjs/common";
import { catchError, map, Observable, throwError } from "rxjs";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    if (request.url === "/") {
      return next.handle();
    }
    return next.handle().pipe(
      map((res: unknown) => this.responseHandler(res, context)),
      catchError((err: HttpException) => {
        this.errorHandler(err, context);
        return throwError(() => err);
      }),
    );
  }

  private async responseHandler(res: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const statusCode = response.statusCode;
    const actualResponse = await res;

    return {
      status: "success",
      statusCode: statusCode,
      message: actualResponse?.message,
      data: actualResponse?.data?.data || actualResponse?.data,
    };
  }

  private errorHandler(exception: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorCode = this.getErrorCode(status);

    this.logger.error(JSON.stringify(exception, null, 2));

    response.status(status).json({
      status: "error",
      statusCode: status,
      message: exception?.message || "An unexpected error occurred.",
      error: {
        code: errorCode,
        details: exception?.response?.errors || null,
      },
    });
  }

  private getErrorCode(status: number): string {
    const errorMap = {
      [HttpStatus.NOT_FOUND]: "NOT_FOUND",
      [HttpStatus.BAD_REQUEST]: "BAD_REQUEST",
      [HttpStatus.UNAUTHORIZED]: "UNAUTHORIZED",
      [HttpStatus.FORBIDDEN]: "FORBIDDEN",
      [HttpStatus.INTERNAL_SERVER_ERROR]: "INTERNAL_SERVER_ERROR",
      [HttpStatus.CONFLICT]: "CONFLICT",
      [HttpStatus.GATEWAY_TIMEOUT]: "GATEWAY_TIMEOUT",
      [HttpStatus.UNPROCESSABLE_ENTITY]: "UNPROCESSABLE_ENTITY",
    };
    return errorMap[status] || "UNKNOWN_ERROR";
  }
}
