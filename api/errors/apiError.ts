export type CodeError = '1000' | '1004';

interface IParams {
  message: string;
  status: number;
  code?: CodeError;
  statusText?: string;
}

export class ApiError extends Error {
  public status: number;
  public statusText: string | undefined;
  public code: CodeError | undefined;

  constructor({ message, status, statusText, code }: IParams) {
    super(message);
    this.status = status;
    this.statusText = statusText;
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }

  static badRequest(message: string, code?: CodeError) {
    return new ApiError({
      message,
      status: 400,
      statusText: 'Bad request',
      code,
    });
  }

  static unauthorized(message: string, code?: CodeError) {
    return new ApiError({
      message,
      status: 401,
      statusText: 'Unauthorized',
      code,
    });
  }

  static forbidden(message: string, code?: CodeError) {
    return new ApiError({
      message,
      status: 403,
      statusText: 'Forbidden',
      code,
    });
  }

  static notFound(message: string, code?: CodeError) {
    return new ApiError({
      message,
      status: 404,
      statusText: 'Not found',
      code,
    });
  }

  static internal(message: string, code?: CodeError) {
    return new ApiError({
      message,
      status: 500,
      statusText: 'Internal Server Error',
      code,
    });
  }

  static conflict(message: string, code?: CodeError) {
    return new ApiError({ message, status: 409, statusText: 'Conflict', code });
  }
}
